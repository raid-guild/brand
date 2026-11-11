import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  brandSystemSchema,
  machineBrandPayloadSchema,
  publicBrandManifestSchema,
} from "../src/brand/schema";
import { BRAND_SYSTEM } from "../src/brand/system";
import { getBrandGuidelinesPayload } from "../src/lib/machine-api/brand-guidelines";

test("canonical brand source satisfies its schema and cross-reference rules", () => {
  assert.doesNotThrow(() => brandSystemSchema.parse(BRAND_SYSTEM));
  assert.equal(
    BRAND_SYSTEM.reigns.filter((reign) => reign.status === "latest").length,
    1,
  );
  assert.equal(
    BRAND_SYSTEM.reigns.find((reign) => reign.id === "ven")?.status,
    "reconstructed",
  );
});

test("public manifest satisfies its contract and matches canonical release data", async () => {
  const raw = await readFile("public/brand-assets.json", "utf8");
  const manifest = publicBrandManifestSchema.parse(JSON.parse(raw));

  assert.equal(manifest.version, BRAND_SYSTEM.release.brandVersion);
  assert.equal(manifest.schemaVersion, BRAND_SYSTEM.release.schemaVersion);
  assert.equal(manifest.guidelines.versioning.default, BRAND_SYSTEM.defaultReign);
  assert.equal(manifest.components.length, BRAND_SYSTEM.components.length);
  assert.equal(manifest.assets.logos.items.length, BRAND_SYSTEM.assets.logos.length);
});

test("machine payload satisfies its contract and content hash", () => {
  const rawPayload = getBrandGuidelinesPayload();
  const payload = machineBrandPayloadSchema.parse(rawPayload);
  const { contentHash, ...content } = rawPayload;
  const expectedHash = createHash("sha256")
    .update(JSON.stringify(content))
    .digest("hex");

  assert.equal(contentHash, `sha256:${expectedHash}`);
  assert.equal(payload.contentVersion, BRAND_SYSTEM.release.brandVersion);
  assert.equal(payload.guidelines.versioning.defaultReign, BRAND_SYSTEM.defaultReign);
  assert.equal(
    payload.assets.illustrations.variantsPerScene,
    BRAND_SYSTEM.assets.illustrations.palettes.length *
      Object.keys(BRAND_SYSTEM.assets.illustrations.tones).length *
      2,
  );
});
