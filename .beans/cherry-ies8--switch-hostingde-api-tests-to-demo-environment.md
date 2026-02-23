---
# cherry-ies8
title: Switch hostingde-api tests to demo environment
status: completed
type: task
priority: normal
created_at: 2026-02-23T18:02:13Z
updated_at: 2026-02-23T18:04:07Z
---

Update hostingde-api test configuration/docs so integration and CRUD tests use demo account variables by default, while real account token is only used for optional smoke tests.

## Summary of Changes

- Updated packages/hostingde-api/test/dns-integration.test.ts to run integration + CRUD tests against demo environment variables (HOSTING_DE_API_TOKEN_DEMO, HOSTING_DE_DEMO_ZONE) with backward-compatible fallbacks to the previous low-risk variable names.
- Updated packages/hostingde-api/test/dns.test.ts integration case to use demo token variables instead of the real-account token variable.
- Kept packages/hostingde-api/test/dns-readonly-smoke.test.ts on HOSTING_DE_API_TOKEN (real account), matching the policy that only smoke tests may use real credentials.
- Updated packages/hostingde-api/README.md testing section to document the new demo-first testing policy.
- Updated packages/hostingde-api/.env.example with explicit demo test variables and real-smoke-only token guidance.
- Verified with bun test v1.3.9 (cf6cdbbb) (targeted files) and @b3-business/hosting.de typecheck: Exited with code 0.
