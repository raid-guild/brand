import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommandExample } from "@/components/examples/CommandExample";

const meta = { title: "Experimental/Command", component: CommandExample, tags: ["experimental"], parameters: { a11y: { test: "todo" } } } satisfies Meta<typeof CommandExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
