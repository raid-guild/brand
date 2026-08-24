import { cp, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const packageRoot = resolve(import.meta.dirname, "..");
const repositoryRoot = resolve(packageRoot, "../..");
const outputRoot = resolve(packageRoot, "dist");

await mkdir(outputRoot, { recursive: true });
await cp(
  resolve(repositoryRoot, "src/generated/brand-tokens.css"),
  resolve(outputRoot, "tokens.css"),
);
await cp(resolve(repositoryRoot, "public/fonts"), resolve(outputRoot, "fonts"), {
  recursive: true,
});
await cp(
  resolve(repositoryRoot, "public/assets/logos"),
  resolve(outputRoot, "logos"),
  { recursive: true },
);
