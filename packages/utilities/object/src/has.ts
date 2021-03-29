import type { L, O, S } from "@softdev1029/type-utils";
import { has as _has } from "lodash/fp";

export type Has = {
  <Path extends S.Interpolable | L.List<S.Interpolable>>(
    path: Path,
    object: object
  ): object is O.P.ToShape<Path>;
  <Path extends S.Interpolable | L.List<S.Interpolable>>(path: Path): (
    object: object
  ) => object is O.P.ToShape<Path>;
};

export const has = (_has as unknown) as Has;
