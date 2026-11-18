# Schema.org validator results — 2026-11-18 (browser task, validator.schema.org, Fetch URL)
Ran 12:06–12:16 IST (06:36–06:46 UTC). All 33 URLs tested, none left untested.
CORROBORATION: matches independent curl JSON-LD extraction (pages.json) exactly.

## Verdict: 0 errors, 0 warnings on ALL 33 pages. No error/warning messages to quote.

## Per-page
| Path | Types found | Errors | Warnings |
|---|---|---|---|
| / | Person; FAQPage (2 items) | 0 | 0 |
| /about | none — "No items detected" | 0 | 0 |
| /services | none | 0 | 0 |
| /projects | none | 0 | 0 |
| /blog | none | 0 | 0 |
| /contact | none | 0 | 0 |
| /privacy | none | 0 | 0 |
| /resume | none | 0 | 0 |
| /testimonials | none | 0 | 0 |
| /terms | none | 0 | 0 |
| /uses | none | 0 | 0 |
| /sitemap | none | 0 | 0 |
| /accessibility | none | 0 | 0 |
| /search | none | 0 | 0 |
| /now | none | 0 | 0 |
| /pricing | none | 0 | 0 |
| /book | none | 0 | 0 |
| /services/mobile | BreadcrumbList (Home / Services / Mobile App Development) | 0 | 0 |
| /services/design | BreadcrumbList (Home / Services / UI/UX Design) | 0 | 0 |
| /services/backend | BreadcrumbList (Home / Services / Backend Integration) | 0 | 0 |
| /services/testing | BreadcrumbList (Home / Services / Testing & Maintenance) | 0 | 0 |
| /projects/foodly | BreadcrumbList (Home / Projects / Foodly) | 0 | 0 |
| /projects/shopio | BreadcrumbList (Home / Projects / Shopio) | 0 | 0 |
| /projects/walletwise | BreadcrumbList (Home / Projects / WalletWise) | 0 | 0 |
| /projects/fittrack | BreadcrumbList (Home / Projects / FitTrack) | 0 | 0 |
| /projects/wanderly | BreadcrumbList (Home / Projects / Wanderly) | 0 | 0 |
| /projects/taskflow | BreadcrumbList (Home / Projects / TaskFlow) | 0 | 0 |
| /blog/design-systems-that-scale | BreadcrumbList; BlogPosting | 0 | 0 |
| /blog/forms-that-forgive | BreadcrumbList; BlogPosting | 0 | 0 |
| /blog/mobile-first-portfolios | BreadcrumbList; BlogPosting | 0 | 0 |
| /blog/flutter-vs-native-demo | BreadcrumbList; BlogPosting | 0 | 0 |
| /blog/small-details-big-ux | BreadcrumbList; BlogPosting | 0 | 0 |
| /blog/performance-budgets-demo | BreadcrumbList; BlogPosting | 0 | 0 |

## Pattern
- 17 pages WITH structured data, 16 pages WITHOUT any. (Correction: an interim chat message said 17 without — the correct count is 16 without, 17 with.)
- What exists is vocabulary-valid. What is missing is COVERAGE + THINNESS (see extraction): Person has only name/jobTitle/url/description; BlogPosting has no image/dateModified; no ProfilePage on /about; no Service/Product/Offer/Review schema on matching pages; no WebSite. Validator 0/0 does NOT mean "rich results eligible" — that is the Rich Results Test's separate verdict, still pending.
- Note: initial Google reCAPTCHA ("unusual traffic") was cleared by the browser's challenge handling; no retries needed; read-only.
