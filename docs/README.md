# Docs — Ayaan Raza demo portfolio website

Project docs for the Ayaan Raza demo portfolio website (SvelteKit).
Read in order when setting the project up. Every doc states what is
**locked**, what is **to verify at install time**, and what is **deferred**
until a real production feature needs it.

Last cross-verified: 2026-11-15 (see `10-sources.md`).
Status: docs only. No packages have been installed into `portfolio/` yet
and no app code has been written. Setup is the next step after these docs
are reviewed.

## Locked decisions (do not re-decide without recording why)

| Decision | Choice |
|---|---|
| Persona / website name | Ayaan Raza, logo `AR.`, Full-Stack Developer (replaces "Shoaib Hamza" from the reference design) |
| Stack | SvelteKit + Svelte 5 + Vite + TypeScript |
| Styling | Tailwind CSS v4 (CSS-first, `@tailwindcss/vite`) |
| Phase 1 rendering | Static prerendered site (`adapter-static`) |
| Package policy | Full production-ready set from the start — nothing missing later. See `02-stack-packages.md` for tiers. |
| Scope now | UI/UX demo only. All content is demo data. No real backend, auth, database, or payments yet. |

## Index

1. `01-overview-decisions.md` — what we are building, scope, decision log.
2. `02-stack-packages.md` — the full package manifest (all tiers), install
   commands, and what each package is for.
3. `03-project-structure.md` — folder/file layout for `ayaan-raza/`,
   `portfolio/`, and `projects/`, plus naming rules.
4. `04-setup-guide.md` — step-by-step setup from the starter template to a
   verified `dev` / `build` / `check` / `test` run.
5. `05-design-system.md` — colours, type, spacing, components, and Tailwind
   `@theme` tokens taken from the reference design.
6. `06-pages-components-data.md` — routes, sections, components, dummy-data
   contracts, and interactions.
7. `07-accessibility-responsive-seo-performance.md` — checklists for
   accessibility, mobile-first responsive design, SEO, and performance.
8. `08-quality-testing-ci-deployment.md` — lint/format/typecheck, tests,
   CI pipeline, and deployment (static now, server later).
9. `09-production-roadmap.md` — the demo → production path, phase by phase,
   including database, auth, forms, blog, and i18n.
10. `10-sources.md` — cross-verification log: what was checked, sources used,
    and what must still be verified at install time.

## Conventions used in these docs

- **Verified (starter):** checked on this VM on 2026-11-15 in
  `~/workspace/templates/sveltekit-app/package.json`.
- **Resolve at install:** the package name / major version must be confirmed
  on the npm registry at setup time and the resolved version recorded in
  `pnpm-lock.yaml`. Never guess a version in code or docs.
- **Demo data:** clearly marked fake content. Never present demo stats,
  clients, emails, or phone numbers as real.
- **One source of truth:** design tokens live in CSS (`@theme`) only;
  component code never hard-codes hex values.
