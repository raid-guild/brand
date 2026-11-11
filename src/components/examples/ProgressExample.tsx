"use client";

import Link from "next/link";
import { ProgressBar } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export function ProgressExample() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="progress">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Progress</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/progress.tsx"
            className="type-body-sm text-foreground hover:text-foreground/70 transition-colors underline decoration-primary decoration-2 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/ProgressExample.tsx"
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
          <h3 className="type-heading-sm mb-4">Basic Progress Bar</h3>
          <div className="space-y-4 max-w-md">
            <ProgressBar value={33} />
            <ProgressBar value={66} />
            <ProgressBar value={100} />
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Animated Progress Bar</h3>
          <div className="space-y-2 max-w-md">
            <ProgressBar value={progress} />
            <p className="text-body-sm text-muted-foreground">
              {progress}% complete
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
