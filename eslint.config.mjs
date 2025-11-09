import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import eslintConfigNext from 'eslint-config-next'
import prettierPlugin from 'eslint-plugin-prettier'
import * as mdxPlugin from 'eslint-plugin-mdx'
import * as mdxParser from 'eslint-mdx'

export default defineConfig([
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  ...eslintConfigNext,
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      globals: {
        React: 'readonly',
      },
    },
    rules: {
      'prettier/prettier': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-effect': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      eqeqeq: 'error',
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.mdx'],
    plugins: {
      mdx: mdxPlugin,
    },
    languageOptions: {
      parser: mdxParser,
    },
    rules: {
      ...mdxPlugin.configs.recommended.rules,
      'react/jsx-no-undef': 'off',
    },
  },
  {
    files: ['**/*.tsx', './components/ui/*.ts'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    files: ['./next.config.ts'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
])
