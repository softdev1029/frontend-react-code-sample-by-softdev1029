/* eslint-disable eslint-comments/disable-enable-pair */
import type { A, L, O } from "@softdev1029/type-utils";
import { Test } from "@softdev1029/type-utils";
import { includes, join, sum } from "lodash/fp";
import type {
  CondPair,
  CondPairArgs,
  CondPairResult,
  CondPairs,
  CondPairsArgs,
  CondPairsArgsList,
} from "./cond";

const { check, checks } = Test;

type NumberArgs = typeof numberArgs;
type NumberArg = L.UnionOf<NumberArgs>;
const numberArgs = [1, 2, 3, 4, 5] as const;

type NumberReturn = typeof numberReturn;
const numberReturn = 10 as const;

type StringArgs = typeof stringArgs;
type StringArg = L.UnionOf<StringArgs>;
const stringArgs = ["1", "2", "3", "4", "5"] as const;

const numberStringArgs = [...numberArgs, ...stringArgs] as const;

type StringReturn = typeof stringReturn;
const stringReturn = "12345" as const;

type ObjectArg = { hello: "world" };

type NumberArgsPair = typeof numberArgsPair;
const numberArgsPair = [
  (...args: L.List<number>) => args === numberArgs,
  (...args: L.List<NumberArg>) => sum(args),
] as const;

type NumberLiteralPair = typeof numberLiteralPair;
const numberLiteralPair = [
  (arg1: number, arg2: number, arg3: number, arg4: number, arg5: number) =>
    [arg1, arg2, arg3, arg4, arg5].toString() === numberArgs.toString(),
  (arg1: 1, arg2: 2, arg3: 3, arg4: 4, arg5: 5) =>
    sum([arg1, arg2, arg3, arg4, arg5]) as NumberReturn,
] as const;

type StringArgsPair = typeof stringArgsPair;
const stringArgsPair = [
  (...args: L.List<string>) => args === stringArgs,
  (...args: StringArgs) => join("", args) as StringReturn,
] as const;

type TypeGuardedPair = typeof typeGuardedPair;
const typeGuardedPair = [
  (arg: string | number): arg is StringArg | NumberArg =>
    includes(arg, numberStringArgs),
  (arg: StringArg | NumberArg) => [arg] as const,
] as const;

type NumberStringPair = typeof numberStringPair;
const numberStringPair = [
  (...args: L.List<string | number>) => args === numberStringArgs,
  (..._args: L.List<StringArg | NumberArg>) => null,
] as const;

type ObjectPair = typeof objectPair;
const objectPair = [
  (..._args: L.List<O.Record>) => true,
  (..._args: L.List<ObjectArg>) => ({}),
] as const;

type AnyPair = typeof anyPair;
const anyPair = [
  (...args: L.List) => args.length > 0,
  (..._args: L.List): any => [{}],
] as const;

type UnknownPair = typeof unknownPair;
const unknownPair = [
  (...args: L.List<unknown>) => args.length > 0,
  (..._args: L.List<unknown>): unknown => [{}],
] as const;

type VoidPair = typeof voidPair;
const voidPair = [() => true as const, () => {}] as const;

type NeverPair = typeof neverPair;
const neverPair = [
  (...args: L.List<number>) => args === numberArgs,
  (..._args: L.List<string>) => true,
] as const;

type EmptyPair0 = typeof emptyPair0;
const emptyPair0 = [() => true, () => ({} as unknown)] as const;

type EmptyPair1 = typeof emptyPair1;
const emptyPair1 = [(value: unknown) => true, () => ({} as unknown)] as const;

type EmptyPair2 = typeof emptyPair2;
const emptyPair2 = [() => true, (value: unknown) => ({} as unknown)] as const;

type EmptyTypeGuardPair = typeof emptyTypeGuardPair;
const emptyTypeGuardPair = [
  (arg: string | number): arg is StringArg | NumberArg =>
    includes(arg, numberStringArgs),
  () => [] as const,
] as const;

checks([
  check<
    CondPair<NumberArgsPair["0"], NumberArgsPair["1"]>,
    NumberArgsPair,
    Test.Pass
  >(),
  check<
    CondPair<NumberLiteralPair["0"], NumberLiteralPair["1"]>,
    NumberLiteralPair,
    Test.Pass
  >(),
  check<
    CondPair<StringArgsPair["0"], StringArgsPair["1"]>,
    StringArgsPair,
    Test.Pass
  >(),
  check<CondPair<ObjectPair["0"], ObjectPair["1"]>, ObjectPair, Test.Pass>(),
  check<CondPair<AnyPair["0"], AnyPair["1"]>, AnyPair, Test.Pass>(),
  check<CondPair<VoidPair["0"], VoidPair["1"]>, VoidPair, Test.Pass>(),
  check<CondPair<NeverPair["0"], NeverPair["1"]>, never, Test.Pass>(),
  check<CondPair<EmptyPair0["0"], EmptyPair0["1"]>, EmptyPair0, Test.Pass>(),
  check<CondPair<EmptyPair1["0"], EmptyPair1["1"]>, EmptyPair1, Test.Pass>(),
  check<CondPair<EmptyPair2["0"], EmptyPair2["1"]>, EmptyPair2, Test.Pass>(),
  check<
    CondPair<EmptyTypeGuardPair["0"], EmptyTypeGuardPair["1"]>,
    EmptyTypeGuardPair,
    Test.Pass
  >(),
]);

checks([
  check<CondPairs<[NumberArgsPair]>, [NumberArgsPair], Test.Pass>(),
  check<CondPairs<[NumberLiteralPair]>, [NumberLiteralPair], Test.Pass>(),
  check<CondPairs<[StringArgsPair]>, [StringArgsPair], Test.Pass>(),
  check<CondPairs<[ObjectPair]>, [ObjectPair], Test.Pass>(),
  check<CondPairs<[AnyPair]>, [AnyPair], Test.Pass>(),
  check<CondPairs<[VoidPair]>, [VoidPair], Test.Pass>(),
  check<CondPairs<[NeverPair]>, never, Test.Pass>(),
]);

checks([
  check<CondPairs<[NumberLiteralPair, StringArgsPair]>, never, Test.Pass>(),
  check<
    CondPairs<[StringArgsPair, TypeGuardedPair]>,
    [StringArgsPair, TypeGuardedPair],
    Test.Pass
  >(),
  check<
    CondPairs<[StringArgsPair, NumberStringPair]>,
    [StringArgsPair, NumberStringPair],
    Test.Pass
  >(),
  check<
    CondPairs<[NumberArgsPair, NumberLiteralPair]>,
    [NumberArgsPair, NumberLiteralPair],
    Test.Pass
  >(),
  check<
    CondPairs<[ObjectPair, AnyPair, VoidPair]>,
    [ObjectPair, AnyPair, VoidPair],
    Test.Pass
  >(),
  check<
    CondPairs<[NumberArgsPair, NumberLiteralPair, StringArgsPair]>,
    never,
    Test.Pass
  >(),
  check<
    CondPairs<
      [
        NumberArgsPair,
        NumberLiteralPair,
        StringArgsPair,
        ObjectPair,
        AnyPair,
        VoidPair
      ]
    >,
    never,
    Test.Pass
  >(),
  check<
    CondPairs<
      [
        NumberArgsPair,
        NumberLiteralPair,
        StringArgsPair,
        ObjectPair,
        AnyPair,
        VoidPair,
        NeverPair
      ]
    >,
    never,
    Test.Pass
  >(),
]);

checks([
  check<
    CondPairArgs<NumberArgsPair, CondPairsArgsList<[NumberArgsPair]>>,
    L.List<number>,
    Test.Pass
  >(),
  check<
    CondPairArgs<NumberLiteralPair, CondPairsArgsList<[NumberLiteralPair]>>,
    [arg1: number, arg2: number, arg3: number, arg4: number, arg5: number],
    Test.Pass
  >(),
  check<
    CondPairArgs<StringArgsPair, CondPairsArgsList<[StringArgsPair]>>,
    L.List<string>,
    Test.Pass
  >(),
  check<
    CondPairArgs<ObjectPair, CondPairsArgsList<[ObjectPair]>>,
    L.List<O.Record>,
    Test.Pass
  >(),
  check<
    CondPairArgs<AnyPair, CondPairsArgsList<[AnyPair]>>,
    L.List,
    Test.Pass
  >(),
  check<CondPairArgs<VoidPair, CondPairsArgsList<[VoidPair]>>, [], Test.Pass>(),
  check<
    CondPairArgs<NeverPair, CondPairsArgsList<[NeverPair]>>,
    never,
    Test.Pass
  >(),
]);

checks([
  check<CondPairsArgsList<[NumberArgsPair]>, [L.List<number>], Test.Pass>(),
  check<
    CondPairsArgsList<[NumberLiteralPair, StringArgsPair]>,
    [
      [arg1: number, arg2: number, arg3: number, arg4: number, arg5: number],
      L.List<string>
    ],
    Test.Pass
  >(),
  check<
    CondPairsArgsList<[ObjectPair, AnyPair, VoidPair]>,
    [L.List<O.Record>, L.List, []],
    Test.Pass
  >(),
  check<
    CondPairsArgsList<[NumberArgsPair, NumberLiteralPair, StringArgsPair]>,
    [
      L.List<number>,
      [arg1: number, arg2: number, arg3: number, arg4: number, arg5: number],
      L.List<string>
    ],
    Test.Pass
  >(),
  check<
    CondPairsArgsList<
      [
        NumberArgsPair,
        NumberLiteralPair,
        StringArgsPair,
        ObjectPair,
        AnyPair,
        VoidPair
      ]
    >,
    [
      L.List<number>,
      [arg1: number, arg2: number, arg3: number, arg4: number, arg5: number],
      L.List<string>,
      L.List<O.Record>,
      L.List,
      []
    ],
    Test.Pass
  >(),
  check<CondPairsArgsList<[NeverPair]>, [never], Test.Pass>(),
  check<
    CondPairsArgsList<
      [
        NumberArgsPair,
        NumberLiteralPair,
        StringArgsPair,
        ObjectPair,
        AnyPair,
        VoidPair,
        NeverPair
      ]
    >,
    [
      L.List<number>,
      [arg1: number, arg2: number, arg3: number, arg4: number, arg5: number],
      L.List<string>,
      L.List<O.Record>,
      L.List,
      [],
      never
    ],
    Test.Pass
  >(),
]);

checks([
  check<CondPairsArgs<[NumberArgsPair]>, L.List<number>, Test.Pass>(),
  check<CondPairsArgs<[AnyPair]>, L.List, Test.Pass>(),
  check<CondPairsArgs<[UnknownPair]>, L.List<unknown>, Test.Pass>(),
  check<CondPairsArgs<[VoidPair]>, [], Test.Pass>(),
  check<CondPairsArgs<[AnyPair, UnknownPair]>, L.List<unknown>, Test.Pass>(),
  check<
    CondPairsArgs<[NumberArgsPair, NumberArgsPair]>,
    L.List<number>,
    Test.Pass
  >(),
  check<
    CondPairsArgs<[NumberArgsPair, NumberLiteralPair]>,
    [
      arg1: number,
      arg2: number,
      arg3: number,
      arg4: number,
      arg5: number,
      ...rest: L.List<number>
    ],
    Test.Pass
  >(),
  check<CondPairsArgs<[NumberLiteralPair, StringArgsPair]>, never, Test.Pass>(),
  check<
    CondPairsArgs<[NumberLiteralPair, TypeGuardedPair]>,
    [arg1: number, arg2: number, arg3: number, arg4: number, arg5: number],
    Test.Pass
  >(),
  check<
    CondPairsArgs<[StringArgsPair, TypeGuardedPair]>,
    [arg: string, ...rest: L.List<string>],
    Test.Pass
  >(),
  check<
    CondPairsArgs<[StringArgsPair, NumberStringPair]>,
    L.List<string>,
    Test.Pass
  >(),
  check<CondPairsArgs<[AnyPair, VoidPair]>, L.List, Test.Pass>(),
  check<
    CondPairsArgs<[TypeGuardedPair, NumberStringPair, VoidPair]>,
    [arg: string | number, ...rest: L.List<string | number>],
    Test.Pass
  >(),
  check<
    CondPairsArgs<[AnyPair, UnknownPair, VoidPair]>,
    L.List<unknown>,
    Test.Pass
  >(),
  check<
    CondPairsArgs<[ObjectPair, AnyPair, VoidPair]>,
    L.List<O.Record>,
    Test.Pass
  >(),
  check<
    CondPairsArgs<[StringArgsPair, NumberStringPair, AnyPair]>,
    L.List<string>,
    Test.Pass
  >(),
  check<
    CondPairsArgs<[StringArgsPair, NumberStringPair, AnyPair, UnknownPair]>,
    L.List<string>,
    Test.Pass
  >(),
  check<
    CondPairsArgs<
      [StringArgsPair, NumberStringPair, AnyPair, UnknownPair, VoidPair]
    >,
    L.List<string>,
    Test.Pass
  >(),
  check<
    CondPairsArgs<[NumberArgsPair, NumberLiteralPair, StringArgsPair]>,
    never,
    Test.Pass
  >(),
  check<
    CondPairsArgs<
      [
        NumberArgsPair,
        NumberLiteralPair,
        StringArgsPair,
        ObjectPair,
        AnyPair,
        VoidPair
      ]
    >,
    never,
    Test.Pass
  >(),
  check<CondPairsArgs<[NeverPair]>, never, Test.Pass>(),
  check<
    CondPairsArgs<
      [
        NumberArgsPair,
        NumberLiteralPair,
        StringArgsPair,
        ObjectPair,
        AnyPair,
        VoidPair,
        NeverPair
      ]
    >,
    never,
    Test.Pass
  >(),
]);

checks([
  check<CondPairResult<NumberArgsPair>, number, Test.Pass>(),
  check<CondPairResult<NumberLiteralPair>, NumberReturn, Test.Pass>(),
  check<CondPairResult<StringArgsPair>, StringReturn, Test.Pass>(),
  check<CondPairResult<ObjectPair>, {}, Test.Pass>(),
  check<CondPairResult<AnyPair>, any, Test.Pass>(),
  check<CondPairResult<VoidPair>, void, Test.Pass>(),
  check<CondPairResult<NeverPair>, A.x, Test.Pass>(),
]);
