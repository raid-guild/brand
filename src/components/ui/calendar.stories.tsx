import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CalendarExample } from "@/components/examples/CalendarExample";

const meta = { title: "Experimental/Calendar", component: CalendarExample, tags: ["experimental"], parameters: { a11y: { test: "todo" } } } satisfies Meta<typeof CalendarExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
