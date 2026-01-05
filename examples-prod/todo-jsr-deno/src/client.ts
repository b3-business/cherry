import { createCherryClient } from "@b3-business/cherry";
import {
  listPosts,
  getPost,
  createPost,
  updatePost,
  patchPost,
  deletePost,
  getPostComments,
  listUsers,
  getUser,
  getUserPosts,
} from "./routes.ts";

export const jsonPlaceholder = createCherryClient({
  baseUrl: "https://jsonplaceholder.typicode.com",
  routes: {
    listPosts,
    getPost,
    createPost,
    updatePost,
    patchPost,
    deletePost,
    getPostComments,
    listUsers,
    getUser,
    getUserPosts,
  },
});
