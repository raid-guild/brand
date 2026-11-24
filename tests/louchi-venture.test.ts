import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { BRAND_SYSTEM } from "../src/brand/system";

test("Louchi uses current display, body and navy night tokens without changing Suede", () => {
  const louchi = BRAND_SYSTEM.reigns.find((reign) => reign.id === "louchi")!;
  const suede = BRAND_SYSTEM.reigns.find((reign) => reign.id === "suede")!;
  assert.equal(louchi.typography.display, "Venture Beyond");
  assert.equal(louchi.typography.body, "Ubuntu");
  assert.equal(louchi.darkTokens?.["--background"], "#191e4e");
  assert.equal(suede.typography.display, "Mazius Display");
  assert.equal(suede.typography.body, "EB Garamond");
});

test("Venture specimens preserve retalic direction and CTA spacing", () => {
  const css = readFileSync("src/stories/brand/venture-elements.module.css", "utf8");
  assert.match(css, /font: 900 .*var\(--font-retalic\)/);
  assert.match(css, /font-family: var\(--font-venture-beyond\)/);
  assert.match(css, /font-synthesis: none/);
  assert.doesNotMatch(css, /font-synthesis: style/);
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

test("elastic gallery uses local fixtures", () => {
  const gallery = readFileSync("src/stories/brand/website-snapshot/ArtifactGallery.tsx", "utf8");
  assert.doesNotMatch(gallery, /fetch\s*\(/);
  assert.match(gallery, /lastWidth/);
  assert.match(gallery, /data-elastic-row/);
});

test("Venture Beyond web subsets ship pinned, licensed and active", () => {
  const subsets = {
    "VentureBeyond-Latin.woff2": "9e3a32c28f2ba7c1a4d5fd226b23ebd9a77bbfb3fd1dbd5b8c81a7abc7fff076",
    "VentureBeyond-Italic-Latin.woff2": "e73b3bcb057a50ae23e6949ead450ad48af1bd0d21a1045270799e4ed54310b9",
    "VentureBeyond-Retalic-Latin.woff2": "730d423e8bf0d4b5f4b4b78164416c7b7622b1c43c73cfe627bd12ecfb2d0802",
  };
  const css = readFileSync("src/app/globals.css", "utf8");
  const packageCss = readFileSync("packages/brand-system/src/fonts.css", "utf8");
  for (const [file, expectedHash] of Object.entries(subsets)) {
    const path = `public/fonts/venture-beyond/${file}`;
    assert.equal(createHash("sha256").update(readFileSync(path)).digest("hex"), expectedHash, `${file} must match its pinned build`);
    assert.ok(css.includes(`/fonts/venture-beyond/${file}`), `${file} must be active in the guide`);
    assert.ok(packageCss.includes(`./fonts/venture-beyond/${file}`), `${file} must be declared for package consumers`);
  }
  assert.match(readFileSync("public/fonts/venture-beyond/OFL.txt", "utf8"), /SIL OPEN FONT LICENSE Version 1\.1/);
  assert.match(readFileSync("typography/venture-beyond/LICENSE/OFL.txt", "utf8"), /Omnibus-Type/);
  assert.match(css, /font-family: "Venture Beyond Retalic"/);
  for (const face of ["Venture Beyond Extended", "Venture Beyond Retalic Extended"]) {
    assert.match(css, new RegExp(`font-family: "${face}";[^}]*font-stretch: 125%;[^}]*size-adjust: 105\\.4%`));
    assert.match(packageCss, new RegExp(`font-family: "${face}";[^}]*font-stretch: 125%;[^}]*size-adjust: 105\\.4%`));
  }
  for (const source of [css, packageCss]) {
    const extendedFaces = [...source.matchAll(/@font-face\s*\{[^}]*font-family: "Venture Beyond Extended";[^}]*\}/g)].map(([face]) => face);
    assert.equal(extendedFaces.length, 2, "Extended upright and native italic must both ship");
    assert.ok(extendedFaces.some((face) => /font-style: normal;/.test(face)), "Extended upright face must ship");
    assert.ok(extendedFaces.some((face) => /font-style: italic;/.test(face)), "Extended italic face must ship");
    assert.ok(extendedFaces.every((face) => /font-stretch: 125%;/.test(face) && /size-adjust: 105\.4%;/.test(face)));
  }
  assert.match(css, /Ubuntu-Variable\.ttf"\) format\("truetype"\); font-weight: 100 800;/);
  assert.match(css, /Ubuntu-Italic-Variable\.ttf"\) format\("truetype"\); font-weight: 100 800;/);
  assert.doesNotMatch(css, /Grinder-Refined/);
});

test("current Venture headings distinguish major display from cards", () => {
  const css = readFileSync("src/stories/brand/current-venture/venture.module.css", "utf8");
  const major = css.match(/\/\* Top lines\. \*\/([\s\S]*?)\/\* Section headings\. \*\//)?.[1];
  assert.ok(major, "current major-heading hierarchy must be defined");
  assert.match(major, /font-family: var\(--font-venture-beyond-retalic\)[^}]*font-weight: 900 !important; letter-spacing: 0 !important/);
  assert.match(major, /font-family: var\(--font-venture-beyond\)[^}]*font-style: italic !important; font-synthesis: none !important; font-weight: 900 !important; letter-spacing: 0 !important/);
  assert.match(css, /\.practiceCard h3, \.site \.footer > p \{ font-weight: 700; \}/);
});

test("Last Duel and Eurostile are fully retired from the active brand system", () => {
  const retired = /last.?duel|eurostile/i;
  const skip = new Set(["node_modules", ".git", ".next", "dist", "storybook-static"]);
  const offenders: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      if (skip.has(name)) continue;
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (retired.test(name)) offenders.push(path);
    }
  };
  for (const root of ["public", "assets", "scripts", "src", "packages", ".storybook"]) {
    if (existsSync(root)) walk(root);
  }
  assert.deepEqual(offenders, [], "no Last Duel or Eurostile font files, scripts or assets may remain");
  for (const file of ["src/app/globals.css", "packages/brand-system/src/fonts.css", "src/generated/brand-tokens.css", "src/brand/typography.ts"]) {
    assert.doesNotMatch(readFileSync(file, "utf8"), retired, `${file} must not reference Last Duel or Eurostile`);
  }
  const louchi = BRAND_SYSTEM.reigns.find((reign) => reign.id === "louchi")!;
  assert.doesNotMatch(JSON.stringify(louchi), retired);
});

test("audience hero marker never sits at the hero's foot beside the actions", () => {
  // The TRANSMISSION marker is hidden up to 600 px and must move into the scene from the
  // very next pixel. A gap between those breakpoints let it overlap "Explore our work"
  // between 601 and 760 px.
  const css = readFileSync("src/stories/brand/current-venture/venture.module.css", "utf8");
  const hiddenUpTo = Number(css.match(/@media \(max-width: (\d+)px\) \{(?:(?!@media)[\s\S])*?\.heroIndex \{ display: none; \}/)?.[1]);
  const movedFrom = Number(css.match(/@media \(min-width: (\d+)px\) \{\s*:global\(html\) \.site\.site\[data-audience\] \.heroIndex \{ bottom: 20px; grid-column: 1; grid-row: 1 \/ 2; top: auto; \}/)?.[1]);
  assert.ok(hiddenUpTo > 0 && movedFrom > 0, "both marker breakpoints must exist");
  assert.equal(movedFrom, hiddenUpTo + 1, "the marker must move into the scene where it stops being hidden");
});
