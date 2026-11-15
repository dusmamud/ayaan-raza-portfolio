# 09 — Production roadmap (demo → real, without missing pieces)

This roadmap is the answer to "what if we go to production tomorrow?"
Each phase names its trigger, packages (all already listed in
`02-stack-packages.md`), adapter impact, and exit criteria. No phase
requires a rewrite because the foundations (schemas, folders, env
placeholders, quality gates) are in place from day one.

## Phase 0 — Docs (this doc set) ✅

- Trigger: project start. Exit: docs reviewed, `02` tiers agreed.
- Output: `docs/` (this set) + website folder structure.

## Phase 1 — Static demo (current build target)

- Trigger: docs approved.
- Work: setup per `04-setup-guide.md`; build home + placeholder routes
  per `06`; design system per `05`; checklists per `07`; quality + CI +
  static deploy per `08`.
- Adapter: `adapter-static`, full prerender.
- Exit: all `08` gates pass, Lighthouse targets met on preview, demo
  deployed to static hosting. All content still demo data.

## Phase 2 — Real contact + hardening

- Trigger: owner wants enquiries to actually arrive.
- Work: wire the contact form action with `sveltekit-superforms` + the
  existing Zod schema (no schema rewrite); add an email delivery provider
  (choose one: Resend / SendGrid / host email — decide then, install its
  SDK then); add spam protection (honeypot + rate limit — decide
  mechanism then); add axe-core E2E assertions (Tier C candidate).
- Adapter impact: form actions need a server OR a serverless function.
  Options, in order of preference: (a) keep static site + host form
  function, (b) swap to `adapter-node` / host adapter early. Decide at
  Phase 2 start and record it — do not silently mix both.
- Exit: a test enquiry arrives end-to-end; form still fully accessible;
  no secrets in client bundle.

## Phase 3 — Real content (blog + case studies)

- Trigger: owner has real posts / case studies to publish.
- Work: choose content source — (a) `mdsvex` (Markdown in repo, best for
  a developer-owned blog), or (b) headless CMS (best if non-developers
  edit). Install only the chosen one. Replace placeholder routes with
  real content + `@tailwindcss/typography` prose styles. Add RSS feed
  if the blog ships.
- Adapter impact: none if content is build-time (mdsvex) — stays static.
  CMS with build-time fetch also stays static; CMS with on-demand fetch
  needs a server adapter decision.
- Exit: ≥3 real posts + ≥2 real case studies, sitemap/RSS correct,
  reading experience verified on mobile.

## Phase 4 — Accounts, database, server

- Trigger: any feature needs stored user data (accounts, saved items,
  admin, comments, gated content).
- Work: activate Tier B — Drizzle schema + migrations on Postgres,
  Better Auth mount (`/api/auth/*`, email/password + Google OAuth),
  `hooks.server.ts` session hook, `#lib/server` data access only,
  Zod validation at every endpoint boundary.
- Adapter impact: **swap to `adapter-node`** (or host adapter) + Docker +
  VPS/host deploy per `08`. Static prerender kept only for public
  marketing routes. This is the one deliberate adapter change in the
  roadmap — plan a deploy window for it.
- Exit: sign-up/sign-in/sign-out + session persistence + protected route
  all E2E-tested; migrations run in deploy; secrets via host env only;
  no DB credentials in repo or client bundle.

## Phase 5 — Growth features (only if requested)

Each is independent; none is pre-built. Install + wire only on request:

| Feature | Named approach | Notes |
|---|---|---|
| Second language | Paraglide (`sv add paraglide`) | Build-time messages; all user-facing strings move to message files. |
| Payments / billing | Stripe (+ `@better-auth/stripe` if auth-linked) | Needs Phase 4. Never handle card data directly — provider checkout only. |
| File uploads | Storage provider SDK (S3-compatible) | Needs Phase 4 + upload validation (type/size) server-side. |
| Analytics | Privacy-friendly analytics SDK | Only with a chosen provider + cookie/consent decision. Never in demo. |
| Newsletter | Email provider list API | Reuses Phase 2 email setup. Double opt-in. |
| Search | Build-time index (static) or hosted search | Decide by content volume; do not add a search server for <50 pages. |
| Background jobs / email queues | Host queue or small worker | No SvelteKit add-on covers this; design it when a real job exists. |
| Realtime / WebSockets | Separate socket handling (SvelteKit has no built-in WS support) | Only if a realtime feature is specified. Do not pre-build. |

## What "nothing missing" means (and does not mean)

- Means: every category has a named package, install command, folder,
  env placeholder, and wiring point recorded *before* it is needed.
  Starting any phase is execution, not re-research.
- Does not mean: every package is wired and running on day one. Wiring
  a database/auth/i18n system with no feature behind it creates dead
  config, build risk, and security surface. Tiers in `02` are the
  balance: installed-or-named from the start, wired when the feature
  ships. If the owner wants a tier moved (e.g. "wire auth now"), record
  it as a new decision in `01` and re-plan the affected phase.
