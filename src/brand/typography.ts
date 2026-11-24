export const TYPOGRAPHY = {
  families: [
    { id: "display", name: "Venture Beyond", cssVariable: "--font-display", sourceVariable: "--font-venture-beyond", role: "Uppercase display and headlines use the Extended aliases (wdth 125, size-adjust 105.4%) from the merged website PR #111: native upright and Italic, plus separate Venture Beyond Retalic (10° reverse slant). Paired major display lines use Retalic above and native Italic below at weight 900, tracking 0; ordinary display and cards retain their own weights. The base families expose the full wght 100–900 and wdth 62–125 range for variable specimens. Never synthesize bold or italic. Open source (SIL Open Font License 1.1, derived from Archivo by Omnibus-Type). Archived reigns retain their fonts." },
    { id: "body", name: "Ubuntu", cssVariable: "--font-body", sourceVariable: "--font-ubuntu", role: "Louchi body copy and supporting UI text; archived reigns retain their fonts" },
    { id: "mono", name: "Ubuntu Mono", cssVariable: "--font-mono", sourceVariable: "--font-ubuntu-mono", role: "Compact utility, metadata, labels, identifiers, and numeric data" },
  ],
  scale: [
    { token: "Display Large", className: "type-display-lg", sizePx: 80, lineHeight: 1.1, letterSpacing: "-0.02em" },
    { token: "Display Medium", className: "type-display-md", sizePx: 60, lineHeight: 1.2, letterSpacing: "-0.01em" },
    { token: "Display Small", className: "type-display-sm", sizePx: 48, lineHeight: 1.2, letterSpacing: "0em" },
    { token: "Heading Large", className: "type-heading-lg", sizePx: 36, lineHeight: 1.2, letterSpacing: "0em" },
    { token: "Heading Medium", className: "type-heading-md", sizePx: 28, lineHeight: 1.3, letterSpacing: "0em" },
    { token: "Heading Small", className: "type-heading-sm", sizePx: 20, lineHeight: 1.4, letterSpacing: "0.01em" },
    { token: "Body Large", className: "type-body-lg", sizePx: 20, lineHeight: 1.4, letterSpacing: "0em" },
    { token: "Body Medium", className: "type-body-md", sizePx: 16, lineHeight: 1.6, letterSpacing: "0em" },
    { token: "Body Small", className: "type-body-sm", sizePx: 12, lineHeight: 1.6, letterSpacing: "0em" },
  ],
} as const;
