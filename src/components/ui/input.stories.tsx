import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from "./label";
import { Input } from "./input";

const meta = {
  title: "Primitives/Input",
  component: Input,
  tags: ["stable"],
  args: { placeholder: "name@raidguild.org", type: "email" },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLabel: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Label htmlFor="storybook-email">Guild email</Label>
      <Input {...args} id="storybook-email" />
    </div>
  ),
};
export const Disabled: Story = { args: { disabled: true, defaultValue: "Unavailable" } };
export const Invalid: Story = { args: { "aria-invalid": true, defaultValue: "not-an-email" } };
