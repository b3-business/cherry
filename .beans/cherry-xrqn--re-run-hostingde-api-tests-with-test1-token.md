---
# cherry-xrqn
title: Re-run hostingde-api tests with TEST1 token
status: completed
type: task
priority: normal
created_at: 2026-02-23T18:28:46Z
updated_at: 2026-02-23T18:29:35Z
---

Run packages/hostingde-api test suite again now that HOSTING_DE_API_TOKEN_TEST1 is available and report pass/fail status.

## Summary of Changes

- Re-ran `bun test packages/hostingde-api/test` after switching tests to `HOSTING_DE_API_TOKEN_TEST1`.
- Result: tests executed (not skipped), but all live API calls failed with authentication errors.
- Confirmed via direct API checks against both endpoints:
  - `https://secure.hosting.de/api/dns/v1/json/zonesFind`
  - `https://demo.hosting.de/api/dns/v1/json/zonesFind`
  both returned: `The API-Key is invalid or could not be found.`
- This indicates the provided TEST1 token is currently invalid/not active for both secure and demo API backends.
