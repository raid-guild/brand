import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from "./label";
import { Switch } from "./switch";

const meta = {
  title: "Primitives/Switch",
  component: Switch,
  tags: ["stable"],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Switch {...args} id="archive-mode" />
      <Label htmlFor="archive-mode">Include archived reigns</Label>
    </div>
  ),
};
export const Checked: Story = { ...Default, args: { defaultChecked: true } };
export const Disabled: Story = { ...Default, args: { disabled: true } };
