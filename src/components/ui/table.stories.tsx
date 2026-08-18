import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TableExample } from "@/components/examples/TableExample";

const meta = { title: "Data Display/Table", component: TableExample, tags: ["stable"] } satisfies Meta<typeof TableExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
