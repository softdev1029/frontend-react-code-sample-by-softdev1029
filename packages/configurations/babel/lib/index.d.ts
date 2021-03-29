import type { ConfigFunction } from "@babel/core";
declare module "@babel/core" {
    interface TransformCaller {
        target?: string;
    }
}
declare const getConfig: ConfigFunction;
export default getConfig;
//# sourceMappingURL=index.d.ts.map