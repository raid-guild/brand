# Brand System Consolidation Implementation Handoff

Status: In progress — Phases 0 and 1 implemented; Phase 2 is next
Prepared: 2026-08-18  
Baseline branch: `feat/versioned-brand-reigns`  
Baseline commit: `db32a52`  
Upstream baseline: `origin/main` at `8f0b5ee`

## Purpose

This document turns the main-branch architecture audit and the versioned brand redesign into an implementation plan. It is written for contributors who will normalize the existing source of truth, add Storybook and automated checks, establish a versioned asset contract, and prepare the system for downstream consumption.

The redesign branch is the implementation baseline. At the time of writing, `origin/main` is an ancestor of the branch, so this is a consolidation effort rather than a conflict-heavy branch merge.

Primary inputs:

- [Main-branch architecture audit](https://hackmd.io/@itslounow/BkilBnlwGl)
- [`AGENTS.md`](../AGENTS.md)
- [`docs/brand-architecture.md`](brand-architecture.md)
- [`docs/ui-components.md`](ui-components.md)
- [`src/lib/brand-reigns.ts`](../src/lib/brand-reigns.ts)

## Outcome

After this work, RaidGuild should have:

1. One validated, structured source for durable identity data, reign data, semantic tokens, typography metadata, and asset metadata.
2. Generated CSS and machine-readable artifacts that cannot silently drift from that source.
3. A reign-aware Storybook that documents and tests component states in isolation.
4. A versioned asset contract that does not require consumers to clone the full Git LFS repository.
5. A defined path for consuming tokens and source-owned UI components without copying the entire playbook application.
6. CI checks that prove generated outputs, stories, schemas, and critical asset references remain valid.

## Product Rules That Constrain the Technical Design

### Durable identity

The durable layer is intentionally small:

- The black crossed-swords logomark is the canonical master mark.
- Recognition, provenance, and the relationship to RaidGuild must survive surrounding visual change.
- A geometry change to the mark creates a new documented mark version.

### Reigns and practices are separate axes

- A reign answers **when?** and versions the Guild identity through time.
- A practice answers **where and for what?** and differentiates simultaneous specialization.
- Moloch/Scroll, Mazius, witchcraft imagery, and other expressions are not timeless global canon. They belong to named reigns.
- A Storybook reign control must not be reused as a practice control. A future practice control should be modeled separately.

### Historical immutability

Once a reign version is published, its source palette, type assignments, marks, and asset references should remain addressable. Corrections should create a new package or manifest version without silently changing a historical URL.

## Scope

### Included

- Observable documentation and manifest drift identified by the audit.
- A structured and validated brand source.
- Artifact generation and drift checks.
- Storybook configuration, stories, interaction tests, accessibility checks, and static builds.
- Stable/experimental component classification.
- Asset inventory, metadata, derivative generation, and a versioned delivery contract.
- Package or registry preparation.
- Compatibility for existing public routes and asset URLs during migration.
- Handoff documentation for downstream applications.

### Not included

- A new visual reign.
- Reworking the Louchi, Suede, TW, or Ven art direction.
- Treating a practice identity as the whole Guild identity.
- Replacing the public brand guide with Storybook.
- Requiring the paid x402 endpoint as a build-time dependency.
- Publishing packages before their stable surface has been agreed upon.

## Current State

### What the redesign already contributes

- Selectable Louchi, Suede, TW, and Ven reigns.
- `data-brand-reign` on the root element and persisted selection under `raidguild-brand-reign`.
- The canonical black crossed-swords asset.
- Reign-aware colors, typography, illustrations, and explanatory content.
- More complete dark-mode mappings for Louchi, TW, and Ven.
- Local EB Garamond loading.
- Brand architecture guidance separating reigns from practices.
- Updated public and paid machine-facing guidance.

### Known drift and debt still present

- Moloch 100 is `#f1efee` in CSS and agent guidance but `#FAEEEB` in `BRAND-ASSETS.md` and `public/brand-assets.json`.
- Machine API illustration URL templates omit the required `{palette}` directory.
- README setup text references `globall.css` and documents nonexistent `text-*` typography classes.
- Font variables inside Tailwind's theme mapping are self-referential.
- The agent guidance claims a small-cap reset that is not present in `globals.css`.
- Declared container variables are not all consumed.
- `package.json` still identifies the application as `raidguild-website`.
- `bun.lock`, `bun.lockb`, and `package-lock.json` coexist.
- No test script or automated component test suite is declared.
- The homepage maintains a long, hardcoded illustration list.
- Machine data, JSON, CSS, Markdown, and pages repeat facts manually.
- The WebP tree is approximately 411 MB across 848 Git LFS files.
- Consumers currently need source copying, public URLs, or the paid machine API; there is no package or registry contract.

### Storybook status

Phase 2 foundation is implemented with Storybook 10 on the Next.js Vite framework. The workshop has independent reign and appearance globals, generated tokens and application fonts, accessibility and browser interaction tests, and foundational token and typography stories. All 42 canonical components now have colocated direct-API stories and generated deep-link IDs, and every high-risk interaction named below has browser coverage. Static builds and story tests run in CI, while `/ui` remains the curated public gallery. See `docs/storybook.md` for current coverage and reviewed accessibility debt.

The existing gallery is useful migration material, but it does not provide isolated states, interaction tests, accessibility checks, visual comparisons, or an installable component contract.

## Target Architecture

```text
                         ┌─────────────────────────┐
                         │ Structured brand source │
                         │ schema + validated data │
                         └────────────┬────────────┘
                                      │ generate / import
                 ┌────────────────────┼────────────────────┐
                 │                    │                    │
                 ▼                    ▼                    ▼
       generated token CSS   public brand manifest   machine API data
                 │                    │                    │
                 ├────────────┬───────┴────────────┬───────┤
                 ▼            ▼                    ▼       ▼
             Playbook     Storybook            Registry  Asset catalog
                 │            │                    │       │
                 └────────────┴──────────┬─────────┴───────┘
                                        ▼
                              Downstream applications
```

Recommended source layout:

```text
src/brand/
├── schema.ts
├── system.ts
├── core.ts
├── reigns/
│   ├── louchi.ts
│   ├── suede.ts
│   ├── tw.ts
│   └── ven.ts
├── practices.ts
├── typography.ts
├── components.ts
└── assets.ts

scripts/
├── generate-brand-artifacts.ts
├── validate-brand-artifacts.ts
└── generate-illustration-derivatives.ts

src/generated/
├── brand-tokens.css
└── brand-data.ts

public/
└── brand-assets.json
```

The exact directory names may change, but the dependency direction may not: generated artifacts consume the structured source; the structured source must never import a generated artifact.

## Canonical Data Model

Use TypeScript data validated with Zod as the provisional implementation choice. The project already depends on both, and TypeScript allows asset and reign references to be checked before JSON and CSS generation.

The schema must represent:

### System release

- Schema version.
- Brand system release version.
- Generated timestamp and source commit.
- Compatibility and deprecation metadata.

### Durable core

- Canonical mark ID and version.
- Canonical black SVG path.
- Recognition and alteration rules.
- Provenance requirements.
- Approved relationship phrases.

### Reign

- Stable ID and display label.
- Steward and contribution language.
- Status: latest, archived, reconstructed, or unavailable.
- Evidence and source references.
- Palette and semantic mappings.
- Typography assignments.
- Illustration collections.
- Mark variants.
- Voice or motion references when available.
- Reign data version.

### Practice

- Stable practice ID.
- Relationship to RaidGuild.
- Endorsement phrase and operating disclosure.
- Approved mark variant.
- Source and owner metadata.
- Optional practice-specific tokens.

Practice data must not be nested inside a reign. A practice may reference the reign version it currently consumes.

### Asset

- Stable asset ID.
- Reign or durable-core ownership.
- Source provenance.
- MIME type, width, height, tone, palette, and crop.
- Original and derivative URLs.
- Content hash.
- Availability and reconstruction status.
- Usage constraints and accessible description.

### Component

- Stable component ID.
- Source path.
- Stability: stable, experimental, deprecated, or reign-specific.
- Required dependencies.
- Required providers.
- Story IDs.
- Accessibility and interaction-test expectations.

## Generated Artifacts

The first generator must produce or validate the following:

1. `src/generated/brand-tokens.css` for raw palettes, semantic tokens, and reign mappings.
2. `src/generated/brand-data.ts` for playbook and machine API runtime imports.
3. `public/brand-assets.json` for public machine consumption.
4. A generated Markdown reference, or generated table sections, for facts currently duplicated in human documentation.

Do not generate all of `globals.css`. Keep resets, Tailwind utilities, layout utilities, and handwritten component styling separate from generated brand tokens.

The generator must be deterministic. Running it twice without source changes must produce no Git diff.

Add a check mode that generates into memory or a temporary directory and fails when committed outputs are stale.

## Storybook Specification

### Role

Storybook is the implementation workshop and executable component contract. It complements rather than replaces:

- `/ui`, which remains a curated public guide.
- `docs/ui-components.md`, which remains integration guidance.
- The structured source, which remains canonical for tokens and metadata.

### Framework

Use the current supported Storybook framework for Next.js with Vite unless a documented incompatibility requires the Webpack framework. Keep Storybook dependencies development-only.

Implementation references:

- [Storybook for Next.js](https://storybook.js.org/docs/get-started/frameworks/nextjs/)
- [Toolbars and globals](https://storybook.js.org/docs/essentials/toolbars-and-globals)
- [Storybook testing](https://storybook.js.org/docs/writing-tests)
- [Accessibility testing](https://storybook.js.org/docs/writing-tests/accessibility-testing)

Expected files:

```text
.storybook/
├── main.ts
├── preview.tsx
└── manager.ts
```

Expected scripts:

```json
{
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build",
  "test:stories": "<Storybook test command>",
  "check:brand": "<generated artifact validation command>",
  "typecheck": "tsc --noEmit"
}
```

Use the command generated by the installed Storybook release rather than copying a stale command from this document.

### Global controls

Add two independent toolbar globals:

1. `brandReign`: Louchi, Suede, TW, Ven. Default: Louchi.
2. `appearance`: light, dark. Default: light.

The preview decorator must:

- Import global and generated token CSS.
- Set `data-brand-reign` on the preview root document.
- Set the `light` or `dark` class.
- Apply the font variables needed by the selected reign.
- Wrap stories in required providers.
- Set an appropriate semantic background and foreground.

Do not make practice selection part of the reign control. Add a separate practice control only after practice-level component requirements exist.

### Story migration

Create one colocated `*.stories.tsx` file for each component or adopt a single clearly documented stories directory. Colocation is preferred for package extraction.

The first migration may render the existing matching `*Example` component to achieve coverage quickly. Follow-up stories should target the component API directly so examples do not become a permanent testing abstraction.

Every component needs at least:

- Default story.
- Representative variants.
- Disabled or unavailable state when applicable.
- Narrow viewport behavior when layout-sensitive.
- Dark surface behavior when applicable.

Forms and stateful components additionally need error, loading, empty, open, selected, or completed states as appropriate.

### Story taxonomy

Organize stories under:

```text
Foundations/
Primitives/
Navigation/
Overlays/
Data Display/
Forms/
Compositions/
Brand/
Experimental/
```

Apply stability tags from the structured component metadata. The Storybook navigation should make experimental components visibly distinct.

### Tests

All stories act as render smoke tests.

Add interaction tests first for:

- Form
- Dialog
- Sheet and Drawer
- Combobox and Multiselect
- DatePicker and Calendar
- DataTable
- Wizard
- Command
- NavigationMenu
- Carousel

Add automated accessibility checks for all stable stories. New stable stories must not introduce unreviewed serious or critical violations.

Use a controlled visual matrix:

- Foundational primitives: all available reigns in light and dark.
- High-level components: Louchi and Suede in light and dark, plus functional tests.
- TW and Ven composites: add explicit visual cases where their typography or contrast materially changes the component.

This avoids an unreviewable `42 components × 8 themes × every state` snapshot explosion while still protecting the meaningful differences.

### Storybook deployment

Build Storybook in CI. The recommended hosting model is a dedicated static service, such as a separate Railway service, so Storybook failures or dependency changes cannot block the public playbook runtime.

Decide separately whether the deployment is public, access-controlled, or limited to preview builds.

## Asset Contract

### Short-term stabilization

- Inventory all current assets from the structured source.
- Add dimensions, hashes, ownership, and source provenance.
- Pin archived external references to immutable commits or versioned paths where possible.
- Validate critical URLs in CI without downloading the full catalog on every run.
- Preserve current public paths until a compatibility policy is published.

### Target delivery model

Publish immutable versioned paths resembling:

```text
/v/{brand-release}/core/marks/{asset}
/v/{brand-release}/reigns/{reign}/{asset}
/v/{brand-release}/practices/{practice}/{asset}
```

The exact host and path scheme are open decisions. The contract must provide immutable versions, checksums, cache headers, and a manifest that maps stable asset IDs to files.

### Illustration pipeline

Retain one approved original per scene and generate palette, tone, size, and thumbnail derivatives. Do not manually maintain 16 independent source files per scene.

The derivative pipeline must be reproducible and record:

- Source hash.
- Generation command or pipeline version.
- Output dimensions and format.
- Palette and tone transform.
- Output hash.

Do not remove the current LFS outputs until replacement URLs and compatibility behavior are verified in production.

## Distribution Strategy

Implement distribution in layers:

### Layer 1: brand core

Publishable contents:

- Schemas and TypeScript types.
- Durable mark metadata.
- Reign and practice registries.
- Generated tokens.
- Asset manifest types and lookup helpers.

### Layer 2: source-owned components

Prefer a shadcn-style registry first. It matches the existing source-owned component model and allows consumers to install selected components with their dependencies.

The registry must include:

- Component source.
- Required utility and provider files.
- Dependencies.
- Required CSS or token package version.
- Story or documentation link.

### Layer 3: optional component package

Only publish a compiled UI package after the stable component surface, CSS boundary, React compatibility, and release process are proven. Do not make the package a prerequisite for the registry.

### Assets

Assets remain a separately versioned delivery concern. Installing a token or component package must not download the full illustration catalog.

## Delivery Plan

### Phase 0: factual cleanup

Deliver as a small, reviewable pull request.

- Resolve the Moloch 100 discrepancy with the brand steward.
- Correct machine API illustration templates.
- Correct README paths, numbering, and typography utilities.
- Resolve self-referential font variables.
- Add or remove the documented small-cap reset so implementation and guidance agree.
- Remove or use dead layout variables.
- Rename the package to `raidguild-brand` or another approved name.
- Select one package manager and remove conflicting lockfiles.
- Remove the speculative Separator documentation or implement the component.

Acceptance criteria:

- Human docs, CSS, public JSON, and machine data agree on audited facts.
- Production build, lint, and typecheck pass.
- Railway continues to deploy with the selected lockfile.
- Existing public routes remain available.

### Phase 1: structured source and generation

- Add the schema and structured source.
- Move reign definitions and repeated token data into it.
- Generate CSS, runtime data, public JSON, and factual reference output.
- Add deterministic generation and drift checks.
- Keep compatibility adapters for existing imports during migration.

Acceptance criteria:

- One edit updates all generated brand surfaces.
- CI fails when generated outputs are stale or invalid.
- Existing pages render the same intended reigns.
- Machine API responses still satisfy the published schema.

### Phase 2: Storybook foundation

- Install Storybook using the selected package manager.
- Add reign and appearance globals.
- Load generated tokens and fonts.
- Add stories for all foundational and primitive components.
- Add accessibility checks and the first interaction tests.
- Build a static Storybook artifact in CI.

Acceptance criteria:

- Storybook starts locally and builds statically.
- Louchi is the default reign.
- Every available reign can be selected without reloading Storybook.
- Light and dark modes use semantic surfaces.
- Foundational components render across the agreed visual matrix.

### Phase 3: complete component contract

- Migrate all 42 components.
- Add high-risk interaction tests.
- Add stability metadata and taxonomy.
- Link the public `/ui` guide to relevant Storybook stories where appropriate.
- Establish visual regression policy.

Acceptance criteria:

- Every UI component has at least one direct story.
- Stable stateful components have interaction coverage.
- Stable stories pass accessibility policy.
- Storybook failures block merging changes to covered stable components.

### Phase 4: asset pipeline and contract

- Build the asset inventory and validation.
- Establish versioned asset hosting.
- Implement deterministic illustration derivative generation.
- Migrate playbook references.
- Publish compatibility behavior for old paths.

Acceptance criteria:

- A consumer can fetch selected assets without Git LFS or cloning this repository.
- Published asset versions are immutable.
- Critical playbook, Storybook, and consumer references resolve successfully.
- The full LFS tree is not inherited by package or registry consumers.

### Phase 5: registry and downstream adoption

- Publish the brand core contract.
- Publish the initial source-owned component registry.
- Integrate a small downstream pilot in `raid-guild/website`.
- Document upgrade and rollback procedures.
- Expand the stable surface only after the pilot.

Acceptance criteria:

- The pilot consumes tokens and at least two components without whole-repository copying.
- The pilot can pin a brand system and reign data version.
- A release can be upgraded or rolled back predictably.
- Consumer builds do not depend on the paid machine endpoint.

## CI Requirements

The completed system should expose these logical checks, even if exact script names change:

```text
lint
typecheck
build playbook
validate structured brand source
verify generated artifacts are current
validate public JSON and machine schemas
build Storybook
run stable story render tests
run selected interaction tests
run stable-story accessibility checks
validate critical asset references
```

Do not require all 848 legacy illustrations to download during ordinary pull-request CI. Use manifest checks, sampled remote checks, and a scheduled full asset validation job.

## Compatibility and Migration Rules

- Preserve `/colors`, `/typography`, `/logos`, `/iconography`, `/illustrations`, `/ui`, `/architecture`, and machine discovery routes.
- Preserve `raidguild-brand-reign` local storage behavior.
- Keep Louchi as the default latest reign until a new reign is explicitly approved.
- Treat machine schema changes as versioned API changes.
- Add deprecation metadata before removing a component, token, or asset path.
- Keep archived and reconstructed reign evidence clearly labeled.
- Never rewrite historical source attribution during normalization.

## Decisions Required

| Decision | Recommended default | Owner |
| --- | --- | --- |
| Canonical source format | TypeScript data validated by Zod | Engineering |
| Moloch 100 value | Confirm visual source; provisionally retain CSS/AGENTS value `#f1efee` | Brand steward |
| Package manager | npm, because project docs and scripts already use it; remove both Bun locks | Engineering |
| Storybook framework | Next.js with Vite | Engineering |
| Storybook hosting | Separate Railway static service | Engineering / operations |
| Storybook visibility | Public preview unless unreleased practice work requires access control | Brand steward |
| Visual regression service | Evaluate hosted versus self-managed after baseline stories exist | Engineering |
| Asset host | Versioned object storage/CDN with immutable caching | Engineering / operations |
| Component distribution | shadcn registry before compiled package | Engineering |
| Stable component set | Begin with primitives; review compositions individually | Design and engineering |

### Recorded Phase 0 Decisions

- Moloch 100 is `#f1efee`, matching the current CSS and agent-facing brand guidance.
- npm is the project package manager; `package-lock.json` is canonical and the Bun lockfiles are removed.
- The application package name is `raidguild-brand`.
- The standalone Separator entry remains out of the component contract until a component is implemented.

Record decisions in this document or in short architecture decision records before implementing dependent phases.

## Risks and Mitigations

### Generated-source complexity

Risk: generation creates a harder contribution workflow.  
Mitigation: keep the structured source readable, provide one generation command, and make stale-output errors actionable.

### Theme matrix explosion

Risk: every state across every reign becomes too expensive to review.  
Mitigation: use the controlled visual matrix and prioritize semantic differences.

### Storybook and Next.js behavior diverge

Risk: fonts, aliases, routing, or server-only imports behave differently in isolation.  
Mitigation: use the supported Next.js framework, keep server boundaries out of UI primitives, and retain a production application build in CI.

### Asset migration breaks historical links

Risk: removing LFS assets or changing paths breaks old documents and consumers.  
Mitigation: publish immutable replacements first, retain compatibility paths, and validate high-value URLs before removal.

### Premature package stability

Risk: publishing all 42 components freezes experimental APIs.  
Mitigation: publish metadata and registry entries only for reviewed stable components; keep experimental stories visible without promising package stability.

### Paid machine API becomes a hidden dependency

Risk: consumers rely on x402 during builds.  
Mitigation: packages, registries, and public versioned manifests must work independently of the paid endpoint.

## Definition of Done

The consolidation is complete when:

- There is one validated structured source for brand facts.
- Generated outputs produce no unexplained drift.
- Human and machine guidance agree on tokens, fonts, assets, reigns, and component status.
- Storybook covers every component and provides reign and appearance controls.
- Stable components have render, accessibility, and appropriate interaction coverage.
- A static Storybook build is shareable.
- Consumers can pin versions and retrieve selected assets without cloning the LFS tree.
- At least one downstream application consumes the new contract successfully.
- Existing public guide routes and archived reign references continue to work.
- Release, upgrade, deprecation, and rollback procedures are documented.

## Suggested Pull Request Sequence

1. `fix/audit-factual-drift`
2. `feat/structured-brand-source`
3. `feat/storybook-foundations`
4. `feat/storybook-component-contract`
5. `feat/versioned-asset-contract`
6. `feat/shadcn-registry`
7. `feat/website-consumer-pilot`

Each pull request should be independently deployable and should leave the public guide in a working state.

## First Implementer Checklist

Before coding:

- Confirm the decisions table with the brand steward and engineering owner.
- Rebase or merge the current feature branch only if `main` has moved.
- Capture current production screenshots for all available reigns.
- Record current public and machine route responses as compatibility fixtures.
- Confirm Railway behavior with the selected package manager.

Begin with Phase 0. Do not initialize Storybook, rewrite token generation, and remove legacy assets in one pull request.
