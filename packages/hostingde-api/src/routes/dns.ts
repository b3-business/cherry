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

/**
 * DNS Record input for create/update (without server-generated fields)
 */
export const DnsRecordInputSchema = v.object({
  name: v.string(),
  type: v.string(),
  content: v.string(),
  ttl: v.optional(v.number()),
  priority: v.optional(v.nullable(v.number())),
  comments: v.optional(v.string()),
});

/**
 * DNS Record for modification (includes id)
 */
export const DnsRecordModifySchema = v.object({
  id: v.string(),
  name: v.string(),
  type: v.string(),
  content: v.string(),
  ttl: v.optional(v.number()),
  priority: v.optional(v.nullable(v.number())),
  comments: v.optional(v.string()),
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
 * Zone config input for updates (partial)
 */
export const ZoneConfigInputSchema = v.object({
  id: v.optional(v.string()),
  name: v.string(),
  type: v.optional(v.string()),
  emailAddress: v.optional(v.string()),
  masterIp: v.optional(v.string()),
  dnsSecMode: v.optional(v.string()),
  soaValues: v.optional(v.partial(SoaValuesSchema)),
  templateValues: v.optional(v.unknown()),
  zoneTransferWhitelist: v.optional(v.array(v.string())),
});

/**
 * Zone with records (returned by zonesFind)
 */
export const ZoneWithRecordsSchema = v.object({
  zoneConfig: ZoneConfigSchema,
  records: v.array(DnsRecordSchema),
});

// ============================================================================
// Nameserver Set Schema
// ============================================================================

export const NameserverSchema = v.object({
  name: v.string(),
  ips: v.optional(v.array(v.string())),
});

export const NameserverSetSchema = v.object({
  id: v.string(),
  accountId: v.string(),
  name: v.string(),
  nameservers: v.array(NameserverSchema),
  isDefault: v.boolean(),
  addDate: v.string(),
  lastChangeDate: v.string(),
});

// ============================================================================
// Template Schema
// ============================================================================

export const TemplateSchema = v.object({
  id: v.string(),
  accountId: v.string(),
  name: v.string(),
  type: v.optional(v.string()),
  addDate: v.string(),
  lastChangeDate: v.string(),
});

// ============================================================================
// Response Schemas
// ============================================================================

/**
 * Generic paginated response wrapper
 */
function createFindResponseSchema<T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(
  dataSchema: T,
  typeLiteral: string
) {
  return v.object({
    status: StatusSchema,
    response: v.object({
      data: v.array(dataSchema),
      limit: v.number(),
      page: v.number(),
      totalEntries: v.number(),
      totalPages: v.number(),
      type: v.literal(typeLiteral),
    }),
    errors: v.array(ApiErrorSchema),
    warnings: v.array(ApiErrorSchema),
    metadata: MetadataSchema,
  });
}

// zonesFind response
export const ZonesFindResponseSchema = v.object({
  status: StatusSchema,
  response: v.object({
    data: v.array(ZoneWithRecordsSchema),
    limit: v.number(),
    page: v.number(),
    totalEntries: v.number(),
    totalPages: v.number(),
    type: v.literal("FindZonesResult"),
  }),
  errors: v.array(ApiErrorSchema),
  warnings: v.array(ApiErrorSchema),
  metadata: MetadataSchema,
});

// zoneConfigsFind response
export const ZoneConfigsFindResponseSchema = v.object({
  status: StatusSchema,
  response: v.object({
    data: v.array(ZoneConfigSchema),
    limit: v.number(),
    page: v.number(),
    totalEntries: v.number(),
    totalPages: v.number(),
    type: v.literal("FindZoneConfigsResult"),
  }),
  errors: v.array(ApiErrorSchema),
  warnings: v.array(ApiErrorSchema),
  metadata: MetadataSchema,
});

// recordsFind response
export const RecordsFindResponseSchema = v.object({
  status: StatusSchema,
  response: v.object({
    data: v.array(DnsRecordSchema),
    limit: v.number(),
    page: v.number(),
    totalEntries: v.number(),
    totalPages: v.number(),
    type: v.literal("FindRecordsResult"),
  }),
  errors: v.array(ApiErrorSchema),
  warnings: v.array(ApiErrorSchema),
  metadata: MetadataSchema,
});

// nameserverSetsFind response
export const NameserverSetsFindResponseSchema = v.object({
  status: StatusSchema,
  response: v.object({
    data: v.array(NameserverSetSchema),
    limit: v.number(),
    page: v.number(),
    totalEntries: v.number(),
    totalPages: v.number(),
    type: v.literal("FindNameserverSetsResult"),
  }),
  errors: v.array(ApiErrorSchema),
  warnings: v.array(ApiErrorSchema),
  metadata: MetadataSchema,
});

// templatesFind response  
export const TemplatesFindResponseSchema = v.object({
  status: StatusSchema,
  response: v.object({
    data: v.array(TemplateSchema),
    limit: v.number(),
    page: v.number(),
    totalEntries: v.number(),
    totalPages: v.number(),
    type: v.literal("FindTemplatesResult"),
  }),
  errors: v.array(ApiErrorSchema),
  warnings: v.array(ApiErrorSchema),
  metadata: MetadataSchema,
});

// zoneUpdate response (can return error OR success with response)
export const ZoneUpdateResponseSchema = v.object({
  status: StatusSchema,
  // response is optional - not present on error status
  response: v.optional(v.object({
    zoneConfig: ZoneConfigSchema,
    records: v.array(DnsRecordSchema),
  })),
  errors: v.array(ApiErrorSchema),
  warnings: v.array(ApiErrorSchema),
  metadata: MetadataSchema,
});

// ============================================================================
// Standard find params schema
// ============================================================================

const FindParamsSchema = v.object({
  filter: v.optional(FilterSchema),
  limit: v.optional(v.number()),
  page: v.optional(v.number()),
  sort: v.optional(SortSchema),
});

// ============================================================================
// DNS Routes
// ============================================================================

/**
 * Find DNS zones with records
 */
export const zonesFind = route({
  method: "POST",
  path: path`dns/v1/json/zonesFind`,
  bodyParams: FindParamsSchema,
  response: ZonesFindResponseSchema,
});

/**
 * Find zone configs (without records - lighter response)
 */
export const zoneConfigsFind = route({
  method: "POST",
  path: path`dns/v1/json/zoneConfigsFind`,
  bodyParams: FindParamsSchema,
  response: ZoneConfigsFindResponseSchema,
});

/**
 * Find DNS records with filtering
 */
export const recordsFind = route({
  method: "POST",
  path: path`dns/v1/json/recordsFind`,
  bodyParams: FindParamsSchema,
  response: RecordsFindResponseSchema,
});

/**
 * Find nameserver sets
 */
export const nameserverSetsFind = route({
  method: "POST",
  path: path`dns/v1/json/nameserverSetsFind`,
  bodyParams: FindParamsSchema,
  response: NameserverSetsFindResponseSchema,
});

/**
 * Find DNS templates
 */
export const templatesFind = route({
  method: "POST",
  path: path`dns/v1/json/templatesFind`,
  bodyParams: FindParamsSchema,
  response: TemplatesFindResponseSchema,
});

/**
 * Update a DNS zone (config and/or records)
 * 
 * This is THE key endpoint for DNS management.
 * Use recordsToAdd/recordsToModify/recordsToDelete to manage records.
 */
export const zoneUpdate = route({
  method: "POST",
  path: path`dns/v1/json/zoneUpdate`,
  bodyParams: v.object({
    zoneConfig: ZoneConfigInputSchema,
    recordsToAdd: v.optional(v.array(DnsRecordInputSchema)),
    recordsToModify: v.optional(v.array(DnsRecordModifySchema)),
    recordsToDelete: v.optional(v.array(v.object({ id: v.string() }))),
  }),
  response: ZoneUpdateResponseSchema,
});

// ============================================================================
// Type exports
// ============================================================================

export type DnsRecord = v.InferOutput<typeof DnsRecordSchema>;
export type DnsRecordInput = v.InferOutput<typeof DnsRecordInputSchema>;
export type DnsRecordModify = v.InferOutput<typeof DnsRecordModifySchema>;
export type ZoneConfig = v.InferOutput<typeof ZoneConfigSchema>;
export type ZoneConfigInput = v.InferOutput<typeof ZoneConfigInputSchema>;
export type ZoneWithRecords = v.InferOutput<typeof ZoneWithRecordsSchema>;
export type NameserverSet = v.InferOutput<typeof NameserverSetSchema>;
export type Template = v.InferOutput<typeof TemplateSchema>;
export type ZonesFindResponse = v.InferOutput<typeof ZonesFindResponseSchema>;
export type ZoneConfigsFindResponse = v.InferOutput<typeof ZoneConfigsFindResponseSchema>;
export type RecordsFindResponse = v.InferOutput<typeof RecordsFindResponseSchema>;
export type NameserverSetsFindResponse = v.InferOutput<typeof NameserverSetsFindResponseSchema>;
export type TemplatesFindResponse = v.InferOutput<typeof TemplatesFindResponseSchema>;
export type ZoneUpdateResponse = v.InferOutput<typeof ZoneUpdateResponseSchema>;
export type Filter = v.InferOutput<typeof FilterSchema>;
export type Sort = v.InferOutput<typeof SortSchema>;
export type ApiError = v.InferOutput<typeof ApiErrorSchema>;
