"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandReignPanel, ReignHeroMark } from "@/components/brand/BrandReignPanel";
import { useTheme } from "@/lib/theme-context";

const HERO_IMAGES = [
  "/assets/webp/scroll100/1080x1440/tower-platform-c.webp",
  "/assets/webp/scroll100/1080x1440/stairs-twist-c.webp",
  "/assets/webp/scroll100/1080x1440/stairs-curve-c.webp",
  "/assets/webp/scroll100/1080x1440/stairs-cloud-c.webp",
  "/assets/webp/scroll100/1080x1440/book-orb-c.webp",
  "/assets/webp/scroll100/1080x1440/tree-island-c.webp",
  "/assets/webp/scroll100/1080x1440/arch-gate-c.webp",
  "/assets/webp/scroll100/1080x1440/tower-floating-c.webp",
  "/assets/webp/scroll100/1080x1440/tower-tree-c.webp",
  "/assets/webp/scroll100/1080x1440/compass-circular-c.webp",
  "/assets/webp/scroll100/1080x1440/stone-pedestal-c.webp",
  "/assets/webp/scroll100/1080x1440/raven-solo-c.webp",
  "/assets/webp/scroll100/1440x1440/castle-staff-c.webp",
  "/assets/webp/scroll100/1440x1440/castle-flag-c.webp",
  "/assets/webp/scroll100/1440x1440/warriors-moloch-c.webp",
  "/assets/webp/scroll100/1440x1440/stairs-spiral-c.webp",
  "/assets/webp/scroll100/1440x1440/forge-duo-c.webp",
  "/assets/webp/scroll100/1440x1440/forge-anvil-c.webp",
  "/assets/webp/scroll100/1440x1440/forge-work-c.webp",
  "/assets/webp/scroll100/1440x1440/forge-fire-c.webp",
  "/assets/webp/scroll100/1440x1440/trio-portraits-c.webp",
  "/assets/webp/scroll100/1440x1440/ravens-flight-c.webp",
  "/assets/webp/scroll100/1440x1440/desk-work-c.webp",
  "/assets/webp/scroll100/1440x1440/warrior-solo-c.webp",
  "/assets/webp/scroll100/1440x1440/trio-profiles-c.webp",
  "/assets/webp/scroll100/1440x1440/stone-monuments-c.webp",
  "/assets/webp/scroll100/1440x1440/tree-mech-c.webp",
  "/assets/webp/scroll100/1440x1440/portal-arch-c.webp",
  "/assets/webp/scroll100/1440x1440/forge-building-c.webp",
  "/assets/webp/scroll100/1440x1440/table-castle-c.webp",
  "/assets/webp/scroll100/1440x1440/trio-arch-c.webp",
  "/assets/webp/scroll100/1440x1440/trio-backs-c.webp",
  "/assets/webp/scroll100/1440x1440/trio-beast-c.webp",
  "/assets/webp/scroll100/1440x1440/trio-wings-c.webp",
  "/assets/webp/scroll100/1440x1440/trio-mountain-c.webp",
  "/assets/webp/scroll100/1440x1440/trio-orb-c.webp",
  "/assets/webp/scroll100/1440x1440/trio-portal-c.webp",
  "/assets/webp/scroll100/1440x1440/trio-weapons-c.webp",
  "/assets/webp/scroll100/1440x1440/warriors-triangle-c.webp",
  "/assets/webp/scroll100/1440x1440/warriors-confident-c.webp",
  "/assets/webp/scroll100/1440x1440/warriors-forward-c.webp",
  "/assets/webp/scroll100/1440x1440/warriors-casual-c.webp",
  "/assets/webp/scroll100/1440x1440/warriors-orbs-c.webp",
  "/assets/webp/scroll100/1440x1440/warriors-magic-c.webp",
  "/assets/webp/scroll100/1440x1440/warriors-white-c.webp",
  "/assets/webp/scroll100/1440x1440/warriors-ready-c.webp",
  "/assets/webp/scroll100/1440x1440/warriors-belts-c.webp",
  "/assets/webp/scroll100/1440x1440/warriors-standing-c.webp",
  "/assets/webp/scroll100/1440x1440/warriors-masked-c.webp",
  "/assets/webp/scroll100/1440x1440/warriors-armed-c.webp",
  "/assets/webp/scroll100/1440x1440/trio-warriors-c.webp",
  "/assets/webp/scroll100/1080x1440/tower-platform-bw.webp",
  "/assets/webp/scroll100/1080x1440/stairs-twist-bw.webp",
  "/assets/webp/scroll100/1080x1440/stairs-curve-bw.webp",
  "/assets/webp/scroll100/1080x1440/stairs-cloud-bw.webp",
  "/assets/webp/scroll100/1080x1440/book-orb-bw.webp",
  "/assets/webp/scroll100/1080x1440/tree-island-bw.webp",
  "/assets/webp/scroll100/1080x1440/arch-gate-bw.webp",
  "/assets/webp/scroll100/1080x1440/tower-floating-bw.webp",
  "/assets/webp/scroll100/1080x1440/tower-tree-bw.webp",
  "/assets/webp/scroll100/1080x1440/compass-circular-bw.webp",
  "/assets/webp/scroll100/1080x1440/stone-pedestal-bw.webp",
  "/assets/webp/scroll100/1080x1440/raven-solo-bw.webp",
  "/assets/webp/scroll100/1440x1440/castle-flag-bw.webp",
  "/assets/webp/scroll100/1440x1440/castle-staff-bw.webp",
  "/assets/webp/scroll100/1440x1440/warriors-moloch-bw.webp",
  "/assets/webp/scroll100/1440x1440/stairs-spiral-bw.webp",
  "/assets/webp/scroll100/1440x1440/forge-duo-bw.webp",
  "/assets/webp/scroll100/1440x1440/forge-anvil-bw.webp",
  "/assets/webp/scroll100/1440x1440/forge-work-bw.webp",
  "/assets/webp/scroll100/1440x1440/forge-fire-bw.webp",
  "/assets/webp/scroll100/1440x1440/trio-portraits-bw.webp",
  "/assets/webp/scroll100/1440x1440/ravens-flight-bw.webp",
  "/assets/webp/scroll100/1440x1440/desk-work-bw.webp",
  "/assets/webp/scroll100/1440x1440/warrior-solo-bw.webp",
  "/assets/webp/scroll100/1440x1440/trio-profiles-bw.webp",
  "/assets/webp/scroll100/1440x1440/stone-monuments-bw.webp",
  "/assets/webp/scroll100/1440x1440/tree-mech-bw.webp",
  "/assets/webp/scroll100/1440x1440/portal-arch-bw.webp",
  "/assets/webp/scroll100/1440x1440/forge-building-bw.webp",
  "/assets/webp/scroll100/1440x1440/table-castle-bw.webp",
  "/assets/webp/scroll100/1440x1440/trio-arch-bw.webp",
  "/assets/webp/scroll100/1440x1440/trio-backs-bw.webp",
  "/assets/webp/scroll100/1440x1440/trio-beast-bw.webp",
  "/assets/webp/scroll100/1440x1440/trio-wings-bw.webp",
  "/assets/webp/scroll100/1440x1440/trio-mountain-bw.webp",
  "/assets/webp/scroll100/1440x1440/trio-orb-bw.webp",
  "/assets/webp/scroll100/1440x1440/trio-portal-bw.webp",
  "/assets/webp/scroll100/1440x1440/trio-weapons-bw.webp",
  "/assets/webp/scroll100/1440x1440/trio-warriors-bw.webp",
  "/assets/webp/scroll100/1440x1440/warriors-triangle-bw.webp",
  "/assets/webp/scroll100/1440x1440/warriors-confident-bw.webp",
  "/assets/webp/scroll100/1440x1440/warriors-forward-bw.webp",
  "/assets/webp/scroll100/1440x1440/warriors-casual-bw.webp",
  "/assets/webp/scroll100/1440x1440/warriors-orbs-bw.webp",
  "/assets/webp/scroll100/1440x1440/warriors-magic-bw.webp",
  "/assets/webp/scroll100/1440x1440/warriors-white-bw.webp",
  "/assets/webp/scroll100/1440x1440/warriors-ready-bw.webp",
  "/assets/webp/scroll100/1440x1440/warriors-belts-bw.webp",
  "/assets/webp/scroll100/1440x1440/warriors-standing-bw.webp",
  "/assets/webp/scroll100/1440x1440/warriors-masked-bw.webp",
  "/assets/webp/scroll100/1440x1440/warriors-armed-bw.webp",
];

const TW_HERO_IMAGE =
  "https://www.raidguild.org/witch/images/witchcraft-08_0-15-1.png";
const LOUCHI_HERO_IMAGE =
  "https://raw.githubusercontent.com/raid-guild/website/6e5f3ec8eade94ddb05a0eb63146aef4a7d80c65/public/images/neo/sky-citadel.png";
const SUEDE_ASSET_ROOT =
  "https://media.githubusercontent.com/media/raid-guild/brand/8f0b5eecd9fe0c086e138ba33307110e1d902b06/public";

export default function Home() {
  const { brandReign } = useTheme();
  // Calculate current image based on 2-minute intervals
  const getImageForInterval = useCallback(() => {
    const interval = Math.floor(Date.now() / (1000 * 60 * 2)); // 2 minutes
    return HERO_IMAGES[interval % HERO_IMAGES.length];
  }, []);

  const [currentImage, setCurrentImage] = useState<string>(getImageForInterval);
  const heroImage =
    brandReign.id === "louchi"
      ? LOUCHI_HERO_IMAGE
      : brandReign.id === "tw"
        ? TW_HERO_IMAGE
        : `${SUEDE_ASSET_ROOT}${currentImage}`;

  // Update image every minute to catch 2-minute boundaries
  useEffect(() => {
    const checkImage = () => {
      const newImage = getImageForInterval();
      if (newImage !== currentImage) {
        setCurrentImage(newImage);
      }
    };

    const intervalId = setInterval(checkImage, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [currentImage, getImageForInterval]);

  return (
    <div className="container-custom">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-center">
        {/* Left Column - Text Content */}
        <div className="flex flex-col justify-center">
          <h1 className="type-display-lg md:type-display-md mb-4">
            RaidGuild Brand Archive
          </h1>
          <p className="type-body-lg text-foreground/80">
            A living guide to the collective identity work shaped during the
            {` ${brandReign.steward}`} reign. The crossed swords remain the shared
            signal; each era builds a new world around them.
          </p>
        </div>

        {/* Right Column - Image */}
        <div className="flex justify-center lg:justify-end lg:pr-[100px] lg:pt-[20px]">
          <div className="relative w-full lg:max-w-[500px] aspect-[3/4] rounded-lg overflow-hidden">
            {brandReign.id === "ven" ? (
              <ReignHeroMark />
            ) : (
              <Image
                key={heroImage}
                src={heroImage}
                alt={`${brandReign.steward} reign RaidGuild artwork`}
                fill
                className="object-contain"
                priority
              />
            )}
          </div>
        </div>
      </div>

      <BrandReignPanel />

      <div className="max-w-6xl">
        {/* Quick Resources */}
        <section className="mb-16">
          <h2 className="type-heading-lg text-moloch-500 mb-6">
            Quick Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/assets/RaidGuild_brand_guidelines.pdf"
              className="p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                Brand Guidelines (PDF)
              </h3>
              <p className="type-body-sm text-muted-foreground">
                Download the complete brand guidelines document
              </p>
            </Link>

            <Link
              href="https://www.figma.com/design/i12YX9sbqeBXFJvExzA5PM/Raid-Guild-%7C-FINAL-%7C-Brand-%7C-Website-%7C-Archive-%7C-Q4-2025?node-id=1859-175&p=f&t=hEppjEwjbW1ZjeF0-0"
              className="p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                Brand Guidelines (Figma)
              </h3>
              <p className="type-body-sm text-muted-foreground">
                View and use brand assets in Figma
              </p>
            </Link>

            <Link
              href="https://github.com/raid-guild/brand"
              className="p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                GitHub Repository
              </h3>
              <p className="type-body-sm text-muted-foreground">
                Find Tailwind CSS setup and shadcn/ui components
              </p>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Link
              href="/architecture"
              className="p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
            >
              <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                Brand Architecture
              </h3>
              <p className="type-body-sm text-muted-foreground">
                How the shared Guild, historical reigns, and specialized
                practices fit together
              </p>
            </Link>
            <Link
              href="/ai"
              className="p-6 border border-border rounded-lg hover:border-[#2FD09A] hover:bg-muted/50 transition-all group"
            >
              <h3 className="type-heading-sm mb-2 group-hover:text-[#2FD09A] transition-colors">
                AI Practice
              </h3>
              <p className="type-body-sm text-muted-foreground">
                A distinct practice identity endorsed by and operating through
                RaidGuild
              </p>
            </Link>
          </div>
        </section>

        {/* For Designers & Developers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* For Designers */}
          <section>
            <h2 className="type-heading-lg text-moloch-500 mb-6">
              For Archers
            </h2>
            <p className="text-body-base text-muted-foreground mb-6">
              Find all the brand assets, logos, colors, and typography you need
              for your designs.
            </p>
            <div className="space-y-4">
              <Link
                href="/logos"
                target="topw"
                className="block p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                  Logos
                </h3>
                <p className="type-body-sm text-muted-foreground">
                  Primary logos, logomarks, and variations in multiple formats
                </p>
              </Link>

              <Link
                href="/colors"
                target="topw"
                className="block p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                  Colors
                </h3>
                <p className="type-body-sm text-muted-foreground">
                  Complete color palette with Moloch and Scroll color scales
                </p>
              </Link>

              <Link
                href="/typography"
                target="topw"
                className="block p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                  Typography
                </h3>
                <p className="type-body-sm text-muted-foreground">
                  Font families, styles, and typography scale
                </p>
              </Link>

              <Link
                href="/illustrations"
                target="topw"
                className="block p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                  Illustrations
                </h3>
                <p className="type-body-sm text-muted-foreground">
                  Technology-forward line art library echoing cyberpunk and D&D
                  heroism
                </p>
              </Link>

              <Link
                href="/iconography"
                target="topw"
                className="block p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                  Iconography
                </h3>
                <p className="type-body-sm text-muted-foreground">
                  Magical mystical symbols paired with practical development and
                  community icons
                </p>
              </Link>
            </div>
          </section>

          {/* For Developers */}
          <section>
            <h2 className="type-heading-lg text-moloch-500 mb-6">
              For Warriors
            </h2>
            <p className="text-body-base text-muted-foreground mb-6">
              Get style guidelines, UI components, and code examples to build
              consistent web applications.
            </p>
            <div className="space-y-4">
              <Link
                href="/ui"
                target="topw"
                className="block p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                  UI Components
                </h3>
                <p className="type-body-sm text-muted-foreground">
                  Interactive component examples with documentation and usage
                  guidelines
                </p>
              </Link>

              <Link
                href="/colors"
                target="topw"
                className="block p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                  Color Tokens
                </h3>
                <p className="type-body-sm text-muted-foreground">
                  CSS variables and Tailwind classes for all brand colors
                </p>
              </Link>

              <Link
                href="/typography"
                target="topw"
                className="block p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              >
                <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                  Typography Classes
                </h3>
                <p className="type-body-sm text-muted-foreground">
                  Ready-to-use typography utility classes for your components
                </p>
              </Link>
            </div>
          </section>
        </div>

        {/* For Agents */}
        <section className="mb-16">
          <h2 className="type-heading-lg text-moloch-500 mb-6">
            For Agents
          </h2>
          <p className="text-body-base text-muted-foreground mb-6">
            Give an AI agent everything it needs to build with the RaidGuild
            brand — a markdown manifest for context, structured JSON for
            programmatic use, and a paid API for the complete guidelines
            package.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="https://github.com/raid-guild/brand/blob/main/BRAND-ASSETS.md"
              className="p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                Agent Manifest (Markdown)
              </h3>
              <p className="type-body-sm text-muted-foreground">
                One file that teaches an AI agent the whole brand — guidelines,
                assets, and download URLs. Drop it into your agent&apos;s
                context.
              </p>
            </Link>

            <Link
              href="/brand-assets.json"
              className="p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                brand-assets.json
              </h3>
              <p className="type-body-sm text-muted-foreground">
                The same inventory, machine-readable. Served live for
                programmatic use.
              </p>
            </Link>

            <Link
              href="/.well-known/agents.json"
              className="p-6 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="type-heading-sm mb-2 group-hover:text-primary transition-colors">
                Paid Guidelines API (x402)
              </h3>
              <p className="type-body-sm text-muted-foreground">
                The complete guidelines package via x402 micropayment.
                Discovery is public; the full payload requires payment.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
