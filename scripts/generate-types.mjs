import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import fs from 'fs';
import https from 'https';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPENAPI_PAGE_URL = 'https://developer.themoviedb.org/openapi';
const TEMP_DIR = path.join(__dirname, '../temp');
const OUTPUT_DIR = path.join(__dirname, '../src/types');

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractSpecUrls(html) {
  const urls = [];

  // Extract hrefs using regex
  const matches = html.match(/href="[^"]*openapi[^"]*"/g);
  if (!matches) {
    console.log('No matches found');
    return urls;
  }







  for (const match of matches) {

    const url = match.match(/href="([^"]*)"/)[1];
    console.log('url', url);
    const fullUrl = url.startsWith('http') ? url : `https://developer.themoviedb.org${url}`;
    //create an object with key v3 and value fullUrl
    urls.push(fullUrl);

  }

  console.log('Found URLs:', urls);
  return urls;
}

async function main() {
  try {
    // Create directories if they don't exist
    if (!fs.existsSync(TEMP_DIR)) {
      fs.mkdirSync(TEMP_DIR, { recursive: true });
    }
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    console.log('Fetching OpenAPI page to get latest spec URLs...');
    const pageContent = await fetchPage(OPENAPI_PAGE_URL);
    console.log('Page content length:', pageContent.length);
    console.log('First 500 chars:', pageContent.substring(0, 500));

    const specUrls = extractSpecUrls(pageContent);

    if (!specUrls[0]) {
      throw new Error('Could not find v3 API specification URL');
    }

    console.log('Found v3 API spec URL:', specUrls[0]);

    // Download v3 spec
    console.log('Downloading TMDB API v3 spec...');
    const v3SpecPath = path.join(TEMP_DIR, 'v3.yaml');
    execSync(`curl -o ${v3SpecPath} ${specUrls[0]}`);

    console.log('Generating types...');
    execSync(`npx @hey-api/openapi-ts -i ${v3SpecPath} -o ${OUTPUT_DIR} --client @hey-api/client-fetch`, { stdio: 'inherit' });

    console.log('Cleaning up...');
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });

    console.log('Done! Types have been generated in src/types/');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
