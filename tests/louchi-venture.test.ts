import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { BRAND_SYSTEM } from "../src/brand/system";

test("Louchi uses current display, body and navy night tokens without changing Suede", () => {
  const louchi = BRAND_SYSTEM.reigns.find((reign) => reign.id === "louchi")!;
  const suede = BRAND_SYSTEM.reigns.find((reign) => reign.id === "suede")!;
  assert.equal(louchi.typography.display, "Grinder");
  assert.equal(louchi.typography.body, "Ubuntu");
  assert.equal(louchi.darkTokens?.["--background"], "#191e4e");
  assert.equal(suede.typography.display, "Mazius Display");
  assert.equal(suede.typography.body, "EB Garamond");
});

test("Venture specimens preserve retalic direction and CTA spacing", () => {
  const css = readFileSync("src/stories/brand/venture-elements.module.css", "utf8");
  assert.match(css, /font-family: var\(--font-retalic\)/);
  assert.doesNotMatch(css, /skewX/);
  assert.match(css, /margin-top: 24px/);
  for (const file of ["AfacadFlux-Variable.ttf", "AfacadFlux-OFL.txt", "Ubuntu-Variable.ttf", "Ubuntu-Italic-Variable.ttf", "UbuntuMono-UFL.txt"]) {
    assert.ok(existsSync(`public/fonts/${file}`), `${file} must ship`);
  }
});

test("inquiry workshop cannot send submissions or analytics", () => {
  const source = readFileSync("src/stories/brand/website-snapshot/HireUs.tsx", "utf8");
  assert.doesNotMatch(source, /fetch\s*\(/);
  assert.doesNotMatch(source, /from ["']@\/lib\/analytics/);
  assert.match(source, /previewOutcome/);
  assert.match(source, /No information was sent/);
});

test("elastic gallery uses local fixtures and licensed fonts stay outside package assets", () => {
  const gallery = readFileSync("src/stories/brand/website-snapshot/ArtifactGallery.tsx", "utf8");
  assert.doesNotMatch(gallery, /fetch\s*\(/);
  assert.match(gallery, /lastWidth/);
  assert.match(gallery, /data-elastic-row/);
  for (const cut of ["Regular", "Italic", "Retalic"]) {
    assert.ok(existsSync(`public/brand-fonts/louchi/Grinder-${cut}.woff2`));
    assert.ok(!existsSync(`public/fonts/Grinder-${cut}.woff2`));
  }
});
