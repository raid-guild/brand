import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Item } from "./item";

function BrandItem({ variant = "default" }: { variant?: "default" | "compact" | "spacious" }) {
  return (
    <Item variant={variant} className="max-w-md border border-border">
      <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground type-label">RG</span>
      <span><span className="type-heading-sm block">RaidGuild</span><span className="type-body-sm text-muted-foreground">Builder-owned collective</span></span>
    </Item>
  );
}

const meta = {
  title: "Data Display/Item",
  component: BrandItem,
  tags: ["stable"],
} satisfies Meta<typeof BrandItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Compact: Story = { args: { variant: "compact" } };
export const Spacious: Story = { args: { variant: "spacious" } };
