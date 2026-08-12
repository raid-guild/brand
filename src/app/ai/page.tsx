import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "RaidGuild AI — Practice Guidelines",
  description:
    "Design system for raidguild.ai, an endorsed RaidGuild practice with a deliberately distinct identity.",
};

const COLORS = [
  { name: "Background", hex: "#060609", hsl: "240 20% 3%", textOn: "#E8E6E3" },
  { name: "Card", hex: "#0D0D12", hsl: "240 15% 6%", textOn: "#E8E6E3" },
  { name: "Border", hex: "#202027", hsl: "240 10% 14%", textOn: "#E8E6E3" },
  { name: "Foreground", hex: "#E8E6E3", hsl: "30 10% 90%", textOn: "#060609" },
  { name: "Primary (teal)", hex: "#2FD09A", hsl: "160 63% 50%", textOn: "#060609" },
  { name: "Accent (pink)", hex: "#FF3863", hsl: "347 100% 61%", textOn: "#060609" },
  { name: "Muted foreground", hex: "#737B8C", hsl: "220 10% 50%", textOn: "#060609" },
];

const SYMBOL_FILES = [
  { file: "symbol-green.svg", label: "Green — primary, for dark backgrounds", bg: "#0D0D12" },
  { file: "symbol-pink.svg", label: "Pink — accent, for dark backgrounds", bg: "#0D0D12" },
  { file: "symbol-white.svg", label: "White — for dark backgrounds", bg: "#0D0D12" },
  { file: "symbol-black.svg", label: "Black — for rare light contexts", bg: "#E8E6E3" },
];

const LOCKUPS = [
  {
    name: "Wordmark",
    description: "Stacked display wordmark, no mark.",
    width: 554,
    height: 166,
    files: [
      { file: "logo-RG-AI-green.svg", color: "Green" },
      { file: "logo-RG-AI-pink.svg", color: "Pink" },
    ],
  },
  {
    name: "Full Lockup",
    description: "Wordmark with the crossed-swords mark.",
    width: 584,
    height: 110,
    files: [
      { file: "logo-RG-AI-lg-green.svg", color: "Green" },
      { file: "logo-RG-AI-lg-pink.svg", color: "Pink" },
    ],
  },
  {
    name: "Modern Lockup",
    description:
      "Single-line sans-serif wordmark with the mark — matches this page's own typography.",
    width: 788,
    height: 105,
    files: [
      { file: "logo-RG-AI-mod-green.svg", color: "Green" },
      { file: "logo-RG-AI-mod-pink.svg", color: "Pink" },
    ],
  },
];

export default function AiPracticePage() {
  return (
    <div className={`${inter.className} min-h-screen w-full bg-[#060609] text-[#E8E6E3]`}>
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Hero */}
        <section className="mb-20">
          <p className="text-sm tracking-wide text-[#737B8C] mb-3">
            <Link href="/" className="hover:text-[#2FD09A] transition-colors">
              ← Main RaidGuild brand system
            </Link>
          </p>
          <h1
            className={`${spaceGrotesk.className} text-4xl md:text-5xl font-bold mb-4`}
          >
            RaidGuild AI — Practice Guidelines
          </h1>
          <p className="text-lg text-[#E8E6E3] max-w-2xl">
            The design system for raidguild.ai, a specialized practice backed
            by RaidGuild&apos;s builder network and operating layer. Its distinct
            voice is intentional.
          </p>
        </section>

        {/* Relationship to RaidGuild */}
        <section className="mb-20 pb-16 border-b border-[#202027]">
          <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-4`}>
            Relationship to RaidGuild
          </h2>
          <p className="text-[#E8E6E3] max-w-2xl mb-4">
            raidguild.ai is a focused expression for applied AI work: dark,
            technical, and deliberately distinct from the Guild&apos;s atmospheric
            umbrella identity.
          </p>
          <p className="text-[#737B8C] max-w-2xl">
            It is not a separate organization. It is an endorsed RaidGuild
            practice drawing from the same builder pool and operating through
            RaidGuild LLC. raidguild.ai and its sub-pages use this system; the
            Guild-level identity is documented at{" "}
            <Link href="/" className="text-[#2FD09A] hover:underline">
              brand.raidguild.org
            </Link>
            . They need clear provenance, not identical styling. See the{" "}
            <Link href="/architecture" className="text-[#2FD09A] hover:underline">
              brand architecture
            </Link>
            .
          </p>
        </section>

        {/* Logo */}
        <section className="mb-20 pb-16 border-b border-[#202027]">
          <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-4`}>
            Logo
          </h2>
          <p className="text-[#737B8C] max-w-2xl mb-8">
            The RaidGuild AI crossed-swords mark, in four color variants, and
            three lockup treatments pairing the mark with the wordmark.
          </p>

          <h3 className="text-sm tracking-wide text-[#737B8C] mb-4">Symbol</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {SYMBOL_FILES.map((logo) => (
              <div key={logo.file} className="border border-[#202027] rounded-lg p-6">
                <div
                  className="rounded-md flex items-center justify-center h-32 mb-4"
                  style={{ backgroundColor: logo.bg }}
                >
                  <Image
                    src={`/assets/logos/ai/${logo.file}`}
                    alt={logo.label}
                    width={64}
                    height={60}
                  />
                </div>
                <p className="text-sm text-[#E8E6E3] mb-1">{logo.label}</p>
                <a
                  href={`/assets/logos/ai/${logo.file}`}
                  download
                  className="text-sm text-[#2FD09A] hover:underline"
                >
                  Download SVG
                </a>
              </div>
            ))}
          </div>

          <h3 className="text-sm tracking-wide text-[#737B8C] mb-4">Lockups</h3>
          <div className="space-y-8">
            {LOCKUPS.map((lockup) => (
              <div key={lockup.name}>
                <p className="text-sm text-[#E8E6E3] mb-1">{lockup.name}</p>
                <p className="text-sm text-[#737B8C] mb-4">{lockup.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lockup.files.map((item) => (
                    <div key={item.file} className="border border-[#202027] rounded-lg p-6">
                      <div className="rounded-md flex items-center justify-center bg-[#0D0D12] p-6 mb-4">
                        <Image
                          src={`/assets/logos/ai/${item.file}`}
                          alt={`${lockup.name} — ${item.color}`}
                          width={lockup.width}
                          height={lockup.height}
                          className="w-full h-auto"
                        />
                      </div>
                      <p className="text-sm text-[#E8E6E3] mb-1">{item.color}</p>
                      <a
                        href={`/assets/logos/ai/${item.file}`}
                        download
                        className="text-sm text-[#2FD09A] hover:underline"
                      >
                        Download SVG
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Colors */}
        <section className="mb-20 pb-16 border-b border-[#202027]">
          <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-4`}>
            Colors
          </h2>
          <p className="text-[#737B8C] max-w-2xl mb-8">
            Extracted from the live raidguild.ai stylesheet. The accent pink
            (#FF3863) lands almost exactly on the pre-2024-refresh RaidGuild
            red (#FF3864) — unintentional, and a nice coincidence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLORS.map((color) => (
              <div key={color.name} className="border border-[#202027] rounded-lg overflow-hidden">
                <div
                  className="h-20 flex items-center justify-center font-medium"
                  style={{ backgroundColor: color.hex, color: color.textOn }}
                >
                  {color.name}
                </div>
                <div className="p-4">
                  <p className={`${jetbrainsMono.className} text-sm text-[#E8E6E3]`}>
                    {color.hex}
                  </p>
                  <p className={`${jetbrainsMono.className} text-xs text-[#737B8C]`}>
                    hsl({color.hsl})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-20 pb-16 border-b border-[#202027]">
          <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-4`}>
            Typography
          </h2>
          <p className="text-[#737B8C] max-w-2xl mb-8">
            Three families: Space Grotesk for display, Inter for body,
            JetBrains Mono for code. No Mazius Display, no EB Garamond, no
            Ubuntu Mono — that&apos;s the main brand.
          </p>
          <div className="space-y-8">
            <div>
              <p className="text-xs text-[#737B8C] mb-2">Space Grotesk — display</p>
              <p className={`${spaceGrotesk.className} text-4xl font-bold`}>
                Forward Deployed AI
              </p>
            </div>
            <div>
              <p className="text-xs text-[#737B8C] mb-2">Inter — body</p>
              <p className={`${inter.className} text-lg max-w-xl`}>
                Intelligence embedded where the work gets done. RaidGuild AI
                places builders and operators inside your stack to design,
                ship, and maintain practical AI workflows.
              </p>
            </div>
            <div>
              <p className="text-xs text-[#737B8C] mb-2">JetBrains Mono — code</p>
              <p className={`${jetbrainsMono.className} text-base bg-[#0D0D12] border border-[#202027] rounded-md p-4 inline-block`}>
                const agent = deploy(stack);
              </p>
            </div>
          </div>
        </section>

        {/* Voice */}
        <section className="mb-20 pb-16 border-b border-[#202027]">
          <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-4`}>
            Voice
          </h2>
          <p className="text-[#737B8C] max-w-2xl mb-6">
            Technical, direct, minimal. No fantasy register — that&apos;s the
            whole point of the contrast.
          </p>
          <ul className="space-y-2 text-[#E8E6E3]">
            <li>Say what the system does, not what it conquers.</li>
            <li>Name the technology. Skip the metaphor.</li>
            <li>Short sentences. No mercenaries, no quests, no guilds.</li>
          </ul>
        </section>

        {/* Resources */}
        <section>
          <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-4`}>
            Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://www.raidguild.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 border border-[#202027] rounded-lg hover:border-[#2FD09A] transition-colors"
            >
              <h3 className="font-medium mb-1">raidguild.ai</h3>
              <p className="text-sm text-[#737B8C]">The live site</p>
            </a>
            <a
              href="https://github.com/raid-guild/ai-solutions-website"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 border border-[#202027] rounded-lg hover:border-[#2FD09A] transition-colors"
            >
              <h3 className="font-medium mb-1">ai-solutions-website</h3>
              <p className="text-sm text-[#737B8C]">Source repo</p>
            </a>
            <Link
              href="/"
              className="p-6 border border-[#202027] rounded-lg hover:border-[#2FD09A] transition-colors"
            >
              <h3 className="font-medium mb-1">Main brand system</h3>
              <p className="text-sm text-[#737B8C]">brand.raidguild.org</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
