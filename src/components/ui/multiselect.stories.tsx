import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MultiselectExample } from "@/components/examples/MultiselectExample";

const meta = { title: "Experimental/Multiselect", component: MultiselectExample, tags: ["experimental"], parameters: { a11y: { test: "todo" } } } satisfies Meta<typeof MultiselectExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
