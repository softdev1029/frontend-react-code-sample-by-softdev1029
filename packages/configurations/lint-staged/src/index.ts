import { ESLint } from "eslint";
import { filter, join, map } from "lodash/fp";

const eslint = new ESLint({});

const config = {
  "*.{js,jsx,ts,tsx}": async (stagedFiles: string[]) => {
    const files = await Promise.all(
      map(
        async (file) => ((await eslint.isPathIgnored(file)) ? "" : file),
        stagedFiles
      )
    ).then(filter<string>(Boolean));

    return `eslint ${join(" ", files)}`;
  },
  "*.{css,gql,graphql,html,js,json,jsx,md,mdx,sh,ts,tsx,yml}":
    "prettier --write",
};

export default config;
