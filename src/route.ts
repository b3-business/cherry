import * as v from "valibot";
import type {
  CherryRoute,
  HttpMethod,
  PathTemplate,
  QueryParamOptions,
} from "./types";

const HttpMethodSchema = v.picklist(["GET", "POST", "PUT", "PATCH", "DELETE"]);

export type RouteConfig<
  TPathParams extends v.BaseSchema<any, any, any> | undefined,
  TQueryParams extends v.BaseSchema<any, any, any> | undefined,
  TBodyParams extends v.BaseSchema<any, any, any> | undefined,
  TResponse extends v.BaseSchema<any, any, any>,
> = {
  method: HttpMethod;
  path: PathTemplate;
  pathParams?: TPathParams;
  queryParams?: TQueryParams;
  bodyParams?: TBodyParams;
  response: TResponse;
  queryParamOptions?: QueryParamOptions;
  description?: string;
};

export function route<
  TPathParams extends v.BaseSchema<any, any, any> | undefined,
  TQueryParams extends v.BaseSchema<any, any, any> | undefined,
  TBodyParams extends v.BaseSchema<any, any, any> | undefined,
  TResponse extends v.BaseSchema<any, any, any>,
>(
  config: RouteConfig<TPathParams, TQueryParams, TBodyParams, TResponse>,
): CherryRoute<TPathParams, TQueryParams, TBodyParams, TResponse> {
  // validate HTTP method
  v.parse(HttpMethodSchema, config.method);

  // validate availability and content of pathParams schema, if needed
  if (config.path.paramNames.length > 0) {
    if (!config.pathParams) {
      throw new Error(
        `Route has path params [${config.path.paramNames.join(", ")}] but no pathParams schema`,
      );
    }

    const schemaKeys = getSchemaKeys(config.pathParams);

    for (const paramName of config.path.paramNames) {
      if (!schemaKeys.includes(paramName)) {
        throw new Error(
          `Path param ":${paramName}" not found in pathParams schema. ` +
            `Available: [${schemaKeys.join(", ")}]`,
        );
      }
    }

    for (const schemaKey of schemaKeys) {
      if (!config.path.paramNames.includes(schemaKey)) {
        throw new Error(
          `pathParams schema key "${schemaKey}" not present in path template. ` +
            `Template params: [${config.path.paramNames.join(", ")}]`,
        );
      }
    }
  }

  return config as CherryRoute<
    TPathParams,
    TQueryParams,
    TBodyParams,
    TResponse
  >;
}

function getSchemaKeys(schema: v.BaseSchema<any, any, any>): string[] {
  if (
    "entries" in schema &&
    typeof (schema as any).entries === "object" &&
    (schema as any).entries !== null
  ) {
    return Object.keys((schema as any).entries);
  }
  return [];
}
