import { describe, it, expect } from "bun:test";
import { expectTypeOf } from "expect-type";
import { path, param, optional, type PathParam, type OptionalParam, type AnyPathParam } from "../src/path";
import type { PathTemplate } from "../src/types";

/**
 * param(): Creates required path parameter markers.
 * Input:  param("id")
 * Output: ":id" (branded string for type safety)
 * Used in: path`/users/${param("id")}` -> "/users/:id"
 */
describe("param()", () => {
  it("creates :name marker for given name", () => {
    const p = param("id");
    expect(String(p)).toBe(":id");
  });

  it("works with different param names", () => {
    expect(String(param("userId"))).toBe(":userId");
    expect(String(param("postId"))).toBe(":postId");
    expect(String(param("version"))).toBe(":version");
  });
});

/**
 * optional(): Creates optional path parameter markers.
 * Input:  optional("version")
 * Output: "(:version)" (parentheses indicate optional)
 * Used in: path`/api${optional("version")}/users` -> "/api(:version)/users"
 * Runtime: Client skips optional params when not provided.
 */
describe("optional()", () => {
  it("creates (:name) marker for given name", () => {
    const p = optional("version");
    expect(String(p)).toBe("(:version)");
  });

  it("works with different param names", () => {
    expect(String(optional("lang"))).toBe("(:lang)");
    expect(String(optional("format"))).toBe("(:format)");
  });
});

/**
 * path(): Tagged template function that builds PathTemplate objects.
 * Input:  path`/users/${param("id")}/posts/${param("postId")}`
 * Output: { template: "/users/:id/posts/:postId", paramNames: ["id", "postId"] }
 *
 * The template string is used for URL construction at runtime.
 * The paramNames array enables validation that all required params are provided.
 */
describe("path()", () => {
  /**
   * Static paths have no interpolated params.
   * Example: Health check endpoint that takes no arguments.
   */
  it("returns PathTemplate with correct template string for static path", () => {
    const result = path`/health`;
    expect(result.template).toBe("/health");
    expect(result.paramNames).toEqual([]);
  });

  /**
   * Single param: Most common case for resource endpoints.
   * Example: GET /users/:id to fetch a specific user.
   */
  it("handles single path param", () => {
    const result = path`/users/${param("id")}`;
    expect(result.template).toBe("/users/:id");
    expect(result.paramNames).toEqual(["id"]);
  });

  /**
   * Multiple params: Nested resources.
   * Example: GET /users/:userId/posts/:postId for a user's specific post.
   */
  it("handles multiple path params", () => {
    const result = path`/users/${param("userId")}/posts/${param("postId")}`;
    expect(result.template).toBe("/users/:userId/posts/:postId");
    expect(result.paramNames).toEqual(["userId", "postId"]);
  });

  /**
   * Param at start: Versioned APIs or tenant-prefixed routes.
   * Example: /:version/api/users for API versioning in path.
   */
  it("handles path param at the start", () => {
    const result = path`${param("version")}/api/users`;
    expect(result.template).toBe(":version/api/users");
    expect(result.paramNames).toEqual(["version"]);
  });

  /**
   * Adjacent params: Edge case where params have no separator.
   * Rarely used, but ensures template concatenation works correctly.
   */
  it("handles adjacent path params", () => {
    const result = path`/users/${param("userId")}${param("action")}`;
    expect(result.template).toBe("/users/:userId:action");
    expect(result.paramNames).toEqual(["userId", "action"]);
  });

  /**
   * Optional param: Version prefix that can be omitted.
   * Example: /api(:version)/users -> /api/users or /api/v2/users
   */
  it("handles optional param", () => {
    const result = path`/api${optional("version")}/users`;
    expect(result.template).toBe("/api(:version)/users");
    expect(result.paramNames).toEqual(["version"]);
  });

  /**
   * Mixed required + optional: Common for versioned resource endpoints.
   * Example: /api(:version)/users/:id where version is optional but id is required.
   */
  it("handles mix of required and optional params", () => {
    const result = path`/api${optional("version")}/users/${param("id")}`;
    expect(result.template).toBe("/api(:version)/users/:id");
    expect(result.paramNames).toEqual(["version", "id"]);
  });

  /**
   * Complex path: Stress test with multiple optional and required params.
   * Verifies param extraction order matches template order.
   */
  it("handles complex path with multiple optional and required params", () => {
    const result = path`${optional("prefix")}/api${optional("version")}/users/${param("userId")}/posts/${param("postId")}`;
    expect(result.template).toBe("(:prefix)/api(:version)/users/:userId/posts/:postId");
    expect(result.paramNames).toEqual(["prefix", "version", "userId", "postId"]);
  });

  /**
   * Empty template parts: All params, no static segments.
   * Edge case ensuring empty strings between params don't break concatenation.
   */
  it("handles empty string template parts", () => {
    const result = path`${param("a")}${param("b")}${param("c")}`;
    expect(result.template).toBe(":a:b:c");
    expect(result.paramNames).toEqual(["a", "b", "c"]);
  });
});

/**
 * Type inference tests: Verify compile-time types are correct.
 * Uses expect-type library for static type assertions.
 * These tests pass at compile time, not runtime.
 */
describe("path() type inference", () => {
  it("returns PathTemplate type", () => {
    const result = path`/users/${param("id")}`;
    expectTypeOf(result).toEqualTypeOf<PathTemplate>();
  });

  it("template property is string", () => {
    const result = path`/users/${param("id")}`;
    expectTypeOf(result.template).toBeString();
  });

  it("paramNames property is string array", () => {
    const result = path`/users/${param("id")}`;
    expectTypeOf(result.paramNames).toEqualTypeOf<string[]>();
  });
});

/**
 * param() type inference: Branded types prevent mixing param types.
 * PathParam<"id"> is distinct from PathParam<"userId"> at type level,
 * but both are strings at runtime for URL building.
 */
describe("param() type inference", () => {
  it("returns PathParam branded type", () => {
    const p = param("id");
    expectTypeOf(p).toMatchTypeOf<PathParam<"id">>();
  });

  it("is assignable to AnyPathParam", () => {
    const p = param("id");
    expectTypeOf(p).toMatchTypeOf<AnyPathParam>();
  });

  it("is assignable to string", () => {
    const p = param("id");
    expectTypeOf(p).toMatchTypeOf<string>();
  });
});

/**
 * optional() type inference: Same branding pattern as param().
 * OptionalParam<"version"> signals to the client that this param
 * can be omitted without causing a validation error.
 */
describe("optional() type inference", () => {
  it("returns OptionalParam branded type", () => {
    const p = optional("version");
    expectTypeOf(p).toMatchTypeOf<OptionalParam<"version">>();
  });

  it("is assignable to AnyPathParam", () => {
    const p = optional("version");
    expectTypeOf(p).toMatchTypeOf<AnyPathParam>();
  });

  it("is assignable to string", () => {
    const p = optional("version");
    expectTypeOf(p).toMatchTypeOf<string>();
  });
});
