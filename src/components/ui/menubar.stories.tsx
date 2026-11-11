import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "./menubar";

function BrandMenubar() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Reign</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Louchi<MenubarShortcut>Latest</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Suede</MenubarItem><MenubarItem>TW</MenubarItem><MenubarItem>Ven</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Show token names</MenubarCheckboxItem>
          <MenubarCheckboxItem>Dark appearance</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem disabled>Compare practices</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

const meta = {
  title: "Navigation/Menubar",
  component: BrandMenubar,
  tags: ["stable"],
} satisfies Meta<typeof BrandMenubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
