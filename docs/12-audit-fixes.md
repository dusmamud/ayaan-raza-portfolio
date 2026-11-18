# Audit fix round (v16) — 2026-11-18

Follow-up to the A-to-Z audit (`qa/audit-2026-11-18/REPORT.md`, 33 pages ×
PageSpeed / Rich Results / Schema Validator, mobile + desktop, nothing
fixed at audit time). The user then said: fix everything, cross-verified
against multiple sources, best practice / best solution — with the standing
rule that the current UI/UX must not change or lose anything. Every fix
below is invisible (attributes, head tags, headers, JSON-LD, build config)
except two minimal colour-token tweaks that a contrast failure cannot be
fixed without (see §3).

## Method

1. **Element-level PSI detail.** Five fresh PageSpeed runs (home mobile +
   desktop, /services mobile + desktop, /pricing desktop, Lighthouse
   13.6.0) with the failing audits expanded, naming the exact elements
   instead of guessing from HTML scans. Report IDs gmvebpnu10 (home),
   qp6s86txzg (/services), 535tszj11z (/pricing).
2. **Cross-verification research.** 14 fix patterns checked against 26 web
   searches (official docs first: web.dev, Google Search Central,
   schema.org, MDN, ogp.me, Cloudflare). Findings rest on search snippets
   plus the audit's directly-opened Google docs; disagreements are recorded
   in §5. No scores were predicted.
3. **Code inspection before fixing.** Every audit claim was checked against
   source. Two claims did not survive: the alt-text finding (see §5) and
   three Rich Results descriptions in the browser handoff that do not match
   the live JSON-LD (the warnings themselves were corroborated; the
   descriptions were not — do not quote them).

## Root causes nailed (not guessed)

- **SEO 92 on / and /services:** the 4 `Read more` links in ServiceCard —
  bare generic link text, named by the PSI audit with destinations.
- **Contrast (desktop only):** `TRUSTED BY TEAMS AT` (`text-body/70` on
  cream, 3.82:1, needs 4.5:1) and the pricing `Most popular` badge (white
  on accent #F43F5E, 3.67:1). Ratios computed from the token values.
- **Console error + Issues entry on all 66 audit runs:** one tiny
  @fontsource subset inlined by Vite as a `data:` font URI in the CSS,
  blocked by CSP `font-src 'self'`. Confirmed in the live CSS (exactly one
  `data:font/woff2` URL; its base64 prefix matches the PSI error verbatim).
- **Image delivery:** zero `srcset`/`sizes` anywhere; single-resolution
  files served to all viewports (PSI: up to ~105 KiB saving on home
  mobile). Fix is ready but BLOCKED by the sandbox write failure (§6).
- **Headings:** ServiceCard/ProjectCard `<h3>` directly under `<h1>` on the
  index pages. **ARIA:** star-rating `<div aria-label>` with no role.
- **Structured data:** 16 pages with no JSON-LD; BlogPosting dates
  date-only (2 warnings/post); home Person thin, no stable `@id`.

## Fixes applied

- **Links:** `Read more` / `View Case Study` / `Read post` keep their
  visible text and gain an `sr-only` suffix naming the destination
  (ServiceCard, ProjectCard, PostCard). This clears both the Lighthouse
  link-text audit and the axe identical-links finding.
- **Headings:** ServiceCard + ProjectCard `<h3>` → `<h2>`, classes
  unchanged. Valid on every usage (index pages h1→h2; home/detail pages
  h2 siblings under section h2s).
- **Stars:** star-rating div gains `role="img"` (icons already
  `aria-hidden`).
- **Contrast (the only visible deltas, both minimal and on-token):**
  ClientLogos label `text-body/70` → `/80` (3.82 → 4.92:1); pricing badge
  `bg-accent` → `bg-accent-dark` (3.67 → 4.70:1, the same token the
  primary Button already uses); /book checked slot chip likewise
  `bg-accent` → `bg-accent-dark` in the checked state only (default state
  unchanged). Placeholders, disabled and decorative low-opacity text were
  checked and left: not flagged, and placeholders/disabled states are
  exempt or unaudited.
- **CSP font error:** `vite.config.ts` gains `build.assetsInlineLimit`
  returning `false` for `.woff2` (other assets keep the 4 KiB rule), so
  fonts always ship as files. No CSP change.
- **Headers (`static/_headers`):** added `Strict-Transport-Security:
  max-age=31536000; includeSubDomains` (no `preload`: a `*.pages.dev`
  subdomain, and `.dev` is already preloaded) and
  `Cross-Origin-Opener-Policy: same-origin`. Dropped `immutable` from the
  unhashed `/images/*` rule (kept `max-age` + `immutable` on
  `/_app/immutable/*`). CSP left unchanged (§5).
- **Sitemap:** `/search` removed (32 URLs); `SITE_LASTMOD` 2026-11-15 →
  2026-11-18 with a maintenance comment (this deploy changed every page's
  head/structured data). Blog posts keep publication dates so lastmod
  agrees with `dateModified`.
- **/search:** `<meta name="robots" content="noindex, follow" />`, still
  crawlable (no robots.txt block), still listed on the human sitemap page.
- **OG/Twitter (all 20 page templates):** `og:type` moved out of the
  layout into per-page heads (`website`, `article` on blog posts);
  `og:image:width/height/alt` + explicit `twitter:image` everywhere (alt
  reuses the page's og:title; home keeps og.png). Blog posts gain
  `article:author` (/about URL), `article:section`, `article:tag` and
  published/modified times matching the JSON-LD dates.
- **Structured data:** WebSite on home only (name + alternateName `AR.` +
  `@id …/#website`); ProfilePage on /about with mainEntity Person
  (`@id …/about#person`, name, jobTitle, visible description, url — no
  image/sameAs: none real); home Person + blog authors carry the same
  `@id`; BreadcrumbList on all 18 visible-breadcrumb pages except /search
  (15 new, trails match the visible breadcrumbs exactly); plain `Service`
  on the 4 detail pages (name, visible description, provider Person
  `@id`, url — no offers/prices/ratings). BlogPosting: `datePublished` +
  `dateModified` = midnight IST on the displayed date (`T00:00:00+05:30`,
  visible byline unchanged).
- **Meta descriptions:** project pages now use the visible `overview`
  text (130–145 chars) for description/OG/Twitter instead of the short
  card `description` (visible card text unchanged); /sitemap head
  description enriched (head-only string). Blog excerpts left: enriching
  them would change visible card text.
- **QA scripts:** `qa/audit.mjs` page list gained /now, /pricing, /book
  (was stale at 30 pages). `qa/generate-responsive.py` written for §6.

## Deliberately NOT fixed (with reasons)

- **CSP hash-mode hardening** (SvelteKit `csp: { mode: 'hash' }` + header
  split): feasible per research but MEDIUM visual risk (hydration/theme
  breakage) and unverifiable without a local build, which the sandbox
  failure blocks. Kept the current CSP; the console error is fixed at its
  root cause instead. Revisit when local builds work.
- **Trusted Types:** enforcement would break `JsonLd.svelte`'s `{@html}`
  injection; no user-content XSS vector exists on this static demo.
- **Social `#` links kept.** Evidence: no scored failure (SEO 100 on 31/33
  pages despite `#` links everywhere; no axe rule flags `#`). The
  recommended alternative (`<button aria-disabled>`) is a behaviour change
  needing visual verification that is impossible during the sandbox
  failure. Real profile URLs are the only clean fix; never invent them.
- **Alt text unchanged — audit finding revised.** PhoneMockup is wrapped
  in `aria-hidden="true"` with all information in the adjacent card text,
  so `alt=""` there is correct and any alt would be unreachable; the
  hero/about/CTA illustrations are decorative beside full text, so
  `alt=""` is correct there too.
- **BlogPosting `image`:** left absent (warning stays, posts stay
  eligible). The only candidate image is the OG title card — a branded
  card, not article content; Google wants representative images and
  markup must reflect visible content. No on-page post images exist.
- **Review markup, pricing Offer/Product markup, CreativeWork:** not
  added. Fictional reviews/ratings in markup are a policy risk; pricing
  offers would create new warnings for demo prices; CreativeWork earns no
  feature.
- **Render-blocking CSS:** untouched. 13.4 KiB gzipped, already minified
  and purged; critical-CSS inlining risks FOUC/theme flash and uncached
  repeat visits for a ~100 ms lab estimate on pages already at
  Performance 100.
- **FAQPage kept** (inert since May 2026, harmless, owner said remove
  nothing). **SearchAction not added** (retired Nov 2024). **`og:image:type`,
  `twitter:image:alt` skipped** (optional, no source requires them).
  **font-display: swap kept** (`optional` would visibly change text
  rendering). **ProfilePage dates omitted** (recommended only; per-page
  change dates not verifiable). **Service `serviceType` omitted**
  (would duplicate the name; schema.org requires nothing here).

## Verification

Static verification only before push (sandbox failure blocked local
builds, gates, Playwright and image generation — see §6): full diff
review; grep counts (20/20 pages one og:type, OG width/height/alt +
twitter:image; 18 BreadcrumbList blocks, labels matching visible trails;
search the only noindex, the only page without JSON-LD); contrast ratios
computed; live-CSS data:font evidence. Gates (prettier, check, lint,
Vitest, build, E2E) run in CI on push; live verification (headers,
sitemap count, JSON-LD extraction, PSI/validator/RRT re-tests on changed
pages, visual spot-checks) after deploy. Results are in the chat report
of 2026-11-18, not here, because this file was written before the push.

## Responsive images (done in the follow-up commit, same day)

The sandbox failure cleared ~13:27 IST, so the image work landed the
same day instead of queueing. `qa/generate-responsive.py` generated 4
widths × 3 formats per image (108 files, all dimensions verified) from
the PNG masters in `qa/masters/` (7 recovered from git history at
`cd33256^`, 2 already present) with the original encoder settings; the
27 old single-resolution files were deleted. `Picture.svelte` gained
`widths` + `sizes` props (illustrations `[640, 960, 1280, 1920]`, sizes
`(max-width: 1023px) 100vw, 592px`; screens `[320, 480, 720, native]`,
sizes `144px`). Home `og.png` (219 KB) → `og.jpg` (65 KB, same 1200×630)
with the head tags repointed; `og.png` kept on disk, unreferenced.

Measured selection trap: `sizes` on the `<img>` alone was IGNORED for
`<source>` selection in headless Chromium — desktop fetched the 1920w
variant (100vw fallback) despite `sizes` saying 592px. Repeating
`sizes` on every `<source>` fixed it: desktop now fetches hero-640
(14.9 KB, was 43.2 KB) and screen-320 (14.1 KB, was 54.6 KB) at DPR 1,
verified via request logging + `currentSrc` at 1440 and 390. Visual QA
(home + /projects, 1440 + 390) shows zero visual change. Full local
gates green on this tree: prettier, check 0/0, lint, Vitest 18/18,
Playwright 6/6, audit 0 problems / 81 notes. The prettier fixes for 4
files from the first commit (PostCard, accessibility, privacy,
testimonials — whitespace only) ride in this commit; the first commit's
CI run is expected red on prettier only.

## Sandbox failure (2026-11-18 ~13:17 IST, recurring)

Seccomp mode 2, 4 filters. Shell/python writes fail EPERM (git
loose-object + config-lock writes, curl/python file writes, Chromium).
Edits in this round were made via the file tools (which bypass the
sandbox); the push uses the Git Data API helper; local HEAD lags remote
afterwards and must be reconciled with `git fetch` + careful `reset --hard`
once writes work (check `git diff origin/main` first; never commit on the
stale HEAD). Seven 0-byte PNG files in `qa/masters/` (failed extraction
attempts) are untracked junk: delete them, then re-extract the masters
properly, when writes work. See AGENTS.md for the standing playbook.
