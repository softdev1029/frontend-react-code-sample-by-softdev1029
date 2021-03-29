import type { Options } from "prettier";

export type Override = {
  files: string | string[];
  options: Options;
  excludeFiles?: string | string[];
};

export const overrides: Override[] = [
  {
    files: ["*.ts", "*.tsx"],
    options: {
      parser: "babel-ts",
    },
  },
];
