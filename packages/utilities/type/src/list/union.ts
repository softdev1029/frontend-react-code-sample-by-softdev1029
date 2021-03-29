import type { A, B, U } from "@softdev1029/type-utils";
import type { L } from "ts-toolbelt";
import type { IsReadonly } from "./list";
import type { Finite as FiniteMap, Variadic as VariadicMap } from "./map";

export type FilterFinite<List extends L.List> = L.UnionOf<
  VariadicMap<U.ListOf<List>>
>;

export type FilterVariadic<List extends L.List> = L.UnionOf<
  FiniteMap<U.ListOf<List>>
>;

type _FlattenVariadic<VariadicList extends L.List, FiniteList extends L.List> =
  | (IsReadonly<VariadicList> extends B.True
      ? L.Readonly<L.Flatten<U.ListOf<VariadicList>>>
      : L.Flatten<U.ListOf<VariadicList>>)
  | FiniteList;
export type FlattenVariadic<List extends L.List> = HasVariadic<
  List
> extends B.True
  ? _FlattenVariadic<FilterFinite<List>, FilterVariadic<List>>
  : List;

export type HasFinite<List extends L.List> = B.Not<
  A.Equals<FilterVariadic<List>, never>
>;

export type HasVariadic<List extends L.List> = B.Not<
  A.Equals<FilterFinite<List>, never>
>;

export type MergeFinite<List extends L.List> = HasFinite<List> extends B.True
  ? L.MergeAll<[], U.ListOf<FilterVariadic<List>>> | FilterFinite<List>
  : List;
