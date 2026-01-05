import { assertEquals } from "jsr:@std/assert";
import { jsonPlaceholder } from "../src/client.ts";
import { getPost } from "../src/routes.ts";

Deno.test("JSONPlaceholder Post Roundtrip - creates, retrieves, updates, and deletes a post", async () => {
  const createResult = await jsonPlaceholder.createPost({
    userId: 1,
    title: "Test Post from Cherry",
    body: "This post was created using the cherry API client.",
  });

  assertEquals(createResult.isOk(), true);
  if (!createResult.isOk()) return;

  const created = createResult.value;
  assertEquals(typeof created.id, "number");
  assertEquals(created.title, "Test Post from Cherry");
  assertEquals(created.userId, 1);

  const getResult = await jsonPlaceholder.getPost({ id: 1 });
  assertEquals(getResult.isOk(), true);
  if (!getResult.isOk()) return;

  const fetched = getResult.value;
  assertEquals(fetched.id, 1);
  assertEquals(typeof fetched.userId, "number");

  const patchResult = await jsonPlaceholder.patchPost({
    id: 1,
    title: "Updated Title",
  });
  assertEquals(patchResult.isOk(), true);
  if (!patchResult.isOk()) return;

  assertEquals(patchResult.value.title, "Updated Title");

  const deleteResult = await jsonPlaceholder.deletePost({ id: 1 });
  assertEquals(deleteResult.isOk(), true);
});

Deno.test("JSONPlaceholder Post Roundtrip - lists all posts", async () => {
  const result = await jsonPlaceholder.listPosts();
  assertEquals(result.isOk(), true);
  if (!result.isOk()) return;

  assertEquals(result.value.length > 0, true);
  assertEquals(typeof result.value[0].id, "number");
  assertEquals(typeof result.value[0].title, "string");
});

Deno.test("JSONPlaceholder Post Roundtrip - gets comments for a post", async () => {
  const result = await jsonPlaceholder.getPostComments({ id: 1 });
  assertEquals(result.isOk(), true);
  if (!result.isOk()) return;

  assertEquals(result.value.length > 0, true);
  assertEquals(result.value[0].postId, 1);
  assertEquals(typeof result.value[0].email, "string");
});

Deno.test("JSONPlaceholder User Routes - lists all users", async () => {
  const result = await jsonPlaceholder.listUsers();
  assertEquals(result.isOk(), true);
  if (!result.isOk()) return;

  assertEquals(result.value.length, 10);
  assertEquals(typeof result.value[0].name, "string");
  assertEquals(typeof result.value[0].email, "string");
});

Deno.test("JSONPlaceholder User Routes - gets a user by id", async () => {
  const result = await jsonPlaceholder.getUser({ id: 1 });
  assertEquals(result.isOk(), true);
  if (!result.isOk()) return;

  assertEquals(result.value.id, 1);
  assertEquals(result.value.name, "Leanne Graham");
  assertEquals(result.value.address.city, "Gwenborough");
});

Deno.test("JSONPlaceholder User Routes - gets posts by a user", async () => {
  const result = await jsonPlaceholder.getUserPosts({ id: 1 });
  assertEquals(result.isOk(), true);
  if (!result.isOk()) return;

  assertEquals(result.value.length > 0, true);
  for (const post of result.value) {
    assertEquals(post.userId, 1);
  }
});

Deno.test("Generic call() method - works with route passed directly", async () => {
  const result = await jsonPlaceholder.call(getPost, { id: 2 });
  assertEquals(result.isOk(), true);
  if (!result.isOk()) return;

  assertEquals(result.value.id, 2);
});
