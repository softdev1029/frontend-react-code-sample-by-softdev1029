import type { A, I, L, S, U } from "@softdev1029/type-utils";
import type * as O from "./object";

export * from "Object/P/_api";

type _At<
  Object extends unknown,
  Path extends L.List<A.Key>,
  Iteration extends I.Iteration = I.IterationOf<"0">
> = {
  0: _At<O.At<Object, Path[I.Pos<Iteration>]>, Path, I.Next<Iteration>>;
  1: Object;
}[A.Extends<I.Pos<Iteration>, L.Length<Path>>];

export type At<
  Object extends object,
  Path extends S.Interpolable | L.List<S.Interpolable>
> = _At<Object & {}, Cast<Path>> extends infer X ? A.Cast<X, unknown> : never;

type KeyToIndex<
  Key extends A.Key,
  SplitPath extends L.List<A.Index>
> = number extends Key ? L.Head<SplitPath> : Key & A.Index;

type MetaPath<
  Object,
  SplitPath extends L.List<A.Index> = [],
  Path extends L.List<A.Index> = []
> = {
  [K in keyof Object]:
    | MetaPath<
        Object[K] & {},
        L.Tail<SplitPath>,
        [...Path, KeyToIndex<K, SplitPath>]
      >
    | S.Join<".", [...Path, KeyToIndex<K, SplitPath>]>;
};

type Next<OP> =
  // the next paths after property `K` are on sub objects
  // O[K] === K | {x: '${K}.x' | {y: '${K}.x.y' ...}}
  // So we access O[K] then we only keep the next paths
  // To do this, we can just exclude `string` out of it:
  // O[K] === {x: '${K}.x' | {y: '${K}.x.y' ...}}
  // To do this, we create a union of what we just got
  // This will yield a union of paths and meta paths
  // We exclude the next paths (meta) paths by excluding
  // `object`. Then we are left with the direct next path
  U.Select<O.UnionOf<Exclude<OP, string> & {}>, string>;

type Exec<Object, SplitPath extends L.List<A.Index>> =
  // We go in the `MetaPath` of `O` to get the prop at `SP`
  // So we query what is going the `NextPath` at `O[...SP]`
  Next<At<MetaPath<Object, SplitPath>, SplitPath>>;

type Hint<
  Object,
  Path extends string,
  SplitPath extends L.List<A.Index>,
  ExecResult extends string
> = [ExecResult] extends [never] // if has not found paths
  ? Exec<Object, L.Pop<SplitPath>> // display previous paths
  : ExecResult | Path; // display current + next

type _Auto<
  Object,
  Path extends string,
  SplitPath extends L.List<A.Index> = S.Split<".", Path>
> = Hint<Object, Path, SplitPath, Exec<Object, SplitPath>>;

export type Auto<
  Object extends any,
  Path extends S.Interpolable | L.List<S.Interpolable>
> = _Auto<
  Object & {},
  Path extends L.List<S.Interpolable>
    ? S.Join<".", Path>
    : Path extends S.Interpolable
    ? S.ToString<Path>
    : never
>;

export type Cast<
  Path extends S.Interpolable | L.List<S.Interpolable>
> = Path extends L.List<S.Interpolable>
  ? O.ListOf<
      L.ObjectOf<Path> extends infer X
        ? {
            [K in keyof X]: X[K] extends S.Interpolable
              ? X[K] extends A.Key
                ? X[K]
                : S.ToString<X[K]>
              : never;
          } & {}
        : never
    >
  : Path extends S.Interpolable
  ? Path extends string
    ? S.Split<".", Path>
    : [S.ToString<Path>]
  : never;

type _ToShape<
  Path extends L.List<A.Key>,
  Iteration extends I.Iteration = I.IterationOf<"0">,
  Key extends A.Key = Path[I.Pos<Iteration>]
> = {
  0: Record<Key, _ToShape<Path, I.Next<Iteration>>>;
  1: Record<Key, unknown>;
}[A.Extends<I.Pos<Iteration>, L.LastIndex<Path>>];

export type ToShape<
  Path extends S.Interpolable | L.List<S.Interpolable>
> = Cast<Path> extends infer P ? _ToShape<A.Cast<P, L.List<A.Key>>> : never;

export type Update<
  Object extends object,
  Path extends S.Interpolable | L.List<S.Interpolable>,
  Value extends unknown
> = O.P.Update<Object, Cast<Path>, Value>;
