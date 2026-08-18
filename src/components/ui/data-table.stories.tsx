import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DataTableExample } from "@/components/examples/DataTableExample";

const meta = { title: "Experimental/Data Table", component: DataTableExample, tags: ["experimental"], parameters: { a11y: { test: "todo" } } } satisfies Meta<typeof DataTableExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
