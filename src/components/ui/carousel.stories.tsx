import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Card, CardContent, CardDescription, CardTitle } from "./card";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

const reigns = [
  { name: "Louchi", note: "Latest — Venture Beyond" },
  { name: "Suede", note: "Archived repository system" },
  { name: "TW", note: "Archived Witchcraft expression" },
  { name: "Ven", note: "Partially reconstructed" },
];

function ReignCarousel({
  orientation = "horizontal",
  multipleVisible = false,
}: {
  orientation?: "horizontal" | "vertical";
  multipleVisible?: boolean;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="mx-auto w-full max-w-lg space-y-3 px-12">
      <Carousel
        setApi={setApi}
        orientation={orientation}
        opts={{ align: "start" }}
        aria-label="Brand reigns"
      >
        <CarouselContent
          className={orientation === "vertical" ? "h-[220px]" : undefined}
        >
          {reigns.map((reign, index) => (
            <CarouselItem
              key={reign.name}
              aria-label={`${index + 1} of ${reigns.length}`}
              className={multipleVisible ? "basis-1/2" : undefined}
            >
              <Card className="h-full">
                <CardContent className="flex min-h-48 flex-col justify-center p-6">
                  <CardTitle>{reign.name}</CardTitle>
                  <CardDescription>{reign.note}</CardDescription>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p role="status" className="type-code-sm text-muted-foreground">
        Slide {current + 1} of {reigns.length}: {reigns[current].name}
      </p>
    </div>
  );
}

const meta = {
  title: "Experimental/Carousel",
  component: ReignCarousel,
  tags: ["experimental"],
  parameters: { a11y: { test: "todo" } },
} satisfies Meta<typeof ReignCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MultipleVisible: Story = {
  args: { multipleVisible: true },
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const region = canvas.getByRole("region", { name: "Brand reigns" });
    const previous = canvas.getByRole("button", { name: "Previous slide" });
    const next = canvas.getByRole("button", { name: "Next slide" });

    await expect(previous).toBeDisabled();
    await expect(canvas.getByRole("status")).toHaveTextContent(
      "Slide 1 of 4: Louchi",
    );

    await userEvent.click(next);
    await waitFor(() =>
      expect(canvas.getByRole("status")).toHaveTextContent(
        "Slide 2 of 4: Suede",
      ),
    );

    region.focus();
    await userEvent.keyboard("{ArrowRight}");
    await waitFor(() =>
      expect(canvas.getByRole("status")).toHaveTextContent("Slide 3 of 4: TW"),
    );

    await userEvent.click(previous);
    await waitFor(() =>
      expect(canvas.getByRole("status")).toHaveTextContent(
        "Slide 2 of 4: Suede",
      ),
    );
  },
};
