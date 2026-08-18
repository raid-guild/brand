import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Button } from "./button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

function ReignDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Choose a reign</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Use the Louchi reign?</DrawerTitle>
          <DrawerDescription>
            Louchi is the latest RaidGuild expression. The selection is stored
            for future visits.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Use Louchi</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const meta = {
  title: "Overlays/Drawer",
  component: ReignDrawer,
  tags: ["stable"],
} satisfies Meta<typeof ReignDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  render: () => (
    <Drawer defaultOpen>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Archived reign</DrawerTitle>
          <DrawerDescription>
            Suede is preserved as an earlier visual system, not timeless
            RaidGuild canon.
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  ),
};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Choose a reign" }),
    );

    const screen = within(canvasElement.ownerDocument.body);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeVisible());
    await expect(
      screen.getByRole("heading", { name: "Use the Louchi reign?" }),
    ).toBeVisible();
    await userEvent.click(screen.getByRole("button", { name: "Use Louchi" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  },
};
