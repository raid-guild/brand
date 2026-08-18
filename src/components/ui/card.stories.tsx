import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

function BrandCard({ withAction = false }: { withAction?: boolean }) {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Louchi Reign</CardTitle>
        <CardDescription>Latest expression — Venture Beyond</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="type-body-md">Expansive editorial typography, spatial composition, and cinematic motion.</p>
      </CardContent>
      {withAction && <CardFooter><Button>Explore the reign</Button></CardFooter>}
    </Card>
  );
}

const meta = {
  title: "Data Display/Card",
  component: BrandCard,
  tags: ["stable"],
} satisfies Meta<typeof BrandCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithAction: Story = { args: { withAction: true } };
