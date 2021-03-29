import type { B } from "ts-toolbelt";
import type * as A from "./any";
import type * as L from "./list";

export * from "Boolean/_api";

export type Every<List extends L.List<B.Boolean>> = List extends L.List<B.True>
  ? B.True
  : List extends L.List<B.False>
  ? B.False
  : B.Boolean;

export type Some<List extends L.List<B.Boolean>> = L.Includes<List, B.True>;

type _Maybe<Bool extends B.Boolean, Check extends B.Boolean> = B.Or<
  A.Equals<Bool, Check>,
  A.Equals<Bool, B.Boolean>
>;

export type MaybeFalse<Bool extends B.Boolean> = _Maybe<Bool, B.False>;

export type MaybeTrue<Bool extends B.Boolean> = _Maybe<Bool, B.True>;

export type None<List extends L.List<B.Boolean>> = B.Not<Some<List>>;
