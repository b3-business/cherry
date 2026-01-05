import { describe, it, expect } from "bun:test";
import { expectTypeOf } from "expect-type";
import * as v from "valibot";
import { route } from "../src/route";
import { path, param } from "../src/path";
import type { InferRouteInput, InferRouteOutput } from "../src/types";

/**
 * route(): Creates validated route definitions.
 * - Validates HTTP method is one of GET/POST/PUT/PATCH/DELETE
 * - Validates path params match schema keys (bidirectional)
 * - Returns typed CherryRoute for use with client.call()
 */
describe("route()", () => {
  /**
   * Valid route with all param types: path, query, body, response.
   * This is the most complete route definition pattern.
   */
  it("creates valid route with all param types", () => {
    const r = route({
      method: "POST",
      path: path`/users/${param("id")}`,
      pathParams: v.object({ id: v.string() }),
      queryParams: v.object({ include: v.optional(v.boolean()) }),
      bodyParams: v.object({ name: v.string() }),
      response: v.object({ id: v.string(), name: v.string() }),
    });

    expect(r.method).toBe("POST");
    expect(r.path.template).toBe("/users/:id");
    expect(r.pathParams).toBeDefined();
    expect(r.queryParams).toBeDefined();
    expect(r.bodyParams).toBeDefined();
    expect(r.response).toBeDefined();
  });

  /**
   * Route with only path params: Common for GET/DELETE endpoints.
   * Example: GET /users/:id
   */
  it("creates valid route with path params only", () => {
    const r = route({
      method: "GET",
      path: path`/users/${param("id")}`,
      pathParams: v.object({ id: v.string() }),
      response: v.object({ id: v.string() }),
    });

    expect(r.method).toBe("GET");
    expect(r.pathParams).toBeDefined();
    expect(r.queryParams).toBeUndefined();
    expect(r.bodyParams).toBeUndefined();
  });

  /**
   * Route with only query params: Common for list/search endpoints.
   * Example: GET /users?page=1&limit=10
   */
  it("creates valid route with query params only", () => {
    const r = route({
      method: "GET",
      path: path`/users`,
      queryParams: v.object({ page: v.optional(v.number()) }),
      response: v.array(v.object({ id: v.string() })),
    });

    expect(r.queryParams).toBeDefined();
    expect(r.pathParams).toBeUndefined();
  });

  /**
   * Route with only body params: Common for POST to collection endpoints.
   * Example: POST /users with JSON body
   */
  it("creates valid route with body params only", () => {
    const r = route({
      method: "POST",
      path: path`/users`,
      bodyParams: v.object({ name: v.string(), email: v.string() }),
      response: v.object({ id: v.string() }),
    });

    expect(r.bodyParams).toBeDefined();
    expect(r.pathParams).toBeUndefined();
  });

  /**
   * Route with no params: Health check, static endpoints.
   * Example: GET /health
   */
  it("creates valid route with no params", () => {
    const r = route({
      method: "GET",
      path: path`/health`,
      response: v.object({ status: v.string() }),
    });

    expect(r.pathParams).toBeUndefined();
    expect(r.queryParams).toBeUndefined();
    expect(r.bodyParams).toBeUndefined();
  });

  /**
   * Optional description field for documentation/introspection.
   */
  it("accepts optional description", () => {
    const r = route({
      method: "GET",
      path: path`/users`,
      response: v.object({ id: v.string() }),
      description: "List all users",
    });

    expect(r.description).toBe("List all users");
  });

  /**
   * QueryParamOptions for array serialization control.
   */
  it("accepts queryParamOptions", () => {
    const r = route({
      method: "GET",
      path: path`/search`,
      queryParams: v.object({ tags: v.array(v.string()) }),
      response: v.array(v.object({ id: v.string() })),
      queryParamOptions: { arrayFormat: "comma" },
    });

    expect(r.queryParamOptions?.arrayFormat).toBe("comma");
  });
});

/**
 * HTTP method validation: route() validates method at runtime.
 * Invalid methods throw ValiError from Valibot.
 */
describe("route() HTTP method validation", () => {
  it("accepts GET", () => {
    expect(() =>
      route({
        method: "GET",
        path: path`/test`,
        response: v.object({}),
      }),
    ).not.toThrow();
  });

  it("accepts POST", () => {
    expect(() =>
      route({
        method: "POST",
        path: path`/test`,
        response: v.object({}),
      }),
    ).not.toThrow();
  });

  it("accepts PUT", () => {
    expect(() =>
      route({
        method: "PUT",
        path: path`/test`,
        response: v.object({}),
      }),
    ).not.toThrow();
  });

  it("accepts PATCH", () => {
    expect(() =>
      route({
        method: "PATCH",
        path: path`/test`,
        response: v.object({}),
      }),
    ).not.toThrow();
  });

  it("accepts DELETE", () => {
    expect(() =>
      route({
        method: "DELETE",
        path: path`/test`,
        response: v.object({}),
      }),
    ).not.toThrow();
  });

  it("throws on invalid method", () => {
    expect(() =>
      route({
        method: "INVALID" as any,
        path: path`/test`,
        response: v.object({}),
      }),
    ).toThrow();
  });
});

/**
 * Path param validation: Ensures path template params match schema keys.
 * Catches config errors at route definition time (fail fast).
 */
describe("route() path param validation", () => {
  /**
   * Path has params but no pathParams schema provided.
   * Error: Developer forgot to define the schema.
   */
  it("throws when path has params but no pathParams schema", () => {
    expect(() =>
      route({
        method: "GET",
        path: path`/users/${param("id")}`,
        response: v.object({}),
      }),
    ).toThrow("Route has path params [id] but no pathParams schema");
  });

  /**
   * Path param not in schema: Template uses :id but schema has different key.
   * Error: Typo or mismatch between template and schema.
   */
  it("throws when path param not in schema", () => {
    expect(() =>
      route({
        method: "GET",
        path: path`/users/${param("id")}`,
        pathParams: v.object({ userId: v.string() }),
        response: v.object({}),
      }),
    ).toThrow('Path param ":id" not found in pathParams schema. Available: [userId]');
  });

  /**
   * Schema key not in template: Schema defines key not used in path.
   * Error: Unused schema key suggests config mistake.
   */
  it("throws when schema key not in path template", () => {
    expect(() =>
      route({
        method: "GET",
        path: path`/users/${param("id")}`,
        pathParams: v.object({ id: v.string(), extra: v.string() }),
        response: v.object({}),
      }),
    ).toThrow('pathParams schema key "extra" not present in path template. Template params: [id]');
  });

  /**
   * Multiple params must all match: All template params need schema entries.
   */
  it("validates multiple path params", () => {
    expect(() =>
      route({
        method: "GET",
        path: path`/users/${param("userId")}/posts/${param("postId")}`,
        pathParams: v.object({ userId: v.string(), postId: v.string() }),
        response: v.object({}),
      }),
    ).not.toThrow();
  });

  /**
   * Missing one of multiple params triggers error.
   */
  it("throws when one of multiple params missing from schema", () => {
    expect(() =>
      route({
        method: "GET",
        path: path`/users/${param("userId")}/posts/${param("postId")}`,
        pathParams: v.object({ userId: v.string() }),
        response: v.object({}),
      }),
    ).toThrow('Path param ":postId" not found in pathParams schema');
  });
});

/**
 * Type inference tests: Verify CherryRoute generic params flow correctly.
 * InferRouteInput combines path + query + body schemas.
 * InferRouteOutput extracts response schema type.
 */
describe("route() type inference", () => {
  const PathSchema = v.object({ id: v.string() });
  const QuerySchema = v.object({ include: v.optional(v.boolean()) });
  const BodySchema = v.object({ name: v.string() });
  const ResponseSchema = v.object({ id: v.string(), name: v.string() });

  it("infers correct input type from all params", () => {
    const r = route({
      method: "POST",
      path: path`/users/${param("id")}`,
      pathParams: PathSchema,
      queryParams: QuerySchema,
      bodyParams: BodySchema,
      response: ResponseSchema,
    });

    type Input = InferRouteInput<typeof r>;
    expectTypeOf<Input>().toEqualTypeOf<{
      id: string;
      include?: boolean;
      name: string;
    }>();
  });

  it("infers correct input type from path params only", () => {
    const r = route({
      method: "GET",
      path: path`/users/${param("id")}`,
      pathParams: PathSchema,
      response: ResponseSchema,
    });

    type Input = InferRouteInput<typeof r>;
    const testInput: Input = { id: "test" };
    expect(testInput.id).toBe("test");
  });

  it("infers empty object when no params", () => {
    const r = route({
      method: "GET",
      path: path`/health`,
      response: v.object({ status: v.string() }),
    });

    type Input = InferRouteInput<typeof r>;
    const testInput: Input = {};
    expect(Object.keys(testInput)).toHaveLength(0);
  });

  it("infers correct output type", () => {
    const r = route({
      method: "GET",
      path: path`/users/${param("id")}`,
      pathParams: PathSchema,
      response: ResponseSchema,
    });

    type Output = InferRouteOutput<typeof r>;
    const testOutput: Output = { id: "1", name: "test" };
    expect(testOutput.id).toBe("1");
    expect(testOutput.name).toBe("test");
  });

  it("returns CherryRoute type", () => {
    const r = route({
      method: "GET",
      path: path`/users/${param("id")}`,
      pathParams: PathSchema,
      response: ResponseSchema,
    });

    expect(r.method).toBe("GET");
    expect(r.path.template).toBe("/users/:id");
    expect(r.pathParams).toBeDefined();
    expect(r.response).toBeDefined();
  });
});
