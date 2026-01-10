/**
 * hosting.de API Client
 *
 * A tree-shakeable API client for hosting.de using Cherry.
 * API Documentation: https://www.hosting.de/api/
 *
 * IMPORTANT: hosting.de API characteristics:
 * - All endpoints use POST (even for reads)
 * - Authentication via `authToken` in request BODY (not headers!)
 * - Response wrapped in { status, response, metadata }
 */

import { createCherryClient, type ClientConfig, type RouteTree, type Fetcher } from "@b3-business/cherry";

export type HostingDeClientConfig = Omit<ClientConfig<RouteTree>, "baseUrl" | "routes" | "headers"> & {
  /**
   * Your hosting.de API token.
   * Get it from: https://secure.hosting.de/profile/api-keys
   *
   * Note: This token is injected into the request BODY, not headers.
   * The hosting.de API requires authToken in every request body.
   */
  apiToken: string;
  /**
   * Optional: Override the base URL (default: https://secure.hosting.de/api)
   */
  baseUrl?: string;
};

/**
 * Create a custom fetcher that injects authToken into request body.
 * hosting.de requires auth in body, not headers.
 */
function createAuthInjector(apiToken: string, baseFetcher?: Fetcher): Fetcher {
  return async (req) => {
    // Clone the request init to avoid mutation
    const init = { ...req.init };

    // If there's a body, inject authToken
    if (init.body) {
      try {
        const body = JSON.parse(init.body as string);
        body.authToken = apiToken;
        init.body = JSON.stringify(body);
      } catch {
        // If body isn't JSON, leave it alone
      }
    } else {
      // Create body with just authToken for bodyless requests
      init.body = JSON.stringify({ authToken: apiToken });
    }

    // Ensure content-type is set
    init.headers = {
      ...init.headers,
      "Content-Type": "application/json",
    };

    const fetcher = baseFetcher ?? ((r) => fetch(r.url, r.init));
    return fetcher({ url: req.url, init });
  };
}

/**
 * Create a hosting.de API client.
 *
 * @example
 * ```ts
 * import { createHostingDeClient } from "@b3-business/hosting.de";
 * import { zonesFind } from "@b3-business/hosting.de/routes/dns";
 *
 * const client = createHostingDeClient({
 *   apiToken: process.env.HOSTING_DE_API_TOKEN!,
 *   routes: { zonesFind },
 * });
 *
 * // authToken is automatically injected into the request body
 * const zones = await client.zonesFind({});
 * ```
 */
export function createHostingDeClient<Routes extends RouteTree = RouteTree>(
  config: HostingDeClientConfig & { routes?: Routes }
) {
  const { apiToken, baseUrl = "https://secure.hosting.de/api/", routes, fetcher: userFetcher, ...rest } = config;

  return createCherryClient({
    baseUrl,
    fetcher: createAuthInjector(apiToken, userFetcher),
    routes: routes as Routes,
    ...rest,
  });
}

// Re-export cherry types for convenience
export type { CherryError, HttpError, ValidationError, NetworkError } from "@b3-business/cherry";

// Routes are exported from separate files
export * from "./routes/dns";
