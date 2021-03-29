declare module "@babel/preset-react" {
  export type AutomaticRuntimeOptions = {
    importSource?: string;
  };

  export type ClassicRuntimeOptions = {
    pragma?: string;
    pragmaFrag?: string;
    useBuiltIns?: boolean;
    useSpread?: boolean;
  };

  export type Options = {
    runtime?: "classic" | "automatic";
    development?: boolean;
    throwIfNamespace?: boolean;
  };
}
