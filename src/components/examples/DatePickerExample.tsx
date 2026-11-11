"use client";

import Link from "next/link";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";

export function DatePickerExample() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <section id="date-picker">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Date Picker</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/date-picker.tsx"
            className="type-body-sm text-foreground hover:text-foreground/70 transition-colors underline decoration-primary decoration-2 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/DatePickerExample.tsx"
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
          <h3 className="type-heading-sm mb-4">Basic Date Picker</h3>
          <DatePicker selected={date} onSelect={setDate} />
        </div>
      </div>
    </section>
  );
}
