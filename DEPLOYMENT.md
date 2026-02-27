# Cloudflare Pages Deployment

This repository is a **Vite + React** app. Cloudflare Pages must deploy the Vite build output (`dist/`), not source files.

## Required Cloudflare Pages settings

- **Framework preset:** `Vite`
- **Build command:** `npm ci && npm run build`
- **Build output directory:** `dist`
- **Node.js version:** `20`

## Root directory rules (important for monorepos)

- If this app is at repo root, set **Root directory** to `/`.
- If this app lives in a subfolder (monorepo), set **Root directory** to that app folder (for example `apps/pricing-calculator`).
- The build command and output directory are always evaluated relative to the selected Root directory.

## Why blank screens happen

`index.html` in source points at Vite's dev entry:

```html
<script type="module" src="/src/main.tsx"></script>
```

That is valid in local dev only. Production must serve `dist/index.html`, which references bundled files like `/assets/index-*.js`.

## Guardrail in this repo

`npm run build` runs:

```bash
vite build && node scripts/verify-build.mjs
```

The verification script hard-fails if `dist/index.html` contains `/src/` or `.tsx`.
