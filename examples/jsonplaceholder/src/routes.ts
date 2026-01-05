import * as v from "valibot";
import { route, path, param } from "@b3-business/cherry";

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

export const posts = {
  list: route({
    method: "GET",
    path: path`/posts`,
    response: v.array(PostSchema),
  }),

  get: route({
    method: "GET",
    path: path`/posts/${param("id")}`,
    pathParams: v.object({
      id: v.number(),
    }),
    response: PostSchema,
  }),

  create: route({
    method: "POST",
    path: path`/posts`,
    bodyParams: PostInputSchema,
    response: PostSchema,
  }),

  update: route({
    method: "PUT",
    path: path`/posts/${param("id")}`,
    pathParams: v.object({
      id: v.number(),
    }),
    bodyParams: PostInputSchema,
    response: PostSchema,
  }),

  patch: route({
    method: "PATCH",
    path: path`/posts/${param("id")}`,
    pathParams: v.object({
      id: v.number(),
    }),
    bodyParams: v.partial(PostInputSchema),
    response: PostSchema,
  }),

  delete: route({
    method: "DELETE",
    path: path`/posts/${param("id")}`,
    pathParams: v.object({
      id: v.number(),
    }),
    response: v.object({}),
  }),

  getComments: route({
    method: "GET",
    path: path`/posts/${param("id")}/comments`,
    pathParams: v.object({
      id: v.number(),
    }),
    response: v.array(CommentSchema),
  }),
};

export const users = {
  list: route({
    method: "GET",
    path: path`/users`,
    response: v.array(UserSchema),
  }),

  get: route({
    method: "GET",
    path: path`/users/${param("id")}`,
    pathParams: v.object({
      id: v.number(),
    }),
    response: UserSchema,
  }),

  getPosts: route({
    method: "GET",
    path: path`/users/${param("id")}/posts`,
    pathParams: v.object({
      id: v.number(),
    }),
    response: v.array(PostSchema),
  }),
};
