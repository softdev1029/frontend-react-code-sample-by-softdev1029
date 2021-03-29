import type { A, F, L, O } from "@softdev1029/type-utils";
import { constant, flow, map, set } from "lodash/fp";
import { customizers, mergeWith } from "./merge-with";

type ConvertOptions = {
  cap?: boolean;
  curry?: boolean;
  fixed?: boolean;
  immutable?: boolean;
  rearg?: boolean;
};

type Convertible<Before extends F.Func> = Before & {
  convert: <After extends F.Func = Before>(options: ConvertOptions) => After;
};

const mutableSet = (set as Convertible<typeof set>).convert({
  immutable: false,
});

export const merge = <
  TObject extends L.List | O.Record,
  TSource extends L.List | O.Record
>(
  objValue: TObject,
  srcValue: TSource
): O.Merge<TObject, TSource> =>
  flow(
    (pathState: customizers.PathState) =>
      [
        pathState,
        mergeWith<TObject, TSource>(
          (...args) => {
            customizers.selectUndefinedPaths(pathState)(...args);
          },
          objValue,
          srcValue
        ),
      ] as const,
    ([{ selectedPaths }, merged]) =>
      flow(
        map((path: L.List<A.Key>) => mutableSet(path, undefined, merged)),
        constant(merged)
      )(selectedPaths)
  )({ currentPath: [], selectedPaths: [] }) as O.Merge<TObject, TSource>;
