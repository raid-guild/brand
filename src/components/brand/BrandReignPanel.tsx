"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { BRAND_REIGNS } from "@/lib/brand-reigns";
import { useTheme } from "@/lib/theme-context";

export function BrandReignPanel() {
  const { brandReign } = useTheme();

  return (
    <section className="mb-16 border-y border-border py-8" aria-labelledby="reign-heading">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3 type-label-sm">
            <span className="rounded-full bg-primary px-3 py-1 text-primary-foreground">
              {brandReign.status === "latest" ? "Latest reign" : "Archived reign"}
            </span>
            <span className="text-muted-foreground">Brand steward</span>
          </div>
          <h2 id="reign-heading" className="type-display-sm mb-4">
            {brandReign.steward}
          </h2>
          <p className="type-body-lg max-w-3xl text-muted-foreground">
            {brandReign.summary}
          </p>
          {brandReign.sourceUrl ? (
            <Link
              href={brandReign.sourceUrl}
              className="mt-5 inline-flex items-center gap-2 type-label-md text-primary hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              {brandReign.sourceLabel}
              <ExternalLink className="size-4" aria-hidden />
            </Link>
          ) : null}
        </div>

        <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
          <p className="type-label-sm mb-3 text-primary">Change is a feature</p>
          <p className="type-body-md text-muted-foreground">
            RaidGuild&apos;s identity evolves with its elected brand steward. Each
            reign is preserved as a usable version instead of being erased by
            the next one.
          </p>
          <div className="mt-6 flex flex-wrap gap-2" aria-label="Brand reign archive">
            {BRAND_REIGNS.map((reign) => (
              <span
                key={reign.id}
                className={`rounded-full border px-3 py-1 type-label-sm ${
                  reign.id === brandReign.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground"
                } ${!reign.available ? "opacity-50" : ""}`}
              >
                {reign.steward}
                {!reign.available ? " · pending" : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReignHeroMark() {
  const { brandReign } = useTheme();

  return (
    <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-[var(--reign-deep)] text-[var(--reign-field)]">
      <div className="absolute -right-16 -top-10 size-64 rounded-full border border-current/25" />
      <div className="absolute -right-4 top-12 size-28 rounded-full bg-[var(--reign-highlight)] opacity-90" />
      <div className="absolute -bottom-24 -left-16 size-80 rotate-12 rounded-[45%] bg-[var(--reign-signal)]" />
      <div className="absolute inset-x-8 top-8 flex justify-between type-code-sm tracking-[0.16em]">
        <span>RG / REIGN</span>
        <span>{brandReign.steward.toUpperCase()}</span>
      </div>
      <div className="relative z-10 flex size-48 items-center justify-center rounded-full border border-current/60 bg-[var(--reign-field)]">
        <span
          className="block size-28 bg-[var(--reign-ink)]"
          style={{
            mask: "url('/assets/logos/symbol-black.svg') center / contain no-repeat",
            WebkitMask:
              "url('/assets/logos/symbol-black.svg') center / contain no-repeat",
          }}
          role="img"
          aria-label="RaidGuild crossed swords"
        />
      </div>
      <p className="absolute bottom-8 left-8 right-8 z-10 type-label-sm tracking-[0.14em]">
        THE MARK ENDURES / THE WORLD EVOLVES
      </p>
    </div>
  );
}
