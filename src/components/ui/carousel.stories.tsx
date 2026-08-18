import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CarouselExample } from "@/components/examples/CarouselExample";

const meta = { title: "Experimental/Carousel", component: CarouselExample, tags: ["experimental"], parameters: { a11y: { test: "todo" } } } satisfies Meta<typeof CarouselExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
