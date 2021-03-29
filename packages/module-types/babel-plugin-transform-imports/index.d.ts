declare module "babel-plugin-transform-imports" {
  export type Options = {
    [key: string]: {
      transform:
        | string
        | ((importName: string, matches: RegExpExecArray) => string);
      preventFullImport?: boolean;
      skipDefaultConversion?: boolean;
    };
  };
}
