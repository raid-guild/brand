import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "./button";
import { DataTable } from "./data-table";

type Practice = {
  name: string;
  steward: string;
  status: string;
  engagements: number;
};

const practices: Practice[] = [
  { name: "Product", steward: "Mara", status: "Active", engagements: 3 },
  { name: "Protocol", steward: "Oren", status: "Active", engagements: 1 },
  { name: "Research", steward: "Nia", status: "Forming", engagements: 5 },
];

const columns: ColumnDef<Practice>[] = [
  { accessorKey: "name", header: "Practice" },
  { accessorKey: "steward", header: "Steward" },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "engagements",
    header: ({ column }) => {
      const direction = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          size="sm"
          aria-label={`Sort by engagements${direction ? `, ${direction === "asc" ? "ascending" : "descending"}` : ""}`}
          onClick={() => column.toggleSorting(direction === "asc")}
        >
          Engagements
          <ArrowUpDown aria-hidden="true" />
        </Button>
      );
    },
  },
];

function PracticeTable({ data = practices }: { data?: Practice[] }) {
  return <DataTable columns={columns} data={data} />;
}

const meta = {
  title: "Experimental/Data Table",
  component: PracticeTable,
  tags: ["experimental"],
  parameters: { a11y: { test: "todo" } },
} satisfies Meta<typeof PracticeTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { data: [] },
};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sort = canvas.getByRole("button", { name: "Sort by engagements" });

    await userEvent.click(sort);
    let rows = canvas.getAllByRole("row");
    await expect(rows[1]).toHaveTextContent("Protocol");
    await expect(rows[1]).toHaveTextContent("1");

    await userEvent.click(
      canvas.getByRole("button", {
        name: "Sort by engagements, ascending",
      }),
    );
    rows = canvas.getAllByRole("row");
    await expect(rows[1]).toHaveTextContent("Research");
    await expect(rows[1]).toHaveTextContent("5");
  },
};
