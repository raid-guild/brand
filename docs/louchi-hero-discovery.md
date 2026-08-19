# Louchi Hero Discovery

The Venture Beyond hero is an interactive wayfinding pattern within the Louchi
reign. It turns the panorama into a navigable world while keeping the same Guild
architecture visible in day and night appearances.

## Information architecture

The revealed landmarks connect three core intents:

1. **Bring a challenge** routes prospective partners toward Guild-level problem
   framing and crew assembly.
2. **Explore practices** presents independently led specialist practices without
   treating any practice as the whole Guild.
3. **Join the Guild** returns builders to the shared community and talent pool.

## Interaction contract

- Hover or keyboard focus on `Venture Beyond` opens the foreground curtain.
- Tap toggles the same discovery state on touch and pointer interfaces.
- Opening strengthens landmark contrast and reveals orbital wayfinding.
- Keep the state open briefly after pointer exit so people can cross from the
  title to a landmark without racing the animation.
- Every landmark is a real link with a visible focus state and descriptive name.
- Day/night selection changes appearance only. It must not change navigation,
  content hierarchy, or the selected brand reign.

## Motion and accessibility

- Use layered translation and opacity to reveal useful information.
- Avoid continuously moving foreground art after the discovery state settles.
- With `prefers-reduced-motion: reduce`, reveal the final state immediately:
  no parallax, orbit animation, long crossfade, or curtain travel.
- Never make hover the only route. Keyboard focus and tap must expose the same
  destinations.
- Maintain readable marker contrast against both panorama appearances.

## Source assets

The approved Louchi 1.1 sources are pinned to RaidGuild website commit
`4ffb59154966bd9ed08e54275cb145c288fa77ed`:

- `raidguild-panorama.png` — day panorama
- `raidguild-panorama-night-v1.webp` — night panorama
- `hero-landmarks-v1.png` — transparent landmark overlay
- `hero-foreground.png` — separable foreground curtain

The executable reference is the Storybook story
`Brand/Hero Discovery`. The public visual reference appears on `/illustrations`.
