"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function SidebarExample() {
  return (
    <section id="sidebar">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Sidebar</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/sidebar.tsx"
            className="type-body-sm text-foreground hover:text-foreground/70 transition-colors underline decoration-primary decoration-2 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/SidebarExample.tsx"
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
          <h3 className="type-heading-sm mb-4">Basic Sidebar</h3>
          <div className="h-64">
            <Sidebar>
              <SidebarHeader>
                <h3 className="text-heading-md">Sidebar Header</h3>
              </SidebarHeader>
              <SidebarContent>
                <nav className="space-y-2">
                  <div className="px-3 py-2 rounded-md hover:bg-accent">
                    Navigation Item 1
                  </div>
                  <div className="px-3 py-2 rounded-md hover:bg-accent">
                    Navigation Item 2
                  </div>
                  <div className="px-3 py-2 rounded-md hover:bg-accent">
                    Navigation Item 3
                  </div>
                </nav>
              </SidebarContent>
              <SidebarFooter>
                <p className="text-body-sm text-muted-foreground">
                  Sidebar Footer
                </p>
              </SidebarFooter>
            </Sidebar>
          </div>
        </div>
      </div>
    </section>
  );
}
