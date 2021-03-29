import type { A, B, F, I, O } from "@softdev1029/type-utils";
import type { Match } from "Any/_Internal";
import type { Naked } from "List/_Internal";
import type { L } from "ts-toolbelt";

export * from "List/_api";

export type Every<
  List extends L.List,
  M extends unknown,
  match extends Match = "default"
> = L.ObjectOf<List> extends infer X
  ? O.ListOf<
      {
        [K in keyof X]: A.Is<X[K], M, match>;
      }
    > extends L.List<B.True>
    ? B.True
    : B.False
  : never;

export type Finite<List extends L.List> = IsFinite<List> extends B.True
  ? List
  : never;

/* eslint-disable @typescript-eslint/no-unused-vars */
export type IsFinite<List extends L.List> = List extends []
  ? B.True
  : List extends L.List<infer Element>
  ? Element[] extends List
    ? B.False
    : F.Func<List> extends F.Func<[infer First, ...infer Rest]>
    ? IsFinite<Rest>
    : never
  : never;
/* eslint-enable @typescript-eslint/no-unused-vars */

export type IsReadonly<List extends L.List> = List extends any[]
  ? B.False
  : B.True;

type _Join<
  Separator extends string,
  List extends L.List,
  Joined extends string = string,
  Iteration extends I.Iteration = I.IterationOf<"0">
> = {
  0: _Join<
    Separator,
    List,
    Iteration extends I.IterationOf<"0">
      ? List[I.Pos<Iteration>]
      : `${Joined}${Separator}${List[I.Pos<Iteration>]}`,
    I.Next<Iteration>
  >;
  1: Joined;
}[A.Extends<I.Pos<Iteration>, L.Length<List>>];

export type Join<Separator extends string, List extends L.List> = _Join<
  Separator,
  List
> extends infer X
  ? A.Cast<X, string>
  : never;

export type None<
  List extends L.List,
  M extends unknown,
  match extends Match = "default"
> = B.Not<L.Includes<List, M, match>>;

type _UnZip<
  List extends L.List<[any, any]>,
  LN extends [L.List, L.List] = [[], []],
  Iteration extends I.Iteration = I.IterationOf<"0">
> = {
  0: _UnZip<
    List,
    List[I.Pos<Iteration>] extends [infer L1, infer L2]
      ? [L.Append<LN[0], L1>, L.Append<LN[1], L2>]
      : never,
    I.Next<Iteration>
  >;
  1: LN;
}[A.Extends<I.Pos<Iteration>, L.Length<List>>];
export type UnZip<List extends L.List<[any, any]>> = _UnZip<
  Naked<List>
> extends infer X
  ? A.Cast<X, L.List>
  : never;

export type Variadic<List extends L.List> = IsFinite<List> extends B.False
  ? List
  : never;
