"use client";

import Link from "next/link";
import Header from "@/components/shared/Header";

export function BrandNavigationExample() {
  return (
    <section id="brand-navigation">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Brand Navigation</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#advanced-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/shared/Header.tsx"
            className="type-body-sm text-primary hover:text-primary/80 transition-colors underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
        </div>
      </div>
      <div className="space-y-6">
        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Live Example</h3>
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="relative -mx-6 -mt-6 mb-6">
              <Header themeVariant="moloch-500" />
            </div>
            <p className="type-body-sm text-muted-foreground px-2">
              The header is sticky, responsive, and includes mobile menu
              functionality. Resize your browser to see the mobile menu in
              action.
            </p>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg bg-muted/30">
          <h3 className="type-heading-sm mb-4">Component Overview</h3>
          <p className="type-body-base text-muted-foreground mb-4">
            The Brand Navigation component is a fully-featured header that
            combines the RaidGuild logo, responsive navigation links, mobile
            menu functionality, and smooth scrolling behavior. It automatically
            adapts to desktop and mobile layouts and supports multiple theme
            variants.
          </p>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Props</h3>
          <div className="space-y-4">
            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  staticAppearance
                </code>
              </h4>
              <p className="type-body-base text-muted-foreground mb-2">
                <strong className="text-foreground">Type:</strong>{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  boolean
                </code>
                <br />
                <strong className="text-foreground">Default:</strong>{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  true
                </code>
              </p>
              <p className="type-body-base text-muted-foreground">
                When enabled, uses standard Next.js router navigation links
                instead of smooth scrolling anchor links. Set to{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  false
                </code>{" "}
                for single-page applications with anchor-based navigation.
              </p>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  themeVariant
                </code>
              </h4>
              <p className="type-body-base text-muted-foreground mb-2">
                <strong className="text-foreground">Type:</strong>{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  &quot;moloch-500&quot; | &quot;moloch-800&quot; |
                  &quot;scroll-700&quot;
                </code>
                <br />
                <strong className="text-foreground">Default:</strong>{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  &quot;moloch-500&quot;
                </code>
              </p>
              <p className="type-body-base text-muted-foreground">
                Controls the color scheme of the header. Each variant uses
                different background colors, border accents, and logo paths to
                match your page design.
              </p>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  NavLinksComponent
                </code>
              </h4>
              <p className="type-body-base text-muted-foreground mb-2">
                <strong className="text-foreground">Type:</strong>{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  ComponentType&lt;HeaderNavLinksProps&gt;
                </code>
                <br />
                <strong className="text-foreground">Default:</strong>{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  HeaderNavLinks
                </code>
              </p>
              <p className="type-body-base text-muted-foreground">
                Optional custom navigation links component. Use this to
                customize the navigation link rendering while maintaining the
                header structure.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Theme Variants</h3>
          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="p-4 bg-moloch-500 border-t-[10px] border-scroll-700">
                <p className="type-body-sm text-scroll-100 font-medium mb-2">
                  moloch-500 (Default)
                </p>
                <p className="type-body-xs text-scroll-100/80">
                  Light moloch background with scroll-700 border accent
                </p>
              </div>
            </div>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="p-4 bg-moloch-800 border-t-[10px] border-moloch-500">
                <p className="type-body-sm text-scroll-100 font-medium mb-2">
                  moloch-800
                </p>
                <p className="type-body-xs text-scroll-100/80">
                  Dark moloch background with moloch-500 border accent
                </p>
              </div>
            </div>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="p-4 bg-scroll-700 border-t-[10px] border-moloch-800">
                <p className="type-body-sm text-scroll-100 font-medium mb-2">
                  scroll-700
                </p>
                <p className="type-body-xs text-scroll-100/80">
                  Scroll background with moloch-800 border accent
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Setup Instructions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                1. Basic Usage
              </h4>
              <p className="type-body-base text-muted-foreground mb-3">
                Import and add the Header component to your layout or page:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import Header from "@/components/shared/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}`}</code>
              </pre>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                2. With Theme Variant
              </h4>
              <p className="type-body-base text-muted-foreground mb-3">
                Customize the header theme to match your page:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`<Header themeVariant="moloch-800" />`}</code>
              </pre>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                3. With Anchor Navigation
              </h4>
              <p className="type-body-base text-muted-foreground mb-3">
                Enable smooth scrolling anchor navigation:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`<Header staticAppearance={false} />`}</code>
              </pre>
            </div>

            <div>
              <h4 className="type-body-lg font-semibold mb-2">
                4. Customizing Navigation Items
              </h4>
              <p className="type-body-base text-muted-foreground mb-3">
                To customize navigation items, edit the{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  NAV_ITEMS
                </code>{" "}
                array in{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  src/components/shared/Header.tsx
                </code>
                . Navigation items can use either:
              </p>
              <ul className="list-disc list-inside text-body-base text-muted-foreground space-y-1 mb-3">
                <li>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                    href
                  </code>
                  : Full URL for external links or router paths
                </li>
                <li>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                    anchor
                  </code>
                  : ID for anchor-based scrolling (e.g.,
                  &quot;#section-id&quot;)
                </li>
              </ul>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`const NAV_ITEMS: NavItem[] = [
  { label: "Brand", href: "/" },
  { label: "About", anchor: "about" },
  { label: "RaidGuild.org", href: "https://www.raidguild.org/" },
];`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
