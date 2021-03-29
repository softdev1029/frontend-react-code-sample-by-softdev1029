import { join } from "@softdev1029/collection-utils";
import { merge } from "@softdev1029/object-utils";
import type { Config, PluginPair } from "@softdev1029/webpack-config/config";
import { Target } from "@softdev1029/webpack-config/constants";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { identity } from "lodash/fp";
import { container } from "webpack";
import { baseConfig } from "./base";

const { ModuleFederationPlugin } = container;

const { plugins } = baseConfig;

export const reactConfig: Config = merge<Config, Config>(baseConfig, {
  devServer: {
    host: "localhost",
    static: "./lib",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": join(", ", [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH",
        "OPTIONS",
      ]),
      "Access-Control-Allow-Headers": join(", ", [
        "X-Requested-With",
        "content-type",
        "Authorization",
      ]),
    },
  },
  externals: undefined,
  output: {
    libraryTarget: undefined,
  },
  plugins: [
    ...(plugins ?? []),
    identity<PluginPair<typeof ModuleFederationPlugin>>([
      ModuleFederationPlugin,
      [
        {
          filename: "remote-entry.js",
          shared: {
            react: {
              singleton: true,
              requiredVersion: "experimental",
            },
            "react-dom": {
              singleton: true,
              requiredVersion: "experimental",
            },
          },
        },
      ],
    ]),
    identity<PluginPair<typeof HtmlWebpackPlugin>>([
      HtmlWebpackPlugin,
      [
        {
          template: "./public/index.html",
        },
      ],
    ]),
  ],
  target: Target.Web,
});
