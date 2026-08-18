import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TooltipExample } from "@/components/examples/TooltipExample";

const meta = { title: "Overlays/Tooltip", component: TooltipExample, tags: ["stable"] } satisfies Meta<typeof TooltipExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
