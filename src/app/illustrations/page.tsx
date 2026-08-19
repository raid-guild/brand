"use client";

import Image from "next/image";
import Link from "next/link";
import IllustrationGallery from "@/components/illustrations/IllustrationGallery";
import { BRAND_SYSTEM } from "@/generated/brand-data";
import { useTheme } from "@/lib/theme-context";


export default function IllustrationsPage() {
  const { brandReign } = useTheme();

  if (brandReign.id === "suede") {
    return <SuedeIllustrations />;
  }

  if (brandReign.id === "ven") {
    return <VenIllustrations palette={brandReign.palette} />;
  }

  const isLouchi = brandReign.id === "louchi";
  const collection =
    BRAND_SYSTEM.assets.illustrations.referenceCollections[brandReign.id];
  const hero = "hero" in collection ? collection.hero : null;
  const artDirection = collection.items.find(
    (illustration) =>
      "kind" in illustration && illustration.kind === "art-direction",
  );
  const appearanceArtwork = collection.items.find(
    (illustration) =>
      "kind" in illustration && illustration.kind === "appearance-artwork",
  );
  const interactionOverlay = collection.items.find(
    (illustration) =>
      "kind" in illustration && illustration.kind === "interaction-overlay",
  );
  const galleryItems = collection.items.filter(
    (illustration) =>
      !("kind" in illustration) ||
      !["art-direction", "appearance-artwork", "interaction-overlay"].includes(
        illustration.kind,
      ),
  );
  const appearances = isLouchi ? BRAND_SYSTEM.reigns[0].appearances : null;
  const motion = isLouchi ? BRAND_SYSTEM.reigns[0].motion : null;

  return (
    <div className="container-custom py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-4xl">
          <p className="type-label-sm mb-3 text-primary">{brandReign.label}</p>
          <h1 className="type-display-lg mb-6">Illustrations</h1>
          <p className="type-body-lg mb-8 text-muted-foreground">
            {collection.direction}
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

        {isLouchi && hero ? (
          <section className="mb-14">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="type-label-sm mb-3 text-primary">Appearance</p>
                <h2 className="type-heading-lg">One World, Day and Night</h2>
              </div>
              <p className="type-body-sm max-w-xl text-muted-foreground">
                Night is the dark appearance of the Louchi reign, not a separate
                identity or reign.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {[
                { artwork: hero, guidance: appearances?.light },
                { artwork: appearanceArtwork, guidance: appearances?.dark },
              ].map(({ artwork, guidance }) =>
                artwork ? (
                  <article
                    key={artwork.src}
                    className="overflow-hidden rounded-lg border border-border bg-[var(--reign-deep)]"
                  >
                    <div className={`relative w-full ${artwork.aspect}`}>
                      <Image
                        src={artwork.src}
                        alt={artwork.alt}
                        fill
                        priority={artwork === hero}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 text-[var(--reign-field)]">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="type-heading-sm">
                          {guidance?.label ?? artwork.title}
                        </h3>
                        <span className="type-code-sm">Louchi 1.1</span>
                      </div>
                      {guidance ? (
                        <p className="type-body-sm mt-3 opacity-75">
                          {guidance.direction}
                        </p>
                      ) : null}
                    </div>
                  </article>
                ) : null,
              )}
            </div>
          </section>
        ) : null}

        {isLouchi && hero && interactionOverlay && motion ? (
          <section className="mb-14 rounded-lg border border-border bg-card p-6 text-card-foreground lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.35fr_.65fr] lg:items-center">
              <div
                className={`relative overflow-hidden rounded-md bg-[var(--reign-deep)] ${hero.aspect}`}
              >
                <Image src={hero.src} alt={hero.alt} fill className="object-cover" />
                <Image
                  src={interactionOverlay.src}
                  alt={interactionOverlay.alt}
                  fill
                  className="object-cover drop-shadow-[0_0_10px_rgba(238,60,120,.45)]"
                />
              </div>
              <div>
                <p className="type-label-sm text-primary">Motion Pattern</p>
                <h2 className="type-heading-lg mt-3">Hero Discovery</h2>
                <p className="type-body-md mt-4 text-muted-foreground">
                  {motion.discoveryPattern.reveal}
                </p>
                <ul className="mt-6 space-y-3">
                  {motion.principles.map((principle) => (
                    <li key={principle} className="type-body-sm border-l-2 border-primary pl-4">
                      {principle}
                    </li>
                  ))}
                </ul>
                <p className="type-code-sm mt-6 rounded-md bg-muted p-4 text-muted-foreground">
                  Reduced motion: {motion.discoveryPattern.reducedMotion}
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {isLouchi && artDirection ? (
          <section className="mb-14">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-3xl">
                <p className="type-label-sm mb-3 text-primary">Art Direction</p>
                <h2 className="type-heading-lg">Character Style Guide</h2>
                <p className="type-body-md mt-3 text-muted-foreground">
                  Use this sheet when commissioning Louchi-era class and role
                  characters. Preserve the flat color, readable silhouettes,
                  restrained linework, and transparent output described here.
                </p>
              </div>
              <Link
                href={artDirection.src}
                className="type-label-md text-primary hover:text-primary/80"
                target="_blank"
              >
                Open full-resolution PNG
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-white">
              <Image
                src={artDirection.src}
                alt={artDirection.alt}
                width={1746}
                height={2484}
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="h-auto w-full"
              />
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
            {galleryItems.map((illustration) => (
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

function VenIllustrations({
  palette,
}: {
  palette: readonly { name: string; value: string }[];
}) {
  const colors = palette.map((color) => {
    const channels = color.value
      .slice(1)
      .match(/.{2}/g)
      ?.map((channel) => Number.parseInt(channel, 16));

    return {
      ...color,
      rgb: channels?.join(" / ") ?? "Unavailable",
    };
  });
  const primary = colors.slice(0, 3);
  const secondary = colors.slice(3);

  return (
    <div className="container-custom py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-4xl">
          <p className="type-label-sm mb-3 text-primary">Ven · Archived reconstruction</p>
          <h1 className="type-display-lg mb-6">Graphic Language</h1>
          <p className="type-body-lg mb-6 text-muted-foreground">
            The surviving RG UI sheets point to a nocturnal, interface-first
            world: black fields, electric pink line work, ornate display type,
            fantasy role icons, technical labels, and violet-to-pink framing.
          </p>
          <div className="rounded-lg border border-primary/30 bg-primary/10 p-6">
            <p className="type-body-md">
              This is a directional reconstruction from the surviving overview
              and colour sheet, not a claim that the complete original
              illustration library has been recovered.
            </p>
          </div>
        </div>

        <section className="mb-12 grid overflow-hidden border border-[#FF3864] bg-black text-white lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative min-h-[42rem] lg:min-h-[52rem]">
            <Image
              src="/images/reigns/ven/skull-sword.png"
              alt="Ven-era neon line illustration of a sword rising through a horned skull"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col justify-end border-t border-[#FF3864]/50 p-8 lg:border-l lg:border-t-0 lg:p-12">
            <p className="type-code-sm mb-5 tracking-[0.2em] text-[#FF3864]">
              VEN—ILLUSTRATION / RECOVERED ARTIFACT
            </p>
            <h2 className="type-display-sm mb-6 text-[#FF3864]">
              Mythic symbols.<br />Interface voltage.
            </h2>
            <p className="type-body-lg max-w-xl text-white/75">
              A sword, horned skull, geometric frame, and cosmic marks are
              rendered as deliberately raw neon linework. The artifact shows
              the secondary violet and yellow acting as structural colors—not
              merely decorative swatches.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-px bg-[#FF3864]/40 type-code-sm">
              <div className="bg-black p-4"><dt className="text-white/50">FORMAT</dt><dd className="mt-2">PNG / ALPHA</dd></div>
              <div className="bg-black p-4"><dt className="text-white/50">SOURCE</dt><dd className="mt-2">SURVIVING VEN ART</dd></div>
              <div className="bg-black p-4"><dt className="text-white/50">DIMENSIONS</dt><dd className="mt-2">1420 × 1800</dd></div>
              <div className="bg-black p-4"><dt className="text-white/50">STATUS</dt><dd className="mt-2">ARCHIVED</dd></div>
            </dl>
          </div>
        </section>

        <section className="mb-12 bg-black p-6 text-[#FF3864] md:p-10">
          <div className="mb-14 grid gap-6 md:grid-cols-2">
            <h2 className="type-heading-md">3.7&nbsp;&nbsp;Colour</h2>
            <p className="type-code-sm max-w-sm leading-relaxed">
              ARCHIVE PLATE / PARTIAL RECONSTRUCTION<br />
              Exact values sampled from the surviving RG UI reference.
            </p>
          </div>

          {[{ label: "Primary Colours", colors: primary }, { label: "Secondary Colours", colors: secondary }].map((group) => (
            <div key={group.label} className="mb-10 border-t border-[#FF3864] pt-3">
              <p className="type-code-sm mb-4">{group.label}</p>
              <div className="grid gap-3 md:grid-cols-3">
                {group.colors.map((color) => (
                  <article key={color.value}>
                    <div
                      className="aspect-[1.55/1] border border-white/30"
                      style={{ backgroundColor: color.value }}
                    />
                    <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 type-code-sm leading-relaxed">
                      <dt>NAME:</dt><dd>{color.name}</dd>
                      <dt>RGB:</dt><dd>{color.rgb}</dd>
                      <dt>HEX:</dt><dd>{color.value}</dd>
                    </dl>
                  </article>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-14 flex items-end justify-between gap-4">
            <span
              className="block size-10 bg-[#FF3864]"
              style={{
                mask: "url('/assets/logos/symbol-black.svg') center / contain no-repeat",
                WebkitMask: "url('/assets/logos/symbol-black.svg') center / contain no-repeat",
              }}
              role="img"
              aria-label="RaidGuild crossed swords"
            />
            <p className="type-code-sm">VEN / RG UI / ARCHIVE PLATE 01</p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {["Icons as roles", "Systems as artifacts", "Workflow as brand"].map((title, index) => (
            <article key={title} className="border border-border bg-card p-6 text-card-foreground">
              <p className="type-code-sm mb-12 text-primary">VEN—0{index + 1}</p>
              <h2 className="type-heading-md mb-3">{title}</h2>
              <p className="type-body-md text-muted-foreground">
                {index === 0
                  ? "Line icons connected Guild roles and fantasy language to practical product work."
                  : index === 1
                    ? "Components, tokens, and Storybook were presented as part of the identity—not merely implementation detail."
                    : "The one-sheet documents contribution and handoff, making collective maintenance visible inside the brand itself."}
              </p>
            </article>
          ))}
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
