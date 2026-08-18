import { useState } from "react";
import { format } from "date-fns";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Calendar } from "./calendar";

const august2026 = new Date(2026, 7, 1);
const august18 = new Date(2026, 7, 18);

function DeliveryCalendar({
  initialDate,
}: {
  initialDate?: Date;
}) {
  const [date, setDate] = useState<Date | undefined>(initialDate);

  return (
    <div className="space-y-3">
      <Calendar
        mode="single"
        defaultMonth={august2026}
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <p aria-live="polite" className="type-code-sm text-muted-foreground">
        {date ? `Selected ${format(date, "MMMM d, yyyy")}` : "No date selected"}
      </p>
    </div>
  );
}

const meta = {
  title: "Experimental/Calendar",
  component: DeliveryCalendar,
  tags: ["experimental"],
  parameters: { a11y: { test: "todo" } },
} satisfies Meta<typeof DeliveryCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { initialDate: august18 },
};

export const Range: Story = {
  render: () => (
    <Calendar
      mode="range"
      defaultMonth={august2026}
      selected={{ from: august18, to: new Date(2026, 7, 22) }}
      className="rounded-md border"
    />
  ),
};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: /August 20(?:th)?, 2026/ }),
    );
    await waitFor(() =>
      expect(canvas.getByText("Selected August 20, 2026")).toBeVisible(),
    );

    await userEvent.click(
      canvas.getByRole("button", { name: /next month/i }),
    );
    await expect(canvas.getByText("September 2026")).toBeVisible();
  },
};
