# Louchi / Venture Beyond workshop sync

Baseline: [website a00dd80](https://github.com/raid-guild/website/tree/a00dd80).
Design and asset handoff: Luis Blanco (Louchi), [original branch](https://github.com/luisblancoach/website/tree/handoff/venture-beyond-dekan), tip a195359. The website retains original commits as ancestry. This brand-repo copy records source provenance; it does not claim authorship of those assets. Stewardship is not sole authorship: the implementation, critique and refinements are collaborative.

## Current examples

- Brand / Venture Beyond / Typography And Actions: all six section-heading pairings, pill anatomy and 24px separation from copy.
- Night: explicit navy appearance for side-by-side review.
- Mobile Card Rail: horizontal swipe, visible 44px previous/next controls, disabled ends, counter, next-card preview and interaction test. Desktop Spears use four columns. Field notes, artifacts and collaborators now share the elastic gallery.
- Motion And Routing: agreed video, discovery, reduced-motion and navigation behavior.
- Brand / Hero Discovery: actual current day/night forward-reverse videos and foliage, hover/focus/tap interaction, offscreen/hidden-tab/reduced-motion playback protection.
- Foundations and all existing primitive stories inherit updated Louchi fonts and semantic surfaces. Archived reign font mappings are unchanged.
- Brand / Venture Interactions: multicolor portal chooser (illustrated or blank, on magenta, title beneath the portals), real team-wall drag/pause/drift and counter-moving tickers, foliage front door, forward-only creed loop, three-step inquiry with local validation and success/server-error previews.
- Responsive Spears demonstrates the desktop four-column grid switching to a mobile rail. The older Field Notes rail is retained as a historical study; Brand / Elastic Gallery is the current collection pattern.

## Typography and assets

Grinder Regular, Italic and Retalic are the current display cuts. Louchi supplied the package and the project owner reports rights were obtained. The webfonts live in public/brand-fonts/louchi for guide rendering, outside the reusable package font directory. Confirm redistribution terms before distributing these files to third parties. Afacad Flux/OFL remains the open package fallback; Ubuntu and Ubuntu Mono retain their existing licences.

Display and accents: native weight 400, uppercase, no synthetic bold or skew. Use the separate Grinder Retalic family for accents, with enough line spacing to separate cuts. Ubuntu paragraphs remain unskewed; Ubuntu Mono labels and controls retain their utility voice.

Videos and foreground artwork originate in Louchi's handoff/Assets.zip as integrated by the website. The workshop copies the processed hero ping-pong loops, forward-only creed crossfade and horizontal spear illustrations. Do not reverse the creed walker scene: the bird would fly backwards.

## Review boundaries

This workshop covers the current website's core visual elements and interaction patterns. It is not a duplicate homepage: hero landmark coordinates remain an isolated study, and navigation destinations are reported locally so reviewers stay in Storybook. Source snapshots and their adapters are documented in `src/stories/brand/website-snapshot/README.md`.

Pill geometry matches the handoff, but small cream-on-pink / pink-on-cream text has contrast problems. Filled workshop specimen controls use near-black text (#060609), and form error labels use light pink on dark surfaces. These pass the pattern accessibility checks. Ask Louchi to approve these color pairings before website adoption. The stable generic Button API is unchanged; the branded pills here remain study components rather than a newly published API.

No story content or statistics should be treated as verified project claims. Talent & Placement remains proposed. Existing unrelated UI components and archived reigns are intentionally preserved.

## Verification

September 22 update: website baseline a00dd80. New Brand / Elastic Gallery stories
use local fixtures, adaptive columns, stable resting hover slots, fixed caption
heights, filtering, keyboard dismissal and a sticky right-hand detail panel.
The shared layout snapshot includes four-across Spears, the brick member wall,
oppositely tilted ribbons and the ship-hint clearance. Portal interiors now use
illustrations on an always-magenta canvas with a smaller bottom title. Motion
previews retain hover/focus/reduced-motion behavior without per-strip controls.

Current verification: all 144 Storybook tests (including 21 brand-story
interaction/accessibility tests), 12 brand-contract tests and TypeScript checking
pass. Selected gallery filters
use near-black text on pink for contrast; the detail panel is a named region
rather than a nested complementary landmark. These are intentional workshop
accessibility corrections to propose back to the website.

Previous baseline: the full 142-story browser suite passed, including accessibility checks (existing documented exceptions remain unchanged), portal Escape dismissal, member pause state, rail navigation and form validation. The date-picker's existing selected-date story exposed a month initialization bug; the calendar now starts on its selected date rather than the current month. Typecheck, static Storybook build and canonical brand tests also run before handoff. Form success/error fixtures are local-only and protected by a no-fetch/no-analytics contract test.
