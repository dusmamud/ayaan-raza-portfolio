# 03 — Project structure

## Whole website folder

```
ayaan-raza/
├── README.md               # Website overview + link to docs/
├── docs/                   # This doc set (setup, stack, design, roadmap)
│   ├── README.md
│   ├── 01-overview-decisions.md
│   ├── 02-stack-packages.md
│   ├── 03-project-structure.md
│   ├── 04-setup-guide.md
│   ├── 05-design-system.md
│   ├── 06-pages-components-data.md
│   ├── 07-accessibility-responsive-seo-performance.md
│   ├── 08-quality-testing-ci-deployment.md
│   ├── 09-production-roadmap.md
│   └── 10-sources.md
├── portfolio/              # The SvelteKit app (this website). See below.
└── projects/               # One folder per demo project in Selected Work.
    ├── README.md
    ├── foodly/             # Food & Delivery demo (content/assets)
    ├── shopio/             # E-Commerce demo
    ├── walletwise/         # Finance demo
    └── fittrack/           # Health & Fitness demo
```

Rules:

- `portfolio/` is the only app with a `package.json`. `projects/*/` folders
  hold demo content/assets only — never a second app, never a second
  lockfile — unless a future decision explicitly makes one a standalone
  app (record it in `01-overview-decisions.md` first).
- New demo project = new folder under `projects/` + one entry in
  `portfolio/src/lib/data/projects.ts` + one case-study route (see `06`).
- Never put secrets, real emails, or real phone numbers anywhere in this
  tree. Demo contact details are fake and marked as such in data files.

## SvelteKit app (`portfolio/`)

SvelteKit is opinionated about routing and unopinionated about the rest.
This layout follows the cross-verified conventions: file-based routing in
`src/routes/`, shared code in `src/lib/` via the `#lib` alias, server-only
code in `src/lib/server/` (enforced by SvelteKit at build time), static
files in `static/`, E2E tests in `tests/`.

```
portfolio/
├── package.json
├── pnpm-lock.yaml
├── vite.config.ts          # SvelteKit plugin + adapter + Tailwind plugin + Vitest
├── tsconfig.json
├── eslint.config.js
├── .prettierrc             # (or prettier config in package.json — record choice at setup)
├── playwright.config.ts
├── drizzle.config.ts       # Tier B placeholder until Phase 4 (no tables yet)
├── .env.example            # Placeholder keys only, no real values
├── .gitignore
├── static/
│   ├── favicon.png         # AR. mark
│   ├── robots.txt
│   ├── og.png              # Social share image (placeholder in Phase 1)
│   └── ...                 # Only files that must be served verbatim at root
├── tests/
│   └── *.spec.ts           # Playwright E2E (smoke tests first)
├── src/
│   ├── app.html            # HTML shell (%sveltekit.head% / %sveltekit.body%)
│   ├── app.d.ts            # App namespace types
│   ├── app.css             # Tailwind import + @theme tokens + global styles
│   ├── routes/
│   │   ├── +layout.svelte  # Header + footer + global CSS import + SEO defaults
│   │   ├── +layout.ts      # export const prerender = true (static Phase 1)
│   │   ├── +page.svelte    # Home: hero + about + services + work + CTA
│   │   ├── +page.ts        # Home data load (demo data via schemas)
│   │   ├── projects/
│   │   │   ├── +page.svelte        # All projects (demo list)
│   │   │   └── [slug]/+page.svelte # Case study (demo content)
│   │   ├── blog/
│   │   │   ├── +page.svelte        # Blog index (demo placeholder)
│   │   │   └── [slug]/+page.svelte # Blog post (demo placeholder)
│   │   ├── contact/+page.svelte    # Contact (demo form, no delivery in Phase 1)
│   │   └── api/
│   │       └── auth/               # EMPTY until Phase 4 (Better Auth mount point)
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ui/         # Generic: Button, Card, Badge, SectionHeading, WaveDivider
│   │   │   ├── layout/     # Header, Footer, MobileMenu
│   │   │   └── sections/   # Hero, About, Services, SelectedWork, Cta
│   │   ├── data/
│   │   │   ├── site.ts     # Name, role, nav, socials (demo), contact (demo)
│   │   │   ├── services.ts # 4 services
│   │   │   ├── projects.ts # 4+ projects (validated by Zod schemas)
│   │   │   └── posts.ts    # Blog placeholders
│   │   ├── schemas/
│   │   │   ├── project.ts  # Zod schemas: Project, Service, Post
│   │   │   └── contact.ts  # Zod schema: contact form
│   │   ├── actions/
│   │   │   └── reveal.ts   # Scroll-reveal IntersectionObserver action
│   │   ├── utils/
│   │   │   ├── cn.ts       # clsx + tailwind-merge helper
│   │   │   └── format.ts   # Pure helpers (no framework imports)
│   │   ├── state/
│   │   │   └── *.svelte.ts # Shared runes state, only if truly shared
│   │   ├── types/
│   │   │   └── index.ts    # Shared TypeScript types (prefer Zod-inferred types)
│   │   ├── assets/         # Vite-processed images/SVG (hashed, optimised)
│   │   └── server/         # SERVER-ONLY. Build error if imported by client code.
│   │       ├── db/         # Drizzle client + schema (Tier B placeholder)
│   │       └── auth.ts     # Better Auth instance (Tier B placeholder)
│   └── hooks.server.ts     # Server hooks (Tier B placeholder; auth session hook in Phase 4)
└── src/lib/components/... test files colocated as *.test.ts / *.svelte.test.ts
```

## Naming rules

- Components: `PascalCase.svelte` (`SelectedWork.svelte`). One component
  per file. Props via Svelte 5 `$props()` + runes; no legacy `export let`
  in new code.
- Routes: SvelteKit conventions exactly (`+page.svelte`, `+layout.svelte`,
  `+page.server.ts`, `+server.ts`, `[slug]`). Never invent route filenames.
- Data/util files: `kebab-case.ts` or `camelCase.ts` — pick one at setup
  and keep it consistent (record the choice in `04-setup-guide.md`).
- Imports: always `#lib/...`, never deep relative paths
  (`../../../lib/...`).
- CSS classes: Tailwind utilities in markup; design tokens only via
  `@theme`. No hard-coded hex values in components. Custom CSS lives in
  `app.css` or a component `<style>` block, never in a separate global
  stylesheet per page.
- Keep `+page.svelte` / `+page.server.ts` thin: they orchestrate (load
  data, render sections, delegate interaction). Logic lives in `#lib`.

## Assets: `static/` vs `src/lib/assets/`

- `static/`: only files that must be served verbatim at a fixed URL —
  `favicon.png`, `robots.txt`, `og.png`, manifest files.
- `src/lib/assets/`: everything else (illustrations, project tiles, SVG
  decorations). Vite processes, hashes, and optimises these; imports
  return cache-friendly URLs. Prefer this location for ~80% of assets.

## What NOT to create

- No `svelte.config.js` (Kit 3 config is in `vite.config.ts` here).
- No `tailwind.config.js` (Tailwind v4, CSS-first).
- No `src/stores/` folder by default — shared runes state in
  `src/lib/state/*.svelte.ts` replaces legacy stores.
- No per-feature folders until a feature spans 3+ files (see sources).
  Start flat in `components/ui|layout|sections`, split by feature only
  when a feature earns it.
