---
# cherry-fksf
title: hosting.de API testing strategy
status: todo
type: task
created_at: 2026-01-26T15:53:31Z
updated_at: 2026-01-26T15:53:31Z
---

Figure out a realistic testing approach without mocking, while minimizing cost and data loss.

## Checklist
- [ ] Review docs for any dry-run/test mode flags or sandbox endpoints
- [ ] Check if any endpoints are read-only to build safe smoke tests
- [ ] Identify minimal-cost resources for a test account (or subaccount) and required cleanup
- [ ] Explore use of subaccounts to isolate test data
- [ ] Draft a cleanup plan to prevent lingering resources
- [ ] If no dry-run exists, outline a safe compromise (tagged resources + purge)