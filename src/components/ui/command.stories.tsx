import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Button } from "./button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command";

function GuideCommand({ initialSearch = "" }: { initialSearch?: string }) {
  const [action, setAction] = useState("No command selected");
  const [search, setSearch] = useState(initialSearch);

  return (
    <div className="w-full max-w-md space-y-3">
      <Command label="Brand guide commands" className="rounded-lg border">
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder="Search the brand guide..."
        />
        <CommandList>
          <CommandEmpty>No matching guide command.</CommandEmpty>
          <CommandGroup heading="Foundations">
            <CommandItem value="logos" onSelect={() => setAction("Open Logos")}>
              Open Logos
              <CommandShortcut>G L</CommandShortcut>
            </CommandItem>
            <CommandItem
              value="architecture"
              onSelect={() => setAction("Review Architecture")}
            >
              Review Architecture
              <CommandShortcut>G A</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Reigns">
            <CommandItem value="louchi" onSelect={() => setAction("Use Louchi")}>
              Use Louchi
              <CommandShortcut>R L</CommandShortcut>
            </CommandItem>
            <CommandItem value="suede" onSelect={() => setAction("Use Suede")}>
              Use Suede
              <CommandShortcut>R S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <p role="status" className="type-code-sm text-muted-foreground">
        {action}
      </p>
    </div>
  );
}

function GuideCommandDialog() {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("No command selected");

  const choose = (nextAction: string) => {
    setAction(nextAction);
    setOpen(false);
  };

  return (
    <div className="space-y-3">
      <Button onClick={() => setOpen(true)}>Open guide commands</Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Brand guide commands"
        description="Search and open a section of the RaidGuild brand guide."
      >
        <CommandInput placeholder="Search guide sections..." />
        <CommandList>
          <CommandEmpty>No matching guide section.</CommandEmpty>
          <CommandGroup heading="Guide sections">
            <CommandItem value="logos" onSelect={() => choose("Open Logos")}>
              Open Logos
            </CommandItem>
            <CommandItem
              value="architecture"
              onSelect={() => choose("Review Architecture")}
            >
              Review Architecture
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <p role="status" className="type-code-sm text-muted-foreground">
        {action}
      </p>
    </div>
  );
}

const meta = {
  title: "Experimental/Command",
  component: GuideCommand,
  tags: ["experimental"],
  parameters: { a11y: { test: "todo" } },
} satisfies Meta<typeof GuideCommand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyResults: Story = {
  args: { initialSearch: "unknown section" },
};

export const Dialog: Story = {
  render: () => <GuideCommandDialog />,
};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox", { name: "Brand guide commands" });
    await userEvent.type(input, "architecture");
    await userEvent.keyboard("{Enter}");
    await expect(canvas.getByRole("status")).toHaveTextContent(
      "Review Architecture",
    );
  },
};

export const DialogInteraction: Story = {
  render: () => <GuideCommandDialog />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Open guide commands" }),
    );

    const screen = within(canvasElement.ownerDocument.body);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeVisible());
    const input = screen.getByRole("combobox", { name: "Brand guide commands" });
    await userEvent.type(input, "logos");
    await userEvent.keyboard("{Enter}");

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await expect(canvas.getByRole("status")).toHaveTextContent("Open Logos");
  },
};
