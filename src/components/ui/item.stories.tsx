import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ItemExample } from "@/components/examples/ItemExample";

const meta = { title: "Data Display/Item", component: ItemExample, tags: ["stable"] } satisfies Meta<typeof ItemExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
