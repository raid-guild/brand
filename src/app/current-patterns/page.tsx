import Link from "next/link";

const story = (name: string) => `https://brand-storybook-production.up.railway.app/?path=/story/brand-current-venture-beyond--${name}`;
const sections = [
  ["Clients composition", "clients-composition", "Hero and audience shell; services, reasons, previous work, builders, stewardship, FAQ, and inquiry."],
  ["Community composition", "community-composition", "Hero; Guild introduction; services and characters; hats, benefits, projects, builders, join, and FAQ."],
  ["Hero and audience shell", "hero-and-audience-shell", "Current heading cuts, curtain, art, announcement ticker, navigation, and appearance."],
  ["Services and reasons", "services-and-reasons", "Current feature gallery and client disclosure pattern."],
  ["Projects and builders", "projects-and-builder-network", "Interactive project explorer and builder network."],
  ["Hats, benefits, and join", "hats-benefits-and-join", "Community pathways, membership benefits, and join action."],
  ["Inquiry preview", "inquiry-preview", "Local-only form layout and validation."],
  ["Action contract", "action-contract", "Packaged branded anchor and button variants with inline sword glyph."],
] as const;

export default function CurrentPatternsPage() {
  return <main className="container-custom" style={{paddingBlock:"clamp(48px,8vw,96px)",maxWidth:1050}}>
    <p className="type-label">Louchi / Venture Beyond</p>
    <h1 className="type-display-md">Current patterns</h1>
    <p className="type-body-lg" style={{maxWidth:760}}>These stories reproduce the current Clients and Community website sections with local adapters for review. The source is <a href="https://github.com/raid-guild/website/tree/7d0e878065a566207884a37b6281158d26c8ae88">raid-guild/website at 7d0e878</a> on <code>review/venture-beyond-redesign</code>. Navigation reports its intended destination; forms and project links do not submit or open a live service.</p>
    <p><Link href="/ui">UI components</Link> · <Link href="/typography">Typography</Link></p>
    <h2 className="type-heading-md" style={{marginTop:48}}>Website compositions and patterns</h2>
    <ul style={{display:"grid",gap:20,listStyle:"none",padding:0,marginTop:24}}>{sections.map(([label,id,description])=><li key={id} style={{border:"1px solid currentColor",borderRadius:12,padding:24}}><h3 className="type-heading-sm"><a href={story(id)}>{label} ↗</a></h3><p>{description}</p></li>)}</ul>
    <h2 className="type-heading-md" style={{marginTop:48}}>Use the packaged action</h2>
    <p>The current pink and secondary pills are available from <code>@raidguild/brand-system/components</code>. Import the dedicated stylesheet once. The generic Button remains available for other UI.</p>
    <pre style={{overflowX:"auto",padding:24,borderRadius:12,background:"#102d2c",color:"#efe9d7"}}><code>{`import { BrandAction, BrandButton } from "@raidguild/brand-system/components";
import "@raidguild/brand-system/brand-action.css";

<BrandAction href="/contact">Start a project</BrandAction>
<BrandAction href="/about" variant="secondary" direction="down-right">Read more</BrandAction>
<BrandButton type="button" onClick={openPreview}>Open preview</BrandButton>`}</code></pre>
    <p>Last Duel faces in the guide are licensed, guide-only assets. Consumers use the packaged font fallback unless they supply appropriately licensed faces. See <a href="https://github.com/raid-guild/brand/blob/feat/versioned-brand-reigns/docs/package-contract.md">package contract</a> for installation and versioning.</p>
    <p>Older <em>Hero Discovery</em> and <em>Elastic Gallery</em> stories document September workshop studies. Use the current stories above for new website work.</p>
  </main>;
}
