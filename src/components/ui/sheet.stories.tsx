import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Button } from "./button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

function ProvenanceSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Review practice details</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Practice provenance</SheetTitle>
          <SheetDescription>
            Confirm how this specialized practice relates to RaidGuild before
            publishing.
          </SheetDescription>
        </SheetHeader>
        <p className="py-6 type-body-md text-muted-foreground">
          A RaidGuild practice, operating through RaidGuild LLC.
        </p>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary">Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button>Confirm details</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const meta = {
  title: "Overlays/Sheet",
  component: ProvenanceSheet,
  tags: ["stable"],
} satisfies Meta<typeof ProvenanceSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  render: () => (
    <Sheet defaultOpen>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Louchi reign notes</SheetTitle>
          <SheetDescription>
            The latest RaidGuild expression is Venture Beyond.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Review practice details" }),
    );

    const screen = within(canvasElement.ownerDocument.body);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeVisible());
    await expect(
      screen.getByRole("heading", { name: "Practice provenance" }),
    ).toBeVisible();
    await userEvent.click(
      screen.getByRole("button", { name: "Confirm details" }),
    );
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  },
};
