import type { F, L, O } from "@softdev1029/type-utils";

export type Cache = {
  clear: F.Func<[], void>;
  delete: F.Predicate<[key: unknown]>;
  get: F.Func<[key: unknown]>;
  has: F.Predicate<[key: unknown]>;
  set: F.Func<[key: unknown, value: unknown], Stack>;
};

export type HashCache = Cache & {
  __data__: O.Record<any>;
};

export type ListCache = Cache & {
  __data__: L.List<[unknown, unknown]>;
};

export type MapCache = Cache & {
  __data__: {
    hash: HashCache;
    map: Map<unknown, unknown>;
    string: HashCache;
  };
};

export type Stack = Cache & {
  __data__: ListCache | MapCache;
};

export type Customizer = F.Func<
  [
    objValue: unknown,
    srcValue: unknown,
    key: string,
    object: O.Record,
    source: O.Record,
    stack: Stack
  ],
  unknown
>;
