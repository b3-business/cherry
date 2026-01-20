---
# cherry-9mmy
title: CherryRoute response schema with HTTP status code awareness
status: todo
type: feature
created_at: 2026-01-20T18:36:53Z
updated_at: 2026-01-20T18:36:53Z
---

Make the response schema in CherryRoute aware of HTTP response status codes.

## Requirements

1. **Plain schema (backward compatible)**: If a plain schema is given to `response`, assume this schema for status code 200
2. **Object with status codes**: If an object is given, interpret keys as status codes
3. **Status code key formats**:
   - Exact number: `200`, `404`, `500`
   - Number-as-string: `"200"`, `"404"`
   - Glob patterns: `"2*"`, `"2**"`, or `"2xx"` → matches all 200-299 status codes

## Example API

```typescript
// Simple (backward compatible) - assumes 200
const getUser = route({
  method: "GET",
  path: path`/users/${param("id")}`,
  response: UserSchema, // assumes status 200
});

// Status-code aware
const createUser = route({
  method: "POST",
  path: path`/users`,
  body: CreateUserSchema,
  response: {
    201: UserSchema,
    400: ValidationErrorSchema,
    409: ConflictErrorSchema,
  },
});

// With glob patterns
const fetchData = route({
  method: "GET",
  path: path`/data`,
  response: {
    "2xx": DataSchema,      // all 200-299
    "4xx": ClientErrorSchema, // all 400-499
    "5xx": ServerErrorSchema, // all 500-599
  },
});
```

## Checklist

- [ ] Design types for status-code-aware response schemas
- [ ] Implement status code pattern matching (exact, glob)
- [ ] Update `route()` to accept both plain schema and status-code object
- [ ] Update client to select correct schema based on response status
- [ ] Ensure backward compatibility with plain schema usage
- [ ] Add type inference for status-code-aware responses
- [ ] Add tests for all status code formats
- [ ] Update documentation