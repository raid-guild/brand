import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from "./label";

const meta = {
  title: "Primitives/Label",
  component: Label,
  tags: ["stable"],
  args: { children: "Practice name", htmlFor: "practice-name" },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <Label {...args} /> };
export const Error: Story = {
  render: () => <Label data-error="true">Practice name is required</Label>,
  parameters: { a11y: { test: "todo" } },
};
