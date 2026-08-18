import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Kbd } from "./kbd";

const meta = {
  title: "Primitives/Keyboard Key",
  component: Kbd,
  tags: ["stable"],
  args: { children: "⌘ K" },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Shortcut: Story = {
  render: () => <span className="type-body-sm">Open the command palette with <Kbd>⌘</Kbd> <Kbd>K</Kbd></span>,
};
