import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BRAND_REIGNS } from "@/lib/brand-reigns";

function BrandTokens() {
  return (
    <div className="space-y-10">
      <header className="max-w-3xl space-y-3">
        <p className="type-label text-primary">Generated foundation</p>
        <h1 className="type-display-sm">Brand Tokens</h1>
        <p className="type-body-lg text-muted-foreground">
          Change the reign and appearance toolbar controls to verify semantic
          tokens without reloading the workshop.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Background", "bg-background text-foreground"],
          ["Primary", "bg-primary text-primary-foreground"],
          ["Secondary", "bg-secondary text-secondary-foreground"],
          ["Muted", "bg-muted text-muted-foreground"],
          ["Accent", "bg-accent text-accent-foreground"],
          ["Card", "bg-card text-card-foreground"],
          ["Popover", "bg-popover text-popover-foreground"],
          ["Destructive", "bg-destructive text-foreground"],
        ].map(([label, className]) => (
          <div key={label} className={`rounded-lg border border-border p-5 ${className}`}>
            <p className="type-label-sm">{label}</p>
            <p className="type-body-sm mt-8">Semantic surface</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="type-heading-md">Reign palettes</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {BRAND_REIGNS.map((reign) => (
            <article key={reign.id} className="rounded-lg border border-border bg-card p-5">
              <h3 className="type-heading-sm">{reign.label}</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {reign.palette.map((color) => (
                  <div key={color.name} className="overflow-hidden rounded-md border border-border">
                    <div className="h-16" style={{ backgroundColor: color.value }} />
                    <div className="bg-background p-2 text-foreground">
                      <p className="type-label-sm">{color.name}</p>
                      <code className="type-code-sm">{color.value}</code>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: "Foundations/Brand Tokens",
  component: BrandTokens,
  parameters: { layout: "fullscreen", a11y: { test: "todo" } },
} satisfies Meta<typeof BrandTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SemanticSurfaces: Story = {};

export const ReignAppearanceMatrix: Story = {
  render: () => (
    <div className="grid gap-4 lg:grid-cols-2">
      {BRAND_REIGNS.flatMap((reign) =>
        (["light", "dark"] as const).map((appearance) => (
          <article
            key={`${reign.id}-${appearance}`}
            data-brand-reign={reign.id}
            className={`${appearance} rounded-lg border border-border bg-background p-6 text-foreground`}
          >
            <p className="type-label text-primary">{reign.steward} · {appearance}</p>
            <h2 className="type-heading-md mt-2">Semantic surface</h2>
            <p className="type-body-md mt-3 text-muted-foreground">
              Background, foreground, primary, muted, border, and typography
              resolve together for this visual baseline.
            </p>
            <div className="mt-5 flex gap-3">
              <span className="rounded-md bg-primary px-4 py-2 type-label text-primary-foreground">Primary</span>
              <span className="rounded-md bg-secondary px-4 py-2 type-label text-secondary-foreground">Secondary</span>
            </div>
          </article>
        )),
      )}
    </div>
  ),
};
