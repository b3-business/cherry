---
# cherry-jp7p
title: Move example packages from examples/ to packages/
status: completed
type: task
priority: normal
created_at: 2026-02-23T19:10:00Z
updated_at: 2026-02-23T19:13:01Z
---

Relocate all packages currently under examples/ into packages/ and update workspace/package references accordingly.

## Summary of Changes

- Moved example packages from `examples/` into `packages/`:
  - `examples/jsonplaceholder` -> `packages/jsonplaceholder`
  - `examples/pokeapi` -> `packages/pokeapi`
- Updated monorepo workspaces in root `package.json` from explicit `packages/cherry` + `examples/*` to `packages/*`.
- Updated `AGENTS.md` structure and example-package creation paths to reference `packages/{api-name}`.
- Fixed stale package imports in moved PokeAPI example:
  - `@b3b/cherry` -> `@b3-business/cherry` in `packages/pokeapi/src/client.ts` and `packages/pokeapi/src/routes.ts`.
- Ran verification:
  - `bun run --filter @b3b/cherry-example-jsonplaceholder typecheck`
  - `bun run --filter @b3b/cherry-example-pokeapi typecheck`
  - `bun test packages/jsonplaceholder/test/integration.test.ts packages/pokeapi/test/integration.test.ts`
  - all passing.
