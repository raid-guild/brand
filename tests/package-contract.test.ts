import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  BRAND_SYSTEM,
  DEFAULT_BRAND_REIGN,
  ThemeProvider,
  getBrandReign,
} from "@raidguild/brand-system";
import { Button } from "@raidguild/brand-system/components";

test("installable package defaults to the latest developing reign", () => {
  assert.equal(DEFAULT_BRAND_REIGN, BRAND_SYSTEM.defaultReign);
  assert.equal(getBrandReign(DEFAULT_BRAND_REIGN).status, "latest");
  assert.equal(getBrandReign(DEFAULT_BRAND_REIGN).maturity, "development");
  assert.equal(getBrandReign(DEFAULT_BRAND_REIGN).dataVersion, null);
});

test("package exports runtime and component contracts", () => {
  assert.equal(typeof ThemeProvider, "function");
  assert.ok(Button, "Button must be exported from the component barrel");
});

test("package declares stable entry points and bundled assets", async () => {
  const packageJson = JSON.parse(
    await readFile("packages/brand-system/package.json", "utf8"),
  );

  assert.equal(packageJson.name, "@raidguild/brand-system");
  assert.equal(packageJson.version, "0.1.0");
  assert.ok(packageJson.exports["."]);
  assert.ok(packageJson.exports["./components"]);
  assert.equal(packageJson.exports["./tokens.css"], "./dist/tokens.css");
  assert.equal(packageJson.exports["./fonts.css"], "./dist/fonts.css");
});
