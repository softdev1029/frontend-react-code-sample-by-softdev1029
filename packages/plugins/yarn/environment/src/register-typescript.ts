import { join } from "@softdev1029/collection-utils";
import { getOr } from "@softdev1029/object-utils";
import type { O } from "@softdev1029/type-utils";
import type * as Schema from "@softdev1029/schema-lib";
import { Locator, Project, structUtils } from "@yarnpkg/core";
import { npath } from "@yarnpkg/fslib";
import flow from "lodash/fp/flow";
import includes from "lodash/fp/includes";

type RawManifest = Schema.Manifest & {
  "@softdev1029/yarn-plugin-environment"?: {
    typescript?: {
      register?: boolean | string[];
    };
  };
};

export const registerTypeScript = (
  project: Project,
  locator: Locator,
  scriptName: string,
  env: O.Record<string, string>
): void => {
  const shouldRegister = flow(
    (rawManifest: RawManifest) =>
      getOr(
        true,
        "@softdev1029/yarn-plugin-environment.typescript.register",
        rawManifest
      ),
    (register) =>
      typeof register === "boolean" ? register : includes(scriptName, register)
  )(project.getWorkspaceByLocator(locator).manifest.raw);

  if (shouldRegister) {
    const projectRoot = npath.fromPortablePath(project.topLevelWorkspace.cwd);
    const devScriptsWorkspace = npath.fromPortablePath(
      project.getWorkspaceByIdent(
        structUtils.makeIdent("softdev1029", "dev-scripts")
      ).relativeCwd
    );

    env.NODE_OPTIONS = join(" ", [
      env.NODE_OPTIONS,
      `--require "${npath.join(
        projectRoot,
        devScriptsWorkspace,
        "typescript",
        "register.js"
      )}"`,
    ]);
  }
};
