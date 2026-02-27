# Pricing Calculator MVP

Production-oriented MVP wizard app for calculating monthly pricing across Basic, Advanced, and Premium tiers.

## Tech stack

- Vite + React + TypeScript
- TailwindCSS
- Vitest
- ESLint + Prettier

## Features

- Step-by-step wizard UI
- Category selection (Accounting, Bookkeeping, Payroll)
- Banded selectors using dropdowns only (no free-form input)
- Optional VAT toggle (no pricing impact for MVP)
- Pricing output for 3 tiers:
  - Basic = sum of selected category basic components
  - Advanced = Basic × 1.35
  - Premium = Basic × 2.30
- Tier selection highlight + compact summary panel
- Local storage persistence + start over action
- Mobile-first and keyboard-accessible controls

## Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

### 3) Run tests

```bash
npm run test
```

### 4) Run linting

```bash
npm run lint
```

### 5) Build production assets

```bash
npm run build
```

## Cloudflare Pages deployment

Deploy this as a static Vite site.

**Build settings:**

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/` (repo root)
- Node version: `18+` (recommended `20`)

## Where to replace placeholder pricing/bands first

Update these config entries in `src/config/pricingConfig.ts`:

1. `categories.<category>.bands` for your real operating bands.
2. `basicPrices.<category>.<bandId>` for your real Basic-price components.
3. `tierMultipliers` if you want to adjust markup rules.

No other code changes are required for basic replacement, because the wizard and pricing engine are config-driven.
