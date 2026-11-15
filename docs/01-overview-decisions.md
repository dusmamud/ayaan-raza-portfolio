# 01 — Overview and decisions

## What we are building

A single-page portfolio website based on the reference design screenshot
(persona: "Shoaib Hamza, Full-Stack Developer"), rebuilt with the locked
persona **Ayaan Raza** in SvelteKit. It is a UI/UX demo: every button,
stat, project, and contact detail is demo content unless this doc set says
otherwise.

Sections (top to bottom, as in the reference design):

1. Header / navigation — Home, About, Services, Projects, Tech Stack, Blog,
   Contact + "Let's Talk" button.
2. Hero — "Hi, I'm Ayaan", "I build digital products that people love",
   intro copy, "View My Work" + "Download CV", social links, laptop/phone
   illustration on a pink blob.
3. About — "Building apps with purpose", illustration, stats (3+ years,
   30+ projects, 20+ clients, cups of coffee).
4. Services — 4 cards: Mobile App Development, UI/UX Design, Backend
   Integration, Testing & Maintenance.
5. Selected Work — 4 projects: Foodly, Shopio, WalletWise, FitTrack, each
   with a pastel tile, category, description, and "View Case Study".
6. Call to action — "Have an idea? Let's build something great together!"
   + "Start a Project".
7. Footer — dark navy: logo, quick links, services, tech stack, contact.

## Scope

### In scope — Phase 1 (demo)

- Pixel-close recreation of the reference design, mobile-first responsive.
- Smooth, accessible interactions: mobile menu, scroll reveal, animated
  counters, hover states, project filter/modal (demo data only).
- Static build, deployable to free static hosting.
- Full production-ready tooling from day one (lint, format, typecheck,
  tests, validation, SEO foundations) so nothing is missing later.

### Out of scope — Phase 1 (planned, not built yet)

- Real contact-form delivery, CV download file, real social/email links.
- Blog posts and case-study pages with real content (routes exist as demo
  placeholders; see `06-pages-components-data.md`).
- Database, accounts/login, CMS, payments, analytics, i18n.
- These are covered by `09-production-roadmap.md` with named packages and
  wiring points, so adding them later does not require a rewrite.

## Decision log

| # | Decision | Why | Date |
|---|---|---|---|
| D1 | SvelteKit over Astro / Next.js for this site | Best UX feel for an interactive demo: built-in transitions, tiny bundles, Svelte 5 runes. Astro was the close second for a purely static showcase. Cross-verified 2026-11-15. | 2026-11-15 |
| D2 | Persona name: Ayaan Raza (not Dusmamud, not Shoaib Hamza) | Owner asked for a different name; fictional persona keeps the demo anonymous. Logo `AR.` | 2026-11-15 |
| D3 | Tailwind CSS v4, CSS-first config | Current standard for SvelteKit in 2026: `@tailwindcss/vite` plugin, `@theme` in CSS, no `tailwind.config.js`. | 2026-11-15 |
| D4 | `adapter-static` + full prerender for Phase 1 | Demo is fully static; static hosting is free, fast, and simple. Server adapter is a one-line swap later. | 2026-11-15 |
| D5 | Full package set from the start | Owner decision: "nothing missing if we go to production later." Implemented as tiers in `02-stack-packages.md` so day-one build stays green. | 2026-11-15 |
| D6 | Svelte built-ins first for motion | `svelte/transition`, `svelte/motion`, `svelte/animate` + one small scroll-reveal action cover this design. No animation library until a complex timeline is needed. | 2026-11-15 |
| D7 | Zod schemas for all data boundaries | Demo data, future form data, and future API data all validate against schemas in `src/lib/schemas/`. No unvalidated data crosses a boundary. | 2026-11-15 |
| D8 | No separate state library | Svelte 5 runes (`$state`, `$derived`, `$effect`) in `.svelte.ts` modules are the state system. | 2026-11-15 |
| D9 | English docs, demo copy in English | Matches the reference design copy. i18n is a later phase (Paraglide), not day one. | 2026-11-15 |

## Non-goals

- Do not copy the reference screenshot's illustrations as production assets.
  They are reference only. Phase 1 uses placeholders / recreated SVG art
  (see `05-design-system.md`).
- Do not present demo stats, client counts, or contact details as real.
- Do not add a backend "just in case" before a feature needs it. Packages
  and folders are prepared; wiring happens per phase in
  `09-production-roadmap.md`.
