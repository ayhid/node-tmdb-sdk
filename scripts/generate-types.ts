import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { generateApi } from '@hey-api/openapi-ts';

const OPENAPI_PAGE_URL = 'https://developer.themoviedb.org/openapi';
const OUTPUT_DIR = path.join(__dirname, '../src/types');
const TEMP_DIR = path.join(__dirname, '../temp');

async function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractSpecUrls(html: string): { v3?: string; v4?: string } {
  const urls: { v3?: string; v4?: string } = {};
  
  // Extract hrefs using regex
  const matches = html.match(/href="\/openapi\/([^"]+)"/g);
  if (!matches) return urls;

  for (const match of matches) {
    const id = match.match(/\/openapi\/([^"]+)/)?.[1];
    if (!id) continue;

    // Look for v3/v4 indicators in surrounding text
    const surroundingText = html.substring(
      Math.max(0, html.indexOf(match) - 50),
      Math.min(html.length, html.indexOf(match) + 50)
    );

    if (surroundingText.includes('v3')) {
      urls.v3 = `https://developer.themoviedb.org/openapi/${id}`;
    } else if (surroundingText.includes('v4')) {
      urls.v4 = `https://developer.themoviedb.org/openapi/${id}`;
    }
  }

  return urls;
}

async function main() {
  // Create directories if they don't exist
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Fetching OpenAPI page to get latest spec URLs...');
  const pageContent = await fetchPage(OPENAPI_PAGE_URL);
  const specUrls = extractSpecUrls(pageContent);

  if (!specUrls.v3) {
    throw new Error('Could not find v3 API specification URL');
  }

  console.log('Found v3 API spec URL:', specUrls.v3);

  // Download v3 spec
  console.log('Downloading TMDB API v3 spec...');
  const v3SpecPath = path.join(TEMP_DIR, 'v3.yaml');
  execSync(`curl -o ${v3SpecPath} ${specUrls.v3}`);

  console.log('Generating types...');
  const spec = fs.readFileSync(v3SpecPath, 'utf8');
  const output = generateApi(spec, {
    codegenType: 'typescript',
    exportClient: false,
    exportServices: false,
    exportSchemas: true,
    exportHooks: false,
    indent: 2,
    tslint: true,
    prettier: true,
    defaultResponseAsSuccess: false,
    unwrapResponseData: true,
    sortTypes: true,
    enumNames: {
      style: 'PascalCase'
    }
  });

  // Write the generated types
  const typesFile = path.join(OUTPUT_DIR, 'tmdb.ts');
  fs.writeFileSync(typesFile, output);

  // Generate an index file that re-exports everything
  const indexContent = `export * from './tmdb';\n`;
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent);

  console.log('Cleaning up...');
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });

  console.log('Done! Types have been generated in src/types/');
}

main().catch(console.error);
