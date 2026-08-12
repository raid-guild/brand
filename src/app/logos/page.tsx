"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/lib/theme-context";

export default function LogosPage() {
  const { brandReign } = useTheme();
  const trackColors = [
    { name: "Canon", value: "#060609" },
    ...brandReign.palette.slice(0, 4).map((color) => ({
      name: color.name,
      value: color.value,
    })),
  ];

  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="type-display-lg mb-6">Logos</h1>
          <p className="text-lg mb-8 text-foreground/80">
            The crossed swords are RaidGuild&apos;s canonical identifier. Everything
            around the mark—including its drawing, lockup, typography, color,
            and world—may evolve during a stewarded reign. Those expressions
            are collective work, even when an era is named for its steward.
          </p>

          <section className="mb-12 rounded-lg border border-border bg-card p-6 text-card-foreground">
            <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-center">
              <div className="flex min-h-72 items-center justify-center rounded-lg bg-white p-10">
                <Image
                  src="/assets/logos/symbol-black.svg"
                  alt="Canonical black RaidGuild crossed swords"
                  width={180}
                  height={168}
                  priority
                />
              </div>
              <div>
                <p className="type-label-sm mb-3 text-primary">Durable identity</p>
                <h2 className="type-heading-lg mb-4">Crossed Swords, Black</h2>
                <p className="type-body-md text-muted-foreground">
                  Use the black crossed swords as the master mark and the default
                  reference for reproduction. Track-specific colors are welcome
                  when context benefits from differentiation. Preserve recognition
                  and document deliberate geometry changes as a new mark version.
                </p>
                <div className="mt-6 flex flex-wrap gap-4" aria-label={`${brandReign.steward} track color examples`}>
                  {trackColors.map((color) => (
                    <div key={`${color.name}-${color.value}`} className="text-center">
                      <div className="flex size-16 items-center justify-center rounded-full border border-border bg-white">
                        <span
                          className="block size-9"
                          style={{
                            backgroundColor: color.value,
                            mask: "url('/assets/logos/symbol-black.svg') center / contain no-repeat",
                            WebkitMask: "url('/assets/logos/symbol-black.svg') center / contain no-repeat",
                          }}
                          aria-hidden
                        />
                      </div>
                      <span className="mt-2 block type-label-sm text-muted-foreground">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-12">
            <p className="text-base mb-3 font-medium">
              Download all logo files:
            </p>
            <Link
              href="https://github.com/raid-guild/brand/tree/main/public/assets/logos"
              className="text-lg text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="type-heading-lg mb-6">Suede-Era Logotype Archive</h2>
            <p className="text-base mb-6 text-foreground/70">
              These preserved lockups combine the swords with the Suede-era
              &quot;Raid Guild&quot; wordmark. They remain available for historical
              continuity but are not more canonical than the standalone swords.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Floating Logos */}
              <div>
                <h3 className="type-heading-sm mb-4">Floating</h3>
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden border border-border bg-white p-6">
                    <Image
                      src="/assets/logos/full-m800.svg"
                      alt="Raid Guild Full Logo - Moloch 800"
                      width={632}
                      height={166}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-border bg-white p-6">
                    <Image
                      src="/assets/logos/full-m500.svg"
                      alt="Raid Guild Full Logo - Moloch 500"
                      width={632}
                      height={166}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-border bg-white p-6">
                    <Image
                      src="/assets/logos/full-s100.svg"
                      alt="Raid Guild Full Logo - Scroll 100"
                      width={632}
                      height={166}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Background Logos */}
              <div>
                <h3 className="type-heading-sm mb-4">With Background</h3>
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden border border-border">
                    <Image
                      src="/assets/logos/full-m500-m800.svg"
                      alt="Raid Guild Full Logo - M500 on M800"
                      width={598}
                      height={335}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-border">
                    <Image
                      src="/assets/logos/full-m800-m500.svg"
                      alt="Raid Guild Full Logo - M800 on M500"
                      width={598}
                      height={335}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-border">
                    <Image
                      src="/assets/logos/full-s100-s700.svg"
                      alt="Raid Guild Full Logo - S100 on S700"
                      width={598}
                      height={335}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-border">
                    <Image
                      src="/assets/logos/full-m800-s100.svg"
                      alt="Raid Guild Full Logo - M800 on S100"
                      width={598}
                      height={335}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="type-heading-lg mb-6">Logomark</h2>
            <p className="text-base mb-6 text-foreground/70">
              The crossed sword logomark can be used independently when space is
              limited or when the full logotype is not appropriate.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Floating Logos */}
              <div>
                <h3 className="type-heading-sm mb-4">Floating</h3>
                <div className="flex flex-col items-start gap-4">
                  <div className="rounded-lg overflow-hidden border border-border bg-white p-8 inline-flex items-center justify-center">
                    <Image
                      src="/assets/logos/symbol-m800.svg"
                      alt="Raid Guild Symbol - Moloch 800"
                      width={112}
                      height={105}
                      className="h-auto"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-border bg-white p-8 inline-flex items-center justify-center">
                    <Image
                      src="/assets/logos/symbol-m500.svg"
                      alt="Raid Guild Symbol - Moloch 500"
                      width={112}
                      height={105}
                      className="h-auto"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-border bg-white p-8 inline-flex items-center justify-center">
                    <Image
                      src="/assets/logos/symbol-s700.svg"
                      alt="Raid Guild Symbol - Scroll 700"
                      width={112}
                      height={105}
                      className="h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Background Logos */}
              <div>
                <h3 className="type-heading-sm mb-4">With Background</h3>
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden border border-border inline-flex items-center justify-center">
                    <Image
                      src="/assets/logos/symbol-m500-m800.svg"
                      alt="Raid Guild Symbol - M500 on M800"
                      width={300}
                      height={300}
                      className="h-auto"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-border inline-flex items-center justify-center">
                    <Image
                      src="/assets/logos/symbol-m800-m500.svg"
                      alt="Raid Guild Symbol - M800 on M500"
                      width={300}
                      height={300}
                      className="h-auto"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-border inline-flex items-center justify-center">
                    <Image
                      src="/assets/logos/symbol-s100-s700.svg"
                      alt="Raid Guild Symbol - S100 on S700"
                      width={300}
                      height={300}
                      className="h-auto"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-border inline-flex items-center justify-center">
                    <Image
                      src="/assets/logos/symbol-m800-s100.svg"
                      alt="Raid Guild Symbol - M800 on S100"
                      width={300}
                      height={300}
                      className="h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="type-heading-lg mb-6">Cohort</h2>
            <p className="text-base mb-6 text-foreground/70">
              A logo variant for the Cohort program, used on the
              raidguild.org/join page.
            </p>
            <div>
              <h3 className="type-heading-sm mb-4">Floating</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden border border-border bg-white p-6">
                  <Image
                    src="/assets/logos/cohort/cohort-m800.svg"
                    alt="Raid Guild Cohort Logo - Moloch 800"
                    width={589}
                    height={166}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-lg overflow-hidden border border-border bg-white p-6">
                  <Image
                    src="/assets/logos/cohort/cohort-m500.svg"
                    alt="Raid Guild Cohort Logo - Moloch 500"
                    width={589}
                    height={166}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-lg overflow-hidden border border-border bg-white p-6">
                  <Image
                    src="/assets/logos/cohort/cohort-s100.svg"
                    alt="Raid Guild Cohort Logo - Scroll 100"
                    width={589}
                    height={166}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-lg overflow-hidden border border-border bg-white p-6">
                  <Image
                    src="/assets/logos/cohort/cohort-s700.svg"
                    alt="Raid Guild Cohort Logo - Scroll 700"
                    width={589}
                    height={166}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
