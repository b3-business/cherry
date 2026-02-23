---
# cherry-gyct
title: Diagnose escaped dollar in HOSTING_DE_API_TOKEN_TEST1
status: completed
type: task
priority: normal
created_at: 2026-02-23T18:36:45Z
updated_at: 2026-02-23T18:36:51Z
---

Verify whether escaping $ in HOSTING_DE_API_TOKEN_TEST1 causes auth failures, and validate by testing raw vs unescaped token against demo API and test suite.

## Summary of Changes

- Inspected runtime token value and confirmed it contained a literal backslash before the final dollar sign (`...QnM\$`).
- Verified that token with backslash fails auth (`The API-Key is invalid or could not be found.`).
- Verified that replacing `\$` with `$` makes API auth succeed against demo endpoint.
- Re-ran `bun test packages/hostingde-api/test` with an unescaped token override:
  - 17 tests passed
  - 1 test failed (`zoneUpdate` status assertion needs to accept/handle `error` in this environment).
- Conclusion: escaped dollars in `.env` were a root cause of invalid-key failures.
