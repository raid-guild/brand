import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";

const meta = {
  title: "Primitives/Badge",
  component: Badge,
  tags: ["stable"],
  args: { children: "A RaidGuild practice" },
  parameters: { a11y: { test: "todo" } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["default", "secondary", "destructive", "outline", "moloch", "scroll"] as const).map((variant) => (
        <Badge key={variant} variant={variant}>{variant}</Badge>
      ))}
    </div>
  ),
};
