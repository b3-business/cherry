---
# cherry-ti8c
title: Release cherry 0.3.3
status: completed
type: task
priority: normal
created_at: 2026-02-23T19:21:27Z
updated_at: 2026-02-23T19:22:18Z
---

Prepare and publish patch release 0.3.3 for packages/cherry by updating package/changelog/readme/jsr metadata, committing release, tagging, and pushing.

## Summary of Changes

- Prepared patch release metadata for `packages/cherry` version `0.3.3`.
- Updated version numbers:
  - `packages/cherry/package.json` -> `0.3.3`
  - `packages/cherry/jsr.json` -> `0.3.3`
- Updated release notes:
  - `packages/cherry/CHANGELOG.md` with `0.3.3` entry dated `2026-02-23`
  - `packages/cherry/README.md` Latest Changelog section to `0.3.3`
- Verified package quality:
  - `bun run --filter @b3-business/cherry typecheck`
  - `bun test packages/cherry/test`
