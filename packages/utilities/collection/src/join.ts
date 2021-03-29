import type { L, S } from "@softdev1029/type-utils";
import { join as _join } from "lodash/fp";

export type Join = {
  <Separator extends string, List extends L.List<S.Interpolable>>(
    separator: Separator,
    list: List
  ): S.Join<Separator, List>;
  <Separator extends string>(separator: Separator): <
    List extends L.List<S.Interpolable>
  >(
    list: List
  ) => S.Join<Separator, List>;
};

export const join = _join as Join;
