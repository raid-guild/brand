import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MenubarExample } from "@/components/examples/MenubarExample";

const meta = { title: "Navigation/Menubar", component: MenubarExample, tags: ["stable"] } satisfies Meta<typeof MenubarExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
