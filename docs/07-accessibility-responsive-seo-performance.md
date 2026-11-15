# 07 — Accessibility, responsive design, SEO, performance

These are acceptance criteria, not aspirations. A section is not "done"
until its checklist items pass. Checklists are verified manually + with
`svelte-check` (a11y warnings) + browser DevTools + keyboard-only testing.

## Accessibility (target: WCAG 2.2 AA)

### Structure and semantics

- [ ] One `<h1>` per page (hero headline). Headings in order, no skipped
      levels. Sections use `<section aria-labelledby="...">` with real
      heading IDs.
- [ ] Landmarks: `<header>`, `<nav aria-label="Primary">`, `<main>`,
      `<footer>`, one `<main>` only.
- [ ] Lists are real lists (`<ul>`/`<ol>`): nav, services, projects, footer
      link groups.
- [ ] Buttons vs links: navigation = `<a href>`, actions = `<button>`.
      No clickable `<div>`/`<span>`, no `on:click` without keyboard support.
- [ ] Images: meaningful images have concise `alt`; decorative art/SVG has
      `aria-hidden="true"` and no `alt`. No `alt` text that repeats
      adjacent visible text.
- [ ] Icons: Lucide icons are decorative by default (`aria-hidden`); if an
      icon is the only content of a control, the control has an
      `aria-label` (e.g. social links, menu button).

### Keyboard and focus

- [ ] Every interactive element reachable + operable by keyboard alone
      (Tab/Shift+Tab, Enter/Space, Escape closes menu/dialog).
- [ ] Visible focus state on everything (`:focus-visible` styles, accent
      outline, never `outline: none` without a replacement).
- [ ] Skip link ("Skip to content") as the first focusable element.
- [ ] Mobile menu + dialog: focus trap while open, Escape closes, focus
      returns to the trigger. Background content inert while open.
- [ ] Anchor navigation moves focus to the target section heading
      (sections are focusable via `tabindex="-1"` on scroll targets).
- [ ] No keyboard traps. No interaction requires hover alone.

### Contrast, motion, forms

- [ ] Text contrast ≥ 4.5:1 (normal) / 3:1 (large text, ≥18pt/14pt bold).
      Verify every token pair used (ink/cream, body/cream, white/accent,
      muted/footer). Record results in the QA notes; fix tokens, not
      individual components, if a pair fails.
- [ ] `prefers-reduced-motion: reduce` disables reveal/counter/hover-lift
      animation (CSS media query + JS check in the reveal action).
- [ ] Forms: every input has a visible `<label>`, errors are inline with
      `aria-describedby` + `aria-invalid`, error summary (if any) receives
      focus. Required fields marked in text, not colour alone.
- [ ] Colour is never the only signal (links also underline on hover/focus;
      active nav also has `aria-current`; errors also have text + icon).
- [ ] Touch targets ≥ 24×24 CSS px (AA minimum), 44×44 preferred for
      primary actions. No tiny tap targets on mobile.
- [ ] `svelte-check` reports zero a11y warnings. Warnings are fixed, never
      suppressed with comments, unless a decision is recorded in
      `01-overview-decisions.md`.

## Responsive design (mobile-first)

Tailwind is mobile-first by default: base styles are the mobile layout;
`sm:` / `md:` / `lg:` / `xl:` add complexity as the viewport grows.
Never write desktop-first CSS and "fix" mobile afterwards.

| Breakpoint | Layout rules |
|---|---|
| Base (mobile, <640px) | Single column everywhere. Hero: copy, then illustration. Services/projects: 1 card per row. Header: logo + hamburger. Stats: 2×2 grid. Footer: stacked. |
| `sm` (≥640px) | Services/projects: 2 per row. Stats: 4 across (or 2×2 if cramped — verify visually). |
| `md` (≥768px) | Hero stays stacked until `lg` unless the design holds up — verify, do not assume. Nav may show inline from `md` or `lg` (decide visually; record choice). |
| `lg` (≥1024px) | Hero: 2 columns. Services/projects: 4 per row. Full nav inline. Footer: multi-column. Matches the reference screenshot layout. |
| `xl` (≥1280px) | Content capped at `max-w-7xl`, centred. No full-bleed text lines. |

Checklist:

- [ ] No horizontal scroll at 320px, 375px, 768px, 1024px, 1440px.
- [ ] No clipped text or overlapping decorations at any tested width.
- [ ] Images/SVG scale (`max-w-full h-auto`), never fixed pixel widths that
      overflow mobile.
- [ ] Typography uses `clamp()` for display sizes; body text never below
      `0.875rem` for readable copy.
- [ ] Test on a real small viewport (DevTools device mode minimum; a real
      phone if available) before calling responsive "done".

## SEO (Phase 1 foundations, no extra library)

- [ ] Every route sets `<title>`, `meta description`, canonical URL,
      Open Graph + Twitter card tags via SvelteKit head handling in
      `+layout.svelte` / per-page head. Defaults in the layout, overrides
      per page. No duplicate titles.
- [ ] `static/robots.txt` allows crawling (demo: allow, but note the site
      is a demo in docs — do not `noindex` unless the owner asks, and do
      not claim production SEO results from a demo).
- [ ] Sitemap: generate `sitemap.xml` for all prerendered routes
      (SvelteKit endpoint or build-time generation — implement in Phase 1
      setup, keep it automatic, never hand-maintained).
- [ ] `og.png` social image present (placeholder art in Phase 1, real art
      before any public launch).
- [ ] JSON-LD `Person`/`ProfilePage` schema on the home page with demo
      data clearly marked in code comments (do not publish fake credentials
      as structured data to a production domain).
- [ ] Semantic HTML (above) + fast load (below) are the SEO foundation.
      No SEO plugin is installed in Phase 1; re-evaluate only if meta
      handling grows complex.

## Performance budgets (Phase 1 targets)

| Metric | Target |
|---|---|
| Lighthouse Performance (mobile, throttled) | ≥ 90 |
| Lighthouse Accessibility / Best Practices / SEO | ≥ 95 / 90 / 90 |
| Largest Contentful Paint (mobile) | < 2.5s on a mid-tier device profile |
| Total blocking time | Minimal — no heavy JS on first load; Svelte compiles small bundles |
| Fonts | Only weights used, self-hosted, `font-display: swap` |
| Icons | Tree-shaken Lucide imports only; no icon font, no full-library import |
| Images | Optimised formats/sizes, `loading="lazy"` below the fold, explicit `width`/`height` or aspect ratio to prevent layout shift |

Rules:

- No third-party scripts in Phase 1 (no analytics, no chat widgets, no
  font CDN). Every third-party request added later needs a decision +
  a performance re-check.
- Prefer CSS for decoration (blobs, waves, gradients) over images.
- Measure with Lighthouse + WebPageTest-style checks after build, on the
  production build (`pnpm build` + `preview`), never on the dev server.
  Record results in the QA notes; do not claim scores that were not
  measured.
