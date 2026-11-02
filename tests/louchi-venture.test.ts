import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { BRAND_SYSTEM } from "../src/brand/system";

test("Louchi uses current display, body and navy night tokens without changing Suede", () => {
  const louchi = BRAND_SYSTEM.reigns.find((reign) => reign.id === "louchi")!;
  const suede = BRAND_SYSTEM.reigns.find((reign) => reign.id === "suede")!;
  assert.equal(louchi.typography.display, "Last Duel");
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
    Ex2: "9850106345cdbe26708d583634c61d7eac9be185750b80cafb3b43b74c1a25c5",
    BoldEx2: "076237f54bf073c687ba6384a7264a86ce26fa38c2391a98aa1be6c1d975c91a",
    Oblique: "b0c96669bbe7e1c782ce4b49c9f560b2e9cac7d1b46c7d114230fc05c7412bd3",
    BoldOblique: "317d7bf939b170a029e88ccc33def53adff6e20834a28965c032a978437a5d08",
    Ex2Retalic: "b1d90f4cd7c0171c04aabdb2c463dfa71020419b5ab171171d84a70e81d0152b",
    BoldEx2Retalic: "8a8fc472161804caf5d29f0818a861ceba8300aa911e4df39f699cd76f3bb9db",
  };
  const css = readFileSync("src/app/globals.css", "utf8");
  for (const [cut, expectedHash] of Object.entries(currentCuts)) {
    const asset = `LastDuel-${cut}.woff2`;
    const sitePath = `public/brand-fonts/louchi/${asset}`;
    assert.ok(existsSync(sitePath), `${asset} must ship with the guide`);
    assert.equal(createHash("sha256").update(readFileSync(sitePath)).digest("hex"), expectedHash);
    assert.ok(css.includes(`/brand-fonts/louchi/${asset}`), `${asset} must be active`);
    assert.ok(!existsSync(`public/fonts/${asset}`), `${asset} must stay outside package fonts`);
    assert.ok(existsSync(`assets/fonts/last-duel/LastDuel-${cut}.otf`), `${cut} source must be retained`);
    assert.ok(!existsSync(`public/brand-fonts/louchi/source/LastDuel-${cut}.otf`), `${cut} source must not deploy`);
    assert.ok(!existsSync(`public/brand-fonts/louchi/LastDuel-${cut}.ttf`), `${cut} print font must not deploy`);
  }
  assert.doesNotMatch(css, /Grinder-Refined/);

});
