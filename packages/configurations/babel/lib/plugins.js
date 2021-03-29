"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlugins = void 0;
const concat_1 = __importDefault(require("lodash/fp/concat"));
const flow_1 = __importDefault(require("lodash/fp/flow"));
const identity_1 = __importDefault(require("lodash/fp/identity"));
const plugins = [
    [
        "@babel/plugin-proposal-decorators",
        identity_1.default({
            decoratorsBeforeExport: false,
        }),
    ],
    "@babel/plugin-proposal-class-properties",
];
const webPlugins = ["@emotion/babel-plugin"];
const productionPlugins = [
    [
        "babel-plugin-transform-imports",
        identity_1.default({
            "lodash/fp": {
                transform: (importName) => `lodash/fp/${importName}`,
                preventFullImport: true,
            },
        }),
    ],
];
const getPlugins = ({ environment, target, }) => flow_1.default(concat_1.default(target === "web" ? webPlugins : []), concat_1.default(environment === "production" ? productionPlugins : []))(plugins);
exports.getPlugins = getPlugins;
//# sourceMappingURL=plugins.js.map