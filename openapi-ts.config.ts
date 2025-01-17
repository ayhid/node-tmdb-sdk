import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: './tmdb-openapi.json',
  output: './src/types',
  plugins: ['@hey-api/typescript'],
});
