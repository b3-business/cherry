import { describe, expect, it } from "bun:test";
import { createHostingDeClient } from "../src/index";
import { zonesFind, type ZonesFindResponse } from "../src/routes/dns";

// Helper to create a valid mock response
function createMockResponse(zones: Array<{ name: string; records?: number }>): ZonesFindResponse {
  return {
    status: "success",
    response: {
      data: zones.map((z, i) => ({
        zoneConfig: {
          id: `zone-${i}`,
          accountId: "acc-123",
          name: z.name,
          nameUnicode: z.name,
          type: "NATIVE",
          emailAddress: `admin@${z.name}`,
          masterIp: "",
          status: "active",
          dnsSecMode: "off",
          dnsServerGroupId: null,
          soaValues: {
            refresh: 86400,
            retry: 7200,
            expire: 3600000,
            ttl: 86400,
            negativeTtl: 900,
          },
          templateValues: null,
          zoneTransferWhitelist: [],
          restorableUntil: null,
          addDate: "2024-01-01T00:00:00Z",
          lastChangeDate: "2024-01-01T00:00:00Z",
        },
        records: Array.from({ length: z.records ?? 1 }, (_, j) => ({
          id: `record-${i}-${j}`,
          accountId: "acc-123",
          zoneConfigId: `zone-${i}`,
          name: z.name,
          type: "A",
          content: "1.2.3.4",
          ttl: 300,
          priority: null,
          comments: "",
          recordTemplateId: null,
          addDate: "2024-01-01T00:00:00Z",
          lastChangeDate: "2024-01-01T00:00:00Z",
        })),
      })),
      limit: 25,
      page: 1,
      totalEntries: zones.length,
      totalPages: 1,
      type: "FindZonesResult",
    },
    errors: [],
    warnings: [],
    metadata: {
      serverTransactionId: "txn-123",
    },
  };
}

describe("zonesFind route", () => {
  it("should inject authToken into request body", async () => {
    let capturedBody: unknown;

    const mockResponse = createMockResponse([{ name: "example.com" }]);

    const client = createHostingDeClient({
      apiToken: "test-secret-token",
      routes: { zonesFind },
      fetcher: async (req) => {
        capturedBody = JSON.parse(req.init.body as string);
        return new Response(JSON.stringify(mockResponse), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    });

    const result = await client.zonesFind({});

    // Verify authToken was injected into body
    expect(capturedBody).toEqual({
      authToken: "test-secret-token",
    });

    // Verify response parsing
    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.status).toBe("success");
      expect(result.value.response.data).toHaveLength(1);
      expect(result.value.response.data[0].zoneConfig.name).toBe("example.com");
    }
  });

  it("should merge authToken with other body params", async () => {
    let capturedBody: unknown;

    const mockResponse = createMockResponse([]);

    const client = createHostingDeClient({
      apiToken: "my-token",
      routes: { zonesFind },
      fetcher: async (req) => {
        capturedBody = JSON.parse(req.init.body as string);
        return new Response(JSON.stringify(mockResponse), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    });

    await client.zonesFind({
      limit: 10,
      page: 2,
      filter: { field: "name", value: "test.com", relation: "equal" },
    });

    // Verify all params plus authToken
    expect(capturedBody).toEqual({
      authToken: "my-token",
      limit: 10,
      page: 2,
      filter: { field: "name", value: "test.com", relation: "equal" },
    });
  });

  it("should use correct endpoint URL", async () => {
    let capturedUrl: string = "";
    const mockResponse = createMockResponse([]);

    const client = createHostingDeClient({
      apiToken: "token",
      routes: { zonesFind },
      fetcher: async (req) => {
        capturedUrl = req.url;
        return new Response(JSON.stringify(mockResponse), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    });

    await client.zonesFind({});

    expect(capturedUrl).toBe("https://secure.hosting.de/api/dns/v1/json/zonesFind");
  });

  it("should use POST method", async () => {
    let capturedMethod: string = "";
    const mockResponse = createMockResponse([]);

    const client = createHostingDeClient({
      apiToken: "token",
      routes: { zonesFind },
      fetcher: async (req) => {
        capturedMethod = req.init.method ?? "GET";
        return new Response(JSON.stringify(mockResponse), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    });

    await client.zonesFind({});

    expect(capturedMethod).toBe("POST");
  });
});

describe("integration test (requires HOSTING_DE_API_TOKEN)", () => {
  const apiToken = process.env.HOSTING_DE_API_TOKEN;

  it.skipIf(!apiToken)("should fetch real zones from hosting.de", async () => {
    const client = createHostingDeClient({
      apiToken: apiToken!,
      routes: { zonesFind },
    });

    const result = await client.zonesFind({ limit: 5 });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.status).toBe("success");
      expect(result.value.response.type).toBe("FindZonesResult");
      console.log(`Found ${result.value.response.totalEntries} zones`);
    } else {
      console.error("API Error:", result.error);
    }
  });
});
