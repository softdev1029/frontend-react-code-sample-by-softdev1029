"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsDeclarationWebpackPlugin = void 0;
const dts_bundle_generator_1 = require("dts-bundle-generator");
const path_1 = require("path");
const loader_utils_1 = require("loader-utils");
const fp_1 = require("lodash/fp");
const webpack_1 = require("webpack");
const lodash_1 = require("lodash");
const runTest = (test, value) => (test instanceof RegExp && test.test(value)) ||
    (typeof test === "function" && test(value));
const shouldIncludeInDtsBundle = (compiler, origin, test) => (fileDep) => runTest(test, fileDep) &&
    fileDep.startsWith(compiler.context) &&
    fileDep !==
        (path_1.isAbsolute(origin.request)
            ? origin.request
            : path_1.join(compiler.context, origin.request));
const createEntryPointConfig = (filePath) => ({
    filePath,
    output: { importTypes: true, noBanner: true },
});
const getDtsBundleEntries = (compiler, compilation, origin, test) => fp_1.flow(({ fileDependencies }) => Array.from(fileDependencies), fp_1.filter(shouldIncludeInDtsBundle(compiler, origin, test)), fp_1.map((fileDep) => createEntryPointConfig(path_1.relative(compiler.context, fileDep))), (entries) => lodash_1.concat([createEntryPointConfig(origin.request)], entries))(compilation);
class TsDeclarationWebpackPlugin {
    constructor({ test = /\.tsx?$/, name = "[name].d.ts", configPath = "tsconfig.json", } = {}) {
        this.test = test;
        this.name = name;
        this.configPath = configPath;
    }
    apply(compiler) {
        compiler.hooks.thisCompilation.tap(TsDeclarationWebpackPlugin.pluginName, (compilation) => {
            compilation.hooks.processAssets.tap({
                name: TsDeclarationWebpackPlugin.pluginName,
                stage: webpack_1.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
            }, (assets) => {
                compilation.entrypoints.forEach((entrypoint) => {
                    entrypoint.origins.forEach((origin) => {
                        if (runTest(this.test, origin.request)) {
                            const dts = dts_bundle_generator_1.generateDtsBundle(getDtsBundleEntries(compiler, compilation, origin, this.test), {
                                preferredConfigPath: this.configPath,
                            });
                            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                            const loaderContext = {
                                resourcePath: origin.request,
                            };
                            const dtsName = loader_utils_1.interpolateName(loaderContext, this.name, {});
                            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                            assets[dtsName] = {
                                source() {
                                    return dts[0];
                                },
                                size() {
                                    return dts.length;
                                },
                            };
                        }
                    });
                });
            });
        });
    }
}
exports.TsDeclarationWebpackPlugin = TsDeclarationWebpackPlugin;
TsDeclarationWebpackPlugin.pluginName = "TsDeclarationWebpackPlugin";
//# sourceMappingURL=index.js.map