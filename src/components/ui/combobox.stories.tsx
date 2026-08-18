import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Combobox } from "./combobox";

const reignOptions = [
  { value: "louchi", label: "Louchi — latest" },
  { value: "suede", label: "Suede — archived" },
  { value: "tw", label: "TW — archived" },
  { value: "ven", label: "Ven — reconstructed" },
];

function ReignCombobox({ initialValue = "" }: { initialValue?: string }) {
  const [value, setValue] = useState(initialValue);

  return (
    <Combobox
      options={reignOptions}
      value={value}
      onValueChange={setValue}
      placeholder="Select a brand reign..."
      emptyText="No reign found."
    />
  );
}

const meta = {
  title: "Experimental/Combobox",
  component: ReignCombobox,
  tags: ["experimental"],
  parameters: { a11y: { test: "todo" } },
} satisfies Meta<typeof ReignCombobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { initialValue: "louchi" },
};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole("combobox");

    await userEvent.click(combobox);
    await expect(combobox).toHaveAttribute("aria-expanded", "true");

    const screen = within(canvasElement.ownerDocument.body);
    const search = screen.getByPlaceholderText("Search option...");
    await userEvent.type(search, "ven");
    await userEvent.click(
      screen.getByRole("option", { name: "Ven — reconstructed" }),
    );

    await waitFor(() => expect(combobox).toHaveTextContent("Ven — reconstructed"));
    await expect(combobox).toHaveAttribute("aria-expanded", "false");
  },
};
