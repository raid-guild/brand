import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BreadcrumbExample } from "@/components/examples/BreadcrumbExample";

const meta = { title: "Navigation/Breadcrumb", component: BreadcrumbExample, tags: ["stable"] } satisfies Meta<typeof BreadcrumbExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
