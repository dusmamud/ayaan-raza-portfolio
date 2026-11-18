# Ayaan Raza portfolio — A-to-Z audit report, 2026-11-18 (NO FIXES MADE)

Owner instruction: test every page on PageSpeed Insights, Rich Results Test and the Schema.org
validator, mobile + desktop, give a real report, fix NOTHING first, then web-searched best practice.
Current UI/UX must not change or be removed — fixes must preserve the design exactly.
This report follows that instruction: findings + fix backlog only. Zero code, content or config changes
were made during this audit. Latest live deploy remains commit c7b28a9 (v15).

Site: https://ayaan-raza-portfolio.pages.dev/ — 33 sitemap URLs, all HTTP 200 (verified by curl).
Audit date: 18 November 2026, 12:00–12:52 IST.

## Method and coverage — read this first

| Tool | Coverage actually achieved | Notes |
|---|---|---|
| PageSpeed Insights (pagespeed.web.dev UI, Lighthouse 13.6.0) | 33 URLs x Mobile + Desktop = 66 runs, all completed | Direct `analysis?url=` links. No failures/retries. Mobile = emulated Moto G Power; Desktop = emulated desktop. |
| Schema.org validator (validator.schema.org, Fetch URL) | 33/33 URLs | 0 errors, 0 warnings everywhere. One Google reCAPTCHA on entry, cleared by the browser; no retries needed. |
| Rich Results Test (search.google.com/test/rich-results, Test URL) | 33/33 URLs, SMARTPHONE user agent only | Desktop user-agent runs were NOT performed (see Limits). 3 URLs failed first with "Something went wrong / Log in and try again", then passed on fresh-homepage retest without sign-in. |
| Independent live-HTML extraction (curl + parser) | 33/33 URLs: status, titles, meta, canonical, OG, H1s, heading order, JSON-LD bodies, images, links, ARIA, headers, asset sizes | Used to corroborate or qualify every browser-tool claim. Saved in `schema/pages.json`. |
| Web research (2026 best practice) | 40+ sources incl. web.dev + Google Search Central docs opened directly | Saved in `best-practices-2026.md`. |

PSI API route: the unauthenticated PageSpeed Insights API returned HTTP 429 immediately from this
VM, so NO API calls were retried, slowed or rerouted (per service-limit rules). All PageSpeed
numbers below come from the pagespeed.web.dev UI the owner named. No API key exists for this task.

## Headline — the honest summary

The site is genuinely fast and its structured data is valid. There is no site-wide failure.
The problems are specific and fixable without touching the visible design:

1. **Performance is excellent in the lab, with one real weakness:** Desktop Performance 100/100 on
   all 33 pages; Mobile 98–100. But mobile LCP is 2.1–2.4s on every image-bearing page — under the
   2.5s "good" line, but close to it — because images serve a single desktop resolution to phones
   (no `srcset` widths, no `sizes`). Text pages load at 0.9s; image pages at 2.1–2.4s.
2. **No real-user data exists yet:** CrUX field data is "No Data" on every page, both strategies.
   Nothing here is confirmed against real users. Lab scores do not rank the site.
3. **Structured data is valid but thin and patchy:** validator 0 errors / 0 warnings on all 33
   pages; Rich Results Test 0 errors on all 33. But 16 of 33 pages have NO JSON-LD at all, the
   homepage's Person block has only 4 fields, blog posts miss `image` + a timezone on
   `datePublished` (the only 3 warnings in the whole audit, x6 posts), and Google detects only
   2 rich-result types anywhere (Breadcrumbs + Article).
4. **Accessibility has 2 confirmed, pinpointed defects** (heading skip on 2 pages; prohibited
   ARIA on star-rating divs on 2 pages) plus 2 unconfirmed PSI claims (contrast, console errors)
   that need element-level checks before fixing.
5. **Under-the-hood SEO gaps the 3 tools don't fully surface:** every image (112) has empty
   `alt=""` including project screenshots; 5–10 placeholder `href="#"` links per page; OG tags
   miss `twitter:image`, dimensions and `alt`, and blog posts use `og:type: website` instead of
   `article`; `/search` is indexable AND in the sitemap; sitemap `lastmod` is frozen at 2026-11-15
   for pages changed in v15 (2026-11-17).

Correction to an interim chat message: it said 17 pages have no JSON-LD. The correct count is
**16 pages with no JSON-LD** (validator + extraction agree). The 17th page in the Rich Results
"nothing detected" list is the homepage, which HAS JSON-LD (Person + FAQPage) that Google's
Rich Results Test does not list as a supported type. See §3 reconciliation.

## 1. PageSpeed Insights — full results

Scores: Performance / Accessibility / Best Practices / SEO. Metrics: FCP / LCP / TBT / CLS / Speed Index.
All CrUX field data: No Data. Lab INP/TTFB are not shown in the PSI summary panel — no values claimed.
Best Practices = 92 on ALL 66 runs (same 7 items, see §1.2). No Opportunities for unused CSS/JS,
font display or cache policy appeared on ANY page — those areas are clean in the lab.

| # | Path | Mobile | Mobile metrics | Desktop | Desktop metrics |
|---|---|---|---|---|---|
| 1 | / | 98/96/92/92 | 0.9s/2.4s/0ms/0/1.3s | 100/91/92/92 | 0.3s/0.3s/40ms/0.001/0.5s |
| 2 | /about | 99/100/92/100 | 0.9/2.1/20/0/0.9 | 100/100/92/100 | 0.2/0.4/0/0.015/0.3 |
| 3 | /services | 100/98/92/92 | 0.9/0.9/0/0/0.9 | 100/98/92/92 | 0.2/0.2/0/0.024/0.2 |
| 4 | /projects | 98/98/92/100 | 0.9/2.3/20/0.017/0.9 | 100/98/92/100 | 0.2/0.4/40/0.012/0.3 |
| 5 | /blog | 100/100/92/100 | 0.9/0.9/0/0/0.9 | 100/100/92/100 | 0.2/0.2/0/0.001/0.3 |
| 6 | /contact | 100/100/92/100 | 0.9/0.9/10/0/2.2 | 100/100/92/100 | 0.2/0.2/30/0.012/0.4 |
| 7 | /privacy | 100/100/92/100 | 0.9/0.9/10/0.003/0.9 | 100/100/92/100 | 0.2/0.2/0/0.008/0.3 |
| 8 | /resume | 100/100/92/100 | 0.9/0.9/20/0.006/0.9 | 100/100/92/100 | 0.2/0.2/0/0.004/0.2 |
| 9 | /testimonials | 100/95/92/100 | 0.9/0.9/0/0/0.9 | 100/95/92/100 | 0.2/0.2/0/0.019/0.3 |
| 10 | /terms | 100/100/92/100 | 0.9/0.9/0/0/0.9 | 100/100/92/100 | 0.2/0.2/0/0/0.2 |
| 11 | /uses | 100/100/92/100 | 0.9/0.9/0/0/0.9 | 100/100/92/100 | 0.2/0.2/0/0.001/0.2 |
| 12 | /sitemap | 100/100/92/100 | 0.9/0.9/0/0/0.9 | 100/100/92/100 | 0.2/0.2/0/0/0.3 |
| 13 | /accessibility | 100/100/92/100 | 0.9/0.9/10/0.009/0.9 | 100/100/92/100 | 0.2/0.2/40/0/0.3 |
| 14 | /search | 100/100/92/100 | 0.9/0.9/10/0.008/0.9 | 100/100/92/100 | 0.2/0.2/0/0/0.3 |
| 15 | /now | 100/100/92/100 | 0.9/0.9/0/0.009/0.9 | 100/100/92/100 | 0.2/0.2/0/0.001/0.3 |
| 16 | /pricing | 100/100/92/100 | 0.9/0.9/0/0/2.5 | 100/95/92/100 | 0.2/0.2/0/0.002/0.3 |
| 17 | /book | 100/100/92/100 | 0.9/0.9/0/0.003/1.0 | 100/100/92/100 | 0.2/0.2/0/0.001/0.4 |
| 18 | /services/mobile | 100/100/92/100 | 0.9/0.9/20/0.029/0.9 | 100/100/92/100 | 0.2/0.2/20/0/0.3 |
| 19 | /services/design | 100/100/92/100 | 0.9/0.9/40/0.002/0.9 | 100/100/92/100 | 0.2/0.2/10/0.002/0.2 |
| 20 | /services/backend | 100/100/92/100 | 0.9/0.9/50/0.002/0.9 | 100/100/92/100 | 0.2/0.2/0/0/0.3 |
| 21 | /services/testing | 100/100/92/100 | 0.9/0.9/10/0.001/0.9 | 100/100/92/100 | 0.2/0.2/10/0.002/0.2 |
| 22 | /projects/foodly | 98/100/92/100 | 0.9/2.4/0/0.001/2.5 | 100/100/92/100 | 0.2/0.5/0/0/0.3 |
| 23 | /projects/shopio | 99/100/92/100 | 0.9/2.3/20/0.001/0.9 | 100/100/92/100 | 0.2/0.5/0/0/0.3 |
| 24 | /projects/walletwise | 98/100/92/100 | 0.9/2.3/20/0.001/0.9 | 100/100/92/100 | 0.2/0.6/40/0/0.3 |
| 25 | /projects/fittrack | 99/100/92/100 | 0.9/2.1/40/0.001/0.9 | 100/100/92/100 | 0.2/0.4/30/0.001/0.3 |
| 26 | /projects/wanderly | 98/100/92/100 | 0.9/2.4/40/0/2.2 | 100/100/92/100 | 0.2/0.6/30/0/0.3 |
| 27 | /projects/taskflow | 99/100/92/100 | 0.9/2.3/10/0/0.9 | 100/100/92/100 | 0.2/0.4/0/0/0.3 |
| 28 | /blog/design-systems-that-scale | 100/100/92/100 | 0.9/0.9/0/0.013/0.9 | 100/100/92/100 | 0.2/0.2/0/0/0.3 |
| 29 | /blog/forms-that-forgive | 100/100/92/100 | 0.9/0.9/0/0.016/0.9 | 100/100/92/100 | 0.2/0.2/20/0.001/0.3 |
| 30 | /blog/mobile-first-portfolios | 100/100/92/100 | 0.9/0.9/70/0.003/0.9 | 100/100/92/100 | 0.2/0.2/0/0.001/0.3 |
| 31 | /blog/flutter-vs-native-demo | 100/100/92/100 | 0.9/0.9/10/0.003/0.9 | 100/100/92/100 | 0.2/0.2/10/0.001/0.2 |
| 32 | /blog/small-details-big-ux | 100/100/92/100 | 0.9/0.9/70/0.014/0.9 | 100/100/92/100 | 0.2/0.2/40/0/0.3 |
| 33 | /blog/performance-budgets-demo | 100/100/92/100 | 0.9/0.9/0/0.002/0.9 | 100/100/92/100 | 0.2/0.2/10/0.001/0.2 |

### 1.1 Worst pages (ranked)
1. **/** — only page below 100 in every category on at least one strategy (mobile Perf 98,
   A11y 96; desktop A11y 91 = lowest in the audit; SEO 92 both). Mobile LCP 2.4s (joint-worst).
2. **/projects** — mobile Perf 98, IMG 259/270 KiB (largest in audit), CLS 0.017/0.012.
3. **/projects/foodly, /walletwise, /wanderly** — mobile Perf 98, LCP 2.3–2.4s, IMG 217/270 KiB.
4. **/services** — SEO 92 both, desktop CLS 0.024 (highest desktop CLS; still "good" < 0.1).
5. **/about, /shopio, /fittrack, /taskflow** — mobile Perf 99, LCP 2.1–2.3s.
6. **/testimonials** — Perf 100 but A11y 95 both strategies.
7. **/pricing** — Perf 100 but mobile Speed Index 2.5s (joint-worst) + desktop A11y 95.
All other pages: 100/100/92/100 on both strategies apart from the repeating items below.
Every CLS value (max 0.029) and every LCP value (max 2.4s) is inside the "good" thresholds
in the lab; every TBT (max 70ms) is well under 200ms. The site passes Core Web Vitals
thresholds in the lab on every page — narrowly on mobile image pages.

### 1.2 Repeating issues
- **P1 — Improve image delivery (12 image-bearing page groups only).** Est. savings: /projects
  259 KiB mobile / 270 KiB desktop; project pages 201–217 / 270 KiB; home 105 / 223 KiB;
  service pages 64–95 / 67–100 KiB; /about 18 / 19 KiB. Root cause (independently confirmed):
  no `srcset` width descriptors and no `sizes` on any image; one 1920x1280 / 1008x2128 file
  serves every viewport. AVIF/WebP/JPG `<picture>` order is correct; formats are not the problem.
- **P2 — Render-blocking resources, all 66 runs, 40–140ms est. saving** (typically 100–130ms;
  largest: /blog/design-systems-that-scale 140ms). Uniform FCP (0.9s mobile / 0.2s desktop)
  points at a template-level CSS cost (single 57.7 KB stylesheet). No unused-CSS/JS opportunity
  was shown, so this is the cost of the one stylesheet + head scripts, not dead code.
- **P3 — Best Practices 92 everywhere, same 7 items:** (a) browser errors logged to console,
  (b) issues in Issues panel, (c) CSP not effective against XSS, (d) no strong HSTS policy,
  (e) no COOP origin isolation, (f) no Trusted Types, (g) Baseline features. Items (c)–(e)
  independently confirmed: live headers have NO `Strict-Transport-Security` and NO
  `Cross-Origin-Opener-Policy`; CSP contains `'unsafe-inline'` (required by SvelteKit hydration
  + the inline theme script). Items (a)–(b) were NOT independently reproduced — see Limits.
  Fixing (d)/(e) is headers-only (`_headers`); (c)/(f) need care — do not break hydration.
- **P4 — 1–2 long main-thread tasks on most runs; forced reflow on ~half.** TBT stays 0–70ms,
  so neither moves any score today. Watch-item, not a fix priority. Do NOT "fix" by removing
  cursor/magnetic/spotlight behaviours — that would change the UX the owner wants kept.
- **P5 — Speed Index outliers (likely run variability):** 2.2–2.5s on /contact, /pricing,
  /foodly, /wanderly mobile despite FCP/LCP 0.9s and Perf 100 (except foodly 98). Re-test
  before treating as real; SI is the only outlier metric on those runs.
- **Agentic Browsing (new Lighthouse panel):** 3/3 everywhere except home Mobile 2/3 and
  /testimonials 2/3 both strategies. Reported as shown; no fix backlog item until its checks
  are understood — likely related to the same ARIA/link issues below.

### 1.3 Accessibility findings (PSI) — with independent verification
- **A1 CONFIRMED — Heading order skip on /services and /projects (A11y 98).** Live HTML shows
  h1→h3 on exactly these 2 pages (service/project card titles are `<h3>` with no `<h2>` before
  them). All other pages: no skips. Fix is invisible (same CSS classes, level h3→h2 or an h2
  before the grid).
- **A2 CONFIRMED — Prohibited ARIA attributes on / and /testimonials (A11y 96/91 home, 95
  testimonials).** Culprit identified by grep: `<div class="mt-3 flex gap-1 text-accent"
  aria-label="5 out of 5 stars">` (star ratings) — `aria-label` on a role-less `<div>` is
  prohibited and ignored by assistive tech. Present 3x on each flagged page, matching PSI
  exactly. FAQ panels (`role="region"` + `aria-labelledby`) are fine. Fix is invisible
  (`role="img"` or sr-only text).
- **A3 UNVERIFIED — Contrast failures, desktop-only, on / and /pricing (desktop A11y 91/95).**
  Cannot be verified from HTML; needs rendered contrast computation + element identification
  in the PSI UI. Any colour fix IS a design change — owner approval with the exact token
  required. Do not recolour silently.
- Everything else accessibility: 100 on all remaining page/strategy combinations. One `<h1>`
  per page (33/33), `lang="en"`, skip link, labelled form fields — all present.

### 1.4 SEO findings (PSI)
- **S1 — SEO 92 only on / and /services: "4 links without descriptive text" each.**
  NOT reproduced from SSR HTML: no bare generic link texts exist; all icon-only links carry
  `aria-label`s; "View Case Study" appears 4x on / but 6x on /projects (SEO 100), so repeated
  text alone does not explain it. Only shared 4-count element: the 4 service cards
  (unproven hypothesis). Resolution: expand the failing audit in the PSI UI, which shows
  destination + text per link. Do not guess the elements in the fix phase.
- All other pages: SEO 100. Canonicals self-referencing + absolute on all 33 pages; meta
  descriptions unique per page; `robots.txt` + sitemap valid; 404 returns real 404 status.

## 2. Schema.org validator — 0 errors, 0 warnings, all 33 pages

Every JSON-LD block that exists is vocabulary-valid. The finding is coverage + thinness, not errors.

| Pages | JSON-LD found | Errors / Warnings |
|---|---|---|
| / (home) | Person + FAQPage (2 blocks) | 0 / 0 |
| /services/mobile, /design, /backend, /testing | BreadcrumbList only (1 block each) | 0 / 0 |
| /projects/foodly, /shopio, /walletwise, /fittrack, /wanderly, /taskflow | BreadcrumbList only (1 block each) | 0 / 0 |
| 6x /blog/* posts | BlogPosting + BreadcrumbList (2 blocks each) | 0 / 0 |
| 16 pages: /about, /services, /projects, /blog, /contact, /privacy, /resume, /testimonials, /terms, /uses, /sitemap, /accessibility, /search, /now, /pricing, /book | NONE — "No items detected" | 0 / 0 |

Validator result matches the independent curl extraction exactly (block counts + types + breadcrumb
trails), including breadcrumb names. Confidence: high.

What the validator does NOT check: Google rich-result eligibility, required-vs-recommended Google
fields, or whether markup is missing entirely. "0/0" must never be read as "structured data complete".

## 3. Rich Results Test — 0 errors; 3 warnings x 6 blog posts; smartphone only

| Pages | Detected items | Errors | Warnings |
|---|---|---|---|
| 17 pages: / + the 16 no-JSON-LD pages above | None — "No items detected" | 0 | 0 |
| 10 pages: 4x /services/* + 6x /projects/* | Breadcrumbs, 1 valid item each | 0 | 0 |
| 6x /blog/* posts | Articles (BlogPosting) + Breadcrumbs, 2 valid items each | 0 | 3 each (Articles only) |

Total: 22 valid items. Only 2 rich-result types detected anywhere: Breadcrumbs (16 pages) and
Article/BlogPosting (6 posts). No FAQ, Person/Profile, Review or other type detected; nothing
reported as detected-but-not-eligible. All detected items are valid + eligible.

### 3.1 The only warnings in the audit (verbatim, identical on all 6 posts, all "(optional)")
1. `Missing field "image" (optional)`
2. `Invalid datetime value for "datePublished" (optional)`
3. `Datetime property "datePublished" is missing a timezone (optional)`

Cause (from extraction): BlogPosting has `datePublished` as date-only (`"2025-11-02"` etc., no
time/timezone) and no `image` field. Warnings 2+3 are the same field. Items remain valid +
eligible — these are non-critical. Fix (invisible): full ISO-8601 datetime with timezone
(e.g. `2025-11-02T09:30:00+05:30`) + a representative `image` (see §5.2 for ratio guidance).
NOT warned: missing `dateModified`, missing `publisher`, author fields (author Person already
has `name` + `url`). Do not report those as Rich Results failures.

### 3.2 Reconciliation — why the homepage shows "nothing" in RRT but has JSON-LD
The homepage HAS Person + FAQPage JSON-LD (validator 0/0, extraction-confirmed). RRT shows
"No items detected" because it lists ONLY Google-supported rich-result types: a bare `Person`
block is not a supported feature, and the FAQPage rich result stopped appearing for everyone
on 7 May 2026 (docs removed 15 June 2026). This is expected behaviour, not missing markup —
but it means the homepage currently earns NO rich result. The Google-supported way to get a
person feature is `ProfilePage` + `Person` on the **/about** page (see §5.2). Keep the visible
FAQ and the FAQPage markup (owner: no removal); expect zero Google display from it.
Breadcrumbs display is desktop-only since January 2025 (mobile shows the domain only) — the
markup is still valid and worth keeping.

### 3.3 Coverage gaps (no type detected where one could exist)
- **/about** — no ProfilePage/Person, though it IS the person page. Biggest single gap.
- **Index pages** (/services, /projects, /blog) — no BreadcrumbList, though their child pages
  have one. (A 1-item trail would not qualify anyway — BreadcrumbList needs ≥2 items; index
  pages would need Home → Index, which is legitimate.)
- **/services/* detail pages** — BreadcrumbList only; no `Service` markup for the service itself.
- **/projects/* pages** — BreadcrumbList only; no project/work markup.
- **/testimonials** — no Review markup (only add if reviews are genuinely shown as reviews;
  demo/fictional reviews in markup carry policy risk — owner decision, see §5.4).
- **/pricing** — no Product/Offer markup for the plans shown.
- **Home** — no `WebSite` block (Site Names feature uses homepage `WebSite` name+url).
- **No page** uses `@id` entity references; author Person is duplicated per post instead of
  referencing one canonical entity. Invisible fix: one stable absolute `@id` + references.

## 4. Findings beyond the 3 tools (live-HTML extraction, all independently verified)

These were found by fetching and parsing every live page. They are real problems even though
no tool in this audit scored them directly.

- **F1 — ALL 112 images have empty `alt=""`.** Hardcoded `alt=""` in Hero, About, Cta, PhoneMockup
  (x2) and /about page. Empty alt is correct ONLY for purely decorative images. Project
  screenshots inside phone mockups are content: screen-reader users get nothing, and image
  search gets no signal. Fix is attribute-text only, zero visual change: descriptive alt for
  content images (what the screen shows, in context, ~125 chars practical guideline), keep
  `alt=""` only where the image is truly decorative/redundant. No image is missing the `alt`
  attribute entirely (good); all have width+height (good — no CLS from images).
- **F2 — Placeholder `href="#"` links: 5 per page, 10 on / and /contact** (demo social icons,
  appearing twice on those pages). All carry `aria-label`s, so accessible names exist — but
  destinations are placeholders. Clicking scrolls to top + appends `#`. OWNER DECISION (see
  §5.4): keep + accept flags, convert to identically-styled buttons, or supply real URLs.
  Never invent social URLs; never remove the icons (owner instruction).
- **F3 — OG/Twitter gaps on ALL 33 pages:** no `twitter:image` (X falls back to `og:image`,
  so previews still work, but explicit is best practice); no `og:image:width` / `:height` /
  `:alt` on any page; `og:type` is `website` on every page including blog posts (posts should
  be `article` + `article:published_time` / `modified_time` / `author` / `section` / `tag`).
  Home OG image is `og.png` at 219 KB vs per-page JPG cards at ~38 KB (same 1200x630) — the
  home card is 5.7x heavier for no benefit. Keep OG cards PNG/JPG (never AVIF/WebP for
  crawlers). All fixes are head-tag/file swaps — zero visual change.
- **F4 — /search is indexable AND in the sitemap, with no `noindex`.** No page on the site has
  a robots `noindex` meta tag (33/33 empty). Internal search-result pages should be
  crawlable + `noindex` + excluded from the sitemap (Google guidance: search pages add no
  search value, waste crawl budget). Fix is meta + sitemap only. `/search` currently returns
  200 with an h1 and client-side results — confirm no `?q=` variants are linked/indexed.
- **F5 — Sitemap `lastmod` frozen/stale:** `2026-11-15` on all 17 static pages, though v15
  (2026-11-17) changed the home, footer, services cards and added 3 pages. Blog `lastmod`
  values (2025-08/09/10/11) match post dates. Google ignores `lastmod` when it is
  consistently inaccurate. Fix: per-page true last-significant-change dates, agreeing with
  `dateModified` where present. Never bump on every deploy/build.
- **F6 — Short meta descriptions (truncation risk, NOT violations).** Google sets NO character
  limit; 120–160 chars is a rule of thumb. Shortest: project pages 54–64 chars, /sitemap 58,
  /blog/flutter-vs-native-demo 63. Titles: shortest /now (16 chars), /blog (17), /uses (17).
  All titles/descriptions are unique per page (good). Improvement = richer unique descriptions
  with key words first; do not pad to hit an invented limit.
- **F7 — Thin Person block (home):** only `name`, `jobTitle`, `url`, `description`. No `image`,
  `sameAs`, `knowsAbout`, `@id`, email/address. Valid, but minimal entity signal. Enrich on
  /about via ProfilePage (see §5.2); keep home Person or link it via `@id` — do not duplicate
  conflicting entities.
- **F8 — No font/image preloads; hero image handling is otherwise good.** Hero `<img>` has
  `fetchpriority="high"` + `decoding="async"` and is NOT lazy-loaded (correct); all other
  images are `loading="lazy"` (correct). No `<link rel="preload">` exists. Fonts: WOFF2,
  `font-display: swap` (11 faces), variable fonts — PSI showed NO font-display opportunity,
  so font loading is not a scored problem today. Preloading 1–2 critical font faces (with
  `crossorigin`, even same-origin) is an optional micro-optimisation, not a fix for a failure.
  Do NOT switch to `font-display: optional` without owner approval (visible change for slow
  first visits).
- **F9 — Cache headers are mostly right:** immutable 1-year on `/_app/immutable/*` and
  `/images/*` (verified); HTML `max-age=0, must-revalidate` (correct for deploys). Gap: OG
  cards (`/og/*`), favicon, manifest get `max-age=0` too — harmless (small, infrequent), but
  long-cache + versioned names would be tidier. No action required; PSI showed no cache issue.
- **What is GOOD (do not break):** 33/33 status 200; exactly one h1 per page; heading order
  clean except A1; canonicals correct; robots.txt + sitemap valid; 404 = real 404; AVIF-first
  `<picture>` with WebP/JPG fallback; width+height on all images; lazy-loading correct;
  `lang`, viewport, theme-color, manifest, favicons present; CSP + security headers present
  (except HSTS/COOP); no unused CSS/JS, font or cache opportunities in PSI; JSON-LD that
  exists parses + validates; BreadcrumbList trails correct with absolute URLs.

## 5. Best practice + fix backlog (UI/UX preserved — nothing visual changes)

Sources: web.dev (Vitals, Optimize LCP/INP/CLS), Google Search Central (Article, ProfilePage,
Breadcrumb, structured-data policies, snippet docs), schema.org, ogp.me, WCAG 2.2. Full sourced
notes: `best-practices-2026.md`. Thresholds: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 (75th percentile,
field data — which does not exist yet for this site). Lab score bands: 90–100 good, 50–89 needs
improvement, 0–49 poor. Google ranks on FIELD vitals, not the lab score.

### 5.1 Priority 1 — errors / confirmed defects (do first)
1. A1 heading skip: /services + /projects card titles h3→h2 (same classes) or h2 before grid.
2. A2 star-rating divs: add `role="img"` (or sr-only text) on / + /testimonials.
3. BlogPosting dates: `datePublished` → full ISO-8601 + timezone on all 6 posts (clears 2 of
   the 3 RRT warnings per post). Keep the calendar date identical; add time+timezone only.
4. BlogPosting `image`: add a representative image per post (clears the 3rd warning). Must be
   crawlable/indexable, ≥50K pixels, ideally 16x9 + 4x3 + 1x1 variants; NOT a logo/placeholder.
   Note: blog posts currently show NO images on the page — the schema image may be the post's
   OG card or a dedicated image; it must still be representative of the article. If no suitable
   image exists, this stays a warning (items remain eligible) — do not invent one silently.
5. S1 link-text: expand the failing PSI audit to NAME the 4 links on / and /services, then fix
   only those (descriptive text or aria-label). Do not bulk-rewrite link text.
6. F4 /search: add `noindex` meta + remove from sitemap.xml (keep crawlable; do not robots-block).

### 5.2 Priority 2 — performance + structured-data warnings/coverage (invisible)
7. Responsive images: generate 3–5 widths per image + `srcset`/`sizes` (phones must not download
   1920px/1008px files). Expected effect: mobile LCP 2.1–2.4s → near text-page levels; IMG
   opportunity largely cleared. Same pictures, same layout, smaller downloads. Also consider a
   smaller home OG card (JPG ~38 KB like the others) — separate file, no page change.
8. Render-blocking: investigate the 100–130ms CSS cost (single 57.7 KB stylesheet). Options that
   preserve visuals: trim genuinely unused rules (verify with Coverage — PSI reported none, so
   expect small gains), keep one stylesheet, do NOT inline critical CSS without visual
   verification (FOUC risk). Accept that some blocking cost is inherent; 40–140ms is small.
9. Headers (`_headers`, invisible): add `Strict-Transport-Security` (strong HSTS) +
   `Cross-Origin-Opener-Policy: same-origin`. Review CSP hardening WITHOUT breaking hydration
   (SvelteKit needs inline scripts; nonces/hashes need build support — do not just delete
   `'unsafe-inline'`). Trusted Types: evaluate; do not adopt blindly (can break inline handlers).
10. ProfilePage on /about: `ProfilePage` + `mainEntity: Person` (name required; recommended:
    description, image if a real portrait exists — never a placeholder, sameAs only for real
    controlled profiles, dateCreated/dateModified). Give the Person one stable absolute `@id`
    and reference it from home Person + blog authors instead of duplicating the entity.
11. `WebSite` (name + url) on the homepage only, for Site Names. Do NOT add `SearchAction`
    (sitelinks search box retired Nov 2024 — inert).
12. BreadcrumbList on index pages (/services, /projects, /blog) as Home → Index trails, if the
    visible breadcrumbs match. Keep trails = typical user path.
13. Consider `Service` markup on /services/* detail pages and plan/Offer markup on /pricing —
    ONLY for content visibly shown. No invented prices/ratings/availability.
14. OG completion (all pages): add `og:image:width` (1200) + `height` (630) + `og:image:alt`;
    add explicit `twitter:image`; blog posts → `og:type: article` + `article:*` tags with the
    SAME dates as the JSON-LD (timezone included) and `article:author` = profile URL (not name).
15. F5 sitemap `lastmod`: set true per-page last-significant-change dates; keep agreeing with
    `dateModified`. Omit `priority`/`changefreq` (Google ignores them).

### 5.3 Priority 3 — content/attribute polish (invisible)
16. F1 alt text: descriptive alt for content images (project screens, illustrations conveying
    content); keep `alt=""` only for purely decorative/redundant images. No "image of…", no
    keyword stuffing, no repeating adjacent headings verbatim.
17. F6 meta descriptions: enrich the shortest ones (project pages, /sitemap) with specific,
    useful facts; key words first. No padding to an invented limit.
18. F7 Person enrichment: only via the /about ProfilePage work (item 10) — one entity, one `@id`.
19. Console/Issues-panel items (P3a/b): reproduce in a real browser console first, fix only real
    errors. If nothing reproduces, record as lab-only and move on.

### 5.4 Owner decisions — DO NOT GUESS (ask before the fix phase)
- **D1 — Demo `href="#"` social links (F2):** keep + accept flags, identically-styled `<button>`s,
  or real profile URLs. No invented URLs, no icon removal.
- **D2 — Contrast (A3):** if PSI detail names failing elements, any colour/token change needs
  explicit approval — it IS a design change.
- **D3 — Review markup on /testimonials:** demo/fictional reviews in structured data risk a
  manual action if ever treated as real. Default: do NOT add Review markup to fictional content.
- **D4 — `font-display: optional`:** rejected by default (visible fallback-font change). Keep `swap`.
- **D5 — Removing inert markup:** FAQPage + any future SearchAction earn no rich result but are
  harmless. Owner said no removal — default KEEP. Do not remove FAQPage to "clean up".
- **D6 — BlogPosting image (item 4):** if no representative image exists per post, leave the
  warning (still eligible) rather than forcing a placeholder/OG reuse the owner hasn't approved.

## 6. Limits — what this audit did NOT establish

- **No real-user (field) Core Web Vitals exist** (CrUX No Data, all pages). INP was never measured
  (lab cannot measure INP; TBT is only a proxy). Do not claim the site "passes CWV for users".
- **Rich Results desktop user-agent: NOT tested.** Smartphone results only. Structured data HTML
  is identical for both, but desktop results were not run and must not be claimed.
- **PSI console errors / Issues-panel contents: not reproduced.** No element-level detail was
  captured for contrast failures or the 4 SEO links. The fix phase must expand those audits in
  the PSI UI first.
- **Lab variability:** single PSI run per URL/strategy. Speed Index outliers + small CLS/TBT
  differences may not reproduce. Re-run PSI after fixes; compare like-for-like.
- **Browser-task reports:** PageSpeed/validator/RRT numbers came via browser tasks. Validator +
  RRT results match independent extraction exactly (high confidence). PSI per-page scores could
  not be re-verified via API (429) — but PSI's internal patterns match extraction (IMG only on
  image pages; heading/ARIA flags match HTML scans exactly; header items match live headers),
  which materially raises confidence. Treat exact scores as "as measured 18 Nov 2026, lab" —
  they will vary slightly run to run.
- **Scope:** live site only (ayaan-raza-portfolio.pages.dev, commit c7b28a9). No local build,
  no visual QA, no interaction testing, no Search Console data (no access claimed), no X/Twitter
  card validator run (X card docs are archived; X numbers in research are second-hand).

## 7. Evidence files (this folder: qa/audit-2026-11-18/)
- `REPORT.md` — this report.
- `pagespeed/pagespeed-results.md` — full 66-run PSI table + repeating issues.
- `pagespeed/corroboration.md` — independent HTML/header verification of PSI claims.
- `schema/pages.json` — per-page extraction (titles, meta, OG, JSON-LD bodies, images, links).
- `schema/summary.md` — extraction one-liners. `schema/validator-results.md` — validator table.
- `schema/rich-results-results.md` — Rich Results table + verbatim warnings + reconciliation.
- `best-practices-2026.md` — sourced 2026 best-practice research.
- `extract.py` — read-only extraction script (re-runnable).

## 8. Verdict in one paragraph
Nothing is broken at the foundation: the site is fast, valid and well-formed. The fixable problems
are (a) one-resolution images hurting mobile LCP, (b) two small accessibility defects with known
culprits, (c) thin/patchy structured data with exactly 3 repeated warnings, (d) header gaps
(HSTS/COOP), (e) empty alt text everywhere, placeholder social links, OG gaps, an indexable
/search page and stale sitemap dates. Every fix in §5 preserves the current UI/UX exactly — all
changes are attributes, head tags, headers, image files/sizes and JSON-LD. Two items need the
owner's word first (social links, any colour change); everything else can proceed on approval.
