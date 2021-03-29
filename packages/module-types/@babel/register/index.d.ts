/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

declare module "@babel/register" {
  import type { TransformOptions } from "@babel/core";

  global {
    namespace NodeJS {
      interface ProcessEnv extends Dict<string> {
        BABEL_CACHE_PATH?: string;
        BABEL_DISABLE_CACHE?: string;
      }
    }
  }

  namespace register {
    type Options = TransformOptions & {
      extensions?: string[];
      cache?: boolean;
    };
  }

  function register(options?: register.Options): void;

  export = register;
}
