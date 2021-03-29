import { join } from "@softdev1029/collection-utils";
import type { L, O } from "@softdev1029/type-utils";
import {
  concat,
  flow,
  isArray,
  isUndefined,
  map,
  over,
  size,
  sum,
  take,
} from "lodash/fp";
import { get } from "../get";
import type { Paths } from "../paths";
import type {
  Customizer,
  HashCache,
  ListCache,
  MapCache,
  Stack,
} from "./types";

const dataKey = "__data__" as const;
type DataKey = typeof dataKey;

const stackDataPath = [dataKey, dataKey] as const;
type StackDataPath = typeof stackDataPath;
type StackData = O.P.At<Stack, StackDataPath>;

const isListCacheData = (
  stackData: StackData
): stackData is ListCache[DataKey] => isArray(stackData);

type MapCacheData = MapCache[DataKey];
const getMapCacheDataSize = (data: MapCacheData): number =>
  flow(
    over<Map<unknown, unknown> | HashCache[DataKey]>([
      ({ hash }: MapCacheData) => hash.__data__,
      ({ map }: MapCacheData) => map,
      ({ string }: MapCacheData) => string.__data__,
    ]),
    map(size),
    sum
  )(data);

const getStackDataSize = (stackData: StackData): number =>
  isListCacheData(stackData) ? size(stackData) : getMapCacheDataSize(stackData);

export type PathState = {
  currentPath: O.PathArray<L.List | O.Record>;
  selectedPaths: Paths<L.List | O.Record>;
};

export const selectUndefinedPaths = (pathState: PathState): Customizer => (
  _objValue,
  srcValue,
  key,
  _object,
  _source,
  stack
): void =>
  flow(
    get<StackDataPath, Stack>(join(".", stackDataPath)),
    (data) => concat(take(getStackDataSize(data), pathState.currentPath), key),
    (path) => {
      pathState.currentPath = path;
      pathState.selectedPaths = isUndefined(srcValue)
        ? [...pathState.selectedPaths, path]
        : pathState.selectedPaths;
    }
  )(stack);
