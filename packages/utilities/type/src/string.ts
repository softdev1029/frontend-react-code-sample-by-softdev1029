import type { A, I, L, M, O, U } from "@softdev1029/type-utils";

export * from "String/_api";

export type CarriageReturn = "\r";
export type NewLine = "\n";
export type LineBreak = CarriageReturn | NewLine;
export type Space = " ";
export type Tab = "\t";
export type Whitespace = Space | Tab | LineBreak;

export type LetterCase = "upper" | "lower";

// prettier-ignore
type _Letter =
  | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M"
  | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";

export type Letter<Case extends LetterCase = LetterCase> =
  | (Case extends "upper" ? _Letter : never)
  | (Case extends "lower" ? Lowercase<_Letter> : never);

// prettier-ignore
export type Numeral = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0";

export type Alphanumeric<Case extends LetterCase = LetterCase> =
  | Letter<Case>
  | Numeral;

export type Interpolable = U.Exclude<M.Primitive, Symbol>;

export type Literal = NonNullable<Interpolable>;

export type IsEmpty<Value extends string> = A.Is<Trim<Value>, "">;

export type ToString<Value extends Interpolable> = `${Value}`;

export type At<Value extends string, Index extends number> = O.P.At<
  Split<"", Value>,
  [Index]
>;

type ___Concat<
  String extends string,
  Value extends L.List<Interpolable>,
  Result extends string = String,
  Iteration extends I.Iteration = I.IterationOf<"0">
> = {
  0: ___Concat<
    String,
    Value,
    `${Result}${Value[I.Pos<Iteration>]}`,
    I.Next<Iteration>
  >;
  1: Result;
}[A.Extends<I.Pos<Iteration>, L.Length<Value>>];

type __Concat<String extends string, Value extends L.List<Interpolable>> = {
  0: ___Concat<String, Value>;
  1: `${String}${Value[0]}`;
}[A.Equals<L.Length<Value, "s">, "1">];

type _Concat<
  String extends string,
  Value extends Interpolable | L.List<Interpolable>
> = __Concat<String, Value extends L.List ? Value : [Value]> extends infer X
  ? A.Cast<X, string>
  : never;

export type Concat<
  String extends string,
  Value extends Interpolable | L.List<Interpolable>
> = String extends unknown
  ? Value extends unknown
    ? _Concat<String, Value>
    : never
  : never;

type _Join<
  Seperator extends string,
  List extends L.List<Interpolable>,
  Result extends string = ""
> = List extends [Interpolable]
  ? `${Result}${List[0]}`
  : _Join<Seperator, L.Tail<List>, `${Result}${List[0]}${Seperator}`>;

export type Join<
  Seperator extends string,
  List extends L.List<Interpolable>
> = List extends []
  ? ""
  : number extends L.Length<List>
  ? string
  : _Join<Seperator, List>;

export type Length<Value extends string> = L.Length<Split<"", Value>>;

export type Replace<
  Pattern extends Interpolable,
  Replacement extends Interpolable,
  Value extends string
> = Value extends `${infer Left}${Pattern}${infer Right}`
  ? Replace<Pattern, Replacement, `${Left}${Replacement}${Right}`>
  : Value;

type _Split<
  Seperator extends string,
  Value extends string,
  Result extends string[] = []
> = Value extends `${infer Left}${Seperator}${infer Right}`
  ? _Split<Seperator, Right, [...Result, Left]>
  : [...Result, Value];

export type Split<
  Seperator extends string,
  Value extends string
> = Seperator extends ""
  ? L.Pop<_Split<Seperator, Value>>
  : _Split<Seperator, Value>;

export type TrimStart<
  V extends string,
  C extends string = " "
> = V extends `${C}${infer R}` ? TrimStart<R, C> : V;

export type TrimEnd<
  V extends string,
  C extends string = " "
> = V extends `${infer R}${C}` ? TrimEnd<R, C> : V;

export type Trim<V extends string, C extends string = " "> = TrimStart<
  TrimEnd<V, C>,
  C
>;
