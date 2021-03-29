"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPresets = void 0;
const identity_1 = __importDefault(require("lodash/fp/identity"));
const getPresets = ({ environment, supportsStaticESM, target, }) => [
    [
        "@babel/env",
        identity_1.default({
            modules: supportsStaticESM ? false : undefined,
            targets: target === "web"
                ? "defaults"
                : {
                    node: true,
                },
        }),
    ],
    [
        "@babel/react",
        identity_1.default({
            runtime: "automatic",
            development: environment === "development",
            ...(target === "web" ? { importSource: "@emotion/react" } : {}),
        }),
    ],
    [
        "@babel/typescript",
        identity_1.default({
            onlyRemoveTypeImports: true,
        }),
    ],
];
exports.getPresets = getPresets;
//# sourceMappingURL=presets.js.map