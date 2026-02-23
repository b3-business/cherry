---
# cherry-jph0
title: Use npm-run-all for root example test script
status: completed
type: task
priority: normal
created_at: 2026-02-23T19:15:16Z
updated_at: 2026-02-23T19:15:41Z
---

Add npm-run-all at monorepo root and switch test:examples script to run-s for simpler orchestration.

## Summary of Changes

- Added `npm-run-all` to root `devDependencies`.
- Updated root `test:examples` script to use `run-s`:
  - from: `bun run test:jsonplaceholder && bun run test:pokeapi`
  - to: `run-s test:jsonplaceholder test:pokeapi`
- Verified with `bun run test:examples` (both example test suites pass).
