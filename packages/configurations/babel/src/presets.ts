import type { PluginItem } from "@babel/core";
import type { Options as EnvPresetOptions } from "@babel/preset-env";
import type {
  AutomaticRuntimeOptions,
  ClassicRuntimeOptions,
  Options as _ReactPresetOptions,
} from "@babel/preset-react";
import type { Options as TypescriptPresetOptions } from "@babel/preset-typescript";
import identity from "lodash/fp/identity";

type ReactRuntime = NonNullable<_ReactPresetOptions["runtime"]>;

type ReactPresetOptions<
  Runtime extends ReactRuntime = "automatic"
> = (Runtime extends "automatic"
  ? AutomaticRuntimeOptions
  : ClassicRuntimeOptions) &
  _ReactPresetOptions;

export type PresetOptions = {
  environment: string;
  supportsStaticESM: boolean;
  target?: string;
};

export const getPresets = ({
  environment,
  supportsStaticESM,
  target,
}: PresetOptions): PluginItem[] => [
  [
    "@babel/env",
    identity<EnvPresetOptions>({
      modules: supportsStaticESM ? false : undefined,
      targets:
        target === "web"
          ? "defaults"
          : {
              node: true,
            },
    }),
  ],
  [
    "@babel/react",
    identity<ReactPresetOptions>({
      runtime: "automatic",
      development: environment === "development",
      ...(target === "web" ? { importSource: "@emotion/react" } : {}),
    }),
  ],
  [
    "@babel/typescript",
    identity<TypescriptPresetOptions>({
      onlyRemoveTypeImports: true,
    }),
  ],
];
