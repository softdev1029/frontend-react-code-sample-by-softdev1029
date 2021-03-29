/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

/**
 * Manifest files (also called `package.json` because of their name) contain everything needed to describe the settings unique to one particular package. Project will contain multiple such manifests if they use the workspace feature, as each workspace is described through its own manifest. Note that defaults for these fields can be set via the `initFields` settings.
 */
export interface JSONSchemaForYarnManifestFiles {
  /**
   * The name of the package. Used to identify it across the application, especially amongst multiple workspaces. The first part of the name (here `@scope/`) is optional and is used as a namespace).
   */
  name?: string;
  /**
   * The version of the package. Usually doesn't have any impact on your project, except when it is a workspace - then its version must match the specified ranges for the workspace to be selected as resolution candidate.
   */
  version?: string;
  /**
   * A Node.js v13.x [option](https://nodejs.org/api/esm.html#esm_package_json_type_field). Possible values are `commonjs` (the default) and `module`. If `module`, Yarn will generate a `.pnp.cjs` file when using PnP. If `commonjs`, Yarn will generate a `.pnp.js` file when using PnP.
   */
  type?: "commonjs" | "module";
  /**
   * If true, the package is considered private and Yarn will refuse to publish it regardless of the circumstances. Setting this flag also unlocks some features that wouldn't make sense in published packages, such as workspaces.
   */
  private?: boolean;
  /**
   * An SPDX identifier that indicates under which license is your package distributed.
   */
  license?: string;
  /**
   * The path that will be used to resolve the qualified path to use when accessing the package by its name. This field can be modified at publish-time through the use of the `publishConfig.main` field.
   */
  main?: string;
  /**
   * The path that will be used when an ES6-compatible environment will try to access the package by its name. Doesn't have any direct effect on Yarn itself.
   */
  module?: string;
  /**
   * An enumeration used by the linker plugins to figure which linker should install a specific package. Only some values are allowed, consult the documentation to know more.
   */
  languageName?: string;
  /**
   * A field used to expose some executable Javascript files to the parent package. Any entry listed here will be made available through the `$PATH`. Note that it is very advised to only expose Javascript files for portability reasons (shellscripts and non-js binaries require the user to have a specific shell, and are incompatible with zip access).
   */
  bin?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(.+)$".
     */
    [k: string]: string;
  };
  /**
   * A field used to list small shell scripts that will be executed when running `yarn run`. Scripts are by default executed by a miniature shell, so some advanced features might not be available (if you have more complex needs, we recommend you to just execute a Javascript file). Note that scripts containing `:` (the colon character) are globals to your project and can be called regardless of your current workspace. Finally, be aware that scripts are always executed relative to the closest workspace (never the cwd).
   */
  scripts?: {};
  /**
   * The set of dependencies that must be made available to the current package in order for it to work properly. Consult the list of supported ranges for more information.
   */
  dependencies?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(?:@([^/]+?)/)?([^/]+?)$".
     */
    [k: string]: string;
  };
  /**
   * Similar to the `dependencies` field, except that these entries will not be required to build properly should they have any build script. Note that such dependencies must still be resolvable and fetchable (otherwise we couldn't store it in the lockfile, which could lead to non-reproducible installs) - only the build step is optional.
   *
   * **This field is usually not what you're looking for**, unless you depend on the `fsevents` package. If you need a package to be required only when a specific feature is used then use an optional peer dependency. Your users will have to satisfy it should they use the feature, but it won't cause the build errors to be silently swallowed when the feature is needed.
   */
  optionalDependencies?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(?:@([^/]+?)/)?([^/]+?)$".
     */
    [k: string]: string;
  };
  /**
   * Similar to the `dependencies` field, except that these dependencies are only installed on local installs and will never be installed by the consumers of your package. Note that because that would lead to different install trees depending on whether the install is made in "production" or "development" mode, Yarn doesn't offer a way to prevent the installation of dev dependencies at the moment.
   */
  devDependencies?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(?:@([^/]+?)/)?([^/]+?)$".
     */
    [k: string]: string;
  };
  /**
   * Peer dependencies are inherited dependencies - the consumer of your package will be tasked to provide them. This is typically what you want when writing plugins, for example. Note that peer dependencies can also be listed as regular dependencies; in this case, Yarn will use the package provided by the ancestors if possible, but will fallback to the regular dependencies otherwise.
   */
  peerDependencies?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(?:@([^/]+?)/)?([^/]+?)$".
     */
    [k: string]: string;
  };
  /**
   * Workspaces are an optional feature used by monorepos to split a large project into semi-independent subprojects, each one listing their own set of dependencies. The `workspaces` field is a list of glob patterns that match all directories that should become workspaces of your application.
   */
  workspaces?: string[];
  /**
   * This field lists some extra information related to the dependencies listed in the `dependencies` and `devDependencies` fields. In the context of a workspaced project most of these settings will affect *all workspaces* and as such must be specified at the *root* of the project (except if noted otherwise, the `dependenciesMeta` field will be ignored if found within a workspace).
   */
  dependenciesMeta?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(?:@([^/]+?)/)?([^/]+?)$".
     */
    [k: string]: {
      /**
       * If false, the package will never be built. When the global settings `enableScripts` is toggled off, setting this additional flag will also downgrade the warning into a simple notice for this specific package.
       */
      built?: boolean;
      /**
       * If true, the build isn't required to succeed for the install to be considered a success. It's what the `optionalDependencies` field compiles down to.
       *
       * **This settings will be applied even when found within a nested manifest**, but the highest requirement in the dependency tree will prevale.
       */
      optional?: boolean;
      /**
       * If true, the specified package will be automatically unplugged at install time. This should only be needed for packages that contain scripts in other languages than Javascript (for example `nan` contains C++ headers).
       */
      unplugged?: boolean;
      [k: string]: unknown;
    };
  };
  /**
   * This field lists some extra information related to the dependencies listed in the `peerDependencies` field.
   */
  peerDependenciesMeta?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(?:@([^/]+?)/)?([^/]+?)$".
     */
    [k: string]: {
      /**
       * If true, the selected peer dependency will be marked as optional by the package manager and the consumer omitting it won't be reported as an error.
       */
      optional?: boolean;
      [k: string]: unknown;
    };
  };
  /**
   * This field allows you to instruct Yarn to use a specific resolution instead of anything the resolver would normally pick. This is useful to enforce all your packages to use a single version of a dependency, or backport a fix. The syntax for the resolution key accepts one level of specificity, so all the following examples are correct.
   * Note: When a path is relative, like it can be with the `file:` and `portal:` protocols, it is resolved relative to the path of the project.
   *
   * Note that the `resolution` field can only be set at the root of the project, and will generate a warning if used in any other workspace.
   */
  resolutions?: {};
  /**
   * This field instructs Yarn to either force-extract its content on the disk (useful when you need to ship executable binaries for a reason or another) or to force it to stay within its archive (useful when you want your package to contain *ALL* the sources, including shellscripts, but they aren't useful for runtime purposes).
   */
  preferUnplugged?: boolean;
  /**
   * The optional `files` field is an array of file patterns that describes the entries to be included when your package is installed as a dependency. File patterns follow a similar syntax to `.gitignore`, but reversed: including a file, directory, or glob pattern (`*`, `** /*`, and such) will make it so that file is included in the tarball when it’s packed. Omitting the field will make it default to `["*"]`, which means it will include all files.
   *
   * Some special files and directories are also [included](https://github.com/yarnpkg/berry/blob/ab2e84588b1eacb2ec60a751f12b168415224a19/packages/plugin-pack/sources/packUtils.ts#L11) or [excluded](https://github.com/yarnpkg/berry/blob/ab2e84588b1eacb2ec60a751f12b168415224a19/packages/plugin-pack/sources/packUtils.ts#L27) regardless of whether they exist in the `files` array.
   *
   * You can also provide a `.npmignore` file in the root of your package or in subdirectories, which will keep files from being included. The `.npmignore` file works just like a `.gitignore`. If there is a `.gitignore` file, and `.npmignore` is missing, `.gitignore`’s contents will be used instead. The `files` field overrides `.npmignore` and `.gitignore`.
   */
  files?: string[];
  /**
   * This field contains various settings that are only taken into consideration when a package is generated from your local sources (either through `yarn pack` or one of the publish commands like `yarn npm publish`).
   */
  publishConfig?: {
    /**
     * Defines the package access level to use when publishing packages to the npm registry. Valid values are `public` and `restricted`, but `restricted` usually requires to register for a paid plan (this is up to the registry you use).
     */
    access?: "public" | "restricted";
    /**
     * If present, the top-level `bin` field from the manifest will be set to this new value before the package is packed to be shipped to remote registries. This won't modify the real manifest, just the one stored within the tarball.
     */
    bin?: string;
    /**
     * Same principle as the `publishConfig.bin` property; this value will be used instead of the top-level `browser` field when generating the workspace tarball.
     */
    browser?: string;
    /**
     * By default, for portability reasons, no files except those listed in the bin field will be marked as executable in the resulting package archive. The executableFiles field lets you declare additional fields that must have the executable flag (+x) set even if they aren't directly accessible through the bin field.
     */
    executableFiles?: string[];
    /**
     * Same principle as the `publishConfig.bin` property; this value will be used instead of the top-level `main` field when generating the workspace tarball.
     */
    main?: string;
    /**
     * Same principle as the `publishConfig.bin` property; this value will be used instead of the top-level `module` field when generating the workspace tarball.
     */
    module?: string;
    /**
     * If present, will replace whatever registry is defined in the configuration when the package is about to be pushed to a remote location.
     */
    registry?: string;
    [k: string]: unknown;
  };
  /**
   * This field contains various settings that alter how the workspace is installed.
   */
  installConfig?: {
    /**
     * Defines the highest point where packages can be hoisted, overriding for the current workspace the value initially set for [`nmHoistingLimits`](/configuration/yarnrc#nmHoistingLimits). Valid values are `workspaces`, `dependencies` and `none`
     */
    hoistingLimits?: "workspaces" | "dependencies" | "none";
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
