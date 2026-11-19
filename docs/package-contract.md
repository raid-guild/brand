# Installable Package Contract

`@raidguild/brand-system` is the versioned distribution boundary for the
RaidGuild design system. Storybook is its executable documentation, not the
package itself.

## Version model

- Package releases follow SemVer, beginning at `0.1.0` while the API is young.
- The package defaults to the canonical `latest` reign.
- Reign chronology and maturity are separate from package versions.
- Louchi is currently `latest`, has `development` maturity, and intentionally
  has no reign data version.
- Consumers that need visual stability should pin a package version and pass an
  explicit `defaultReign` to `ThemeProvider`.

## Public exports

```tsx
import {
  BRAND_SYSTEM,
  ThemeProvider,
} from "@raidguild/brand-system";
import {
  Button,
  Card,
  BrandAction,
  BrandButton,
} from "@raidguild/brand-system/components";
import "@raidguild/brand-system/tokens.css";
import "@raidguild/brand-system/fonts.css";
import "@raidguild/brand-system/brand-action.css";
```

The package also exports font files under `@raidguild/brand-system/fonts/*` and
logo files under `@raidguild/brand-system/logos/*`. `fonts.css` defines local
Mazius Display, EB Garamond, and Ubuntu Mono faces without a Google Fonts
runtime dependency.

`BrandAction` is the current Venture Beyond link/button pill with primary and secondary variants and an inline sword glyph. It is additive: the generic `Button` API and archived reign styles are unchanged. The package ships Venture Beyond, the open-source display family, as Latin web subsets (`fonts/venture-beyond/`, with `OFL.txt`) and declares `Venture Beyond`, `Venture Beyond Retalic` and the width-pinned `… Extended` families in `fonts.css`, with `--font-venture-beyond` and `--font-venture-beyond-retalic` tokens. These additions don't change the default `--font-display` / `--font-body` tokens.

`ThemeProvider` uses the latest reign by default and persists a user's valid
selection under `raidguild-brand-reign`. Use `defaultReign="suede"` when an
application should start from an archived system.

## Font contract

**Unchanged defaults.** `fonts.css` keeps its default tokens:
- `--font-display` → Mazius Display
- `--font-body` → EB Garamond
- `--font-mono` → Ubuntu Mono

**Additions.** These don't change existing rendering:
- the Venture Beyond faces and the `--font-venture-beyond` / `--font-venture-beyond-retalic` tokens
- the Latin web subsets in `fonts/venture-beyond/`, with `OFL.txt`

**Changed reign value.** In `tokens.css`, the current reign's `[data-brand-reign="louchi"]`
`--font-display` and `--font-retalic` now name Venture Beyond Extended and Venture Beyond Retalic
Extended. They no longer name Last Duel with an Afacad Flux fallback. Consumers on the current reign
previously rendered Afacad Flux unless they hosted Last Duel themselves. Import `fonts.css` to get
Venture Beyond.

Consumers that self-hosted Last Duel should:
1. Delete their Last Duel `@font-face` rules and files.
2. Map any `--font-last-duel*` variables they defined to `--font-venture-beyond` (upright, and
   italic via `font-style: italic`) or `--font-venture-beyond-retalic`.
3. Keep `font-synthesis: none` on display text.

Venture Beyond's Extended width is 10–13% narrower than Last Duel's, so fitted display sizes stay
within their boxes.

**Remaining consolidation (not in this change).** These steps make Ubuntu, Ubuntu Mono and
Venture Beyond the only active families:
1. Switch the default `--font-display` to Venture Beyond and `--font-body` to Ubuntu, in `fonts.css`
   and in the app `@theme`. The compiled `font-display` / `font-body` utilities used by
   `chart.tsx` and `wizard.tsx` resolve to Mazius / EB Garamond today.
   This is a breaking change for package consumers (body text sets about 16% wider), so release
   it as 0.2.0 with a consumer migration note.
2. Drop Mazius Display, EB Garamond and Afacad Flux from the package, keeping archived-reign
   assets outside it. Remove Mazius Review 20.09, which has no licence metadata.
3. Bring `/ai` (Space Grotesk, Inter, JetBrains Mono) onto Venture Beyond / Ubuntu / Ubuntu Mono.
4. Resolve Grinder, which has no licence metadata, and update the Machine API `typography` block,
   which still names Mazius / EB Garamond as the package defaults.

## Build and validation

```bash
npm run build:package
npm run pack:package
```

The build produces ESM and CommonJS entry points plus TypeScript declarations.
The pack check verifies required tarball files, both runtime formats, the token
stylesheet, fonts, and the canonical crossed-swords logo. Registry publication
and release automation are intentionally a later operational step.

Create a locally installable tarball with:

```bash
npm pack ./packages/brand-system
```

## Development downloads

Production builds publish an immutable commit-specific prerelease tarball and
a replaceable development alias:

```text
/packages/raidguild-brand-system-0.1.0-dev.sha<commit>.tgz
/packages/raidguild-brand-system-dev.tgz
```

Package metadata, the exact download path, revision, and SHA-512 integrity are
available from `/packages/brand-system.json`. Portal should install the
commit-specific URL recorded there when it needs a reproducible dependency.

```bash
npm install https://raidguild-brand-guide-production.up.railway.app/packages/raidguild-brand-system-0.1.0-dev.sha<commit>.tgz
```

The brand guide and static Storybook builds both publish these files. Generated
tarballs remain outside Git and are recreated from the checked-out revision on
every production build.
