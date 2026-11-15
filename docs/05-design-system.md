# 05 — Design system

Taken from the reference design screenshot (Shoaib Hamza portfolio).
All values below were **draft approximations estimated from the PNG** —
no Figma file or design tokens were provided. **Confirmed visually on
2026-11-15** against desktop + mobile screenshots of the built site: all
draft values were kept as final. Token *names* and *roles* are stable;
hex values may shift slightly during visual QA. Never hard-code hex values in components — tokens live
in `@theme` in `app.css` only.

## Brand

- Persona: Ayaan Raza — Full-Stack Developer. Logo mark: `AR.` (navy
  letters, pink full stop), matching the reference `SH.` treatment.
- Voice: friendly, confident, plain English. Hero copy is adapted from
  the reference: "Hi, I'm Ayaan 👋" / "I build digital products that
  people love".
- Illustration style: flat, friendly, hand-drawn feel — laptop/phone with
  code, plants, coffee mug, sparkles, wavy section dividers. Reference
  illustrations are **reference only** (see "Illustrations" below).

## Colour tokens (draft — confirm visually)

| Token | Role | Draft value | Used for |
|---|---|---|---|
| `--color-cream` | Page background | `#FFF7F1` | Main background, Selected Work section |
| `--color-blush` | Soft pink section bg | `#FDE8EE` | About section, CTA background, hero blob |
| `--color-lilac` | Soft lavender section bg | `#EDEAFF` | Services section background |
| `--color-ink` | Headings / primary text | `#1B1740` | Navy headings, logo, nav text |
| `--color-body` | Body text | `#4A4763` | Paragraphs, muted navy-grey |
| `--color-accent` | Primary accent (pink-red) | `#F43F5E` | Buttons, links, highlights, "people love" |
| `--color-accent-dark` | Accent hover | `#E11D48` | Button hover / focus |
| `--color-footer` | Footer background | `#101A33` | Dark navy footer |
| `--color-card` | Card background | `#FFFFFF` | Service + project cards |
| `--color-tile-green` | Project tile tint | `#DDF0D9` | Foodly tile |
| `--color-tile-pink` | Project tile tint | `#FBDCE6` | Shopio tile |
| `--color-tile-yellow` | Project tile tint | `#FDEBC0` | WalletWise tile |
| `--color-tile-purple` | Project tile tint | `#DCD6F7` | FitTrack tile |
| `--color-icon-lavender` | Icon chip tint | `#E6E1FF` | Service icon backgrounds (vary per card) |
| `--color-icon-pink` | Icon chip tint | `#FFD9E2` | Service icon backgrounds |
| `--color-icon-yellow` | Icon chip tint | `#FFF0C2` | Service icon backgrounds |
| `--color-icon-green` | Icon chip tint | `#DFF3DA` | Service icon backgrounds |

Tailwind v4 mapping (in `app.css`, CSS-first):

```css
@import "tailwindcss";

@theme {
  --color-cream: #FFF7F1;
  --color-blush: #FDE8EE;
  --color-lilac: #EDEAFF;
  --color-ink: #1B1740;
  --color-body: #4A4763;
  --color-accent: #F43F5E;
  --color-accent-dark: #E11D48;
  --color-footer: #101A33;
  --font-display: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Inter", ui-sans-serif, system-ui, sans-serif;
}
```

Usage: `bg-cream text-ink`, `bg-accent hover:bg-accent-dark`,
`font-display` for headings, `font-body` for text. If a token value
changes during QA, change it here only.

Accessibility note: verify contrast before shipping (see `07-...md`).
Navy-on-cream and white-on-accent must pass WCAG AA for their text sizes.
If `#F43F5E` + white fails for small text, darken the accent for text use
only (new token `--color-accent-text`) — never silently ship low contrast.

## Typography

| Element | Font | Weight | Scale (mobile → desktop) |
|---|---|---|---|
| Display / H1 (hero) | Plus Jakarta Sans | 800 | `clamp(2.25rem, 6vw, 3.75rem)` |
| H2 (section titles) | Plus Jakarta Sans | 800 | `clamp(1.75rem, 4vw, 2.5rem)` |
| H3 (card titles) | Plus Jakarta Sans | 700 | `1.125rem` → `1.25rem` |
| Eyebrow / kicker ("About me", "What I do") | Plus Jakarta Sans | 700 | `0.875rem`, accent colour, small caps feel via tracking |
| Body | Inter | 400/500 | `1rem`, line-height `1.6` |
| Small / caption | Inter | 400 | `0.875rem` |
| Logo | Plus Jakarta Sans | 800 | `1.5rem`, tight tracking |

Rules:

- Headings use tight letter-spacing (`-0.02em`); body uses normal tracking.
- Fluid type with `clamp()` for display sizes — no breakpoint jumps for
  the hero headline.
- Underline accents (e.g. under "Services I provide", "Selected Work",
  "something" in the CTA) are styled spans with an SVG underline or
  `text-decoration`, in accent colour. Implement once as a `Highlight`
  component/utility, not per-heading hacks.
- Load only the weights used (e.g. 400/500/700/800). Self-hosted via
  Fontsource; no runtime CDN request.

## Spacing, radius, shadow

- Section padding (mobile-first): `py-16` mobile → `py-24` desktop.
  Content max width: `max-w-7xl` with `px-4 sm:px-6 lg:px-8`.
- Section gaps: generous whitespace is part of the design — do not
  compress sections to "fit more above the fold".
- Cards: `rounded-2xl` (services) / `rounded-3xl` (project tiles),
  `p-6`, white background, soft shadow (`shadow-sm` → `shadow-md` on
  hover) with a subtle lift (`-translate-y-1` on hover, motion-safe only).
- Buttons: pill-ish `rounded-full` for primary CTAs in the reference
  ("Let's Talk", "View My Work", "See All Projects" are rounded
  rectangles/pills with accent fill); secondary button is outline navy.
  Confirm radius visually: primary `rounded-full`, secondary `rounded-lg`.
- Pills/chips: `rounded-full`, pastel tints from the token table.
- Wavy dividers between sections: inline SVG waves in the next section's
  background colour. One `WaveDivider` component with `fill` + `flip`
  props; never a raster image.

## Components (visual spec — behaviour in `06`)

| Component | Look |
|---|---|
| Header | Cream/transparent, sticky. Logo left, nav centre, pink "Let's Talk" right. Active link underlined in accent. Mobile: hamburger → full menu. |
| Hero | Two-column on desktop (copy left, illustration right on pink blob). Single column, illustration below copy, on mobile. Sparkle decorations are SVG, decorative only (`aria-hidden`). |
| Stat | Icon chip (pastel) + bold navy number + small label. Numbers animate on scroll into view. |
| ServiceCard | White card, pastel icon chip, title, 2-line description, "Read more →" accent link. Hover: lift + shadow. |
| ProjectCard | Pastel tile with phone mockup art, category eyebrow, title, description, "View Case Study →". Tile colour rotates green/pink/yellow/purple. |
| Cta | Pink blush background, big navy headline with accent underlined word, navy/pink button, hands illustration. |
| Footer | Dark navy, 4 columns on desktop (brand, quick links, services, tech stack, contact — 5 groups in the reference; stack to 1–2 columns on mobile), small muted text. |

## Illustrations and imagery

The reference uses custom illustrations (developer at laptop, laptop +
phone + mug, high-five hands) and phone mockups inside project tiles.
For Phase 1:

1. **Do not** extract/copy the screenshot's artwork as image files.
2. Recreate the *layout* with placeholder art: simple SVG shapes, CSS
   blobs, and phone-frame components with demo UI skeletons inside.
3. If generated/custom illustrations are wanted, they are a separate
   asset task with explicit approval — record the source and licence for
   every asset in `src/lib/assets/README.md` (create it when the first
   asset lands).
4. All decorative art is `aria-hidden="true"` with no `alt` text. All
   meaningful images get real `alt` text. See `07-...md`.

## Motion (visual)

- Scroll reveal: fade + 12px rise, 400ms, staggered per card group.
  Disabled entirely under `prefers-reduced-motion`.
- Hover: buttons darken, cards lift, links underline. No layout shift.
- Counters: count up once when visible (tweened), final value in HTML
  for no-JS / reduced-motion users (progressive enhancement — the number
  must be readable without animation).
- Page/route transitions: none in Phase 1 beyond native navigation.
  Do not add a transition library for this.

## Dark mode

Not in the reference design. Do not add dark mode in Phase 1. The only
dark surface is the footer. If dark mode is requested later, it is a new
decision with a full token audit — not a one-line toggle.
