# Gap round 2 — fidelity, motion & missing pages (2026-11-17)

Second cross-verification round, requested 2026-11-17: web-search what a
2026 portfolio still misses, compare the live build section-by-section
against the attached reference design (Shoaib Hamza layout, Ayaan Raza
persona), then add everything missing one by one.

## Sources (web search, 2026-11-17)

Portfolio structure (5 guides, all 2026):

- smartprogramming.in — 6 essential sections; case-study page per
  project; skills grouped, no percentage bars.
- waidastudio.com — 5 page types (home, work index, case study, about,
  contact); every case study needs a summary block, a result and a link
  to the next project; contact one click from every page.
- dev.to — 3–4 projects with screenshot, stack tags, live + repo links;
  no full-page animations delaying content.
- foliox.me — 3–6 curated projects with problem, role, tools, outcome;
  one page / 4–5 pages max beats a sprawling site.
- designtocodes.com — 7 sections incl. proof & credibility and resume
  download; LCP < 2.5s, first load < 1MB.
- makerhandle.com — each project: one-liner, role, short stack,
  screenshots with captions, live link, source, short write-up
  (problem, two decisions, outcome); leave out skill bars and logo walls.

Motion / interaction (4 guides + 1 trend survey, all 2026):

- flitzrrr/frontend-design-skills (Awwwards/CSSDA analysis, Q1/Q2 2026)
  — motion as meaning carrier; scroll-triggered animation; cursor
  interactions + magnetic buttons; micro-interactions on every
  interactive element; motion token system (150/300/500ms); nothing
  over 400ms except narrative scroll sequences.
- webdesignerdubai.ae — scroll-triggered animation with restraint;
  micro-interactions as feedback; parallax; respect reduced motion.
- thecrit.co — "if your portfolio is static in 2026, it reads as
  dated"; entrance choreography (staggered), scroll-driven narratives,
  physics-based interactions, spatial (page) transitions.
- clarroxweb.com — CSS scroll-driven animation (`animation-timeline`)
  is mainstream; button state transitions, form field animations, hover
  reveals, contextual cursors; View Transitions API for most cases.
- wegic.ai — micro-interactions everywhere; kinetic typography;
  immersive scrolling; cursor interactions as memorable micro-moments.

## Fidelity: reference vs current build (screenshots qa/r2-*.png)

Checked section by section at 1440px and 390px against image.png.

| Reference section | Current build | Verdict |
|---|---|---|
| Header (logo + name, 7 nav links, Let's Talk) | Same + theme/search icons | Match |
| Hero (greeting, huge heading, 2 buttons, socials, illustration, wave) | Same + availability badge | Match |
| About (pink bg, illustration, heading, 4 stats with pastel tiles) | Same, 4 stats incl. ∞ coffee | Match |
| Services (lilac bg, heading left + para right, 4 cards) | Same, except cards carry "From $X (demo)" price lines | Fix: remove prices from cards |
| Selected Work (cream bg, 4 cards, 2 phones, See All Projects) | Same | Match |
| CTA (pink bg, dark button, high-five art) | Same | Match |
| Footer (dark navy, 5 columns, slim bottom bar) | Same grid, plus a giant ghosted AYAAN RAZA wordmark (~300px tall) | Fix: remove wordmark, tighten |

The static layout is faithful. What reads as "not professional / no
animation" is motion poverty: the hero appears in one plain reveal, the
client strip is a static row, there is no page transition, no scroll
progress, no parallax, no press states — and on touch devices all v14
mouse behaviors are (correctly) inactive, so the site feels fully static
there. The stat count-up already exists (Stat.svelte, tweened + inview).

## Gaps to add (v15)

Fidelity:

1. Remove price lines from ServiceCard (home + /services index).
   Pricing moves to the new /pricing page; service detail pages keep
   their "starting at" line.
2. Footer: remove the giant wordmark, tighten spacing to reference
   proportions. Keep the v12 grid, bottom bar and wave.

Motion system:

3. Motion tokens in layout.css (`--ease-out`, `--ease-spring`,
   durations) used by the new animations.
4. Hero entrance choreography: staggered rise for badge, greeting,
   heading, paragraph, buttons, socials; illustration fade + scale.
   CSS keyframes, once, motion-safe gated.
5. ClientLogos becomes an infinite marquee (duplicated aria-hidden
   list, pause on hover/focus, reduced-motion falls back to the
   static centered row).
6. Scroll progress bar in the layout (3px accent, rAF-throttled).
7. Page transitions via the View Transitions API (`onNavigate` in
   +layout, fade + slight rise; falls back to a normal navigation
   when the API is missing or reduced motion is set).
8. Header gains a shadow once the page is scrolled.
9. Button press state (`active:scale`, motion-safe) and arrow-nudge
   hovers on "Read more" / "View Case Study" links.
10. ProjectCard phone visual zooms slightly on card hover
    (motion-safe).
11. Hero illustration: gentle float loop + subtle scroll parallax
    (new `parallax` action, rAF, transform on a wrapper so it never
    fights the entrance animation; reduced-motion off).
12. Stagger the SelectedWork / Testimonials / BlogPreview /
    OpenSource grids (the delay pattern Services already uses).
13. Contact form: brief simulated "Sending…" state before the demo
    success state, button disabled while sending.

Pages / features:

14. ProjectCard shows the project's stack tags (data already exists
    in the project schema; case study pages already render them).
15. Case study prev/next navigation (same pattern as blog posts).
16. New /now page (current focus, learning, reading — demo content).
17. New /pricing page (3 demo plans, what's included, add-ons,
    FAQ teaser, CTA). Linked from services pages and footer.
18. New /book page (demo intro-call booking: day chips, time slots,
    details form, confirm state — all local, nothing sent). Linked
    from the contact page and pricing CTA.
19. Wire new pages into sitemap.xml, the HTML sitemap, search index,
    OG cards, llms.txt and footer links.

## Deliberately NOT added

- Blog comments, analytics, video hero (excluded in earlier rounds;
  still excluded: backend, privacy-page contradiction, performance).
- Live-demo / source-code buttons on case studies: there are no real
  deployments or repos behind the demo projects, so the buttons
  would be dead links. Prev/next navigation + stack tags cover the
  2026 case-study checklist honestly.
- Floating back-to-top button: the footer pill already covers it.
- Word-split kinetic typography: accessibility and layout-shift risk
  for a headline that must read instantly.
- Resume link in the header nav: the reference nav has exactly 7
  items; Resume stays in the hero (Download CV) and the footer.
