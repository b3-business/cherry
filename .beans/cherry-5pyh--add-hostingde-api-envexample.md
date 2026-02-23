---
# cherry-5pyh
title: Add hostingde-api .env.example
status: completed
type: task
priority: normal
created_at: 2026-02-23T18:00:39Z
updated_at: 2026-02-23T18:00:52Z
---

Create packages/hostingde-api/.env.example documenting required env vars for local scripts/tests, including demo test account variables.

## Summary of Changes

- Added packages/hostingde-api/.env.example.
- Included HOSTING_DE_API_TOKEN for normal scripts/tests.
- Included HOSTING_DE_API_TOKEN_LOW_RISK and HOSTING_DE_LOW_RISK_ZONE for optional low-risk CRUD tests.
- Added a note pointing to demo user signup at https://demo.hosting.de/signup/.
