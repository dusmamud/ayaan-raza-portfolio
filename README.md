# Ayaan Raza — Demo Portfolio Website

Demo-only UI/UX website. Everything is demo, not production.

- Persona: Ayaan Raza (replaces "Shoaib Hamza" from the reference design)
- Logo: AR.
- Role: Full-Stack Developer
- Stack (locked): SvelteKit 3.2.0 + Svelte 5.57.3 + Vite 8.3.8 + TypeScript 6.0.3
- Starter: ~/workspace/templates/sveltekit-app

## Docs

Full project docs (cross-verified 2026-11-15) live in `docs/` — start at
[`docs/README.md`](docs/README.md). They cover the complete
production-ready package set (nothing missing later), project structure,
setup steps, design system, pages/components/data, accessibility /
responsive / SEO / performance checklists, quality/testing/CI/deployment,
the demo → production roadmap, and the cross-verification sources log.
Status: portfolio built 2026-11-15 — SvelteKit demo UI (home, projects + 4 case studies, blog + 3 posts, contact demo form), all gates green (12 Vitest + 6 Playwright). Static output in `portfolio/build/` (`@sveltejs/adapter-static`); not deployed yet. Git repo initialised locally 2026-11-15 (branch `main`, not pushed yet) with `.github/workflows/deploy.yml` (Cloudflare Pages auto-deploy on every push via `cloudflare/wrangler-action@v4`); repo + Pages project name locked as `ayaan-raza-portfolio`; repo created 2026-11-15 at https://github.com/dusmamud/ayaan-raza-portfolio (private) and pushed; Cloudflare secrets are added by the user, then the workflow deploys (see `docs/10-sources.md`).

## Structure

- `docs/` — project documentation (see above)
- `portfolio/` — main SvelteKit website (hero, about, services, selected work, CTA, footer)
- `projects/` — one folder per demo project shown in Selected Work.
  Add a new folder here for every new demo project.
  - `foodly/` — Food & Delivery demo
  - `shopio/` — E-Commerce demo
  - `walletwise/` — Finance demo
  - `fittrack/` — Health & Fitness demo
