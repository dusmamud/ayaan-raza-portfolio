# 02 — Stack and packages (full production-ready set)

Owner rule: **take everything from the start, so nothing is missing if this
goes to real production later.** This doc is the complete manifest. It is
organised in tiers so the day-one build stays green while nothing is
forgotten:

- **Tier A — install and wire at setup.** Needed for the demo itself.
- **Tier B — install at setup, wire later.** Present in `package.json` and
  folders/env placeholders from day one; only connected when the feature
  ships. Nothing here may break the static demo build.
- **Tier C — named, install command ready, install when the feature starts.**
  Installing these on day one would change build config for features that
  do not exist yet. Their package names, install commands, and wiring
  points are recorded here so they are never "missing".

> Version rule: only the starter versions below are verified facts. Every
> other package resolves to its current compatible version at install time
> via `pnpm` / `sv add`. Record the resolved versions from
> `pnpm-lock.yaml` after setup. Never hand-write a version number into
> these docs without verifying it on the registry.

## Environment (verified on this VM, 2026-11-15)

| Tool | Version |
|---|---|
| Node.js (LTS) | v26.13.1 |
| pnpm | 12.18.0 |
| Python / Rust / Go | Installed, not used by this project |

Package manager for this project: **pnpm only**. Never mix npm/yarn
lockfiles into `portfolio/`.

## Tier A — core (verified in starter, keep)

From `~/workspace/templates/sveltekit-app/package.json`, verified
2026-11-15:

| Package | Version (verified) | Purpose |
|---|---|---|
| `svelte` | 5.57.3 | UI compiler + runes reactivity. No virtual DOM. |
| `@sveltejs/kit` | 3.2.0 | App framework: file routing, layouts, load functions, form actions, adapters. |
| `vite` | 8.3.8 | Dev server + production bundler (SvelteKit runs on Vite). |
| `@sveltejs/vite-plugin-svelte` | 7.3.1 | Svelte compilation inside Vite. |
| `typescript` | 6.0.3 | Strict typing everywhere. SvelteKit 3 requires TS 6 in this project (global `tsc` is 7.0.2 — do not mix them). |

Notes:

- SvelteKit 3 config lives in `vite.config.ts` (adapter + preprocess).
  There is no `svelte.config.js` in this setup. Do not add one unless a
  future add-on requires it.
- TypeScript strict mode stays on. No `.js` files in `src/`; all code is
  `.ts` / `.svelte` / `.svelte.ts`.

## Tier A — rendering / deployment

| Package | Purpose | Notes |
|---|---|---|
| `@sveltejs/adapter-static` | Emits a fully static site for Phase 1 | Replaces `@sveltejs/adapter-auto` from the starter. Requires every route to be prerenderable (`export const prerender = true` in the root layout, or per-route). Build output goes to `build/`. |
| `@sveltejs/adapter-node` (Tier B) | Node server output for production Phase 4 | Install at setup, do not activate until server features (auth/DB) ship. Activation = one import swap in `vite.config.ts` + `Dockerfile` (see `08-quality-testing-ci-deployment.md`). |

## Tier A — styling

| Package | Purpose | Notes |
|---|---|---|
| `tailwindcss` | Utility-first CSS, v4 | CSS-first config. No `tailwind.config.js`. |
| `@tailwindcss/vite` | Tailwind Vite plugin | Register `tailwindcss()` in `vite.config.ts` plugins. Global CSS imports Tailwind with `@import "tailwindcss";` and defines tokens in `@theme` (see `05-design-system.md`). |
| `@tailwindcss/forms` | Sensible form-element base styles | Needed the moment the contact form becomes real; harmless for demo inputs. Install at setup via `sv add` forms plugin option if offered, else `pnpm`. |
| `@tailwindcss/typography` | `prose` styles for long-form text | Needed for blog/case-study bodies in Phase 3. Install at setup; unused until then. |
| `clsx` | Conditional class strings | Tiny, tree-shakeable. |
| `tailwind-merge` | Merges conflicting Tailwind classes correctly | Used together with `clsx` in the `cn()` helper (`src/lib/utils/cn.ts`). |
| `tailwind-variants` | Type-safe variant APIs for reusable components | For Button/Card variants. Optional in the smallest build, included here per the full-set rule. |

Preferred setup path (cross-verified): `npx sv add tailwindcss` — it adds
the dependencies, registers the Vite plugin, creates the stylesheet, and
imports it from the root layout. Commit before running it: `sv add` edits
files in place and is not reversible by the tool. Manual `pnpm add` +
hand-editing `vite.config.ts` is the fallback; the end state must be
identical.

## Tier A — UI primitives

| Package | Purpose | Notes |
|---|---|---|
| `bits-ui` | Headless, accessible primitives (dialog, popover, menu, tabs, etc.) | Svelte 5 native, no style opinions, handles keyboard nav / focus trapping. Use only the primitives actually needed (mobile menu, case-study dialog). Do not import the whole library as a design system — this design is custom. |
| `shadcn-svelte` | Component recipes on top of bits-ui + Tailwind v4 | CLI-driven (`npx shadcn-svelte init`), copies components into the repo. Tier A as *available tooling*; only add individual components (e.g. Button) if they beat a hand-written one for this design. Do not restyle the site to shadcn defaults. |

## Tier A — icons and fonts

| Package | Purpose | Notes |
|---|---|---|
| Lucide Svelte package | All icons (services, social, arrows, stats) | **Verify the package name at install time.** In 2026 sources both `lucide-svelte` (0.x line, Svelte 5 native) and `@lucide/svelte` (1.x line) appear, with conflicting reports about Svelte 5/SSR compatibility. At setup: check the registry, install the current official Svelte package, render one icon, run `pnpm build`, and record the exact package + version in `pnpm-lock.yaml` and in `10-sources.md`. Import icons individually so tree-shaking keeps only used icons. Do NOT use `svelte-icons` (no Svelte 5 support, unmaintained). |
| `@fontsource-variable/*` / `@fontsource/*` | Self-hosted fonts, no Google Fonts CDN at runtime | Font families: Plus Jakarta Sans (headings) + Inter (body). Prefer variable packages where they exist. Verify exact package names on the registry at setup (e.g. `@fontsource-variable/inter` is evidenced; confirm the Plus Jakarta Sans variable package name the same way). Import only the weights used. See `05-design-system.md`. |

## Tier A — animation / motion

No animation library is installed. Svelte built-ins cover this design:

| Built-in | Use |
|---|---|
| `svelte/transition` (`fade`, `fly`, `slide`, `scale`) | Section reveals, menu, dialog. |
| `svelte/motion` (`tweened`, `spring`) | Animated stat counters, smooth numeric transitions. |
| `svelte/animate` (`flip`) | List reordering (project filter). |
| One small `reveal` action | IntersectionObserver-based scroll reveal (`src/lib/actions/reveal.ts`). Hand-written, ~30 lines, no dependency. |

Tier C candidate: the framework-agnostic `motion` package, only if a
complex scroll timeline is requested later. Verify Svelte support at that
time; do not install speculatively. GSAP / Framer Motion are not used.

## Tier A — forms and validation

| Package | Purpose | Notes |
|---|---|---|
| `zod` | TypeScript-first schema validation (4.x line seen in 2026 stacks) | Every data boundary validates with a Zod schema from `src/lib/schemas/`: demo data at load, form data at submit, API data at fetch. |
| `sveltekit-superforms` | Form handling + Zod integration for SvelteKit form actions | Demo phase: schemas + client validation only, no server action delivery. Production phase: same schemas drive server form actions with zero rewrite. |
| `formsnap` | Accessible form field components for superforms | Install with superforms; use when the contact form becomes real. |

## Tier A — code quality (devDependencies, zero runtime cost)

| Package | Purpose | Notes |
|---|---|---|
| `eslint` | Linting (flat config, 9.x line) | `eslint.config.js`, Svelte + TS rules. |
| `eslint-plugin-svelte` | Svelte lint rules incl. accessibility hints | Keep the Svelte compiler's own a11y warnings on as well — lint does not replace them. |
| `typescript-eslint` | TypeScript ESLint rules | |
| `prettier` | Formatting (3.x line) | Single quotes, project width recorded in `.prettierrc` at setup. Formats `.svelte`, `.ts`, `.json`, `.md`. |
| `prettier-plugin-svelte` | Prettier support for `.svelte` files | |
| `svelte-check` | Type checking inside `.svelte` files + `tsc --noEmit` | Runs as `pnpm check`. The dev server does not surface all type errors — `svelte-check` is the real gate. |

Preferred setup path: `npx sv add prettier eslint` (commit first).
Scripts: `pnpm lint` = `prettier --check . && eslint .`,
`pnpm format` = `prettier --write .`. See `08-...md`.

## Tier A — testing (devDependencies)

| Package | Purpose | Notes |
|---|---|---|
| `vitest` | Unit + component tests (Vite-native, 4.x line) | Test files: `src/**/*.{test,spec}.ts` and `*.svelte.test.ts` component tests. |
| `@testing-library/svelte` | Component testing utilities (5.x line) | |
| `@testing-library/jest-dom` | DOM matchers | |
| `@testing-library/user-event` | Realistic user interaction in tests | |
| `jsdom` | DOM environment for Vitest client tests | |
| `@playwright/test` | End-to-end tests (1.x line) | Tests in `tests/` (Playwright default location). Runs against `vite preview` on port 4173. Smoke tests: page loads, nav works, menu opens, sections render. |
| `@vitest/browser-playwright` | Vitest browser mode (optional) | Include if component tests need a real browser; otherwise jsdom is enough for Phase 1. Record the choice at setup. |

Preferred setup path: `npx sv add vitest playwright` (commit first).

## Tier A — utilities

| Package | Purpose | Notes |
|---|---|---|
| (none extra) | Dates, IDs, fetching | Use platform APIs (`fetch`, `Intl`, `crypto.randomUUID`) and SvelteKit `load` functions. No date/HTTP/state library is installed. If a date-heavy feature arrives later, evaluate then — do not pre-install. |

## Tier B — database and auth (install at setup, wire later)

These packages are installed so production work never starts from zero,
but they are **not wired** until Phase 4 (`09-production-roadmap.md`).
They must not break the static demo build: no DB connection at build
time, no auth routes mounted, no secrets required to run `pnpm dev`.

| Package | Purpose | Notes |
|---|---|---|
| `drizzle-orm` | Type-safe ORM / query builder | Schema lives in `src/lib/server/db/schema.ts` (created at setup as a documented placeholder, no tables until Phase 4). |
| `drizzle-kit` | Migrations CLI + Drizzle Studio | DevDependency. `drizzle-kit generate` / `migrate` scripts recorded in `04-setup-guide.md`, unused until Phase 4. |
| `postgres` | PostgreSQL driver (small footprint) | Pairs with `drizzle-orm/postgres-js`. `DATABASE_URL` placeholder in `.env.example` only — never a real URL in the repo. |
| `better-auth` | Auth engine (1.x line): email/password, OAuth, sessions, plugins | Mounted at `/api/auth/*` only in Phase 4. Requires `BETTER_AUTH_SECRET` + `BETTER_AUTH_URL` in production; both are placeholders until then. Lucia is deprecated (2024) — do not use it. Better Auth's own `migrate` only works with its built-in Kysely adapter; with Drizzle, generate schema via the CLI and migrate with drizzle-kit. |

Preferred setup path: `npx sv add drizzle better-auth` (commit first),
then immediately verify `pnpm build` still passes with the demo in
static mode. If an add-on forces a server adapter, stop and record the
conflict in `10-sources.md` instead of silently breaking the static build
— Tier B must stay dormant, not dominant.

Deferred (do not install until the feature is chosen): Stripe/billing
SDKs, email provider SDK, file-storage SDK, analytics SDK. Their wiring
points are named in `09-production-roadmap.md`.

## Tier C — named and ready, install when the feature starts

| Package / tool | Feature | Install when |
|---|---|---|
| `mdsvex` | Markdown/MDX blog + case-study content | Phase 3, if blog content is authored in Markdown. Alternative: headless CMS + `load` functions. Decide at Phase 3, do not install both. |
| Paraglide (`@inlang/paraglide-js` via `sv add paraglide`) | i18n | Only if a second language is requested. Adds build-time message compilation. |
| Storybook (via `sv add storybook`) | Isolated component development/docs | Only if component count grows past ~20 or a second developer joins. |
| `motion` | Complex scroll timelines | Only if built-in transitions prove insufficient for a requested animation. Verify Svelte support first. |
| `@axe-core/playwright` / `axe-core` | Automated accessibility assertions in E2E | Candidate for Phase 2 hardening. Verify package + Playwright compatibility at install; manual + compiler a11y checks (see `07-...md`) are the baseline regardless. |
| Analytics / error tracking SDK | Production observability | Only when a provider is chosen. Never add tracking to the demo. |

## Explicitly NOT installed

| Thing | Why not |
|---|---|
| Any state library (Redux, Zustand, Pinia-style stores) | Svelte 5 runes are the state system. |
| React / Vue / any second UI framework | One framework only. Astro/Next.js starters stay in `templates/` for other projects. |
| `svelte-spa-router` or any client router | SvelteKit file routing is the router. |
| CSS-in-JS, Sass, Less | Tailwind v4 + plain CSS in `<style>` / `app.css` only. |
| jQuery, Bootstrap, Tailwind v3 config | Obsolete for this stack. |
| Google Fonts CDN link | Fonts are self-hosted via Fontsource. |
| `tailwind.config.js` | Tailwind v4 is CSS-first (`@theme`). Do not create this file. |
| `svelte.config.js` | SvelteKit 3 config lives in `vite.config.ts` in this setup. |

## Install commands (record of intent — run during setup, see `04-setup-guide.md`)

```bash
# From the starter copy in portfolio/ (see 04-setup-guide.md):
pnpm install

# Preferred: official add-ons (commit before each group)
npx sv add tailwindcss eslint prettier vitest playwright
npx sv add sveltekit-adapter   # choose: static (Phase 1)
npx sv add drizzle better-auth # Tier B: dormant until Phase 4

# Direct adds (only what sv add does not cover)
pnpm add zod sveltekit-superforms formsnap bits-ui clsx tailwind-merge tailwind-variants
pnpm add -D @tailwindcss/forms @tailwindcss/typography
# Lucide + fonts: verify exact package names on the registry first (see table above)
pnpm add <lucide-svelte-package> <fontsource-packages>
```

After install: run `pnpm check && pnpm lint && pnpm test && pnpm build`
and record every resolved version from `pnpm-lock.yaml` in the setup log
(see `04-setup-guide.md`). If any Tier B package breaks the static build,
it stays installed but unwired — never "fix" it by dropping the static
adapter in Phase 1 without recording a new decision.
