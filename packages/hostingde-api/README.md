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
import { createHostingDeClient, zonesFind } from "@b3-business/hosting.de";

const client = createHostingDeClient({
  apiToken: process.env.HOSTING_DE_API_TOKEN!,
  routes: { zonesFind },
});
```

### 2. Call the API

```ts
// List all DNS zones (authToken is injected automatically)
const result = await client.zonesFind({});

if (result.isOk()) {
  console.log(`Found ${result.value.response.totalEntries} zones`);
  for (const zone of result.value.response.data) {
    console.log(`- ${zone.name} (${zone.type})`);
  }
}

// With pagination and filtering
const filtered = await client.zonesFind({
  limit: 10,
  page: 1,
  filter: { field: "name", value: "example.com", relation: "equal" },
});
```

### API Characteristics

> **Important:** The hosting.de API has some unique characteristics:
>
> - **POST-only** — All endpoints use POST, even for read operations
> - **Auth in body** — The `authToken` goes in the request body, not headers
> - **Wrapped responses** — All responses are wrapped in `{ status, response, metadata }`
>
> This client handles all of this automatically!

---

## Authentication

The hosting.de API uses token-based authentication. Get your API token from:
https://secure.hosting.de/profile/api-keys

The client automatically injects the `X-Auth-Token` header on every request.

---

## Available Routes

Routes are being implemented incrementally.

### DNS Routes (`@b3-business/hosting.de/routes/dns`)

- [x] `zonesFind` — List DNS zones with filtering/pagination

### Planned

- [ ] **DNS** — Zone create/update/delete, record CRUD
- [ ] **Domains** — List, get, create, update, delete domains
- [ ] **SSL Certificates** — Order, renew, manage certificates
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

## Testing

Current tests focus on DNS only:

- **Read-only smoke tests** against a real account (requires `HOSTING_DE_API_TOKEN`). These accept empty lists as valid responses to ensure requests are well-formed.
- **DNS integration tests** that modify records in a main account zone (requires `HOSTING_DE_API_TOKEN` and a configured zone in `packages/hostingde-api/test/dns-integration.test.ts`).
- **Low-risk CRUD tests** are present but **skipped** until a separate testing account is available (requires `HOSTING_DE_API_TOKEN_LOW_RISK` and `HOSTING_DE_LOW_RISK_ZONE`).

There are no other tests at the moment.

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
