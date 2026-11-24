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

// Base families remain variable; the Extended aliases match the website's fixed
// 125% width and 105.4% size-adjust. Use explicit families so archived reign
// utility aliases cannot silently substitute Mazius in this current specimen.
export const VentureBeyondAxes: Story = {
  render: () => (
    <div data-brand-reign="louchi" className="max-w-5xl space-y-10 p-6">
      <div>
        <p className="type-label mb-3">Current paired heading · 900 / 125%</p>
        <h1 className="uppercase" style={{ fontFamily: '"Venture Beyond Retalic Extended", sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, fontStretch: '125%', fontStyle: 'normal', fontSynthesis: 'none', letterSpacing: 0, lineHeight: 1 }}>
          Venture Beyond
          <span className="block" style={{ fontFamily: '"Venture Beyond Extended", sans-serif', fontStyle: 'italic' }}>Together</span>
        </h1>
      </div>
      {[62.5, 100, 125].map((width) => (
        <div key={width}>
          <p className="type-label mb-2">Base variable family · width {width}%</p>
          {[400, 700, 900].map((weight) => (
            <p key={weight} style={{ fontFamily: '"Venture Beyond", sans-serif', fontSize: 'clamp(1.25rem, 2vw, 1.5rem)', fontWeight: weight, fontStretch: `${width}%`, fontSynthesis: 'none', lineHeight: 1.15 }}>
              {weight} — Guild at the frontier
            </p>
          ))}
        </div>
      ))}
    </div>
  ),
};
