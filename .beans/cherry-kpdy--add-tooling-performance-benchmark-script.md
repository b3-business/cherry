---
# cherry-kpdy
title: Add tooling performance benchmark script
status: todo
type: task
created_at: 2026-02-23T20:19:27Z
updated_at: 2026-02-23T20:19:27Z
---

Track check/typecheck/test timings over time so tooling regressions are visible after dependency or config changes.

## Todo
- [ ] Add reproducible benchmark script (e.g. hyperfine or Bun-based runner)
- [ ] Measure key commands: format:check, check, typecheck, test
- [ ] Store baseline results in docs/tooling-benchmarks.md
- [ ] Add a simple process for re-running benchmarks after tooling upgrades
- [ ] Optionally add a CI/manual workflow to collect benchmark snapshots
