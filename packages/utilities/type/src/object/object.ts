import type { A, L, U } from "@softdev1029/type-utils";
import type { Match } from "Any/_Internal";
import type { Modx } from "Object/_Internal";
import type { O } from "ts-toolbelt";

export * from "Object/_api";

export type At<Object extends any, Key extends A.Key> = Object extends L.List
  ? number extends L.Length<Object>
    ? Key extends number | `${number}`
      ? Object[never] | undefined
      : undefined
    : Key extends keyof Object
    ? Object[Key]
    : undefined
  : Key extends keyof Object
  ? Object[Key]
  : undefined;

export type Filter<
  T extends object,
  M extends any,
  match extends Match = "default"
> = Pick<T, FilterKeys<T, M, match>>;

type _FilterRecordKeys<T extends Record, M extends any, match extends Match> = {
  [Key in Keys<T>]-?: {
    1: never;
    0: Key;
  }[A.Is<T[Key], M, match>];
}[Keys<T>];

type _FilterObjectKeys<T extends object, M extends any, match extends Match> = {
  [Key in keyof T]-?: {
    1: never;
    0: Key;
  }[A.Is<T[Key], M, match>];
}[keyof T];

type _FilterKeys<
  T extends object,
  M extends any,
  match extends Match = "default"
> = T extends Record
  ? _FilterRecordKeys<T, M, match>
  : _FilterObjectKeys<T, M, match>;

export type FilterKeys<
  T extends object,
  M extends any,
  match extends Match = "default"
> = T extends unknown ? _FilterKeys<T, M, match> : never;

export type Genericize<T1 extends unknown, T2 extends object = Record> =
  | U.Exclude<T1, object>
  | T2;

export type Keys<T extends object> = U.Keys<T>;

type _Omit<T extends object, K extends A.Key> = _Pick<T, Exclude<Keys<T>, K>>;

export type Omit<T extends object, K extends A.Key> = T extends unknown
  ? _Omit<T, K>
  : never;

export type PathArray<Object extends object> =
  | (Object extends L.List ? L.Paths<Object> : O.Paths<Object>)
  | L.List<A.Key>;

type __Pick<T extends object, K extends keyof T> = {
  [P in K]: T[P];
} & {};

type _Pick<T extends object, K extends A.Key> = __Pick<T, keyof T & K>;

export type Pick<T extends object, K extends A.Key> = T extends unknown
  ? _Pick<T, K>
  : never;

export type Record<
  K extends A.Key = A.Key,
  T = unknown,
  modx extends Modx = ["!", "W"]
> = O.Record<K, T, modx>;

export type RecordOf<T extends object> = T extends Record
  ? T
  : O.Pick<T, keyof T>;

type _UnionOf<O extends object> = O[keyof O];

export type UnionOf<O extends object> = O extends unknown ? _UnionOf<O> : never;
