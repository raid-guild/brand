# Louchi / Venture Beyond source sync

Active brand branch: `feat/versioned-brand-reigns`. The current website source of truth is [`review/venture-beyond-redesign` at `7d0e878065a566207884a37b6281158d26c8ae88`](https://github.com/raid-guild/website/tree/7d0e878065a566207884a37b6281158d26c8ae88). Louchi / Luis Blanco stewarded the visual direction; Guild contributors implemented, reviewed, and refined it. The [original handoff](https://github.com/luisblancoach/website/tree/handoff/venture-beyond-dekan) remains in the website ancestry.

## Current coverage

`Brand/Current Venture Beyond` contains the Clients and Community website compositions at that revision and focused stories for the hero/audience shell, services and reasons, projects and builders, community hats and benefits, inquiry preview, and branded CTA. The guide at `/current-patterns` links each story and package usage. Source sections, narrative, data, assets, and local preview adapters are recorded in `src/stories/brand/current-venture/README.md`.

Story navigation reports intended destinations while local section anchors scroll. Inquiries validate locally and never submit; the project catalog uses the website's fallback entries without requesting the live API. Portal and live feeds remain website behavior. The shared branded CTA is now published as `BrandAction` / `BrandButton` with `@raidguild/brand-system/brand-action.css`. The generic Button API and archived reigns remain available.

The source website's night canvas is `#191e4e`, raised surface `#252a61`, and cream foreground `#efe9d7`. These values are reflected in Louchi canonical semantic roles; website section-specific tokens and layouts stay in the pinned snapshot CSS. Last Duel Bold Extended 2 Retalic (700) forms the upper display line; Bold Extended 2 (700) with CSS italic synthesis forms the lower. Ubuntu is body text, Ubuntu Mono utility text. The six Last Duel cuts are licensed guide-only assets in `public/brand-fonts/louchi/`, outside the reusable package. The package retains its open Afacad Flux display fallback.

## Historical studies

`Brand/Venture Beyond`, `Brand/Hero Discovery`, `Brand/Elastic Gallery`, and `Brand/Venture Interactions` preserve the September workshop lineage based on website `a00dd80` and later typography study `a6418ea`. Their earlier layout, portal, field-notes rail, and elastic-gallery examples are historical, not current Community page contracts. Their source adapters are documented in `src/stories/brand/website-snapshot/README.md`.

The earlier workshop's contrast and accessibility adjustments were exploratory. Validate any proposal for website adoption against the current source and with Louchi. Current verification results belong to the checks run on the working branch; old story-count claims are intentionally not carried forward.
