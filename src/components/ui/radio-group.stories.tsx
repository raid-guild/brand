import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";

const meta = {
  title: "Primitives/Radio Group",
  component: RadioGroup,
  tags: ["stable"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="collective" aria-label="Organization model">
      {[
        ["collective", "Builder-owned collective"],
        ["practice", "Specialized practice"],
        ["llc", "Operating entity"],
      ].map(([value, label]) => (
        <div key={value} className="flex items-center gap-2">
          <RadioGroupItem id={`model-${value}`} value={value} />
          <Label htmlFor={`model-${value}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

export const Disabled: Story = { ...Default, args: { disabled: true } };
