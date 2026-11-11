"use client";

import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BRAND_SYSTEM } from "@/generated/brand-data";
import { useTheme } from "@/lib/theme-context";

const SUEDE_SCALE_NAMES = ["moloch", "scroll", "neutral"] as const;

function titleCase(value: string) {
  return value.replace(/(^|[- ])\w/g, (character) => character.toUpperCase());
}

const suedeScales = SUEDE_SCALE_NAMES.map((scale) => ({
  name: titleCase(scale),
  colors: Object.entries(BRAND_SYSTEM.baseTokens)
    .filter(([token]) => token.startsWith(`--${scale}-`))
    .map(([token, value]) => ({
      name: `${titleCase(scale)} ${titleCase(token.replace(`--${scale}-`, ""))}`,
      value,
      token,
    })),
}));

export default function ColorsPage() {
  const { brandReign } = useTheme();
  const isSuede = brandReign.id === "suede";

  return (
    <div className="container-custom py-16">
      <div className="mx-auto max-w-5xl">
        <p className="type-label-sm mb-3 text-primary">{brandReign.label}</p>
        <h1 className="type-display-lg mb-6">Colors</h1>
        <p className="type-body-lg mb-12 max-w-3xl text-muted-foreground">
          {brandReign.summary}
        </p>

        {isSuede ? (
          <div className="space-y-16">
            {suedeScales.map((scale) => (
              <section key={scale.name}>
                <h2 className="type-heading-lg mb-6">{scale.name} Color Scale</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                  {scale.colors.map((color) => (
                    <Card key={color.token} className="overflow-hidden">
                      <div
                        className="h-24 border-b border-border"
                        style={{ backgroundColor: color.value }}
                        aria-label={`${color.name}: ${color.value}`}
                      />
                      <CardContent className="p-4">
                        <h3 className="type-body-md">{color.name}</h3>
                        <p className="type-code-sm mt-1 text-muted-foreground">
                          {color.value.toUpperCase()}
                        </p>
                        <p className="type-code-sm mt-2 text-muted-foreground">
                          {color.token}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <section>
            <h2 className="type-heading-lg mb-6">Reign Palette</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {brandReign.palette.map((color) => (
                <Card key={color.name} className="overflow-hidden">
                  <div
                    className="h-36 border-b border-border"
                    style={{ backgroundColor: color.value }}
                    aria-label={`${color.name}: ${color.value}`}
                  />
                  <CardContent className="p-5">
                    <h3 className="type-heading-sm">{color.name}</h3>
                    <p className="type-code-md mt-1 text-muted-foreground">
                      {color.value.toUpperCase()}
                    </p>
                    <p className="type-body-sm mt-3 text-muted-foreground">
                      {color.role}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="type-heading-md">Implementation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="type-body-md text-muted-foreground">
              Components consume semantic tokens such as background, foreground,
              primary, accent, border, and ring. Selecting a reign remaps those
              semantics without changing component APIs.
            </p>
            <p className="type-body-md text-muted-foreground">
              Edit <code className="type-code-md">src/brand/system.ts</code> and
              run <code className="type-code-md">npm run generate:brand</code>.
              The resulting CSS is committed at{" "}
              <code className="type-code-md">src/generated/brand-tokens.css</code>.
            </p>
            <Link
              href="https://github.com/raid-guild/brand/blob/main/src/brand/system.ts"
              className="inline-block type-label-md text-primary hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              View the canonical source
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
