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
} from "@raidguild/brand-system/components";
import "@raidguild/brand-system/tokens.css";
```

The package also exports font files under `@raidguild/brand-system/fonts/*` and
logo files under `@raidguild/brand-system/logos/*`.

`ThemeProvider` uses the latest reign by default and persists a user's valid
selection under `raidguild-brand-reign`. Use `defaultReign="suede"` when an
application should start from an archived system.

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
