"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BRAND_SYSTEM } from "@/generated/brand-data";

type IllustrationVariant = "color" | "bw";
type IllustrationSize =
  keyof typeof BRAND_SYSTEM.assets.illustrations.scenesBySize;
type BackgroundVariant =
  (typeof BRAND_SYSTEM.assets.illustrations.palettes)[number];

const illustrationSizes = Object.keys(
  BRAND_SYSTEM.assets.illustrations.scenesBySize,
) as IllustrationSize[];

const backgroundLabels: Record<BackgroundVariant, string> = {
  moloch500: "Moloch 500",
  moloch800: "Moloch 800",
  scroll100: "Scroll 100",
  scroll700: "Scroll 700",
};

const illustrations = Object.entries(
  BRAND_SYSTEM.assets.illustrations.scenesBySize,
).flatMap(([size, collection]) =>
  collection.scenes.map((name) => ({
    name,
    displayName: name
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" "),
    sizes: [size as IllustrationSize],
  })),
);

export default function IllustrationGallery() {
  const [selectedIllustration, setSelectedIllustration] = useState(
    illustrations[0],
  );
  const [variant, setVariant] = useState<IllustrationVariant>("color");
  const [size, setSize] = useState<IllustrationSize>("1440x1440");
  const [background, setBackground] = useState<BackgroundVariant>("scroll100");

  const getImagePath = (
    name: string,
    variant: IllustrationVariant,
    size: IllustrationSize,
    isThumbnail = false,
  ) => {
    const suffix = variant === "color" ? "-c" : "-bw";
    const folder = isThumbnail ? `thumbnails/${size}` : size;
    return `/assets/webp/${background}/${folder}/${name}${suffix}.webp`;
  };

  const filteredIllustrations = illustrations.filter((ill) =>
    ill.sizes.includes(size),
  );

  // When size changes, automatically select the first illustration in the new size category
  useEffect(() => {
    const firstInCategory = filteredIllustrations[0];
    if (
      firstInCategory &&
      !filteredIllustrations.includes(selectedIllustration)
    ) {
      setSelectedIllustration(firstInCategory);
    }
  }, [size, filteredIllustrations, selectedIllustration]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[900px]">
      {/* Main Preview Area - Left */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex gap-2 rounded-lg border border-border p-1">
            {illustrationSizes.map((option) => (
              <Button
                key={option}
                type="button"
                size="sm"
                variant={size === option ? "primary" : "ghost"}
                onClick={() => setSize(option)}
              >
                {option}
              </Button>
            ))}
          </div>

          <div className="flex gap-2 rounded-lg border border-border p-1">
            {([
              ["color", "Color"],
              ["bw", "Black & White"],
            ] as const).map(([option, label]) => (
              <Button
                key={option}
                type="button"
                size="sm"
                variant={variant === option ? "primary" : "ghost"}
                onClick={() => setVariant(option)}
              >
                {label}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 rounded-lg border border-border p-1">
            {BRAND_SYSTEM.assets.illustrations.palettes.map((option) => (
              <Button
                key={option}
                type="button"
                size="sm"
                variant={background === option ? "primary" : "ghost"}
                onClick={() => setBackground(option)}
              >
                {backgroundLabels[option]}
              </Button>
            ))}
          </div>
        </div>

        {/* Large Preview */}
        <div className="flex-1 border border-border rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center p-8">
          <div className="relative w-full h-full">
            <Image
              src={getImagePath(
                selectedIllustration.name,
                variant,
                size,
                false,
              )}
              alt={selectedIllustration.displayName}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Image Info */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="type-heading-sm">
              {selectedIllustration.displayName}
            </h3>
            <p className="type-body-sm text-muted-foreground">
              {size} • {variant === "color" ? "Full Color" : "Black & White"} •{" "}
              {backgroundLabels[background]}
            </p>
          </div>
          <Button asChild size="sm">
            <a
              href={getImagePath(selectedIllustration.name, variant, size, false)}
              download
            >
              Download
            </a>
          </Button>
        </div>
      </div>

      {/* Thumbnail Sidebar - Right */}
      <div className="w-full lg:w-auto overflow-hidden">
        <div className="h-full overflow-y-auto space-y-2">
          {filteredIllustrations.map((illustration) => (
            <button
              key={illustration.name}
              onClick={() => setSelectedIllustration(illustration)}
              className={`w-1/2 flex items-center justify-center overflow-hidden rounded-lg border transition-all ${
                selectedIllustration.name === illustration.name
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Image
                src={getImagePath(illustration.name, variant, size, true)}
                alt={illustration.displayName}
                width={208}
                height={208}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
