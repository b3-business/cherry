import { describe, it, expect } from "bun:test";
import { jsonPlaceholder } from "../src/client";
import { getPost } from "../src/routes";

describe("JSONPlaceholder Post Roundtrip", () => {
  it("creates, retrieves, updates, and deletes a post", async () => {
    const createResult = await jsonPlaceholder.createPost({
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

    const getResult = await jsonPlaceholder.getPost({ id: 1 });
    expect(getResult.isOk()).toBe(true);
    if (!getResult.isOk()) return;

    const fetched = getResult.value;
    expect(fetched.id).toBe(1);
    expect(fetched.userId).toBeDefined();

    const patchResult = await jsonPlaceholder.patchPost({
      id: 1,
      title: "Updated Title",
    });
    expect(patchResult.isOk()).toBe(true);
    if (!patchResult.isOk()) return;

    expect(patchResult.value.title).toBe("Updated Title");

    const deleteResult = await jsonPlaceholder.deletePost({ id: 1 });
    expect(deleteResult.isOk()).toBe(true);
  });

  it("lists all posts", async () => {
    const result = await jsonPlaceholder.listPosts({});
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.length).toBeGreaterThan(0);
    expect(result.value[0].id).toBeDefined();
    expect(result.value[0].title).toBeDefined();
  });

  it("gets comments for a post", async () => {
    const result = await jsonPlaceholder.getPostComments({ id: 1 });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.length).toBeGreaterThan(0);
    expect(result.value[0].postId).toBe(1);
    expect(result.value[0].email).toBeDefined();
  });
});

describe("JSONPlaceholder User Routes", () => {
  it("lists all users", async () => {
    const result = await jsonPlaceholder.listUsers({});
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.length).toBe(10);
    expect(result.value[0].name).toBeDefined();
    expect(result.value[0].email).toBeDefined();
  });

  it("gets a user by id", async () => {
    const result = await jsonPlaceholder.getUser({ id: 1 });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.id).toBe(1);
    expect(result.value.name).toBe("Leanne Graham");
    expect(result.value.address.city).toBe("Gwenborough");
  });

  it("gets posts by a user", async () => {
    const result = await jsonPlaceholder.getUserPosts({ id: 1 });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.length).toBeGreaterThan(0);
    result.value.forEach((post: { userId: number }) => {
      expect(post.userId).toBe(1);
    });
  });
});

describe("Generic call() method", () => {
  it("works with route passed directly", async () => {
    const result = await jsonPlaceholder.call(getPost, { id: 2 });
    expect(result.isOk()).toBe(true);
    if (!result.isOk()) return;

    expect(result.value.id).toBe(2);
  });
});
