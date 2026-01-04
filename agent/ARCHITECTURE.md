# Cherry Architecture

> Implementation details for the cherry API client library.

---

## Epics Overview

| Epic | Scope | Status |
|------|-------|--------|
| **Epic 1** | Core Runtime — Router structure, manual RouteDefinition coding | Active |
| **Epic 2** | TypeSpec Emitter — Auto-generate RouteDefinitions from OpenAPI/TypeSpec | Deferred |

---

## Table of Contents

- [Project Structure](#project-structure)
- [Core Runtime (Epic 1)](#core-runtime-epic-1)
  - [Key Types](#key-types)
  - [Client Implementation](#client-implementation)
- [OpenAPI Generator (Epic 2 — Deferred)](#openapi-generator-epic-2--deferred)
- [Deployment](#deployment)
- [Build Configuration](#build-configuration)

---

## Project Structure

```
cherry/
├── src/
│   ├── client.ts        # createClient, call(), type merging
│   ├── define.ts        # defineRoute helper
│   ├── types.ts         # RouteDefinition, Fetcher, PreparedRequest
│   └── index.ts         # Public exports
├── generator/           # (Epic 2 — deferred)
├── package.json
├── tsconfig.json
├── tsdown.config.ts
└── jsr.json             # JSR publishing config
```

---

## Core Runtime (Epic 1)

### Key Types

```ts
// types.ts
import type { BaseSchema, InferInput, InferOutput } from "valibot";

/**
 * Describes an API endpoint with typed params and response.
 */
export type RouteDefinition<
  TParams extends BaseSchema<any, any, any>,
  TResponse extends BaseSchema<any, any, any>,
> = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string | ((params: InferInput<TParams>) => string);
  params: TParams;
  response: TResponse;
};

/**
 * The prepared request object passed to the fetcher.
 */
export type PreparedRequest = {
  url: string;
  init: RequestInit;
  route: RouteDefinition<any, any>;
};

/**
 * Custom fetch function signature.
 */
export type Fetcher = (req: PreparedRequest) => Promise<Response>;

/**
 * Maps route definitions to typed async methods.
 */
export type RoutesToMethods<T extends Record<string, RouteDefinition<any, any>>> = {
  [K in keyof T]: T[K] extends RouteDefinition<infer P, infer R>
    ? (params: InferInput<P>) => Promise<InferOutput<R>>
    : never;
};

/**
 * The client interface with both `call()` and named methods.
 */
export type Client<TRoutes extends Record<string, RouteDefinition<any, any>>> = {
  call: <P extends BaseSchema<any, any, any>, R extends BaseSchema<any, any, any>>(
    route: RouteDefinition<P, R>,
    params: InferInput<P>
  ) => Promise<InferOutput<R>>;
} & RoutesToMethods<TRoutes>;
```

### Client Implementation

```ts
// client.ts
import * as v from "valibot";
import type {
  RouteDefinition,
  PreparedRequest,
  Fetcher,
  Client,
} from "./types";

export const defaultFetcher: Fetcher = (req) => fetch(req.url, req.init);

export type ClientOptions<TRoutes extends Record<string, RouteDefinition<any, any>>> = {
  baseUrl: string;
  headers?: () => Record<string, string>;
  fetcher?: Fetcher;
  routes?: TRoutes;
};

export function createClient<
  const TRoutes extends Record<string, RouteDefinition<any, any>>,
>(options: ClientOptions<TRoutes>): Client<TRoutes> {
  const fetcher = options.fetcher ?? defaultFetcher;

  const call = async <P extends v.BaseSchema<any, any, any>, R extends v.BaseSchema<any, any, any>>(
    route: RouteDefinition<P, R>,
    params: v.InferInput<P>
  ): Promise<v.InferOutput<R>> => {
    // 1. Validate input params
    const validated = v.parse(route.params, params);

    // 2. Build URL
    const path = typeof route.path === "function"
      ? route.path(validated)
      : route.path;

    const url = new URL(path, options.baseUrl);

    // 3. Handle query params for GET requests
    if (route.method === "GET") {
      for (const [key, value] of Object.entries(validated)) {
        if (value !== undefined && !path.includes(key)) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    // 4. Prepare request init
    const init: RequestInit = {
      method: route.method,
      headers: {
        "Content-Type": "application/json",
        ...options.headers?.(),
      },
    };

    // 5. Add body for non-GET requests
    if (route.method !== "GET") {
      init.body = JSON.stringify(validated);
    }

    // 6. Execute fetch
    const res = await fetcher({ url: url.toString(), init, route });

    // 7. Parse and validate response
    const json = await res.json();
    return v.parse(route.response, json);
  };

  // Build client with call() method
  const client = { call } as Client<TRoutes>;

  // Add named methods for each route
  for (const [name, route] of Object.entries(options.routes ?? {})) {
    (client as any)[name] = (params: unknown) => call(route, params);
  }

  return client;
}
```

### Define Route Helper

```ts
// define.ts
import type { BaseSchema } from "valibot";
import type { RouteDefinition } from "./types";

/**
 * Type-safe route definition helper.
 * Identity function that provides type inference.
 */
export function defineRoute<
  TParams extends BaseSchema<any, any, any>,
  TResponse extends BaseSchema<any, any, any>,
>(route: RouteDefinition<TParams, TResponse>): RouteDefinition<TParams, TResponse> {
  return route;
}
```

---

## OpenAPI Generator (Epic 2 — Deferred)

> **Status:** Deferred. Focus on Epic 1 (Core Runtime) first.
> 
> Epic 2 will introduce a custom TypeSpec emitter to auto-generate RouteDefinitions from OpenAPI/TypeSpec specs. For now, users write RouteDefinitions manually using `defineRoute()`.

Details preserved in collapsed section for future reference:

<details>
<summary>Generator Design (click to expand)</summary>

### Recommended Libraries

| Library | Purpose |
|---------|---------|
| @apidevtools/swagger-parser | OpenAPI parsing & validation |
| openapi-types | TypeScript types for OpenAPI |
| yaml | YAML parsing |
| change-case | Naming transformations |
| prettier | Code formatting |

### Generator Structure

```
generator/
├── cli.ts           # CLI entry point
├── parse.ts         # Load & dereference OpenAPI spec
├── transform.ts     # Spec → IR
├── emit.ts          # IR → TypeScript
├── valibot.ts       # JSON Schema → Valibot
└── index.ts         # Programmatic API
```

### Pipeline

```
OpenAPI Spec → Parse → Transform → Emit → TypeScript
```

</details>
generator/
├── cli.ts           # CLI entry point (commander/citty)
├── parse.ts         # Load & dereference OpenAPI spec
├── transform.ts     # Spec → Intermediate Representation
├── emit.ts          # IR → TypeScript strings
├── valibot.ts       # JSON Schema → Valibot schema code
└── index.ts         # Programmatic API
```

### Pipeline Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   OpenAPI Spec  │────▶│      Parse      │────▶│    Transform    │────▶│      Emit       │
│   (JSON/YAML)   │     │  (dereference)  │     │   (normalize)   │     │  (TypeScript)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

#### 1. Parse Phase (`parse.ts`)

```ts
import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPIV3 } from "openapi-types";

export async function parseSpec(input: string): Promise<OpenAPIV3.Document> {
  // Parses JSON/YAML, dereferences all $refs
  const api = await SwaggerParser.dereference(input);
  return api as OpenAPIV3.Document;
}
```

#### 2. Transform Phase (`transform.ts`)

Convert OpenAPI operations to an intermediate representation:

```ts
import type { OpenAPIV3 } from "openapi-types";

export type RouteIR = {
  name: string;                    // camelCase operation name
  tag: string;                     // Namespace/file grouping
  method: string;                  // HTTP method
  path: string;                    // URL path with {param} syntax
  pathParams: ParamIR[];           // Path parameters
  queryParams: ParamIR[];          // Query parameters
  bodySchema: SchemaIR | null;     // Request body schema
  responseSchema: SchemaIR;        // Response schema
  description?: string;            // JSDoc comment
};

export type ParamIR = {
  name: string;
  required: boolean;
  schema: SchemaIR;
};

export type SchemaIR =
  | { type: "string"; format?: string }
  | { type: "number" }
  | { type: "boolean" }
  | { type: "array"; items: SchemaIR }
  | { type: "object"; properties: Record<string, SchemaIR & { required: boolean }> }
  | { type: "union"; variants: SchemaIR[] }
  | { type: "literal"; value: string | number | boolean }
  | { type: "unknown" };

export function transformSpec(spec: OpenAPIV3.Document): RouteIR[] {
  const routes: RouteIR[] = [];

  for (const [path, pathItem] of Object.entries(spec.paths ?? {})) {
    for (const method of ["get", "post", "put", "patch", "delete"] as const) {
      const operation = pathItem?.[method];
      if (!operation) continue;

      routes.push({
        name: toOperationName(operation.operationId ?? `${method}${path}`),
        tag: operation.tags?.[0] ?? "default",
        method: method.toUpperCase(),
        path,
        pathParams: extractPathParams(operation, pathItem),
        queryParams: extractQueryParams(operation, pathItem),
        bodySchema: extractRequestBody(operation),
        responseSchema: extractResponse(operation),
        description: operation.summary ?? operation.description,
      });
    }
  }

  return routes;
}
```

#### 3. Emit Phase (`emit.ts`)

Generate TypeScript files from IR:

```ts
import type { RouteIR } from "./transform";
import { schemaToValibot } from "./valibot";

export function emitRouteFile(routes: RouteIR[], tag: string): string {
  const imports = `import * as v from "valibot";\nimport { defineRoute } from "@b3b/cherry";\n\n`;

  const routeCode = routes
    .filter((r) => r.tag === tag)
    .map(emitRoute)
    .join("\n\n");

  return imports + routeCode;
}

function emitRoute(route: RouteIR): string {
  const paramsSchema = buildParamsSchema(route);
  const responseSchema = schemaToValibot(route.responseSchema);

  const pathExpr = route.pathParams.length > 0
    ? `(p) => \`${route.path.replace(/\{(\w+)\}/g, "${p.$1}")}\``
    : `"${route.path}"`;

  const jsdoc = route.description
    ? `/**\n * ${route.description}\n */\n`
    : "";

  return `${jsdoc}export const ${route.name} = defineRoute({
  method: "${route.method}",
  path: ${pathExpr},
  params: ${paramsSchema},
  response: ${responseSchema},
});`;
}

function buildParamsSchema(route: RouteIR): string {
  const allParams = [...route.pathParams, ...route.queryParams];

  if (allParams.length === 0 && !route.bodySchema) {
    return "v.object({})";
  }

  const fields = allParams.map((p) => {
    const schema = schemaToValibot(p.schema);
    return p.required ? `${p.name}: ${schema}` : `${p.name}: v.optional(${schema})`;
  });

  // Merge body schema fields for POST/PUT/PATCH
  if (route.bodySchema?.type === "object") {
    for (const [name, prop] of Object.entries(route.bodySchema.properties)) {
      const schema = schemaToValibot(prop);
      fields.push(prop.required ? `${name}: ${schema}` : `${name}: v.optional(${schema})`);
    }
  }

  return `v.object({\n    ${fields.join(",\n    ")},\n  })`;
}
```

#### 4. Valibot Schema Generation (`valibot.ts`)

Convert JSON Schema / OpenAPI Schema to Valibot code:

```ts
import type { SchemaIR } from "./transform";

export function schemaToValibot(schema: SchemaIR): string {
  switch (schema.type) {
    case "string":
      if (schema.format === "date-time") return "v.pipe(v.string(), v.isoTimestamp())";
      if (schema.format === "email") return "v.pipe(v.string(), v.email())";
      if (schema.format === "uuid") return "v.pipe(v.string(), v.uuid())";
      if (schema.format === "uri") return "v.pipe(v.string(), v.url())";
      return "v.string()";

    case "number":
      return "v.number()";

    case "boolean":
      return "v.boolean()";

    case "array":
      return `v.array(${schemaToValibot(schema.items)})`;

    case "object":
      const fields = Object.entries(schema.properties).map(([name, prop]) => {
        const fieldSchema = schemaToValibot(prop);
        return prop.required
          ? `${safeName(name)}: ${fieldSchema}`
          : `${safeName(name)}: v.optional(${fieldSchema})`;
      });
      return `v.object({ ${fields.join(", ")} })`;

    case "union":
      const variants = schema.variants.map(schemaToValibot);
      return `v.union([${variants.join(", ")}])`;

    case "literal":
      return typeof schema.value === "string"
        ? `v.literal("${schema.value}")`
        : `v.literal(${schema.value})`;

    case "unknown":
    default:
      return "v.unknown()";
  }
}

function safeName(name: string): string {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name) ? name : `"${name}"`;
}
```

### CLI Interface

```ts
// cli.ts
import { defineCommand, runMain } from "citty";
import { parseSpec } from "./parse";
import { transformSpec } from "./transform";
import { emitRouteFile } from "./emit";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { format } from "prettier";

const main = defineCommand({
  meta: { name: "cherry", description: "Generate route definitions from OpenAPI" },
  args: {
    input: { type: "string", required: true, description: "OpenAPI spec path or URL" },
    output: { type: "string", required: true, description: "Output directory" },
  },
  async run({ args }) {
    const spec = await parseSpec(args.input);
    const routes = transformSpec(spec);

    // Group by tag
    const byTag = Map.groupBy(routes, (r) => r.tag);

    await mkdir(args.output, { recursive: true });

    for (const [tag, tagRoutes] of byTag) {
      const code = emitRouteFile(tagRoutes, tag);
      const formatted = await format(code, { parser: "typescript", printWidth: 100 });
      await writeFile(join(args.output, `${tag}.ts`), formatted);
    }

    console.log(`✓ Generated ${routes.length} routes in ${byTag.size} files`);
  },
});

runMain(main);
```

---

## Deployment

### Package Registry Targets

Cherry is published to both npm and JSR:

| Registry | Package Name | Usage |
|----------|--------------|-------|
| **npm** | `@b3b/cherry` | `npm install @b3b/cherry` |
| **JSR** | `@b3b/cherry` | `deno add jsr:@b3b/cherry` |

### JSR Configuration

```jsonc
// jsr.json
{
  "name": "@b3b/cherry",
  "version": "0.1.0",
  "exports": "./src/index.ts",
  "publish": {
    "include": ["src/**/*.ts", "README.md", "LICENSE"]
  }
}
```

### Publishing Workflow

```bash
# Build for npm
bun run build

# Publish to npm
npm publish --access public

# Publish to JSR
bunx jsr publish
```

### CI/CD (GitHub Actions)

```yaml
# .github/workflows/publish.yml
name: Publish

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2

      - run: bun install
      - run: bun run build
      - run: bun run test

      # Publish to npm
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      # Publish to JSR
      - run: bunx jsr publish
        env:
          JSR_TOKEN: ${{ secrets.JSR_TOKEN }}
```

---

## Build Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### tsdown.config.ts

```ts
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "generator/cli.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  minify: true,
  splitting: true,
  treeshake: true,
});
```

### package.json

```json
{
  "name": "@b3b/cherry",
  "version": "0.1.0",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./generator": {
      "types": "./dist/generator/index.d.ts",
      "import": "./dist/generator/index.js"
    }
  },
  "bin": {
    "cherry": "./dist/generator/cli.js"
  },
  "files": ["dist", "README.md", "LICENSE"],
  "scripts": {
    "build": "tsdown",
    "test": "bun test",
    "lint": "biome check",
    "format": "prettier --write ."
  },
  "dependencies": {
    "valibot": "^1.0.0"
  },
  "devDependencies": {
    "@apidevtools/swagger-parser": "^10.1.0",
    "@types/bun": "latest",
    "change-case": "^5.4.0",
    "citty": "^0.1.6",
    "openapi-types": "^12.1.3",
    "prettier": "^3.4.0",
    "tsdown": "^0.2.0",
    "typescript": "^5.7.0",
    "yaml": "^2.7.0"
  },
  "peerDependencies": {
    "valibot": ">=1.0.0"
  }
}
```

---

## Design Decisions

### Why String Templates over AST Generation?

1. **Simplicity** — Generated code is predictable (`defineRoute()` + Valibot schemas)
2. **Speed** — No AST parsing/manipulation overhead
3. **Debuggability** — Easy to inspect and modify templates
4. **Formatting** — Prettier handles all edge cases

### Why Valibot over Zod?

1. **Bundle size** — Valibot is ~10x smaller than Zod
2. **Tree-shaking** — Valibot functions are independently importable
3. **Performance** — Slightly faster validation
4. **Philosophy** — Aligns with Cherry's minimal footprint goal

Zod support can be added later via a plugin system if needed.

### Why Separate Generator Package?

The generator has heavy dependencies (OpenAPI parser, Prettier) that shouldn't bloat the runtime. Users who hand-write routes don't need the generator at all. Keeping them separate enables:

- Lighter runtime bundle
- Optional generator install
- Independent versioning
