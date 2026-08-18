import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DropdownMenuExample } from "@/components/examples/DropdownMenuExample";

const meta = { title: "Navigation/Dropdown Menu", component: DropdownMenuExample, tags: ["stable"] } satisfies Meta<typeof DropdownMenuExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
