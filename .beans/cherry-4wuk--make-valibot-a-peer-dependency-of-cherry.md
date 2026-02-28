---
# cherry-4wuk
title: Make valibot a peer dependency of cherry
status: completed
type: task
priority: normal
created_at: 2026-02-23T19:16:15Z
updated_at: 2026-02-23T19:16:47Z
---

Update packages/cherry/package.json so valibot is declared as a peer dependency with a relaxed lower-bound policy starting at the current minor line.

## Summary of Changes

- Updated `packages/cherry/package.json` to make `valibot` a peer dependency instead of a runtime dependency.
- Set peer dependency policy to relaxed lower bound from current minor line:
  - `"valibot": ">=1.2.0"`
- Kept `valibot` in `devDependencies` for local development/tests of `packages/cherry`.
- Verified with:
  - `bun run --filter @b3-business/cherry typecheck`
  - `bun test packages/cherry/test`
