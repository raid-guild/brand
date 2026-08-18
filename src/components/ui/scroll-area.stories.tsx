import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ScrollArea } from "./scroll-area";

const reigns = ["Louchi — Venture Beyond", "Suede — archived repository system", "TW — Witchcraft", "Ven — reconstructed", "Louchi — current selection", "Suede — preserved assets"];

const meta = {
  title: "Data Display/Scroll Area",
  component: ScrollArea,
  tags: ["stable"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "h-48 w-80 rounded-md border border-border p-4",
    children: <div className="space-y-4">{reigns.map((reign, index) => <p key={index} className="type-body-md border-b border-border pb-3">{reign}</p>)}</div>,
  },
};
