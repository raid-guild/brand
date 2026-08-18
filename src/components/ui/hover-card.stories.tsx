import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

function BrandHoverCard({ open = false }: { open?: boolean }) {
  return (
    <HoverCard open={open || undefined} openDelay={0}>
      <HoverCardTrigger asChild><Button variant="ghost">Louchi reign</Button></HoverCardTrigger>
      <HoverCardContent className="w-80">
        <p className="type-label text-muted-foreground">Latest reign</p>
        <h3 className="type-heading-sm mt-1">Venture Beyond</h3>
        <p className="type-body-sm mt-2 text-muted-foreground">Moebius-influenced speculative worlds with expansive editorial typography.</p>
      </HoverCardContent>
    </HoverCard>
  );
}

const meta = {
  title: "Overlays/Hover Card",
  component: BrandHoverCard,
  tags: ["stable"],
} satisfies Meta<typeof BrandHoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { open: true } };
