import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CardExample } from "@/components/examples/CardExample";

const meta = { title: "Data Display/Card", component: CardExample, tags: ["stable"] } satisfies Meta<typeof CardExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
