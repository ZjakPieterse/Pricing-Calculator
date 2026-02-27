import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const outDir = process.env.BUILD_OUTPUT_DIR || 'dist';
const indexPath = path.join(outDir, 'index.html');

if (!existsSync(indexPath)) {
  console.error(`[verify:build] ERROR: Missing build artifact: ${indexPath}`);
  console.error('[verify:build] Ensure the build step completed and BUILD_OUTPUT_DIR points to the deployed output directory.');
  process.exit(1);
}

const html = readFileSync(indexPath, 'utf8');

const forbiddenChecks = [
  { name: '/src/', regex: /\/src\// },
  { name: 'main.tsx', regex: /main\.tsx\b/ },
  { name: '.tsx', regex: /\.tsx\b/ },
  { name: '@vite/client', regex: /@vite\/client/ }
];

const forbiddenMatches = forbiddenChecks
  .filter(({ regex }) => regex.test(html))
  .map(({ name }) => name);

if (forbiddenMatches.length > 0) {
  console.error(`[verify:build] ERROR: ${indexPath} contains forbidden dev references: ${forbiddenMatches.join(', ')}`);
  console.error('[verify:build] Refusing deployment because this does not look like a production Vite build.');
  process.exit(1);
}

const hasBundledModuleScript = /<script\s+[^>]*type=["']module["'][^>]*src=["'][^"']*assets\/[^"']+\.js(?:\?[^"']*)?["'][^>]*>/i.test(
  html
);

if (!hasBundledModuleScript) {
  console.error(`[verify:build] ERROR: ${indexPath} is missing a production module script tag for assets/*.js`);
  console.error('[verify:build] Expected something like <script type="module" src="/assets/index-*.js"></script>.');
  process.exit(1);
}

console.log(`[verify:build] OK: ${indexPath} passed production build integrity checks.`);
