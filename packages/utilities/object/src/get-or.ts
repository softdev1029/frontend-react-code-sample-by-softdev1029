import type { L, O, S, U } from "@softdev1029/type-utils";
import { getOr as _getOr } from "lodash/fp";

export type GetOr = {
  <
    Default extends unknown,
    Path extends S.Interpolable | L.List<S.Interpolable>,
    Object extends object
  >(
    defaultValue: Default,
    path: O.P.Auto<Object, Path>,
    object: Object
  ): U.Exclude<O.P.At<Object, Path>, undefined> | Default;
  <
    Default extends unknown,
    Path extends S.Interpolable | L.List<S.Interpolable> =
      | S.Interpolable
      | L.List<S.Interpolable>,
    Object extends object = object
  >(
    defaultValue: Default
  ): (
    path: O.P.Auto<Object, Path>,
    object: Object
  ) => U.Exclude<O.P.At<Object, Path>, undefined> | Default;
  <
    Default extends unknown,
    Path extends S.Interpolable | L.List<S.Interpolable> =
      | S.Interpolable
      | L.List<S.Interpolable>,
    Object extends object = object
  >(
    defaultValue: Default
  ): (
    path: Path
  ) => (object: Object) => U.Exclude<O.P.At<Object, Path>, undefined> | Default;
};

export const getOr: GetOr = _getOr;
