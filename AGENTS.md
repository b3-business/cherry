# CHERRY KNOWLEDGE BASE

**Generated:** 2026-01-05
**Branch:** main

## OVERVIEW

Tree-shakeable API client factory with Valibot validation and neverthrow error handling. Routes are plain objects - import only what you use.

## STRUCTURE

```
cherry/                          # Monorepo root
├── packages/
│   └── cherry/                  # Core library
│       ├── src/
│       │   ├── index.ts
│       │   ├── cherry_client.ts
│       │   ├── route.ts
│       │   ├── path.ts
│       │   ├── types.ts
│       │   └── errors.ts
│       └── test/
│           ├── types.test.ts
│           ├── errors.test.ts
│           ├── path.test.ts
│           ├── route.test.ts
│           ├── cherry_client.test.ts
│           └── integration.test.ts
├── examples/                    # Example API implementations
│   └── jsonplaceholder/         # JSONPlaceholder API example
│       ├── src/
│       │   ├── routes.ts
│       │   ├── client.ts
│       │   └── index.ts
│       └── test/
│           └── integration.test.ts
├── agent/
│   └── ARCHITECTURE.md
└── playground/
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add error type | `packages/cherry/src/errors.ts` | Extend `CherryError`, set `type` and `retryable` |
| Add/modify types | `packages/cherry/src/types.ts` | Uses Valibot `BaseSchema` generics |
| Type tests | `packages/cherry/test/types.test.ts` | Uses `expect-type` for compile-time checks |
| Implementation plan | `agent/ARCHITECTURE.md` | Phase-by-phase build guide |
| Path templates | `packages/cherry/src/path.ts` | `path()`, `param()`, `optional()` tagged templates |
| Route builder | `packages/cherry/src/route.ts` | `route()` with validation |
| Client | `packages/cherry/src/cherry_client.ts` | `createCherryClient()`, `serializeQueryParams()` |
| Public exports | `packages/cherry/src/index.ts` | All public API exports |

## CONVENTIONS

- **Error hierarchy**: All errors extend `CherryError` with `type: string` and `retryable: boolean`
- **Type inference**: Use `InferRouteInput<T>` / `InferRouteOutput<T>` - never annotate manually
- **Prettify wrapper**: Applied to intersection types for readable IDE tooltips
- **Result type**: `CherryResult<T>` = `ResultAsync<T, CherryError>` from neverthrow

## ANTI-PATTERNS

- NEVER use `@ts-expect-error` except in test files for intentional type errors
- NEVER throw in public API - wrap in `ResultAsync` (errors are values)
- Route definitions MAY throw for config mistakes (fail fast on dev errors)

## UNIQUE STYLES

- **Test framework**: Bun native (`bun:test`) - no Jest/Vitest
- **Type tests**: Heavy use of `expect-type` for compile-time assertions
- **Separate tsconfig**: `tsconfig.test.json` includes `bun-types`
- **No explicit test script**: Use `bun test` directly or `npm run check` for typecheck
- **Test documentation**: Add <10 line JSDoc comments to each `describe()` block and individual test cases explaining:
  - What the test validates (input/output examples)
  - Use cases and when the pattern applies
  - Edge cases being covered

## COMMANDS

```bash
# Type checking
npm run check              # Typecheck src + test
npm run typecheck          # Typecheck src only
npm run typecheck-test     # Typecheck test only

# Testing (run directly with bun)
bun test                   # Run all tests
bun test errors.test.ts    # Run specific test file

# Dependencies
bun install                # Install deps
```

## IMPLEMENTATION STATUS

| Phase | Status | Files |
|-------|--------|-------|
| 1. Types & Errors | DONE | `packages/cherry/src/types.ts`, `packages/cherry/src/errors.ts` |
| 2. Path Templates | DONE | `packages/cherry/src/path.ts` |
| 3. Route Builder | DONE | `packages/cherry/src/route.ts` |
| 4. Query Serialization | DONE | `packages/cherry/src/cherry_client.ts` |
| 5. Client Core | DONE | `packages/cherry/src/cherry_client.ts` |
| 6. Integration | DONE | `packages/cherry/src/index.ts`, `packages/cherry/test/integration.test.ts` |

## DEPENDENCIES

- **valibot** ^1.2.0 - Schema validation
- **neverthrow** ^8.2.0 - Result types (Railway-Oriented Programming)
- **expect-type** ^1.3.0 (dev) - Compile-time type assertions
- **@types/bun** ^1.3.5 (dev) - Bun runtime types

## CREATING EXAMPLE API PACKAGES

When asked to create a new example API implementation:

### 1. Research the API
- Find the API's base URL (use user-provided or search for official docs)
- Discover available routes via websearch
- Identify a "roundtrip" scenario that demonstrates CRUD operations

### 2. Design the Roundtrip
A good roundtrip tests the full lifecycle. Examples:
- **Todo API**: create todo -> list todos -> complete todo -> delete todo
- **Posts API**: create post -> get post -> update post -> list posts -> delete post
- **Users API**: create user -> get user -> update profile -> list users

**Limit to 10 routes maximum** - examples should be focused, not exhaustive.

### 3. Create the Package Structure
```bash
mkdir -p examples/{api-name}/src examples/{api-name}/test
```

### 4. Required Files

**package.json** (`examples/{api-name}/package.json`):
```json
{
  "name": "@b3b/cherry-example-{api-name}",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "check": "run-s typecheck",
    "typecheck": "tsc --noEmit -p .",
    "test": "bun test"
  },
  "dependencies": {
    "@b3-business/cherry": "workspace:*",
    "neverthrow": "^8.2.0",
    "valibot": "^1.2.0"
  },
  "devDependencies": {
    "@types/bun": "^1.3.5",
    "npm-run-all": "^4.1.5",
    "typescript": "^5.9.3"
  }
}
```

**tsconfig.json** (`examples/{api-name}/tsconfig.json`):
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022"],
    "moduleResolution": "bundler",
    "noEmit": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true,
    "isolatedModules": true,
    "types": ["@types/bun"]
  },
  "include": ["src/**/*", "test/**/*"]
}
```

### 5. Implementation Pattern

**routes.ts**: Define Valibot schemas and route definitions
```typescript
import * as v from "valibot";
import { route, path, param } from "@b3b/cherry";

export const ResourceSchema = v.object({ id: v.number(), name: v.string() });

export const getResource = route({
  method: "GET",
  path: path`/resources/${param("id")}`,
  pathParams: v.object({ id: v.number() }),
  response: ResourceSchema,
});
```

**client.ts**: Create the configured client
```typescript
import { createCherryClient } from "@b3b/cherry";
import { getResource, listResources } from "./routes";

export const apiClient = createCherryClient({
  baseUrl: "https://api.example.com",
  routes: { getResource, listResources },
});
```

**index.ts**: Re-export client and routes
```typescript
export { apiClient } from "./client";
export * from "./routes";
```

### 6. Integration Tests

Test the full roundtrip against the live API:
```typescript
import { describe, it, expect } from "bun:test";
import { apiClient } from "../src/client";

describe("API Roundtrip", () => {
  it("performs full CRUD cycle", async () => {
    const result = await apiClient.getResource({ id: 1 });
    expect(result.isOk()).toBe(true);
  });
});
```

### 7. Verify
```bash
bun install                                    # From monorepo root
bun run typecheck                              # In example dir
bun test                                       # In example dir
```

## PUBLISHING TO NPM

Publishing uses **trusted OIDC publishing** (no tokens required). The workflow triggers automatically on tag push.

### To publish a new version:

1. **Update version** in `packages/cherry/package.json` and `packages/cherry/jsr.json`
2. **Update changelog** in `packages/cherry/CHANGELOG.md` and `packages/cherry/README.md` (Latest Changelog section)
3. **Commit and tag**:
   ```bash
   git add -A
   git commit -m "release: X.Y.Z - description"
   git tag X.Y.Z
   git push && git push --tags
   ```

The GitHub Actions workflow (`.github/workflows/publish.yml`) will:
- Run checks, tests, and build
- Publish to npm with provenance attestation
- Publish to JSR (jsr.io)

### Tag patterns that trigger publish:
- `0.*` (e.g., `0.3.0`)
- `1.*` (e.g., `1.0.0`)

### Requirements (already configured):
- `repository` field in `package.json` must match GitHub repo URL
- Trusted publisher configured on npmjs.com (Settings → Trusted Publisher)
- Node 24+ for npm 11.5.1+ (required for OIDC)
- Package linked to GitHub repo on jsr.io (Settings → Link GitHub Repository)

## NOTES

- `playground/` is empty - use for API experiments
- README shows final API design, not current state
- ARCHITECTURE.md is the source of truth for implementation phases
