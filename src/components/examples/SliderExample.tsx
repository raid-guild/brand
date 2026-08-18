"use client";

import Link from "next/link";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function SliderExample() {
  const [value, setValue] = useState([50]);

  return (
    <section id="slider">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Slider</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/slider.tsx"
            className="type-body-sm text-foreground hover:text-foreground/70 transition-colors underline decoration-primary decoration-2 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/SliderExample.tsx"
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
          <h3 className="type-heading-sm mb-4">Basic Slider</h3>
          <div className="space-y-2 max-w-md">
            <Slider
              value={value}
              onValueChange={setValue}
              max={100}
              step={1}
            />
            <p className="text-body-sm text-muted-foreground">
              Value: {value[0]}
            </p>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Range Slider</h3>
          <div className="space-y-2 max-w-md">
            <Slider defaultValue={[20, 80]} max={100} step={1} />
            <p className="text-body-sm text-muted-foreground">
              Range: 20 - 80
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
