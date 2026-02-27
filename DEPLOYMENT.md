# Cloudflare Pages Deployment

Use Cloudflare Pages with the following settings:

- **Build command:** `npm ci && npm run build`
- **Build output directory:** `dist`

## Build integrity guard

This project has a fail-fast guard in `scripts/verify-build.mjs`.

- `npm run build` triggers `postbuild`, which runs `node scripts/verify-build.mjs`.
- The verification step fails the build if `dist/index.html` contains dev-only references (`/src/`, `main.tsx`, `.tsx`, `@vite/client`).
- The verification step also fails unless `dist/index.html` contains a production module script pointing to `assets/*.js`.

If verification fails, Cloudflare Pages deployment fails before publish.

## Quick smoke checks after deploy

- Open **View Source** in production and confirm there is a module script referencing `/assets/*.js`.
- Confirm there is **no** reference to `/src/main.tsx` (or any `/src/` / `.tsx` path).
