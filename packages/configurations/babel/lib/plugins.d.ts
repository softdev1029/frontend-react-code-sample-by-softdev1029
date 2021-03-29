import type { PluginItem } from "@babel/core";
export declare type PluginOptions = {
    environment: string;
    target?: string;
};
export declare const getPlugins: ({ environment, target, }: PluginOptions) => PluginItem[];
//# sourceMappingURL=plugins.d.ts.map