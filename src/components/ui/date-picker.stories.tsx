import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DatePickerExample } from "@/components/examples/DatePickerExample";

const meta = { title: "Experimental/Date Picker", component: DatePickerExample, tags: ["experimental"], parameters: { a11y: { test: "todo" } } } satisfies Meta<typeof DatePickerExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
