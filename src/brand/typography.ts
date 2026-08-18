export const TYPOGRAPHY = {
  families: [
    { id: "display", name: "Mazius Display", cssVariable: "--font-display", sourceVariable: "--font-mazius-display", role: "Display, headlines, and brand graphics" },
    { id: "body", name: "EB Garamond", cssVariable: "--font-body", sourceVariable: "--font-eb-garamond", role: "Body copy and supporting UI text" },
    { id: "mono", name: "Ubuntu Mono", cssVariable: "--font-mono", sourceVariable: "--font-ubuntu-mono", role: "Code and technical content" },
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
