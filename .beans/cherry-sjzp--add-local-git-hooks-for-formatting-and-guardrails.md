---
# cherry-sjzp
title: Add local git hooks for formatting and guardrails
status: todo
type: task
created_at: 2026-02-23T20:19:22Z
updated_at: 2026-02-23T20:19:22Z
---

Enforce fast quality checks before push/commit to keep the branch green and reduce CI churn.

## Todo
- [ ] Choose lightweight hook tooling (e.g. simple-git-hooks or lefthook)
- [ ] Add pre-commit hook for format on staged files or format:check
- [ ] Add pre-push hook for bun run check + bun run typecheck (or fast subset)
- [ ] Ensure hooks are documented and easy to bypass for emergencies
- [ ] Validate developer ergonomics and runtime impact
