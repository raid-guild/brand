"use client";

import Link from "next/link";
import { ChartContainer } from "@/components/ui/chart";

export function ChartExample() {
  return (
    <section id="chart">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Chart</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
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
          <ChartContainer className="h-[300px] w-full border rounded-md p-4">
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Chart visualization would appear here
            </div>
          </ChartContainer>
        </div>
      </div>
    </section>
  );
}
