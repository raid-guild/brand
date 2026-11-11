import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

function ProvenancePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild><Button variant="secondary">View provenance</Button></PopoverTrigger>
      <PopoverContent>
        <p className="type-label text-primary">RaidGuild provenance</p>
        <p className="type-body-sm mt-2 text-muted-foreground">
          A RaidGuild practice, operating through RaidGuild LLC.
        </p>
      </PopoverContent>
    </Popover>
  );
}

const meta = { title: "Overlays/Popover", component: ProvenancePopover, tags: ["stable"] } satisfies Meta<typeof ProvenancePopover>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
