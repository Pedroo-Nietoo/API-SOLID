import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/*.{js,mjs,cjs,ts}']},
  {languageOptions: { globals: globals.node },
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
