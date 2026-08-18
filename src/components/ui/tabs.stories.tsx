import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TabsExample } from "@/components/examples/TabsExample";

const meta = { title: "Navigation/Tabs", component: TabsExample, tags: ["stable"] } satisfies Meta<typeof TabsExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
