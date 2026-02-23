/**
 * DNS Integration Roundtrip Test (self-contained)
 *
 * Uses HOSTING_DE_API_TOKEN_TEST1 and executes a full DNS lifecycle in one sequential test:
 * zone create -> read/list endpoints -> record add/modify/delete -> zone cleanup.
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
 * Runs DNS API validation as one sequential roundtrip so dependent resources
 * are handled in-order and cleaned up together.
 */
describe.skipIf(!testApiToken)("DNS Integration Roundtrip (HOSTING_DE_API_TOKEN_TEST1)", () => {
  /**
   * Full DNS roundtrip using one temporary zone:
   * - verify list/find endpoints
   * - add/modify/delete TXT record
   * - verify record transitions
   */
  it("performs full DNS zone roundtrip sequentially", { timeout: 120000 }, async () => {
    await withTemporaryZone(testContext!, "dns-roundtrip", async (zoneName, zoneConfig) => {
      // 1) zonesFind
      const zonesResult = await client.zonesFind({
        filter: { field: "zoneName", value: zoneName, relation: "equal" },
      });
      expect(zonesResult.isOk()).toBe(true);
      if (zonesResult.isErr()) return;
      expect(zonesResult.value.status).toBe("success");
      expect(zonesResult.value.response.type).toBe("FindZonesResult");
      expect(zonesResult.value.response.data.length).toBeGreaterThan(0);

      // 2) zoneConfigsFind
      const zoneConfigsResult = await client.zoneConfigsFind({
        filter: { field: "zoneName", value: zoneName, relation: "equal" },
      });
      expect(zoneConfigsResult.isOk()).toBe(true);
      if (zoneConfigsResult.isErr()) return;
      expect(zoneConfigsResult.value.status).toBe("success");
      expect(zoneConfigsResult.value.response.type).toBe("FindZoneConfigsResult");
      expect(zoneConfigsResult.value.response.data.length).toBeGreaterThan(0);

      // 3) recordsFind (initial zone records)
      const initialRecordsResult = await client.recordsFind({
        filter: { field: "zoneConfigId", value: zoneConfig.id, relation: "equal" },
      });
      expect(initialRecordsResult.isOk()).toBe(true);
      if (initialRecordsResult.isErr()) return;
      expect(initialRecordsResult.value.status).toBe("success");
      expect(initialRecordsResult.value.response.type).toBe("FindRecordsResult");
      expect(initialRecordsResult.value.response.data.length).toBeGreaterThan(0);

      // 4) nameserverSetsFind
      const nameserverSetsResult = await client.nameserverSetsFind({ limit: 10 });
      expect(nameserverSetsResult.isOk()).toBe(true);
      if (nameserverSetsResult.isErr()) return;
      expect(nameserverSetsResult.value.status).toBe("success");
      expect(nameserverSetsResult.value.response.type).toBe("FindNameserverSetsResult");

      // 5) templatesFind
      const templatesResult = await client.templatesFind({ limit: 10 });
      expect(templatesResult.isOk()).toBe(true);
      if (templatesResult.isErr()) return;
      expect(templatesResult.value.status).toBe("success");
      expect(templatesResult.value.response.type).toBe("FindTemplatesResult");

      const testRecordName = `_clawd-test-${Date.now()}.${zoneName}`;
      const zoneConfigBase = {
        name: zoneName,
        type: zoneConfig.type,
        emailAddress: zoneConfig.emailAddress,
        dnsSecMode: zoneConfig.dnsSecMode,
      };

      // 6) zoneUpdate add TXT
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

      // 7) zoneUpdate modify TXT
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

      // 8) verify modified TXT exists
      const afterModifyResult = await client.recordsFind({
        filter: { field: "zoneConfigId", value: zoneConfig.id, relation: "equal" },
      });
      expect(afterModifyResult.isOk()).toBe(true);
      if (afterModifyResult.isErr()) return;
      const modifiedRecord = afterModifyResult.value.response.data.find(
        (record) => record.id === addedRecordId,
      );
      expect(modifiedRecord).toBeDefined();
      expect(modifiedRecord?.content).toBe(`"test-modified"`);

      // 9) zoneUpdate delete TXT
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
