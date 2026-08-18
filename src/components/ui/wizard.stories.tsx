import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WizardExample } from "@/components/examples/WizardExample";

const meta = { title: "Experimental/Wizard", component: WizardExample, tags: ["experimental"], parameters: { a11y: { test: "todo" } } } satisfies Meta<typeof WizardExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
