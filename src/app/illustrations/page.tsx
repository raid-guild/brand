"use client";

import Image from "next/image";
import Link from "next/link";
import IllustrationGallery from "@/components/illustrations/IllustrationGallery";
import { useTheme } from "@/lib/theme-context";

const LOUCHI_COMMIT = "6e5f3ec8eade94ddb05a0eb63146aef4a7d80c65";
const LOUCHI_RAW = `https://raw.githubusercontent.com/raid-guild/website/${LOUCHI_COMMIT}/public/images/neo`;

const LOUCHI_ILLUSTRATIONS = [
  {
    title: "Sky Citadel",
    src: `${LOUCHI_RAW}/sky-citadel.png`,
    alt: "A cloaked traveler overlooking a floating coral citadel",
    aspect: "aspect-[972/1619]",
  },
  {
    title: "Protocol Garden",
    src: `${LOUCHI_RAW}/field-protocol-garden.png`,
    alt: "A cartographer studying a luminous network city",
    aspect: "aspect-[971/1619]",
  },
  {
    title: "Signal Commons",
    src: `${LOUCHI_RAW}/field-signal-commons.png`,
    alt: "A floating civic commons above the clouds",
    aspect: "aspect-[1122/1402]",
  },
  {
    title: "Autonomous Treasury",
    src: `${LOUCHI_RAW}/field-autonomous-treasury.png`,
    alt: "Engineers inspecting a monumental autonomous treasury",
    aspect: "aspect-[1003/1568]",
  },
] as const;

const TW_ILLUSTRATIONS = [
  {
    title: "Witchcraft 08",
    src: "https://www.raidguild.org/witch/images/witchcraft-08_0-15-1.png",
    alt: "TW-era RaidGuild witchcraft illustration",
    aspect: "aspect-[2544/2944]",
  },
  {
    title: "Witchcraft 05",
    src: "https://www.raidguild.org/witch/images/witchcraft-05_0-20.png",
    alt: "TW-era surreal fantasy landscape",
    aspect: "aspect-[6667/5417]",
  },
  {
    title: "Witchcraft 04",
    src: "https://www.raidguild.org/witch/images/witchcraft-04_0-2.png",
    alt: "TW-era graphic fantasy scene",
    aspect: "aspect-[6667/5417]",
  },
] as const;

export default function IllustrationsPage() {
  const { brandReign } = useTheme();

  if (brandReign.id === "suede") {
    return <SuedeIllustrations />;
  }

  const isLouchi = brandReign.id === "louchi";
  const illustrations = isLouchi ? LOUCHI_ILLUSTRATIONS : TW_ILLUSTRATIONS;

  return (
    <div className="container-custom py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-4xl">
          <p className="type-label-sm mb-3 text-primary">{brandReign.label}</p>
          <h1 className="type-display-lg mb-6">Illustrations</h1>
          <p className="type-body-lg mb-8 text-muted-foreground">
            {isLouchi
              ? "Expansive speculative landscapes place RaidGuild builders inside unfamiliar, optimistic worlds. The compositions pair fine atmospheric detail with bold coral structures and cyan horizons—a distinctly Moebius-influenced direction."
              : "The TW reign used surreal witchcraft scenes, dense graphic symbols, and high-energy crops. Rust, parchment, oversized type, and playful motion turned the guild into a strange, kinetic spellbook."}
          </p>
          <div className="rounded-lg border border-primary/20 bg-primary/10 p-6">
            <p className="type-body-md mb-3">
              These references are pinned to their originating reign.
            </p>
            <Link
              href={brandReign.sourceUrl ?? "#"}
              className="type-label-md text-primary hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              View {brandReign.sourceLabel}
            </Link>
          </div>
        </div>

        {isLouchi ? (
          <section className="mb-14 overflow-hidden rounded-lg border border-border bg-[var(--reign-deep)]">
            <div className="relative aspect-[3824/1632] w-full">
              <Image
                src={`${LOUCHI_RAW}/raidguild-panorama.png`}
                alt="A panoramic view of the Louchi-era RaidGuild world"
                fill
                priority
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-between gap-4 p-5 text-[var(--reign-field)]">
              <h2 className="type-heading-sm">RaidGuild Panorama</h2>
              <span className="type-code-sm">Venture Beyond / 2026</span>
            </div>
          </section>
        ) : null}

        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="type-heading-lg">Reign Reference Set</h2>
            <p className="type-body-sm text-muted-foreground">
              Preserve original crops and aspect ratios.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {illustrations.map((illustration) => (
              <article
                key={illustration.src}
                className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground"
              >
                <div className={`relative w-full ${illustration.aspect}`}>
                  <Image
                    src={illustration.src}
                    alt={illustration.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="type-heading-sm">{illustration.title}</h3>
                  <p className="type-code-sm mt-2 text-muted-foreground">
                    {brandReign.steward} archive
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function SuedeIllustrations() {
  return (
    <div className="container-custom py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="type-label-sm mb-3 text-primary">Suede archive</p>
          <h1 className="type-display-lg mb-6">Illustrations</h1>
          <p className="text-lg mb-8 text-foreground/80">
            Technology-forward line art echoes cyberpunk aesthetics and D&amp;D
            heroism. Each scene is preserved in color and black-and-white
            variants across square, portrait, and landscape formats.
          </p>
          <div className="rounded-lg border border-primary/20 bg-primary/10 p-6 mb-12">
            <Link
              href="https://github.com/raid-guild/brand/tree/main/public/assets/webp"
              className="type-label-md text-primary hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download the Suede illustration archive
            </Link>
          </div>
        </div>
        <section className="mb-16">
          <h2 className="type-heading-lg mb-6">Browse Illustrations</h2>
          <IllustrationGallery />
        </section>
      </div>
    </div>
  );
}
