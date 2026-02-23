import { ResultAsync } from "neverthrow";
import * as v from "valibot";
import type {
  CherryRoute,
  CherryResult,
  InferRouteInput,
  InferRouteOutput,
  Fetcher,
  FetchRequest,
  ClientConfig,
  Client,
  RouteTree,
  RoutesToClient,
  QueryParamOptions,
} from "./types";
import {
  HttpError,
  ValidationError,
  NetworkError,
  SerializationError,
  UnknownCherryError,
} from "./errors";

const defaultFetcher: Fetcher = (req) => fetch(req.url, req.init);

export function serializeQueryParams(
  params: Record<string, unknown>,
  options?: QueryParamOptions,
): string {
  if (options?.customSerializer) {
    return options.customSerializer(params);
  }

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      switch (options?.arrayFormat ?? "repeat") {
        case "repeat":
          for (const item of value) {
            searchParams.append(key, String(item));
          }
          break;
        case "comma":
          searchParams.set(key, value.join(","));
          break;
        case "brackets":
          for (const item of value) {
            searchParams.append(`${key}[]`, String(item));
          }
          break;
        case "json":
          try {
            searchParams.set(key, JSON.stringify(value));
          } catch (error) {
            throw new SerializationError("query", key, error);
          }
          break;
      }
    } else {
      searchParams.set(key, String(value));
    }
  }

  return searchParams.toString();
}

export function createCherryClient<TRoutes extends RouteTree | undefined = undefined>(
  config: ClientConfig<TRoutes>,
): Client<TRoutes> {
  const fetcher = config.fetcher ?? defaultFetcher;

  function call<T extends CherryRoute<any, any, any, any>>(
    route: T,
    params: InferRouteInput<T>,
  ): CherryResult<InferRouteOutput<T>> {
    return ResultAsync.fromPromise(executeRoute(route, params), (error) => {
      if (error instanceof HttpError) return error;
      if (error instanceof ValidationError) return error;
      if (error instanceof NetworkError) return error;
      if (error instanceof SerializationError) return error;
      return new UnknownCherryError(error);
    });
  }

  async function executeRoute<T extends CherryRoute<any, any, any, any>>(
    route: T,
    params: InferRouteInput<T>,
  ): Promise<InferRouteOutput<T>> {
    let pathParams: Record<string, unknown> = {};
    if (route.pathParams) {
      const result = v.safeParse(route.pathParams, params);
      if (!result.success) throw new ValidationError("request", result.issues);
      pathParams = result.output;
    }

    let queryParams: Record<string, unknown> = {};
    if (route.queryParams) {
      const result = v.safeParse(route.queryParams, params);
      if (!result.success) throw new ValidationError("request", result.issues);
      queryParams = result.output;
    }

    let bodyParams: Record<string, unknown> | undefined;
    if (route.bodyParams) {
      const result = v.safeParse(route.bodyParams, params);
      if (!result.success) throw new ValidationError("request", result.issues);
      bodyParams = result.output;
    }

    let url = route.path.template;
    for (const [key, value] of Object.entries(pathParams)) {
      url = url.replace(`:${key}`, encodeURIComponent(String(value)));
    }

    const fullUrl = new URL(url, config.baseUrl);

    if (Object.keys(queryParams).length > 0) {
      fullUrl.search = serializeQueryParams(queryParams, route.queryParamOptions);
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(await config.headers?.()),
    };

    const init: RequestInit = {
      method: route.method,
      headers,
    };

    if (bodyParams && route.method !== "GET") {
      init.body = JSON.stringify(bodyParams);
    }

    const req: FetchRequest = {
      url: fullUrl.toString(),
      init,
    };

    let response: Response;
    try {
      response = await fetcher(req);
    } catch (error) {
      throw new NetworkError(error);
    }

    if (!response.ok) {
      const body = await response.text().catch(() => undefined);
      throw new HttpError(response.status, response.statusText, body);
    }

    const json = await response.json();
    const result = v.safeParse(route.response, json);
    if (!result.success) throw new ValidationError("response", result.issues);

    return result.output;
  }

  function forgeRouteMethods<T extends RouteTree>(routes: T): RoutesToClient<T> {
    const out: any = {};

    for (const [key, value] of Object.entries(routes)) {
      if (value && typeof value === "object" && "method" in value && "path" in value) {
        out[key] = (params: any) => call(value as any, params);
      } else if (value && typeof value === "object") {
        out[key] = forgeRouteMethods(value as RouteTree);
      }
    }

    return out;
  }

  const routes = config.routes ? forgeRouteMethods(config.routes) : {};
  return { call, ...routes } as Client<TRoutes>;
}
