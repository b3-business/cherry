/**
 * DNS Read-only Smoke Tests
 *
 * Validates request/response wiring with live API calls without modifying data.
 * Empty lists are acceptable and still count as a successful smoke test.
 */

import { describe, expect, it } from "bun:test";
import { createHostingDeClient } from "../src/index";
import {
  zonesFind,
  zoneConfigsFind,
  recordsFind,
  nameserverSetsFind,
  templatesFind,
} from "../src/routes/dns";
import { hostingDeDemoApiBaseUrl, hostingDeTest1ApiToken } from "./utils/test-env";

const apiToken = hostingDeTest1ApiToken;

const client = createHostingDeClient({
  apiToken: apiToken ?? "",
  baseUrl: hostingDeDemoApiBaseUrl,
  routes: { zonesFind, zoneConfigsFind, recordsFind, nameserverSetsFind, templatesFind },
});

const NONEXISTENT_ZONE = `clawd-smoke-${Date.now()}-${Math.random()
  .toString(16)
  .slice(2)}.invalid`;

/**
 * Read-only smoke tests against the dedicated TEST1 account.
 * Ensures input validation does not reject well-formed requests.
 */
describe.skipIf(!apiToken)("DNS Read-only Smoke Tests (HOSTING_DE_API_TOKEN_TEST1)", () => {
  /**
   * Confirms filtering by a non-existent zone returns a valid empty list.
   * Guards against malformed input errors.
   */
  it("zonesFind should allow empty results for missing zone", async () => {
    const result = await client.zonesFind({
      filter: { field: "zoneName", value: NONEXISTENT_ZONE, relation: "equal" },
    });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.status).toBe("success");
      expect(result.value.response.type).toBe("FindZonesResult");
      expect(result.value.response.data.length).toBe(0);
    }
  });

  /**
   * Verifies zoneConfigsFind works with a filter even if no data matches.
   * Confirms response type and success status only.
   */
  it("zoneConfigsFind should accept filters without requiring results", async () => {
    const result = await client.zoneConfigsFind({
      filter: { field: "zoneName", value: NONEXISTENT_ZONE, relation: "equal" },
    });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.status).toBe("success");
      expect(result.value.response.type).toBe("FindZoneConfigsResult");
    }
  });

  /**
   * Ensures recordsFind accepts a filter that yields no records.
   * Validates success response without requiring record data.
   */
  it("recordsFind should accept unknown zoneConfigId", async () => {
    const result = await client.recordsFind({
      filter: { field: "zoneConfigId", value: "nonexistent-zone-config", relation: "equal" },
    });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.status).toBe("success");
      expect(result.value.response.type).toBe("FindRecordsResult");
    }
  });

  /**
   * Confirms nameserverSetsFind returns a valid response for read-only usage.
   * Empty or non-empty results are both acceptable.
   */
  it("nameserverSetsFind should succeed without requiring data", async () => {
    const result = await client.nameserverSetsFind({ limit: 1 });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.status).toBe("success");
      expect(result.value.response.type).toBe("FindNameserverSetsResult");
    }
  });

  /**
   * Confirms templatesFind returns a valid response for read-only usage.
   * Empty or non-empty results are both acceptable.
   */
  it("templatesFind should succeed without requiring data", async () => {
    const result = await client.templatesFind({ limit: 1 });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.status).toBe("success");
      expect(result.value.response.type).toBe("FindTemplatesResult");
    }
  });
});
