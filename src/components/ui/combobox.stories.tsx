import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ComboboxExample } from "@/components/examples/ComboboxExample";

const meta = { title: "Experimental/Combobox", component: ComboboxExample, tags: ["experimental"], parameters: { a11y: { test: "todo" } } } satisfies Meta<typeof ComboboxExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
