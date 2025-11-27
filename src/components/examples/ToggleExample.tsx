"use client";

import Link from "next/link";
import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, Underline } from "lucide-react";
import { useState } from "react";

export function ToggleExample() {
  const [boldPressed, setBoldPressed] = useState(false);
  const [italicPressed, setItalicPressed] = useState(false);
  const [underlinePressed, setUnderlinePressed] = useState(false);

  return (
    <section id="toggle">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Toggle</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/toggle.tsx"
            className="type-body-sm text-primary hover:text-primary/80 transition-colors underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/ToggleExample.tsx"
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
          <h3 className="type-heading-sm mb-4">Basic Toggle</h3>
          <div className="flex items-center gap-2">
            <Toggle
              pressed={boldPressed}
              onPressedChange={setBoldPressed}
              aria-label="Toggle bold"
            >
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={italicPressed}
              onPressedChange={setItalicPressed}
              aria-label="Toggle italic"
            >
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={underlinePressed}
              onPressedChange={setUnderlinePressed}
              aria-label="Toggle underline"
            >
              <Underline className="h-4 w-4" />
            </Toggle>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Toggle with Text</h3>
          <div className="flex items-center gap-2">
            <Toggle variant="outline" aria-label="Toggle italic">
              Italic
            </Toggle>
            <Toggle variant="outline" aria-label="Toggle bold">
              Bold
            </Toggle>
            <Toggle variant="outline" aria-label="Toggle underline">
              Underline
            </Toggle>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Toggle Sizes</h3>
          <div className="flex items-center gap-2">
            <Toggle size="sm" aria-label="Small toggle">
              Small
            </Toggle>
            <Toggle size="default" aria-label="Default toggle">
              Default
            </Toggle>
            <Toggle size="lg" aria-label="Large toggle">
              Large
            </Toggle>
          </div>
        </div>
      </div>
    </section>
  );
}

