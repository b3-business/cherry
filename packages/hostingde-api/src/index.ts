/**
 * hosting.de API Client
 *
 * A tree-shakeable API client for hosting.de using Cherry.
 * API Documentation: https://www.hosting.de/api/
 */

import { createCherryClient, type ClientConfig, type RouteTree } from "@b3-business/cherry";

export type HostingDeClientConfig = Omit<ClientConfig<RouteTree>, "baseUrl" | "routes"> & {
  /**
   * Your hosting.de API token.
   * Get it from: https://secure.hosting.de/profile/api-keys
   */
  apiToken: string;
  /**
   * Optional: Override the base URL (default: https://secure.hosting.de/api)
   */
  baseUrl?: string;
};

/**
 * Create a hosting.de API client.
 *
 * @example
 * ```ts
 * import { createHostingDeClient } from "@b3-business/hosting.de";
 * import { listDomains, getDomain } from "@b3-business/hosting.de/routes";
 *
 * const client = createHostingDeClient({
 *   apiToken: process.env.HOSTING_DE_API_TOKEN!,
 *   routes: { listDomains, getDomain },
 * });
 *
 * const domains = await client.listDomains({});
 * ```
 */
export function createHostingDeClient<Routes extends RouteTree = RouteTree>(
  config: HostingDeClientConfig & { routes?: Routes }
) {
  const { apiToken, baseUrl = "https://secure.hosting.de/api", routes, ...rest } = config;

  return createCherryClient({
    baseUrl,
    headers: () => ({
      "Content-Type": "application/json",
      "X-Auth-Token": apiToken,
    }),
    routes: routes as Routes,
    ...rest,
  });
}

// Re-export cherry types for convenience
export type { CherryError, HttpError, ValidationError, NetworkError } from "@b3-business/cherry";

// Routes will be exported from separate files as they are implemented
// export * from "./routes/domains";
// export * from "./routes/dns";
// export * from "./routes/ssl";
