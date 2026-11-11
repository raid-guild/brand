"use client";

import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function TextareaExample() {
  return (
    <section id="textarea">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Textarea</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/textarea.tsx"
            className="type-body-sm text-foreground hover:text-foreground/70 transition-colors underline decoration-primary decoration-2 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/TextareaExample.tsx"
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
          <h3 className="type-heading-sm mb-4">Basic Textarea</h3>
          <div className="space-y-2 max-w-md">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
            />
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Textarea Sizes</h3>
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="textarea-small">Small</Label>
              <Textarea
                id="textarea-small"
                placeholder="Small textarea..."
                className="min-h-[60px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="textarea-default">Default</Label>
              <Textarea
                id="textarea-default"
                placeholder="Default textarea..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="textarea-large">Large</Label>
              <Textarea
                id="textarea-large"
                placeholder="Large textarea..."
                className="min-h-[120px]"
              />
            </div>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Disabled Textarea</h3>
          <div className="space-y-2 max-w-md">
            <Label htmlFor="textarea-disabled">Disabled</Label>
            <Textarea
              id="textarea-disabled"
              placeholder="This textarea is disabled"
              disabled
            />
          </div>
        </div>
      </div>
    </section>
  );
}
