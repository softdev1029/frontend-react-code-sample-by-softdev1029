import type { O } from "@softdev1029/type-utils";
import { toPairs as _toPairs } from "lodash/fp";

export type Pairs<T extends O.Record> = O.UnionOf<
  {
    [K in keyof T]: [K, T[K]];
  }
>;

export type ToPairs = <T extends O.Record>(object: T) => Pairs<T>;

export const toPairs = _toPairs;
