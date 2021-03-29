import type { M } from "ts-toolbelt";
import type { Record } from "./object";

export * from "Misc/_api";

export type Narrowable = M.Primitive | Record | {};
