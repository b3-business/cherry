---
# cherry-gymn
title: Make Oxlint guardrails error-only
status: completed
type: task
priority: normal
created_at: 2026-02-23T20:10:51Z
updated_at: 2026-02-23T20:12:49Z
---

Resolve existing lint warnings and tighten Oxlint config to error-only mode for stricter guardrails.

## Todo
- [x] Fix current warnings in cherry source/tests
- [x] Update Oxlint config to error-only categories/rules
- [x] Run check/typecheck/test and confirm green
- [x] Summarize strict-mode rollout

## Summary of Changes
- Fixed all existing Cherry warnings:
  - Reworked query serialization in packages/cherry/src/cherry_client.ts to avoid stringifying unknown objects via Object default toString and to throw SerializationError for unsupported types.
  - Updated template-string usage in tests to coerce unknown values with String(...).
  - Removed unnecessary await on non-thenable Result.match call in errors test.
- Tightened .oxlintrc.json to error-only behavior:
  - categories.suspicious: warn -> error
  - typescript/restrict-template-expressions: warn -> error
  - typescript/no-base-to-string: warn -> error
  - typescript/await-thenable: warn -> error
- Verified gates after changes:
  - bun run format
  - bun run format:check
  - bun run check (0 warnings, 0 errors)
  - bun run typecheck
  - bun run test
