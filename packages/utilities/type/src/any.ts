import type { L, U } from "@softdev1029/type-utils";
import type { A } from "ts-toolbelt";

export * from "Any/_api";

export type At<A extends any, K extends A.Key> = A extends L.List
  ? number extends L.Length<A>
    ? K extends number | `${number}`
      ? A[never] | undefined
      : undefined
    : K extends keyof A
    ? A[K]
    : undefined
  : K extends keyof A
  ? A[K]
  : undefined;

export type Guard<T, U extends T> = U;

export type Index = U.Filter<A.Key, symbol>;

export type IsAny<T> = A.Equals<T, any>;
export type IsNever<T> = A.Equals<T, never>;
export type IsUnknown<T> = A.Equals<T, unknown>;
