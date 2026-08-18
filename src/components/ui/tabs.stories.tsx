import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

function BrandTabs({ disabled = false }: { disabled?: boolean }) {
  return (
    <Tabs defaultValue="reign" className="max-w-lg">
      <TabsList>
        <TabsTrigger value="reign">Reign</TabsTrigger>
        <TabsTrigger value="practice">Practice</TabsTrigger>
        <TabsTrigger value="future" disabled={disabled}>Future</TabsTrigger>
      </TabsList>
      <TabsContent value="reign" className="type-body-md">Answers “when?” and versions the Guild identity through time.</TabsContent>
      <TabsContent value="practice" className="type-body-md">Answers “where and for what?” across simultaneous specialties.</TabsContent>
      <TabsContent value="future" className="type-body-md">Reserved for a documented future expression.</TabsContent>
    </Tabs>
  );
}

const meta = {
  title: "Navigation/Tabs",
  component: BrandTabs,
  tags: ["stable"],
} satisfies Meta<typeof BrandTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
