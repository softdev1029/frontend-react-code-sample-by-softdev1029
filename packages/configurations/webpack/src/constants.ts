export enum CacheGroupChunks {
  All = "all",
  Async = "async",
  Initial = "initial",
}

export enum Devtool {
  CheapModuleSourceMap = "cheap-module-source-map",
  CheapSourceMap = "cheap-source-map",
  Eval = "eval",
  EvalCheapModuleSourceMap = "eval-cheap-module-source-map",
  EvalCheapSourceMap = "eval-cheap-source-map",
  EvalNoSourcesCheapModuleSourceMap = "eval-nosources-cheap-module-source-map",
  EvalNoSourcesCheapSourceMap = "eval-nosources-cheap-source-map",
  EvalNoSourcesSourceMap = "eval-nosources-source-map",
  EvalSourceMap = "eval-source-map",
  HiddenCheapModuleSourceMap = "hidden-cheap-module-source-map",
  HiddenCheapSourceMap = "hidden-cheap-source-map",
  HiddenNoSourcesSourceMap = "hidden-nosources-source-map",
  HiddenNoSourcesCheapModuleSourceMap = "hidden-nosources-cheap-module-source-map",
  HiddenNoSourcesCheapSourceMap = "hidden-nosources-cheap-source-map",
  HiddenSourceMap = "hidden-source-map",
  InlineCheapModuleSourceMap = "inline-cheap-module-source-map",
  InlineCheapSourceMap = "inline-cheap-source-map",
  InlineNoSourcesCheapModuleSourceMap = "inline-nosources-cheap-module-source-map",
  InlineNoSourcesCheapSourceMap = "inline-nosources-cheap-source-map",
  InlineNoSourcesSourceMap = "inline-nosources-source-map",
  InlineSourceMap = "inline-source-map",
  NoSourcesCheapModuleSourceMap = "nosources-cheap-module-source-map",
  NoSourcesCheapSourceMap = "nosources-cheap-source-map",
  NoSourcesSourceMap = "nosources-source-map",
  SourceMap = "source-map",
}

export enum LibraryTarget {
  Amd = "amd",
  AmdRequire = "amd-require",
  Assign = "assign",
  AssignProperties = "assign-properties",
  Commonjs = "commonjs",
  Commonjs2 = "commonjs2",
  CommonjsModule = "commonjs-module",
  Global = "global",
  Jsonp = "jsonp",
  Module = "module",
  Self = "self",
  System = "system",
  This = "this",
  Umd = "umd",
  Umd2 = "umd2",
  Var = "var",
  Window = "window",
}

export enum Mode {
  Development = "development",
  None = "none",
  Production = "production",
}

export enum ModuleIds {
  Deterministic = "deterministic",
  Hashed = "hashed",
  Named = "named",
  Natural = "natural",
  Size = "size",
}

export enum RuntimeChunk {
  Multiple = "multiple",
  Single = "single",
}

export enum Target {
  AsyncNode = "async-node",
  Browserslist = "browserslist",
  ElectronMain = "electron-main",
  ElectronRenderer = "electron-renderer",
  ElectronPreload = "electron-preload",
  Es3 = "es3",
  Es5 = "es5",
  Es6 = "es6",
  Es2015 = "es2015",
  Es2016 = "es2016",
  Es2017 = "es2017",
  Es2018 = "es2018",
  Es2019 = "es2019",
  Es2020 = "es2020",
  Esnext = "esnext",
  Node = "node",
  NodeWebkit = "node-webkit",
  Nwjs = "nwjs",
  Web = "web",
  Webworker = "webworker",
}
