"use client";

import Link from "next/link";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CommandDialog } from "@/components/ui/command";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CommandExample() {
  const [open, setOpen] = useState(false);

  return (
    <section id="command">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Command</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/command.tsx"
            className="type-body-sm text-foreground hover:text-foreground/70 transition-colors underline decoration-primary decoration-2 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/CommandExample.tsx"
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
          <h3 className="type-heading-sm mb-4">Command Palette</h3>
          <Command className="rounded-lg border border-border max-w-md">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
              </CommandGroup>
              <CommandGroup heading="Settings">
                <CommandItem>Profile</CommandItem>
                <CommandItem>Billing</CommandItem>
                <CommandItem>Settings</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Command Dialog</h3>
          <Button onClick={() => setOpen(true)}>Open Command Dialog</Button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Actions">
                <CommandItem>Create Project</CommandItem>
                <CommandItem>Open Settings</CommandItem>
                <CommandItem>View Profile</CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
      </div>
    </section>
  );
}
