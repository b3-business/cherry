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

type HasRequiredKeys<T> = keyof T extends never ? false : true;

type IsEmptyInput<T> = T extends Record<string, never> 
  ? true 
  : keyof T extends never 
    ? true 
    : false;

/**
 * Extracts input type from a Valibot schema, handling undefined/never edge cases.
 * 
 * Uses tuple wrapping `[T] extends [X]` to prevent distributive conditional behavior.
 * Without this, `Schema | undefined` would distribute and produce `InferInput<Schema> | {}`
 * which simplifies to `{}` (losing the required properties).
 * 
 * The check order matters:
 * 1. `[T] extends [undefined]` - schema not provided, return empty object
 * 2. `[NonNullable<T>] extends [never]` - T was only undefined, return empty object  
 * 3. `[NonNullable<T>] extends [BaseSchema]` - valid schema, infer its input type
 */
type InferSchemaInput<T> = 
  [T] extends [undefined] 
    ? {}
    : [NonNullable<T>] extends [never] 
      ? {} 
      : [NonNullable<T>] extends [BaseSchema<any, any, any>] 
        ? InferInput<NonNullable<T>> 
        : {};

type BuildRouteInputFromProps<
  TPathParams,
  TQueryParams,
  TBodyParams
> = InferSchemaInput<TPathParams> &
    InferSchemaInput<TQueryParams> &
    InferSchemaInput<TBodyParams>;

/**
 * Infers combined input params from a route by extracting from property types directly.
 * 
 * Uses property-based inference `{ pathParams?: infer TPath }` instead of generic inference
 * because generic inference through CherryRoute<infer P, ...> can lose concrete types
 * when optional properties aren't provided (TypeScript infers the full constraint instead).
 */
export type InferRouteInput<T> = 
  T extends { pathParams?: infer TPath; queryParams?: infer TQuery; bodyParams?: infer TBody }
    ? HasRequiredKeys<BuildRouteInputFromProps<TPath, TQuery, TBody>> extends true
      ? Prettify<BuildRouteInputFromProps<TPath, TQuery, TBody>>
      : Record<string, never>
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
    ...args: IsEmptyInput<InferRouteInput<T>> extends true
      ? [params?: InferRouteInput<T>]
      : [params: InferRouteInput<T>]
  ) => CherryResult<InferRouteOutput<T>>;
} & (TRoutes extends RouteTree ? RoutesToClient<TRoutes> : {});

/** Convert a nested route tree into a nested client method tree */
export type RoutesToClient<TRoutes extends RouteTree> = {
  [K in keyof TRoutes]: TRoutes[K] extends CherryRoute<any, any, any, any>
    ? IsEmptyInput<InferRouteInput<TRoutes[K]>> extends true
      ? (params?: InferRouteInput<TRoutes[K]>) => CherryResult<InferRouteOutput<TRoutes[K]>>
      : (params: InferRouteInput<TRoutes[K]>) => CherryResult<InferRouteOutput<TRoutes[K]>>
    : TRoutes[K] extends RouteTree
      ? RoutesToClient<TRoutes[K]>
      : never;
};
