# RaidGuild Brand Archive

Latest reign: Louchi / Venture Beyond

A living, versioned repository of brand guidance, assets, and resources for designers and developers. Each reign records collective identity work shaped under a steward's direction; older reigns remain selectable instead of being overwritten.

The black crossed swords are the canonical master mark. Track colors and the surrounding visual system may change between reigns.

RaidGuild's architecture has two independent axes: **steward reigns** version the Guild identity over time, while **practices** (internally, spears) differentiate specialized fronts that can coexist. Practices may have distinct positioning and visual systems, but share RaidGuild's builder pool, endorsement, and RaidGuild LLC operating layer. See [`docs/brand-architecture.md`](docs/brand-architecture.md).

Implementation planning: [`docs/brand-system-implementation-handoff.md`](docs/brand-system-implementation-handoff.md) consolidates the architecture audit, structured source-of-truth work, Storybook rollout, asset contract, testing, and downstream distribution plan.

Brand-system checks:

```bash
npm run generate:brand
npm run check:brand
npm run test:brand
npm run build:package
npm run pack:package
```

The installable `@raidguild/brand-system` contract packages canonical data,
theme runtime, components, semantic token CSS, fonts, and logos. It defaults to
the latest reign—currently Louchi, which remains explicitly in development and
unversioned as a reign. Package SemVer is independent. See
[`docs/package-contract.md`](docs/package-contract.md).
Development deployments expose the current tarball manifest at
`/packages/brand-system.json` and a convenience download at
`/packages/raidguild-brand-system-dev.tgz`.

Component workshop:

```bash
npm run storybook
npm run build-storybook
npm run test:stories
```

Storybook defaults to the Louchi reign and provides independent reign and
light/dark appearance controls. See
[`docs/storybook.md`](docs/storybook.md) for coverage and accessibility policy.

Quick links: [live site](https://www.brand.raidguild.org/) | [repo](https://github.com/raid-guild/brand)

## For AI Agents

- Load `AGENTS.md` into your assistant context before generating UI or copy. It condenses tokens, components, assets, and prompting rules.
- Update canonical data in `src/brand/system.ts`, run `npm run generate:brand`, and keep `AGENTS.md` in sync so agents stay accurate. Use `npm run check:brand` to detect stale generated artifacts.

## Paid Machine API

The site exposes its complete machine-readable brand package through an x402
endpoint:

- Discovery: `GET /.well-known/agents.json`
- Paid resource: `GET /api/machine/brand-guidelines`

An unpaid request receives `402 Payment Required` and a standard x402 v2
`PAYMENT-REQUIRED` header. A client can authorize the advertised exact payment
and retry with a `PAYMENT-SIGNATURE` header. Successful responses include the
guidelines payload and a `PAYMENT-RESPONSE` settlement header.

Configure the endpoint with:

```env
X402_BRAND_CHAIN_ID=84532
X402_BRAND_PAY_TO_ADDRESS=0xYourPaymentRecipientAddress
X402_BRAND_GUIDELINES_PRICE=0.01
X402_BRAND_MAX_TIMEOUT_SECONDS=60
X402_BRAND_DESCRIPTION="Access the complete RaidGuild brand guidelines, design tokens, implementation guidance, and machine-readable asset manifest."
X402_FACILITATOR_URL=https://x402.org/facilitator
```

The current configuration targets Base Sepolia. The discovery document is
public; the full payload is returned only after successful payment. Update the
canonical source in `src/brand/system.ts` and run `npm run generate:brand`
whenever tokens, components, or asset paths change. Keep narrative guidance in
`src/lib/machine-api/brand-guidelines.ts` aligned with that generated data.

## Setting Up a New App with RaidGuild Brand Guidelines

For new consumers, prefer the package contract documented above. The source-copy
instructions below remain available for projects that intentionally vendor and
customize the components.

This guide will help you integrate the RaidGuild brand guidelines into a new Next.js application.

### 1. Install Required Dependencies

```bash
# Core dependencies
npm install class-variance-authority clsx lucide-react tailwind-merge

# Development dependencies
npm install -D @tailwindcss/postcss tw-animate-css
```

### 2. Add Font Files

Create a `public/fonts/` directory and add the RaidGuild brand fonts:

```
public/
  fonts/
    ├── MAZIUSREVIEW20.09-Regular.woff
    ├── MaziusDisplay-Bold.otf
    ├── EBGaramond-VariableFont_wght.ttf
    └── EBGaramond-Italic-VariableFont_wght.ttf
```

Copy `src/lib/fonts.ts` into your project.

Update your `src/app/layout.tsx` to include the fonts:

```typescript
import type { Metadata } from "next";
import { maziusDisplay, ebGaramond, ubuntuMono } from "@/lib/fonts";
import { ThemeProvider } from "@/lib/theme-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "My RaidGuild App",
  description: "Built with RaidGuild brand guidelines",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-brand-reign="louchi">
      <body
        className={`${maziusDisplay.variable} ${ebGaramond.variable} ${ubuntuMono.variable}`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### 3. Update Global CSS

Copy both `src/app/globals.css` and `src/generated/brand-tokens.css`; the former contains Tailwind mappings and handwritten utilities, while the latter is generated from `src/brand/system.ts`.

### 4. Add Components

#### EXAMPLE

Create `src/components/ui/switch.tsx`:

```typescript
"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
```

#### Example Usage

Now you can use the RaidGuild brand styles and components in your app:

```typescript
import { Switch } from "@/components/ui/switch";

export default function HomePage() {
  return (
    <div className="container-custom py-16">
      <h1 className="type-display-lg mb-8">Welcome to RaidGuild</h1>
      <p className="type-body-lg text-muted-foreground mb-8">
        Built with the RaidGuild brand guidelines
      </p>

      <div className="flex items-center space-x-2">
        <Switch id="example-switch" />
        <label htmlFor="example-switch" className="type-body-md">
          Example switch component
        </label>
      </div>
    </div>
  );
}
```

### 5. Available Typography Classes

- **Display**: `.type-display-lg`, `.type-display-md`, `.type-display-sm`
- **Headings**: `.type-heading-lg`, `.type-heading-md`, `.type-heading-sm`
- **Body**: `.type-body-lg`, `.type-body-md`, `.type-body-sm`
- **Labels**: `.type-label`, `.type-label-md`, `.type-label-sm`
- **Code**: `.type-code-lg`, `.type-code-md`, `.type-code-sm`

### 6. Available Color Classes

The brand includes two main color palettes:

- **Moloch** (warm reds): `moloch-100` through `moloch-800`
- **Scroll** (warm yellows): `scroll-100` through `scroll-800`

Use with Tailwind classes like `bg-moloch-400`, `text-scroll-600`, etc.

### 7. Grid System

Use `.container-custom` for consistent max-width and padding, and `.grid-custom` for responsive grid layouts that adapt from 4 columns (mobile) to 12 columns (desktop).

### 8. UI Components Catalog

A comprehensive catalog of all available UI components is available in `docs/ui-components.md`. This document is **essential** when working with LLM developer agents.

#### For LLM Developer Agents

**Always include the UI Components Catalog in your prompt context** when working with LLM agents (Cursor, GitHub Copilot, ChatGPT, etc.). This ensures the agent:

- Knows what components are available
- Uses existing components instead of creating custom alternatives
- Follows design system patterns
- Uses correct imports and props

#### What's in the Catalog

The catalog includes:

- Complete list of all 42+ UI components
- Detailed descriptions and use cases
- Import paths and exports
- Component variants and props
- Design tokens (colors, typography, spacing)
- Common component combinations
- Code examples and patterns
- Quick reference guide
- Accessibility guidelines

**Location:** `docs/ui-components.md`

**When to use:** Always reference this document when building UI features or working with LLM agents.
