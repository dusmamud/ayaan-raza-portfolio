# Rich Results Test results — 2026-11-18 (browser task, search.google.com/test/rich-results)
Ran 12:05–12:52 IST (06:35–07:22 UTC). All 33 URLs tested with "Test URL", 0 NOT TESTED.
User agent: Google Inspection Tool SMARTPHONE (default) for all tests. Desktop user-agent tests were NOT run
(the tool's user-agent listbox is disabled until a URL is entered; no desktop results exist — do not infer them).
Incident: /projects/taskflow, /blog/design-systems-that-scale, /blog/forms-that-forgive first failed with
"Something went wrong / Log in and try again" when submitted from a previous result page (retries after 60s/300s
also failed); all three succeeded on retest from a fresh load of the tool home page, WITHOUT sign-in.

## Verdict: 0 ERRORS on all 33 pages. Only warnings: 3 identical non-critical Article warnings x 6 blog posts.

## Per-page
| # | Path | Verdict | Items | Errors | Warnings |
|---|---|---|---|---|---|
| 1 | / | Eligible / "No items detected" — no rich results detected | 0 | 0 | 0 |
| 2 | /about | No items detected | 0 | 0 | 0 |
| 3 | /services | No items detected | 0 | 0 | 0 |
| 4 | /projects | No items detected | 0 | 0 | 0 |
| 5 | /blog | No items detected | 0 | 0 | 0 |
| 6 | /contact | No items detected | 0 | 0 | 0 |
| 7 | /privacy | No items detected | 0 | 0 | 0 |
| 8 | /resume | No items detected | 0 | 0 | 0 |
| 9 | /testimonials | No items detected | 0 | 0 | 0 |
| 10 | /terms | No items detected | 0 | 0 | 0 |
| 11 | /uses | No items detected | 0 | 0 | 0 |
| 12 | /sitemap | No items detected | 0 | 0 | 0 |
| 13 | /accessibility | No items detected | 0 | 0 | 0 |
| 14 | /search | No items detected | 0 | 0 | 0 |
| 15 | /now | No items detected | 0 | 0 | 0 |
| 16 | /pricing | No items detected | 0 | 0 | 0 |
| 17 | /book | No items detected | 0 | 0 | 0 |
| 18 | /services/mobile | 1 valid item: Breadcrumbs (Home / Services / Mobile App Development) | 1 | 0 | 0 |
| 19 | /services/design | 1 valid item: Breadcrumbs (Home / Services / UI/UX Design) | 1 | 0 | 0 |
| 20 | /services/backend | 1 valid item: Breadcrumbs (Home / Services / Backend Integration) | 1 | 0 | 0 |
| 21 | /services/testing | 1 valid item: Breadcrumbs (Home / Services / Testing & Maintenance) | 1 | 0 | 0 |
| 22 | /projects/foodly | 1 valid item: Breadcrumbs (Home / Projects / Foodly) | 1 | 0 | 0 |
| 23 | /projects/shopio | 1 valid item: Breadcrumbs (Home / Projects / Shopio) | 1 | 0 | 0 |
| 24 | /projects/walletwise | 1 valid item: Breadcrumbs (Home / Projects / WalletWise) | 1 | 0 | 0 |
| 25 | /projects/fittrack | 1 valid item: Breadcrumbs (Home / Projects / FitTrack) | 1 | 0 | 0 |
| 26 | /projects/wanderly | 1 valid item: Breadcrumbs (Home / Projects / Wanderly) | 1 | 0 | 0 |
| 27 | /projects/taskflow | 1 valid item: Breadcrumbs (Home / Projects / TaskFlow) | 1 | 0 | 0 |
| 28 | /blog/design-systems-that-scale | 2 valid: Articles (BlogPosting) + Breadcrumbs | 2 | 0 | 3 (Articles) |
| 29 | /blog/forms-that-forgive | 2 valid: Articles (BlogPosting) + Breadcrumbs | 2 | 0 | 3 (Articles) |
| 30 | /blog/mobile-first-portfolios | 2 valid: Articles (BlogPosting) + Breadcrumbs | 2 | 0 | 3 (Articles) |
| 31 | /blog/flutter-vs-native-demo | 2 valid: Articles (BlogPosting) + Breadcrumbs | 2 | 0 | 3 (Articles) |
| 32 | /blog/small-details-big-ux | 2 valid: Articles (BlogPosting) + Breadcrumbs | 2 | 0 | 3 (Articles) |
| 33 | /blog/performance-budgets-demo | 2 valid: Articles (BlogPosting) + Breadcrumbs | 2 | 0 | 3 (Articles) |

## The 3 Article warnings (verbatim, identical on all 6 posts; items still valid + eligible)
1. Missing field "image" (optional)
2. Invalid datetime value for "datePublished" (optional)
3. Datetime property "datePublished" is missing a timezone (optional)
Cause (from extraction): BlogPosting has datePublished as date-only "2025-11-02" etc. (no time/timezone) and no image field.
NOT warned: missing dateModified, missing publisher, author fields (author Person has name + url) — do not report those as RRT failures.
No FAQ, Person/Profile, Review or other type was detected anywhere; nothing was reported as detected-but-not-eligible.

## Reconciliation with the Schema validator (important — not a contradiction)
- Validator: 17 pages WITH JSON-LD, 16 WITHOUT. RRT: 16 pages with detected items, 17 with none.
- The one-page difference is the HOMEPAGE: it HAS Person + FAQPage JSON-LD (validator 0/0), but RRT only lists
  Google-supported rich-result types — bare Person is not one, and the FAQPage rich result no longer exists
  (stopped for everyone 7 May 2026). So RRT correctly shows "No items detected" for /.
- 17 RRT-empty = 16 pages with no JSON-LD + homepage. Totals: 22 valid items (10 breadcrumbs-only + 6x2).
