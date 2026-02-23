---
# cherry-nsdi
title: Stabilize hostingde-api tests for escaped TEST1 token and async zone updates
status: completed
type: task
priority: normal
created_at: 2026-02-23T18:42:29Z
updated_at: 2026-02-23T18:42:35Z
---

Normalize HOSTING_DE_API_TOKEN_TEST1 handling for escaped dollars from .env and make zoneUpdate CRUD integration test robust against transient zone busy states.

## Summary of Changes

- Added test env normalization in `packages/hostingde-api/test/test-env.ts`:
  - Host config remains via `HOSTINGDE_API_DEMO_HOST` and `HOSTINGDE_API_HOST`.
  - Added robust `HOSTING_DE_API_TOKEN_TEST1` resolution that prefers raw `.env` file values and normalizes escaped dollars (`\$` -> `$`).
- Updated test files to consume `hostingDeTest1ApiToken` from `test-env.ts`:
  - `packages/hostingde-api/test/dns-readonly-smoke.test.ts`
  - `packages/hostingde-api/test/dns.test.ts`
  - `packages/hostingde-api/test/dns-integration.test.ts`
- Stabilized DNS CRUD integration behavior in `dns-integration.test.ts`:
  - Added retries for transient zone-busy API errors on `zoneUpdate`.
  - Added polling helper to resolve newly added TXT record ID when response is pending.
  - Added retry logic for `zoneDelete` cleanup to reduce flaky teardown failures.
- Verified end-to-end with `bun test packages/hostingde-api/test`: 18 pass, 0 fail.
