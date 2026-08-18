import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChartExample } from "@/components/examples/ChartExample";

const meta = { title: "Experimental/Chart", component: ChartExample, tags: ["experimental"], parameters: { a11y: { test: "todo" } } } satisfies Meta<typeof ChartExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
