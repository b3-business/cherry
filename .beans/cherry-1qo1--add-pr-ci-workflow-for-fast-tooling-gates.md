---
# cherry-1qo1
title: Add PR CI workflow for fast tooling gates
status: todo
type: task
created_at: 2026-02-23T20:19:13Z
updated_at: 2026-02-23T20:19:13Z
---

Set up a pull-request CI workflow that enforces formatting, linting, typechecking, and tests with caching and clear job boundaries.

## Todo
- [ ] Add GitHub Actions workflow triggered on pull_request
- [ ] Run bun install --frozen-lockfile with Bun cache enabled
- [ ] Run bun run format:check, bun run check, bun run typecheck, and bun run test
- [ ] Keep examples-prod/live API tests in a separate optional job or workflow
- [ ] Document CI expectations in README/CONTRIBUTING
