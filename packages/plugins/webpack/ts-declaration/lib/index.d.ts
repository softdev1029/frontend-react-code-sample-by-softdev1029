import type { Compiler, WebpackPluginInstance } from "webpack";
declare type Test = RegExp | ((value: string) => boolean);
export declare type Options = {
    readonly test?: Test;
    readonly name?: string;
    readonly configPath?: string;
};
export declare class TsDeclarationWebpackPlugin implements WebpackPluginInstance {
    private static readonly pluginName;
    private readonly test;
    private readonly name;
    private readonly configPath;
    constructor({ test, name, configPath, }?: Options);
    apply(compiler: Compiler): void;
}
export {};
//# sourceMappingURL=index.d.ts.map