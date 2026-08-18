import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HoverCardExample } from "@/components/examples/HoverCardExample";

const meta = { title: "Overlays/Hover Card", component: HoverCardExample, tags: ["stable"] } satisfies Meta<typeof HoverCardExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
