"use client";

import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

export function HoverCardExample() {
  return (
    <section id="hover-card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Hover Card</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/hover-card.tsx"
            className="type-body-sm text-foreground hover:text-foreground/70 transition-colors underline decoration-primary decoration-2 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/HoverCardExample.tsx"
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
          <h3 className="type-heading-sm mb-4">Basic Hover Card</h3>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="secondary">Hover me</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="space-y-2">
                <h4 className="text-heading-sm font-semibold">RaidGuild</h4>
                <p className="text-body-sm text-muted-foreground">
                  A decentralized collective of Web3 builders, designers, and
                  operators.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Hover Card with Link</h3>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" className="text-primary">
                @raidguild
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-heading-sm font-semibold">@raidguild</h4>
                  <p className="text-body-sm text-muted-foreground">
                    Building the future of Web3, one project at a time.
                  </p>
                  <div className="flex items-center pt-2">
                    <span className="text-body-xs text-muted-foreground">
                      Joined December 2020
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </section>
  );
}
