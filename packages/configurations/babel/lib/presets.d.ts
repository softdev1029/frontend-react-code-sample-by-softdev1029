import type { PluginItem } from "@babel/core";
export declare type PresetOptions = {
    environment: string;
    supportsStaticESM: boolean;
    target?: string;
};
export declare const getPresets: ({ environment, supportsStaticESM, target, }: PresetOptions) => PluginItem[];
//# sourceMappingURL=presets.d.ts.map