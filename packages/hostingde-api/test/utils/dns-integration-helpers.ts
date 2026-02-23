import { createHostingDeClient } from "../../src/index";
import {
  zonesFind,
  zoneConfigsFind,
  recordsFind,
  nameserverSetsFind,
  templatesFind,
  zoneUpdate,
  type ZoneConfig,
} from "../../src/routes/dns";

export type DnsIntegrationClient = ReturnType<
  typeof createHostingDeClient<{
    zonesFind: typeof zonesFind;
    zoneConfigsFind: typeof zoneConfigsFind;
    recordsFind: typeof recordsFind;
    nameserverSetsFind: typeof nameserverSetsFind;
    templatesFind: typeof templatesFind;
    zoneUpdate: typeof zoneUpdate;
  }>
>;

type DnsMutationResponse = {
  status?: "success" | "pending" | "error";
  errors?: Array<{ text?: string }>;
};

type ZoneUpdateInput = Parameters<DnsIntegrationClient["zoneUpdate"]>[0];
type ZoneUpdateResult = Awaited<ReturnType<DnsIntegrationClient["zoneUpdate"]>>;

export type DnsIntegrationContext = {
  client: DnsIntegrationClient;
  apiToken: string;
  dnsJsonApiBaseUrl: string;
};

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createUniqueZoneName(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${Date.now().toString(36)}-${random}.test`;
}

export function formatApiErrors(errors: Array<{ text?: string }> | undefined): string {
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

async function postDnsMutation(
  dnsJsonApiBaseUrl: string,
  apiToken: string,
  endpoint: string,
  payload: Record<string, unknown>,
): Promise<DnsMutationResponse> {
  const response = await fetch(`${dnsJsonApiBaseUrl}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ authToken: apiToken, ...payload }),
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

async function createTemporaryZone(
  dnsJsonApiBaseUrl: string,
  apiToken: string,
  zoneName: string,
): Promise<void> {
  await postDnsMutation(dnsJsonApiBaseUrl, apiToken, "zoneCreate", {
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

async function waitForZoneConfig(
  client: DnsIntegrationClient,
  zoneName: string,
  timeoutMs: number = 45000,
): Promise<ZoneConfig> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const result = await client.zonesFind({
      filter: { field: "zoneName", value: zoneName, relation: "equal" },
      limit: 1,
    });

    if (result.isOk() && result.value.response.data.length > 0) {
      return result.value.response.data[0].zoneConfig;
    }

    await sleep(1000);
  }

  throw new Error(`Timed out waiting for temporary zone ${zoneName}`);
}

async function deleteTemporaryZone(
  dnsJsonApiBaseUrl: string,
  apiToken: string,
  zoneName: string,
): Promise<void> {
  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      await postDnsMutation(dnsJsonApiBaseUrl, apiToken, "zoneDelete", { zoneName });
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (isZoneBusyError(message) && attempt < 10) {
        await sleep(1500);
        continue;
      }

      console.warn(`Cleanup warning for ${zoneName}:`, error);
      return;
    }
  }
}

export async function withTemporaryZone<T>(
  context: DnsIntegrationContext,
  prefix: string,
  callback: (zoneName: string, zoneConfig: ZoneConfig) => Promise<T>,
): Promise<T> {
  const zoneName = createUniqueZoneName(prefix);

  await createTemporaryZone(context.dnsJsonApiBaseUrl, context.apiToken, zoneName);
  const zoneConfig = await waitForZoneConfig(context.client, zoneName);

  try {
    return await callback(zoneName, zoneConfig);
  } finally {
    await deleteTemporaryZone(context.dnsJsonApiBaseUrl, context.apiToken, zoneName);
  }
}

export async function zoneUpdateWithRetry(
  client: DnsIntegrationClient,
  input: ZoneUpdateInput,
  attempts: number = 8,
): Promise<ZoneUpdateResult> {
  let result = await client.zoneUpdate(input);

  for (let attempt = 1; attempt < attempts; attempt++) {
    if (result.isErr()) return result;
    if (result.value.status !== "error") return result;

    const errorMessage = formatApiErrors(result.value.errors);
    if (!isZoneBusyError(errorMessage)) {
      return result;
    }

    await sleep(1500);
    result = await client.zoneUpdate(input);
  }

  return result;
}

export async function waitForRecordId(
  client: DnsIntegrationClient,
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

    await sleep(1000);
  }

  throw new Error(`Timed out waiting for record ${recordName} (${recordType})`);
}
