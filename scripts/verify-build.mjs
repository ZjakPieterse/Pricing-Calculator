import { existsSync, readFileSync } from 'node:fs';

const filePath = process.argv[2] ?? 'dist/index.html';

if (!existsSync(filePath)) {
  console.error(`[build-check] Expected built HTML at ${filePath}, but the file does not exist.`);
  process.exit(1);
}

const html = readFileSync(filePath, 'utf8');
const bannedPatterns = ['/src/', '.tsx'];
const matches = bannedPatterns.filter((pattern) => html.includes(pattern));

if (matches.length > 0) {
  console.error(
    `[build-check] Build output is unsafe for deployment. ${filePath} still references source entries: ${matches.join(', ')}.`
  );
  console.error('[build-check] Ensure Cloudflare Pages deploys built output (dist/) and never repo root index.html.');
  process.exit(1);
}

console.log(`[build-check] OK: ${filePath} references bundled assets only.`);
