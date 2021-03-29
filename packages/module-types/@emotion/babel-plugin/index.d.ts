declare module "@emotion/babel-plugin" {
  export type Options = {
    sourceMap?: boolean;
    autoLabel?: "dev-only" | "always" | "never";
    labelFormat?: string;
    cssPropOptimization?: boolean;
  };
}
