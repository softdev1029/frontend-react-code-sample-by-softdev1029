import type { F, L } from "@softdev1029/type-utils";
import { overSome as _overSome } from "lodash/fp";

export type PredicateArgs<
  Predicates extends L.List<F.Predicate>
> = F.Args.Merge<
  L.UnionOf<
    L.Filter<
      {
        [K in keyof Predicates]: Predicates[K] extends F.Predicate<infer Args>
          ? Args
          : never;
      },
      never,
      "equals"
    >
  >
>;

/* eslint-disable @typescript-eslint/no-unused-vars */
export type PredicateTypeGuards<
  Predicates extends L.List<F.Predicate>
> = L.UnionOf<
  L.Filter<
    {
      [K in keyof Predicates]: Predicates[K] extends F.GuardedPredicate<
        infer _Args,
        infer TypeGuard
      >
        ? TypeGuard
        : never;
    },
    never,
    "equals"
  >
>;
/* eslint-enable @typescript-eslint/no-unused-vars */

type _GuardedPredicate<
  Predicates extends L.List<F.Predicate>
> = F.GuardedPredicate<
  PredicateArgs<Predicates>,
  PredicateTypeGuards<Predicates>
>;
export type GuardedPredicate<
  Predicates extends L.List<F.Predicate>
> = Predicates extends unknown ? _GuardedPredicate<Predicates> : never;

export type OverSome = {
  <Predicates extends L.List<F.GuardedPredicate>>(
    predicates: Predicates
  ): GuardedPredicate<Predicates>;
  <Args extends L.List<unknown>>(
    predicates: L.List<F.Predicate<Args>>
  ): F.Predicate;
};

export const overSome: OverSome = (_overSome as unknown) as OverSome;
