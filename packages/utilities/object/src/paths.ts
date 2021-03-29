import { mapWithIndex } from "@softdev1029/collection-utils";
import type { L, O } from "@softdev1029/type-utils";
import { cond, overSome } from "@softdev1029/util-lib";
import {
  flatten,
  flow,
  isArray as _isArray,
  isObjectLike,
  map,
} from "lodash/fp";
import { toPairs } from "./to-pairs";

export type Paths<T extends L.List | O.Record> = L.List<O.PathArray<T>>;

const isArray = (value: unknown): value is L.List => _isArray(value);
const isObject = (value: unknown): value is O.Record => isObjectLike(value);

const isArrayOrObject = overSome([isArray, isObject] as const);

const _paths = <T extends L.List | O.Record>(
  value: T,
  currentPath: O.PathArray<T> = []
): Paths<T> =>
  flow(
    cond([
      [
        isArray,
        mapWithIndex((value, index) =>
          isArrayOrObject(value)
            ? _paths(value, [...currentPath, `${index}`])
            : [currentPath]
        ),
      ],
      [
        isObject,
        flow(
          toPairs,
          map(([key, value]) =>
            isArrayOrObject(value)
              ? _paths(value, [...currentPath, key])
              : [currentPath]
          )
        ),
      ],
    ] as const),
    flatten
  )(value);

export const paths = <T extends L.List | O.Record>(value: T): Paths<T> =>
  _paths(value, []);
