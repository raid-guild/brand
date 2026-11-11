"use client";

import Link from "next/link";
import { Kbd } from "@/components/ui/kbd";

export function KbdExample() {
  return (
    <section id="kbd">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Kbd</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/kbd.tsx"
            className="type-body-sm text-foreground hover:text-foreground/70 transition-colors underline decoration-primary decoration-2 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/KbdExample.tsx"
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
          <h3 className="type-heading-sm mb-4">Basic Keyboard Shortcuts</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-body-base">Press</span>
              <Kbd>⌘</Kbd>
              <span className="text-body-base">+</span>
              <Kbd>K</Kbd>
              <span className="text-body-base">to open command menu</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-body-base">Press</span>
              <Kbd>Ctrl</Kbd>
              <span className="text-body-base">+</span>
              <Kbd>S</Kbd>
              <span className="text-body-base">to save</span>
            </div>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Keyboard Shortcut Combinations</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-body-base">Copy:</span>
              <Kbd>⌘</Kbd>
              <span className="text-body-base">+</span>
              <Kbd>C</Kbd>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-body-base">Paste:</span>
              <Kbd>⌘</Kbd>
              <span className="text-body-base">+</span>
              <Kbd>V</Kbd>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-body-base">Undo:</span>
              <Kbd>⌘</Kbd>
              <span className="text-body-base">+</span>
              <Kbd>Z</Kbd>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-body-base">Search:</span>
              <Kbd>⌘</Kbd>
              <span className="text-body-base">+</span>
              <Kbd>F</Kbd>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
