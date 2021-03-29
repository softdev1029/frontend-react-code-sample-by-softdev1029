import type { F, L } from "@softdev1029/type-utils";
import { cond } from "./cond";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const branch = <
  Condition extends F.Predicate,
  Left extends F.Func,
  Right extends F.Func
>(
  condition: Condition,
  success: Left,
  failure: Right
) =>
  cond([
    [condition, success],
    [(..._: L.List) => true, failure],
  ]);
