# hosting.de API Client

> A tree-shakeable API client for [hosting.de](https://www.hosting.de/) using [Cherry](../cherry/).

[![npm](https://img.shields.io/npm/v/@b3-business/hosting.de)](https://www.npmjs.com/package/@b3-business/hosting.de)

---

## API Documentation

**Official API Docs:** https://www.hosting.de/api/

---

## Development Context

This package uses the **workspace version of Cherry** (`"@b3-business/cherry": "workspace:*"`) to always have the newest code for the library.

**Why?** If complications or missing features arise while developing `hostingde-api`, we can fix them directly in the `cherry` package and use them right away — no need to publish a new Cherry version first.

This monorepo setup enables rapid iteration:
1. Discover a limitation in Cherry while building hosting.de routes
2. Fix/extend Cherry in `packages/cherry`
3. Immediately use the fix in `packages/hostingde-api`
4. Both packages evolve together

---

## Installation

```bash
# npm
npm install @b3-business/hosting.de

# pnpm
pnpm add @b3-business/hosting.de

# bun
bun add @b3-business/hosting.de
```

---

## Quick Start

### 1. Create a Client

```ts
import { createHostingDeClient } from "@b3-business/hosting.de";
// Import only the routes you need (once implemented)
// import { listDomains, getDomain } from "@b3-business/hosting.de/routes";

const client = createHostingDeClient({
  apiToken: process.env.HOSTING_DE_API_TOKEN!,
  // routes: { listDomains, getDomain },
});
```

### 2. Call the API

```ts
// Once routes are implemented:
// const domains = await client.listDomains({});
// const domain = await client.getDomain({ domainName: "example.com" });
```

---

## Authentication

The hosting.de API uses token-based authentication. Get your API token from:
https://secure.hosting.de/profile/api-keys

The client automatically injects the `X-Auth-Token` header on every request.

---

## Available Routes

Routes are being implemented incrementally. Currently planned:

- [ ] **Domains** — List, get, create, update, delete domains
- [ ] **DNS** — Zone management, record CRUD
- [ ] **SSL Certificates** — Order, renew, manage certificates
- [ ] **Nameservers** — Nameserver configuration
- [ ] **Contacts** — Contact/handle management

Each route is a separate import — only bundle what you use!

---

## Error Handling

Uses Cherry's railway-oriented error handling with `neverthrow`:

```ts
const result = await client.listDomains({});

if (result.isOk()) {
  console.log(result.value); // typed response
} else {
  console.error(result.error); // CherryError with type info
}

// Or use match:
result.match(
  (domains) => console.log(`Found ${domains.length} domains`),
  (error) => console.error(`Failed: ${error.message}`),
);
```

---

## Contributing

This package is part of the [Cherry monorepo](https://github.com/b3-business/cherry).

```bash
# Clone and install
git clone https://github.com/b3-business/cherry.git
cd cherry
bun install

# Run tests
bun test --filter hostingde-api

# Type check
bun run --filter @b3-business/hosting.de typecheck
```

---

## License

MIT
