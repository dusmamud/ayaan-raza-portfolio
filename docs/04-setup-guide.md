# 04 — Setup guide

How to create the `portfolio/` app from the verified starter and reach a
green `dev` / `build` / `check` / `lint` / `test` run. Follow in order.
Do not skip the verification steps — they are the definition of "setup
done".

## Prerequisites (verified)

- Node.js v26.13.1, pnpm 12.18.0 (see `02-stack-packages.md`).
- Starter template at `~/workspace/templates/sveltekit-app` (Svelte 5.57.3,
  SvelteKit 3.2.0, Vite 8.3.8, TypeScript 6.0.3, adapter-auto 8.0.1).
  Never edit the template in place — copy it.

## Step 1 — Copy the starter into `portfolio/`

```bash
# From the workspace root. portfolio/ currently holds only .gitkeep.
# Copy everything EXCEPT node_modules/ and .svelte-kit/ (generated).
# Using tar keeps hidden files and avoids copying generated folders:
cd ~/workspace/templates/sveltekit-app
tar --exclude=node_modules --exclude=.svelte-kit -cf - . \
  | tar -xf - -C ~/workspace/ayaan-raza/portfolio

# Remove the placeholder, verify the copy:
rm ~/workspace/ayaan-raza/portfolio/.gitkeep
ls -la ~/workspace/ayaan-raza/portfolio/
cat ~/workspace/ayaan-raza/portfolio/package.json
```

Expected: `package.json`, `vite.config.ts`, `tsconfig.json`, `src/` with
`app.html`, `app.d.ts`, `routes/+layout.svelte`, `routes/+page.svelte`.
If any file is missing, stop and re-copy — do not hand-recreate scaffold
files from memory.

## Step 2 — Rename the package, initialise git (if wanted)

```bash
cd ~/workspace/ayaan-raza/portfolio
# Set name to "ayaan-raza-portfolio" in package.json (edit the "name" field only).
# If this folder becomes a git repo, initialise it BEFORE running sv add,
# so every add-on change is reviewable with git diff:
git init  # only if no parent repo already covers this folder — check first
```

Record in the setup log whether git was initialised here or at
`ayaan-raza/` level. One repo, one decision — do not nest repos
accidentally.

## Step 3 — Install base dependencies

```bash
pnpm install
pnpm build   # must pass BEFORE any add-on: proves the copied starter is healthy
```

If `pnpm build` fails here, the copy is bad. Fix the copy; do not proceed
to add-ons.

## Step 4 — Add official integrations with `sv add` (commit first)

`sv add` edits files in place and cannot undo itself. Commit (or snapshot)
before each group so `git diff` shows exactly what changed.

```bash
git add -A && git commit -m "chore: starter copy, pre-addons"  # if git is set up

npx sv add tailwindcss eslint prettier vitest playwright
# Review the diff. Expected: Tailwind v4 via @tailwindcss/vite, CSS file
# with @import "tailwindcss", ESLint flat config, Prettier config,
# Vitest + Playwright scaffolding.

npx sv add sveltekit-adapter   # choose: static
# Expected: adapter-auto replaced by adapter-static in package.json
# and vite.config.ts. Then add prerender (Step 5) or the build fails.

npx sv add drizzle better-auth # Tier B: dormant until Phase 4 (see 02 + 09)
# Expected: packages + placeholder config. If an add-on forces a server
# adapter or requires env secrets to build, STOP, record the conflict in
# 10-sources.md, and keep the static build green. Tier B must not break
# Phase 1.
```

## Step 5 — Static prerender (required for adapter-static)

In the root layout route file (`src/routes/+layout.ts`, create it if the
scaffold did not), export:

```ts
export const prerender = true;
```

Without this, `adapter-static` builds fail with "all routes must be fully
prerenderable". Every route added later inherits this unless it explicitly
opts out — and opting out is forbidden in Phase 1 without a new decision
in `01-overview-decisions.md`.

Keep SSR enabled (do not set `ssr = false`) unless a future decision
requires SPA mode. Prerendered HTML + hydration is the Phase 1 target:
fast first paint, SEO-friendly, no server needed.

## Step 6 — Direct package adds (what `sv add` does not cover)

```bash
pnpm add zod sveltekit-superforms formsnap bits-ui clsx tailwind-merge tailwind-variants
pnpm add -D @tailwindcss/forms @tailwindcss/typography
# Lucide + fonts: VERIFY package names on the registry first (see 02).
# Example shape only — do not run with guessed names:
# pnpm add <lucide-svelte-package> <fontsource-packages>
```

Then wire the minimum:

- `vite.config.ts`: `tailwindcss()` plugin present (from `sv add`); adapter
  is `adapter-static`; `vitePreprocess()` retained.
- `src/app.css` (or the stylesheet `sv add` created): `@import "tailwindcss";`
  + `@theme` tokens from `05-design-system.md`, imported from
  `+layout.svelte`.
- `src/lib/utils/cn.ts`: `clsx` + `tailwind-merge` helper.
- `.env.example`: placeholder keys only (`DATABASE_URL=`,
  `BETTER_AUTH_SECRET=`, `BETTER_AUTH_URL=http://localhost:5173`).
  Never commit a real `.env` with secrets. `.env` must be git-ignored.

## Step 7 — Scripts (final `package.json` scripts)

Ensure these scripts exist and do what their names promise:

| Script | Command | Purpose |
|---|---|---|
| `dev` | `vite dev` | Dev server with HMR (default port 5173). |
| `build` | `vite build` | Production static build into `build/`. |
| `preview` | `vite preview` | Serve the production build locally (port 4173, used by Playwright). |
| `prepare` | `svelte-kit sync` | Sync SvelteKit types (runs on install). |
| `check` | `svelte-check --tsconfig ./tsconfig.json` | Typecheck incl. `.svelte` files. |
| `lint` | `prettier --check . && eslint .` | Format + lint gate. |
| `format` | `prettier --write .` | Auto-format. |
| `test` | `vitest run` | Unit + component tests. |
| `test:e2e` | `playwright test` | E2E tests against `preview`. |
| `db:generate` / `db:migrate` | drizzle-kit commands | Tier B placeholders; unused until Phase 4. Record exact commands at setup. |

## Step 8 — Verification checklist (setup is done only when all pass)

```bash
pnpm install
pnpm check     # must pass, zero errors
pnpm lint      # must pass (run pnpm format first if formatting fails)
pnpm test      # must pass (at least the scaffold smoke tests)
pnpm build     # must pass, output in build/
pnpm preview   # open http://localhost:4173, page renders
pnpm test:e2e  # must pass against preview
```

Also verify manually, once:

- [ ] Dev server boots on first try (`pnpm dev`), HMR works on a text edit.
- [ ] One Lucide icon renders; one Fontsource font loads with no CDN request
      (check Network tab: no `fonts.googleapis.com` / `fonts.gstatic.com`).
- [ ] No console errors on the home page.
- [ ] `pnpm-lock.yaml` exists and is committed (if git is set up).

## Step 9 — Setup log (record, do not skip)

Append a dated entry to `10-sources.md` (section "Setup log") with:

- Date, Node/pnpm versions, exact resolved versions of every Tier A/B
  package from `pnpm-lock.yaml`.
- Lucide package name + version chosen, and how it was verified.
- Font package names + weights imported.
- Any `sv add` conflict encountered and how it was resolved.
- Confirmation that all Step 8 checks passed.

## Troubleshooting (known, cross-verified)

| Symptom | Likely cause | Fix |
|---|---|---|
| Build fails: "all routes must be fully prerenderable" | Missing `prerender = true` | Add it to the root `+layout.ts` (Step 5). |
| Styles missing / Tailwind classes do nothing | Vite plugin or CSS import missing | Check `tailwindcss()` in `vite.config.ts` plugins and the CSS import in `+layout.svelte`. |
| Type errors only in `svelte-check`, not in dev | Normal — dev server does not typecheck everything | Fix the `svelte-check` errors; never ship with `pnpm check` failing. |
| Icon import error / SSR error from Lucide | Wrong Lucide package/version for Svelte 5 | Re-check the registry choice (see `02`), reinstall the verified package, rebuild. Record the fix in `10-sources.md`. |
| Tier B add-on demands a server adapter | Add-on default assumes a server app | Keep `adapter-static` for Phase 1; leave the Tier B package installed but unwired. Record the conflict. |
