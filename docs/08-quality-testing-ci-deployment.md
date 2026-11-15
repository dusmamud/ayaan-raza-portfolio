# 08 — Quality, testing, CI, and deployment

## Quality gates (all must pass before any "done")

```bash
pnpm check   # svelte-check: types + Svelte a11y warnings
pnpm lint    # prettier --check . && eslint .
pnpm test    # vitest run (unit + component)
pnpm test:e2e # playwright test (against vite preview)
pnpm build   # vite build (static output in build/)
```

Rules:

- `pnpm check` is the real type gate. The dev server hides some type
  errors; never ship with `check` failing.
- Zero ESLint errors; warnings are fixed or justified in code with a
  comment + a decision reference. Zero `svelte-check` a11y warnings (see
  `07-...md`).
- Formatting is Prettier's job, not a review topic. Run `pnpm format`
  before committing. Do not hand-format against Prettier.
- TypeScript strict mode on. No `any` without a justifying comment. No
  `@ts-ignore` / `@ts-expect-error` without a dated reason + follow-up.
- Every data boundary validates with Zod (see `02`, `06`). Unvalidated
  `fetch` / form / file data is a defect, even in demo code.

## Testing strategy

### Unit tests (Vitest)

What to test: pure helpers (`cn`, formatting), Zod schemas (valid/invalid
cases), data files (every project/service entry validates, slugs unique,
required fields present). Fast, no DOM needed except where noted.

### Component tests (Vitest + Testing Library)

What to test: Button variants render correct element/attributes; Header
menu opens/closes with keyboard; Stat shows final value; ProjectCard
renders tile/title/link; form shows validation errors accessibly.
Test behaviour + accessible roles/names, not implementation details or
CSS class names. Mock Lucide icons where the mock keeps tests fast and
focused (record the mock approach at setup).

### E2E tests (Playwright, `tests/`)

Smoke suite first (Phase 1), growing with features:

1. Home loads, hero + all sections visible, no console errors.
2. Nav anchors scroll to sections; mobile menu opens/closes by keyboard.
3. Projects list + one case-study page load; back navigation works.
4. Contact form: empty submit shows errors; valid demo submit shows the
   demo success state; no network delivery attempted in Phase 1.
5. No horizontal scroll at 375px and 1440px viewports (screenshot/assert
   scrollWidth check).

E2E runs against `pnpm preview` (production build, port 4173) in CI.
Never run E2E against the dev server for release decisions.

### What is NOT tested in Phase 1

Visual regression snapshots, load testing, and penetration testing.
Add visual regression only if the design system grows a second theme or
a second developer joins (record as a Tier C decision in `02` if added).

## Git hooks (optional, pick one at setup)

Pre-commit: format + lint staged files, run `svelte-check` on changed
files where the tool supports it. Tool choice (e.g. Lefthook, evidenced
in 2026 SvelteKit stacks, or Husky + lint-staged) is made at setup and
recorded in `10-sources.md` setup log. Hooks never replace CI — CI is
the gate, hooks are the convenience. If hooks cause friction, disable
them and rely on CI; do not disable CI.

## CI pipeline (GitHub Actions shape — adapt to host if different)

One workflow, jobs in order, fail fast:

1. Checkout + setup Node (same major as local: Node 26) + pnpm (12.x)
   with pnpm store caching.
2. `pnpm install --frozen-lockfile` (fails if lockfile is out of sync —
   this is intentional).
3. `pnpm lint`
4. `pnpm check`
5. `pnpm test` (Vitest)
6. `pnpm build`
7. `pnpm test:e2e` (Playwright, browsers installed in CI, against preview)
8. Deploy step (see below) — only on the main branch, only if all above pass.

Keep the workflow file in the repo (`.github/workflows/deploy.yml` —
CI gates + Cloudflare Pages deploy in one workflow, via
`cloudflare/wrangler-action@v4`; the old `cloudflare/pages-action` is
deprecated/unavailable). If the repo host differs, translate the same
steps — the steps are the contract, not the YAML dialect.

## Deployment — Phase 1 (static)

- Adapter: `@sveltejs/adapter-static`, full prerender, output `build/`.
- Hosts that fit (pick one at deploy time; all serve static `build/`
  output): Vercel, Netlify, Cloudflare Pages, GitHub Pages. No server,
  no environment variables required to serve the demo.
- Deploy trigger: every push (workflow `on: push` + manual
  `workflow_dispatch`), after CI gates pass. Push to `main` deploys
  production; pushes to other branches deploy previews (Wrangler picks
  the branch from the push). Manual deploy of the `build/` folder
  remains possible without git.
- Custom domain / HTTPS: host-provided. Record the final URL in the
  setup log when known. Do not hard-code the production URL in code —
  use SvelteKit's environment handling / relative URLs, with canonical
  URLs set from one `site.ts` value.
- Cache: static assets from `src/lib/assets/` are content-hashed by Vite
  (long cache OK). HTML is re-fetched per deploy (host default). Do not
  hand-write cache headers in Phase 1.

## Deployment — production (Phase 4, server)

When server features ship (auth/DB/forms delivery), deployment changes.
This section is the plan, not Phase 1 work:

- Adapter: swap `adapter-static` → `@sveltejs/adapter-node` (one import
  in `vite.config.ts` + remove the global `prerender = true` where
  routes become dynamic; keep prerender for truly static routes).
- Runtime: Node server (`build/index.js`) in Docker on a VPS, or a
  Node-capable host. `Dockerfile` + `.dockerignore` are created in
  Phase 4 — do not create them in Phase 1 (they would rot).
- Environment: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`,
  plus any provider keys — via host secrets / env, never in the repo.
  `.env.example` lists every required key; startup must fail loudly if
  a required key is missing in production (Better Auth already throws
  without its secret — keep that behaviour).
- Database: Postgres + Drizzle migrations run as a deploy step
  (`drizzle-kit migrate`), never by hand-editing production tables.
- Health: add a `/health` endpoint check in Phase 4 (or host health
  check) once a server exists. Not applicable to static Phase 1.
- Rollback: redeploy the previous green build. Keep deploys atomic
  (host feature or Docker image tag per commit).

## Release checklist (every public deploy, demo or production)

- [ ] All quality gates pass (above).
- [ ] `07-...md` checklists spot-checked on the preview deploy.
- [ ] No demo contact details presented as real; no secrets in the bundle
      (search `build/` output for secret-like strings before first deploy).
- [ ] `robots.txt` / sitemap / OG image present and correct for the deploy URL.
- [ ] Lighthouse run on the preview deploy, results recorded.
