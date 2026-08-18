import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SidebarExample } from "@/components/examples/SidebarExample";

const meta = { title: "Experimental/Sidebar", component: SidebarExample, tags: ["experimental"], parameters: { layout: "fullscreen", a11y: { test: "todo" } } } satisfies Meta<typeof SidebarExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
