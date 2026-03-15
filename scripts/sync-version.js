/**
 * scripts/sync-version.js
 * 
 * Called by npm's "version" lifecycle hook.
 * Reads the bumped version from package.json and patches
 * server.json and index.js to match, then stages both files.
 */

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const version = pkg.version;

// Patch server.json
const serverJson = JSON.parse(readFileSync('server.json', 'utf8'));
serverJson.version = version;
serverJson.packages[0].version = version;
writeFileSync('server.json', JSON.stringify(serverJson, null, 2) + '\n');

// Patch index.js
let indexJs = readFileSync('index.js', 'utf8');
indexJs = indexJs.replace(
  /version:\s*['"][^'"]+['"]/,
  `version: '${version}'`
);
writeFileSync('index.js', indexJs);

// Stage patched files so they ride the version commit
execSync('git add server.json index.js');

console.log(`Synced version ${version} to server.json and index.js`);
