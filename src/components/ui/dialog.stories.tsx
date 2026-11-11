import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

function ConfirmationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Review provenance</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preserve brand provenance?</DialogTitle>
          <DialogDescription>
            Distinct practices retain a route back to RaidGuild and identify the
            steward reign behind their visual expression.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
          <DialogClose asChild><Button>Confirm</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const meta = {
  title: "Overlays/Dialog",
  component: ConfirmationDialog,
  tags: ["stable"],
} satisfies Meta<typeof ConfirmationDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Brand provenance</DialogTitle>
          <DialogDescription>A RaidGuild practice, operating through RaidGuild LLC.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
};
export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Review provenance" }));

    const screen = within(canvasElement.ownerDocument.body);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeVisible());
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Preserve brand provenance?" })).toBeVisible(),
    );
    await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  },
};
