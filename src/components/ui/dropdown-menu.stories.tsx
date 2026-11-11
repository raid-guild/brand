import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./dropdown-menu";

function BrandDropdownMenu({ open = false }: { open?: boolean }) {
  const [showArchived, setShowArchived] = useState(true);

  return (
    <DropdownMenu defaultOpen={open} modal={!open}>
      <DropdownMenuTrigger asChild><Button variant="secondary">Brand actions</Button></DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Brand guide</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Open latest reign<DropdownMenuShortcut>⌘L</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem>Copy agent brief<DropdownMenuShortcut>⌘C</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuCheckboxItem checked={showArchived} onCheckedChange={setShowArchived}>Show archived reigns</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>Publish new reign</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const meta = {
  title: "Navigation/Dropdown Menu",
  component: BrandDropdownMenu,
  tags: ["stable"],
} satisfies Meta<typeof BrandDropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { open: true } };
