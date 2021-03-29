import type { L } from "@softdev1029/type-utils";

export * from "Function/_api";

export type Func<
  Args extends L.List = L.List,
  Result extends unknown = unknown
> = (...args: Args) => Result;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Params<F extends Func> = F extends Func<infer Args, infer _Result>
  ? Args
  : never;

export type Return<F extends Func> = F extends Func<any, infer Result>
  ? Result
  : never;

export type Predicate<
  Args extends L.List = L.List,
  Result extends boolean = boolean
> = Func<Args, Result>;

export type GuardedPredicate<
  Args extends L.List = L.List,
  TypeGuard = unknown
> = (value: Args[0], ...args: L.Tail<Args>) => value is TypeGuard;

export type StubArray<T> = Func<[], T[]>;
