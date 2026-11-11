"use client";

import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function CheckboxExample() {
  return (
    <section id="checkbox">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Checkbox</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/checkbox.tsx"
            className="type-body-sm text-foreground hover:text-foreground/70 transition-colors underline decoration-primary decoration-2 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/CheckboxExample.tsx"
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
          <h3 className="type-heading-sm mb-4">Basic Checkbox</h3>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Checked Checkbox</h3>
          <div className="flex items-start space-x-2">
            <Checkbox id="terms-2" defaultChecked />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="terms-2">Accept terms and conditions</Label>
              <p className="text-body-sm text-muted-foreground">
                By clicking this checkbox, you agree to the terms and
                conditions.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Disabled Checkbox</h3>
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled" disabled />
            <Label htmlFor="disabled" className="text-muted-foreground">
              Disabled checkbox
            </Label>
          </div>
        </div>
      </div>
    </section>
  );
}
