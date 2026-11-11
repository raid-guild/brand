import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Bookmark } from "lucide-react";
import { Toggle } from "./toggle";

const meta = {
  title: "Primitives/Toggle",
  component: Toggle,
  tags: ["stable"],
  args: { children: <><Bookmark className="size-4" /> Save reference</> },
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["default", "sm", "lg"] },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Pressed: Story = {
  args: { defaultPressed: true },
  parameters: { a11y: { test: "todo" } },
};
export const Outline: Story = { args: { variant: "outline" } };
export const Disabled: Story = { args: { disabled: true } };
