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

// ============================================================================
// DNS Zone Schemas
// ============================================================================

/**
 * DNS Zone object
 */
export const ZoneSchema = v.object({
  id: v.string(),
  accountId: v.string(),
  name: v.string(),
  type: v.string(),
  emailAddress: v.string(),
  zoneTransferWhitelist: v.array(v.string()),
  lastChangeDate: v.string(),
  // Additional optional fields that may be present
  masterIp: v.optional(v.string()),
  comment: v.optional(v.string()),
  addDate: v.optional(v.string()),
});

/**
 * Response data for zonesFind
 */
export const FindZonesDataSchema = v.object({
  data: v.array(ZoneSchema),
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
 *   filter: { field: "name", value: "example.com", relation: "equal" }
 * });
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
export type Zone = v.InferOutput<typeof ZoneSchema>;
export type ZonesFindResponse = v.InferOutput<typeof ZonesFindResponseSchema>;
export type Filter = v.InferOutput<typeof FilterSchema>;
export type Sort = v.InferOutput<typeof SortSchema>;
