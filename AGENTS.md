# CHERRY KNOWLEDGE BASE

**Generated:** 2026-01-05
**Branch:** main

## OVERVIEW

Tree-shakeable API client factory with Valibot validation and neverthrow error handling. Routes are plain objects - import only what you use.

## STRUCTURE

```
cherry/
├── src/
│   ├── index.ts          # Public exports
│   ├── cherry_client.ts  # createCherryClient(), call(), URL building
│   ├── route.ts          # route() builder with validation
│   ├── path.ts           # path(), param(), optional() tagged templates
│   ├── types.ts          # Core types: CherryRoute, InferRouteInput/Output, Client
│   └── errors.ts         # Error hierarchy: HttpError, ValidationError, NetworkError, SerializationError
├── test/
│   ├── types.test.ts         # Type-level tests with expect-type
│   ├── errors.test.ts        # Error class runtime tests
│   ├── path.test.ts          # Path template tests
│   ├── route.test.ts         # Route builder tests
│   ├── cherry_client.test.ts # Client and query serialization tests
│   └── integration.test.ts   # End-to-end CRUD and neverthrow pattern tests
├── agent/
│   └── ARCHITECTURE.md   # Full implementation plan
└── playground/           # Empty, for experiments
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add error type | `src/errors.ts` | Extend `CherryError`, set `type` and `retryable` |
| Add/modify types | `src/types.ts` | Uses Valibot `BaseSchema` generics |
| Type tests | `test/types.test.ts` | Uses `expect-type` for compile-time checks |
| Implementation plan | `agent/ARCHITECTURE.md` | Phase-by-phase build guide |
| Path templates | `src/path.ts` | `path()`, `param()`, `optional()` tagged templates |
| Route builder | `src/route.ts` | `route()` with validation |
| Client | `src/cherry_client.ts` | `createCherryClient()`, `serializeQueryParams()` |
| Public exports | `src/index.ts` | All public API exports |

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
| 1. Types & Errors | DONE | `src/types.ts`, `src/errors.ts` |
| 2. Path Templates | DONE | `src/path.ts` |
| 3. Route Builder | DONE | `src/route.ts` |
| 4. Query Serialization | DONE | `src/cherry_client.ts` |
| 5. Client Core | DONE | `src/cherry_client.ts` |
| 6. Integration | DONE | `src/index.ts`, `test/integration.test.ts` |

## DEPENDENCIES

- **valibot** ^1.2.0 - Schema validation
- **neverthrow** ^8.2.0 - Result types (Railway-Oriented Programming)
- **expect-type** ^1.3.0 (dev) - Compile-time type assertions
- **@types/bun** ^1.3.5 (dev) - Bun runtime types

## NOTES

- `playground/` is empty - use for API experiments
- README shows final API design, not current state
- ARCHITECTURE.md is the source of truth for implementation phases
