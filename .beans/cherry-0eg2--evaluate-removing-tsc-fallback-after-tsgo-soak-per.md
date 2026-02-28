---
# cherry-0eg2
title: Evaluate removing tsc fallback after tsgo soak period
status: todo
type: task
created_at: 2026-02-23T20:19:32Z
updated_at: 2026-02-23T20:19:32Z
---

After a stabilization period, evaluate whether the repo can simplify scripts by removing tsc fallback commands and relying on tsgo only.

## Todo
- [ ] Define soak period and compatibility checklist (CI, editor, release flow)
- [ ] Track any tsgo-only edge cases across packages
- [ ] Decide keep/remove policy for typecheck:tsc scripts
- [ ] If safe, remove fallback scripts and redundant TypeScript wiring
- [ ] Update docs to reflect final policy
