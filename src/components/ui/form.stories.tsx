import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormExample } from "@/components/examples/FormExample";

const meta = { title: "Experimental/Form", component: FormExample, tags: ["experimental"], parameters: { a11y: { test: "todo" } } } satisfies Meta<typeof FormExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
