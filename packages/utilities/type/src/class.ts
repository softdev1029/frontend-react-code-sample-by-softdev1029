/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { F, L } from "@softdev1029/type-utils";

export type Class<
  Instance extends object = object,
  Params extends L.List = L.List
> = new (...args: Params) => Instance;

export type InstanceOf<Ctor extends Class> = Ctor extends Class<
  infer Instance,
  infer _Params
>
  ? Instance
  : any;

export type Parameters<Ctor extends Class> = Ctor extends Class<
  infer _Instance,
  infer Params
>
  ? Params
  : never;

export type CtorArgsPair<Ctor extends Class, Context extends L.List = []> = [
  Ctor,
  Parameters<Ctor> | F.Func<Context, Parameters<Ctor>>
];
