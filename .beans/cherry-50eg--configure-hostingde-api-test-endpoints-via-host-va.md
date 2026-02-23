---
# cherry-50eg
title: Configure hostingde-api test endpoints via HOST vars
status: completed
type: task
priority: normal
created_at: 2026-02-23T18:32:03Z
updated_at: 2026-02-23T18:34:41Z
---

Make hostingde-api tests use configurable API hosts via HOSTINGDE_API_DEMO_HOST and HOSTINGDE_API_HOST. Derive demo API base from demo portal base URL (https://demo.hosting.de/) and use demo host for TEST1-based tests.

## Summary of Changes

- Added `packages/hostingde-api/test/test-env.ts` to centralize test host resolution.
- Implemented configurable host env vars:
  - `HOSTINGDE_API_DEMO_HOST`
  - `HOSTINGDE_API_HOST`
- Demo host default is derived from `https://demo.hosting.de/` and resolves to `demo.hosting.de`.
- Updated live test files to use demo API base URL derived from host env config:
  - `packages/hostingde-api/test/dns-readonly-smoke.test.ts`
  - `packages/hostingde-api/test/dns.test.ts` (integration case)
  - `packages/hostingde-api/test/dns-integration.test.ts`
- Updated `packages/hostingde-api/.env.example` with new host env vars and defaults.
- Updated `packages/hostingde-api/README.md` testing docs to describe host env config.
- Verified typecheck: `cd packages/hostingde-api && bun run typecheck`.
- Test run still fails with API auth error (`The API-Key is invalid or could not be found.`), now against the configured demo endpoint.
