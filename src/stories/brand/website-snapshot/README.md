# Website pattern snapshots

Copied from raid-guild/website commit a00dd80 (gallery, shared CSS and portal renderer; form/entrance adapters retain their prior baseline) on the Venture Beyond redesign branch.
Design and asset handoff: Luis Blanco / Louchi. Website implementation and refinements are collaborative. Original handoff ancestry remains in the website repository (source tip a195359).

These source snapshots keep workshop behavior tied to the reviewed website, rather than replacing it with unrelated demo animation. They are not exported as stable package components.

Adaptations:
- TeamWall's Mercenary shape is local; fixtures are a deterministic subset of the website's public member data.
- HireUs resolves validation/options locally and uses the existing brand-repo UI primitives. Step components default active because the brand Wizard only mounts the selected step.
- HireUs has no analytics or fetch submission. previewOutcome and initialStatus expose local success/error states. Its response is simulated after 500ms. No consultation is created.
- Workshop CSS corrects small-text contrast in form controls and error labels. These intentional deviations need designer review before website adoption.
- Portal wrapper uses the existing Radix Dialog for focus trapping, Escape and focus return. Selection reports an in-story destination instead of navigating away.
- Videos, imagery, fonts and icon copies retain their source names. Grinder webfonts are supplied with rights reported by the project owner; guide-only files live outside package fonts. Do not redistribute them without confirming licence scope.

When resyncing, diff these adapters and keep all no-network guarantees. Never replace the form preview with the production submission endpoint.

- ArtifactGallery is a fixture-fed snapshot: API effects are removed, with posts/modules supplied as props. Keep it network-free. The collection uses responsive resting-slot hover geometry and a right-side detail panel.
- Gallery accessibility adaptations: selected filters use near-black text on pink, and the detail panel is a named region rather than a nested complementary landmark. Keep these corrections when resyncing.
