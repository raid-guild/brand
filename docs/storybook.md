# Storybook Workshop

Storybook is the executable component workshop for this repository. It does not
replace the public `/ui` guide or the integration guidance in
`docs/ui-components.md`.

## Commands

```bash
npm run storybook
npm run build-storybook
npm run test:stories
```

The local workshop runs at `http://localhost:6006`. The static build is written
to `storybook-static/`, which is intentionally ignored by Git.

## Theme controls

The preview toolbar exposes two independent globals:

- `brandReign`: Louchi, Suede, TW, or Ven. Louchi is the default.
- `appearance`: light or dark. Light is the default.

The preview applies the selected `data-brand-reign`, semantic appearance class,
generated token CSS, local font variables, and `ThemeProvider` without reloading
the workshop. Practice selection is intentionally not part of either control.

## Current coverage

Foundation stories cover generated brand tokens, typography, and the complete
four-reign by two-appearance visual matrix. Every component in the canonical
42-component registry now has a colocated default story. The first migration of
complex components renders the matching curated `*Example` component; these
stories establish render and accessibility coverage while direct API stories
and interaction states are added incrementally. Popover is covered directly
because no matching example existed. Dialog, Sheet, and Drawer now use their
direct APIs; each includes a forced-open state and a browser interaction test
that opens, verifies, and closes the overlay.

Canonical story IDs live in `src/brand/components.ts`, including the overlay
state and interaction stories. The Storybook contract test prevents literal CSF
stability tags from drifting away from that component metadata.

## Accessibility policy

The accessibility addon runs against every story. Stable stories fail browser
tests on violations by default. Migrating the curated examples also fixed their
low-contrast source links, duplicate breadcrumb landmark labels, and an
unfocusable scroll viewport. The following reviewed, pre-existing cases use
`todo` so they remain visible in Storybook and test output while the underlying
token or primitive work is scheduled:

- Some semantic color pairings across the eight-theme matrix do not meet text
  contrast thresholds.
- Badge variants, the pressed Toggle state, and the Label error state inherit
  those contrast issues.
- The forced-open Select story triggers `aria-hidden-focus` inside the combined
  Storybook/Radix portal harness; the normal closed story remains enforced.

New exceptions should be narrow, story-specific, and documented here. Removing
these exceptions requires resolving the canonical token or component behavior,
not disabling accessibility checks globally.
