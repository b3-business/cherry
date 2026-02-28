---
# cherry-n72v
title: Switch root script runner to npm-run-all2
status: completed
type: task
priority: normal
created_at: 2026-02-23T20:13:06Z
updated_at: 2026-02-23T20:13:48Z
---

Migrate root script orchestrator dependency from npm-run-all to npm-run-all2 and verify script behavior remains unchanged.

## Todo
- [x] Replace npm-run-all dependency with npm-run-all2 in root package
- [x] Install deps/update lockfile
- [x] Run representative script(s) that use run-s
- [x] Summarize migration and compatibility

## Summary of Changes
- Replaced root devDependency npm-run-all with npm-run-all2 in package.json.
- Kept existing scripts unchanged (`run-s` binary name is compatible), including test:examples.
- Updated bun.lock via bun install.
- Validated script compatibility by running:
  - bun run test:examples (uses run-s) ✅
  - bun run check ✅
