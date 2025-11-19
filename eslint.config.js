import js from '@eslint/js';
import globals from 'globals';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // JavaScript / React
  {
    files: ['**/*.{js,jsx}'],
    plugins: { react: reactPlugin, prettier: prettierPlugin },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off', // for React 17+
    },
    ...reactPlugin.configs.flat.recommended,
  },

  // TypeScript / TSX
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { '@typescript-eslint': tsPlugin, prettier: prettierPlugin },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      'prettier/prettier': 'error',
    },
    ...tsPlugin.configs.flat.recommended, // use flat config, no internal import
  },
]);
