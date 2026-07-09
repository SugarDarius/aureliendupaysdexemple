import { defineConfig } from 'oxlint'
import core from 'ultracite/oxlint/core'
import next from 'ultracite/oxlint/next'
import react from 'ultracite/oxlint/react'

export default defineConfig({
  extends: [core, react, next],
  ignorePatterns: core.ignorePatterns,
  rules: {
    'eslint/func-style': 'off',
    'eslint/no-await-in-loop': 'off',
    'eslint/no-inline-comments': 'off',
    'eslint/no-nested-ternary': 'off',
    'eslint/no-warning-comments': 'off',
    'eslint/prefer-destructuring': 'off',
    'eslint/prefer-named-capture-group': 'off',
    'eslint/require-await': 'off',
    'eslint/require-unicode-regexp': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'promise/prefer-await-to-then': 'off',
    'react/hook-use-state': 'off',
    'react/no-danger': 'off',
    'typescript/consistent-type-definitions': 'off',
    'typescript/no-invalid-void-type': 'off',
    'unicorn/catch-error-name': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-array-sort': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/prefer-export-from': 'off',
    'unicorn/prefer-modern-math-apis': 'off',
    'unicorn/prefer-number-coercion': 'off',
    'unicorn/prefer-spread': 'off',
    'unicorn/prefer-string-replace-all': 'off',
  },
})
