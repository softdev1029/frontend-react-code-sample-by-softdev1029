"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins_1 = require("./plugins");
const presets_1 = require("./presets");
const getConfig = (api) => {
    const environment = api.env();
    const supportsStaticESM = api.caller((caller) => !!(caller?.supportsStaticESM ?? false));
    const target = api.caller((caller) => caller?.target);
    return {
        plugins: plugins_1.getPlugins({
            environment,
        }),
        presets: presets_1.getPresets({
            environment,
            supportsStaticESM,
            target,
        }),
    };
};
exports.default = getConfig;
//# sourceMappingURL=index.js.map