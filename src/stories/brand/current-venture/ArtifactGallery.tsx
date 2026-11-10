"use client";
export type GalleryItem = { id: string; title: string; category: string; description: string; image?: string | null; href?: string; kind?: "post" | "collaborator" | "experiment" };

// Exported (November 3) so the /community project explorer reuses the same entries; behaviour here is unchanged.
export const guildPortal: GalleryItem = {
  id: "raidguild-portal", title: "The Portal", category: "Interactive experience",
  description: "Step into RaidGuild's world and follow the rabbit to begin a three-clue discovery trail through the site.",
  image: "/images/neo/hero-dark-poster.png", kind: "experiment",
};
export const fallbackArtifacts: GalleryItem[] = [
  { id: "sirocco-oasis", title: "Sirocco Oasis", category: "3D world", description: "A desert reverie with rippling water, wind-driven palms, and a passing airship. Take a moment to explore." },
  { id: "lunar-republic", title: "Lunar Republic", category: "Game", description: "A lunar catapult game with allied cities, freight, upgrades, and a landscape that changes as you play." },
  { id: "portal-motion", title: "Portal Motion", category: "Motion study", description: "Explore the light, color, and energy behind a portal. An interactive study with palette and size controls." },
  { id: "cosmic-carnival", title: "Cosmic Carnival", category: "Arcade game", description: "A twelve-lane alien arcade shooter with sculptural characters, patterned waves, and a psychedelic title reveal." },
  { id: "module-gallery-study", title: "Elastic Gallery", category: "Interface study", description: "The expanding-grid experiment behind this collection. Unfold an editorial mosaic or explore its alternative spatial view. The original study uses sample modules." },
  { id: "desert-walker", title: "Desert Walker", category: "3D vignette", description: "A dieselpunk survey walker in a procedural desert. Orbit the scene and explore its ambient motion." },
];



export default function ArtifactGallery(_: {collaborators?:GalleryItem[];showFeatured?:boolean;onOpenPortal?:()=>void}){return <div>{fallbackArtifacts.map(item=><article key={item.id}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>}
