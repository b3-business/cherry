---
# cherry-2nx0
title: Consolidate hostingde DNS tests into one sequential roundtrip file
status: completed
type: task
priority: normal
created_at: 2026-02-23T18:50:33Z
updated_at: 2026-02-23T18:51:53Z
---

Simplify packages/hostingde-api/test DNS coverage to a single sequential full-roundtrip integration file. Remove separate smoke/read-only and mixed unit DNS files so only end-to-end DNS roundtrip tests remain.

## Summary of Changes

- Consolidated DNS API coverage to one sequential full-roundtrip test file: `packages/hostingde-api/test/dns-integration.test.ts`.
- Removed extra DNS test files:
  - `packages/hostingde-api/test/dns-readonly-smoke.test.ts`
  - `packages/hostingde-api/test/dns.test.ts`
- Kept DNS lifecycle assertions in one ordered flow (create zone -> query endpoints -> add/modify/delete record -> cleanup) to avoid dependency/concurrency issues.
- Updated `packages/hostingde-api/README.md` Testing section to document the single roundtrip-file strategy.
- Verified with:
  - `cd packages/hostingde-api && bun run typecheck`
  - `bun test packages/hostingde-api/test` (3 pass, 0 fail).
