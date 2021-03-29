import { has, update } from "@softdev1029/object-utils";
import type { F } from "@softdev1029/type-utils";
import { flow, isString, map } from "lodash/fp";
import { resolve as resolvePath } from "path";
import type { Context, ModuleRule, WebpackConfig } from "./types";

export const resolveContextPath = (context: Context) => (
  path: string | undefined
) => (isString(context) && isString(path) ? resolvePath(context, path) : path);

export const updateStaticPath = (context: Context) => (
  config: WebpackConfig
): WebpackConfig =>
  has("devServer.static", config)
    ? update("devServer.static", resolveContextPath(context), config)
    : config;

const updateRule = (context: Context) => (rule: ModuleRule): ModuleRule =>
  isString(rule)
    ? rule
    : {
        ...rule,
        include: isString(rule.include)
          ? resolveContextPath(context)(rule.include)
          : rule.include,
      };

export const updateIncludePaths = (context: Context) => (
  config: WebpackConfig
): WebpackConfig =>
  has("module.rules", config)
    ? update("module.rules", (rules) => map(updateRule(context), rules), config)
    : config;

export const updateOutputPath = (context: Context) => (
  config: WebpackConfig
): WebpackConfig =>
  has("output.path", config)
    ? update("output.path", resolveContextPath(context), config)
    : config;

export const updateContextPaths = (
  context: Context
): F.Func<[WebpackConfig], WebpackConfig> =>
  flow(
    updateStaticPath(context),
    updateIncludePaths(context),
    updateOutputPath(context)
  );
