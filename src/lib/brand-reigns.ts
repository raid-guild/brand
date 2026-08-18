import { BRAND_REIGNS as GENERATED_BRAND_REIGNS, BRAND_SYSTEM } from "@/generated/brand-data";

export const BRAND_REIGN_STORAGE_KEY = BRAND_SYSTEM.reignStorageKey;
export const BRAND_REIGNS = GENERATED_BRAND_REIGNS;

export type BrandReign = (typeof BRAND_REIGNS)[number];
export type BrandReignId = BrandReign["id"];
export type BrandColor = BrandReign["palette"][number];

export const DEFAULT_BRAND_REIGN: BrandReignId = BRAND_SYSTEM.defaultReign;

export function isBrandReignId(value: string | null): value is BrandReignId {
  return BRAND_REIGNS.some((reign) => reign.id === value && reign.available);
}

export function getBrandReign(id: BrandReignId): BrandReign {
  return BRAND_REIGNS.find((reign) => reign.id === id) ?? BRAND_REIGNS[0];
}
