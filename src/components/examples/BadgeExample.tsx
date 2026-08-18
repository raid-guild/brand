"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function BadgeExample() {
  return (
    <section id="badge">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Badge</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/badge.tsx"
            className="type-body-sm text-foreground hover:text-foreground/70 transition-colors underline decoration-primary decoration-2 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/BadgeExample.tsx"
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
          <h3 className="type-heading-sm mb-4">Badge Variants</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="moloch">Moloch</Badge>
            <Badge variant="scroll">Scroll</Badge>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Badge Usage Examples</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-body-base">Status:</span>
              <Badge variant="moloch">Active</Badge>
              <Badge variant="secondary">Pending</Badge>
              <Badge variant="destructive">Error</Badge>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-body-base">Categories:</span>
              <Badge variant="scroll">Web3</Badge>
              <Badge variant="outline">Development</Badge>
              <Badge>Design</Badge>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-body-base">Tags:</span>
              <Badge variant="moloch">RaidGuild</Badge>
              <Badge variant="outline">DAO</Badge>
              <Badge variant="secondary">Community</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
