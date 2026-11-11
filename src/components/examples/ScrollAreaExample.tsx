"use client";

import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ScrollAreaExample() {
  return (
    <section id="scroll-area">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Scroll Area</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/scroll-area.tsx"
            className="type-body-sm text-foreground hover:text-foreground/70 transition-colors underline decoration-primary decoration-2 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/ScrollAreaExample.tsx"
            className="type-body-sm text-foreground hover:text-foreground/70 transition-colors underline decoration-primary decoration-2 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Example code →
          </Link>
        </div>
      </div>
      <div className="space-y-6">
        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Basic Scroll Area</h3>
          <ScrollArea className="h-72 w-full rounded-md border p-4">
            <div className="space-y-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="text-body-base">
                  Item {i + 1} - This is some content that will scroll when it
                  exceeds the container height.
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
}
