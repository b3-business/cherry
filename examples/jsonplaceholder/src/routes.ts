import * as v from "valibot";
import { route, path, param } from "@b3b/cherry";

export const PostSchema = v.object({
  id: v.number(),
  userId: v.number(),
  title: v.string(),
  body: v.string(),
});

export const PostInputSchema = v.object({
  userId: v.number(),
  title: v.string(),
  body: v.string(),
});

export const CommentSchema = v.object({
  id: v.number(),
  postId: v.number(),
  name: v.string(),
  email: v.pipe(v.string(), v.email()),
  body: v.string(),
});

export const UserSchema = v.object({
  id: v.number(),
  name: v.string(),
  username: v.string(),
  email: v.pipe(v.string(), v.email()),
  address: v.object({
    street: v.string(),
    suite: v.string(),
    city: v.string(),
    zipcode: v.string(),
    geo: v.object({
      lat: v.string(),
      lng: v.string(),
    }),
  }),
  phone: v.string(),
  website: v.string(),
  company: v.object({
    name: v.string(),
    catchPhrase: v.string(),
    bs: v.string(),
  }),
});

export const listPosts = route({
  method: "GET",
  path: path`/posts`,
  response: v.array(PostSchema),
});

export const getPost = route({
  method: "GET",
  path: path`/posts/${param("id")}`,
  pathParams: v.object({
    id: v.number(),
  }),
  response: PostSchema,
});

export const createPost = route({
  method: "POST",
  path: path`/posts`,
  bodyParams: PostInputSchema,
  response: PostSchema,
});

export const updatePost = route({
  method: "PUT",
  path: path`/posts/${param("id")}`,
  pathParams: v.object({
    id: v.number(),
  }),
  bodyParams: PostInputSchema,
  response: PostSchema,
});

export const patchPost = route({
  method: "PATCH",
  path: path`/posts/${param("id")}`,
  pathParams: v.object({
    id: v.number(),
  }),
  bodyParams: v.partial(PostInputSchema),
  response: PostSchema,
});

export const deletePost = route({
  method: "DELETE",
  path: path`/posts/${param("id")}`,
  pathParams: v.object({
    id: v.number(),
  }),
  response: v.object({}),
});

export const getPostComments = route({
  method: "GET",
  path: path`/posts/${param("id")}/comments`,
  pathParams: v.object({
    id: v.number(),
  }),
  response: v.array(CommentSchema),
});

export const listUsers = route({
  method: "GET",
  path: path`/users`,
  response: v.array(UserSchema),
});

export const getUser = route({
  method: "GET",
  path: path`/users/${param("id")}`,
  pathParams: v.object({
    id: v.number(),
  }),
  response: UserSchema,
});

export const getUserPosts = route({
  method: "GET",
  path: path`/users/${param("id")}/posts`,
  pathParams: v.object({
    id: v.number(),
  }),
  response: v.array(PostSchema),
});
