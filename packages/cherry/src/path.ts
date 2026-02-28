// path.ts - Tagged template functions for type-safe path building
import type { PathTemplate } from "./types";

/** Branded type for path parameter markers */
declare const PathParamBrand: unique symbol;
export type PathParam<T extends string = string> = string & {
  readonly [PathParamBrand]: T;
};

/** Branded type for optional path parameter markers */
declare const OptionalParamBrand: unique symbol;
export type OptionalParam<T extends string = string> = string & {
  readonly [OptionalParamBrand]: T;
};

/** Union type for any path param marker */
export type AnyPathParam = PathParam<string> | OptionalParam<string>;

/** Create a path parameter marker */
export function param<T extends string>(name: T): PathParam<T> {
  return `:${name}` as PathParam<T>;
}

/** Create an optional path parameter marker */
export function optional<T extends string>(name: T): OptionalParam<T> {
  return `(:${name})` as OptionalParam<T>;
}

/**
 * Tagged template for building path templates.
 *
 * @example
 * ```ts
 * // Simple path with one param
 * const userPath = path`/users/${param("id")}`;
 * // { template: "/users/:id", paramNames: ["id"] }
 *
 * // Multiple params
 * const postPath = path`/users/${param("userId")}/posts/${param("postId")}`;
 * // { template: "/users/:userId/posts/:postId", paramNames: ["userId", "postId"] }
 *
 * // Optional params
 * const versionedPath = path`/api${optional("version")}/users`;
 * // { template: "/api(:version)/users", paramNames: ["version"] }
 *
 * // No params
 * const staticPath = path`/health`;
 * // { template: "/health", paramNames: [] }
 * ```
 */
export function path(strings: TemplateStringsArray, ...params: AnyPathParam[]): PathTemplate {
  const paramNames: string[] = [];
  let template = strings[0];

  for (let i = 0; i < params.length; i++) {
    const p = params[i];
    template += p + strings[i + 1];

    // Extract param name from `:name` or `(:name)`
    const match = p.match(/^\(?:(\w+)\)?$/);
    if (match) {
      paramNames.push(match[1]);
    }
  }

  return { template, paramNames };
}
