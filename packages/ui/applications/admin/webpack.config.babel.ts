import { configs, createConfig, PluginPair } from "@softdev1029/webpack-config";
import { camelCase, flow, get, identity, split } from "lodash/fp";
import { dirname, resolve } from "path";
import { container } from "webpack";
import { name } from "./package.json";

const { ModuleFederationPlugin } = container;

const config = createConfig(configs.reactConfig, {
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [
          resolve(__dirname, "src"),
          dirname(require.resolve("@softdev1029/react-components")),
        ],
      },
    ],
  },
  plugins: [
    identity<PluginPair<typeof ModuleFederationPlugin>>([
      ModuleFederationPlugin,
      [
        {
          name: flow(split("/"), get(1), camelCase)(name),
        },
      ],
    ]),
  ],
});

export default config;
