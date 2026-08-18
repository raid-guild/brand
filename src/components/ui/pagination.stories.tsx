import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PaginationExample } from "@/components/examples/PaginationExample";

const meta = { title: "Navigation/Pagination", component: PaginationExample, tags: ["stable"] } satisfies Meta<typeof PaginationExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
