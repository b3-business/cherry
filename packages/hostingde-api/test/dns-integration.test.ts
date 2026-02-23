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
} from "../src/routes/dns";
import {
  formatApiErrors,
  sleep,
  waitForRecordId,
  withTemporaryZone,
  zoneUpdateWithRetry,
} from "./utils/dns-integration-helpers";
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

const testContext = testApiToken
  ? {
      client,
      apiToken: testApiToken,
      dnsJsonApiBaseUrl: hostingDeDemoDnsJsonApiBaseUrl,
    }
  : undefined;

/**
 * Verifies DNS read and write operations against a dedicated test account.
 * Each test creates and cleans up its own zone to stay isolated.
 */
describe.skipIf(!testApiToken)("DNS Integration Tests (HOSTING_DE_API_TOKEN_TEST1)", () => {
  /**
   * Ensures zonesFind can discover a newly created temporary zone.
   */
  it("zonesFind should find a freshly created test zone", { timeout: 90000 }, async () => {
    await withTemporaryZone(testContext!, "zones-find", async (zoneName) => {
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
    await withTemporaryZone(testContext!, "zone-config", async (zoneName) => {
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
    await withTemporaryZone(testContext!, "records-find", async (_zoneName, zoneConfig) => {
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
    await withTemporaryZone(testContext!, "zone-update", async (zoneName, zoneConfig) => {
      const testRecordName = `_clawd-test-${Date.now()}.${zoneName}`;

      const zoneConfigBase = {
        name: zoneName,
        type: zoneConfig.type,
        emailAddress: zoneConfig.emailAddress,
        dnsSecMode: zoneConfig.dnsSecMode,
      };

      const addResult = await zoneUpdateWithRetry(client, {
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
        )?.id ?? (await waitForRecordId(client, zoneConfig.id, testRecordName, "TXT"));

      await sleep(2000);

      const modResult = await zoneUpdateWithRetry(client, {
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

      await sleep(2000);

      const delResult = await zoneUpdateWithRetry(client, {
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
