/**
 * hosting.de DNS API Routes
 *
 * Documentation: https://www.hosting.de/api/#dns
 */

import * as v from "valibot";
import { route, path } from "@b3-business/cherry";

// ============================================================================
// Shared Schemas
// ============================================================================

/**
 * Metadata returned with every hosting.de API response
 */
export const MetadataSchema = v.object({
  serverTransactionId: v.string(),
  clientTransactionId: v.optional(v.string()),
});

/**
 * Filter for find/list operations
 */
export const FilterSchema = v.object({
  field: v.string(),
  value: v.string(),
  relation: v.optional(
    v.picklist(["equal", "unequal", "greater", "less", "greaterEqual", "lessEqual"])
  ),
});

/**
 * Sort options for find/list operations
 */
export const SortSchema = v.object({
  field: v.string(),
  order: v.picklist(["ASC", "DESC"]),
});

/**
 * API response status
 */
export const StatusSchema = v.picklist(["success", "pending", "error"]);

/**
 * API error object
 */
export const ApiErrorSchema = v.object({
  code: v.number(),
  contextObject: v.string(),
  contextPath: v.string(),
  details: v.array(v.unknown()),
  text: v.string(),
  value: v.string(),
});

// ============================================================================
// DNS Record Schema
// ============================================================================

/**
 * DNS Record object
 */
export const DnsRecordSchema = v.object({
  id: v.string(),
  accountId: v.string(),
  zoneConfigId: v.string(),
  name: v.string(),
  type: v.string(),
  content: v.string(),
  ttl: v.number(),
  priority: v.nullable(v.number()),
  comments: v.string(),
  recordTemplateId: v.nullable(v.string()),
  addDate: v.string(),
  lastChangeDate: v.string(),
});

// ============================================================================
// DNS Zone Config Schema
// ============================================================================

/**
 * SOA (Start of Authority) values
 */
export const SoaValuesSchema = v.object({
  refresh: v.number(),
  retry: v.number(),
  expire: v.number(),
  ttl: v.number(),
  negativeTtl: v.number(),
});

/**
 * DNS Zone Config object
 */
export const ZoneConfigSchema = v.object({
  id: v.string(),
  accountId: v.string(),
  name: v.string(),
  nameUnicode: v.string(),
  type: v.string(),
  emailAddress: v.string(),
  masterIp: v.string(),
  status: v.string(),
  dnsSecMode: v.string(),
  dnsServerGroupId: v.nullable(v.string()),
  soaValues: SoaValuesSchema,
  templateValues: v.nullable(v.unknown()),
  zoneTransferWhitelist: v.array(v.string()),
  restorableUntil: v.nullable(v.string()),
  addDate: v.string(),
  lastChangeDate: v.string(),
});

/**
 * Zone with records (returned by zonesFind)
 */
export const ZoneWithRecordsSchema = v.object({
  zoneConfig: ZoneConfigSchema,
  records: v.array(DnsRecordSchema),
});

// ============================================================================
// zonesFind Response Schema
// ============================================================================

/**
 * Response data for zonesFind
 */
export const FindZonesDataSchema = v.object({
  data: v.array(ZoneWithRecordsSchema),
  limit: v.number(),
  page: v.number(),
  totalEntries: v.number(),
  totalPages: v.number(),
  type: v.literal("FindZonesResult"),
});

/**
 * Full response for zonesFind
 */
export const ZonesFindResponseSchema = v.object({
  status: StatusSchema,
  response: FindZonesDataSchema,
  errors: v.array(ApiErrorSchema),
  warnings: v.array(ApiErrorSchema),
  metadata: MetadataSchema,
});

// ============================================================================
// DNS Routes
// ============================================================================

/**
 * Find DNS zones
 *
 * Lists all DNS zones for the authenticated account.
 * Supports filtering, sorting, and pagination.
 * Returns zone configs with their DNS records.
 *
 * @example
 * ```ts
 * const client = createHostingDeClient({ apiToken: "...", routes: { zonesFind } });
 *
 * // List all zones (authToken injected automatically)
 * const result = await client.zonesFind({});
 *
 * // With pagination
 * const result = await client.zonesFind({ limit: 10, page: 1 });
 *
 * // With filter
 * const result = await client.zonesFind({
 *   filter: { field: "ZoneConfigName", value: "example.com", relation: "equal" }
 * });
 *
 * // Access zones and records
 * if (result.isOk()) {
 *   for (const zone of result.value.response.data) {
 *     console.log(zone.zoneConfig.name);
 *     for (const record of zone.records) {
 *       console.log(`  ${record.type} ${record.name} -> ${record.content}`);
 *     }
 *   }
 * }
 * ```
 */
export const zonesFind = route({
  method: "POST",
  path: path`dns/v1/json/zonesFind`,
  bodyParams: v.object({
    // Note: authToken is injected automatically by the client
    filter: v.optional(FilterSchema),
    limit: v.optional(v.number()),
    page: v.optional(v.number()),
    sort: v.optional(SortSchema),
  }),
  response: ZonesFindResponseSchema,
});

// Type exports for consumers
export type DnsRecord = v.InferOutput<typeof DnsRecordSchema>;
export type ZoneConfig = v.InferOutput<typeof ZoneConfigSchema>;
export type ZoneWithRecords = v.InferOutput<typeof ZoneWithRecordsSchema>;
export type ZonesFindResponse = v.InferOutput<typeof ZonesFindResponseSchema>;
export type Filter = v.InferOutput<typeof FilterSchema>;
export type Sort = v.InferOutput<typeof SortSchema>;
export type ApiError = v.InferOutput<typeof ApiErrorSchema>;
