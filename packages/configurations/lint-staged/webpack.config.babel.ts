import { configs, createConfig } from "@softdev1029/webpack-config";

const config = createConfig(configs.baseConfig, {
  context: __dirname,
  output: {
    filename: "index.js",
  },
  optimization: {
    runtimeChunk: undefined,
  },
});

export default config;
