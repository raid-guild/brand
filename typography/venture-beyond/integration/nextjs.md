# Venture Beyond in a Next.js app

Written against this repo's stack: Next.js 15.5 (App Router), `next/font/local`, Tailwind CSS v4
(`@theme inline`) and the `src/lib/fonts.ts` pattern. **Nothing here has been applied to the brand
site, the website or Portal yet.** These are the steps to follow once the family is approved for
production.

## 1. Copy the fonts and the license

```sh
mkdir -p src/fonts/venture-beyond
cp typography/venture-beyond/dist/woff2/*.woff2 src/fonts/venture-beyond/
cp typography/venture-beyond/LICENSE/OFL.txt src/fonts/venture-beyond/OFL.txt
```

`next/font/local` self-hosts and hashes the files at build time, so they don't need to live in
`public/`. The OFL requires the license text to travel with the fonts, so keep `OFL.txt` next to them.

| File | Style | Axes |
|---|---|---|
| `VentureBeyond-Variable.woff2` | Upright | wght 100–900, wdth 62–125 |
| `VentureBeyond-Italic-Variable.woff2` | Italic (native, 10°) | same |
| `VentureBeyond-Retalic-Variable.woff2` | Retalic (−10°) | same |

## 2. Register the fonts (`src/lib/fonts.ts`)

Add these next to the existing `maziusDisplay` / `ebGaramond` / `ubuntuMono` exports. Leave Last Duel
and the other fonts alone.

```ts
import localFont from "next/font/local";

// Upright + native Italic: one family, so font-style: italic picks the real italic.
export const ventureBeyond = localFont({
  src: [
    { path: "../fonts/venture-beyond/VentureBeyond-Variable.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/venture-beyond/VentureBeyond-Italic-Variable.woff2", weight: "100 900", style: "italic" },
  ],
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  variable: "--font-venture-beyond",
  display: "swap",
  adjustFontFallback: false,
});

// Retalic: a separate family on purpose. Never register it as italic/oblique.
export const ventureBeyondRetalic = localFont({
  src: "../fonts/venture-beyond/VentureBeyond-Retalic-Variable.woff2",
  weight: "100 900",
  style: "normal",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  variable: "--font-venture-beyond-retalic",
  display: "swap",
  adjustFontFallback: false,
  preload: false, // display-only; preload it on the pages that use it if you need to
});
```

Notes:
- `weight: "100 900"` and the `font-stretch` declaration declare the full variable ranges.
  Without them, browsers clamp to the declared default and the axes stop responding.
- `adjustFontFallback: false`, because the size-adjusted Arial fallback is tuned for a single static
  weight and doesn't help a wide display face.

## 3. Expose the CSS variables (`src/app/layout.tsx`)

```tsx
import { maziusDisplay, ebGaramond, ubuntuMono, ventureBeyond, ventureBeyondRetalic } from "@/lib/fonts";

<body className={`${maziusDisplay.variable} ${ebGaramond.variable} ${ubuntuMono.variable} ${ventureBeyond.variable} ${ventureBeyondRetalic.variable}`}>
```

## 4. Tokens and utilities (`src/app/globals.css`)

```css
@theme inline {
  --font-venture: var(--font-venture-beyond), system-ui, sans-serif;
  --font-venture-retalic: var(--font-venture-beyond-retalic), var(--font-venture-beyond), system-ui, sans-serif;
}

@layer components {
  .type-venture,
  .type-beyond {
    font-weight: 900;
    font-stretch: 125%;
    line-height: 0.88;
    letter-spacing: -0.005em;
    font-synthesis: none;
  }
  .type-venture { font-family: var(--font-venture-retalic); font-style: normal; } /* Extended Black Retalic */
  .type-beyond  { font-family: var(--font-venture); font-style: italic; }         /* Extended Black Italic */
}
```

Tailwind then gives you `font-venture` and `font-venture-retalic`. Combine them with `italic`,
`font-black` (or any `font-[350]`) and `[font-stretch:125%]`.

## 5. Use it

```tsx
<h1 className="text-display-lg">
  <span className="type-venture block">VENTURE</span>
  <span className="type-beyond block">BEYOND</span>
</h1>

<p className="font-venture-retalic font-bold [font-stretch:87.5%] [font-synthesis:none]">Retalic, SemiCondensed Bold</p>
```

## Rules that keep it honest

- **Never fake the slant.** Don't use `transform: skewX()`, `font-style: oblique <angle>` or
  `font-variation-settings: "slnt"` (the fonts have no `slnt` axis). Italic comes from
  `font-style: italic` on `font-venture`. Retalic comes from the `font-venture-retalic` family.
- **Always set `font-synthesis: none`** on Venture Beyond text. `<h1>`–`<h6>`, `<strong>` and `<b>`
  default to `bold`. The fonts do cover 700, but if a weight or style is ever missing, synthesis
  would quietly fake it instead of failing visibly.
- Prefer `font-weight` / `font-stretch` over raw `font-variation-settings`. They cascade correctly
  and fallback fonts understand them.
- The `rvrn` feature swaps seven currency signs (`$ ¢ ₡ ₦ ₩ ₲ ₵`) for simplified shapes from wght 500 up. That's
  Archivo's own design, and shaping engines apply it automatically.

## Checklist before shipping

- [ ] Fonts and `OFL.txt` copied, and `next build` passes.
- [ ] VENTURE/BEYOND lockup matches `specimens/venture-beyond-prototype.html`.
- [ ] The DevTools "Rendered Fonts" panel shows `VentureBeyond-*` files for every style, with no
      fallback or synthesized faces.
- [ ] Last Duel still loads where it's used today (Portal is untouched by this change).
