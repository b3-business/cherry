import { createCherryClient } from "@b3-business/cherry";
import { posts, users } from "./routes";

export const jsonPlaceholder = createCherryClient({
  baseUrl: "https://jsonplaceholder.typicode.com",
  routes: { posts, users },
});
