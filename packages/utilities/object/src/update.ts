import type { L, O, S } from "@softdev1029/type-utils";
import { update as _update } from "lodash/fp";

export type Update = {
  <
    Path extends S.Interpolable | L.List<S.Interpolable>,
    Object extends object,
    Result extends unknown = O.P.At<Object, Path>
  >(
    path: O.P.Auto<Object, Path>,
    updater: (value: O.P.At<Object, Path>) => Result,
    object: Object
  ): O.P.Update<Object, Path, Result>;
  <
    Path extends S.Interpolable | L.List<S.Interpolable>,
    Object extends object,
    Result extends unknown = O.P.At<Object, Path>
  >(
    path: O.P.Auto<Object, Path>,
    updater: (value: O.P.At<Object, Path>) => Result
  ): (object: Object) => O.P.Update<Object, Path, Result>;
  <
    Path extends S.Interpolable | L.List<S.Interpolable>,
    Object extends object,
    Result extends unknown = O.P.At<Object, Path>
  >(
    path: O.P.Auto<Object, Path>
  ): (
    updater: (value: O.P.At<Object, Path>) => Result
  ) => (object: Object) => O.P.Update<Object, Path, Result>;
  <
    Path extends S.Interpolable | L.List<S.Interpolable>,
    Object extends object,
    Result extends unknown = O.P.At<Object, Path>
  >(
    path: O.P.Auto<Object, Path>
  ): (
    updater: (value: O.P.At<Object, Path>) => Result,
    object: Object
  ) => O.P.Update<Object, Path, Result>;
};

export const update: Update = _update;
