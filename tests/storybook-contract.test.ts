import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { COMPONENTS } from "../src/brand/components";

const storiesDirectory = path.resolve("src/components/ui");

test("component story IDs and stability tags match canonical metadata", () => {
  const storyFiles = readdirSync(storiesDirectory).filter((file) =>
    file.endsWith(".stories.tsx"),
  );

  assert.ok(storyFiles.length > 0, "expected component stories");
  assert.equal(
    storyFiles.length,
    COMPONENTS.length,
    "every canonical component must have a colocated story",
  );

  for (const storyFile of storyFiles) {
    const componentId = storyFile.replace(".stories.tsx", "");
    const metadata = COMPONENTS.find(({ id }) => id === componentId);
    const storySource = readFileSync(path.join(storiesDirectory, storyFile), "utf8");
    const title = storySource.match(/title: "([^"]+)"/)?.[1];

    assert.ok(metadata, `missing canonical metadata for ${componentId}`);
    assert.ok(title, `${componentId} story must publish a literal title`);
    assert.ok(metadata.storyIds.length > 0, `${componentId} must publish story IDs`);
    const storyIdPrefix = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const exportedStories = [...storySource.matchAll(/export const (\w+): Story/g)].map(
      ([, name]) =>
        `${storyIdPrefix}--${name
          .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
          .toLowerCase()}`,
    );
    assert.equal(
      new Set(metadata.storyIds).size,
      metadata.storyIds.length,
      `${componentId} metadata story IDs must be unique`,
    );
    for (const storyId of metadata.storyIds) {
      assert.ok(
        exportedStories.includes(storyId),
        `${componentId} metadata references missing story ${storyId}`,
      );
    }
    assert.match(
      storySource,
      new RegExp(`tags: \\[\"${metadata.stability}\"\\]`),
      `${componentId} story tag must match canonical stability`,
    );
  }
});
