/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  env: { browser: true, es2023: true },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:perfectionist/recommended-natural',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['./**/*.+(cjs|js|mjs)'],
    },
    {
      env: { node: true },
      files: ['./**/*.cjs'],
    },
    {
      extends: ['plugin:vitest/recommended', 'plugin:jest-dom/recommended', 'plugin:testing-library/react'],
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.node.json'],
    tsConfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'react-refresh'],
  root: true,
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    curly: ['error', 'all'],
    'perfectionist/sort-imports': [
      'error',
      {
        'custom-groups': {
          type: {
            react: ['react', 'react-*', 'react-*/*'],
          },
          value: {
            react: ['react', 'react-*', 'react-*/*'],
          },
        },
        groups: [
          'type',
          'react',
          ['builtin', 'external'],
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'object',
          'style',
          'unknown',
        ],
        'internal-pattern': ['@/**'],
        'newlines-between': 'always',
        order: 'asc',
        type: 'natural',
      },
    ],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: true,
    },
    react: {
      version: 'detect',
    },
  },
};
