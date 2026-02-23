---
# cherry-wf0q
title: Switch hostingde-api tests to HOSTING_DE_API_TOKEN_TEST1 and self-contained zones
status: completed
type: task
priority: normal
created_at: 2026-02-23T18:21:09Z
updated_at: 2026-02-23T18:24:46Z
---

Update all tests in packages/hostingde-api/test to use HOSTING_DE_API_TOKEN_TEST1. Remove dependency on preconfigured zone env vars by making each test discover/create the data it needs so tests are self-contained.

## Summary of Changes

- Updated all live tests in `packages/hostingde-api/test/` to use `HOSTING_DE_API_TOKEN_TEST1`.
- Reworked `packages/hostingde-api/test/dns-integration.test.ts` so each test creates and cleans up its own temporary DNS zone (self-contained; no zone env var required).
- Updated `packages/hostingde-api/test/dns-readonly-smoke.test.ts` to use `HOSTING_DE_API_TOKEN_TEST1`.
- Updated `packages/hostingde-api/test/dns.test.ts` integration case to use `HOSTING_DE_API_TOKEN_TEST1`.
- Updated `packages/hostingde-api/.env.example` and `packages/hostingde-api/README.md` to document the TEST1 token and self-contained zone strategy.
- Verified with `bun test packages/hostingde-api/test` and `cd packages/hostingde-api && bun run typecheck`.
