"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputExample() {
  return (
    <section id="input">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Input</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/input.tsx"
            className="type-body-sm text-foreground hover:text-foreground/70 transition-colors underline decoration-primary decoration-2 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/InputExample.tsx"
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
          <h3 className="type-heading-sm mb-4">Basic Input</h3>
          <div className="space-y-2 max-w-md">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Input Types</h3>
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="text-input">Text</Label>
              <Input id="text-input" type="text" placeholder="Enter text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-input">Password</Label>
              <Input
                id="password-input"
                type="password"
                placeholder="Enter password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number-input">Number</Label>
              <Input
                id="number-input"
                type="number"
                placeholder="Enter number"
              />
            </div>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Disabled Input</h3>
          <div className="space-y-2 max-w-md">
            <Label htmlFor="disabled-input">Disabled</Label>
            <Input
              id="disabled-input"
              type="text"
              placeholder="This input is disabled"
              disabled
            />
          </div>
        </div>
      </div>
    </section>
  );
}
