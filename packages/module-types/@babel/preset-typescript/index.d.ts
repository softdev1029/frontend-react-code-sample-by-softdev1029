declare module "@babel/preset-typescript" {
  export type Options = {
    isTSX?: boolean;
    jsxPragma?: string;
    jsxPragmaFrag?: string;
    allExtensions?: boolean;
    allowNamespaces?: boolean;
    allowDeclareFields?: boolean;
    onlyRemoveTypeImports?: boolean;
  };
}
