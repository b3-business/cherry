# cherry

> Cherry-pick your API routes.

A tree-shakeable, minimal API client factory. Import only the routes you need — nothing more.

<a href="https://www.npmjs.com/package/@b3-business/cherry" target="_blank"><img src="https://img.shields.io/npm/v/@b3-business/cherry" alt="npm"></a>
<a href="https://jsr.io/@b3-business/cherry" target="_blank"><img src="https://jsr.io/badges/@b3-business/cherry" alt="JSR"></a>
<a href="https://github.com/b3-business/cherry" target="_blank"><img src="https://img.shields.io/badge/GitHub-b3--business%2Fcherry-blue?logo=github" alt="GitHub"></a>

---

## Latest Changelog - 0.2.5

- README badges now open in new tab
- GitHub badge shows repo name instead of stars

See [CHANGELOG.md](https://github.com/b3-business/cherry/blob/main/packages/cherry/CHANGELOG.md) for full history.

---

## What is Cherry?

Cherry is a lightweight API client library that separates **route definitions** from the **client runtime**. Routes are plain objects with validation schemas — import only what you use, bundle only what you import.

```ts
import { createClient } from "@b3b/cherry";
import { listZones, getZone } from "./routes/cloudflare";

const cf = createClient({
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
import { defineRoute } from "@b3b/cherry";

export const listZones = defineRoute({
  method: "GET",
  path: "/zones",
  params: v.object({
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
import { createClient } from "@b3b/cherry";
import { listZones, getZone, createDnsRecord } from "./routes/cloudflare";

const cf = createClient({
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

### Dynamic Path Parameters

```ts
export const getZone = defineRoute({
  method: "GET",
  path: (p) => `/zones/${p.zone_id}`,
  params: v.object({ zone_id: v.string() }),
  response: v.object({ /* ... */ }),
});
```

### Custom Fetcher

Replace the underlying fetch logic for logging, retries, auth refresh, etc.

```ts
createClient({
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

createClient({
  fetcher: withLogging(withRetry(defaultFetcher)),
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

## Generating Routes from OpenAPI

Cherry includes a generator that transforms OpenAPI 3.x specs into route definitions:

```bash
cherry generate --input ./openapi.json --output ./routes/
```

See [ARCHITECTURE.md](./agent/ARCHITECTURE.md) for generator implementation details.

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
