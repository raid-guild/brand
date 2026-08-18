import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProgressBar } from "./progress";

const meta = {
  title: "Primitives/Progress",
  component: ProgressBar,
  tags: ["stable"],
  args: {
    "aria-label": "Implementation progress",
    className: "max-w-lg",
    value: 64,
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { value: 0 } };
export const Complete: Story = { args: { value: 100 } };
