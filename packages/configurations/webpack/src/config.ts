import { isArray } from "@softdev1029/collection-utils";
import { merge } from "@softdev1029/object-utils";
import type { C, L, O } from "@softdev1029/type-utils";
import {
  findIndex,
  flow,
  initial,
  isFunction,
  isString,
  last,
  map,
  reduce,
  update,
  values,
} from "lodash/fp";
import type { WebpackPluginInstance } from "webpack";
import { updateContextPaths } from "./context";
import type { Context, WebpackConfig } from "./types";

export type PluginPair<
  PluginCtor extends C.Class<WebpackPluginInstance> = C.Class<WebpackPluginInstance>
> = C.CtorArgsPair<PluginCtor, [context: Context]>;

export type Config = O.Omit<WebpackConfig, "plugins"> & {
  plugins?: L.List<
    L.UnionOf<NonNullable<WebpackConfig["plugins"]>> | PluginPair
  >;
};

type Plugins = Config["plugins"];
type PluginList = NonNullable<Plugins>;
type Plugin = L.UnionOf<PluginList>;

const getPluginArgs = (
  context: Context,
  pluginArgs: PluginPair["1"]
): L.List<unknown> =>
  isFunction(pluginArgs) ? pluginArgs(context) : pluginArgs;

const mergePluginPairs = (
  [ctor, args1]: PluginPair,
  [_, args2]: PluginPair
): PluginPair => [
  ctor,
  (context: Context) =>
    values(merge(getPluginArgs(context, args1), getPluginArgs(context, args2))),
];

const matchExistingPairs = ([pluginCtor, pluginArgs]: PluginPair) => (
  plugins: PluginList
) =>
  flow(
    findIndex((plugin: Plugin) => isArray(plugin) && plugin[0] === pluginCtor),
    (index): PluginList =>
      index !== -1
        ? (update(
            `${index}`,
            (pluginPair: PluginPair) =>
              mergePluginPairs(pluginPair, [pluginCtor, pluginArgs]),
            plugins
          ) as PluginList)
        : [...plugins, [pluginCtor, pluginArgs]]
  )(plugins);

const mergePlugins = (plugins: Plugins): Plugins =>
  isArray(plugins)
    ? reduce<Plugin, PluginList>(
        (plugins, plugin) =>
          isArray(plugin)
            ? matchExistingPairs(plugin)(plugins)
            : [...plugins, plugin],
        [],
        plugins
      )
    : plugins;

const instantiatePluginPair = (context: Context) => ([
  Plugin,
  pluginArgs,
]: PluginPair) => new Plugin(...getPluginArgs(context, pluginArgs));

const getWebpackPlugins = (context: Context) => (plugins: Plugins) =>
  isArray(plugins)
    ? map(
        (plugin) =>
          isArray(plugin) ? instantiatePluginPair(context)(plugin) : plugin,
        plugins
      )
    : undefined;

const createWebpackConfig = (
  context: Context,
  { plugins, ...config }: Config
): WebpackConfig =>
  merge<WebpackConfig, WebpackConfig>(
    {
      context,
      plugins: getWebpackPlugins(context)(plugins),
    },
    isString(context) ? updateContextPaths(context)(config) : config
  );

const getContext = reduce<Config, Context>(
  (context, config) => config.context ?? context,
  undefined
);

export const createConfig = (...configs: L.List<Config>): WebpackConfig =>
  flow(
    reduce<Config, L.List<Config>>(
      (configs, { plugins, ...config }) => [
        ...initial(configs),
        config,
        {
          plugins: [...(last(configs)?.plugins ?? []), ...(plugins ?? [])],
        },
      ],
      []
    ),
    (configs) => [
      ...initial(configs),
      {
        plugins: mergePlugins(last(configs)?.plugins ?? []),
      },
    ],
    reduce<Config, WebpackConfig>(
      (webpackConfig, config) =>
        merge(
          webpackConfig,
          createWebpackConfig(webpackConfig.context, config)
        ),
      {
        context: getContext(configs),
      }
    )
  )(configs);
