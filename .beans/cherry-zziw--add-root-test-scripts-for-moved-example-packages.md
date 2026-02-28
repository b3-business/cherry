---
# cherry-zziw
title: Add root test scripts for moved example packages
status: completed
type: task
priority: normal
created_at: 2026-02-23T19:13:48Z
updated_at: 2026-02-23T19:14:13Z
---

Update root package.json scripts with dedicated test commands for packages/jsonplaceholder and packages/pokeapi example packages.

## Summary of Changes

- Updated root `package.json` scripts with dedicated test commands for moved example packages:
  - `test:jsonplaceholder`
  - `test:pokeapi`
  - `test:examples` (runs both)
- Kept existing `test`, `check`, and `test:prod` scripts.
- Verified by running:
  - `bun run test:jsonplaceholder`
  - `bun run test:pokeapi`
  both passing.
