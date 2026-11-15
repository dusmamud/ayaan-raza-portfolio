# 10 — Sources and cross-verification log

How these docs were verified, what each source confirmed, and what must
still be verified at install time. Research date: 2026-11-15. Search
results are snapshots — re-check the registry / official docs at setup
time for anything marked "resolve at install".

## Method

- Web searches on 2026-11-15 across independent sources (framework
  comparisons, production stack write-ups, `sv add` references, project
  structure guides, auth/DB guides). A claim is used in these docs only
  if ≥2 independent sources agreed, or it was verified directly on this
  VM (starter `package.json`, Node/pnpm versions).
- Starter facts were verified by reading files on the VM, not from
  search results.
- Design tokens were estimated from the reference PNG screenshot only.
  They are marked draft in `05-design-system.md` until visual QA.

## Framework choice (Decision D1)

Confirmed by multiple 2026 comparisons that Astro is the best default
for mostly-static content/marketing sites (near-zero JS, islands), while
SvelteKit is the default for "interactive throughout" with the smallest
app-framework bundles and best developer experience, and Next.js is the
heaviest / full-stack default:

- https://appwrite.io/blog/post/best-frontend-frameworks-for-vibe-coding
- https://virdis.io/blog/website-frameworks-b2b-saas
- https://dev.jynlab.com/blog/frontend-framework-for-saas
- https://www.buildr.sh/posts/next-vs-astro-vs-hono-2026
- https://www.khod.io/resource-center/articles/astro-vs-nextjs
- https://www.designme.agency/insights/nextjs-vs-astro-for-marketing-websites-in-2026
- https://www.pkgpulse.com/guides/nextjs-vs-astro-vs-sveltekit-2026
- https://blog.rajpoot.dev/posts/typescript/sveltekit-astro-content-sites-2026/
- https://www.masturbyte.com/frameworks.html

## Tailwind v4 + adapters + `sv add`

Confirmed: Tailwind v4 via `@tailwindcss/vite`, CSS-first `@theme`, no
`tailwind.config.js`; `npx sv add tailwindcss` wires deps + Vite plugin +
stylesheet + layout import; `adapter-static` replaces `adapter-auto` and
requires full prerender; SvelteKit 3 config lives in `vite.config.ts`
(no `svelte.config.js`); `clsx` + `tailwind-merge` used together for
conditional classes:

- https://www.errcodex.com/commands/sveltekit/sv-add/
- https://github.com/codewarrior-debug/perspectize/blob/HEAD/.planning/phases/01-foundation/01-RESEARCH.md
- https://rustoffrails.org/docs/guides/frontend-svelte
- https://deepwiki.com/flo-bit/search-bluesky-likes/6-configuration-and-deployment
- https://deepwiki.com/taochen-ct/prompt-manager/2.1-setup-and-tech-stack

## Quality, forms, testing stacks

Confirmed: Prettier 3.x + `prettier-plugin-svelte`; ESLint 9.x +
`eslint-plugin-svelte` + `typescript-eslint`; `svelte-check` 4.x as the
type gate (`pnpm check`); Vitest 4.x + `@testing-library/svelte` 5.x +
Playwright 1.x as the standard test trio; CI order lint → format-check →
typecheck → unit → E2E → build; forms via `sveltekit-superforms` + Zod
(+ `formsnap`); Zod schemas at server boundaries; Svelte 5 runes as the
state system (no separate state library); shadcn-svelte on bits-ui +
`lucide-svelte` + `tailwind-variants` in production stacks:

- https://github.com/aptg/dedx_web/blob/HEAD/docs/02-tech-stack.md
- https://deepwiki.com/yuu19/SubTrack/1.1-technology-stack
- https://github.com/jbndrf/tabtin/blob/HEAD/CLAUDE.md
- https://github.com/ashar-builds/split-wiser/blob/HEAD/AGENTS.md
- https://wiki.khoirul.me/wiki/stacks/svelte/svelte-local-env/
- https://github.com/tomevault-io/codex-plugins/blob/HEAD/while1618--bugzkit/AGENTS.md
- https://github.com/bytepunx/system-flow/blob/HEAD/design/tech/sveltekit.md

## Project structure

Confirmed: file-based routing (`src/routes/` = URLs, `+page.svelte` /
`+layout.svelte` / `+page.server.ts` / `+server.ts` / `[slug]`);
`src/lib/` via `#lib` alias; `#lib/server/` enforced server-only at build
time; split `#lib` by kind (`components`, `server`, `utils`, `types`,
state modules); keep route files thin; `static/` only for verbatim files,
Vite-processed assets in `src/lib/assets/`; feature folders only once a
feature spans 3+ files:

- https://www.guvi.in/blog/sveltekit-tutorial/
- https://www.devmorph.dev/blogs/complete-sveltekit-tutorial-for-production-apps
- https://www.sabaoon.dev/blog/svelte-best-practices
- https://copyprogramming.com/howto/step-by-step-guide-how-to-start-a-svelte-project-with-sveltekit
- https://blog.zxce3.net/posts/structuring-large-sveltekit-projects/
- https://copyprogramming.com/howto/javascript-svelte-import-public-folder-code-example

## Icons and fonts

Confirmed: Lucide is the standard Svelte icon set (stroke-based, 24×24,
tree-shakeable, Svelte-native components); Fontsource (`@fontsource/*`,
`@fontsource-variable/*`) is the standard self-hosted font approach (no
runtime CDN request); `svelte-icons` has no Svelte 5 support and is
unmaintained. See "Open verifications" below for the Lucide package-name
conflict found during research:

- https://github.com/fayazk/weaviate-ui/blob/HEAD/docs/packages.md
- https://zoomies.sh/dependencies/
- https://github.com/cwchanap/dtxweb/blob/HEAD/docs/superpowers/plans/2026-06-21-desktop-ui-redesign.md
- https://github.com/nikvb/kilocode-skills/blob/HEAD/build-vercel-clone-site/SKILL.md
- https://www.fernsdr.org/licenses.txt
- https://app.dynodoc.online/licenses
- https://hugeicons.com/blog/development/best-svelte-icon-libraries-you-can-get-your-hands-on-today
- https://github.com/heindewilde/someday/blob/HEAD/README.md

## Database and auth (Tier B / Phase 4)

Confirmed: Drizzle ORM + `drizzle-kit` + `postgres` driver is the
standard SvelteKit + Postgres pairing; Better Auth (v1.x) is the current
SvelteKit auth standard (Lucia deprecated 2024, do not use); Better Auth
mounts at `/api/auth/*`, uses a Drizzle adapter, needs `BETTER_AUTH_SECRET`
+ `BETTER_AUTH_URL` in production, and its own `migrate` only works with
the built-in Kysely adapter (Drizzle users migrate with drizzle-kit);
`sv add` covers Drizzle, Better Auth, Vitest, Playwright, Tailwind, and
adapters; `adapter-node` is the Node-server output for Docker/VPS deploys:

- https://github.com/kryptobaseddev/awesome-skills/blob/HEAD/skills/better-auth/SKILL.md
- https://fullstacksveltekit.com/blog/google-authentication-sveltekit
- https://fullstacksveltekit.com/blog/best-sveltekit-course
- https://elements.dev/vs/sveltekit
- https://deepwiki.com/AEZ314/ZaloKit/1.2-technology-stack

## Open verifications — MUST resolve at install time

1. **Lucide Svelte package name.** Sources disagree: `lucide-svelte`
   0.577.x is documented as Svelte 5 native in some 2026 stacks, while
   other 2026 stacks list `@lucide/svelte` 1.x, and one stack reports
   `lucide-svelte` 1.0.1 breaking Svelte 5 stable. Do not guess. At
   setup, check the npm registry for the current official Svelte
   package, install it, render one icon, run `pnpm build`, and record
   the chosen package + version below.
2. **Font package names.** `@fontsource-variable/inter` is evidenced.
   Confirm the Plus Jakarta Sans package name (variable vs static) on
   the registry at setup. Record names + weights below.
3. **Adapter majors for SvelteKit 3.** `adapter-static` 4.x with Kit 3
   appears in one verified 2026 setup; `adapter-node` 5.x appears with
   Kit 2. Resolve compatible majors via `sv add` / pnpm at setup and
   record them below. Never pin an adapter major from memory.
4. **Exact versions of all Tier A/B packages.** Resolve via pnpm at
   install; record from `pnpm-lock.yaml` below.
5. **Design tokens.** All hex values in `05-design-system.md` are draft
   estimates from the PNG. Confirm visually during build and update that
   doc with final values.
6. **Axe-core candidate.** `@axe-core/playwright` was NOT cross-verified
   in this research. Verify package + Playwright compatibility before
   installing (Tier C).

## Setup log

(Append dated entries during setup — see `04-setup-guide.md` Step 9.
Nothing is recorded here yet: setup has not run.)

### 2026-11-15 — Initial setup (portfolio/ created, all gates green)

- Environment: Node v26.13.1, pnpm 12.18.0, Svelte CLI (sv) 1.4.0.
  Plain shell PATH has Node 24 + no pnpm; all commands ran via `bash -lc`.
- Starter copied from `~/workspace/templates/sveltekit-app` (tar, excluding
  node_modules/.svelte-kit; first tar attempt failed on ownership —
  re-ran with `--no-same-owner`). Package renamed to `ayaan-raza-portfolio`.
  Baseline `pnpm install` + `pnpm build` passed before any add-on.
  Tar snapshot taken pre-addons: `/tmp/ayaan-portfolio-baseline.tar.gz`.
- Git: NOT initialised. No git identity configured and no repo was
  requested. Do not assume a repo exists; initialise + commit before
  sharing or deploying.
- `sv add` (all with explicit options + `--no-git-check --install pnpm`,
  stdin `</dev/null`): prettier; `vitest="usages:unit,component"`;
  eslint + `playwright="demo:no"` + `tailwindcss="plugins:typography,forms"`
  + `sveltekit-adapter="adapter:static"`. First combined run used a bare
  `vitest` argument, prompted interactively, and hung on piped stdin —
  killed, nothing applied; rerun with explicit options succeeded.
  Drizzle/Better Auth were NOT added via `sv add` (interactive + server
  assumptions); Tier B packages were installed directly and left dormant.
- Lucide decision (registry-verified 2026-11-15): `lucide-svelte` 1.0.1
  peers Svelte `^3 || ^4 || ^5.0.0-next.42` (NOT Svelte 5 stable);
  `@lucide/svelte` 1.73.0 peers Svelte `^5`. Installed `@lucide/svelte`,
  resolved 1.72.0.
- Fonts: `@fontsource-variable/inter` 5.3.0 +
  `@fontsource-variable/plus-jakarta-sans` 5.3.0 (variable packages
  verified to exist at 5.3.0). Imported in `+layout.svelte`; families
  "Inter Variable" / "Plus Jakarta Sans Variable".
- Resolved versions (from `pnpm list`, 2026-11-15): svelte 5.57.3,
  @sveltejs/kit 3.2.0, vite 8.3.8, typescript 6.0.3,
  @sveltejs/adapter-static 4.0.1, @sveltejs/vite-plugin-svelte 7.3.1,
  tailwindcss 4.3.5, @tailwindcss/vite 4.3.5, @tailwindcss/forms 0.5.11,
  @tailwindcss/typography 0.5.20, @lucide/svelte 1.72.0,
  @fontsource-variable/inter 5.3.0,
  @fontsource-variable/plus-jakarta-sans 5.3.0, zod 4.6.7,
  sveltekit-superforms 3.1.0, formsnap 2.1.0, bits-ui 2.21.0, clsx 2.1.1,
  tailwind-merge 3.7.0, tailwind-variants 4.0.2, eslint 10.15.0,
  @eslint/js 10.0.1, eslint-plugin-svelte 3.24.1,
  typescript-eslint 8.72.2, globals 17.14.0, eslint-config-prettier 10.1.8,
  prettier 3.10.1, prettier-plugin-svelte 4.1.1,
  prettier-plugin-tailwindcss 0.8.1, svelte-check 4.7.8, vitest 4.1.12,
  vitest-browser-svelte 2.2.1, @vitest/browser-playwright 4.1.12,
  playwright 1.65.1, @playwright/test 1.65.1, @types/node 26.6.6,
  drizzle-orm 0.45.4, drizzle-kit 0.31.11, postgres 4.1.1,
  better-auth 1.7.23.
- Deviations from docs 02/04 (recorded, deliberate):
  - Stylesheet is `src/routes/layout.css` (scaffold default), not `src/app.css`.
  - Component testing uses Vitest browser mode (vitest-browser-svelte +
    @vitest/browser-playwright); jsdom + @testing-library/svelte NOT
    installed (scaffold default wins).
  - `.gitignore` created by hand (starter had none; eslint.config.js
    requires it via `includeIgnoreFile`).
  - `test:e2e` is plain `playwright test` (no install step). See browsers.
  - Tier B installed directly with comment-only placeholders
    (`drizzle.config.ts`, `src/lib/server/db.ts`, `auth.ts`,
    `db/schema.ts`). Nothing wired; static build unaffected.
- Browsers (important): `playwright install` failed 3 times on this VM
  (full chromium 199.3 MiB twice, headless shell 125.7 MiB once —
  cdn.playwright.dev "server closed connection" each time, including
  after internal retries). A failed install WIPES the existing browser
  dir, so never re-run `playwright install` blindly here. The headless
  shell (Chrome for Testing 159.0.8154.6, v1255) was downloaded with
  resumable curl (retry + `-C -`), integrity-checked (`unzip -t`), and
  extracted by hand into
  `~/.cache/ms-playwright/chromium_headless_shell-1255/`. Launch + page
  render verified. Full chromium is NOT installed; headed mode would
  need it. Do not point Playwright at `/opt/meta-chromium` (Muse runtime
  browser, see AGENTS.md). No system Chrome/Chromium exists.
- Known warnings (non-blocking, all gates pass): `pnpm peers check` shows
  one unmet peer — runed@0.35.1 (via bits-ui) wants @sveltejs/kit
  ^2.21.0, installed 3.2.0. drizzle-kit install warned about 2 deprecated
  transitive subdependencies (@esbuild-kit/*). Neither blocks build/test.
- Verification (2026-11-15, all with real exit codes via pipefail):
  `pnpm check` 0 errors/0 warnings; `pnpm lint` pass (Prettier + ESLint);
  `pnpm test` pass — Vitest 5 files/8 tests (incl. browser component
  test) + Playwright 2/2 (incl. self-hosted-fonts + no-Google-CDN
  assertions); `pnpm build` pass (adapter-static, prerender, site in
  `build/`); preview + dev smoke via curl HTTP 200 with H1 present.
- Demo UI build: see the entry below (built 2026-11-15, after setup).

### 2026-11-15 — Demo UI build (Phase 1 pages + components)

- Built: home (Hero/About+stats/Services/SelectedWork/TechStack/CTA),
  `/projects`, `/projects/[slug]` (4 case studies), `/blog`,
  `/blog/[slug]` (3 demo posts), `/contact` (superforms SPA demo form),
  `sitemap.xml`, `robots.txt`, `favicon.svg`, `og.png` (screenshot of
  the hero, 1200x630).
- Data: `src/lib/data/*.ts` validated by Zod schemas; pages load via
  `+page.ts`; dynamic routes use `entries()` for prerendering.
- Illustrations are original SVG geometry (HeroArt/AboutArt/CtaArt) +
  CSS phone skeletons (PhoneMockup). No screenshot artwork copied.
- Kit 3 findings (also in AGENTS.md): `$lib` was removed in Kit 3.2.0,
  so 95 imports migrated to `#lib` + `package.json` `imports` +
  tsconfig `paths`; there is no `svelte.config.js` (config lives in
  `vite.config.ts`); prerender validates fragment links (service hrefs
  changed to `/#services`); `svelte/no-navigation-without-resolve`
  disabled (no base path); page components type data via `PageData`
  from `./$types`.
- Lucide 1.x has no brand icons → `SocialIcon.svelte` uses hand-drawn
  minimal marks + the closest Lucide glyphs. formsnap is installed +
  import-verified, but the Phase 1 form is hand-rolled with superforms
  SPA (`resetForm: false`, so the success state keeps the user's name);
  formsnap wiring is deferred to Phase 2.
- Contact form: superforms 3 + `zod4Client`, SPA mode, client
  validation only, demo success state, nothing sent or stored.
- Verification: check 0 errors/0 warnings, lint pass, Vitest 12/12
  (6 files), Playwright 6/6 (home/fonts, navigation, contact, mobile
  menu), build pass (11 pages prerendered). Visual QA via Playwright
  screenshots (desktop + mobile) reviewed 2026-11-15; screenshots in
  `ayaan-raza/qa/`. Design tokens in doc 05 confirmed, values kept.

### 2026-11-15 — Cloudflare Pages deploy workflow (GitHub Actions)

- Host picked by the user: Cloudflare Pages, deploy via GitHub Actions
  on every push. Workflow: `.github/workflows/deploy.yml` at the repo
  root (`ayaan-raza/`; the app lives in `portfolio/`, so all pnpm steps
  run with `working-directory: portfolio` and the deploy uploads
  `portfolio/build/`).
- `cloudflare/pages-action@v1` is deprecated/unavailable (confirmed
  2026-11-15 from the wrangler-action README + 2026 write-ups); the
  workflow uses the current official route,
  `cloudflare/wrangler-action@v4` (defaults to Wrangler v4), with
  `actions/checkout@v6`, `pnpm/action-setup@v6` (pnpm 12),
  `actions/setup-node@v6` (Node 26, same major as local 26.13.1).
  Node 24-era majors used throughout (Node 20 actions deprecated).
- Trigger `on: push` (all branches) + `workflow_dispatch`; `main`
  deploys production, other branches deploy previews (Wrangler fills
  in branch/commit). Single job, fail fast: frozen-lockfile install,
  Playwright Chromium install, lint, check, Vitest run, build, E2E,
  secrets-presence guard, then
  `pages deploy portfolio/build --project-name=ayaan-raza-portfolio`.
  Permissions `contents: read` + `deployments: write`; concurrency
  per ref with cancel-in-progress.
- Secrets (repo Settings -> Secrets and variables -> Actions):
  `CLOUDFLARE_API_TOKEN` (Edit Cloudflare Pages permission),
  `CLOUDFLARE_ACCOUNT_ID`. Project name `ayaan-raza-portfolio` was
  confirmed by the user 2026-11-15 (same name for the GitHub repo);
  it must match the Cloudflare dashboard project name exactly.
- Verification 2026-11-15: workflow YAML parses (12 steps, triggers
  push + workflow_dispatch); every referenced pnpm script exists;
  `pnpm build` exit 0 (adapter-static, site in `build/`). Git repo
  initialised locally (branch `main`, 106 files, no node_modules /
  build / secrets staged); SSH via ssh.github.com:443 re-verified
  (`Hi dusmamud!`) after re-mirroring `/home/hatch/.ssh/config` to
  `/root/.ssh/config` (the mirror was missing after a VM replacement).
  Repo created 2026-11-15 via the PAT API (`POST /user/repos`,
  private, empty, default branch `main`):
  https://github.com/dusmamud/ayaan-raza-portfolio — the user first
  said he would handle the rest himself, then asked Muse to do
  everything except the secrets. Pushed the same day over SSH
  (ssh.github.com:443). The two Cloudflare secrets are added by the
  user; the first workflow run stops at the secrets guard until then,
  then a re-run deploys.
- Spelling correction (same day): the repo was first created via the
  API as `ayan-raza-portfolio` (one 'a' — typo in the create call,
  matching a typo in the workflow env), which made the first push
  fail with "Repository not found" because the remote used the
  intended `ayaan-raza-portfolio`. Renamed via `PATCH /repos/...`
  to `dusmamud/ayaan-raza-portfolio` (verified: private, main,
  empty); workflow `PAGES_PROJECT_NAME` fixed to `ayaan-raza-portfolio`
  in the fix commit. Nothing was deleted.
- Workflow parse fix (same day): a step-level `if:` cannot reference
  the `secrets` context — GitHub rejected the whole workflow at parse
  time (dispatch API 422: "Unrecognized named-value: 'secrets'"), so
  the first push run failed instantly with 0 jobs. The secrets guard
  was rewritten to check presence via env vars in a shell step (values
  never printed); a manual dispatch then verified the workflow parses
  and runs. Site `baseUrl` still the `https://ayaanraza.demo`
  placeholder until the live Pages URL is known.

### 2026-11-15 — Live deploy + generated artwork integration

- Live: https://ayaan-raza-portfolio.pages.dev/ — confirmed by the user
  2026-11-15 and verified serving the site the same day. The earlier
  Deploy-step failure cause was never read from the run logs. Site
  `baseUrl` swapped from the `https://ayaanraza.demo` placeholder to
  the live Pages URL (one line, `src/lib/data/site.ts`).
- Artwork: 7 PNGs generated via subagents and integrated the same day
  into `portfolio/static/images/` (hero/about/CTA illustrations,
  1920x1280; 4 app screens, portrait). Hero/About/CTA sections now
  render `<img>` tags (rounded card + soft shadow); the hand-drawn SVG
  components (HeroArt/AboutArt/CtaArt) were removed. PhoneMockup now
  shows the generated screen inside the phone frame (fixed 9:19
  aspect + object-cover, so all 4 cards align; the screen is chosen
  by the project's mockup variant via `$derived`). Generation sidecar
  JSONs were deleted and filenames normalized; no "Shoaib"/"SH." text
  appears anywhere.
- Visual QA re-run 2026-11-15 (Playwright screenshots, desktop +
  mobile, `qa/*-v3.png`): cards aligned, illustrations render as
  rounded cards, mobile stacks cleanly. Note: lazy-loaded images
  below the fold appear blank in full-page screenshots (a capture
  artifact); section clips confirm they load on scroll.
- Gates re-verified after integration + polish: check 0 errors /
  0 warnings, lint pass, Vitest 12/12, Playwright 6/6, build pass.
  `og.png` regenerated from the new hero screenshot (1200x630).

### 2026-11-15 — Reference-fidelity pass (v4)

- The user rejected the first artwork integration (cards + layout did
  not match the reference closely enough). Fixes, all verified by
  screenshots (`qa/*-v4.png`, scroll-aware capture so lazy images
  load): hero illustration regenerated with the reference arrangement
  (large 3/4 laptop with keyboard, floating tilted phone, plant left,
  AR. mug right, pink blob); the 3 illustration backgrounds were
  recolored in place (numpy + scipy connected-component mask, feathered)
  to the exact section colors (hero #FFF7F1, about/CTA #FDE8EE) so the
  artwork blends into the sections with no card/border; About stats
  moved into the right column under the text (4-across, as in the
  reference); PhoneMockup now shows two phones, both with the generated
  screen (back phone tilted); section padding tightened. Original
  pre-recolor files kept as `qa/*-orig.png`, first hero as
  `qa/hero-illustration-v1.png`. Gates re-verified: check 0/0, lint
  pass, Vitest 12/12, Playwright 6/6, build pass. `og.png` regenerated
  from the new hero screenshot.

### 2026-11-15 — Work-section screen fit + responsive cross-verification (v5)

- The user reported screens not fitting the phone frames and the
  design not being responsive. Cross-verification ran at 8 widths
  (320/360/390/640/768/1024/1280/1440) plus the case-study page:
  scripted overflow check found 0 overflowing elements at every
  width, so the layout itself was sound. The real defects were the
  assets: Shopio + WalletWise screens had an inset white panel on a
  colored background (a card inside the phone), while Foodly +
  FitTrack were full-bleed; FitTrack was also wider than the 9:19
  frame (1152x2048) so the browser side-cropped it. Fix: Shopio +
  WalletWise screens regenerated full-bleed edge-to-edge (1008x2128,
  exact 9:19); FitTrack center-cropped to 970x2048 (exact 9:19, no
  content lost — verified visually); all four screens now share the
  frame aspect exactly. PhoneMockup sizes made responsive
  (w-44 default, w-40 at lg, w-44 at xl) so phones fit the narrow
  4-column cards at 1024px. Re-verified at all 8 widths
  (`qa/v5-work-*.png`, overflow 0 everywhere). Gates green again:
  check 0/0, lint pass, Vitest 12/12, Playwright 6/6. Old screens
  kept as `qa/screen-*-v1.png` / `qa/screen-fittrack-orig.png`.

### 2026-11-15 — CTA illustration full-bleed on mobile (v6)

- The user marked side gaps around the CTA illustration on mobile.
  Cause: the section container's side padding (px-4 / px-6) inset
  the image. Fix: the illustration wrapper now uses negative
  horizontal margins below lg (`mx-[-1rem] sm:mx-[-1.5rem]
  lg:mx-0`), cancelling the container padding so the image spans
  the full viewport width while stacked; desktop 2-column layout
  unchanged. Verified by geometry + screenshots at 5 widths
  (`qa/v6-cta-*.png`): image left=0 and right=viewport width at
  320/360/390/768, zero overflow everywhere. Gates green: check
  0/0, lint pass, Vitest 12/12, Playwright 6/6.

### 2026-11-15 — New landing sections + real tech-stack icons (v7)

- Home page completed with five new sections: Experience timeline
  (3 demo roles), Process (4 steps, ghost numerals), Testimonials
  (3 demo clients, 5-star, monogram avatars, honesty footnote),
  Blog preview (shared PostCard component, also used by /blog),
  FAQ (native details/summary accordion, plus rotates on open).
  Order: Hero, About, Services, Selected Work, Experience,
  Process, Testimonials, Tech Stack, Blog preview, FAQ, CTA.
- Tech Stack rebuilt with REAL brand icons: Simple Icons (CC0)
  SVG path data fetched from cdn.simpleicons.org and self-hosted
  inline in `src/lib/data/tech.ts` (13 entries, 3 groups, brand
  hex fills, no external requests). SvelteKit and Playwright have
  no Simple Icons slug — SvelteKit uses the Svelte mark, Playwright
  was dropped. Footer keeps the plain name list from site.ts.
- Gotcha fixed: after changing the +page.ts load shape,
  `svelte-kit sync` must run before svelte-check or PageData types
  are stale (6 false errors). Gates green: check 0/0, lint pass,
  Vitest 14/14, Playwright 6/6. Verified via `qa/v7-*.png`
  (desktop + mobile, overflow 0, FAQ open state captured).

### 2026-11-15 — Missing pages completed (v8)

- New routes: /about (bio, illustration panel, stats, values),
  /services (index) + /services/[id] (4 detail pages: includes
  checklist, approach, related projects, other-service chips),
  /privacy (honest demo policy), /resume (CV with print/PDF
  button; print CSS hides header/footer), and a branded +error
  page (404 + generic states, noindex). Service "Read more" links
  and footer Services links now point at the detail pages instead
  of the /#services anchor. Hero "Download CV" button now links
  to /resume (was a dead "#"). Sitemap extended to all new URLs.
- Gotcha fixed: +error.svelte must not declare status/error props
  (eslint valid-prop-names-in-kit-pages rejects them) — it reads
  page.status / page.error from $app/state instead. Gates green:
  check 0/0, lint pass, Vitest 16/16, Playwright 6/6. Verified via
  qa/v8-*.png (6 pages, desktop + mobile, overflow 0).
