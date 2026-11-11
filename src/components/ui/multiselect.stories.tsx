import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import MultipleSelector, { type Option } from "./multiselect";

const practiceOptions: Option[] = [
  { value: "product-design", label: "Product design" },
  { value: "protocol-engineering", label: "Protocol engineering" },
  { value: "research", label: "Research" },
  { value: "delivery", label: "Delivery operations" },
];

function PracticeSelector({
  initialValue = [],
  disabled = false,
}: {
  initialValue?: Option[];
  disabled?: boolean;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="w-full max-w-md space-y-3">
      <MultipleSelector
        value={value}
        onChange={setValue}
        defaultOptions={practiceOptions}
        placeholder="Select practice capabilities..."
        disabled={disabled}
        inputProps={{ "aria-label": "Practice capabilities" }}
      />
      <p aria-live="polite" className="type-code-sm text-muted-foreground">
        {value.length} {value.length === 1 ? "capability" : "capabilities"} selected
      </p>
    </div>
  );
}

const meta = {
  title: "Experimental/Multiselect",
  component: PracticeSelector,
  tags: ["experimental"],
  parameters: { a11y: { test: "todo" } },
} satisfies Meta<typeof PracticeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { initialValue: [practiceOptions[0]] },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox", {
      name: "Practice capabilities",
    });

    await userEvent.click(input);
    await userEvent.click(
      canvas.getByRole("option", { name: "Protocol engineering" }),
    );
    await waitFor(() =>
      expect(canvas.getByText("1 capability selected")).toBeVisible(),
    );

    await userEvent.click(
      canvas.getByRole("button", { name: "Remove Protocol engineering" }),
    );
    await waitFor(() =>
      expect(canvas.getByText("0 capabilities selected")).toBeVisible(),
    );
  },
};
