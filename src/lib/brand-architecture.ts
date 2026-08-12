export const BRAND_ARCHITECTURE = {
  center: {
    name: "RaidGuild",
    role: "Center of gravity",
    description:
      "The builder-owned collective is the enduring engine: a shared talent pool, community, reputation, and home for ambitious applied-edge work.",
    publicHome: "https://www.raidguild.org/",
  },
  operatingLayer: {
    name: "RaidGuild LLC",
    description:
      "One legal and operational entity, registered through MiDAO. Contracts, treasury, and delivery workflows can run through the LLC even when a practice has its own positioning and visual identity.",
  },
  practices: {
    preferredTerm: "practice",
    internalMetaphor: "spear",
    description:
      "Specialized, independently led fronts that turn experiments and expertise from the builder pool into focused solutions. Practices may emerge, change, or retire without redefining the whole Guild.",
  },
  axes: {
    reign: {
      question: "When?",
      description:
        "A reign versions the Guild's identity over time. It records the collective visual and verbal work shaped under a steward's direction and preserves earlier expressions as history.",
    },
    practice: {
      question: "Where and for what?",
      description:
        "A practice identity differentiates a current area of expertise. Multiple practices can coexist during the same reign and may deliberately look different.",
    },
  },
  endorsement: {
    label: "A RaidGuild practice",
    rules: [
      "Use the recognizable crossed-swords mark or an approved practice variant.",
      "State the relationship in plain language: “A RaidGuild practice.”",
      "Make the shared operating layer legible where trust matters: “Operating through RaidGuild LLC.”",
      "Link back to RaidGuild.org and provide a clear route into the shared network or intake.",
      "Do not imply that one practice's visual system or specialty represents the entire Guild.",
    ],
  },
} as const;
