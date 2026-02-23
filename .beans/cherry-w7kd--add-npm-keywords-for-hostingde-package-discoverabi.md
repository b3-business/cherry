---
# cherry-w7kd
title: Add npm keywords for hostingde package discoverability
status: completed
type: task
priority: normal
created_at: 2026-02-23T18:15:52Z
updated_at: 2026-02-23T18:16:09Z
---

Add keywords/tags to packages/hostingde-api/package.json including hostingde and hosting.de so npm search finds the package with or without dot.

## Summary of Changes

- Updated packages/hostingde-api/package.json to add npm keywords for discoverability.
- Added explicit tags: hostingde and hosting.de (plus related API keywords).
- Verified package still typechecks with bun run --filter @b3-business/hosting.de typecheck.
