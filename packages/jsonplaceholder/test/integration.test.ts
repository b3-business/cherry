import { describe, it, expect } from "bun:test";
import { jsonPlaceholder } from "../src/client";
import { posts } from "../src/routes";

describe("JSONPlaceholder Post Roundtrip", () => {
  it("creates, retrieves, updates, and deletes a post", async () => {
    const createResult = await jsonPlaceholder.posts.create({
      userId: 1,
      title: "Test Post from Cherry",
      body: "This post was created using the cherry API client.",
    });

    expect(createResult.isOk()).toBe(true);
    if (!createResult.isOk()) return;

    const created = createResult.value;
    expect(created.id).toBeDefined();
    expect(created.title).toBe("Test Post from Cherry");
    expect(created.userId).toBe(1);

    const getResult = await jsonPlaceholder.posts.get({ id: 1 });
    expect(getResult.isOk()).toBe(true);
    if (!getResult.isOk()) return;

    const fetched = getResult.value;
    expect(fetched.id).toBe(1);
    expect(fetched.userId).toBeDefined();

    const patchResult = await jsonPlaceholder.posts.patch({
      id: 1,
      title: "Updated Title",
    });
    expect(patchResult.isOk()).toBe(true);
    if (!patchResult.isOk()) return;

    expect(patchResult.value.title).toBe("Updated Title");

    const deleteResult = await jsonPlaceholder.posts.delete({ id: 1 });
    expect(deleteResult.isOk()).toBe(true);
  });

  it("lists all posts", async () => {
    const result = await jsonPlaceholder.posts.list();
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.length).toBeGreaterThan(0);
    expect(result.value[0].id).toBeDefined();
    expect(result.value[0].title).toBeDefined();
  });

  it("gets comments for a post", async () => {
    const result = await jsonPlaceholder.posts.getComments({ id: 1 });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.length).toBeGreaterThan(0);
    expect(result.value[0].postId).toBe(1);
    expect(result.value[0].email).toBeDefined();
  });
});

describe("JSONPlaceholder User Routes", () => {
  it("lists all users", async () => {
    const result = await jsonPlaceholder.users.list();
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.length).toBe(10);
    expect(result.value[0].name).toBeDefined();
    expect(result.value[0].email).toBeDefined();
  });

  it("gets a user by id", async () => {
    const result = await jsonPlaceholder.users.get({ id: 1 });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.id).toBe(1);
    expect(result.value.name).toBe("Leanne Graham");
    expect(result.value.address.city).toBe("Gwenborough");
  });

  it("gets posts by a user", async () => {
    const result = await jsonPlaceholder.users.getPosts({ id: 1 });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.length).toBeGreaterThan(0);
    result.value.forEach((post) => {
      expect(post.userId).toBe(1);
    });
  });
});

describe("Generic call() method", () => {
  it("works with route passed directly", async () => {
    const result = await jsonPlaceholder.call(posts.get, { id: 2 });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.id).toBe(2);
  });
});
