---
# cherry-dtzx
title: Split fast tests from live API integration tests
status: todo
type: task
created_at: 2026-02-23T20:19:18Z
updated_at: 2026-02-23T20:19:18Z
---

Improve local and CI feedback loops by separating deterministic fast tests from network-dependent roundtrip tests.

## Todo
- [ ] Add dedicated scripts for fast tests (core + package unit/type tests)
- [ ] Add dedicated scripts for live API integration tests (jsonplaceholder/pokeapi/examples-prod)
- [ ] Ensure default test script favors fast deterministic feedback
- [ ] Update docs with when to run each test lane
- [ ] Validate both lanes in local runs
