import type { A, B, L } from "@softdev1029/type-utils";
import type { Match } from "Any/_Internal";
import type { U } from "ts-toolbelt";

export * from "Union/_api";

export type Has<Value, PredicateValue> = B.Not<
  A.Equals<Select<Value, PredicateValue>, never>
>;

type __Keys<Value> = {
  [K in keyof Value]: string extends K ? A.x : number extends K ? A.x : K;
} extends { [_ in keyof Value]: infer X }
  ? {
      0: Exclude<X, A.x>;
      1: keyof Value;
    }[A.Equals<X, A.x>]
  : never;

type _Keys<Value> = __Keys<Value> extends infer X ? A.Cast<X, A.Key> : never;

export type Keys<Value> = Value extends unknown ? _Keys<Value> : never;

type _ListOf<Value, Result extends L.List = [], EndValue = U.Last<Value>> = {
  0: _ListOf<U.Filter<Value, EndValue, "equals">, L.Prepend<Result, EndValue>>;
  1: Result;
}[A.Extends<[Value], [never]>];
export type ListOf<Value extends U.Union> = _ListOf<Value> extends infer X
  ? A.Cast<X, L.List>
  : never;

export type NeverWith<Value, PredicateValue> = {
  0: Value;
  1: never;
}[Has<Value, PredicateValue>];

export type NeverWithX<Value> = NeverWith<Value, A.x>;

export type Replace<
  Value extends U.Union,
  PredicateValue extends U.Union,
  Replacement extends U.Union,
  MatchType extends Match = "default"
> = Value extends unknown
  ? A.Is<Value, PredicateValue, MatchType> extends 1
    ? Replacement
    : Value
  : never;

export type Select<
  Value extends any,
  PredicateValue extends any,
  MatchType extends Match = "default"
> = Value extends unknown
  ? A.Is<Value, PredicateValue, MatchType> extends B.True
    ? Value & PredicateValue
    : never
  : never;
