import { join } from "@softdev1029/collection-utils";
import typescriptConfig from "@softdev1029/ts-config/tsconfig.composite.json";
import type { Hooks, Plugin } from "@yarnpkg/core";
import { MessageName, StreamReport } from "@yarnpkg/core";
import { npath } from "@yarnpkg/fslib";
import { registerTypeScript } from "./register-typescript";

const plugin: Plugin<Hooks> = {
  hooks: {
    setupScriptEnvironment: async (project, env) => {
      const projectRoot = npath.fromPortablePath(project.topLevelWorkspace.cwd);

      env.PROJECT_ROOT = projectRoot;
      env.NODE_OPTIONS = join(" ", [
        env.NODE_OPTIONS,
        "--unhandled-rejections=strict",
      ]);
      env.TS_NODE_COMPILER_OPTIONS = JSON.stringify(
        typescriptConfig.compilerOptions
      );

      await Promise.resolve();
    },
    wrapScriptExecution: async (
      executor,
      project,
      locator,
      scriptName,
      { env, stdout }
    ) => {
      const report = await StreamReport.start(
        {
          configuration: project.configuration,
          stdout,
        },
        async (report) => {
          try {
            registerTypeScript(project, locator, scriptName, env);
          } catch (error: unknown) {
            report.reportWarning(
              MessageName.UNNAMED,
              `Error occured attempting to register TypeScript for script "${scriptName}"${
                error instanceof Error
                  ? `: ${error.message}`
                  : typeof error === "string"
                  ? `: ${error}`
                  : ""
              }`
            );
          }

          return await Promise.resolve();
        }
      );

      const exitCode = report.exitCode();

      return exitCode === 0
        ? executor
        : async () => await Promise.resolve(exitCode);
    },
  },
};

export default plugin;
