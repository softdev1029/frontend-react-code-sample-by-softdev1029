import type { A, B, F, L, O, U } from "@softdev1029/type-utils";
import { cond as _cond } from "lodash/fp";

export type CondPair<Condition, PairedFunction> = readonly [
  Condition,
  PairedFunction
] extends infer Pair
  ? Pair extends readonly [infer Cond, F.Func<infer Args2>]
    ? Cond extends F.Predicate<infer Args1>
      ? B.Or<
          A.Is<F.Func<Args1>, F.Func<Args2>>,
          A.Equals<[], Args2>
        > extends B.True
        ? Cond extends F.GuardedPredicate<Args1, infer TypeGuard>
          ? {
              0: never;
              1: Pair;
            }[B.Or<A.Equals<[], Args2>, A.Equals<[TypeGuard], Args2>>]
          : Pair
        : never
      : never
    : never
  : never;

export type CondPairs<Pairs extends L.List<CondPair<F.Predicate, F.Func>>> = {
  [K in keyof Pairs]: Pairs[K] extends readonly [
    F.Predicate<infer Args1, infer Result1>,
    F.Func<infer Args2, infer Result2>
  ]
    ? {
        0: CondPair<
          Pairs[K][0] extends F.GuardedPredicate<Args1, infer TypeGuard>
            ? F.GuardedPredicate<Args1, TypeGuard>
            : F.Predicate<Args1, Result1>,
          F.Func<Args2, Result2>
        >;
        1: never;
      }[A.Equals<CondPairsArgs<Pairs>, never>]
    : Pairs[K];
} & {} extends infer X
  ? X extends L.List<never>
    ? never
    : X
  : never;

/* eslint-disable @typescript-eslint/no-unused-vars */
export type CondPairArgs<
  Pair extends CondPair<F.Predicate, F.Func>,
  ArgsList extends L.List<L.List>
> = B.Not<L.Includes<ArgsList, never>> extends B.True
  ? Pair extends CondPair<F.Predicate<infer Args>, F.Func<infer _>>
    ? F.Args.AllowIfUnknown<Args, ArgsList> extends B.True
      ? L.Every<
          L.Map.ToFuncArgs<ArgsList>,
          F.Func<Args>,
          "extends->"
        > extends B.True
        ? Args
        : B.And<
            L.IsFinite<Args>,
            L.Every<L.Map.UnionOf<ArgsList>, L.UnionOf<Args>, "extends->">
          > extends B.True
        ? L.Filter<L.Map.UnionOf<ArgsList>, L.UnionOf<Args>, "<-extends">
        : never
      : never
    : never
  : never;
/* eslint-enable @typescript-eslint/no-unused-vars */

export type CondPairsArgsList<
  Pairs extends L.List<CondPair<F.Predicate, F.Func>>
> = {
  [K in keyof Pairs]: Pairs[K] extends readonly [
    F.Predicate<infer Args1>,
    F.Func<infer Args2>
  ]
    ? Pairs[K] extends CondPair<F.Predicate<Args1>, F.Func<Args2>>
      ? Args1
      : never
    : Pairs[K];
} & {};

export type CondPairsArgs<
  Pairs extends L.List<CondPair<F.Predicate, F.Func>>
> = F.Args.Merge<
  U.NeverWithX<CondPairArgs<Pairs[number], CondPairsArgsList<Pairs>>>
>;

/* eslint-disable @typescript-eslint/no-unused-vars */
export type CondPairResult<
  Pair extends CondPair<F.Predicate, F.Func>
> = Pair extends CondPair<
  F.Predicate<infer _Args1>,
  F.Func<infer _Args2, infer Result>
>
  ? Result
  : A.x;
/* eslint-enable @typescript-eslint/no-unused-vars */

export type CondPairsResult<
  Pairs extends L.List<CondPair<F.Predicate, F.Func>>
> = U.NeverWithX<
  L.UnionOf<
    O.ListOf<
      L.ObjectOf<Pairs> extends infer X
        ? {
            [K in keyof X]: X[K] extends CondPair<F.Predicate, F.Func>
              ? CondPairResult<X[K]>
              : never;
          }
        : never
    >
  >
>;

export type Cond = <
  Pairs extends CondPairs<L.List<CondPair<F.Predicate, F.Func>>>
>(
  pairs: Pairs
) => <Args extends CondPairsArgs<Pairs>>(
  ...args: Args
) => CondPairsResult<Pairs>;

export const cond: Cond = (_cond as unknown) as Cond;
