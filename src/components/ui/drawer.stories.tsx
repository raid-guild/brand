import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DrawerExample } from "@/components/examples/DrawerExample";

const meta = { title: "Overlays/Drawer", component: DrawerExample, tags: ["stable"] } satisfies Meta<typeof DrawerExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
