---
# cherry-dpnf
title: Add oxfmt formatter setup across workspaces
status: completed
type: task
priority: normal
created_at: 2026-02-23T20:08:39Z
updated_at: 2026-02-23T20:09:38Z
---

Introduce Oxfmt scripts/dependency in monorepo with a low-risk rollout and validate formatting + existing checks/tests.

## Todo
- [x] Add oxfmt dependency and root format scripts
- [x] Add package-level format scripts in all workspace packages
- [x] Install/update lockfile
- [x] Run formatter and verify format:check passes
- [x] Re-run check/test and summarize outcomes

## Summary of Changes
- Added root scripts: format and format:check to run formatter across all workspace packages.
- Added oxfmt (^0.35.0) to root devDependencies.
- Added package scripts in cherry/jsonplaceholder/pokeapi:
  - format: oxfmt --write src test
  - format:check: oxfmt --check src test
- Installed dependencies and updated bun.lock.
- Ran bun run format to normalize formatting in package source/test files.
- Verified formatting with bun run format:check (passes in all packages).
- Re-validated existing quality gates with bun run check and bun run test (both pass; existing 4 lint warnings remain unchanged).
