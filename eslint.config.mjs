import tsParser from '@typescript-eslint/parser'
import mdxPlugin from 'eslint-plugin-mdx'
import mdxParser from 'eslint-mdx'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...compat.extends(
    'next/core-web-vitals',
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended'
  ),
  {
    languageOptions: {
      parser: tsParser,
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
      'tailwindcss/enforces-shorthand': 'off',
      'tailwindcss/no-custom-classname': 'off',
    },
  },
  {
    files: ['**/*.mdx'],

    plugins: {
      'plugin:mdx/recommended': mdxPlugin,
    },

    languageOptions: {
      parser: mdxParser,
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
