import type { O } from "@softdev1029/type-utils";
import type { Dictionary, NumericDictionary } from "lodash";
import { LoDashFp, LodashMap, map } from "lodash/fp";
import type { Convertible } from "./types";

export const mapWithIndex: {
  <T, TResult>(iteratee: (value: T, index: number) => TResult): (
    collection: T[] | ArrayLike<T> | null | undefined
  ) => TResult[];
  <T>(iteratee: LoDashFp["placeholder"], collection: T[] | null | undefined): <
    TResult
  >(
    iteratee: (value: T, index: number) => TResult
  ) => TResult[];
  <T, TResult>(
    iteratee: (value: T, index: number) => TResult,
    collection: T[] | ArrayLike<T> | null | undefined
  ): TResult[];
  <T>(
    iteratee: LoDashFp["placeholder"],
    collection: ArrayLike<T> | null | undefined
  ): <TResult>(iteratee: (value: T, index: number) => TResult) => TResult[];
  <T extends O.Record, K extends keyof T, TResult>(
    iteratee: (value: T[keyof T], index: K) => TResult
  ): (collection: T | null | undefined) => TResult[];
  <T extends O.Record>(
    iteratee: LoDashFp["placeholder"],
    collection: T | null | undefined
  ): <TResult, K extends keyof T>(
    iteratee: (value: T[keyof T], index: K) => TResult
  ) => TResult[];
  <T extends O.Record, K extends keyof T, TResult>(
    iteratee: (value: T[keyof T], index: K) => TResult,
    collection: T | null | undefined
  ): TResult[];
  <T, K extends keyof T>(iteratee: K): (
    collection: Dictionary<T> | NumericDictionary<T> | null | undefined
  ) => Array<T[K]>;
  <T>(
    iteratee: LoDashFp["placeholder"],
    collection: Dictionary<T> | NumericDictionary<T> | null | undefined
  ): {
    <K extends keyof T>(iteratee: K): Array<T[K]>;
    (iteratee: string): any[];
    (iteratee: O.Record): boolean[];
  };
  <T, K extends keyof T>(
    iteratee: K,
    collection: Dictionary<T> | NumericDictionary<T> | null | undefined
  ): Array<T[K]>;
  (iteratee: string): <T>(
    collection: Dictionary<T> | NumericDictionary<T> | null | undefined
  ) => any[];
  <T>(
    iteratee: string,
    collection: Dictionary<T> | NumericDictionary<T> | null | undefined
  ): any[];
  (iteratee: O.Record): <T>(
    collection: Dictionary<T> | NumericDictionary<T> | null | undefined
  ) => boolean[];
  <T>(
    iteratee: O.Record,
    collection: Dictionary<T> | NumericDictionary<T> | null | undefined
  ): boolean[];
} = (map as Convertible<LodashMap>).convert({ cap: false });
