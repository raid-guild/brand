# Current Venture Beyond website snapshot

This folder adapts the current Clients and Community sections from [`raid-guild/website` revision `7d0e878065a566207884a37b6281158d26c8ae88`](https://github.com/raid-guild/website/tree/7d0e878065a566207884a37b6281158d26c8ae88) on `review/venture-beyond-redesign`. Louchi stewarded the visual direction with Guild contributors. This is a local Storybook review snapshot, not a replacement for the website or a claim of sole authorship.

Source sections, CSS modules, `data/` and `narrative/` preserve their website names and content. Relative aliases were rewritten to this folder; the current route type was copied into `src/lib/venture-routes.ts`. Public images/videos referenced by the source were copied under their original paths. Fonts remain the licensed guide-only files in `public/brand-fonts/louchi/`; they are excluded from package binaries. The authoritative source revision governs future resyncs.

`current-venture.stories.tsx` assembles the website's Clients and Community section order and provides focused stories. `shell/VentureShell.tsx`, `primitives/NarrativeAnchor.tsx`, `primitives/Review.tsx`, `UnchartedHunt.tsx`, `HireUs.tsx`, and `ArtifactGallery.tsx` are local adapters. Navigation reports its destination, the inquiry form previews validation without submitting, and Project Explorer uses the exact website fallback artifact list instead of API requests. The full website's Portal experience and live content feeds are intentionally represented as local previews; follow the source website for live behavior. No analytics or network submission runs from these stories.

The current CTA is the additive `BrandAction`/`BrandButton` export plus `brand-action.css`. Other section CSS remains story-local. Use `/current-patterns` for guide links and consumption examples. Older `website-snapshot/`, Hero Discovery, and Elastic Gallery stories document historical workshop studies.

Accessibility review of the pinned source found insufficient contrast for small
coral labels on cream/cyan, pale labels on deep scenes, and translucent header
navigation. The snapshot uses darker coral `#a51346` on pale surfaces, lighter
coral `#ff95b8` on dark scenes, a solid dark-green nav backing, and a unique
carousel region label. Artwork, canonical coral signals, and website source
files are unchanged. These local adaptations should be proposed for website
adoption separately.
