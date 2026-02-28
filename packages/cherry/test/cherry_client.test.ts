import { describe, it, expect, mock, beforeEach } from "bun:test";
import * as v from "valibot";
import { serializeQueryParams, createCherryClient } from "../src/cherry_client";
import { route } from "../src/route";
import { path, param } from "../src/path";
import { HttpError, ValidationError, NetworkError, SerializationError } from "../src/errors";
import type { Fetcher } from "../src/types";

/**
 * serializeQueryParams(): Converts object to URL query string.
 * Input:  { page: 1, tags: ["a", "b"] }
 * Output: "page=1&tags=a&tags=b" (with arrayFormat: "repeat")
 *
 * Supports three array formats and custom serializers.
 */
describe("serializeQueryParams()", () => {
  /**
   * Simple key-value pairs become standard query params.
   * Input:  { page: 1, limit: 10 }
   * Output: "page=1&limit=10"
   */
  it("serializes simple key-value params", () => {
    const result = serializeQueryParams({ page: 1, limit: 10 });
    expect(result).toBe("page=1&limit=10");
  });

  /**
   * String values are passed through without modification.
   */
  it("serializes string values", () => {
    const result = serializeQueryParams({ name: "john", status: "active" });
    expect(result).toBe("name=john&status=active");
  });

  /**
   * Boolean values are stringified.
   * Input:  { active: true, deleted: false }
   * Output: "active=true&deleted=false"
   */
  it("serializes boolean values", () => {
    const result = serializeQueryParams({ active: true, deleted: false });
    expect(result).toBe("active=true&deleted=false");
  });

  /**
   * undefined/null values are omitted from output.
   * Prevents sending empty params to the server.
   */
  it("omits undefined values", () => {
    const result = serializeQueryParams({ page: 1, filter: undefined });
    expect(result).toBe("page=1");
  });

  it("omits null values", () => {
    const result = serializeQueryParams({ page: 1, filter: null });
    expect(result).toBe("page=1");
  });

  /**
   * Default array format: "repeat" - appends same key multiple times.
   * Input:  { tags: ["a", "b"] }
   * Output: "tags=a&tags=b"
   * Most common format for REST APIs.
   */
  it("serializes arrays with repeat format (default)", () => {
    const result = serializeQueryParams({ tags: ["a", "b", "c"] });
    expect(result).toBe("tags=a&tags=b&tags=c");
  });

  /**
   * Array format "comma": joins values with comma.
   * Input:  { tags: ["a", "b"] }
   * Output: "tags=a,b"
   * Common in some APIs like GitHub.
   */
  it("serializes arrays with comma format", () => {
    const result = serializeQueryParams({ tags: ["a", "b", "c"] }, { arrayFormat: "comma" });
    expect(result).toBe("tags=a%2Cb%2Cc");
  });

  /**
   * Array format "brackets": appends [] to key.
   * Input:  { tags: ["a", "b"] }
   * Output: "tags[]=a&tags[]=b"
   * Common in PHP/Rails backends.
   */
  it("serializes arrays with brackets format", () => {
    const result = serializeQueryParams({ tags: ["a", "b", "c"] }, { arrayFormat: "brackets" });
    expect(result).toBe("tags%5B%5D=a&tags%5B%5D=b&tags%5B%5D=c");
  });

  /**
   * Array format "json": JSON-encodes the array value.
   * Input:  { tags: ["a", "b"] }
   * Output: "tags=%5B%22a%22%2C%22b%22%5D" (URL-encoded JSON)
   * Useful for APIs that expect JSON arrays in query params.
   */
  it("serializes arrays with json format", () => {
    const result = serializeQueryParams({ tags: ["a", "b", "c"] }, { arrayFormat: "json" });
    expect(result).toBe("tags=%5B%22a%22%2C%22b%22%2C%22c%22%5D");
  });

  /**
   * JSON format throws SerializationError on circular references.
   * Circular structures cannot be serialized to JSON.
   */
  it("throws SerializationError on circular reference with json format", () => {
    const circular: any = { items: [] };
    circular.items.push(circular);

    expect(() => serializeQueryParams({ data: circular.items }, { arrayFormat: "json" })).toThrow(
      SerializationError,
    );
  });

  /**
   * Custom serializer takes full control of output.
   * Use for complex nested objects or non-standard formats.
   */
  it("uses custom serializer when provided", () => {
    const customSerializer = (params: Record<string, unknown>) =>
      Object.entries(params)
        .map(([k, v]) => `custom_${k}=${String(v)}`)
        .join("&");

    const result = serializeQueryParams({ page: 1 }, { customSerializer });
    expect(result).toBe("custom_page=1");
  });

  /**
   * Custom serializer overrides arrayFormat option.
   */
  it("custom serializer takes precedence over arrayFormat", () => {
    const customSerializer = () => "custom=output";
    const result = serializeQueryParams(
      { tags: ["a", "b"] },
      { arrayFormat: "comma", customSerializer },
    );
    expect(result).toBe("custom=output");
  });

  /**
   * Empty object produces empty string.
   */
  it("handles empty params object", () => {
    const result = serializeQueryParams({});
    expect(result).toBe("");
  });

  /**
   * Empty array produces no output for that key.
   */
  it("handles empty array", () => {
    const result = serializeQueryParams({ tags: [] });
    expect(result).toBe("");
  });
});

/**
 * createCherryClient(): Factory for type-safe API clients.
 * Returns client with call() method and optional named route methods.
 */
describe("createCherryClient()", () => {
  let mockFetcher: Fetcher;
  let fetchCalls: { url: string; init: RequestInit }[];

  beforeEach(() => {
    fetchCalls = [];
    mockFetcher = mock(async (req) => {
      fetchCalls.push(req);
      return new Response(JSON.stringify({ id: "1", name: "Test" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });
  });

  const testRoute = route({
    method: "GET",
    path: path`/users/${param("id")}`,
    pathParams: v.object({ id: v.string() }),
    queryParams: v.object({ include: v.optional(v.boolean()) }),
    response: v.object({ id: v.string(), name: v.string() }),
  });

  /**
   * Basic client creation with baseUrl only.
   */
  it("creates client with baseUrl", () => {
    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: mockFetcher,
    });
    expect(client.call).toBeDefined();
  });

  /**
   * call() substitutes path params in URL.
   * Input:  route with /users/:id, params { id: "123" }
   * Output: Request to /users/123
   */
  it("substitutes path params in URL", async () => {
    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: mockFetcher,
    });

    await client.call(testRoute, { id: "123" });

    expect(fetchCalls[0].url).toBe("https://api.example.com/users/123");
  });

  /**
   * call() appends query params to URL.
   */
  it("appends query params to URL", async () => {
    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: mockFetcher,
    });

    await client.call(testRoute, { id: "123", include: true });

    expect(fetchCalls[0].url).toBe("https://api.example.com/users/123?include=true");
  });

  /**
   * call() sends body as JSON for POST/PUT/PATCH.
   */
  it("sends body params as JSON", async () => {
    const postRoute = route({
      method: "POST",
      path: path`/users`,
      bodyParams: v.object({ name: v.string(), email: v.string() }),
      response: v.object({ id: v.string(), name: v.string() }),
    });

    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: mockFetcher,
    });

    await client.call(postRoute, { name: "John", email: "john@example.com" });

    expect(fetchCalls[0].init.method).toBe("POST");
    expect(fetchCalls[0].init.body).toBe('{"name":"John","email":"john@example.com"}');
  });

  /**
   * call() merges custom headers from config.
   */
  it("merges headers from config", async () => {
    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      headers: () => ({ Authorization: "Bearer token123" }),
      fetcher: mockFetcher,
    });

    await client.call(testRoute, { id: "123" });

    const headers = fetchCalls[0].init.headers as Record<string, string>;
    expect(headers["Authorization"]).toBe("Bearer token123");
    expect(headers["Content-Type"]).toBe("application/json");
  });

  /**
   * call() supports async headers function.
   */
  it("supports async headers function", async () => {
    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      headers: async () => ({ Authorization: "Bearer async-token" }),
      fetcher: mockFetcher,
    });

    await client.call(testRoute, { id: "123" });

    const headers = fetchCalls[0].init.headers as Record<string, string>;
    expect(headers["Authorization"]).toBe("Bearer async-token");
  });

  /**
   * call() returns Ok result on successful response.
   */
  it("returns Ok result on success", async () => {
    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: mockFetcher,
    });

    const result = await client.call(testRoute, { id: "123" });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value).toEqual({ id: "1", name: "Test" });
    }
  });

  /**
   * call() returns Err with HttpError on 4xx/5xx responses.
   */
  it("returns HttpError on 4xx response", async () => {
    const errorFetcher: Fetcher = async () =>
      new Response("Not Found", { status: 404, statusText: "Not Found" });

    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: errorFetcher,
    });

    const result = await client.call(testRoute, { id: "123" });

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error).toBeInstanceOf(HttpError);
      expect((result.error as HttpError).status).toBe(404);
    }
  });

  it("returns HttpError on 5xx response", async () => {
    const errorFetcher: Fetcher = async () =>
      new Response("Internal Error", { status: 500, statusText: "Internal Server Error" });

    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: errorFetcher,
    });

    const result = await client.call(testRoute, { id: "123" });

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error).toBeInstanceOf(HttpError);
      expect((result.error as HttpError).status).toBe(500);
      expect((result.error as HttpError).retryable).toBe(true);
    }
  });

  /**
   * call() returns ValidationError when request params fail validation.
   */
  it("returns ValidationError on invalid request params", async () => {
    const strictRoute = route({
      method: "GET",
      path: path`/users/${param("id")}`,
      pathParams: v.object({ id: v.pipe(v.string(), v.uuid()) }),
      response: v.object({ id: v.string() }),
    });

    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: mockFetcher,
    });

    const result = await client.call(strictRoute, { id: "not-a-uuid" });

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error).toBeInstanceOf(ValidationError);
      expect((result.error as ValidationError).target).toBe("request");
    }
  });

  /**
   * call() returns ValidationError when response fails validation.
   */
  it("returns ValidationError on invalid response", async () => {
    const badResponseFetcher: Fetcher = async () =>
      new Response(JSON.stringify({ wrong: "shape" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });

    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: badResponseFetcher,
    });

    const result = await client.call(testRoute, { id: "123" });

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error).toBeInstanceOf(ValidationError);
      expect((result.error as ValidationError).target).toBe("response");
    }
  });

  /**
   * call() returns NetworkError when fetch throws.
   */
  it("returns NetworkError on fetch failure", async () => {
    const failingFetcher: Fetcher = async () => {
      throw new Error("Network unreachable");
    };

    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: failingFetcher,
    });

    const result = await client.call(testRoute, { id: "123" });

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error).toBeInstanceOf(NetworkError);
    }
  });

  /**
   * Client with routes config exposes named methods.
   */
  it("exposes named route methods when routes provided", async () => {
    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: mockFetcher,
      routes: { getUser: testRoute },
    });

    expect(client.getUser).toBeDefined();
    const result = await client.getUser({ id: "123" });
    expect(result.isOk()).toBe(true);
  });

  /**
   * Nested route tree creates nested client methods.
   */
  it("supports nested route trees", async () => {
    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: mockFetcher,
      routes: {
        users: { get: testRoute },
      },
    });

    expect(client.users).toBeDefined();
    expect(client.users.get).toBeDefined();
    const result = await client.users.get({ id: "123" });
    expect(result.isOk()).toBe(true);
  });

  /**
   * Path params are URL-encoded.
   */
  it("URL-encodes path params", async () => {
    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: mockFetcher,
    });

    await client.call(testRoute, { id: "hello world" });

    expect(fetchCalls[0].url).toBe("https://api.example.com/users/hello%20world");
  });
});
