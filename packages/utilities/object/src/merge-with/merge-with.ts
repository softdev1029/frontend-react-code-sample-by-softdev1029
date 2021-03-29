import type { L, O } from "@softdev1029/type-utils";
import { mergeWith as _mergeWith } from "lodash/fp";
import type { Customizer } from "./types";

export type MergeWith = {
  (customizer: Customizer): <TObject extends L.List | O.Record>(
    object: TObject
  ) => <TSource extends L.List | O.Record>(
    source: TSource
  ) => TObject & TSource;
  (customizer: Customizer): <
    TObject extends L.List | O.Record,
    TSource extends L.List | O.Record
  >(
    object: TObject,
    source: TSource
  ) => TObject & TSource;
  <TObject extends L.List | O.Record>(
    customizer: Customizer,
    object: TObject
  ): <TSource extends L.List | O.Record>(source: TSource) => TObject & TSource;
  <TObject extends L.List | O.Record, TSource extends L.List | O.Record>(
    customizer: Customizer,
    object: TObject,
    source: TSource
  ): TObject & TSource;
};

export const mergeWith: MergeWith = (_mergeWith as unknown) as MergeWith;
