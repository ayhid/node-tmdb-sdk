import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import tseslint from '@typescript-eslint/eslint-plugin';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**', '**/*.d.ts', 'src/types/types.gen.ts'],
  },
  eslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.test.json'],
        tsconfigRootDir: '.',
      },
      globals: {
        fetch: 'readonly',
        Headers: 'readonly',
        URL: 'readonly',
        Response: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettier,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/explicit-function-return-type': ['warn'],
      '@typescript-eslint/explicit-module-boundary-types': ['warn'],
      '@typescript-eslint/no-explicit-any': ['warn'],
      '@typescript-eslint/no-floating-promises': ['error'],
      '@typescript-eslint/await-thenable': ['error'],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 100,
          tabWidth: 2,
          endOfLine: 'lf',
        },
      ],
      'no-console': ['warn'],
      eqeqeq: ['error', 'always'],
    },
  },
  {
    files: ['test/**/*.ts'],
    languageOptions: {
      globals: {
        global: true,
      },
    },
  },
  eslintConfigPrettier,
];
