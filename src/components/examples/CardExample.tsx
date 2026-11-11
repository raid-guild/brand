"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CardExample() {
  return (
    <section id="card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Card</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/card.tsx"
            className="type-body-sm text-foreground hover:text-foreground/70 transition-colors underline decoration-primary decoration-2 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/CardExample.tsx"
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
          <h3 className="type-heading-sm mb-4">Basic Card</h3>
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body-base">
                This is the main content of the card. You can put any content
                here.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Card with Footer</h3>
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Project Card</CardTitle>
              <CardDescription>
                A card with a footer containing action buttons.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body-base">
                This card demonstrates how to use the CardFooter component to
                add actions or additional information.
              </p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="primary">Action</Button>
              <Button variant="secondary">Cancel</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
