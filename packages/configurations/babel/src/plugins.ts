import type { PluginItem } from "@babel/core";
import type { Options as DecoratorsOptions } from "@babel/plugin-proposal-decorators";
import type { Options as TransformImportsOptions } from "babel-plugin-transform-imports";
import concat from "lodash/fp/concat";
import flow from "lodash/fp/flow";
import identity from "lodash/fp/identity";

const plugins: PluginItem[] = [
  [
    "@babel/plugin-proposal-decorators",
    identity<DecoratorsOptions>({
      decoratorsBeforeExport: false,
    }),
  ],
  "@babel/plugin-proposal-class-properties",
];

const webPlugins: PluginItem[] = ["@emotion/babel-plugin"];

const productionPlugins: PluginItem[] = [
  [
    "babel-plugin-transform-imports",
    identity<TransformImportsOptions>({
      "lodash/fp": {
        transform: (importName: string) => `lodash/fp/${importName}`,
        preventFullImport: true,
      },
    }),
  ],
];

export type PluginOptions = {
  environment: string;
  target?: string;
};

export const getPlugins = ({
  environment,
  target,
}: PluginOptions): PluginItem[] =>
  flow(
    concat(target === "web" ? webPlugins : []),
    concat(environment === "production" ? productionPlugins : [])
  )(plugins);
