"use client";

import Link from "next/link";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { useState } from "react";

export function MultiselectExample() {
  const [value, setValue] = useState<Option[]>([]);

  const defaultOptions: Option[] = [
    { label: "React", value: "react" },
    { label: "Next.js", value: "nextjs" },
    { label: "TypeScript", value: "typescript" },
    { label: "Tailwind CSS", value: "tailwind" },
    { label: "Node.js", value: "nodejs" },
    { label: "Python", value: "python" },
    { label: "JavaScript", value: "javascript" },
  ];

  return (
    <section id="multiselect">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Multiselect</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/multiselect.tsx"
            className="type-body-sm text-foreground hover:text-foreground/70 transition-colors underline decoration-primary decoration-2 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/MultiselectExample.tsx"
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
          <h3 className="type-heading-sm mb-4">Basic Multiselect</h3>
          <div className="max-w-md">
            <MultipleSelector
              value={value}
              onChange={setValue}
              defaultOptions={defaultOptions}
              placeholder="Select technologies..."
            />
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Multiselect with Max Selection</h3>
          <div className="max-w-md">
            <MultipleSelector
              defaultOptions={defaultOptions}
              placeholder="Select up to 3 items..."
              maxSelected={3}
              onMaxSelected={(maxLimit) => {
                alert(`Maximum ${maxLimit} items can be selected`);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
