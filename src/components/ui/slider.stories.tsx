import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Slider } from "./slider";

const meta = {
  title: "Primitives/Slider",
  component: Slider,
  tags: ["stable"],
  args: {
    "aria-label": "Signal intensity",
    className: "max-w-md",
    defaultValue: [60],
    max: 100,
    step: 10,
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const LowSignal: Story = { args: { defaultValue: [20] } };
export const Disabled: Story = { args: { disabled: true } };
