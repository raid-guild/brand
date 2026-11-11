import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { createRequire } from "node:module";

const packageRoot = resolve(import.meta.dirname, "..");
const requiredFiles = [
  "dist/index.js",
  "dist/index.cjs",
  "dist/index.d.ts",
  "dist/components.js",
  "dist/components.cjs",
  "dist/components.d.ts",
  "dist/tokens.css",
  "dist/fonts.css",
  "dist/fonts/EBGaramond-VariableFont_wght.ttf",
  "dist/fonts/UbuntuMono-Regular.ttf",
  "dist/fonts/UbuntuMono-Bold.ttf",
  "dist/fonts/UbuntuMono-UFL.txt",
  "dist/logos/symbol-black.svg",
];

for (const file of requiredFiles) {
  assert.ok(existsSync(resolve(packageRoot, file)), `missing package file: ${file}`);
}

const packOutput = execFileSync(
  "npm",
  ["pack", "--dry-run", "--json", "--ignore-scripts"],
  { cwd: packageRoot, encoding: "utf8" },
);
const [{ files }] = JSON.parse(packOutput) as [{ files: Array<{ path: string }> }];
const packedPaths = new Set(files.map(({ path }) => path));

for (const file of requiredFiles) {
  assert.ok(packedPaths.has(file), `tarball omits package file: ${file}`);
}

const esm = await import(resolve(packageRoot, "dist/index.js"));
assert.equal(esm.DEFAULT_BRAND_REIGN, "louchi");
assert.equal(esm.getBrandReign("louchi").maturity, "development");
const esmComponents = await import(resolve(packageRoot, "dist/components.js"));
assert.ok(esmComponents.Button);

const require = createRequire(import.meta.url);
const cjs = require(resolve(packageRoot, "dist/index.cjs"));
assert.equal(cjs.DEFAULT_BRAND_REIGN, "louchi");
const cjsComponents = require(resolve(packageRoot, "dist/components.cjs"));
assert.ok(cjsComponents.Button);

console.log("Package tarball and ESM/CJS entry points are valid.");
