# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2025-01-05

### Added

- Initial release
- `route()` builder with Valibot schema validation
- `path()`, `param()`, `optional()` tagged template literals for type-safe URL paths
- `createCherryClient()` factory with tree-shakeable route imports
- `CherryResult<T>` type using neverthrow for Railway-Oriented error handling
- Error hierarchy: `CherryError`, `HttpError`, `ValidationError`, `NetworkError`, `SerializationError`, `UnknownCherryError`
- Query parameter serialization with array support
