import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { DatePicker } from "./date-picker";

const august18 = new Date(2026, 7, 18);

function MilestoneDatePicker({
  initialDate,
  disabled = false,
}: {
  initialDate?: Date;
  disabled?: boolean;
}) {
  const [date, setDate] = useState<Date | undefined>(initialDate);

  return (
    <DatePicker
      selected={date}
      onSelect={setDate}
      placeholder="Choose a milestone date"
      disabled={disabled}
    />
  );
}

const meta = {
  title: "Experimental/Date Picker",
  component: MilestoneDatePicker,
  tags: ["experimental"],
  parameters: { a11y: { test: "todo" } },
} satisfies Meta<typeof MilestoneDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { initialDate: august18 },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Interaction: Story = {
  args: { initialDate: august18 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "August 18th, 2026" }),
    );

    const screen = within(canvasElement.ownerDocument.body);
    await userEvent.click(
      screen.getByRole("button", { name: /August 20(?:th)?, 2026/ }),
    );

    await waitFor(() =>
      expect(
        canvas.getByRole("button", { name: "August 20th, 2026" }),
      ).toBeVisible(),
    );
    await waitFor(() =>
      expect(
        screen.queryByRole("button", { name: /August 21(?:st)?, 2026/ }),
      ).not.toBeInTheDocument(),
    );
  },
};
