export type ConvertOptions = {
  cap?: boolean;
  curry?: boolean;
  fixed?: boolean;
  immutable?: boolean;
  rearg?: boolean;
};

export type Convertible<Before extends Function> = Before & {
  convert: <After extends Function = Before>(options: ConvertOptions) => After;
};
