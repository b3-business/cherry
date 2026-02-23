import { beforeEach, describe, expect, it, mock } from "bun:test";
import * as v from "valibot";
import {
  createCherryClient,
  HttpError,
  param,
  path,
  route,
  type Fetcher,
  type InferRouteInput,
  type InferRouteOutput,
} from "../src/index";

/**
 * Integration tests: Full CRUD workflow using the public API.
 * Tests import everything from src/index.ts to verify public exports.
 */
describe("Integration: CRUD workflow", () => {
  let mockFetcher: Fetcher;
  let fetchCalls: { url: string; init: RequestInit }[];

  const UserSchema = v.object({
    id: v.string(),
    name: v.string(),
    email: v.string(),
  });

  const getUser = route({
    method: "GET",
    path: path`/users/${param("id")}`,
    pathParams: v.object({ id: v.string() }),
    response: UserSchema,
  });

  const listUsers = route({
    method: "GET",
    path: path`/users`,
    queryParams: v.object({
      page: v.optional(v.number()),
      limit: v.optional(v.number()),
    }),
    response: v.array(UserSchema),
  });

  const createUser = route({
    method: "POST",
    path: path`/users`,
    bodyParams: v.object({
      name: v.string(),
      email: v.pipe(v.string(), v.email()),
    }),
    response: UserSchema,
  });

  const updateUser = route({
    method: "PUT",
    path: path`/users/${param("id")}`,
    pathParams: v.object({ id: v.string() }),
    bodyParams: v.object({
      name: v.optional(v.string()),
      email: v.optional(v.pipe(v.string(), v.email())),
    }),
    response: UserSchema,
  });

  const deleteUser = route({
    method: "DELETE",
    path: path`/users/${param("id")}`,
    pathParams: v.object({ id: v.string() }),
    response: v.object({ success: v.boolean() }),
  });

  beforeEach(() => {
    fetchCalls = [];
  });

  /**
   * Full CRUD cycle: create -> read -> update -> delete.
   */
  it("executes full CRUD workflow", async () => {
    const users = [{ id: "1", name: "John", email: "john@example.com" }];

    mockFetcher = mock(async (req) => {
      fetchCalls.push(req);
      const url = new URL(req.url);
      const method = req.init.method;

      if (method === "POST" && url.pathname === "/users") {
        const body = JSON.parse(req.init.body as string);
        const newUser = { id: "2", ...body };
        users.push(newUser);
        return new Response(JSON.stringify(newUser), { status: 201 });
      }

      if (method === "GET" && url.pathname === "/users") {
        return new Response(JSON.stringify(users), { status: 200 });
      }

      if (method === "GET" && url.pathname.startsWith("/users/")) {
        const id = url.pathname.split("/")[2];
        const user = users.find((u) => u.id === id);
        if (!user) return new Response("Not Found", { status: 404 });
        return new Response(JSON.stringify(user), { status: 200 });
      }

      if (method === "PUT" && url.pathname.startsWith("/users/")) {
        const id = url.pathname.split("/")[2];
        const body = JSON.parse(req.init.body as string);
        const userIndex = users.findIndex((u) => u.id === id);
        if (userIndex === -1) return new Response("Not Found", { status: 404 });
        users[userIndex] = { ...users[userIndex], ...body };
        return new Response(JSON.stringify(users[userIndex]), { status: 200 });
      }

      if (method === "DELETE" && url.pathname.startsWith("/users/")) {
        const id = url.pathname.split("/")[2];
        const userIndex = users.findIndex((u) => u.id === id);
        if (userIndex === -1) return new Response("Not Found", { status: 404 });
        users.splice(userIndex, 1);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }

      return new Response("Not Found", { status: 404 });
    });

    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: mockFetcher,
    });

    const createResult = await client.call(createUser, {
      name: "Jane",
      email: "jane@example.com",
    });
    expect(createResult.isOk()).toBe(true);
    if (createResult.isOk()) {
      expect(createResult.value.name).toBe("Jane");
      expect(createResult.value.id).toBe("2");
    }

    const listResult = await client.call(listUsers, {});
    expect(listResult.isOk()).toBe(true);
    if (listResult.isOk()) {
      expect(listResult.value).toHaveLength(2);
    }

    const getResult = await client.call(getUser, { id: "2" });
    expect(getResult.isOk()).toBe(true);
    if (getResult.isOk()) {
      expect(getResult.value.name).toBe("Jane");
    }

    const updateResult = await client.call(updateUser, {
      id: "2",
      name: "Jane Doe",
    });
    expect(updateResult.isOk()).toBe(true);
    if (updateResult.isOk()) {
      expect(updateResult.value.name).toBe("Jane Doe");
    }

    const deleteResult = await client.call(deleteUser, { id: "2" });
    expect(deleteResult.isOk()).toBe(true);
    if (deleteResult.isOk()) {
      expect(deleteResult.value.success).toBe(true);
    }

    const finalList = await client.call(listUsers, {});
    expect(finalList.isOk()).toBe(true);
    if (finalList.isOk()) {
      expect(finalList.value).toHaveLength(1);
    }
  });
});

/**
 * Integration tests: neverthrow error handling patterns.
 * Demonstrates match, map, andThen, orElse usage.
 */
describe("Integration: neverthrow patterns", () => {
  const getUser = route({
    method: "GET",
    path: path`/users/${param("id")}`,
    pathParams: v.object({ id: v.string() }),
    response: v.object({ id: v.string(), name: v.string() }),
  });

  /**
   * match(): Handle success and error cases explicitly.
   */
  it("uses match for branching", async () => {
    const mockFetcher: Fetcher = async () =>
      new Response(JSON.stringify({ id: "1", name: "John" }), { status: 200 });

    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: mockFetcher,
    });

    const result = await client.call(getUser, { id: "1" });

    const output = result.match(
      (user) => `Found: ${user.name}`,
      (error) => `Error: ${error.message}`,
    );

    expect(output).toBe("Found: John");
  });

  /**
   * map(): Transform successful values.
   */
  it("uses map for transformations", async () => {
    const mockFetcher: Fetcher = async () =>
      new Response(JSON.stringify({ id: "1", name: "John" }), { status: 200 });

    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: mockFetcher,
    });

    const result = await client
      .call(getUser, { id: "1" })
      .map((user) => ({ ...user, fetched: true }));

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.fetched).toBe(true);
    }
  });

  /**
   * match(): Handle 404 with fallback value.
   */
  it("uses match for fallback on 404", async () => {
    const mockFetcher: Fetcher = async () => new Response("Not Found", { status: 404 });

    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: mockFetcher,
    });

    const result = await client.call(getUser, { id: "999" });

    const user = result.match(
      (user) => user,
      (error) => {
        if (error instanceof HttpError && error.status === 404) {
          return { id: "0", name: "Guest" };
        }
        throw error;
      },
    );

    expect(user.id).toBe("0");
    expect(user.name).toBe("Guest");
  });

  /**
   * andThen(): Chain dependent requests.
   */
  it("uses andThen for chaining requests", async () => {
    const getUserPosts = route({
      method: "GET",
      path: path`/users/${param("userId")}/posts`,
      pathParams: v.object({ userId: v.string() }),
      response: v.array(v.object({ id: v.string(), title: v.string() })),
    });

    const mockFetcher: Fetcher = async (req) => {
      const url = new URL(req.url);
      if (url.pathname === "/users/1") {
        return new Response(JSON.stringify({ id: "1", name: "John" }), {
          status: 200,
        });
      }
      if (url.pathname === "/users/1/posts") {
        return new Response(JSON.stringify([{ id: "p1", title: "Hello" }]), {
          status: 200,
        });
      }
      return new Response("Not Found", { status: 404 });
    };

    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: mockFetcher,
    });

    const result = await client
      .call(getUser, { id: "1" })
      .andThen((user) =>
        client.call(getUserPosts, { userId: user.id }).map((posts) => ({ user, posts })),
      );

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.user.name).toBe("John");
      expect(result.value.posts).toHaveLength(1);
      expect(result.value.posts[0].title).toBe("Hello");
    }
  });
});

/**
 * Integration tests: Named route methods via routes config.
 */
describe("Integration: Named route methods", () => {
  it("exposes typed methods from routes config", async () => {
    const getUser = route({
      method: "GET",
      path: path`/users/${param("id")}`,
      pathParams: v.object({ id: v.string() }),
      response: v.object({ id: v.string(), name: v.string() }),
    });

    const mockFetcher: Fetcher = async () =>
      new Response(JSON.stringify({ id: "1", name: "John" }), { status: 200 });

    const client = createCherryClient({
      baseUrl: "https://api.example.com",
      fetcher: mockFetcher,
      routes: {
        users: { get: getUser },
      },
    });

    const result = await client.users.get({ id: "1" });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.name).toBe("John");
    }
  });
});

/**
 * Integration tests: Type inference verification.
 * Ensures InferRouteInput and InferRouteOutput work correctly.
 */
describe("Integration: Type inference", () => {
  it("correctly infers input and output types", () => {
    const complexRoute = route({
      method: "POST",
      path: path`/resources/${param("resourceId")}`,
      pathParams: v.object({ resourceId: v.string() }),
      queryParams: v.object({ include: v.optional(v.array(v.string())) }),
      bodyParams: v.object({ data: v.string(), count: v.number() }),
      response: v.object({
        id: v.string(),
        data: v.string(),
        count: v.number(),
        createdAt: v.string(),
      }),
    });

    type Input = InferRouteInput<typeof complexRoute>;
    type Output = InferRouteOutput<typeof complexRoute>;

    const validInput: Input = {
      resourceId: "123",
      include: ["meta"],
      data: "test",
      count: 42,
    };

    const validOutput: Output = {
      id: "456",
      data: "test",
      count: 42,
      createdAt: "2024-01-01",
    };

    expect(validInput.resourceId).toBe("123");
    expect(validOutput.id).toBe("456");
  });
});

/**
 * Integration tests: All exports available from index.
 */
describe("Integration: Public exports", () => {
  it("exports all required symbols", async () => {
    const exports = await import("../src/index");

    expect(exports.createCherryClient).toBeDefined();
    expect(exports.serializeQueryParams).toBeDefined();
    expect(exports.route).toBeDefined();
    expect(exports.path).toBeDefined();
    expect(exports.param).toBeDefined();
    expect(exports.optional).toBeDefined();
    expect(exports.CherryError).toBeDefined();
    expect(exports.HttpError).toBeDefined();
    expect(exports.ValidationError).toBeDefined();
    expect(exports.NetworkError).toBeDefined();
    expect(exports.SerializationError).toBeDefined();
    expect(exports.UnknownCherryError).toBeDefined();
    expect(exports.isCherryError).toBeDefined();
    expect(exports.cherryErr).toBeDefined();
  });
});
