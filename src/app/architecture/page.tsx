import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BRAND_ARCHITECTURE } from "@/lib/brand-architecture";

export const metadata: Metadata = {
  title: "Brand Architecture — RaidGuild Brand Archive",
  description:
    "How RaidGuild's shared identity, steward reigns, and specialized practices fit together.",
};

export default function BrandArchitecturePage() {
  const { center, operatingLayer, practices, axes, endorsement } =
    BRAND_ARCHITECTURE;

  return (
    <div className="container-custom py-12 md:py-20">
      <header className="mb-16 max-w-4xl">
        <p className="type-code-sm mb-4 text-primary">Brand Architecture</p>
        <h1 className="type-display-md mb-6">One guild. Many fronts.</h1>
        <p className="type-body-lg max-w-3xl text-foreground/80">
          RaidGuild is the center of gravity: a builder-owned network where new
          capabilities are explored, assembled, and carried into the world.
          Specialized practices can develop distinct voices without obscuring
          the shared community and operating structure behind them.
        </p>
      </header>

      <section className="mb-20" aria-labelledby="system-heading">
        <h2 id="system-heading" className="type-heading-lg mb-8 text-primary">
          The system
        </h2>
        <div className="grid gap-5 lg:grid-cols-3">
          <Card className="border-primary lg:col-span-3">
            <CardHeader>
              <p className="type-code-sm text-primary">Shared identity</p>
              <CardTitle className="type-heading-lg">{center.name}</CardTitle>
              <CardDescription className="type-body-md max-w-3xl">
                {center.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href={center.publicHome}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 type-body-md text-primary hover:underline"
              >
                Visit RaidGuild.org <ArrowUpRight className="size-4" />
              </Link>
            </CardContent>
          </Card>

          <div className="hidden h-10 items-center justify-center lg:flex" aria-hidden="true">
            <span className="h-full w-px bg-border" />
          </div>
          <div className="hidden h-10 items-center justify-center lg:flex" aria-hidden="true">
            <span className="h-full w-px bg-border" />
          </div>
          <div className="hidden h-10 items-center justify-center lg:flex" aria-hidden="true">
            <span className="h-full w-px bg-border" />
          </div>

          <Card>
            <CardHeader>
              <p className="type-code-sm text-primary">Community layer</p>
              <CardTitle className="type-heading-md">Builder pool</CardTitle>
            </CardHeader>
            <CardContent className="type-body-md text-muted-foreground">
              People, relationships, knowledge, experimentation, and the Guild&apos;s
              shared reputation. This is the soul and renewable source of every
              practice.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <p className="type-code-sm text-primary">Operating layer</p>
              <CardTitle className="type-heading-md">{operatingLayer.name}</CardTitle>
            </CardHeader>
            <CardContent className="type-body-md text-muted-foreground">
              {operatingLayer.description}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <p className="type-code-sm text-primary">Market layer</p>
              <CardTitle className="type-heading-md">Practices / spears</CardTitle>
            </CardHeader>
            <CardContent className="type-body-md text-muted-foreground">
              {practices.description}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-20" aria-labelledby="axes-heading">
        <h2 id="axes-heading" className="type-heading-lg mb-3 text-primary">
          Two axes, two different jobs
        </h2>
        <p className="type-body-md mb-8 max-w-3xl text-muted-foreground">
          History and specialization should be visible, but they should not be
          presented as the same kind of variation.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <CardHeader>
              <p className="type-code-sm text-primary">Time · {axes.reign.question}</p>
              <CardTitle className="type-heading-md">Steward reigns</CardTitle>
            </CardHeader>
            <CardContent className="type-body-md text-muted-foreground">
              {axes.reign.description}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <p className="type-code-sm text-primary">
                Focus · {axes.practice.question}
              </p>
              <CardTitle className="type-heading-md">Practice identities</CardTitle>
            </CardHeader>
            <CardContent className="type-body-md text-muted-foreground">
              {axes.practice.description}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16 grid gap-8 lg:grid-cols-[1fr_1.4fr]" aria-labelledby="endorsement-heading">
        <div>
          <p className="type-code-sm mb-3 text-primary">Shared signal</p>
          <h2 id="endorsement-heading" className="type-heading-lg mb-4">
            Difference with provenance
          </h2>
          <p className="type-body-lg text-foreground/80">
            A distinct practice identity is a feature when its relationship to
            RaidGuild is unmistakable. Coherence comes from endorsement and
            operating truth, not from forcing every practice into one skin.
          </p>
        </div>
        <Card className="bg-muted/40">
          <CardHeader>
            <p className="type-code-sm text-primary">Recommended endorsement</p>
            <CardTitle className="type-heading-md">{endorsement.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 type-body-md text-muted-foreground">
              {endorsement.rules.map((rule) => (
                <li key={rule} className="flex gap-3">
                  <span className="text-primary" aria-hidden="true">✦</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <aside className="border-l-2 border-primary pl-6 max-w-3xl">
        <p className="type-heading-sm mb-2">A model designed to stay open</p>
        <p className="type-body-md text-muted-foreground">
          AI and Web3 are current expressions, not a permanent limit. Robotics,
          games, biohacking, or another field may coalesce into the next
          practice when builders develop the expertise, ownership, and demand
          to lead it.
        </p>
      </aside>
    </div>
  );
}

