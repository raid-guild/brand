import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from "./label";
import { Textarea } from "./textarea";

const meta = {
  title: "Primitives/Textarea",
  component: Textarea,
  tags: ["stable"],
  args: { placeholder: "Describe the territory you want to explore…" },
  decorators: [(Story) => <div className="max-w-lg"><Story /></div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLabel: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Label htmlFor="storybook-brief">Project brief</Label>
      <Textarea {...args} id="storybook-brief" />
    </div>
  ),
};
export const Disabled: Story = { args: { disabled: true } };
