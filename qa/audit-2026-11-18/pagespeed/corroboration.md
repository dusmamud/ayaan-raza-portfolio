# Independent corroboration of PSI findings (curl + HTML scans, 2026-11-18)
Purpose: PSI browser-task numbers are taken seriously only where they match independent evidence.
All checks below are from live HTML/headers fetched with curl. No fixes made.

## CONFIRMED — heading-order skip, exactly the 2 pages PSI flagged
- /services headings: [h1, h3, h3, h3, h3, h2, h2, h2, h2, h2] — h1->h3 skip (4 service-card titles are h3, no h2 before them).
- /projects headings: [h1, h3 x6, h2 x4] — h1->h3 skip (6 project-card titles are h3).
- All other 31 pages: no level skips; exactly one h1 each (verified in pages.json).
- Fix direction (invisible): card-title level h3->h2 keeping the same CSS classes, or an h2 before the grid. Visual size is class-driven, so no visual change.

## CONFIRMED — prohibited ARIA culprit: star-rating divs, exactly the 2 pages PSI flagged
- `<div class="mt-3 flex gap-1 text-accent" aria-label="5 out of 5 stars">` with NO role attribute.
  aria-label on a generic div is prohibited (axe aria-allowed-attr) — the name is ignored.
- Found 3x on / (home Testimonials section) and 3x on /testimonials. PSI flagged prohibited ARIA on exactly these 2 pages.
- FAQ panels use role="region" + aria-labelledby — allowed, not the culprit.
- Marquee duplicate `<ul aria-hidden="true" ...>` on home contains no links (logo list) — not flagged; leave as is unless PSI detail says otherwise.
- Fix direction (invisible): add role="img" to the star divs, or replace aria-label with sr-only text.

## CONFIRMED — no responsive image sizes anywhere (root cause of IMG opportunity + mobile LCP)
- ZERO width descriptors in any srcset on any page; NO sizes attribute on any img/source (the single sizes="32x32" per page is the favicon link).
- Every image serves one resolution to all viewports: illustrations 1920x1280 JPG (hero 272KB JPG / 43KB AVIF; about 163KB / 21KB; CTA 201KB / 30KB), phone screens 1008x2128 JPG (185–261KB JPG / 29–55KB AVIF).
- Phones download desktop-pixel images rendered at a fraction of that size (phone mockup ~300px wide). This matches PSI: IMG opportunity ONLY on the 12 image-bearing page groups, largest on /projects + project pages, and mobile LCP 2.1–2.4s on image pages vs 0.9s on text pages.
- AVIF/WebP/JPG <picture> order is correct; format choice is fine. Missing piece is srcset widths + sizes.
- Note: PIL cannot decode AVIF here, so AVIF pixel dims were NOT directly measured; JPG dims above are measured. AVIF files are conversions of the same masters.

## CONFIRMED — Best Practices header items (from live response headers)
- NO Strict-Transport-Security header (home + JS asset). NO Cross-Origin-Opener-Policy header.
- CSP present but contains 'unsafe-inline' for script-src and style-src (needed by SvelteKit hydration + inline theme script) — hence "Ensure CSP is effective against XSS".
- Immutable caching CONFIRMED for /_app/immutable/* and /images/* (max-age=31536000, immutable); HTML max-age=0 must-revalidate. Consistent with PSI showing NO cache-policy opportunity.
- "Browser errors logged to console" + "Issues panel" items: NOT independently reproduced (needs a real browser console; not attempted — PSI claim only, flagged as such in the report).

## NOT REPRODUCED from SSR HTML — SEO "4 links without descriptive text" on / and /services
- No bare generic link texts ("Learn more", "Click here", "Read more" alone) exist on either page. All icon-only links carry aria-labels ("GitHub (demo)" etc.).
- "View Case Study" appears 4x on / but 6x on /projects — and /projects scores SEO 100. So identical repeated text alone does not explain the flag.
- Only shared 4-count element on / and /services: the 4 service cards. HYPOTHESIS (unproven): the 4 service-card links are the flagged ones; mechanism unclear from SSR HTML (their full link text is long and descriptive).
- Resolution: expand the failing audit inside the PSI UI, which shows destination + text per link. Do not guess the elements in the fix phase.

## Placeholder "#" links (separate finding, all pages)
- 5 href="#" links per page (footer socials), 10 on / and /contact (socials appear twice: section + footer). All carry aria-labels, so accessible names exist; destinations are placeholders (demo socials don't exist). Owner decision required — see best-practices file §4g.

## NOT VERIFIED — contrast failures (desktop-only, / and /pricing)
- Cannot be verified from HTML alone; needs rendered contrast computation. Reported as PSI-reported only, with the desktop-only pattern noted (may involve desktop-visible elements or run variance). Any colour fix is a design change — owner approval needed with exact token.
