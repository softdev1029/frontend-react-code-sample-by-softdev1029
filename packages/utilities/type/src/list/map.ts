import type { F, O } from "@softdev1029/type-utils";
import type { L } from "ts-toolbelt";
import type { Finite as FiniteList, Variadic as VariadicList } from "./list";

export type Finite<List extends L.List<L.List>> = L.Filter<
  {
    [K in keyof List]: List[K] extends L.List ? FiniteList<List[K]> : never;
  },
  never,
  "equals"
>;

export type FromFuncArgs<FuncList extends L.List<F.Func>> = O.ListOf<
  L.ObjectOf<FuncList> extends infer X
    ? {
        [K in keyof X]: X[K] extends F.Func<infer args> ? args : never;
      }
    : never
>;

export type Nest<List extends L.List> = O.ListOf<
  L.ObjectOf<List> extends infer X
    ? {
        [K in keyof X]: [X[K]];
      }
    : never
>;

export type ToFuncArgs<ArgsList extends L.List<L.List>> = O.ListOf<
  L.ObjectOf<ArgsList> extends infer X
    ? {
        [K in keyof X]: X[K] extends L.List ? F.Func<X[K]> : never;
      }
    : never
>;

export type UnionOf<List extends L.List<L.List>> = L.Filter<
  {
    [K in keyof List]: List[K] extends L.List ? L.UnionOf<List[K]> : never;
  },
  never,
  "equals"
>;

export type Variadic<List extends L.List<L.List>> = L.Filter<
  {
    [K in keyof List]: List[K] extends L.List ? VariadicList<List[K]> : never;
  },
  never,
  "equals"
>;
