# Display-font audit & migration plan

This audit was read-only, done on 2026-11-18 against local clones of `raid-guild/portal` and
`raid-guild/website`. Nothing in these repositories was modified, checked out or fetched.

## Current display-font usage

### Portal (`raid-guild/portal`, branch `staging` @ `ce29bf9`)

Last Duel is live here. It's commercial, a renamed Eurostile derivative, and site-only.

| Where | What |
|---|---|
| `src/app/(frontend)/theme.css` L1–56 | 7 `@font-face` rules. **Last Duel** ← `LastDuel-Ex2`, `-BoldEx2`, `-Oblique`, `-BoldOblique`. **Last Duel Retalic** ← `LastDuel-Ex2Retalic`, `-BoldEx2Retalic`. **Last Duel Extended 2** ← `LastDuel-BoldEx2` (an alias registered at 700 only, so CSS italic synthesis can apply). Files are in `public/brand-fonts/louchi/`. |
| `theme.css` L191–193 (`[data-theme='dark']`), L300–302 (`[data-theme='light']`) | Dark and light themes: `--font-display-theme: 'Last Duel'`, `--font-extended-theme: 'Last Duel Extended 2'`, `--font-retalic-theme: 'Last Duel Retalic'` |
| `theme.css` L416 (`raidguild-ai`), L529 (`raidguild-classic`) | Other themes use system UI and Uncial Antiqua. **Out of scope.** |
| `src/app/(frontend)/globals.css` L38, L199 | `font-family: var(--font-display-theme)` (display text: uppercase, wght 700, −0.015em) |
| `globals.css` L213–214 | `.font-retalic` → `var(--font-retalic-theme)` |
| `globals.css` L223–224 / L230–231 | `.portal-heading-top` → Retalic; `.portal-heading-bottom` → `--font-extended-theme` **with CSS-synthesized italic** |
| `src/app/(frontend)/dashboard/map/page.tsx` | `Press_Start_2P` for the pixel map, which the display rules exclude. Out of scope. |
| `public/brand-fonts/louchi/Grinder-*.woff2` | Archived Grinder cuts. Not referenced by any `@font-face`. |
| `docs/theme-authoring-guide.md`, `public/brand-fonts/louchi/README.md`, `tests/e2e/app.spec.ts` | Docs, provenance and E2E references to Last Duel. Update them with the migration. |

The `.portal-heading-bottom` treatment **fakes** an italic, because Last Duel has no Extended 2
italic. Venture Beyond has a real one, so this is where migrating changes rendering the most. It
should look *better* (a true italic), but it needs visual review.

### Website, Venture Beyond redesign line (`raid-guild/website`, branch `feat/tae-content-update` @ `a195359`)

| Where | What |
|---|---|
| `src/lib/fonts.ts` | `localFont` → `--font-grinder` (Grinder Regular + Italic) and `--font-grinder-retalic` (Grinder Retalic), from `public/fonts/grinder/*.woff2` |
| `.gitignore` L62 | `/public/fonts/grinder/*.woff2` is **held out of the repo pending a licence decision** (HANDOFF.md, "Blockers") |
| `src/components/HomeExperience.module.css` L15–18 | `--font-display: var(--font-grinder)`, `--font-retalic: var(--font-grinder-retalic)` |
| `HomeExperience.module.css` L150–151 | **Hero lockup.** `.hero h1` uses Retalic; `.hero h1 em` uses the display italic. This is the VENTURE / BEYOND pattern. |
| `HomeExperience.module.css` L158–286 | About 10 display usages via `var(--font-display)`: section headings, stats, roster and cards |
| `src/app/globals.css` L196–241 | h1–h6 → `var(--font-display)`. That resolves to Mazius from `fonts.ts` outside the HomeExperience scope. |

The file structure already matches Venture Beyond's: one upright+italic family plus a separate
Retalic family. **Venture Beyond is OFL, so it clears the licence blocker.**

### Website, current handoff line (`raid-guild/website`, handoff branch @ `b630790`)

| Where | What |
|---|---|
| `src/lib/fonts.ts` | `maziusDisplay` (`localFont`: Mazius Review 400 + Mazius Display Bold 700) → `--font-display` |
| `src/app/globals.css` L57, h1–h6 rules | `--font-display` |
| 12 files, 19 occurrences | `font-display` / `--font-display` (`Cohort*Banner`, `Footer`, `TimelineAccordion`, `wizard`, …) |
| `public/witch/css/*.webflow.css` | Legacy Webflow pages (Fratelli, Alchemion, Maziusdisplay). Out of scope. |
| `origin/feat/venture-beyond-redesign` @ `5b8c9d6` | Same Mazius setup, plus `HomeExperience.module.css` display rules |

The Portal docs cite a website Last Duel build (`review/venture-beyond-redesign` @ `7d0e878`). That
commit **isn't in the local clone**, so it couldn't be inspected.

## Proposed integration sequence

Each step is a separate, reviewable PR. Production behaviour doesn't change until each one is merged
and approved.

0. **Brand repo (this repo):** commit `typography/venture-beyond/` as the canonical source on
   `feat/venture-beyond-typeface` (based on `main`), then open a PR against `deploy`. There are no
   site changes in this step.
1. **Website, Venture Beyond redesign line (lowest risk, highest value).** Swap Grinder for Venture Beyond in
   `src/lib/fonts.ts`: two `localFont` calls (see `nextjs.md`), keeping the variable names
   `--font-grinder*`, or renaming them to `--font-venture*`. This removes the licence blocker. Check
   the hero lockup against `specimens/venture-beyond-prototype.html`.
2. **Portal, dark and light themes only.** Add three Venture Beyond `@font-face` rules and point the three
   `--font-*-theme` tokens at them. Replace the synthesized-italic alias with the real Italic face.
   Keep the Last Duel files in place for one release as a rollback path. Update the E2E references
   and docs. Classic and AI themes stay as they are.
3. **Brand site.** Register the fonts in `src/lib/fonts.ts` and add the `type-venture` /
   `type-beyond` utilities, then document them on `/typography`. Update `AGENTS.md` and
   `src/lib/machine-api/brand-guidelines.ts`, per this repo's maintenance protocol.
4. **Website.** Only if the redesign adopts Venture Beyond as `--font-display`. That needs a design
   decision, because it replaces Mazius, which is the current brand display face.
5. **Retire Last Duel** from Portal after one release cycle without regressions. Its own
   LICENSING.md calls it private/internal, and Venture Beyond is the open replacement.

Rollback for every step: revert the `fonts.ts`/`theme.css` change. The font files are additive.
