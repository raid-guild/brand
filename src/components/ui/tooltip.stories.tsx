import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

function BrandTooltip({ open = false, side = "top" }: { open?: boolean; side?: "top" | "right" | "bottom" | "left" }) {
  return (
    <div className="grid min-h-32 place-items-center">
      <Tooltip open={open || undefined}>
        <TooltipTrigger asChild><Button variant="secondary">Canonical mark</Button></TooltipTrigger>
        <TooltipContent side={side}>Black crossed-swords master mark</TooltipContent>
      </Tooltip>
    </div>
  );
}

const meta = {
  title: "Overlays/Tooltip",
  component: BrandTooltip,
  tags: ["stable"],
} satisfies Meta<typeof BrandTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { open: true } };
export const Right: Story = { args: { open: true, side: "right" } };
