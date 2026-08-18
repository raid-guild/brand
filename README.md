# RaidGuild Brand Archive

Latest reign: Louchi / Venture Beyond

A living, versioned repository of brand guidance, assets, and resources for designers and developers. Each reign records collective identity work shaped under a steward's direction; older reigns remain selectable instead of being overwritten.

The black crossed swords are the canonical master mark. Track colors and the surrounding visual system may change between reigns.

RaidGuild's architecture has two independent axes: **steward reigns** version the Guild identity over time, while **practices** (internally, spears) differentiate specialized fronts that can coexist. Practices may have distinct positioning and visual systems, but share RaidGuild's builder pool, endorsement, and RaidGuild LLC operating layer. See [`docs/brand-architecture.md`](docs/brand-architecture.md).

Implementation planning: [`docs/brand-system-implementation-handoff.md`](docs/brand-system-implementation-handoff.md) consolidates the architecture audit, structured source-of-truth work, Storybook rollout, asset contract, testing, and downstream distribution plan.

Quick links: [live site](https://www.brand.raidguild.org/) | [repo](https://github.com/raid-guild/brand)

## For AI Agents

- Load `AGENTS.md` into your assistant context before generating UI or copy. It condenses tokens, components, assets, and prompting rules.
- When updating brand tokens, components, or asset paths, keep `AGENTS.md` in sync so agents stay accurate.

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
payload in `src/lib/machine-api/brand-guidelines.ts` whenever tokens, guidance,
components, or asset paths change.

## Setting Up a New App with RaidGuild Brand Guidelines

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
    ├── MAZIUSREVIEW20.09-Regular.otf
    ├── MAZIUSREVIEW20.09-Regular.woff
    ├── EBGaramond-VariableFont_wght.ttf
    └── EBGaramond-Italic-VariableFont_wght.ttf
```

Copy `src/lib/fonts.ts`: into your project.

Update your `src/app/layout.tsx` to include the fonts:

```typescript
import type { Metadata } from "next";
import { maziusDisplay, ebGaramond, ubuntuMono } from "@/lib/fonts";
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
    <html lang="en">
      <body
        className={`${maziusDisplay.variable} ${ebGaramond.variable} ${ubuntuMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
```

### 2. Update Global CSS

Replace your `src/app/globals.css` with the RaidGuild brand styles from the globall.css file in this repo.

### 3. Add Components

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
      <h1 className="text-display-lg mb-8">Welcome to RaidGuild</h1>
      <p className="text-body-lg text-muted-foreground mb-8">
        Built with the RaidGuild brand guidelines
      </p>

      <div className="flex items-center space-x-2">
        <Switch id="example-switch" />
        <label htmlFor="example-switch" className="text-body-base">
          Example switch component
        </label>
      </div>
    </div>
  );
}
```

### 4. Available Typography Classes

- **Display**: `.text-display-lg`, `.text-display-md`, `.text-display-sm`
- **Headings**: `.text-heading-lg`, `.text-heading-md`
- **Body**: `.text-body-lg`, `.text-body-base`, `.text-body-sm`
- **Labels**: `.text-label` (uppercase with letter spacing)

### 5. Available Color Classes

The brand includes two main color palettes:

- **Moloch** (warm reds): `moloch-100` through `moloch-800`
- **Scroll** (warm yellows): `scroll-100` through `scroll-800`

Use with Tailwind classes like `bg-moloch-400`, `text-scroll-600`, etc.

### 6. Grid System

Use `.container-custom` for consistent max-width and padding, and `.grid-custom` for responsive grid layouts that adapt from 4 columns (mobile) to 12 columns (desktop).

### 7. UI Components Catalog

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
