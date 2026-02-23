/**
 * DNS Integration Tests (self-contained)
 *
 * Uses HOSTING_DE_API_TOKEN_TEST1 and creates/deletes a temporary zone per test.
 * Host resolution uses HOSTINGDE_API_DEMO_HOST (default derived from https://demo.hosting.de/).
 * No preconfigured zone is required.
 */

import { describe, expect, it } from "bun:test";
import { createHostingDeClient } from "../src/index";
import {
  zonesFind,
  zoneConfigsFind,
  recordsFind,
  nameserverSetsFind,
  templatesFind,
  zoneUpdate,
  type ZoneConfig,
} from "../src/routes/dns";
import {
  hostingDeDemoApiBaseUrl,
  hostingDeDemoDnsJsonApiBaseUrl,
  hostingDeTest1ApiToken,
} from "./utils/test-env";

const testApiToken = hostingDeTest1ApiToken;

const client = createHostingDeClient({
  apiToken: testApiToken ?? "",
  baseUrl: hostingDeDemoApiBaseUrl,
  routes: { zonesFind, zoneConfigsFind, recordsFind, nameserverSetsFind, templatesFind, zoneUpdate },
});

type DnsMutationResponse = {
  status?: "success" | "pending" | "error";
  errors?: Array<{ text?: string }>;
};

type ZoneUpdateInput = Parameters<typeof client.zoneUpdate>[0];
type ZoneUpdateResult = Awaited<ReturnType<typeof client.zoneUpdate>>;

function requireTestToken(): string {
  if (!testApiToken) {
    throw new Error("Missing HOSTING_DE_API_TOKEN_TEST1");
  }

  return testApiToken;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createUniqueZoneName(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${Date.now().toString(36)}-${random}.test`;
}

function formatApiErrors(errors: Array<{ text?: string }> | undefined): string {
  if (!errors || errors.length === 0) {
    return "Unknown API error";
  }

  return errors.map((error) => error.text ?? "Unknown error").join("; ");
}

function isZoneBusyError(message: string): boolean {
  return /current status of an object you are trying to use does not allow that operation/i.test(
    message,
  );
}

async function zoneUpdateWithRetry(input: ZoneUpdateInput, attempts: number = 8): Promise<ZoneUpdateResult> {
  let result = await client.zoneUpdate(input);

  for (let attempt = 1; attempt < attempts; attempt++) {
    if (result.isErr()) return result;
    if (result.value.status !== "error") return result;

    const errorMessage = formatApiErrors(result.value.errors);
    if (!isZoneBusyError(errorMessage)) {
      return result;
    }

    await wait(1500);
    result = await client.zoneUpdate(input);
  }

  return result;
}

async function waitForRecordId(
  zoneConfigId: string,
  recordName: string,
  recordType: string,
  timeoutMs: number = 30000,
): Promise<string> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const result = await client.recordsFind({
      filter: { field: "zoneConfigId", value: zoneConfigId, relation: "equal" },
      limit: 500,
    });

    if (result.isOk() && result.value.status !== "error") {
      const record = result.value.response.data.find(
        (item) => item.name === recordName && item.type === recordType,
      );
      if (record) return record.id;
    }

    await wait(1000);
  }

  throw new Error(`Timed out waiting for record ${recordName} (${recordType})`);
}

async function postDnsMutation(
  endpoint: string,
  payload: Record<string, unknown>,
): Promise<DnsMutationResponse> {
  const response = await fetch(`${hostingDeDemoDnsJsonApiBaseUrl}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ authToken: requireTestToken(), ...payload }),
  });

  if (!response.ok) {
    throw new Error(`${endpoint} failed with HTTP ${response.status}`);
  }

  const body = (await response.json()) as DnsMutationResponse;

  if (body.status === "error") {
    throw new Error(`${endpoint} returned API error: ${formatApiErrors(body.errors)}`);
  }

  return body;
}

async function createTemporaryZone(zoneName: string): Promise<void> {
  await postDnsMutation("zoneCreate", {
    zoneConfig: {
      name: zoneName,
      type: "NATIVE",
      emailAddress: "hostmaster@example.test",
    },
    records: [
      {
        name: zoneName,
        type: "A",
        content: "127.0.0.1",
        ttl: 300,
      },
    ],
    useDefaultNameserverSet: true,
  });
}

async function waitForZoneConfig(zoneName: string, timeoutMs: number = 45000): Promise<ZoneConfig> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const result = await client.zonesFind({
      filter: { field: "zoneName", value: zoneName, relation: "equal" },
      limit: 1,
    });

    if (result.isOk() && result.value.response.data.length > 0) {
      return result.value.response.data[0].zoneConfig;
    }

    await wait(1000);
  }

  throw new Error(`Timed out waiting for temporary zone ${zoneName}`);
}

async function deleteTemporaryZone(zoneName: string): Promise<void> {
  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      await postDnsMutation("zoneDelete", { zoneName });
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (isZoneBusyError(message) && attempt < 10) {
        await wait(1500);
        continue;
      }

      console.warn(`Cleanup warning for ${zoneName}:`, error);
      return;
    }
  }
}

async function withTemporaryZone<T>(
  prefix: string,
  callback: (zoneName: string, zoneConfig: ZoneConfig) => Promise<T>,
): Promise<T> {
  const zoneName = createUniqueZoneName(prefix);

  await createTemporaryZone(zoneName);
  const zoneConfig = await waitForZoneConfig(zoneName);

  try {
    return await callback(zoneName, zoneConfig);
  } finally {
    await deleteTemporaryZone(zoneName);
  }
}

/**
 * Verifies DNS read and write operations against a dedicated test account.
 * Each test creates and cleans up its own zone to stay isolated.
 */
describe.skipIf(!testApiToken)("DNS Integration Tests (HOSTING_DE_API_TOKEN_TEST1)", () => {
  /**
   * Ensures zonesFind can discover a newly created temporary zone.
   */
  it("zonesFind should find a freshly created test zone", { timeout: 90000 }, async () => {
    await withTemporaryZone("zones-find", async (zoneName) => {
      const result = await client.zonesFind({
        filter: { field: "zoneName", value: zoneName, relation: "equal" },
      });

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.status).toBe("success");
        expect(result.value.response.type).toBe("FindZonesResult");
        expect(result.value.response.data.length).toBeGreaterThan(0);
        expect(result.value.response.data[0].zoneConfig.name).toBe(zoneName);
      }
    });
  });

  /**
   * Ensures zoneConfigsFind can read metadata for a newly created temporary zone.
   */
  it("zoneConfigsFind should find a freshly created test zone config", { timeout: 90000 }, async () => {
    await withTemporaryZone("zone-config", async (zoneName) => {
      const result = await client.zoneConfigsFind({
        filter: { field: "zoneName", value: zoneName, relation: "equal" },
      });

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.status).toBe("success");
        expect(result.value.response.type).toBe("FindZoneConfigsResult");
        expect(result.value.response.data.length).toBeGreaterThan(0);
        expect(result.value.response.data[0].name).toBe(zoneName);
      }
    });
  });

  /**
   * Ensures recordsFind can retrieve records scoped to a newly created zone.
   */
  it("recordsFind should return records for a freshly created zone", { timeout: 90000 }, async () => {
    await withTemporaryZone("records-find", async (_zoneName, zoneConfig) => {
      const result = await client.recordsFind({
        filter: { field: "zoneConfigId", value: zoneConfig.id, relation: "equal" },
      });

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.status).toBe("success");
        expect(result.value.response.type).toBe("FindRecordsResult");
        expect(result.value.response.data.length).toBeGreaterThan(0);
        for (const record of result.value.response.data) {
          expect(record.zoneConfigId).toBe(zoneConfig.id);
        }
      }
    });
  });

  /**
   * Ensures nameserver sets endpoint works with the TEST1 credentials.
   */
  it("nameserverSetsFind should succeed", async () => {
    const result = await client.nameserverSetsFind({ limit: 10 });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.status).toBe("success");
      expect(result.value.response.type).toBe("FindNameserverSetsResult");
    }
  });

  /**
   * Ensures template listing works with the TEST1 credentials.
   */
  it("templatesFind should succeed", async () => {
    const result = await client.templatesFind({ limit: 10 });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.status).toBe("success");
      expect(result.value.response.type).toBe("FindTemplatesResult");
    }
  });

  /**
   * Exercises add/modify/delete for a TXT record inside a temporary zone.
   */
  it("zoneUpdate should add, modify, and delete a TXT record", { timeout: 90000 }, async () => {
    await withTemporaryZone("zone-update", async (zoneName, zoneConfig) => {
      const testRecordName = `_clawd-test-${Date.now()}.${zoneName}`;

      const zoneConfigBase = {
        name: zoneName,
        type: zoneConfig.type,
        emailAddress: zoneConfig.emailAddress,
        dnsSecMode: zoneConfig.dnsSecMode,
      };

      const addResult = await zoneUpdateWithRetry({
        zoneConfig: zoneConfigBase,
        recordsToAdd: [
          {
            name: testRecordName,
            type: "TXT",
            content: `"test-add"`,
            ttl: 300,
          },
        ],
      });

      expect(addResult.isOk()).toBe(true);
      if (addResult.isErr()) return;
      if (addResult.value.status === "error") {
        throw new Error(`Failed to add TXT record: ${formatApiErrors(addResult.value.errors)}`);
      }
      expect(["success", "pending"]).toContain(addResult.value.status);

      const addedRecordId =
        addResult.value.response?.records.find(
          (record) => record.name === testRecordName && record.type === "TXT",
        )?.id ?? (await waitForRecordId(zoneConfig.id, testRecordName, "TXT"));

      await wait(2000);

      const modResult = await zoneUpdateWithRetry({
        zoneConfig: zoneConfigBase,
        recordsToModify: [
          {
            id: addedRecordId,
            name: testRecordName,
            type: "TXT",
            content: `"test-modified"`,
            ttl: 300,
          },
        ],
      });

      expect(modResult.isOk()).toBe(true);
      if (modResult.isErr()) return;
      if (modResult.value.status === "error") {
        throw new Error(`Failed to modify TXT record: ${formatApiErrors(modResult.value.errors)}`);
      }
      expect(["success", "pending"]).toContain(modResult.value.status);

      await wait(2000);

      const delResult = await zoneUpdateWithRetry({
        zoneConfig: zoneConfigBase,
        recordsToDelete: [{ id: addedRecordId }],
      });

      expect(delResult.isOk()).toBe(true);
      if (delResult.isErr()) return;
      if (delResult.value.status === "error") {
        throw new Error(`Failed to delete TXT record: ${formatApiErrors(delResult.value.errors)}`);
      }
      expect(["success", "pending"]).toContain(delResult.value.status);
    });
  });
});
