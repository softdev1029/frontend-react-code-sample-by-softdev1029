import type { L } from "@softdev1029/type-utils";
import { isArray as _isArray } from "lodash/fp";

export type IsArray = (value: unknown) => value is L.List<unknown> | unknown[];

export const isArray = _isArray as IsArray;
