---
# cherry-9pac
title: Simplify TEST1 token loading in hostingde-api tests
status: completed
type: task
priority: normal
created_at: 2026-02-23T18:45:41Z
updated_at: 2026-02-23T18:47:12Z
---

Now that HOSTING_DE_API_TOKEN_TEST1 is stored without escaped dollars, simplify test token loading by removing .env file parsing and using direct environment variable access.

## Summary of Changes

- Simplified token loading in `packages/hostingde-api/test/utils/test-env.ts` by removing the previous escaped-dollar normalization logic.
- Kept token resolution straightforward while preserving `$` characters reliably:
  - Prefer raw `.env` file value for `HOSTING_DE_API_TOKEN_TEST1`
  - Fallback to `process.env.HOSTING_DE_API_TOKEN_TEST1`
- Left host configuration behavior unchanged (`HOSTINGDE_API_DEMO_HOST`, `HOSTINGDE_API_HOST`).
- Verified with:
  - `cd packages/hostingde-api && bun run typecheck`
  - `bun test packages/hostingde-api/test` (18 pass, 0 fail).
