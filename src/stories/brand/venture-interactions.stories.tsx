import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { expect, userEvent, within, waitFor } from "storybook/test";
import PortalEnergy from "./website-snapshot/PortalEnergy";
import TeamWall from "./website-snapshot/TeamWall";
import LoopBand from "./website-snapshot/LoopBand";
import FrontDoor from "./website-snapshot/FrontDoor";
import HireUs from "./website-snapshot/HireUs";
import site from "./website-snapshot/HomeExperience.module.css";
import styles from "./venture-elements.module.css";

const routes = [
  { title: "Explore practices", detail: "Choose an established practice", destination: "Active Spears", position: site.portalSpear },
  { title: "Start a project", detail: "Bring the Guild an ambitious problem", destination: "Contact form", position: site.portalProblem },
  { title: "Join the Guild", detail: "Discover the builder community", destination: "The Guild", position: site.portalJoin },
];

function Portals({ initiallyOpen = false, blank = false }: { initiallyOpen?: boolean; blank?: boolean }) {
  const [open, setOpen] = useState(initiallyOpen);
  const [hot, setHot] = useState<number | null>(null);
  const [destination, setDestination] = useState("");
  const trigger = useRef<HTMLButtonElement>(null);
  return <div className={styles.sheet}>
    <h1 className={styles.heading}>Open a <em>portal</em></h1>
    <p className={styles.copy}>Actual multicolor energy renderer. Hover or focus a portal to intensify it. This preview reports destinations locally instead of navigating away. Escape closes and returns focus.</p>
    <div className={styles.actions}><button ref={trigger} className={styles.pill} onClick={() => setOpen(true)}>Open a portal</button></div>
    <p role="status">{destination ? `Destination: ${destination}` : "No destination selected"}</p>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onCloseAutoFocus={(event) => { event.preventDefault(); trigger.current?.focus(); }} className={`${site.site} ${site.portalOverlay} ${styles.portalDialog}`} style={{ maxWidth: "100vw", width: "100vw", height: "100dvh", inset: 0, transform: "none", translate: "none", padding: 0, border: 0, borderRadius: 0 }}>
        <DialogTitle className="sr-only">Choose your portal</DialogTitle><DialogDescription className="sr-only">Choose a practice, bring a project, or meet the Guild.</DialogDescription>
        <div className={site.portalAtmosphere} aria-hidden="true" />
        {routes.map((route, i) => <button type="button" key={route.title} className={`${site.portalMachine} ${route.position}`} onPointerEnter={() => setHot(i)} onPointerLeave={() => setHot(null)} onFocus={() => setHot(i)} onBlur={() => setHot(null)} onClick={() => { setDestination(route.destination); setOpen(false); }}>
          <PortalEnergy energized={hot === i} destinationSrc={blank ? undefined : ["/images/neo/field-protocol-garden.png", "/images/neo/sky-citadel.png", "/images/neo/hero-dark-poster.png"][i]} />
          <span className={site.portalChoiceLabel}><small>0{i + 1} / TRANSIT</small><strong>{route.title}</strong><b>{route.detail}</b><i>↓</i></span>
        </button>)}
        <div className={site.portalMessage} aria-hidden="true"><h2>Choose your <em>portal.</em></h2></div>
      </DialogContent>
    </Dialog>
  </div>;
}

const members = [
  { name: "Suede", title: "UI/UX Design", imagePath: "/images/member-suede.png" },
  { name: "Sero", title: "Frontend", imagePath: "/images/member-sero.png" },
  { name: "Daopunk", title: "Smart contracts", imagePath: "/images/member-daopunk.png" },
  { name: "Suns", title: "Frontend", imagePath: "/images/member-suns.png" },
];
function TeamMotion() {
  return <div className={site.site} style={{ padding: 24 }}>
    <p className={styles.label}>[ Stewards / static specimen ]</p>
    <div className={styles.grid}>{[{ name: "Dekan", role: "Knowledge steward", image: "dekan" }, { name: "ECWireless", role: "Infrastructure steward", image: "ecwireless" }].map(person => <article className={styles.card} key={person.name}><img src={`/images/member-${person.image}.png`} alt="" style={{ width: 150, height: 150, borderRadius: "50%", objectFit: "cover" }} /><p className={styles.label}>{person.role}</p><h3>{person.name}</h3><p>Static card. Reign stewardship is a group effort, not sole authorship.</p></article>)}</div>
    <div style={{ marginTop: 32 }}><p className={styles.label}>[ The team / moving member wall ]</p><TeamWall members={members} /></div>
    <div className={styles.actions}><p className={styles.copy}>Drag/swipe to browse; hover or focus to pause. Offscreen motion sleeps; no per-strip pause buttons. Reduced-motion preferences stop automatic drift.</p></div>
    <LoopBand label="Guild ticker">{["One Guild", "Many edges", "Builder-owned", "Applied AI"].map(word => <span className={site.tickerWord} key={word}>{word}</span>)}</LoopBand>
    <LoopBand label="Counter-moving specimen" reverse>{["Shared craft", "Shared reputation", "Open experiments"].map(word => <span className={site.tickerWord} key={word}>{word}</span>)}</LoopBand>
  </div>;
}

function Contact({ outcome = "success", initialStatus = "idle" }: { outcome?: "success" | "error"; initialStatus?: "idle" | "success" | "error" }) {
  return <div className={site.site} style={{ padding: 24 }}>
    <p className={styles.label}>[ Local form preview / no data is sent ]</p>
    <div className={styles.contactLayout}>
      <div><img src="/images/neo/contact-druid-transparent.png" alt="Guild explorers" style={{ width: "100%", maxHeight: 320, objectFit: "contain" }} /><h2 className={styles.heading}>What impossible thing<br /><em>are you building?</em></h2><p className={styles.copy}>Exercise the actual three-step form, validation, back navigation and simulated {outcome} response. Use fictional information only.</p></div>
      <div className={site.contactFormShell} style={{ width: "auto", padding: 24, margin: 0, minHeight: 0 }}><HireUs previewOutcome={outcome} initialStatus={initialStatus} /></div>
    </div>
  </div>;
}

function Entrance() {
  const [entered, setEntered] = useState("");
  return <div className={site.site} style={{ minHeight: "90vh", background: "url('/images/neo/hero-light-poster.png') center / cover" }}>
    {!entered ? <FrontDoor onEnter={setEntered} /> : <div style={{ padding: 48, background: "#102d2c", color: "#efe9d7" }}><h1 className={styles.heading}>Venture <em>beyond</em></h1><p role="status">Destination: {entered}</p><button className={styles.pill} onClick={() => setEntered("")}>Replay entrance</button></div>}
  </div>;
}

function Creed() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current!;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => { if (!visible || motion.matches || document.hidden) video.pause(); else void video.play().catch(() => {}); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(video); motion.addEventListener("change", sync); document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); motion.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, []);
  return <div className={site.site}><section className={site.creed}><video className={site.creedMoons} ref={ref} src="/videos/venture/manifesto-crossfade.mp4" poster="/images/neo/manifesto-backdrop.png" muted playsInline loop preload="metadata" aria-hidden="true" /><p className={site.sectionLabel}>[ The RaidGuild Creed ]</p><blockquote>The future is not<br />something to predict.<br />It is something to <em>build.</em></blockquote></section><p className={styles.copy}>Forward-only wrap crossfade. No reversed bird motion. Video covers the complete section on mobile and desktop.</p></div>;
}

const meta = { title: "Brand/Venture Interactions", component: Portals, globals: { brandReign: "louchi" }, parameters: { layout: "fullscreen" } } satisfies Meta<typeof Portals>;
export default meta;
type Story = StoryObj<typeof meta>;
export const PortalChooser: Story = { play: async ({ canvasElement }) => { const canvas = within(canvasElement); await userEvent.click(canvas.getByRole("button", { name: "Open a portal" })); const page = within(canvasElement.ownerDocument.body); await waitFor(() => expect(page.getByRole("dialog")).toBeVisible()); await userEvent.keyboard("{Escape}"); await waitFor(() => expect(page.queryByRole("dialog")).not.toBeInTheDocument()); } };
export const PortalOpen: Story = { args: { initiallyOpen: true } };
export const BlankInteriors: Story = { args: { initiallyOpen: true, blank: true } };
export const TeamAndTickers: Story = { render: () => <TeamMotion />, play: async ({ canvasElement }) => { const canvas = within(canvasElement); await expect(canvas.queryByRole("button", { name: "Pause movement" })).not.toBeInTheDocument(); } };
export const ContactForm: Story = { render: () => <Contact /> };
export const ContactServerError: Story = { render: () => <Contact outcome="error" initialStatus="error" /> };
export const ContactSuccess: Story = { render: () => <Contact initialStatus="success" /> };
export const ContactValidation: Story = { render: () => <Contact />, play: async ({ canvasElement }) => { const canvas = within(canvasElement); await userEvent.click(canvas.getByRole("button", { name: /next/i })); await waitFor(() => expect(canvas.getByText("Name is required.")).toBeVisible()); } };
export const FoliageFrontDoor: Story = { render: () => <Entrance /> };
export const CreedLoop: Story = { render: () => <Creed /> };
