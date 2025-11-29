import { tanstackConfig } from '@tanstack/eslint-config';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  ...tanstackConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
    },
  },
  prettierRecommended,
  {
    rules: {
      'prettier/prettier': 'warn',
    },
  },
];
