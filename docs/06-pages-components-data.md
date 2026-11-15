# 06 — Pages, components, and data

## Route map

| Route | Purpose | Phase 1 state |
|---|---|---|
| `/` | Home: hero + about + services + selected work + CTA | Full demo build. The only fully-built page in Phase 1. |
| `/#about`, `/#services`, `/#projects`, `/#contact` | Same-page anchors | Header nav scrolls to sections on `/`. Smooth scroll, correct focus handling (see `07`). |
| `/projects` | All projects list | Demo list from the same data file. "See All Projects" links here. |
| `/projects/[slug]` | Case study | Demo placeholder page per project (overview, challenge/solution, demo screenshots). Real case-study content is Phase 3. |
| `/blog` | Blog index | Demo placeholder (empty state + demo cards). Real posts are Phase 3 (mdsvex or CMS — decide then). |
| `/blog/[slug]` | Blog post | Demo placeholder only. |
| `/contact` | Contact page | Demo form (Zod-validated client-side, no delivery). Real delivery is Phase 2. |
| `/api/auth/*` | Auth mount point | Empty until Phase 4. Do not create routes here in Phase 1. |

"Tech Stack" in the header nav is an anchor to a tech-stack strip/section
on the home page in Phase 1 (the reference footer also lists React/Next.js
and Node.js — for this site the strip lists the *actual* locked stack:
SvelteKit, Svelte, TypeScript, Tailwind, Vite). Do not list React/Next.js
as this site's stack — that was the reference persona's stack, not ours.

## Home page composition (`/`)

`+page.svelte` composes sections only — no section logic lives in the page:

```
Header (in +layout.svelte)
Hero          (#home)
About         (#about)   + Stats
Services      (#services)
SelectedWork  (#projects)
TechStack     (#stack)   — strip, small
Cta           (#contact teaser)
Footer        (in +layout.svelte)
```

Each section is one component in `src/lib/components/sections/` receiving
typed data props. Sections own their own reveal animation and responsive
layout; the page owns ordering only.

## Component inventory

### Layout (`src/lib/components/layout/`)

| Component | Responsibility |
|---|---|
| `Header.svelte` | Sticky nav, active-section state, mobile menu button. |
| `MobileMenu.svelte` | Accessible menu (focus trap, Escape closes, focus returns to button). Uses bits-ui primitives if needed, else hand-rolled with the same behaviour. |
| `Footer.svelte` | Dark footer, link groups, demo contact block. |

### UI (`src/lib/components/ui/`)

| Component | Responsibility |
|---|---|
| `Button.svelte` | Variants: primary (accent), secondary (outline navy), ghost. Sizes: sm/md. Built on an `<a>` or `<button>` correctly — links navigate, buttons act. Never a `<div on:click>`. |
| `SectionHeading.svelte` | Eyebrow + title + optional underline highlight + description. |
| `WaveDivider.svelte` | SVG wave between sections (`fill`, `flip` props). Decorative. |
| `Stat.svelte` | Animated counter + label. Final value present in HTML. |
| `ServiceCard.svelte` | Icon chip + title + text + link. |
| `ProjectCard.svelte` | Tile + mockup + category + title + text + link. |
| `Highlight.svelte` | Accent underlined word/span for headings. |
| `PhoneMockup.svelte` | CSS phone frame + demo UI skeleton for project tiles. |

### Sections (`src/lib/components/sections/`)

`Hero.svelte`, `About.svelte`, `Services.svelte`, `SelectedWork.svelte`,
`TechStack.svelte`, `Cta.svelte`. Each takes typed props, renders its
section landmark (`<section aria-labelledby>`), and handles its own
responsive grid.

## Data contracts

All demo data lives in `src/lib/data/*.ts`, validated by Zod schemas in
`src/lib/schemas/*.ts`, typed by inference (`z.infer<typeof ...>`).
Pages load data in `+page.ts` (or `+page.server.ts` when server data
exists) — components never import raw JSON or fetch demo data themselves.

### Site data (`site.ts`)

Name, role, tagline, nav links, demo socials, demo contact block. Every
value is demo content. Social/contact links in Phase 1 point to `#` with
an accessible label, or to clearly fake demo URLs — never to a real
person's accounts. Record the choice in code comments.

### Services (`services.ts` + `schemas/project.ts`)

4 services, exactly as in the reference (titles/copy adapted, persona
changed):

1. Mobile App Development — "Cross-platform mobile apps using Flutter
   for Android and iOS." (Demo copy — keep the Flutter mention only as
   demo service copy; it does not change this site's stack.)
2. UI/UX Design
3. Backend Integration
4. Testing & Maintenance

Each service: `id`, `title`, `description`, `icon` (Lucide icon name),
`tint` (token name), `href` (demo `#` in Phase 1).

### Projects (`projects.ts`)

4 projects, exactly as in the reference:

| Slug | Title | Category | Tile tint |
|---|---|---|---|
| `foodly` | Foodly | Food & Delivery | green |
| `shopio` | Shopio | E-Commerce | pink |
| `walletwise` | WalletWise | Finance | yellow |
| `fittrack` | FitTrack | Health & Fitness | purple |

Each project: `slug`, `title`, `category`, `description`, `tint`,
`tags`, `year` (demo), `caseStudy` (demo sections). The `projects/`
folders at the website root (`ayaan-raza/projects/<slug>/`) hold that
project's demo assets/notes; the site's data file is the single source
of truth for what the site displays.

Adding a project = add folder + add one validated entry + add tile art.
No component changes needed.

### Contact form (`schemas/contact.ts`)

Fields: name, email, message (+ optional budget/timeline in Phase 2).
Zod schema shared by client validation (Phase 1) and server action
(Phase 2+). Phase 1 submit shows a demo success state and sends nothing.
The form must work with keyboard only, show inline errors with
`aria-describedby`, and never lose input on a validation error.

## State and interactions

| Interaction | Implementation | Notes |
|---|---|---|
| Mobile menu open/close | Runes `$state` in Header | Focus trap + Escape + focus return. |
| Active nav section | IntersectionObserver in Header | Updates `aria-current` on the active link. |
| Scroll reveal | `reveal` action (IntersectionObserver) | Adds a class once; respects reduced motion. |
| Stat counters | `tweened` from `svelte/motion` | Runs once on visibility; final value in HTML. |
| Project filter (if added) | `$state` + `$derived` in SelectedWork | Filter by category; `flip` animation for reorder; results announced via `aria-live`. Optional in Phase 1 — only add if it improves the demo, not as filler. |
| Case-study dialog (if added) | bits-ui dialog | Focus trap, Escape, labelled. Alternative: link to `/projects/[slug]` page (preferred — simpler + shareable URL). Decide during build, record here. |
| Contact form | superforms + Zod | Client validation in Phase 1; no network call. |
| Theme toggle | None | No dark mode (see `05-design-system.md`). |

No global store. Shared state, if any, lives in `src/lib/state/*.svelte.ts`
as runes modules. Props down, events up; no prop-drilling past two levels
— extract a section component instead.
