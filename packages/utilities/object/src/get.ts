import type { L, O, S } from "@softdev1029/type-utils";
import { get as _get } from "lodash/fp";

export type Get = {
  <Path extends S.Interpolable | L.List<S.Interpolable>, Object extends object>(
    path: O.P.Auto<Object, Path>,
    object: Object
  ): O.P.At<Object, Path>;
  <Path extends S.Interpolable | L.List<S.Interpolable>, Object extends object>(
    path: O.P.Auto<Object, Path>
  ): (object: Object) => O.P.At<Object, Path>;
};

export const get: Get = _get;
