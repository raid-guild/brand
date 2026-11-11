"use client";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { addons } from "storybook/preview-api";
import { UPDATE_GLOBALS } from "storybook/internal/core-events";
import { expect, userEvent, within } from "storybook/test";
import Sigil from "./current-venture/primitives/Sigil";
import { BrandAction, BrandButton } from "@raidguild/brand-system/components";
import "@raidguild/brand-system/brand-action.css";
import "./current-venture/snapshot.css";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SnapshotShell } from "./current-venture/shell/VentureShell";
import styles from "./current-venture/venture.module.css";
import Hero from "./current-venture/sections/Hero";
import GuildTicker from "./current-venture/sections/GuildTicker";
import GuildPrologue from "./current-venture/sections/GuildPrologue";
import FeatureGallery from "./current-venture/sections/FeatureGallery";
import ClientReasons from "./current-venture/sections/ClientReasons";
import PreviousWorks from "./current-venture/sections/PreviousWorks";
import BuilderNetwork from "./current-venture/sections/BuilderNetwork";
import Stewardship from "./current-venture/sections/Stewardship";
import Faq from "./current-venture/sections/Faq";
import GuildInquiry from "./current-venture/sections/GuildInquiry";
import Creed from "./current-venture/sections/Creed";
import ImmersiveFeature from "./current-venture/sections/ImmersiveFeature";
import HatsTree from "./current-venture/sections/HatsTree";
import MemberBenefits from "./current-venture/sections/MemberBenefits";
import WallOfCuriosities from "./current-venture/sections/WallOfCuriosities";
import JoinCTA from "./current-venture/sections/JoinCTA";
import { clientsCreed, clientsFaq, clientsHero, clientsInquiry, clientsNav, clientsPreviousWorks, clientsReasons, clientsServiceGallery } from "./current-venture/narrative/clients";
import { buildersClients, peopleClients, buildersCommunity } from "./current-venture/narrative/shared";
import { communityActivity, communityBenefits, communityCapabilities, communityCreed, communityFaq, communityGuild, communityHats, communityHero, communityJoin, communityNav, communityMoloch, communityRaidaFeature } from "./current-venture/narrative/community";
import { crewHorizontal, foundryPortrait, molochArtwork, queenRaidaArtwork } from "./current-venture/data/illustrations";
import { forAudience } from "./current-venture/narrative/public";

function Frame({children,audience}:{children:ReactNode;audience:"clients"|"community"}) {
 const [isNight,setIsNight]=useState(false);
 useEffect(()=>{const sync=()=>setIsNight(document.documentElement.dataset.theme==="dark");sync();const observer=new MutationObserver(sync);observer.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});return()=>observer.disconnect()},[]);
 const setAppearance=(appearance:"light"|"dark")=>addons.getChannel().emit(UPDATE_GLOBALS,{globals:{appearance}});
 const [menuOpen,setMenuOpen]=useState(false);
 const [report,setReport]=useState("Choose an action to see its intended destination. No navigation or submission occurs in this guide.");
 const capture=(event:MouseEvent<HTMLDivElement>)=>{const anchor=(event.target as HTMLElement).closest("a");if(anchor){setMenuOpen(false);const href=anchor.getAttribute("href")||"";if(href.startsWith("#") && href!=="#clients" && href!=="#community"){event.preventDefault();document.getElementById(href.slice(1))?.scrollIntoView({block:"start"});setReport(`Section: ${href.slice(1)}`)}else{event.preventDefault();setReport(`${anchor.textContent?.trim()||"Link"} → ${href||"destination"}`)}}};
 return <SnapshotShell onReport={setReport}><div className={styles.site} data-audience={audience} data-cta="semantic" onClickCapture={capture}>
   <a className={styles.skipLink} href="#snapshot-main">Skip to content</a>
   <header className={`${styles.header} ${styles.headerWithSwitch}`}><div className={styles.topBar}><a className={styles.brand} href="#top" aria-label="RaidGuild"><Sigil/><span>RAID<br/>GUILD</span></a><div className={styles.audienceSwitch} role="group" aria-label="Choose your RaidGuild experience"><a href="#clients" aria-current={audience==="clients"?"page":undefined}>Hire the DAO</a><a href="#community" aria-current={audience==="community"?"page":undefined}>Join the DAO</a></div><div className={styles.themeSwitch} role="group" aria-label="Theme"><button type="button" aria-pressed={!isNight} onClick={()=>setAppearance("light")}><i className={styles.iconSun} aria-hidden="true"/><span>Day</span></button><button type="button" aria-pressed={isNight} onClick={()=>setAppearance("dark")}><i className={styles.iconMoon} aria-hidden="true"/><span>Night</span></button></div><button className={styles.themeToggle} type="button" role="switch" aria-checked={isNight} aria-label="Night theme" onClick={()=>setAppearance(isNight?"light":"dark")}><i className={styles.iconSun} aria-hidden="true"/><i className={styles.iconMoon} aria-hidden="true"/></button></div><nav id="current-story-navigation" className={`${styles.nav} current-story-nav ${menuOpen?styles.navOpen:""}`} data-open={menuOpen} aria-label="Current section navigation">{(audience==="clients"?clientsNav:communityNav).items.map(item=><a key={item.label.id} href={`#${item.section}`}>{item.label.text}</a>)}<a href="#contact">{(audience==="clients"?clientsNav:communityNav).cta.label.text}</a></nav><button className={styles.menuButton} type="button" aria-expanded={menuOpen} aria-controls="current-story-navigation" aria-label="Toggle navigation" onClick={()=>setMenuOpen(open=>!open)}><span/><span/></button></header>
   <main id="snapshot-main">{children}</main>
   <p role="status" aria-live="polite" style={{padding:"16px 24px",font:"14px Ubuntu Mono,monospace",background:"#efe9d7",color:"#102d2c"}}>{report}</p>
 </div></SnapshotShell>;
}
function Clients(){return <Frame audience="clients"><Hero content={forAudience(clientsHero)} grouped curtain still/><GuildTicker/><FeatureGallery id="spears" anchors={["services","capabilities"]} content={forAudience(clientsServiceGallery)} tone="services"/><ClientReasons id="why-raidguild" content={forAudience(clientsReasons)}/><PreviousWorks content={forAudience(clientsPreviousWorks)} rotate/><BuilderNetwork content={forAudience(buildersClients)} illustration={crewHorizontal} masonry/><Stewardship content={forAudience(peopleClients)} titles="professional"/><Faq id="faq" content={forAudience(clientsFaq)} illustration={foundryPortrait}/><GuildInquiry content={forAudience(clientsInquiry)} surface="cyan"/><Creed content={forAudience(clientsCreed)}/></Frame>}
function Community(){return <Frame audience="community"><Hero content={forAudience(communityHero)} grouped curtain still/><GuildTicker/><GuildPrologue content={forAudience(communityGuild)} metrics={false} kitExpander/><FeatureGallery id="spears" anchors={["services","capabilities"]} content={forAudience(communityCapabilities)} tone="services"/><ImmersiveFeature id="raida" content={forAudience(communityRaidaFeature)} artwork={queenRaidaArtwork} tone="raida"/><ImmersiveFeature id="moloch" content={forAudience(communityMoloch)} artwork={molochArtwork} tone="moloch"/><HatsTree content={forAudience(communityHats)}/><MemberBenefits id="benefits" content={forAudience(communityBenefits)}/><BuilderNetwork content={forAudience(buildersCommunity)} illustration={crewHorizontal} masonry/><WallOfCuriosities content={forAudience(communityActivity.collection)}/><JoinCTA content={forAudience(communityJoin)}/><Faq id="faq" content={forAudience(communityFaq)} illustration={foundryPortrait}/><Creed content={forAudience(communityCreed)}/></Frame>}
const meta={title:"Brand/Current Venture Beyond",component:Clients,parameters:{layout:"fullscreen",docs:{description:{component:"Source: raid-guild/website review/venture-beyond-redesign at 7d0e878. Current Clients and Community compositions with local navigation and inquiry previews."}}}} satisfies Meta<typeof Clients>;
export default meta;
type Story=StoryObj<typeof meta>;
export const ClientsComposition:Story={render:()=> <Clients/>};
export const CommunityComposition:Story={render:()=> <Community/>};
export const HeroAndAudienceShell:Story={render:()=> <Frame audience="clients"><Hero content={forAudience(clientsHero)} grouped curtain still/><GuildTicker/></Frame>};
export const ServicesAndReasons:Story={render:()=> <Frame audience="clients"><FeatureGallery id="spears" content={forAudience(clientsServiceGallery)} tone="services"/><ClientReasons id="why-raidguild" content={forAudience(clientsReasons)}/></Frame>};
export const ProjectsAndBuilderNetwork:Story={render:()=> <Frame audience="community"><WallOfCuriosities content={forAudience(communityActivity.collection)}/><BuilderNetwork content={forAudience(buildersCommunity)} illustration={crewHorizontal} masonry/></Frame>};
export const HatsBenefitsAndJoin:Story={render:()=> <Frame audience="community"><HatsTree content={forAudience(communityHats)}/><MemberBenefits id="benefits" content={forAudience(communityBenefits)}/><JoinCTA content={forAudience(communityJoin)}/></Frame>};
export const InquiryPreview:Story={render:()=> <Frame audience="clients"><GuildInquiry content={forAudience(clientsInquiry)} surface="cyan"/></Frame>,play:async({canvasElement})=>{
 const canvas=within(canvasElement);
 const form=canvasElement.querySelector(".current-inquiry-preview form")!;
 await userEvent.type(form.querySelector<HTMLInputElement>('input[name="name"]')!,"Ada Builder");
 await userEvent.type(form.querySelector<HTMLInputElement>('input[name="email"]')!,"ada@example.org");
 await userEvent.type(form.querySelector<HTMLTextAreaElement>('textarea[name="bio"]')!,"Engineering lead");
 await userEvent.click(canvas.getByRole("button",{name:"Next"}));
 await userEvent.type(form.querySelector<HTMLInputElement>('input[name="projectName"]')!,"Workflow prototype");
 await userEvent.type(form.querySelector<HTMLTextAreaElement>('textarea[name="description"]')!,"Guided build sessions");
 await userEvent.click(canvas.getByRole("button",{name:"Back"}));
 await expect(form.querySelector<HTMLInputElement>('input[name="name"]')).toHaveValue("Ada Builder");
 await userEvent.click(canvas.getByRole("button",{name:"Next"}));
 await expect(form.querySelector<HTMLInputElement>('input[name="projectName"]')).toHaveValue("Workflow prototype");
 await userEvent.click(canvas.getByRole("button",{name:"Next"}));
 await userEvent.selectOptions(form.querySelector<HTMLSelectElement>('select[name="budget"]')!,"< $5k");
 await userEvent.selectOptions(form.querySelector<HTMLSelectElement>('select[name="timeline"]')!,"1-3 months");
 await userEvent.click(canvas.getByRole("button",{name:"Preview inquiry"}));
 await expect(canvas.getByRole("alert")).toHaveTextContent("Select at least one service");
 await userEvent.click(form.querySelector<HTMLInputElement>('input[name="services"]')!);
 await userEvent.click(canvas.getByRole("button",{name:"Preview inquiry"}));
 await expect(await canvas.findByText("Preview complete. No information was sent to RaidGuild.")).toBeVisible();
}};

export const ActionContract:Story={render:()=> <Frame audience="clients"><section style={{background:"#efe9d7",padding:"64px 24px",display:"flex",flexWrap:"wrap",gap:24}}><BrandAction href="#contact">Start a project</BrandAction><BrandAction href="#contact" variant="secondary" direction="down-right">Read the brief</BrandAction><BrandButton onClick={()=>{}} direction="right">Open preview</BrandButton><BrandButton disabled>Unavailable</BrandButton></section></Frame>};
