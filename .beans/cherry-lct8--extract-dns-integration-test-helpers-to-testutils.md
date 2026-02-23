---
# cherry-lct8
title: Extract DNS integration test helpers to test/utils
status: completed
type: task
priority: normal
created_at: 2026-02-23T18:48:14Z
updated_at: 2026-02-23T18:49:49Z
---

Move helper functions out of packages/hostingde-api/test/dns-integration.test.ts into packages/hostingde-api/test/utils and update integration test to consume them.

## Summary of Changes

- Extracted DNS integration helper functions from `packages/hostingde-api/test/dns-integration.test.ts` into `packages/hostingde-api/test/utils/dns-integration-helpers.ts`.
- Moved zone lifecycle and retry utilities into the new helper module, including:
  - temporary zone create/delete lifecycle (`withTemporaryZone`)
  - `zoneUpdate` retry handling (`zoneUpdateWithRetry`)
  - polling helper for record IDs (`waitForRecordId`)
  - shared timing/error helpers (`sleep`, `formatApiErrors`)
- Updated `packages/hostingde-api/test/dns-integration.test.ts` to consume helpers from `test/utils`.
- Verified with:
  - `cd packages/hostingde-api && bun run typecheck`
  - `bun test packages/hostingde-api/test` (18 pass, 0 fail).
