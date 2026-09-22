import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within, waitFor } from "storybook/test";
import styles from "./venture-elements.module.css";

function Pill({ children, filled = false }: { children: React.ReactNode; filled?: boolean }) {
  const icon = children === "Enter Discord" ? "discord" : "logo";
  return <button className={`${styles.pill} ${filled ? styles.filled : ""}`} type="button">{children}<span className={styles.stamp} aria-hidden="true"><span style={{ width: 32, height: 32, background: "currentColor", mask: `url('/images/icons/venture/ico-${icon}.svg') center / contain no-repeat` }} /></span></button>;
}

function Elements() {
  return <main className={styles.sheet}>
    <p className={styles.label}>[ Louchi / Venture Beyond ]</p>
    <p className={styles.copy}>Website baseline a00dd80 · September 2026. Stewarded by Louchi, developed collaboratively. Grinder is the current display face, using the webfont package supplied by Louchi with rights reported by the project owner.</p>
    {[["The Guild", "The network", "is the engine"], ["The Team", "A wide network", "of builders"], ["Selected Expeditions", "Proof from", "the frontier"], ["Active Spears", "Specialized at", "the applied edge"], ["Current Stewards", "Keepers of", "the signal"], ["Begin a Transmission", "What impossible thing", "are you building?"]].map(([label, first, accent]) => <section key={label}>
      <p className={styles.label}>[ {label} ]</p>
      <h2 className={styles.heading}>{first}<br /><em>{accent}</em></h2>
      <p className={styles.copy}>A network of creative and technical people solving ambitious problems together.</p>
      <div className={styles.actions}><Pill>Enter Discord</Pill><Pill filled>Join the Guild</Pill></div>
    </section>)}
    <section className={styles.notes}><h2>Typography rules</h2><p>Grinder Regular/Italic and native Grinder Retalic: weight 400, no synthetic skew or bold. Uppercase display copy with enough leading to separate the two cuts. Ubuntu for paragraphs; Ubuntu Mono for bracket labels, metadata and controls. Keep 24px between copy and standalone CTAs. Do not apply skew to body copy or controls.</p><p>Pink on cream is an expressive display pairing, not an accessible small-text pairing. These workshop buttons use dark text for contrast; the live cream-on-pink / pink-on-cream small labels still need designer review.</p></section>
  </main>;
}

const names = ["Applied AI", "Onchain systems", "Talent & placement", "Your edge problem"];
const artwork = ["spear-applied-ai-v1.webp", "spear-onchain-v1.webp", "spear-applied-ai-v1.webp", "spear-edge-problem-v1.webp"];
function CardRail({ fieldNotes = false, responsiveGrid = false }: { fieldNotes?: boolean; responsiveGrid?: boolean }) {
  const titles = fieldNotes ? ["Infrastructure for new worlds", "Gardens, not platforms", "A commons in the clouds", "The machine that stewards itself"] : names;
  const images = fieldNotes ? ["sky-citadel.png", "field-protocol-garden.png", "field-signal-commons.png", "field-autonomous-treasury.png"] : artwork;
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const move = (direction: number) => {
    const el = ref.current;
    if (!el) return;
    const next = Math.max(0, Math.min(names.length - 1, active + direction));
    const card = el.children[next] as HTMLElement;
    el.scrollTo({ left: card.offsetLeft - (el.children[0] as HTMLElement).offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  return <div className={styles.sheet}><p className={styles.label}>[ {fieldNotes ? "Selected expeditions" : "Active Spears"} ]</p><h2 className={styles.heading}>{fieldNotes ? "Proof from" : "Specialized at"}<br /><em>{fieldNotes ? "the frontier" : "the applied edge"}</em></h2><p className={styles.copy}>Mobile Spears and all-size Field Notes use this pattern. Desktop Spears remain a four-column grid. Show a sliver of the next card; no automatic advancement. Field-note content is illustrative, not a verified case-study claim.</p>
    <div className={`${styles.controls} ${responsiveGrid ? styles.desktopGridControls : ""}`}><span role="status">{String(active + 1).padStart(2, "0")} / 04</span><div><button aria-label="Previous card" disabled={active === 0} onClick={() => move(-1)}>←</button><button aria-label="Next card" disabled={active === 3} onClick={() => move(1)}>→</button></div></div>
    <div className={`${styles.track} ${responsiveGrid ? styles.responsiveSpears : ""}`} ref={ref} onScroll={() => { const el = ref.current; if (el) setActive(Math.min(3, Math.round(el.scrollLeft / ((el.children[0] as HTMLElement).offsetWidth + 16)))); }}>
      {titles.map((name, i) => <article className={styles.card} key={name}><p className={styles.label}>{fieldNotes ? "FIELD NOTE" : "SP"}—0{i + 1}{!fieldNotes && i === 2 ? " / PROPOSED" : ""}</p><img src={`/images/neo/${images[i]}`} alt="" /><h3>{name}</h3><p>{fieldNotes ? "Artifacts, protocols, and communities built with people brave enough to go first." : "Independent specialist practice, connected to the Guild’s shared network."}</p><div className={styles.actions}><Pill>{fieldNotes ? "Read the field notes" : "Bring a challenge"}</Pill></div></article>)}
    </div></div>;
}

function MotionRules() {
  return <div className={`${styles.sheet} ${styles.notes}`}><h1 className={styles.heading}>Motion with<br /><em>purpose</em></h1><ul>
    <li>Hero: foliage parts laterally on hover/focus; slow return leaves time to explore. Mobile uses explicit touch access and legible labels.</li>
    <li>Day/night: one appearance system, not two reigns. Desktop toggle sits between navigation and portal; mobile beside the logo.</li>
    <li>Hero video may use forward/reverse loops. Creed walker footage stays forward-only with a wrap crossfade so birds do not fly backwards. Video must cover its section at every breakpoint.</li>
    <li>Team wall drifts slowly; pause on hover/focus and offer a visible pause button. Stewards stay still. Keep the mobile gap between the two compact.</li>
    <li>Portal choices use multicolor high-energy rims; interiors remain blank or stamped until real screenshots exist.</li>
    <li>Reduced motion: no automatic drift, parallax or decorative animation; immediate navigation. Pause video offscreen and when the document is hidden.</li>
    <li>Hero links scroll to contact, practices and Guild. External Join, Handbook and Discord links belong in the Guild section.</li>
  </ul><p>Reference: website commit a00dd80. Hero Discovery uses the current foliage and scene exports as an isolated interaction study. The full website remains the reference for exact landmark positioning and the multicolor portal renderer.</p></div>;
}

const meta = { title: "Brand/Venture Beyond", component: Elements, globals: { brandReign: "louchi" }, parameters: { layout: "fullscreen" } } satisfies Meta<typeof Elements>;
export default meta;
type Story = StoryObj<typeof meta>;
export const TypographyAndActions: Story = {};
export const Night: Story = { globals: { appearance: "dark" } };
export const MobileCardRail: Story = { render: () => <CardRail />, play: async ({ canvasElement }) => { const canvas = within(canvasElement); await userEvent.click(canvas.getByRole("button", { name: "Next card" })); await waitFor(() => expect(canvas.getByRole("status")).toHaveTextContent("02 / 04")); await userEvent.click(canvas.getByRole("button", { name: "Previous card" })); await waitFor(() => expect(canvas.getByRole("status")).toHaveTextContent("01 / 04")); } };
export const MotionAndRouting: Story = { render: () => <MotionRules /> };
export const ResponsiveSpears: Story = { render: () => <CardRail responsiveGrid /> };
export const FieldNotes: Story = { render: () => <CardRail fieldNotes /> };
