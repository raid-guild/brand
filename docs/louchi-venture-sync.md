# Louchi / Venture Beyond workshop sync

Baseline: [website eab88cc](https://github.com/raid-guild/website/tree/eab88cc).
Design and asset handoff: Luis Blanco (Louchi), [original branch](https://github.com/luisblancoach/website/tree/handoff/venture-beyond-dekan), tip a195359. The website retains original commits as ancestry. This brand-repo copy records source provenance; it does not claim authorship of those assets. Stewardship is not sole authorship: the implementation, critique and refinements are collaborative.

## Current examples

- Brand / Venture Beyond / Typography And Actions: all six section-heading pairings, pill anatomy and 24px separation from copy.
- Night: explicit navy appearance for side-by-side review.
- Mobile Card Rail: horizontal swipe, visible 44px previous/next controls, disabled ends, counter, next-card preview and interaction test. Desktop Spears stay a two-column grid in the website; Field Notes use a rail at all sizes.
- Motion And Routing: agreed video, discovery, reduced-motion and navigation behavior.
- Brand / Hero Discovery: actual current day/night forward-reverse videos and foliage, hover/focus/tap interaction, offscreen/hidden-tab/reduced-motion playback protection.
- Foundations and all existing primitive stories inherit updated Louchi fonts and semantic surfaces. Archived reign font mappings are unchanged.
- Brand / Venture Interactions: multicolor portal chooser (stamped or blank), real team-wall drag/pause/drift and counter-moving tickers, foliage front door, forward-only creed loop, three-step inquiry with local validation and success/server-error previews.
- Responsive Spears demonstrates the desktop two-column grid switching to a mobile rail. Field Notes demonstrates the all-size rail with current artwork.

## Typography and assets

Afacad Flux is the deliberately chosen open font alternative, not a recreation of the proprietary Grinder cuts. It is copied from the website with its OFL. Ubuntu variable files are copied from the installed Ubuntu font distribution and use the Ubuntu Font Licence already bundled alongside Ubuntu Mono. No additional commercial font is included.

Display: weight 900, uppercase, tracking -.015em, line height around 1.0. Accents: upright weight 1000 then positive 12-degree skew (tops lean left). Ubuntu paragraphs remain unskewed; Ubuntu Mono labels and controls retain their utility voice.

Videos and foreground artwork originate in Louchi's handoff/Assets.zip as integrated by the website. The workshop copies the processed hero ping-pong loops, forward-only creed crossfade and horizontal spear illustrations. Do not reverse the creed walker scene: the bird would fly backwards.

## Review boundaries

This workshop covers the current website's core visual elements and interaction patterns. It is not a duplicate homepage: hero landmark coordinates remain an isolated study, and navigation destinations are reported locally so reviewers stay in Storybook. Source snapshots and their adapters are documented in `src/stories/brand/website-snapshot/README.md`.

Pill geometry matches the handoff, but small cream-on-pink / pink-on-cream text has contrast problems. Filled workshop specimen controls use near-black text (#060609), and form error labels use light pink on dark surfaces. These pass the pattern accessibility checks. Ask Louchi to approve these color pairings before website adoption. The stable generic Button API is unchanged; the branded pills here remain study components rather than a newly published API.

No story content or statistics should be treated as verified project claims. Talent & Placement remains proposed. Existing unrelated UI components and archived reigns are intentionally preserved.

## Verification

The full 142-story browser suite passes, including accessibility checks (existing documented exceptions remain unchanged), portal Escape dismissal, member pause state, rail navigation and form validation. The date-picker's existing selected-date story exposed a month initialization bug; the calendar now starts on its selected date rather than the current month. Typecheck, static Storybook build and canonical brand tests also run before handoff. Form success/error fixtures are local-only and protected by a no-fetch/no-analytics contract test.
