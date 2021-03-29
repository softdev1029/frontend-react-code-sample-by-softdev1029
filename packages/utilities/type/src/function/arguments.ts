import type { A, B, L, O } from "@softdev1029/type-utils";

type UnknownArgsMap = [
  [L.List<any>, "equals", []],
  [L.List<unknown>, "<-extends", []],
  [[], "extends->", never]
];

type MapUnknownArgs<
  Args extends L.List,
  ArgsList extends L.List<L.List> | undefined = undefined
> = O.ListOf<
  L.ObjectOf<UnknownArgsMap> extends infer X
    ? {
        [K in keyof X]: X[K] extends UnknownArgsMap[number]
          ? B.And<
              A.Is<Args, X[K][0], "equals">,
              ArgsList extends L.List<L.List>
                ? A.Equals<X[K][2], never> extends B.True
                  ? L.Every<ArgsList, X[K][0], X[K][1]>
                  : B.Some<
                      [
                        L.Every<ArgsList, X[K][0], X[K][1]>,
                        L.Every<L.Filter<ArgsList, X[K][0], X[K][1]>, X[K][2]>
                      ]
                    >
                : B.True
            >
          : never;
      }
    : never
>;

export type AllowIfUnknown<
  Args extends L.List,
  ArgsList extends L.List<L.List>
> = B.Or<
  B.Not<B.Every<MapUnknownArgs<Args>>>,
  B.Some<MapUnknownArgs<Args, ArgsList>>
>;

type _Merge<Args extends L.List> = B.And<
  L.Union.HasVariadic<Args>,
  L.Union.HasFinite<Args>
> extends B.True
  ? L.Concat<L.Union.FilterVariadic<Args>, L.Union.FilterFinite<Args>>
  : Args;

export type Merge<Args extends L.List> = _Merge<
  L.Union.FlattenVariadic<L.Union.MergeFinite<Args>>
>;
