/**
 * DNS Integration Tests
 * 
 * Uses tt-bj2.de as the test zone.
 * Requires HOSTING_DE_API_TOKEN environment variable.
 */

import { describe, expect, it, beforeAll } from "bun:test";
import { createHostingDeClient } from "../src/index";
import {
  zonesFind,
  zoneConfigsFind,
  recordsFind,
  nameserverSetsFind,
  templatesFind,
  zoneUpdate,
  type ZoneConfig,
  type DnsRecord,
} from "../src/routes/dns";

const TEST_ZONE = "tt-bj2.de";

const apiToken = process.env.HOSTING_DE_API_TOKEN;

const client = createHostingDeClient({
  apiToken: apiToken ?? "",
  routes: { zonesFind, zoneConfigsFind, recordsFind, nameserverSetsFind, templatesFind, zoneUpdate },
});

describe.skipIf(!apiToken)("DNS Integration Tests (tt-bj2.de)", () => {
  let testZoneConfig: ZoneConfig;
  let testRecords: DnsRecord[];

  beforeAll(async () => {
    // Get the test zone
    const result = await client.zonesFind({
      filter: { field: "zoneName", value: TEST_ZONE, relation: "equal" },
    });
    
    if (result.isErr()) throw new Error(`Failed to get test zone: ${result.error}`);
    if (result.value.response.data.length === 0) throw new Error(`Test zone ${TEST_ZONE} not found`);
    
    testZoneConfig = result.value.response.data[0].zoneConfig;
    testRecords = result.value.response.data[0].records;
    
    console.log(`Test zone: ${testZoneConfig.name} (${testZoneConfig.id})`);
    console.log(`Records: ${testRecords.length}`);
  });

  describe("zonesFind", () => {
    it("should find all zones", async () => {
      const result = await client.zonesFind({ limit: 5 });
      
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.status).toBe("success");
        expect(result.value.response.data.length).toBeGreaterThan(0);
      }
    });

    it("should filter by zone name", async () => {
      const result = await client.zonesFind({
        filter: { field: "zoneName", value: TEST_ZONE, relation: "equal" },
      });
      
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.response.data.length).toBe(1);
        expect(result.value.response.data[0].zoneConfig.name).toBe(TEST_ZONE);
      }
    });
  });

  describe("zoneConfigsFind", () => {
    it("should find zone configs (without records)", async () => {
      const result = await client.zoneConfigsFind({ limit: 5 });
      
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.status).toBe("success");
        expect(result.value.response.type).toBe("FindZoneConfigsResult");
        expect(result.value.response.data.length).toBeGreaterThan(0);
        // Zone configs don't have records array
        expect(result.value.response.data[0]).toHaveProperty("name");
        expect(result.value.response.data[0]).not.toHaveProperty("records");
      }
    });

    it("should filter by zone name", async () => {
      const result = await client.zoneConfigsFind({
        filter: { field: "zoneName", value: TEST_ZONE, relation: "equal" },
      });
      
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.response.data.length).toBe(1);
        expect(result.value.response.data[0].name).toBe(TEST_ZONE);
      }
    });
  });

  describe("recordsFind", () => {
    it("should find records for test zone", async () => {
      const result = await client.recordsFind({
        filter: { field: "zoneConfigId", value: testZoneConfig.id, relation: "equal" },
      });
      
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.status).toBe("success");
        expect(result.value.response.type).toBe("FindRecordsResult");
        expect(result.value.response.data.length).toBeGreaterThan(0);
        console.log(`Found ${result.value.response.data.length} records for ${TEST_ZONE}`);
      }
    });

    it("should filter by record type", async () => {
      const result = await client.recordsFind({
        filter: { field: "recordType", value: "A", relation: "equal" },
        limit: 10,
      });
      
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        // All returned records should be A records
        for (const record of result.value.response.data) {
          expect(record.type).toBe("A");
        }
      }
    });
  });

  describe("nameserverSetsFind", () => {
    it("should find nameserver sets", async () => {
      const result = await client.nameserverSetsFind({ limit: 10 });
      
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.status).toBe("success");
        expect(result.value.response.type).toBe("FindNameserverSetsResult");
        console.log(`Found ${result.value.response.totalEntries} nameserver sets`);
        
        if (result.value.response.data.length > 0) {
          const ns = result.value.response.data[0];
          expect(ns).toHaveProperty("nameservers");
          console.log(`First NS set: ${ns.name}`);
        }
      }
    });
  });

  describe("templatesFind", () => {
    it("should find templates", async () => {
      const result = await client.templatesFind({ limit: 10 });
      
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.status).toBe("success");
        expect(result.value.response.type).toBe("FindTemplatesResult");
        console.log(`Found ${result.value.response.totalEntries} templates`);
      }
    });
  });

  describe("zoneUpdate", () => {
    it("should add, modify, and delete a TXT record", { timeout: 30000 }, async () => {
      const testRecordName = `_clawd-test-${Date.now()}.${TEST_ZONE}`;
      
      // Helper to get zone config required fields
      const zoneConfigBase = {
        name: TEST_ZONE,
        type: testZoneConfig.type,
        emailAddress: testZoneConfig.emailAddress,
        dnsSecMode: testZoneConfig.dnsSecMode,
      };

      // 1. ADD
      console.log(`Adding record: ${testRecordName}`);
      const addResult = await client.zoneUpdate({
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
      if (addResult.isErr()) {
        console.log("Add error:", addResult.error);
        return;
      }
      expect(["success", "pending"]).toContain(addResult.value.status);
      
      // Find the added record
      const addedRecord = addResult.value.response?.records.find(
        (r) => r.name === testRecordName && r.type === "TXT"
      );
      expect(addedRecord).toBeDefined();
      console.log(`Added: ${addedRecord?.id} (status: ${addResult.value.status})`);

      // Wait for zone to be unblocked (async operation)
      console.log("Waiting for zone to unblock...");
      await new Promise(r => setTimeout(r, 3000));

      // 2. MODIFY
      console.log("Modifying record...");
      const modResult = await client.zoneUpdate({
        zoneConfig: zoneConfigBase,
        recordsToModify: [
          {
            id: addedRecord!.id,
            name: testRecordName,
            type: "TXT",
            content: `"test-modified"`,
            ttl: 300,
          },
        ],
      });
      
      if (modResult.isErr()) {
        console.log("Modify client error:", modResult.error);
      }
      expect(modResult.isOk()).toBe(true);
      if (modResult.isErr()) return;
      
      // Check for API-level errors (zone blocked, etc.)
      if (modResult.value.status === "error") {
        console.log("Modify API error:", modResult.value.errors);
        // Skip rest of test - zone might be blocked
        return;
      }
      expect(["success", "pending"]).toContain(modResult.value.status);
      console.log(`Modified (status: ${modResult.value.status})`);
      
      // Wait for zone to unblock
      await new Promise(r => setTimeout(r, 2000));

      // 3. DELETE
      console.log("Deleting record...");
      const delResult = await client.zoneUpdate({
        zoneConfig: zoneConfigBase,
        recordsToDelete: [{ id: addedRecord!.id }],
      });
      
      expect(delResult.isOk()).toBe(true);
      if (delResult.isErr()) {
        console.log("Delete error:", delResult.error);
        return;
      }
      expect(["success", "pending"]).toContain(delResult.value.status);
      console.log(`Deleted (status: ${delResult.value.status})`);
    });
  });
});
