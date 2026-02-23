import { describe, it, expect } from "bun:test";
import { expectTypeOf } from "expect-type";
import type { ResultAsync } from "neverthrow";
import * as v from "valibot";
import type { CherryError } from "../src/errors";
import type {
  HttpMethod,
  PathTemplate,
  CherryRoute,
  QueryParamOptions,
  InferRouteInput,
  InferRouteOutput,
  CherryResult,
  FetchRequest,
  Fetcher,
  RouteTree,
  ClientConfig,
  Client,
  RoutesToClient,
} from "../src/types";

/**
 * HttpMethod: Simple string literal union for REST verbs.
 * Example: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
 * This constrains route.method to valid HTTP methods only.
 */
describe("HttpMethod", () => {
  it("should be a union of allowed methods", () => {
    expectTypeOf<HttpMethod>().toEqualTypeOf<"GET" | "POST" | "PUT" | "PATCH" | "DELETE">();
  });

  it("should accept valid methods", () => {
    const method1: HttpMethod = "GET";
    const method2: HttpMethod = "POST";
    const method3: HttpMethod = "PUT";
    const method4: HttpMethod = "PATCH";
    const method5: HttpMethod = "DELETE";
    expect([method1, method2, method3, method4, method5]).toBeDefined();
  });
});

/**
 * PathTemplate: Holds parsed URL template + extracted param names.
 * Example: { template: "/users/:id", paramNames: ["id"] }
 * The paramNames array enables runtime path interpolation:
 *   "/users/:id" + {id: "123"} -> "/users/123"
 */
describe("PathTemplate", () => {
  it("should have correct structure", () => {
    const path: PathTemplate = {
      template: "/users/:id/posts/:postId",
      paramNames: ["id", "postId"],
    };
    expectTypeOf(path.template).toBeString();
    expectTypeOf(path.paramNames).toBeArray();
    expectTypeOf(path.paramNames).items.toBeString();
  });

  it("should handle empty param names", () => {
    const path: PathTemplate = {
      template: "/health",
      paramNames: [],
    };
    expect(path.paramNames).toHaveLength(0);
  });
});

/**
 * QueryParamOptions: Controls how arrays serialize in query strings.
 * Example: tags=["a","b"] with arrayFormat:
 *   "repeat"   -> ?tags=a&tags=b
 *   "comma"    -> ?tags=a,b
 *   "brackets" -> ?tags[]=a&tags[]=b
 */
describe("QueryParamOptions", () => {
  it("should accept array format options", () => {
    const options1: QueryParamOptions = {
      arrayFormat: "repeat",
    };
    const options2: QueryParamOptions = {
      arrayFormat: "comma",
    };
    const options3: QueryParamOptions = {
      arrayFormat: "brackets",
    };
    expect([options1, options2, options3]).toBeDefined();
  });

  it("should accept custom serializer", () => {
    const options: QueryParamOptions = {
      customSerializer: (params) =>
        Object.entries(params)
          .map(([k, v]) => `${k}=${v}`)
          .join("&"),
    };
    // Assert customSerializer is defined before type checks
    const serializer = options.customSerializer!;
    expectTypeOf(serializer).toBeFunction();
    expectTypeOf(serializer).parameters.toEqualTypeOf<[params: Record<string, unknown>]>();
    expectTypeOf(serializer).returns.toBeString();
  });

  it("should be optional", () => {
    const route: Partial<Pick<CherryRoute, "queryParamOptions">> = {};
    expect(route.queryParamOptions).toBeUndefined();
  });
});

/**
 * CherryRoute<TPath, TQuery, TBody, TResponse>: Core route definition.
 * Four generic slots for Valibot schemas (all optional except response).
 * Example: CherryRoute<PathSchema, QuerySchema, BodySchema, ResponseSchema>
 * Each schema slot can be `undefined` for routes that don't need that param type.
 * The client uses these generics to infer input/output types at compile time.
 */
describe("CherryRoute", () => {
  const PathSchema = v.object({
    id: v.string(),
  });

  const QuerySchema = v.object({
    include: v.optional(v.array(v.string())),
  });

  const BodySchema = v.object({
    name: v.string(),
    email: v.string(),
  });

  const ResponseSchema = v.object({
    id: v.string(),
    name: v.string(),
    email: v.string(),
  });

  it("should accept all parameter schemas", () => {
    const route: CherryRoute<
      typeof PathSchema,
      typeof QuerySchema,
      typeof BodySchema,
      typeof ResponseSchema
    > = {
      method: "POST",
      path: { template: "/users/:id", paramNames: ["id"] },
      pathParams: PathSchema,
      queryParams: QuerySchema,
      bodyParams: BodySchema,
      response: ResponseSchema,
    };
    expect(route).toBeDefined();
  });

  it("should accept route with only path params", () => {
    const route: CherryRoute<typeof PathSchema, undefined, undefined, typeof ResponseSchema> = {
      method: "GET",
      path: { template: "/users/:id", paramNames: ["id"] },
      pathParams: PathSchema,
      response: ResponseSchema,
    };
    expect(route).toBeDefined();
  });

  it("should accept route with only query params", () => {
    const route: CherryRoute<undefined, typeof QuerySchema, undefined, typeof ResponseSchema> = {
      method: "GET",
      path: { template: "/users", paramNames: [] },
      queryParams: QuerySchema,
      response: ResponseSchema,
    };
    expect(route).toBeDefined();
  });

  it("should accept route with only body params", () => {
    const route: CherryRoute<undefined, undefined, typeof BodySchema, typeof ResponseSchema> = {
      method: "POST",
      path: { template: "/users", paramNames: [] },
      bodyParams: BodySchema,
      response: ResponseSchema,
    };
    expect(route).toBeDefined();
  });

  it("should accept route with no params", () => {
    const route: CherryRoute<undefined, undefined, undefined, typeof ResponseSchema> = {
      method: "GET",
      path: { template: "/health", paramNames: [] },
      response: ResponseSchema,
    };
    expect(route).toBeDefined();
  });
});

/**
 * InferRouteInput<T>: Extracts & merges all input params from a route.
 * Uses conditional types: if schema is defined, infer its input type; else {}.
 * Example: Route with PathSchema{id} + QuerySchema{limit?} + BodySchema{name}
 *   -> InferRouteInput = { id: string; limit?: number; name: string }
 * The Prettify wrapper flattens intersections for readable IDE tooltips.
 */
describe("InferRouteInput", () => {
  const PathSchema = v.object({
    id: v.string(),
  });

  const QuerySchema = v.object({
    include: v.optional(v.boolean()),
    tags: v.optional(v.array(v.string())),
  });

  const BodySchema = v.object({
    name: v.string(),
    email: v.pipe(v.string(), v.email()),
  });

  const ResponseSchema = v.object({
    id: v.string(),
  });

  it("should infer path params only", () => {
    type Route = CherryRoute<typeof PathSchema, undefined, undefined, typeof ResponseSchema>;
    type Input = InferRouteInput<Route>;

    expectTypeOf<Input>().toEqualTypeOf<{
      id: string;
    }>();
  });

  it("should infer query params only", () => {
    type Route = CherryRoute<undefined, typeof QuerySchema, undefined, typeof ResponseSchema>;
    type Input = InferRouteInput<Route>;

    expectTypeOf<Input>().toEqualTypeOf<{
      include?: boolean;
      tags?: string[];
    }>();
  });

  it("should infer body params only", () => {
    type Route = CherryRoute<undefined, undefined, typeof BodySchema, typeof ResponseSchema>;
    type Input = InferRouteInput<Route>;

    expectTypeOf<Input>().toEqualTypeOf<{
      name: string;
      email: string;
    }>();
  });

  it("should infer combined path and query params", () => {
    type Route = CherryRoute<
      typeof PathSchema,
      typeof QuerySchema,
      undefined,
      typeof ResponseSchema
    >;
    type Input = InferRouteInput<Route>;

    expectTypeOf<Input>().toEqualTypeOf<{
      id: string;
      include?: boolean;
      tags?: string[];
    }>();
  });

  it("should infer combined path, query, and body params", () => {
    type Route = CherryRoute<
      typeof PathSchema,
      typeof QuerySchema,
      typeof BodySchema,
      typeof ResponseSchema
    >;
    type Input = InferRouteInput<Route>;

    expectTypeOf<Input>().toEqualTypeOf<{
      id: string;
      include?: boolean;
      tags?: string[];
      name: string;
      email: string;
    }>();
  });

  it("should infer void when no params", () => {
    type Route = CherryRoute<undefined, undefined, undefined, typeof ResponseSchema>;
    type Input = InferRouteInput<Route>;

    expectTypeOf<Input>().toEqualTypeOf<void>();
  });
});

/**
 * InferRouteOutput<T>: Extracts response type from route's response schema.
 * Uses Valibot's InferOutput to get the validated output type.
 * Example: ResponseSchema = v.object({id: v.string(), name: v.string()})
 *   -> InferRouteOutput = { id: string; name: string }
 * Handles any Valibot schema including arrays, unions, transforms, etc.
 */
describe("InferRouteOutput", () => {
  const ResponseSchema = v.object({
    id: v.string(),
    name: v.string(),
    email: v.string(),
    createdAt: v.string(),
  });

  it("should infer response output from schema", () => {
    type Route = CherryRoute<undefined, undefined, undefined, typeof ResponseSchema>;
    type Output = InferRouteOutput<Route>;

    expectTypeOf<Output>().toEqualTypeOf<{
      id: string;
      name: string;
      email: string;
      createdAt: string;
    }>();
  });

  it("should handle array responses", () => {
    const ArraySchema = v.array(v.object({ id: v.string(), name: v.string() }));
    type Route = CherryRoute<undefined, undefined, undefined, typeof ArraySchema>;
    type Output = InferRouteOutput<Route>;

    expectTypeOf<Output>().toEqualTypeOf<Array<{ id: string; name: string }>>();
  });
});

/**
 * CherryResult<T>: Alias for ResultAsync<T, CherryError> from neverthrow.
 * All client methods return this for type-safe error handling.
 * Example: CherryResult<User> = ResultAsync<User, CherryError>
 * Usage: result.match({ ok: (user) => ..., err: (error) => ... })
 * Enables Railway-Oriented Programming without try/catch.
 */
describe("CherryResult", () => {
  it("should be a ResultAsync", () => {
    type Result = CherryResult<string>;
    expectTypeOf<Result>().toEqualTypeOf<ResultAsync<string, CherryError>>();
  });

  it("should handle different data types", () => {
    expectTypeOf<CherryResult<string>>().toEqualTypeOf<ResultAsync<string, CherryError>>();
    expectTypeOf<CherryResult<number>>().toEqualTypeOf<ResultAsync<number, CherryError>>();
    expectTypeOf<CherryResult<{ id: string }>>().toEqualTypeOf<
      ResultAsync<{ id: string }, CherryError>
    >();
  });
});

/**
 * Fetcher: Function signature for HTTP transport layer.
 * Type: (req: FetchRequest) => Promise<Response>
 * Example custom fetcher: async (req) => { log(req); return fetch(req.url, req.init); }
 * Allows middleware composition: withRetry(withLogging(baseFetcher))
 */
describe("Fetcher", () => {
  it("should accept FetchRequest and return Promise<Response>", () => {
    type FetcherType = (req: FetchRequest) => Promise<Response>;
    expectTypeOf<Fetcher>().toEqualTypeOf<FetcherType>();
  });
});

/**
 * RouteTree: Recursive type for organizing routes in namespaced hierarchies.
 * Type: { [key: string]: CherryRoute | RouteTree }
 * Example flat:   { getUser: Route, createUser: Route }
 * Example nested: { users: { get: Route, create: Route }, posts: { list: Route } }
 * Enables client.users.get() vs client.getUser() access patterns.
 */
describe("RouteTree", () => {
  const UserRoute: CherryRoute<undefined, undefined, undefined, any> = {} as any;

  it("should accept flat route tree", () => {
    const tree: RouteTree = {
      getUser: UserRoute,
      createUser: UserRoute,
    };
    expect(tree).toBeDefined();
  });

  it("should accept nested route tree", () => {
    const tree: RouteTree = {
      users: {
        getUser: UserRoute,
        createUser: UserRoute,
      },
      posts: {
        list: UserRoute,
        get: UserRoute,
      },
    };
    expect(tree).toBeDefined();
  });

  it("should accept mixed nesting", () => {
    const tree: RouteTree = {
      getUser: UserRoute,
      users: {
        getUser: UserRoute,
        createUser: UserRoute,
      },
    };
    expect(tree).toBeDefined();
  });
});

/**
 * RoutesToClient<T>: Mapped type transforming RouteTree -> callable methods.
 * For each route: Route -> (params: InferRouteInput) => CherryResult<InferRouteOutput>
 * For each subtree: Recursively applies RoutesToClient
 * Example: { users: { get: Route } } -> { users: { get: (p) => Result } }
 * This is the core type magic enabling typed client.users.get({id: "1"}).
 */
describe("RoutesToClient", () => {
  const _UserRoute: CherryRoute<undefined, undefined, undefined, any> = {} as any;

  it("should convert route tree to client method tree", () => {
    type Tree = {
      getUser: CherryRoute<undefined, undefined, undefined, any>;
      createUser: CherryRoute<undefined, undefined, undefined, any>;
    };

    type ClientTree = RoutesToClient<Tree>;

    expectTypeOf<ClientTree>().toEqualTypeOf<{
      getUser: () => CherryResult<
        InferRouteOutput<CherryRoute<undefined, undefined, undefined, any>>
      >;
      createUser: () => CherryResult<
        InferRouteOutput<CherryRoute<undefined, undefined, undefined, any>>
      >;
    }>();
  });

  it("should handle nested route trees", () => {
    type Tree = {
      users: {
        getUser: CherryRoute<undefined, undefined, undefined, any>;
        createUser: CherryRoute<undefined, undefined, undefined, any>;
      };
    };

    type ClientTree = RoutesToClient<Tree>;

    expectTypeOf<ClientTree>().toEqualTypeOf<{
      users: {
        getUser: () => CherryResult<
          InferRouteOutput<CherryRoute<undefined, undefined, undefined, any>>
        >;
        createUser: () => CherryResult<
          InferRouteOutput<CherryRoute<undefined, undefined, undefined, any>>
        >;
      };
    }>();
  });

  it("should make params optional when route has no input params", () => {
    const ResponseSchema = v.object({ id: v.string() });
    const PathSchema = v.object({ id: v.string() });

    type RouteWithParams = CherryRoute<
      typeof PathSchema,
      undefined,
      undefined,
      typeof ResponseSchema
    >;
    type RouteWithoutParams = CherryRoute<undefined, undefined, undefined, typeof ResponseSchema>;

    type Tree = {
      withParams: RouteWithParams;
      withoutParams: RouteWithoutParams;
    };

    type ClientTree = RoutesToClient<Tree>;

    type WithParamsMethod = ClientTree["withParams"];
    type WithoutParamsMethod = ClientTree["withoutParams"];

    expectTypeOf<WithParamsMethod>().toEqualTypeOf<
      (params: { id: string }) => CherryResult<{ id: string }>
    >();

    expectTypeOf<WithoutParamsMethod>().toEqualTypeOf<() => CherryResult<{ id: string }>>();
  });
});

/**
 * Client<TRoutes>: Base client + dynamically added route methods.
 * Type: { call: <T>(route, params) => Result } & RoutesToClient<TRoutes>
 * Example: Client<{users: {get: Route}}> has both:
 *   - client.call(anyRoute, params) for ad-hoc routes
 *   - client.users.get(params) for registered routes
 * The conditional intersection adds methods only when routes are provided.
 */
describe("Client", () => {
  it("should have call method", () => {
    const client: Client<undefined> = {} as any;
    expectTypeOf(client.call).toBeFunction();
  });

  it("should extend with route methods when routes are provided", () => {
    const client: Client<{
      users: {
        getUser: CherryRoute<undefined, undefined, undefined, any>;
      };
    }> = {} as any;

    expectTypeOf(client.call).toBeFunction();
    expectTypeOf(client.users).toMatchTypeOf<{
      getUser: (params: any) => CherryResult<any>;
    }>();
  });
});

/**
 * ClientConfig<TRoutes>: Configuration object for createClient().
 * Required: baseUrl (string)
 * Optional: headers (sync/async fn), fetcher (custom transport), routes (RouteTree)
 * Example: { baseUrl: "https://api.com", headers: async () => ({Auth: token}), routes }
 * The TRoutes generic flows through to Client<TRoutes> for type inference.
 */
describe("ClientConfig", () => {
  it("should accept basic config", () => {
    const config: ClientConfig = {
      baseUrl: "https://api.example.com",
    };
    expect(config).toBeDefined();
  });

  it("should accept config with headers", () => {
    const config: ClientConfig = {
      baseUrl: "https://api.example.com",
      headers: () => ({ Authorization: "Bearer token" }),
    };
    expect(config).toBeDefined();
  });

  it("should accept async headers", () => {
    const config: ClientConfig = {
      baseUrl: "https://api.example.com",
      headers: async () => ({ Authorization: "Bearer token" }),
    };
    expect(config).toBeDefined();
  });

  it("should accept custom fetcher", () => {
    const fetcher: Fetcher = (req) => fetch(req.url, req.init);
    const config: ClientConfig = {
      baseUrl: "https://api.example.com",
      fetcher,
    };
    expect(config).toBeDefined();
  });

  it("should accept routes", () => {
    const routes: RouteTree = {
      getUser: {} as CherryRoute<undefined, undefined, undefined, any>,
    };
    const config: ClientConfig<typeof routes> = {
      baseUrl: "https://api.example.com",
      routes,
    };
    expect(config).toBeDefined();
  });
});
