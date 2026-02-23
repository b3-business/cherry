---
# cherry-zogk
title: Roll out tsgo for monorepo typechecking
status: completed
type: task
priority: normal
created_at: 2026-02-23T20:05:13Z
updated_at: 2026-02-23T20:06:15Z
---

Implement a low-risk tsgo adoption in Cherry monorepo by switching package typecheck scripts to tsgo while keeping tsc fallback scripts.

## Todo
- [x] Update workspace/package scripts for tsgo + fallback
- [x] Add @typescript/native-preview dependency
- [x] Install deps and refresh lockfile
- [x] Run typecheck/check/test to validate
- [x] Summarize changes and usage

## Summary of Changes
- Switched package-level typecheck scripts to tsgo in packages/cherry, packages/jsonplaceholder, and packages/pokeapi.
- Added fallback typecheck:tsc scripts in all three packages to keep a safe rollback path.
- Added root scripts: typecheck and typecheck:tsc to run these across all workspaces.
- Added @typescript/native-preview as a root devDependency and updated bun.lock.
- Validated with bun run typecheck, bun run typecheck:tsc, bun run check, and bun run test.
- Observed local timing improvement: bun run typecheck (~0.27s) vs bun run typecheck:tsc (~1.07s).
