import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import typeScriptEslintParser from '@typescript-eslint/parser'
import eslintConfigPrettier from "eslint-config-prettier";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
    },
    languageOptions: {
      parser: typeScriptEslintParser,
      parserOptions: {
        project: './tsconfig.json'
      },
    }
  },
  eslintConfigPrettier
];
