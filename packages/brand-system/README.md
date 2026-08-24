# @raidguild/brand-system

Installable RaidGuild brand contract. Package versions follow SemVer independently
from steward-reign maturity. The default reign is always the canonical `latest`
reign; Louchi is currently latest and in development.

Until registry publication is configured, validate the package with
`npm run pack:package`, then create a local tarball with
`npm pack ./packages/brand-system`. Once published, consumers will use
`npm install @raidguild/brand-system`.

```tsx
import { ThemeProvider } from "@raidguild/brand-system";
import { Button } from "@raidguild/brand-system/components";
import "@raidguild/brand-system/tokens.css";

export function App() {
  return (
    <ThemeProvider>
      <Button>Venture Beyond</Button>
    </ThemeProvider>
  );
}
```

`ThemeProvider` defaults to the latest reign. Pin an initial historical reign
with `defaultReign="suede"`. User selections are persisted under
`raidguild-brand-reign`.
