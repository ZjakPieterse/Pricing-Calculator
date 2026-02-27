# Cloudflare Pages Deployment

This project is a **Vite + React static site** and must publish the built `dist/` folder (never the repository root).

## Required Cloudflare Pages settings

- **Framework preset:** `Vite`
- **Build command:** `npm ci && npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (repository root)
- **Node.js version:** `20` (recommended)

## Why this matters

The root `index.html` intentionally points to Vite's dev entry:

```html
<script type="module" src="/src/main.tsx"></script>
```

That is valid only in local dev. Production must serve `dist/index.html`, which references bundled files under `/assets/*.js`.

## Build guardrail

`npm run build` now runs a post-build safety check:

- Script: `npm run verify:publish`
- File checked: `dist/index.html`
- Fails if `/src/` or `.tsx` appears in published HTML.

If this check fails, do not deploy until build output is fixed.

## Environment variables

No environment variables are required for this MVP.

- If any future variable is exposed to browser code, prefix it with `VITE_`.
- Keep secrets server-only and never embed them in this static client build.

## Smoke test checklist (post-deploy)

1. Load the site and confirm there is **no network request** to `/src/main.tsx`.
2. Confirm JS is loaded from `/assets/*.js` with JavaScript MIME type.
3. Confirm UI renders and the browser console shows no runtime errors.
