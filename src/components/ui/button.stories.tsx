import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./button";

const meta = {
  title: "Primitives/Button",
  component: Button,
  tags: ["stable"],
  args: { children: "Start a project" },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost", "moloch"] },
    size: { control: "select", options: ["default", "sm", "lg", "icon"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const WithIcons: Story = {
  args: { leftIcon: <Sparkles />, rightIcon: <ArrowRight /> },
};
export const Disabled: Story = { args: { disabled: true } };
export const VariantMatrix: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["primary", "secondary", "ghost", "moloch"] as const).map((variant) => (
        <Button key={variant} variant={variant}>{variant}</Button>
      ))}
    </div>
  ),
};
