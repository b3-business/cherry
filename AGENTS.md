# CHERRY KNOWLEDGE BASE

**Generated:** 2026-01-05
**Commit:** 86363f2
**Branch:** main

## OVERVIEW

Tree-shakeable API client factory with Valibot validation and neverthrow error handling. Routes are plain objects - import only what you use.

## STRUCTURE

```
cherry/
├── src/
│   ├── types.ts      # Core types: CherryRoute, InferRouteInput/Output, Client
│   └── errors.ts     # Error hierarchy: HttpError, ValidationError, NetworkError
├── test/
│   ├── types.test.ts   # Type-level tests with expect-type (591 lines)
│   └── errors.test.ts  # Error class runtime tests
├── agent/
│   └── ARCHITECTURE.md # Full implementation plan (1129 lines)
└── playground/         # Empty, for experiments
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add error type | `src/errors.ts` | Extend `CherryError`, set `type` and `retryable` |
| Add/modify types | `src/types.ts` | Uses Valibot `BaseSchema` generics |
| Type tests | `test/types.test.ts` | Uses `expect-type` for compile-time checks |
| Implementation plan | `agent/ARCHITECTURE.md` | Phase-by-phase build guide |
| Missing: `client.ts` | Not yet implemented | See ARCHITECTURE.md Phase 5 |
| Missing: `route.ts` | Not yet implemented | See ARCHITECTURE.md Phase 3 |
| Missing: `path.ts` | Not yet implemented | See ARCHITECTURE.md Phase 2 |
| Missing: `index.ts` | Not yet implemented | Public exports |

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
| 2. Path Templates | TODO | `src/path.ts` |
| 3. Route Builder | TODO | `src/route.ts` |
| 4. Query Serialization | TODO | Part of `src/client.ts` |
| 5. Client Core | TODO | `src/client.ts` |
| 6. Integration | TODO | `src/index.ts`, integration tests |

## DEPENDENCIES

- **valibot** ^1.2.0 - Schema validation
- **neverthrow** ^8.2.0 - Result types (Railway-Oriented Programming)
- **expect-type** ^1.3.0 (dev) - Compile-time type assertions
- **@types/bun** ^1.3.5 (dev) - Bun runtime types

## NOTES

- `playground/` is empty - use for API experiments
- README shows final API design, not current state
- ARCHITECTURE.md is the source of truth for implementation phases
