# Portfolio

Personal portfolio of a software/IT professional — built as a working
demonstration of engineering quality. Trilingual (English, French, Arabic with
full RTL), server-rendered on Cloudflare Workers, animated with restraint,
accessible in both themes.

## Stack

Next.js (App Router, strict TypeScript) · `@opennextjs/cloudflare` on Cloudflare
Workers · Tailwind CSS v4 with design tokens as CSS variables · `next-intl` ·
Framer Motion + GSAP ScrollTrigger (+ optional R3F hero) · D1 · KV · R2 ·
Vectorize + Workers AI · Cloudflare Turnstile · Vitest + Playwright.

## Quickstart

```bash
npm install
cp .env.example .env.local        # fill in what you need; everything is optional for `dev`
npm run dev                        # http://localhost:3000 → redirects to /en
```

Useful commands:

| Command | What it does |
| --- | --- |
| `npm run verify` | typecheck + lint + design-token audit + unit tests (the pre-push gate) |
| `npm run audit:contrast` | WCAG report for every token pair in both themes; `--list` prints the palette |
| `npm run preview` | build with OpenNext and run the real Workers runtime locally |
| `npm run deploy` | build and deploy to Cloudflare Workers |
| `npm run cf-typegen` | regenerate `cloudflare-env.d.ts` from `wrangler.jsonc` bindings |
| `npm run test:e2e` | Playwright flows (language switch, theme, palette, brief form, assistant) |

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — system diagram, request
  lifecycle, caching matrix, data layer, security, i18n/RTL, motion, layer rules,
  folder tree, quality gates, decision log.
- [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) — colour architecture, type
  scale, space/radius/elevation, motion vocabulary, state matrix, RTL checklist.
- `docs/DEPLOYMENT.md` and `docs/CONTENT-GUIDE.md` — added in Part 10: how to
  provision bindings, attach a domain, and where to put your real content.

## Content

All personal data lives in `src/content/**` (typed, per locale) with MDX for
long-form case studies and notes; UI copy lives in `messages/{en,fr,ar}.json`.
The files shipped today contain clearly-marked placeholder content — nothing is
hard-coded into components, so replacing it never requires touching UI code.

## Status

Built in ten reviewable parts (see the build-order table in the architecture
doc). Part 1 — architecture, design tokens, folder tree, `wrangler.jsonc` — is
in place and the token contract is verified by `npm run audit:contrast`.
