import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

const encounters = [
  ["What is a reign?", "A reign versions the Guild identity through time."],
  ["What is a practice?", "A practice distinguishes a simultaneous area of expertise."],
  ["What remains durable?", "The black crossed-swords mark is the canonical master mark."],
] as const;

function BrandAccordion({ multiple = false }: { multiple?: boolean }) {
  const items = encounters.map(([question, answer], index) => (
    <AccordionItem key={question} value={`item-${index + 1}`}>
      <AccordionTrigger>{question}</AccordionTrigger>
      <AccordionContent>{answer}</AccordionContent>
    </AccordionItem>
  ));

  return multiple ? (
    <Accordion type="multiple" className="max-w-xl">
      {items}
    </Accordion>
  ) : (
    <Accordion type="single" collapsible className="max-w-xl">
      {items}
    </Accordion>
  );
}

const meta = {
  title: "Data Display/Accordion",
  component: BrandAccordion,
  tags: ["stable"],
} satisfies Meta<typeof BrandAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Multiple: Story = { args: { multiple: true } };
