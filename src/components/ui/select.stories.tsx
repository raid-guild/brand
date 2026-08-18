import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

function ReignSelect({ disabled = false }: { disabled?: boolean }) {
  return (
    <Select defaultValue="louchi" disabled={disabled}>
      <SelectTrigger aria-label="Brand reign" className="w-64">
        <SelectValue placeholder="Select a reign" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="louchi">Louchi — Latest</SelectItem>
        <SelectItem value="suede">Suede — Archived</SelectItem>
        <SelectItem value="tw">TW — Archived</SelectItem>
        <SelectItem value="ven">Ven — Reconstructed</SelectItem>
      </SelectContent>
    </Select>
  );
}

const meta = {
  title: "Primitives/Select",
  component: ReignSelect,
  tags: ["stable"],
} satisfies Meta<typeof ReignSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = {
  parameters: { a11y: { test: "todo" } },
  render: () => (
    <Select defaultValue="louchi" defaultOpen>
      <SelectTrigger aria-label="Brand reign" className="w-64">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="louchi">Louchi — Latest</SelectItem>
        <SelectItem value="suede">Suede — Archived</SelectItem>
        <SelectItem value="tw">TW — Archived</SelectItem>
        <SelectItem value="ven">Ven — Reconstructed</SelectItem>
      </SelectContent>
    </Select>
  ),
};
export const Disabled: Story = { args: { disabled: true } };
