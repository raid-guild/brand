import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AccordionExample } from "@/components/examples/AccordionExample";

const meta = { title: "Data Display/Accordion", component: AccordionExample, tags: ["stable"] } satisfies Meta<typeof AccordionExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
