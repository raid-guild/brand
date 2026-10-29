import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
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
  const currentCuts = {
    Regular: "f0a18f1898aa4f5feda44c223d4ad4fa0ef2944a36d4b1eecd72d552eabb5172",
    Italic: "11168b3ba10ed4a8ee8de1bc8db4c8d1ee301e9cd5b491de5e710044bf30eef1",
    Retalic: "0beeaeca1d03fef9ea54813ffb0fb7566c3315a042af5784b06d40150cb81a99",
  };
  const css = readFileSync("src/app/globals.css", "utf8");
  for (const [cut, expectedHash] of Object.entries(currentCuts)) {
    const asset = `Grinder-Refined-${cut}.woff2`;
    const sitePath = `public/brand-fonts/louchi/${asset}`;
    assert.ok(existsSync(sitePath), `${asset} must ship with the guide`);
    assert.equal(createHash("sha256").update(readFileSync(sitePath)).digest("hex"), expectedHash);
    assert.ok(css.includes(`/brand-fonts/louchi/${asset}`), `${asset} must be active`);
    assert.ok(!existsSync(`public/fonts/${asset}`), `${asset} must stay outside package fonts`);
  }
});
