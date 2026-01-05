import { createCherryClient } from "@b3b/cherry";
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
} from "./routes";

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
