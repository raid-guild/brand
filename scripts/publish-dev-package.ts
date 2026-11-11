import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  cp,
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const packageRoot = resolve(root, "packages/brand-system");
const outputRoot = resolve(root, "public/packages");

function getRevision() {
  const railwayRevision = process.env.RAILWAY_GIT_COMMIT_SHA?.trim();
  if (railwayRevision) return railwayRevision.slice(0, 7).toLowerCase();

  try {
    return execFileSync("git", ["rev-parse", "--short=7", "HEAD"], {
      cwd: root,
      encoding: "utf8",
    }).trim().toLowerCase();
  } catch {
    return "local";
  }
}

async function main() {
  const revision = getRevision().replace(/[^0-9a-z]/g, "");
  const stagingParent = await mkdtemp(resolve(tmpdir(), "raidguild-brand-system-"));
  const stagingRoot = resolve(stagingParent, "package");

  try {
  await mkdir(stagingRoot, { recursive: true });
  await cp(resolve(packageRoot, "dist"), resolve(stagingRoot, "dist"), {
    recursive: true,
  });
  await cp(resolve(packageRoot, "README.md"), resolve(stagingRoot, "README.md"));

  const packageJson = JSON.parse(
    await readFile(resolve(packageRoot, "package.json"), "utf8"),
  ) as Record<string, unknown> & { version: string };
  const baseVersion = packageJson.version.replace(/-.+$/, "");
  const version = `${baseVersion}-dev.sha${revision}`;
  packageJson.version = version;
  delete packageJson.scripts;
  delete packageJson.devDependencies;
  await writeFile(
    resolve(stagingRoot, "package.json"),
    `${JSON.stringify(packageJson, null, 2)}\n`,
  );

  await mkdir(outputRoot, { recursive: true });
  for (const file of await readdir(outputRoot)) {
    if (file.startsWith("raidguild-brand-system-") && file.endsWith(".tgz")) {
      await rm(resolve(outputRoot, file));
    }
  }

  const packOutput = execFileSync(
    "npm",
    ["pack", stagingRoot, "--pack-destination", outputRoot, "--ignore-scripts", "--json"],
    { cwd: root, encoding: "utf8" },
  );
  const [{ filename }] = JSON.parse(packOutput) as [{ filename: string }];
  const versionedTarball = resolve(outputRoot, basename(filename));
  const stableFilename = "raidguild-brand-system-dev.tgz";
  const stableTarball = resolve(outputRoot, stableFilename);
  await cp(versionedTarball, stableTarball);

  const tarball = await readFile(versionedTarball);
  const integrity = `sha512-${createHash("sha512").update(tarball).digest("base64")}`;
  const manifest = {
    name: "@raidguild/brand-system",
    channel: "development",
    version,
    revision,
    filename: basename(versionedTarball),
    downloadPath: `/packages/${basename(versionedTarball)}`,
    latestDevelopmentPath: `/packages/${stableFilename}`,
    integrity,
    install: `npm install https://raidguild-brand-guide-production.up.railway.app/packages/${basename(versionedTarball)}`,
  };
  await writeFile(
    resolve(outputRoot, "brand-system.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  console.log(`Published ${manifest.name}@${version} to ${manifest.downloadPath}`);
  } finally {
    await rm(stagingParent, { recursive: true, force: true });
  }
}

void main();
