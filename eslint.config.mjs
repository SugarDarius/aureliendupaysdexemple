import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'

import tsParser from '@typescript-eslint/parser'
import * as mdxPlugin from 'eslint-plugin-mdx'
import * as mdxParser from 'eslint-mdx'

const __filename = fileURLToPath(import.meta.url)
const require = createRequire(import.meta.url)

const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const config = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended'
  ),
  {
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      'prettier/prettier': 'error',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      eqeqeq: 'error',
    },
  }, // MDX configuration
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
    files: ['./next.config.mjs'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
]

export default config
