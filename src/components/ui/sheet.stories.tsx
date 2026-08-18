import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SheetExample } from "@/components/examples/SheetExample";

const meta = { title: "Overlays/Sheet", component: SheetExample, tags: ["stable"] } satisfies Meta<typeof SheetExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
