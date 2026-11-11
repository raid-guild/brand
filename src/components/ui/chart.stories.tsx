import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BarChartComponent, LineChartComponent, PieChartComponent, type ChartConfig } from "./chart";

const activity: ChartConfig = {
  title: "Guild Activity",
  description: "Delivery and research encounters by month",
  data: [
    { name: "May", delivery: 14, research: 8, value: 14 },
    { name: "Jun", delivery: 19, research: 11, value: 19 },
    { name: "Jul", delivery: 17, research: 16, value: 17 },
    { name: "Aug", delivery: 24, research: 14, value: 24 },
  ],
  height: 280,
};

const practices: ChartConfig = {
  title: "Practice Mix",
  description: "Simultaneous areas of expertise",
  data: [
    { name: "Delivery", value: 48 },
    { name: "Research", value: 32 },
    { name: "Community", value: 20 },
  ],
  height: 280,
};

const meta = {
  title: "Experimental/Chart",
  component: LineChartComponent,
  tags: ["experimental"],
  parameters: { a11y: { test: "todo" } },
} satisfies Meta<typeof LineChartComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { config: activity, className: "max-w-3xl" } };
export const Bar: Story = {
  args: { config: activity },
  render: () => <BarChartComponent config={activity} className="max-w-3xl" />,
};
export const Pie: Story = {
  args: { config: practices },
  render: () => <PieChartComponent config={practices} className="max-w-3xl" />,
};
