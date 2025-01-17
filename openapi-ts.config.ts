import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: './temp/v3.yaml',
  output: './src/types',
  plugins: ['@hey-api/typescript'],
});
