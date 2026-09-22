import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import ArtifactGallery, { type GalleryItem } from "./website-snapshot/ArtifactGallery";
import site from "./website-snapshot/HomeExperience.module.css";

const items: GalleryItem[] = Array.from({ length: 18 }, (_, index) => ({
  id: `specimen-${index}`, title: ["A field note from the frontier", "Portal Motion", "A longer experiment title that tests stable caption wrapping"][index % 3],
  category: index % 3 === 0 ? "Field note" : "Public experiment",
  kind: index % 3 === 0 ? "post" : "experiment",
  description: "Deterministic workshop specimen. Select cards to inspect the detail panel; filters keep this collection easy to explore. No live Portal data is requested.",
  image: ["/images/neo/field-protocol-garden.png", "/images/neo/sky-citadel.png", "/images/neo/hero-dark-poster.png"][index % 3],
  href: "https://portal.raidguild.org/modules",
}));
const collaborators: GalleryItem[] = [{ id: "guild", title: "Collaborator specimen", kind: "collaborator", category: "Built with", description: "Placeholder for a client or collaborator; not a new partnership claim.", image: "/assets/logos/symbol-black.svg" }];
function Gallery() { return <div className={site.site}><ArtifactGallery items={items} collaborators={collaborators} /></div>; }
const meta = { title: "Brand/Elastic Gallery", component: Gallery, parameters: { layout: "fullscreen", docs: { description: { component: "Website a00dd80. Adaptive columns, resting hover slots, fixed caption heights, sticky right-hand details; stacked below 800px. Native Grinder Retalic. Local fixtures only." } } } } satisfies Meta<typeof Gallery>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText("Follow your curiosity.")).toBeVisible();
  await userEvent.click(canvas.getAllByRole("button", { name: /Unfold/ })[0]);
  await expect(canvas.getByRole("button", { name: /Back to the collection/ })).toBeVisible();
  await userEvent.keyboard("{Escape}");
  await expect(canvas.getByText("Follow your curiosity.")).toBeVisible();
  await userEvent.click(canvas.getByRole("button", { name: "Built with" }));
  await expect(canvas.getAllByRole("button", { name: /Unfold/ })).toHaveLength(1);
} };
export const Night: Story = { globals: { appearance: "dark" } };
