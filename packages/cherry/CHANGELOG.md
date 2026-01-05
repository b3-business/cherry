# Changelog

All notable changes to this project will be documented in this file.

## [0.3.1] - 2026-01-05

### Fixed

- Add `@types/bun` to monorepo root for editor TypeScript support

## [0.3.0] - 2026-01-05

### Fixed

- Simplify type inference for void params using the same technique as event-bus-core
- Allow omitting empty object for calls that don't require params (e.g., `client.listPosts()` instead of `client.listPosts({})`)
- Fix autocomplete for routes in IDE

### Changed

- Add comprehensive JSDoc comments to types.ts

## [0.2.7] - 2026-01-05

### Changed

- README: Reconcile documentation with actual API (`createCherryClient`, `route`, `path` tagged template)
- README: Remove unimplemented OpenAPI generator section
- Example: JSONPlaceholder now uses sub-namespaced routes (`posts.list`, `users.get`)

## [0.2.6] - 2026-01-05

### Fixed

- Fix npm/JSR badges to update on new versions (rollback HTML to markdown)
- GitHub badge shows repo name instead of stars

## [0.2.5] - 2026-01-05

### Changed

- README badges now open in new tab (reverted in 0.2.6)
- GitHub badge shows repo name instead of stars

## [0.2.4] - 2025-01-05

### Added

- LICENSE file for JSR publishing

## [0.2.3] - 2025-01-05

### Added

- JSR (jsr.io) publishing support

## [0.2.2] - 2025-01-05

### Fixed

- Add repository field to package.json for npm provenance verification

## [0.2.1] - 2025-01-05

### Fixed

- Use Node 24 for npm 11.5.1+ (required for trusted OIDC publishing)

## [0.2.0] - 2025-01-05

### Added

- GitHub Actions workflow for OIDC publishing to npm with provenance

## [0.1.0] - 2025-01-05

### Added

- Initial release
- `route()` builder with Valibot schema validation
- `path()`, `param()`, `optional()` tagged template literals for type-safe URL paths
- `createCherryClient()` factory with tree-shakeable route imports
- `CherryResult<T>` type using neverthrow for Railway-Oriented error handling
- Error hierarchy: `CherryError`, `HttpError`, `ValidationError`, `NetworkError`, `SerializationError`, `UnknownCherryError`
- Query parameter serialization with array support
