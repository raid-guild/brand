"use client";

import Link from "next/link";
import { Item } from "@/components/ui/item";

export function ItemExample() {
  return (
    <section id="item">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Item</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/item.tsx"
            className="type-body-sm text-foreground hover:text-foreground/70 transition-colors underline decoration-primary decoration-2 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/ItemExample.tsx"
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
          <h3 className="type-heading-sm mb-4">Basic Item</h3>
          <div className="space-y-2 max-w-md">
            <Item>
              <div className="flex-1">
                <p className="text-body-base font-medium">Item Title</p>
                <p className="text-body-sm text-muted-foreground">
                  Item description goes here
                </p>
              </div>
            </Item>
            <Item>
              <div className="flex-1">
                <p className="text-body-base font-medium">Another Item</p>
                <p className="text-body-sm text-muted-foreground">
                  This is another item in the list
                </p>
              </div>
            </Item>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Item Variants</h3>
          <div className="space-y-2 max-w-md">
            <Item variant="compact">
              <div className="flex-1">
                <p className="text-body-sm font-medium">Compact Item</p>
              </div>
            </Item>
            <Item variant="default">
              <div className="flex-1">
                <p className="text-body-base font-medium">Default Item</p>
              </div>
            </Item>
            <Item variant="spacious">
              <div className="flex-1">
                <p className="text-body-base font-medium">Spacious Item</p>
                <p className="text-body-sm text-muted-foreground">
                  More padding for emphasis
                </p>
              </div>
            </Item>
          </div>
        </div>
      </div>
    </section>
  );
}
