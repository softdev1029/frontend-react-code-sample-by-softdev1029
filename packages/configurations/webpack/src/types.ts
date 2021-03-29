import type { L, O } from "@softdev1029/type-utils";
import type { Configuration, ModuleOptions } from "webpack";
import type {
  AllowlistOption,
  ImportTypeCallback,
  ModulesFromFileType,
} from "webpack-node-externals";
import type { LibraryTarget } from "./constants";

export type ExternalsFunction = (
  data: { context: string; request: string },
  callback: (err?: Error | null, result?: string) => void
) => void;

export type ExternalItem =
  | string
  | RegExp
  | { [index: string]: string | boolean | string[] | { [index: string]: any } }
  | ExternalsFunction;

export type WebpackConfig = O.Omit<Configuration, "externals"> & {
  devServer?: {
    host?: string;
    static?: string;
    headers: O.Record<string, string>;
  };
  externals?: ExternalItem | ExternalItem[];
};

export type Context = WebpackConfig["context"];

export type ImportType =
  | LibraryTarget.Amd
  | LibraryTarget.AmdRequire
  | LibraryTarget.Assign
  | LibraryTarget.Commonjs
  | LibraryTarget.CommonjsModule
  | LibraryTarget.Global
  | "import"
  | LibraryTarget.Jsonp
  | LibraryTarget.Module
  | "promise"
  | "script"
  | "self"
  | LibraryTarget.System
  | LibraryTarget.This
  | LibraryTarget.Umd
  | LibraryTarget.Umd2
  | LibraryTarget.Var
  | LibraryTarget.Window;

export type ModuleRule = L.UnionOf<NonNullable<ModuleOptions["rules"]>>;

export type NodeExternalsConfig = {
  allowlist?: AllowlistOption[] | AllowlistOption;
  binaryDirs?: string[];
  importType?: ImportType | ImportTypeCallback;
  modulesDir?: string;
  additionalModuleDirs?: string[];
  modulesFromFile?: boolean | ModulesFromFileType;
  includeAbsolutePaths?: boolean;
};
