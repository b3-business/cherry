# Cherry Architecture

> Implementation plan for type-safe API client library with Valibot validation and neverthrow error handling.

---

## 1. Overview

Cherry is a lightweight, tree-shakeable API client library that separates **route definitions** from **client runtime**. Routes are plain objects with validation schemas — import only what you use, bundle only what you import.

### Key Features

- **Type-safe end-to-end** — Path params, query params, body, and response all validated with Valibot
- **neverthrow integration** — All *public* async operations return `ResultAsync<T, CherryError>`
- **Tagged template paths** — `path`/users/${param('id')}` for type-safe URL building
- **Separated parameter schemas** — `pathParams`, `queryParams`, `bodyParams` for clarity
- **Tree-shakeable** — Routes are plain imports, not registered globally
- **Minimal runtime** — ~2KB gzipped, no dependencies beyond Valibot and neverthrow
- **Query param control** — Native URLSearchParams with configurable array handling

### Design Philosophy

1. **Explicit over implicit** — No magic, everything inspectable
2. **Errors are values** — The *runtime* API never throws; route-definition/config mistakes may throw (fail fast)
3. **Composition over inheritance** — Middleware is userland
4. **Type inference over annotation** — Let TypeScript do the work
5. **Small phases** — Build basic structures first, add features incrementally

---

## 2. Project Structure

```
cherry/
├── src/
│   ├── index.ts         # Public exports
│   ├── client.ts        # createClient(), call(), URL building
│   ├── route.ts         # route() builder with validation
│   ├── path.ts          # path(), param(), optional() tagged templates
│   ├── types.ts         # CherryRoute, CherryResult, InferParams, etc.
│   └── errors.ts       # Error hierarchy (CherryError, HttpError, etc.)
├── test/
│   ├── client.test.ts   # Client integration tests
│   ├── route.test.ts    # Route builder tests
│   ├── path.test.ts     # Path template tests
│   ├── errors.test.ts   # Error handling tests
│   └── types.test.ts    # Type-level tests with expect-type
├── package.json
├── tsconfig.json
└── tsdown.config.ts
```

---

## 3. Core Types

```ts
// types.ts
import type { BaseSchema, InferInput, InferOutput } from "valibot";
import type { ResultAsync } from "neverthrow";
import type { CherryError } from "./errors";

/** HTTP methods supported by Cherry */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/** Path template result from path() tagged template */
export type PathTemplate = {
  template: string;           // "/users/:id/posts/:postId"
  paramNames: string[];       // ["id", "postId"]
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
  arrayFormat?: "repeat" | "comma" | "brackets";
  customSerializer?: (params: Record<string, unknown>) => string;
};

/** Infer combined input params from a route */
export type InferRouteInput<T extends CherryRoute<any, any, any, any>> =
  (T["pathParams"] extends BaseSchema<any, any, any> ? InferInput<T["pathParams"]> : {}) &
  (T["queryParams"] extends BaseSchema<any, any, any> ? InferInput<T["queryParams"]> : {}) &
  (T["bodyParams"] extends BaseSchema<any, any, any> ? InferInput<T["bodyParams"]> : {});

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
```

---

## 4. Error Hierarchy

All errors extend `CherryError` for consistent handling:

```ts
// errors.ts
import { errAsync, ResultAsync } from "neverthrow";

/** Base error class for all Cherry errors */
export abstract class CherryError extends Error {
  abstract readonly type: string;
  abstract readonly retryable: boolean;

  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = this.constructor.name;
  }
}

/** HTTP response errors (4xx, 5xx) */
export class HttpError extends CherryError {
  readonly type = "HttpError";
  readonly retryable: boolean;

  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly body?: unknown,
    cause?: unknown,
  ) {
    super(`HTTP ${status}: ${statusText}`, { cause });
    this.retryable = status >= 500 || status === 429;
  }
}

/** Valibot validation errors */
export class ValidationError extends CherryError {
  readonly type = "ValidationError";
  readonly retryable = false;

  constructor(
    public readonly target: "request" | "response",
    public readonly issues: unknown[],
    cause?: unknown,
  ) {
    super(`Validation failed for ${target}`, { cause });
  }
}

/** Network/fetch errors */
export class NetworkError extends CherryError {
  readonly type = "NetworkError";
  readonly retryable = true;

  constructor(cause?: unknown) {
    super(`Network error`, { cause });
  }
}

/** Catch-all for unexpected errors */
export class UnknownCherryError extends CherryError {
  readonly type = "UnknownCherryError";
  readonly retryable = false;

  constructor(cause?: unknown) {
    super(`Unknown error`, { cause });
  }
}

/** Type guard for CherryError */
export function isCherryError(error: unknown): error is CherryError {
  return error instanceof CherryError;
}

/** Helper to create error ResultAsync */
export function cherryErr<T>(error: CherryError): ResultAsync<T, CherryError> {
  return errAsync(error);
}
```

---

## 5. Path Templates

Tagged template functions for type-safe path building:

```ts
// path.ts

/** Branded type for path parameter markers */
declare const PathParamBrand: unique symbol;
export type PathParam<T extends string> = string & { [PathParamBrand]: true };

/** Branded type for optional path parameter markers */
declare const OptionalParamBrand: unique symbol;
export type OptionalParam<T extends string> = string & { [OptionalParamBrand]: true };

/** Create a path parameter marker */
export function param<T extends string>(name: T): PathParam<T> {
  return `:${name}` as PathParam<T>;
}

/** Create an optional path parameter marker */
export function optional<T extends string>(name: T): OptionalParam<T> {
  return `(:${name})` as OptionalParam<T>;
}

/** Tagged template for building path templates */
export function path(
  strings: TemplateStringsArray,
  ...params: (PathParam | OptionalParam)[]
): PathTemplate {
  const paramNames: string[] = [];
  let template = strings[0];

  for (let i = 0; i < params.length; i++) {
    const p = params[i];
    template += p + strings[i + 1];

    // Extract param name from `:name` or `(:name)`
    const match = p.match(/^\(?:(\w+)\)?$/);
    if (match) {
      paramNames.push(match[1]);
    }
  }

  return { template, paramNames };
}
```

### Usage Examples

```ts
// Simple path with one param
const userPath = path`/users/${param("id")}`;
// { template: "/users/:id", paramNames: ["id"] }

// Multiple params
const postPath = path`/users/${param("userId")}/posts/${param("postId")}`;
// { template: "/users/:userId/posts/:postId", paramNames: ["userId", "postId"] }

// Optional params
const versionedPath = path`/api${optional("version")}/users`;
// { template: "/api(:version)/users", paramNames: ["version"] }

// No params
const staticPath = path`/health`;
// { template: "/health", paramNames: [] }
```

---

## 6. Route Builder

The `route()` function validates configuration and returns a typed route:

```ts
// route.ts
import * as v from "valibot";
import type { CherryRoute, HttpMethod, PathTemplate, QueryParamOptions } from "./types";

/** HTTP method schema */
const HttpMethodSchema = v.picklist(["GET", "POST", "PUT", "PATCH", "DELETE"]);

/** Route configuration input */
export type RouteConfig<
  TPathParams extends v.BaseSchema<any, any, any> | undefined,
  TQueryParams extends v.BaseSchema<any, any, any> | undefined,
  TBodyParams extends v.BaseSchema<any, any, any> | undefined,
  TResponse extends v.BaseSchema<any, any, any>,
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

/**
 * Create a validated route definition.
 * Validates that all path params have corresponding schema entries.
 */
export function route<
  TPathParams extends v.BaseSchema<any, any, any> | undefined,
  TQueryParams extends v.BaseSchema<any, any, any> | undefined,
  TBodyParams extends v.BaseSchema<any, any, any> | undefined,
  TResponse extends v.BaseSchema<any, any, any>,
>(
  config: RouteConfig<TPathParams, TQueryParams, TBodyParams, TResponse>,
): CherryRoute<TPathParams, TQueryParams, TBodyParams, TResponse> {
  // Validate HTTP method
  v.parse(HttpMethodSchema, config.method);

  // Validate path params match schema
  if (config.path.paramNames.length > 0) {
    if (!config.pathParams) {
      throw new Error(
        `Route has path params [${config.path.paramNames.join(", ")}] but no pathParams schema`
      );
    }

    // Validate path params <-> schema keys (both directions)
    const schemaKeys = getSchemaKeys(config.pathParams);

    // 1) Every param in the template must exist in the schema
    for (const paramName of config.path.paramNames) {
      if (!schemaKeys.includes(paramName)) {
        throw new Error(
          `Path param ":${paramName}" not found in pathParams schema. ` +
          `Available: [${schemaKeys.join(", ")}]`
        );
      }
    }

    // 2) Every key in the schema must be used in the template
    for (const schemaKey of schemaKeys) {
      if (!config.path.paramNames.includes(schemaKey)) {
        throw new Error(
          `pathParams schema key "${schemaKey}" not present in path template. ` +
          `Template params: [${config.path.paramNames.join(", ")}]`
        );
      }
    }
  }

  return config as CherryRoute<TPathParams, TQueryParams, TBodyParams, TResponse>;
}

/** Extract keys from a Valibot object schema */
function getSchemaKeys(schema: v.BaseSchema<any, any, any>): string[] {
  // Valibot v1 ObjectSchema exposes `entries` as a plain object
  if (
    "entries" in schema &&
    typeof (schema as any).entries === "object" &&
    (schema as any).entries !== null
  ) {
    return Object.keys((schema as any).entries);
  }
  return [];
}
```

### Usage Examples

```ts
import * as v from "valibot";
import { route, path, param } from "@b3b/cherry";

// GET with path and query params
export const getUser = route({
  method: "GET",
  path: path`/users/${param("id")}`,
  pathParams: v.object({
    id: v.pipe(v.string(), v.uuid()),
  }),
  queryParams: v.object({
    include: v.optional(v.boolean()),
  }),
  response: v.object({
    id: v.string(),
    name: v.string(),
    email: v.string(),
  }),
  description: "Get a user by ID",
});

// POST with body params
export const createUser = route({
  method: "POST",
  path: path`/users`,
  bodyParams: v.object({
    name: v.string(),
    email: v.pipe(v.string(), v.email()),
    role: v.optional(v.enum(["admin", "user"])),
  }),
  response: v.object({
    id: v.string(),
    name: v.string(),
    email: v.string(),
    role: v.string(),
  }),
});

// DELETE with path params only
export const deleteUser = route({
  method: "DELETE",
  path: path`/users/${param("id")}`,
  pathParams: v.object({
    id: v.string(),
  }),
  response: v.object({
    success: v.boolean(),
    message: v.string(),
  }),
});
```

---

## 7. Query Serialization

Query parameters use native `URLSearchParams` with configurable array handling:

```ts
// client.ts (partial)

/** Serialize query params to URL search string */
function serializeQueryParams(
  params: Record<string, unknown>,
  options?: QueryParamOptions,
): string {
  // Custom serializer takes precedence
  if (options?.customSerializer) {
    return options.customSerializer(params);
  }

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      switch (options?.arrayFormat ?? "repeat") {
        case "repeat":
          // ?tags=a&tags=b
          for (const item of value) {
            searchParams.append(key, String(item));
          }
          break;
        case "comma":
          // ?tags=a,b
          searchParams.set(key, value.join(","));
          break;
        case "brackets":
          // ?tags[]=a&tags[]=b
          for (const item of value) {
            searchParams.append(`${key}[]`, String(item));
          }
          break;
      }
    } else {
      searchParams.set(key, String(value));
    }
  }

  return searchParams.toString();
}
```

### Custom Serializer Example

```ts
const searchRoute = route({
  method: "GET",
  path: path`/search`,
  queryParams: v.object({
    filters: v.object({
      category: v.optional(v.string()),
      minPrice: v.optional(v.number()),
      maxPrice: v.optional(v.number()),
    }),
  }),
  response: v.array(v.object({ id: v.string(), name: v.string() })),
  queryParamOptions: {
    customSerializer: (params) => {
      // Flatten nested objects: filters[category]=books
      const flat: string[] = [];
      for (const [key, value] of Object.entries(params)) {
        if (typeof value === "object" && value !== null) {
          for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
            flat.push(`${key}[${k}]=${encodeURIComponent(String(v))}`);
          }
        } else {
          flat.push(`${key}=${encodeURIComponent(String(value))}`);
        }
      }
      return flat.join("&");
    },
  },
});
```

---

## 8. Client Core

The client provides `call()` for executing routes with full type safety:

```ts
// client.ts
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
} from "./types";
import { HttpError, ValidationError, NetworkError, UnknownCherryError } from "./errors";

/** Default fetcher using global fetch */
const defaultFetcher: Fetcher = (req) => fetch(req.url, req.init);

/** Create a Cherry client */
export function createClient<TRoutes extends RouteTree | undefined = undefined>(
  config: ClientConfig<TRoutes>,
) {
  const fetcher = config.fetcher ?? defaultFetcher;

  /**
   * Execute a route with params.
   * Returns ResultAsync<T, CherryError>.
   */
  function call<T extends CherryRoute<any, any, any, any>>(
    route: T,
    params: InferRouteInput<T>,
  ): CherryResult<InferRouteOutput<T>> {
    return ResultAsync.fromPromise(
      executeRoute(route, params),
      (error) => {
        if (error instanceof HttpError) return error;
        if (error instanceof ValidationError) return error;
        if (error instanceof NetworkError) return error;
        return new UnknownCherryError(error);
      },
    );
  }

  /**
   * Execute route and return raw output.
   * This may throw; `call()` wraps it into ResultAsync.
   */
  async function executeRoute<T extends CherryRoute<any, any, any, any>>(
    route: T,
    params: InferRouteInput<T>,
  ): Promise<InferRouteOutput<T>> {
    // 1. Validate and extract path params
    let pathParams: Record<string, unknown> = {};
    if (route.pathParams) {
      const result = v.safeParse(route.pathParams, params);
      if (!result.success) throw new ValidationError("request", result.error.issues);
      pathParams = result.output;
    }

    // 2. Validate and extract query params
    let queryParams: Record<string, unknown> = {};
    if (route.queryParams) {
      const result = v.safeParse(route.queryParams, params);
      if (!result.success) throw new ValidationError("request", result.error.issues);
      queryParams = result.output;
    }

    // 3. Validate and extract body params
    let bodyParams: Record<string, unknown> | undefined;
    if (route.bodyParams) {
      const result = v.safeParse(route.bodyParams, params);
      if (!result.success) throw new ValidationError("request", result.error.issues);
      bodyParams = result.output;
    }

    // 4. Build URL
    let url = route.path.template;
    for (const [key, value] of Object.entries(pathParams)) {
      url = url.replace(`:${key}`, encodeURIComponent(String(value)));
    }

    const fullUrl = new URL(url, config.baseUrl);

    // 5. Add query params
    if (Object.keys(queryParams).length > 0) {
      fullUrl.search = serializeQueryParams(queryParams, route.queryParamOptions);
    }

    // 6. Build request
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

    // 7. Execute fetch
    let response: Response;
    try {
      response = await fetcher(req);
    } catch (error) {
      throw new NetworkError(error);
    }

    // 8. Handle HTTP errors
    if (!response.ok) {
      const body = await response.text().catch(() => undefined);
      throw new HttpError(response.status, response.statusText, body);
    }

    // 9. Parse and validate response
    const json = await response.json();
    const result = v.safeParse(route.response, json);
    if (!result.success) throw new ValidationError("response", result.error.issues);

    return result.output;
  }

  function forgeRouteMethods<T extends RouteTree>(routes: T): RoutesToClient<T> {
    const out: any = {};

    for (const [key, value] of Object.entries(routes)) {
      if (value && typeof value === "object" && "method" in value && "path" in value) {
        // Leaf route -> function that delegates to call()
        out[key] = (params: any) => call(value as any, params);
      } else if (value && typeof value === "object") {
        // Namespace -> recurse
        out[key] = forgeRouteMethods(value as RouteTree);
      }
    }

    return out;
  }

  const routes = config.routes ? forgeRouteMethods(config.routes) : {};
  return { call, ...routes } as unknown as (TRoutes extends RouteTree
    ? Client<TRoutes>
    : Client<undefined>);
}
```

### Usage Example

```ts
import { createClient } from "@b3b/cherry";
import { getUser, createUser } from "./routes";

const client = createClient({
  baseUrl: "https://api.example.com",
  headers: () => ({
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  }),
  routes: {
    users: { getUser, createUser },
  },
});

// Named method (namespaced from `routes`)
const result = await client.users.getUser({ id: "123" });

// Generic call also works
// const result = await client.call(getUser, { id: "123" });

result.match(
  (user) => console.log("User:", user.name),
  (error) => {
    if (error.type === "HttpError" && error.status === 404) {
      console.log("User not found");
    } else {
      console.error("Error:", error.message);
    }
  }
);
```

---

## 9. Implementation Phases

### Phase 1: Foundation Types & Errors

**Goal**: Establish type system and error hierarchy.

**Files**:
- `src/types.ts` — Core type definitions
- `src/errors.ts` — Error classes

**Tests** (`test/errors.test.ts`):
- All error classes extend CherryError
- Each error has `type`, `retryable`, `message` properties
- Type guards work correctly
- Types compile without errors

**Acceptance Criteria**:
- [ ] All error classes extend CherryError
- [ ] Each error has `type`, `retryable`, `message` properties
- [ ] Type guards work correctly
- [ ] Types compile without errors

---

### Phase 2: Path Templates

**Goal**: Implement tagged template path builder.

**Files**:
- `src/path.ts` — `path()`, `param()`, `optional()` functions

**Tests** (`test/path.test.ts`):
- Simple path with no params returns correct template
- Path with single param extracts param name
- Path with multiple params extracts all param names
- Optional param syntax works (`optional("version")`)
- Type inference returns PathTemplate

**Acceptance Criteria**:
- [ ] `path()` returns `PathTemplate` with template and paramNames
- [ ] `param()` creates `:name` markers
- [ ] `optional()` creates `(:name)` markers
- [ ] Multiple params in one path work correctly
- [ ] Type inference is correct

---

### Phase 3: Route Builder

**Goal**: Implement route configuration with validation.

**Files**:
- `src/route.ts` — `route()` function with validation

**Tests** (`test/route.test.ts`):
- Creates valid route with all params
- Throws error if path param missing from schema
- Throws error if path param not in schema keys
- Validates HTTP method with Valibot
- Type inference works for combined input params
- Type inference works for response output

**Acceptance Criteria**:
- [ ] `route()` validates method is valid HTTP method
- [ ] `route()` validates all path params have schema entries
- [ ] `route()` throws error for missing/extra path params
- [ ] Type inference works for combined input params
- [ ] Type inference works for response output

---

### Phase 4: Query Serialization

**Goal**: Implement query parameter serialization.

**Files**:
- `src/client.ts` — `serializeQueryParams()` function (internal)

**Tests** (`test/client.test.ts` — partial):
- Serializes simple key-value params correctly
- Arrays serialize with repeat format (default)
- Arrays serialize with comma format
- Arrays serialize with brackets format
- Custom serializer overrides default behavior
- Undefined/null values are omitted

**Acceptance Criteria**:
- [ ] Simple key-value params serialize correctly
- [ ] Arrays serialize with configurable format (repeat/comma/brackets)
- [ ] Custom serializer overrides default behavior
- [ ] Undefined/null values are omitted

---

### Phase 5: Client Core

**Goal**: Implement `createClient()` and `call()`.

**Files**:
- `src/client.ts` — Full implementation with `createClient()` and `call()`

**Tests** (`test/client.test.ts` — full):
- Successful call returns Ok result with correct data
- HTTP error (4xx) returns Err with HttpError
- HTTP error (5xx) returns Err with HttpError
- Invalid request validation returns Err with ValidationError
- Invalid response validation returns Err with ValidationError
- Network error returns Err with NetworkError
- Path params are substituted in URL
- Query params are appended to URL
- Body params are sent as JSON
- Headers are merged with config headers

**Acceptance Criteria**:
- [ ] `createClient()` accepts baseUrl, headers, fetcher
- [ ] `call()` returns `ResultAsync<T, CherryError>`
- [ ] Path params are substituted in URL
- [ ] Query params are appended to URL
- [ ] Body params are sent as JSON
- [ ] HTTP errors return `HttpError`
- [ ] Validation errors return `ValidationError`
- [ ] Network errors return `NetworkError`
- [ ] Response is validated with schema

---

### Phase 6: Integration & Polish

**Goal**: End-to-end testing and public API finalization.

**Files**:
- `src/index.ts` — Public exports
- `test/integration.test.ts` — Full integration tests

**Tests** (`test/integration.test.ts`):
- Full CRUD workflow (create, read, update, delete)
- Error handling with neverthrow (match, map, chain, orElse)
- Multiple concurrent requests work correctly
- Custom fetcher with retry logic works
- Headers function is called for each request
- All public exports are available from index

**Acceptance Criteria**:
- [ ] All public APIs exported from index.ts
- [ ] Full CRUD workflow works end-to-end
- [ ] Error chaining with neverthrow works
- [ ] Custom fetcher is supported
- [ ] All tests pass

---

## 10. Testing Strategy

### Unit Tests

Each module has corresponding test file:

```
test/
├── errors.test.ts     # Error class behavior
├── path.test.ts       # Path template parsing
├── route.test.ts      # Route validation
├── client.test.ts     # Client operations
└── types.test.ts      # Type-level assertions
```

### Type Tests

Use `expect-type` for compile-time type assertions:

```ts
import { expectTypeOf } from "expect-type";

// Test type inference
expectTypeOf<InferRouteInput<typeof myRoute>>().toEqualTypeOf<{
  id: string;
  include?: string[];
}>();

// Test return types
expectTypeOf(client.call(route, params)).toEqualTypeOf<CherryResult<User>>();
```

### Running Tests

```bash
# Run all tests
bun test

# Run specific test file
bun test errors.test.ts

# Run with coverage
bun test --coverage
```

---

## 11. Type Validation with expect-type

### Key Patterns

```ts
import { expectTypeOf } from "expect-type";

// Exact type equality
expectTypeOf<Actual>().toEqualTypeOf<Expected>();

// Partial matching (allows extra properties)
expectTypeOf<Actual>().toMatchObjectType<{ required: string }>();

// Subtype checking
expectTypeOf<Specific>().toExtend<General>();

// Property checking
expectTypeOf<Obj>().toHaveProperty("key").toBeString();

// Negation
expectTypeOf<Actual>().not.toBeAny();
```

### Testing Generic Types

```ts
// Test that InferRouteInput correctly combines schemas
type TestRoute = CherryRoute<
  typeof pathSchema,
  typeof querySchema,
  typeof bodySchema,
  typeof responseSchema
>;

expectTypeOf<InferRouteInput<TestRoute>>().toEqualTypeOf<{
  id: string;        // from pathParams
  page?: number;      // from queryParams
  name: string;       // from bodyParams
}>();
```

---

## 12. API Examples

### Basic Usage

```ts
import * as v from "valibot";
import { createClient, route, path, param } from "@b3b/cherry";

// Define routes
export const getUser = route({
  method: "GET",
  path: path`/users/${param("id")}`,
  pathParams: v.object({
    id: v.pipe(v.string(), v.uuid()),
  }),
  queryParams: v.object({
    include: v.optional(v.boolean()),
  }),
  response: v.object({
    id: v.string(),
    name: v.string(),
    email: v.string(),
  }),
});

export const createUser = route({
  method: "POST",
  path: path`/users`,
  bodyParams: v.object({
    name: v.string(),
    email: v.pipe(v.string(), v.email()),
  }),
  response: v.object({
    id: v.string(),
    name: v.string(),
    email: v.string(),
  }),
});

// Create client
const client = createClient({
  baseUrl: "https://api.example.com",
  headers: () => ({
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  }),
});

// Type-safe call with neverthrow
const result = await client.call(getUser, { id: "123", include: ["posts"] });

result.match(
  (user) => console.log("User:", user.name),
  (error) => console.error("Error:", error.message),
);
```

### Error Handling Patterns

```ts
// Pattern 1: match at the end
const user = await client.call(getUser, { id: "123" })
  .match(
    (user) => user,  // Success case
    (error) => {
      if (error.type === "HttpError" && error.status === 404) {
        return null;  // User not found
      }
      throw error;  // Re-throw unexpected errors
    }
  );

// Pattern 2: orElse for defaults
const user = await client.call(getUser, { id: "123" })
  .orElse((error) => {
    if (error.type === "HttpError" && error.status === 404) {
      return { id: "0", name: "Guest", email: "" };  // Default guest user
    }
    throw error;
  });

// Pattern 3: map for transformations
const users = await client.call(listUsers, { page: 1 })
  .map((users) => ({
    ...users,
    fetched: new Date().toISOString(),  // Add metadata
  }));

// Pattern 4: chain for sequential requests
const created = await client.call(createUser, { name: "Jane" })
  .andThen((created) =>
    client.call(getUser, { id: created.id })
  );
```

### Chaining Requests

```ts
// Sequential requests
const userWithPosts = await client.call(getUser, { id: "123" })
  .andThen((user) =>
    client.call(getUserPosts, { userId: user.id })
      .map((posts) => ({ ...user, posts }))
  );

// Parallel requests
const [user, posts] = await ResultAsync.combine([
  client.call(getUser, { id: "1" }),
  client.call(getPosts, { userId: "1" }),
]);

// Retry: implement at the fetcher layer (see below)
// Note: ResultAsync.mapErr maps error *values*; it doesn't retry requests.
```

### Custom Fetcher with Retry

```ts
const withRetry = (fetcher: Fetcher, maxRetries = 3): Fetcher =>
  async (req) => {
    let lastError: unknown;

    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetcher(req);
        if (response.ok || response.status < 500) {
          return response;
        }
        lastError = new Error(`HTTP ${response.status}`);
      } catch (error) {
        lastError = error;
      }

      // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, i) * 100));
    }

    throw lastError;
  };

const client = createClient({
  baseUrl: "https://api.example.com",
  fetcher: withRetry((req) => fetch(req.url, req.init)),
});
```

---

## 13. Production Examples (examples-prod/)

Self-sufficient examples testing the published cherry package across different registries and runtimes.

### Test Matrix

| Source \ Runner | npm | bun | deno |
|-----------------|-----|-----|------|
| **npm** | `todo-npm-npm` | `todo-npm-bun` | `todo-npm-deno` |
| **jsr** | `todo-jsr-npm` | `todo-jsr-bun` | `todo-jsr-deno` |

### Structure

```
examples-prod/
├── todo-npm-npm/       # cherry from npm, run with npm
├── todo-npm-bun/       # cherry from npm, run with bun
├── todo-npm-deno/      # cherry from npm, run with deno (npm: specifier)
├── todo-jsr-npm/       # cherry from jsr, run with npm (@jsr scope)
├── todo-jsr-bun/       # cherry from jsr, run with bun (@jsr scope)
└── todo-jsr-deno/      # cherry from jsr, run with deno (native jsr:)
```

### Key Differences by Runtime

**npm/bun (Node-style)**:
- `package.json` with dependencies
- `tsconfig.json` for TypeScript
- Tests use `bun:test`

**deno**:
- `deno.json` with import map
- No `package.json` needed
- Tests use `Deno.test` + `jsr:@std/assert`
- File extensions required in imports (`.ts`)

### Key Differences by Source

**npm registry**:
- Direct version: `"@b3-business/cherry": "^0.2.4"`
- Deno uses: `"npm:@b3-business/cherry@^0.2.4"`

**jsr registry**:
- npm/bun use alias: `"@b3-business/cherry": "npm:@jsr/b3-business__cherry@^0.2.4"`
- Requires `.npmrc`: `@jsr:registry=https://npm.jsr.io`
- Deno uses native: `"jsr:@b3-business/cherry@^0.2.4"`

### Running Tests

```bash
# npm examples
cd examples-prod/todo-npm-npm && npm install && npm test
cd examples-prod/todo-jsr-npm && npm install && npm test

# bun examples  
cd examples-prod/todo-npm-bun && bun install && bun test
cd examples-prod/todo-jsr-bun && bun install && bun test

# deno examples
cd examples-prod/todo-npm-deno && deno task test
cd examples-prod/todo-jsr-deno && deno task test
```

### Notes

- These examples are **NOT** part of the bun workspace (self-sufficient)
- Each example tests the **published** package, not the local source
- Update version numbers in each example when releasing new versions
- JSR examples require `.npmrc` for npm/bun to resolve `@jsr` scope

---

## Next Steps

After completing this architecture:

1. **Build Agent** — For complex multi-file implementation
2. **Free Coder / Flash Coder** — For straightforward phase implementation
3. **Frontend Expert** — If building UI components that consume the client
4. **Documentation** — Update README.md with usage examples
5. **CI/CD** — Set up automated testing and publishing to JSR/npm
