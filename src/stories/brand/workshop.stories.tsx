import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BRAND_SYSTEM } from "@raidguild/brand-system";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@raidguild/brand-system/components";
import { ArrowRight, BookOpen, Boxes, Braces, Compass, TestTube2 } from "lucide-react";

type WorkshopProps = {
  reignId?: string;
  appearance?: string;
};

const workshopLinks = [
  {
    title: "Brand Tokens",
    description: "Inspect semantic surfaces and the complete reign matrix.",
    href: "/?path=/story/foundations-brand-tokens--semantic-surfaces",
    icon: Braces,
  },
  {
    title: "Typography",
    description: "Review display, body, label, and code specimens.",
    href: "/?path=/story/foundations-typography--scale",
    icon: BookOpen,
  },
  {
    title: "Components",
    description: "Start with the stable Button API and its variants.",
    href: "/?path=/story/primitives-button--default",
    icon: Boxes,
  },
  {
    title: "Hero Discovery",
    description: "Exercise Louchi's layered day/night wayfinding pattern.",
    href: "/?path=/story/brand-hero-discovery--default",
    icon: Compass,
  },
  {
    title: "Interaction Tests",
    description: "Run through a validated Form submission contract.",
    href: "/?path=/story/experimental-form--interaction",
    icon: TestTube2,
  },
] as const;

function Workshop({
  reignId = BRAND_SYSTEM.defaultReign,
  appearance = "light",
}: WorkshopProps) {
  const reign =
    BRAND_SYSTEM.reigns.find((candidate) => candidate.id === reignId) ??
    BRAND_SYSTEM.reigns[0];

  return (
    <div className="mx-auto max-w-6xl space-y-12">
      <header className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-4xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Badge variant="outline">Component Workshop</Badge>
            <Badge variant="secondary">{reign.label}</Badge>
            <Badge variant="secondary">{appearance}</Badge>
          </div>
          <h1 className="type-display-md">Build with RaidGuild.</h1>
          <p className="type-body-lg mt-5 max-w-3xl text-muted-foreground">
            Explore isolated component states, accessibility contracts, and the
            visual language of each steward reign. Use the toolbar above to
            switch reign and appearance across the entire workshop.
          </p>
        </div>
        <span
          className="block size-24 bg-foreground"
          style={{
            mask: "url('/assets/logos/symbol-black.svg') center / contain no-repeat",
            WebkitMask:
              "url('/assets/logos/symbol-black.svg') center / contain no-repeat",
          }}
          role="img"
          aria-label="RaidGuild crossed swords"
        />
      </header>

      <section aria-labelledby="current-reign-heading">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="type-label-sm text-foreground">Current workshop context</p>
            <h2 id="current-reign-heading" className="type-heading-lg mt-2">
              {reign.label}
            </h2>
          </div>
          <p className="type-code-sm text-muted-foreground">
            {reign.status} / {appearance}
          </p>
        </div>
        <Card>
          <CardContent className="grid gap-8 p-6 lg:grid-cols-[1fr_1.5fr] lg:p-8">
            <div>
              <p className="type-body-lg">{reign.summary}</p>
              <p className="type-body-md mt-4 text-muted-foreground">
                {reign.direction}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {reign.palette.map((color) => (
                <div
                  key={color.name}
                  className="overflow-hidden rounded-md border border-border"
                >
                  <div
                    className="h-16"
                    style={{ backgroundColor: color.value }}
                  />
                  <div className="bg-background p-3 text-foreground">
                    <p className="type-label-sm">{color.name}</p>
                    <code className="type-code-sm">{color.value}</code>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="start-heading">
        <p className="type-label-sm text-foreground">Start here</p>
        <h2 id="start-heading" className="type-heading-lg mt-2">
          Explore the system
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {workshopLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Card key={link.title}>
                <CardHeader>
                  <Icon className="size-6 text-primary" aria-hidden="true" />
                  <CardTitle className="mt-8">{link.title}</CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="secondary" rightIcon={<ArrowRight />}>
                    <a href={link.href} target="_top">
                      Open {link.title}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border border-primary/20 bg-primary/10 p-6 lg:flex lg:items-center lg:justify-between lg:gap-8">
        <div>
          <h2 className="type-heading-sm">Need identity guidance?</h2>
          <p className="type-body-md mt-2 text-muted-foreground">
            The public guide covers architecture, logos, illustration, and
            reign provenance. This workshop is the executable component contract.
          </p>
        </div>
        <Button asChild className="mt-5 shrink-0 lg:mt-0">
          <a
            href="https://www.brand.raidguild.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Brand Guide
          </a>
        </Button>
      </section>
    </div>
  );
}

const meta = {
  title: "Brand/Workshop",
  component: Workshop,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Workshop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (_args, context) => (
    <Workshop
      reignId={String(context.globals.brandReign ?? BRAND_SYSTEM.defaultReign)}
      appearance={String(context.globals.appearance ?? "light")}
    />
  ),
};
