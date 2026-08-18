import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta = {
  title: "Primitives/Checkbox",
  component: Checkbox,
  tags: ["stable"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} id="operating-disclosure" />
      <Label htmlFor="operating-disclosure">Show operating disclosure</Label>
    </div>
  ),
};
export const Checked: Story = { ...Default, args: { defaultChecked: true } };
export const Disabled: Story = { ...Default, args: { disabled: true } };
