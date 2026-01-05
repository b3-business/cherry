import type { BaseSchema, InferInput, InferOutput } from "valibot";
import type { ResultAsync } from "neverthrow";
import type { CherryError } from "./errors";

/** HTTP methods supported by Cherry */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/** Path template result from path() tagged template */
export type PathTemplate = {
  template: string; // "/users/:id/posts/:postId"
  paramNames: string[]; // ["id", "postId"]
};

/** Route definition with separated parameter schemas */
export type CherryRoute<
  TPathParams extends BaseSchema<any, any, any> | undefined = undefined,
  TQueryParams extends BaseSchema<any, any, any> | undefined = undefined,
  TBodyParams extends BaseSchema<any, any, any> | undefined = undefined,
  TResponse extends BaseSchema<any, any, any> = BaseSchema<any, any, any>,
> = {
  method: HttpMethod;
  path: PathTemplate;
  pathParams?: TPathParams;
  queryParams?: TQueryParams;
  bodyParams?: TBodyParams;
  response: TResponse;
  queryParamOptions?: QueryParamOptions;
  description?: string;
};

/** Options for query parameter serialization */
export type QueryParamOptions = {
  arrayFormat?: "repeat" | "comma" | "brackets" | "json";
  customSerializer?: (params: Record<string, unknown>) => string;
};

type Prettify<T> = { [K in keyof T]: T[K] } & {};

/** Infer combined input params from a route */
export type InferRouteInput<T> = 
  T extends CherryRoute<infer TPath, infer TQuery, infer TBody, any>
    ? Prettify<
        (TPath extends BaseSchema<any, any, any> ? InferInput<TPath> : {}) &
        (TQuery extends BaseSchema<any, any, any> ? InferInput<TQuery> : {}) &
        (TBody extends BaseSchema<any, any, any> ? InferInput<TBody> : {})
      >
    : never;

/** Infer response output from a route */
export type InferRouteOutput<T extends CherryRoute<any, any, any, any>> =
  T["response"] extends BaseSchema<any, any, any> ? InferOutput<T["response"]> : never;

/** Cherry result type - always ResultAsync */
export type CherryResult<T> = ResultAsync<T, CherryError>;

/** Fetcher request shape (extensible for middleware) */
export type FetchRequest = {
  url: string;
  init: RequestInit;
};

/** Fetcher function signature */
export type Fetcher = (req: FetchRequest) => Promise<Response>;

/** Route tree (supports namespacing via nested objects) */
export type RouteTree = {
  [key: string]: CherryRoute<any, any, any, any> | RouteTree;
};

/** Client configuration */
export type ClientConfig<TRoutes extends RouteTree | undefined = undefined> = {
  baseUrl: string;
  headers?: () => Record<string, string> | Promise<Record<string, string>>;
  fetcher?: Fetcher;
  routes?: TRoutes;
};

export type Client<TRoutes extends RouteTree | undefined = undefined> = {
  call: <T extends CherryRoute<any, any, any, any>>(
    route: T,
    params: InferRouteInput<T>,
  ) => CherryResult<InferRouteOutput<T>>;
} & (TRoutes extends RouteTree ? RoutesToClient<TRoutes> : {});

/** Convert a nested route tree into a nested client method tree */
export type RoutesToClient<TRoutes extends RouteTree> = {
  [K in keyof TRoutes]: TRoutes[K] extends CherryRoute<any, any, any, any>
    ? (params: InferRouteInput<TRoutes[K]>) => CherryResult<InferRouteOutput<TRoutes[K]>>
    : TRoutes[K] extends RouteTree
      ? RoutesToClient<TRoutes[K]>
      : never;
};
