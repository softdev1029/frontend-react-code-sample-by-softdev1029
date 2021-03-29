import type { Linter } from "eslint";

const config: Linter.Config = {
  extends: [
    "standard-with-typescript",
    "standard-jsx",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:sonarjs/recommended",
    "plugin:eslint-comments/recommended",
    "prettier",
    "prettier/react",
    "prettier/standard",
  ],
  plugins: ["tree-shaking"],
  env: {
    browser: true,
    node: true,
  },
  reportUnusedDisableDirectives: true,
  ignorePatterns: ["bundles", "dist", "lib"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier/@typescript-eslint",
      ],
      rules: {
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      },
    },
    {
      files: ["*.test.ts", "*.test.tsx"],
      rules: {
        "@typescript-eslint/no-invalid-void-type": "off",
      },
    },
  ],
};

export default config;
