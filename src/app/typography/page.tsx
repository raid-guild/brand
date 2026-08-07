"use client";

import Link from "next/link";
import { useTheme } from "@/lib/theme-context";

const TYPE_SCALE = [
  { name: "Display Large", className: "type-display-lg", detail: "80px / 110% / -2%" },
  { name: "Display Medium", className: "type-display-md", detail: "60px / 120% / -1%" },
  { name: "Display Small", className: "type-display-sm", detail: "48px / 120% / 0%" },
  { name: "Heading Large", className: "type-heading-lg", detail: "36px / 120% / 0%" },
  { name: "Heading Medium", className: "type-heading-md", detail: "28px / 130% / 0%" },
  { name: "Body Large", className: "type-body-lg", detail: "20px / 140% / 0%" },
] as const;

export default function TypographyPage() {
  const { brandReign } = useTheme();
  const isTw = brandReign.id === "tw";

  const families = isTw
    ? [
        {
          name: "Alchemion",
          className: "font-display",
          sample: "Strange worlds reward the curious.",
          role: "Display and oversized statements",
          description:
            "A theatrical display face used for the TW reign's oversized, kinetic headlines.",
        },
        {
          name: "Fratelli",
          className: "font-body",
          sample: "RaidGuild assembles the right party for the quest.",
          role: "Body and supporting copy",
          description:
            "A compact supporting face that keeps the TW system direct beneath expressive headlines.",
        },
      ]
    : [
        {
          name: "Mazius Display",
          className: "font-display",
          sample: "Venture beyond the familiar.",
          role: "Display, headlines, and brand graphics",
          description:
            brandReign.id === "louchi"
              ? "Used expansively with tight line height and occasional coral italic emphasis to frame speculative-world imagery."
              : "A calligraphic high-contrast serif used for expressive headlines and brand graphics.",
        },
        {
          name: "EB Garamond",
          className: "font-body",
          sample: "Build digital worlds worth inhabiting.",
          role: "Body and supporting copy",
          description:
            "The readable editorial counterweight to Mazius Display across long-form copy and interfaces.",
        },
        {
          name: "Ubuntu Mono",
          className: "font-mono",
          sample: "RG—26.002 / SIGNAL ACTIVE",
          role: "Labels, coordinates, and technical metadata",
          description:
            brandReign.id === "louchi"
              ? "Used heavily for field-note metadata, navigation labels, coordinates, and technical signals."
              : "Used for code, utility labels, and technical content.",
        },
      ];

  const sourceUrl = isTw
    ? "https://www.raidguild.org/witch/fonts/"
    : brandReign.id === "louchi"
      ? "https://github.com/raid-guild/website/tree/feat/venture-beyond-redesign/public/fonts"
      : "https://github.com/raid-guild/brand/tree/main/public/fonts";

  return (
    <div className="container-custom py-16">
      <div className="mx-auto max-w-4xl">
        <p className="type-label-sm mb-3 text-primary">{brandReign.label}</p>
        <h1 className="type-display-lg mb-6">Typography</h1>
        <p className="type-body-lg mb-12 max-w-3xl text-muted-foreground">
          {isTw
            ? "TW pairs theatrical display type with compact supporting copy for an energetic, web-native voice."
            : brandReign.id === "louchi"
              ? "Louchi keeps the Mazius, Garamond, and Ubuntu foundation but shifts the composition: much larger display moments, tighter leading, editorial contrast, and technical field-note details."
              : "Suede established the Mazius, Garamond, and Ubuntu foundation used across the warm Moloch and Scroll system."}
        </p>

        <div className="space-y-16">
          <section>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <h2 className="type-heading-lg">Font Families</h2>
              <Link
                href={sourceUrl}
                className="type-label-md text-primary hover:text-primary/80"
                target="_blank"
                rel="noopener noreferrer"
              >
                View source fonts
              </Link>
            </div>
            <div className="space-y-6">
              {families.map((family) => (
                <article key={family.name} className="rounded-lg border border-border bg-card p-6 text-card-foreground">
                  <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className={`text-3xl text-primary ${family.className}`}>{family.name}</h3>
                    <span className="type-label-sm text-muted-foreground">{family.role}</span>
                  </div>
                  <p className={`text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] ${family.className}`}>
                    {family.sample}
                  </p>
                  <p className="type-body-md mt-6 text-muted-foreground">{family.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="type-heading-lg mb-6">Type Scale</h2>
            <div className="space-y-4">
              {TYPE_SCALE.map((type) => (
                <div key={type.name} className="rounded-lg border border-border bg-card p-6 text-card-foreground">
                  <div className={`${type.className} mb-2`}>{type.name}</div>
                  <p className="type-code-sm text-muted-foreground">Size / line height / letter spacing · {type.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card p-6 text-card-foreground">
            <h2 className="type-heading-md mb-3">Implementation</h2>
            <p className="type-body-md text-muted-foreground">
              Continue using the shared font-display, font-body, and font-mono
              roles plus the type-* utilities. The selected reign remaps the
              families and surrounding composition without changing component
              APIs.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
