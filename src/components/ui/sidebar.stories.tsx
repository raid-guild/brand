import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "./sidebar";

const links = ["Guide Overview", "Architecture", "Logos", "Colors", "Typography"];

function BrandSidebar({ compact = false }: { compact?: boolean }) {
  return (
    <div className="h-[28rem] border border-border">
      <Sidebar className={compact ? "w-48" : undefined}>
        <SidebarHeader><span className="type-heading-sm">RaidGuild</span></SidebarHeader>
        <SidebarContent>
          <nav aria-label="Brand guide" className="space-y-1">
            {links.map((link, index) => <a key={link} href={`#${link.toLowerCase().replaceAll(" ", "-")}`} aria-current={index === 0 ? "page" : undefined} className="type-body-md block rounded-md px-3 py-2 hover:bg-accent aria-[current=page]:bg-accent">{link}</a>)}
          </nav>
        </SidebarContent>
        <SidebarFooter><span className="type-code-sm text-muted-foreground">Louchi · Latest</span></SidebarFooter>
      </Sidebar>
    </div>
  );
}

const meta = {
  title: "Experimental/Sidebar",
  component: BrandSidebar,
  tags: ["experimental"],
  parameters: { layout: "fullscreen", a11y: { test: "todo" } },
} satisfies Meta<typeof BrandSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Compact: Story = { args: { compact: true } };
