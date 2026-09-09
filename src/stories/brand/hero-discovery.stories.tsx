import { useEffect, useId, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, Label, Switch } from "@raidguild/brand-system/components";
import { expect, userEvent, within } from "storybook/test";
import styles from "./hero-discovery.module.css";

function HeroDiscovery() {
  const [exploring, setExploring] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toggleId = useId();
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const sync = () => { if (!visible || document.hidden || reduced.matches) el.pause(); else void el.play().catch(() => {}); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    sync();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); reduced.removeEventListener("change", sync); };
  }, [isNight]);

  const reveal = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setExploring(true);
  };
  const rest = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setExploring(false), 1100);
  };

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
  );

  return (
    <section
      className={`${styles.stage} ${exploring ? styles.exploring : ""} ${isNight ? styles.isNight : ""}`}
      aria-label="Venture Beyond discovery pattern"
      onMouseEnter={reveal}
      onMouseLeave={rest}
    >
      <video ref={video} key={String(isNight)} className={styles.panorama} muted loop playsInline preload="metadata" poster={`/images/neo/hero-${isNight ? "dark" : "light"}-poster.png`} src={`/videos/venture/hero-${isNight ? "dark" : "light"}-pingpong.mp4`} aria-hidden="true" />
      <div className={styles.wash} aria-hidden="true" />
      <div className={styles.curtainLeft} aria-hidden="true" />
      <div className={styles.curtainRight} aria-hidden="true" />

      <div className={styles.controls}>
        <Switch id={toggleId} checked={isNight} onCheckedChange={setIsNight} />
        <Label htmlFor={toggleId}>{isNight ? "Night" : "Day"}</Label>
      </div>

      <div className={styles.copy}>
        <Button
          variant="ghost"
          className={styles.titleButton}
          aria-pressed={exploring}
          onClick={() => setExploring((open) => !open)}
          onFocus={reveal}
          onBlur={rest}
        >
          <span>
            <span className={styles.title}>
              VENTURE<br /><em>BEYOND.</em>
            </span>
            <span className={styles.instruction}>
              {exploring ? "THE WORLD IS OPEN" : "HOVER, FOCUS, OR TAP TO EXPLORE"}
            </span>
          </span>
        </Button>
      </div>

      {exploring ? (
        <nav className={styles.wayfinding} aria-label="Hero landmarks">
          <span className={styles.orbit} aria-hidden="true" />
          <a className={`${styles.waypoint} ${styles.challenge}`} href="#challenge" onFocus={reveal}>
            Bring a challenge
          </a>
          <a className={`${styles.waypoint} ${styles.practices}`} href="#practices" onFocus={reveal}>
            Explore practices
          </a>
          <a className={`${styles.waypoint} ${styles.join}`} href="#join" onFocus={reveal}>
            Join the Guild
          </a>
        </nav>
      ) : null}
    </section>
  );
}

const meta = {
  title: "Brand/Hero Discovery",
  component: HeroDiscovery,
  globals: { brandReign: "louchi" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof HeroDiscovery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /venture/i });

    await userEvent.hover(trigger);
    await expect(trigger).toHaveAttribute("aria-pressed", "true");
    await expect(canvas.getByRole("link", { name: "Explore practices" })).toBeVisible();

    await userEvent.click(canvas.getByRole("switch"));
    await expect(canvas.getByText("Night")).toBeVisible();
  },
};
