import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavigationMenuExample } from "@/components/examples/NavigationMenuExample";

const meta = { title: "Navigation/Navigation Menu", component: NavigationMenuExample, tags: ["stable"] } satisfies Meta<typeof NavigationMenuExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
