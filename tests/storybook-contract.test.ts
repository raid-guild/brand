import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { COMPONENTS } from "../src/brand/components";

const storiesDirectory = path.resolve("src/components/ui");

test("component story stability tags match canonical metadata", () => {
  const storyFiles = readdirSync(storiesDirectory).filter((file) =>
    file.endsWith(".stories.tsx"),
  );

  assert.ok(storyFiles.length > 0, "expected component stories");

  for (const storyFile of storyFiles) {
    const componentId = storyFile.replace(".stories.tsx", "");
    const metadata = COMPONENTS.find(({ id }) => id === componentId);
    const storySource = readFileSync(path.join(storiesDirectory, storyFile), "utf8");

    assert.ok(metadata, `missing canonical metadata for ${componentId}`);
    assert.ok(metadata.storyIds.length > 0, `${componentId} must publish a default story ID`);
    assert.match(
      storySource,
      new RegExp(`tags: \\[\"${metadata.stability}\"\\]`),
      `${componentId} story tag must match canonical stability`,
    );
  }
});
