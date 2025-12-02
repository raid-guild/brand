"use client";

import Link from "next/link";
import {
  AreaChartComponent,
  BarChartComponent,
  LineChartComponent,
  PieChartComponent,
  type ChartData,
} from "../ui/chart";

// Sample data for demos
export const sampleData = {
  monthlyRevenue: [
    { name: "Jan", revenue: 4000, expenses: 2400 },
    { name: "Feb", revenue: 3000, expenses: 1398 },
    { name: "Mar", revenue: 2000, expenses: 9800 },
    { name: "Apr", revenue: 2780, expenses: 3908 },
    { name: "May", revenue: 1890, expenses: 4800 },
    { name: "Jun", revenue: 2390, expenses: 3800 },
  ],
  userStats: [
    { name: "Active", value: 400 },
    { name: "Inactive", value: 300 },
    { name: "New", value: 200 },
    { name: "Returning", value: 100 },
  ],
  performance: [
    { name: "Q1", performance: 65, target: 70 },
    { name: "Q2", performance: 78, target: 75 },
    { name: "Q3", performance: 90, target: 80 },
    { name: "Q4", performance: 85, target: 85 },
  ],
};

export function ChartExample() {
  return (
    <section id="chart">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Chart</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#advanced-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/chart.tsx"
            className="type-body-sm text-primary hover:text-primary/80 transition-colors underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/ChartExample.tsx"
            className="type-body-sm text-primary hover:text-primary/80 transition-colors underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Example code →
          </Link>
        </div>
      </div>
      <div className="space-y-6">
        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Chart Container</h3>
          <p className="text-body-base text-muted-foreground mb-4">
            The Chart component provides a container for charting libraries like
            Recharts. Install and configure your preferred charting library to
            use this component.
          </p>
          <div className="space-y-6">
            <LineChartComponent
              config={{
                title: "Monthly Revenue",
                description: "Revenue vs Expenses over time",
                data: sampleData.monthlyRevenue.map((item) => ({
                  ...item,
                  value: item.revenue,
                })) as ChartData[],
                xKey: "name",
                height: 300,
              }}
            />

            <BarChartComponent
              config={{
                title: "Quarterly Performance",
                description: "Performance vs Target by quarter",
                data: sampleData.performance.map((item) => ({
                  ...item,
                  value: item.performance,
                })) as ChartData[],
                xKey: "name",
                height: 300,
              }}
            />

            <AreaChartComponent
              config={{
                title: "Revenue Trend",
                description: "Revenue trend with area fill",
                data: sampleData.monthlyRevenue.map((item) => ({
                  ...item,
                  value: item.revenue,
                })) as ChartData[],
                xKey: "name",
                height: 300,
              }}
            />

            <PieChartComponent
              config={{
                title: "User Distribution",
                description: "Breakdown of user types",
                data: sampleData.userStats,
                height: 300,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
