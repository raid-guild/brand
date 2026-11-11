import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";

function GuideNavigation({ viewport = true }: { viewport?: boolean }) {
  return (
    <NavigationMenu viewport={viewport} aria-label="Brand guide">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Brand system</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[360px] gap-1 p-2 sm:grid-cols-2">
              <NavigationMenuLink href="/logos">
                <span className="type-label-md">Logos</span>
                <span className="type-body-sm text-muted-foreground">
                  Canonical mark and archived lockups
                </span>
              </NavigationMenuLink>
              <NavigationMenuLink href="/colors">
                <span className="type-label-md">Colors</span>
                <span className="type-body-sm text-muted-foreground">
                  Reign-aware palettes and semantics
                </span>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Using the guide</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[320px] p-2">
              <NavigationMenuLink href="/architecture">
                <span className="type-label-md">Architecture</span>
                <span className="type-body-sm text-muted-foreground">
                  Separate reigns from practices
                </span>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/typography">Typography</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const meta = {
  title: "Navigation/Navigation Menu",
  component: GuideNavigation,
  tags: ["stable"],
} satisfies Meta<typeof GuideNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutViewport: Story = {
  args: { viewport: false },
};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const brandSystem = canvas.getByRole("button", { name: "Brand system" });
    brandSystem.focus();
    await userEvent.keyboard("{Enter}");

    await expect(brandSystem).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByRole("link", { name: /Logos/ })).toBeVisible();

    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(brandSystem).toHaveAttribute("aria-expanded", "false"),
    );
    await expect(brandSystem).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
    await expect(
      canvas.getByRole("button", { name: "Using the guide" }),
    ).toHaveFocus();
  },
};
