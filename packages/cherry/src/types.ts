import type { BaseSchema, InferInput, InferOutput } from "valibot";
import type { ResultAsync } from "neverthrow";
import type { CherryError } from "./errors";

type AnySchema = BaseSchema<any, any, any>;

/** HTTP methods supported by Cherry */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/** Path template result from path() tagged template */
export type PathTemplate = {
  template: string; // "/users/:id/posts/:postId"
  paramNames: string[]; // ["id", "postId"]
};

/** Route definition with separated parameter schemas */
export type CherryRoute<
  TPathParams extends AnySchema | undefined = undefined,
  TQueryParams extends AnySchema | undefined = undefined,
  TBodyParams extends AnySchema | undefined = undefined,
  TResponse extends AnySchema = AnySchema,
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

type AnyCherryRoute = CherryRoute<any, any, any, any>;

type Prettify<T> = { [K in keyof T]: T[K] } & {};

type IsEmptyObject<T> = keyof T extends never ? true : false;

type InferSchemaInput<T> = T extends AnySchema ? InferInput<T> : {};

type BuildRouteInputFromProps<TPathParams, TQueryParams, TBodyParams> =
  InferSchemaInput<TPathParams> & InferSchemaInput<TQueryParams> & InferSchemaInput<TBodyParams>;

export type InferRouteInput<T> = T extends {
  pathParams?: infer TPath;
  queryParams?: infer TQuery;
  bodyParams?: infer TBody;
}
  ? IsEmptyObject<BuildRouteInputFromProps<TPath, TQuery, TBody>> extends true
    ? void
    : Prettify<BuildRouteInputFromProps<TPath, TQuery, TBody>>
  : never;

/** Infer response output from a route */
export type InferRouteOutput<T extends AnyCherryRoute> = T["response"] extends AnySchema
  ? InferOutput<T["response"]>
  : never;

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
  [key: string]: AnyCherryRoute | RouteTree;
};

/** Client configuration */
export type ClientConfig<TRoutes extends RouteTree | undefined = undefined> = {
  baseUrl: string;
  headers?: () => Record<string, string> | Promise<Record<string, string>>;
  fetcher?: Fetcher;
  routes?: TRoutes;
};

export type Client<TRoutes extends RouteTree | undefined = undefined> = {
  call: <T extends AnyCherryRoute>(
    route: T,
    ...args: InferRouteInput<T> extends void ? [] : [params: InferRouteInput<T>]
  ) => CherryResult<InferRouteOutput<T>>;
} & (TRoutes extends RouteTree ? RoutesToClient<TRoutes> : {});

/** Convert a nested route tree into a nested client method tree */
export type RoutesToClient<TRoutes extends RouteTree> = {
  [K in keyof TRoutes]: TRoutes[K] extends AnyCherryRoute
    ? InferRouteInput<TRoutes[K]> extends void
      ? () => CherryResult<InferRouteOutput<TRoutes[K]>>
      : (params: InferRouteInput<TRoutes[K]>) => CherryResult<InferRouteOutput<TRoutes[K]>>
    : TRoutes[K] extends RouteTree
      ? RoutesToClient<TRoutes[K]>
      : never;
};
