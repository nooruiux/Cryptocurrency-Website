<div align="center">

# Lumino — Crypto & Bitcoin Mining Landing Page (Next.js + Tailwind CSS)

A modern, dark-themed **cryptocurrency / Bitcoin mining website template** built with Next.js, TypeScript and Tailwind CSS — pixel-perfect from a Figma design, fully responsive and SEO-ready.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-22C55E?style=for-the-badge&logo=vercel&logoColor=white)](https://cryptocurrency-website.vercel.app)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

<img src=".github/preview.jpg" alt="Lumino crypto mining landing page — hero section with Bitcoin, Ethereum and Litecoin 3D illustration" width="100%" />

</div>

## ✨ Features

- ✅ Crypto / Bitcoin mining hero with conversion-focused CTA
- ✅ Live mining profit calculator (pure TypeScript logic)
- ✅ Mining pools, supported assets, stats and feature sections
- ✅ Dark UI with gradient design tokens from Figma variables
- ✅ Scroll-reveal animations with Framer Motion
- ✅ SEO: metadata, Open Graph, `sitemap.ts`, `robots.ts`, web manifest
- ✅ Mobile-first responsive layout

## 🛠 Tech Stack

Next.js (App Router) · TypeScript · Tailwind CSS · React · Vercel · Framer Motion

## Development

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


---

## 👤 Designer & Developer

**Noor Hossain** — UI/UX Designer & Front-End Developer (Next.js, React, Tailwind CSS) based in Dhaka, Bangladesh. I design in Figma and ship pixel-perfect, responsive, SEO-friendly websites.

[![GitHub](https://img.shields.io/badge/GitHub-nooruiux-181717?style=flat-square&logo=github)](https://github.com/nooruiux)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-noorxtk-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/noorxtk/)
[![Behance](https://img.shields.io/badge/Behance-noorxtk-1769FF?style=flat-square&logo=behance&logoColor=white)](https://www.behance.net/noorxtk)
[![Dribbble](https://img.shields.io/badge/Dribbble-Noorxtk-EA4C89?style=flat-square&logo=dribbble&logoColor=white)](https://dribbble.com/Noorxtk)

💼 **Available for freelance:** landing pages, SaaS websites, Figma-to-Next.js builds, UI/UX design. ⭐ Star this repo if it helped you.

<sub>Keywords: crypto website template, bitcoin mining landing page, cryptocurrency web design, Next.js crypto template, Tailwind CSS dark landing page, fintech UI, Figma to code, UI/UX design, responsive web design.</sub>
