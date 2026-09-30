# Lumino — Bitcoin mining landing page

Production implementation of the Lumino Figma design (`MThApTfkGLLpsh53mF5fOa`, frame "Home" 142:442).

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion (scroll reveal only).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Structure

- `app/` — layout (fonts, metadata/OG), page, `robots.ts`, `sitemap.ts`, `manifest.ts`, icons
- `app/globals.css` — design tokens (Figma variables + gradients) in Tailwind `@theme`
- `components/sections/` — one component per Figma section
- `components/ui/` — Button, Logo, StatCard, FeatureCard, PoolRow, AssetCard, Tabs, OptionGroup, Chip, Reveal
- `lib/mining.ts` — pure mining/profit calculator (defaults reproduce the Figma values exactly)
- `lib/data.ts` — static content (pools, assets, features…)
- `public/assets/` — every image/SVG exported from Figma, grouped by section
- `scripts/visual-check.mjs` — Playwright full-page screenshot + section geometry for visual QA

Set `NEXT_PUBLIC_SITE_URL` to the production origin for canonical/OG/sitemap URLs.
