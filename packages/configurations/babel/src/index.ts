import type { ConfigFunction } from "@babel/core";
import { getPlugins } from "./plugins";
import { getPresets } from "./presets";

declare module "@babel/core" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface TransformCaller {
    target?: string;
  }
}

const getConfig: ConfigFunction = (api) => {
  const environment = api.env();
  const supportsStaticESM = api.caller(
    (caller) => !!(caller?.supportsStaticESM ?? false)
  );
  const target = api.caller((caller) => caller?.target);

  return {
    plugins: getPlugins({
      environment,
    }),
    presets: getPresets({
      environment,
      supportsStaticESM,
      target,
    }),
  };
};

export default getConfig;
