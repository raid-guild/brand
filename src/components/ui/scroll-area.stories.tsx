import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ScrollAreaExample } from "@/components/examples/ScrollAreaExample";

const meta = { title: "Data Display/Scroll Area", component: ScrollAreaExample, tags: ["stable"] } satisfies Meta<typeof ScrollAreaExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
