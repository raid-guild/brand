import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("development package publication is versioned and installable", async () => {
  const manifest = JSON.parse(
    await readFile("public/packages/brand-system.json", "utf8"),
  );
  const tarballPath = `public${manifest.downloadPath}`;
  const packedPackage = JSON.parse(
    execFileSync("tar", ["-xOf", tarballPath, "package/package.json"], {
      encoding: "utf8",
    }),
  );

  assert.equal(manifest.name, "@raidguild/brand-system");
  assert.equal(manifest.channel, "development");
  assert.match(manifest.version, /^0\.1\.0-dev\.sha[0-9a-z]+$/);
  assert.equal(packedPackage.name, manifest.name);
  assert.equal(packedPackage.version, manifest.version);
  assert.match(manifest.integrity, /^sha512-/);
});
