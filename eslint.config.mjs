// @ts-check
import eslintReact from "@eslint-react/eslint-plugin";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import reactCompiler from "eslint-plugin-react-compiler";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

export default tseslint.config(
  eslint.configs.recommended,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["react"],
              importNames: ["*"],
              message:
                "Please use named imports from React instead of importing the entire library",
            },
          ],
        },
      ],
    },
  },
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/require-await": "off",
    },
  },
  compat.config({
    plugins: ["prefer-arrow-functions"],
    rules: {
      "prefer-arrow-functions/prefer-arrow-functions": [
        "error",
        {
          allowObjectProperties: false,
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: "unchanged",
          singleReturnOnly: false,
        },
      ],
    },
  }),
  compat.config({
    extends: ["plugin:drizzle/recommended"],
  }),
  compat.config({
    extends: ["next/core-web-vitals"],
  }),
  reactCompiler.configs.recommended,
  {
    extends: [eslintReact.configs["recommended-type-checked"]],
  },
  eslintConfigPrettier,
);
