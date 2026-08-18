import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./table";

const reigns = [
  ["Louchi", "Latest", "Venture Beyond"],
  ["Suede", "Archived", "Repository system"],
  ["TW", "Archived", "Witchcraft"],
  ["Ven", "Reconstructed", "Surviving one-sheet"],
] as const;

function ReignTable({ empty = false }: { empty?: boolean }) {
  return (
    <Table>
      <TableCaption>RaidGuild identity stewardship over time.</TableCaption>
      <TableHeader><TableRow><TableHead>Reign</TableHead><TableHead>Status</TableHead><TableHead>Expression</TableHead></TableRow></TableHeader>
      <TableBody>
        {empty ? <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No reigns found.</TableCell></TableRow> : reigns.map((reign) => <TableRow key={reign[0]}>{reign.map((cell) => <TableCell key={cell}>{cell}</TableCell>)}</TableRow>)}
      </TableBody>
    </Table>
  );
}

const meta = {
  title: "Data Display/Table",
  component: ReignTable,
  tags: ["stable"],
} satisfies Meta<typeof ReignTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { empty: true } };
