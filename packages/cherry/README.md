# cherry

> Cherry-pick your API routes.

A tree-shakeable, minimal API client factory. Import only the routes you need — nothing more.

[![npm](https://img.shields.io/npm/v/@b3-business/cherry)](https://www.npmjs.com/package/@b3-business/cherry)
[![JSR](https://jsr.io/badges/@b3-business/cherry)](https://jsr.io/@b3-business/cherry)
[![GitHub](https://img.shields.io/badge/GitHub-b3--business%2Fcherry-blue?logo=github)](https://github.com/b3-business/cherry)

---

## Latest Changelog - 0.3.2

- Fix: Ship TypeScript source files in npm package to fix module resolution

See [CHANGELOG.md](https://github.com/b3-business/cherry/blob/main/packages/cherry/CHANGELOG.md) for full history.

---

## What is Cherry?

Cherry is a lightweight API client library that separates **route definitions** from the **client runtime**. Routes are plain objects with validation schemas — import only what you use, bundle only what you import.

```ts
import { createCherryClient } from "@b3b/cherry";
import { listZones, getZone } from "./routes/cloudflare";

const cf = createCherryClient({
  baseUrl: "https://api.cloudflare.com/client/v4",
  headers: () => ({ Authorization: `Bearer ${process.env.CF_TOKEN}` }),
  routes: { listZones, getZone },
});

// Fully typed, fully tree-shakeable
const zones = await cf.listZones({ account_id: "abc" });
```

---

## Why Cherry?

### The Problem

Official API clients (e.g., Cloudflare, AWS) bundle **everything**:

- Every endpoint, even ones you'll never use
- Massive web shims for Node.js compatibility
- Complex class hierarchies that defeat tree-shaking

The result? A simple "list DNS records" call pulls in megabytes of unused code, bloating serverless deployments and slowing cold starts.

```
# Real-world bundle size comparison (hypothetical)
cloudflare-sdk:     2.4 MB (bundled)
cherry + 3 routes:   12 KB (bundled)
```

### The Solution

Cherry inverts the architecture:

| Traditional SDK | Cherry |
|-----------------|--------|
| Monolithic client class | Minimal client factory (~50 lines) |
| All endpoints registered | Routes are plain imports |
| Tree-shaking impossible | Only imported routes are bundled |
| Runtime schema validation optional | Validation built-in (Valibot) |

**Routes are data, not code.** They're plain objects describing endpoints — completely decoupled from the client that executes them.

---

## Installation

```bash
# npm
npm install @b3b/cherry valibot

# pnpm
pnpm add @b3b/cherry valibot

# bun
bun add @b3b/cherry valibot

# jsr (Deno)
deno add jsr:@b3b/cherry
```

---

## Quick Start

### 1. Define a Route

```ts
import * as v from "valibot";
import { route, path, param } from "@b3b/cherry";

export const listZones = route({
  method: "GET",
  path: path`/zones`,
  queryParams: v.object({
    account_id: v.string(),
    page: v.optional(v.number()),
  }),
  response: v.object({
    result: v.array(v.object({ id: v.string(), name: v.string() })),
  }),
});
```

### 2. Create a Client

```ts
import { createCherryClient } from "@b3b/cherry";
import { listZones, getZone, createDnsRecord } from "./routes/cloudflare";

const cf = createCherryClient({
  baseUrl: "https://api.cloudflare.com/client/v4",
  headers: () => ({ Authorization: `Bearer ${process.env.CF_TOKEN}` }),
  routes: { listZones, getZone, createDnsRecord },
});
```

### 3. Call Your API

```ts
// Named method — discoverable, autocomplete-friendly
const zones = await cf.listZones({ account_id: "abc" });

// Generic call — works with any route, even ones not in `routes`
const zones = await cf.call(listZones, { account_id: "abc" });
```

---

## Features

### Path Parameters

Use `path` tagged template with `param()` markers for dynamic URL segments:

```ts
import { route, path, param } from "@b3b/cherry";

export const getUser = route({
  method: "GET",
  path: path`/users/${param("id")}`,
  pathParams: v.object({ id: v.number() }),
  response: UserSchema,
});

// Multiple params
export const getComment = route({
  method: "GET",
  path: path`/posts/${param("postId")}/comments/${param("commentId")}`,
  pathParams: v.object({ postId: v.number(), commentId: v.number() }),
  response: CommentSchema,
});
```

### Optional Path Parameters

Use `optional()` for optional URL segments:

```ts
import { route, path, optional } from "@b3b/cherry";

export const getApiResource = route({
  method: "GET",
  path: path`/api${optional("version")}/resource`,
  pathParams: v.object({ version: v.optional(v.string()) }),
  response: ResourceSchema,
});
```

### Query Parameters

Define query string parameters with their own schema:

```ts
export const listUsers = route({
  method: "GET",
  path: path`/users`,
  queryParams: v.object({
    page: v.optional(v.number()),
    limit: v.optional(v.number()),
    search: v.optional(v.string()),
  }),
  response: v.array(UserSchema),
});

// Usage: client.listUsers({ page: 1, limit: 10, search: "john" })
// → GET /users?page=1&limit=10&search=john
```

### Query Array Formats

Configure how arrays are serialized in query strings:

```ts
export const filterItems = route({
  method: "GET",
  path: path`/items`,
  queryParams: v.object({ tags: v.array(v.string()) }),
  queryParamOptions: { arrayFormat: "comma" }, // or "repeat" | "brackets" | "json"
  response: v.array(ItemSchema),
});

// arrayFormat examples for tags=["a","b"]:
// "repeat"   → ?tags=a&tags=b        (default)
// "comma"    → ?tags=a,b
// "brackets" → ?tags[]=a&tags[]=b
// "json"     → ?tags=["a","b"]
```

### Body Parameters

Define request body schema for POST/PUT/PATCH:

```ts
export const createPost = route({
  method: "POST",
  path: path`/posts`,
  bodyParams: v.object({
    title: v.string(),
    body: v.string(),
    userId: v.number(),
  }),
  response: PostSchema,
});
```

### Namespaced Routes

Group related routes into nested objects for better organization:

```ts
// routes.ts
export const posts = {
  list: route({ method: "GET", path: path`/posts`, response: v.array(PostSchema) }),
  get: route({ method: "GET", path: path`/posts/${param("id")}`, pathParams: v.object({ id: v.number() }), response: PostSchema }),
  create: route({ method: "POST", path: path`/posts`, bodyParams: PostInputSchema, response: PostSchema }),
};

export const users = {
  list: route({ method: "GET", path: path`/users`, response: v.array(UserSchema) }),
  get: route({ method: "GET", path: path`/users/${param("id")}`, pathParams: v.object({ id: v.number() }), response: UserSchema }),
};

// client.ts
const api = createCherryClient({
  baseUrl: "https://api.example.com",
  routes: { posts, users },
});

// Usage with namespacing
await api.posts.list({});
await api.posts.get({ id: 1 });
await api.users.get({ id: 42 });
```

### Dynamic Headers

Provide headers dynamically (supports async for token refresh):

```ts
const client = createCherryClient({
  baseUrl: "https://api.example.com",
  headers: async () => ({
    Authorization: `Bearer ${await getAccessToken()}`,
    "X-Request-ID": crypto.randomUUID(),
  }),
  routes: { /* ... */ },
});
```

### Generic `call()` Method

Call any route without registering it in the client:

```ts
import { createCherryClient } from "@b3b/cherry";
import { getUser, listPosts } from "./routes";

const client = createCherryClient({ baseUrl: "https://api.example.com" });

// Works with any route - useful for one-off calls or dynamic route selection
const user = await client.call(getUser, { id: 1 });
const posts = await client.call(listPosts, {});
```

### Custom Fetcher

Replace the underlying fetch logic for logging, retries, auth refresh, etc.:

```ts
createCherryClient({
  baseUrl: "...",
  fetcher: async (req) => {
    console.log(`→ ${req.init.method} ${req.url}`);
    const res = await fetch(req.url, req.init);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res;
  },
});
```

### Composable Middleware

Composition is userland — no magic middleware system:

```ts
import type { Fetcher } from "@b3b/cherry";

const withRetry = (fetcher: Fetcher, attempts = 3): Fetcher =>
  async (req) => {
    for (let i = 0; i < attempts; i++) {
      try { return await fetcher(req); }
      catch (e) { if (i === attempts - 1) throw e; }
    }
    throw new Error("unreachable");
  };

const withLogging = (fetcher: Fetcher): Fetcher =>
  async (req) => {
    console.log(`→ ${req.init.method} ${req.url}`);
    return fetcher(req);
  };

const baseFetcher: Fetcher = (req) => fetch(req.url, req.init);

createCherryClient({
  baseUrl: "...",
  fetcher: withLogging(withRetry(baseFetcher)),
});
```

### Railway-Oriented Error Handling

All client methods return `ResultAsync<T, CherryError>` from [neverthrow](https://github.com/supermacro/neverthrow):

```ts
const result = await client.posts.get({ id: 1 });

// Pattern 1: Check and unwrap
if (result.isOk()) {
  console.log(result.value); // typed as Post
} else {
  console.error(result.error); // typed as CherryError
}

// Pattern 2: Map/chain operations
const title = await client.posts.get({ id: 1 })
  .map(post => post.title)
  .unwrapOr("Unknown");

// Pattern 3: Match both cases
result.match(
  (post) => console.log(`Got: ${post.title}`),
  (error) => console.error(`Failed: ${error.message}`),
);
```

### Typed Error Hierarchy

All errors extend `CherryError` with `type` and `retryable` properties:

```ts
import {
  CherryError,
  HttpError,        // HTTP 4xx/5xx (retryable for 5xx and 429)
  ValidationError,  // Valibot schema validation failed
  NetworkError,     // fetch() threw (always retryable)
  SerializationError, // JSON serialization failed
  UnknownCherryError, // Catch-all
  isCherryError,
} from "@b3b/cherry";

const result = await client.posts.get({ id: 1 });

if (result.isErr()) {
  const err = result.error;
  
  if (err instanceof HttpError) {
    console.log(err.status, err.statusText, err.body);
    if (err.retryable) { /* retry logic */ }
  }
  
  if (err instanceof ValidationError) {
    console.log(err.target); // "request" or "response"
    console.log(err.issues); // Valibot issues array
  }
}
```

### Type Inference Utilities

Extract input/output types from route definitions:

```ts
import type { InferRouteInput, InferRouteOutput } from "@b3b/cherry";
import { getUser } from "./routes";

type GetUserInput = InferRouteInput<typeof getUser>;
// { id: number }

type GetUserOutput = InferRouteOutput<typeof getUser>;
// { id: number; name: string; email: string; ... }
```

### Route Validation at Definition Time

Routes validate configuration immediately — catch mistakes during development:

```ts
// ❌ Throws: "Route has path params [id] but no pathParams schema"
const bad = route({
  method: "GET",
  path: path`/users/${param("id")}`,
  response: UserSchema,
  // Missing pathParams!
});

// ❌ Throws: "Path param ':userId' not found in pathParams schema"
const mismatch = route({
  method: "GET",
  path: path`/users/${param("userId")}`,
  pathParams: v.object({ id: v.number() }), // Wrong key!
  response: UserSchema,
});
```

---

## Design Principles

1. **Tree-shakeable by default** — Routes are plain imports, not registered in a global client
2. **Minimal runtime** — Client is ~50 lines, no dependencies beyond Valibot
3. **User owns composition** — No built-in middleware, just a replaceable fetcher
4. **Type-safe end-to-end** — Params validated in, response validated out
5. **No magic** — Everything is explicit and inspectable

---

## Stack

- **Runtime:** Bun
- **Validation:** Valibot
- **Language:** TypeScript (strict)
- **Formatting:** Prettier (100 char width)
- **Bundling:** tsdown

---

## Dev Info

### Publishing

Publishing to npm and JSR uses **trusted OIDC publishing** via GitHub Actions - no tokens required. Manual `npm publish` or `jsr publish` will not work locally.

To release a new version:
1. Update version in `package.json` and `jsr.json`
2. Update `CHANGELOG.md` and README (Latest Changelog section)
3. Commit, tag, and push:
   ```bash
   git add -A && git commit -m "release: X.Y.Z" && git tag X.Y.Z && git push && git push --tags
   ```

The GitHub Actions workflow will automatically publish to both npm and JSR.

### Dry-run Scripts

```bash
npm run dry-npm   # Verify npm package contents
npm run dry-jsr   # Verify JSR package contents
```

---

## License

MIT
