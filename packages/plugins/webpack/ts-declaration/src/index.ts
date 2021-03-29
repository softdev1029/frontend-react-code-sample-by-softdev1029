import type { L } from "@softdev1029/type-utils";
import type { EntryPointConfig } from "dts-bundle-generator";
import { generateDtsBundle } from "dts-bundle-generator";
import { isAbsolute, join as joinPaths, relative } from "path";
import { interpolateName } from "loader-utils";
import { filter, flow, map } from "lodash/fp";
import type { Compiler, sources, WebpackPluginInstance } from "webpack";
import { Compilation } from "webpack";
import { concat } from "lodash";

type Entrypoint = Compilation["entrypoints"] extends Map<string, infer X>
  ? X
  : never;

type OriginRecord = L.UnionOf<Entrypoint["origins"]>;

type Test = RegExp | ((value: string) => boolean);

export type Options = {
  readonly test?: Test;
  readonly name?: string;
  readonly configPath?: string;
};

type LoaderContext = Parameters<typeof interpolateName>["0"];

const runTest = (test: Test, value: string): boolean =>
  (test instanceof RegExp && test.test(value)) ||
  (typeof test === "function" && test(value));

const shouldIncludeInDtsBundle = (
  compiler: Compiler,
  origin: OriginRecord,
  test: Test
) => (fileDep: string): boolean =>
  runTest(test, fileDep) &&
  fileDep.startsWith(compiler.context) &&
  fileDep !==
    (isAbsolute(origin.request)
      ? origin.request
      : joinPaths(compiler.context, origin.request));

const createEntryPointConfig = (filePath: string): EntryPointConfig => ({
  filePath,
  output: { importTypes: true, noBanner: true },
});

const getDtsBundleEntries = (
  compiler: Compiler,
  compilation: Compilation,
  origin: OriginRecord,
  test: Test
): readonly EntryPointConfig[] =>
  flow(
    ({ fileDependencies }: Compilation) => Array.from(fileDependencies),
    filter(shouldIncludeInDtsBundle(compiler, origin, test)),
    map((fileDep) =>
      createEntryPointConfig(relative(compiler.context, fileDep))
    ),
    (entries) => concat([createEntryPointConfig(origin.request)], entries)
  )(compilation);

export class TsDeclarationWebpackPlugin implements WebpackPluginInstance {
  private static readonly pluginName = "TsDeclarationWebpackPlugin";

  private readonly test: NonNullable<Options["test"]>;
  private readonly name: NonNullable<Options["name"]>;
  private readonly configPath: NonNullable<Options["configPath"]>;

  constructor({
    test = /\.tsx?$/,
    name = "[name].d.ts",
    configPath = "tsconfig.json",
  }: Options = {}) {
    this.test = test;
    this.name = name;
    this.configPath = configPath;
  }

  apply(compiler: Compiler): void {
    compiler.hooks.thisCompilation.tap(
      TsDeclarationWebpackPlugin.pluginName,
      (compilation) => {
        compilation.hooks.processAssets.tap(
          {
            name: TsDeclarationWebpackPlugin.pluginName,
            stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
          },
          (assets) => {
            compilation.entrypoints.forEach((entrypoint) => {
              entrypoint.origins.forEach((origin) => {
                if (runTest(this.test, origin.request)) {
                  const dts = generateDtsBundle(
                    getDtsBundleEntries(
                      compiler,
                      compilation,
                      origin,
                      this.test
                    ),
                    {
                      preferredConfigPath: this.configPath,
                    }
                  );
                  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                  const loaderContext = {
                    resourcePath: origin.request,
                  } as LoaderContext;

                  const dtsName = interpolateName(loaderContext, this.name, {});

                  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                  assets[dtsName] = {
                    source() {
                      return dts[0];
                    },
                    size() {
                      return dts.length;
                    },
                  } as sources.Source;
                }
              });
            });
          }
        );
      }
    );
  }
}
