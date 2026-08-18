import type { Meta, StoryObj } from "@storybook/nextjs-vite";

function TypographySpecimen() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <p className="type-label text-primary">Display</p>
        <p className="type-display-lg">Venture Beyond</p>
        <p className="type-display-md">Build at the frontier</p>
        <p className="type-display-sm">Many hands, one Guild</p>
      </div>
      <div className="space-y-2">
        <p className="type-label text-primary">Headings</p>
        <p className="type-heading-lg">Shared craft and reputation</p>
        <p className="type-heading-md">Specialized practices</p>
        <p className="type-heading-sm">Operating through RaidGuild LLC</p>
      </div>
      <div className="max-w-3xl space-y-4">
        <p className="type-label text-primary">Body</p>
        <p className="type-body-lg">
          RaidGuild is a builder-owned collective whose identity evolves through
          named steward reigns.
        </p>
        <p className="type-body-md">
          Practices can develop distinct expressions while retaining clear
          provenance and a route back to the Guild.
        </p>
        <p className="type-body-sm text-muted-foreground">
          A reign answers when. A practice answers where and for what.
        </p>
      </div>
      <div className="space-y-2">
        <p className="type-label">Field note 018</p>
        <code className="type-code-md block">data-brand-reign=&quot;louchi&quot;</code>
      </div>
    </div>
  );
}

const meta = {
  title: "Foundations/Typography",
  component: TypographySpecimen,
} satisfies Meta<typeof TypographySpecimen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
