---
# cherry-k1gb
title: Move hostingde-api test helpers to test/utils
status: completed
type: task
priority: normal
created_at: 2026-02-23T18:42:58Z
updated_at: 2026-02-23T18:43:43Z
---

Move shared test helper modules under packages/hostingde-api/test/utils and update test imports accordingly.

## Summary of Changes

- Moved shared test helper file from packages/hostingde-api/test/test-env.ts to packages/hostingde-api/test/utils/test-env.ts.
- Updated imports in test files to use the new helper path:
  - packages/hostingde-api/test/dns-readonly-smoke.test.ts
  - packages/hostingde-api/test/dns.test.ts
  - packages/hostingde-api/test/dns-integration.test.ts
- Verified with: cd packages/hostingde-api && bun run typecheck.
