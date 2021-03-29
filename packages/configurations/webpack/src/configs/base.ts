import type { TransformOptions } from "@babel/core";
import { TsDeclarationWebpackPlugin } from "@softdev1029/ts-declaration-webpack-plugin";
import type { Config, PluginPair } from "@softdev1029/webpack-config/config";
import {
  CacheGroupChunks,
  Devtool,
  LibraryTarget,
  Mode,
  ModuleIds,
  RuntimeChunk,
  Target,
} from "@softdev1029/webpack-config/constants";
import type { ExternalsFunction } from "@softdev1029/webpack-config/types";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { identity } from "lodash/fp";
import { join as joinPath } from "path";
import nodeExternals from "webpack-node-externals";

export const baseConfig: Config = {
  devtool: Devtool.InlineSourceMap,
  entry: "./src/index.ts",
  externals: [nodeExternals({ modulesFromFile: true }) as ExternalsFunction],
  experiments: {
    topLevelAwait: true,
  },
  mode: Mode.Development,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: "src",
        use: [
          "cache-loader",
          {
            loader: "babel-loader",
            options: identity<TransformOptions>({
              rootMode: "upward",
            }),
          },
        ],
      },
    ],
  },
  output: {
    filename: "[name].[contenthash].js",
    libraryTarget: LibraryTarget.Commonjs2,
    path: "lib",
    pathinfo: false,
    publicPath: "auto",
  },
  optimization: {
    sideEffects: false,
    usedExports: true,
    moduleIds: ModuleIds.Deterministic,
    runtimeChunk: RuntimeChunk.Single,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: CacheGroupChunks.All,
        },
      },
    },
  },
  plugins: [
    identity<PluginPair<typeof CleanWebpackPlugin>>([
      CleanWebpackPlugin,
      (context = "") => [
        {
          cleanOnceBeforeBuildPatterns: [
            "**/*",
            joinPath(context, "node_modules/**/*"),
            joinPath(context, "tsconfig.tsbuildinfo"),
          ],
        },
      ],
    ]),
    identity<PluginPair<typeof ForkTsCheckerWebpackPlugin>>([
      ForkTsCheckerWebpackPlugin,
      [
        {
          eslint: {
            files: "./src/**/*.{js,json,jsx,ts,tsx}",
          },
          typescript: {
            build: true,
            diagnosticOptions: {
              semantic: true,
              syntactic: true,
            },
          },
        },
      ],
    ]),
    identity<PluginPair<typeof TsDeclarationWebpackPlugin>>([
      TsDeclarationWebpackPlugin,
      [{}],
    ]),
  ],
  resolve: {
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx"],
  },
  target: Target.Node,
};
