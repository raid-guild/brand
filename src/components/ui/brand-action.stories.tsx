import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { BrandAction, BrandButton } from "@raidguild/brand-system/components";
import "@raidguild/brand-system/brand-action.css";

function Actions() {
  return <div style={{display:"flex",flexWrap:"wrap",gap:24,padding:48,background:"#efe9d7"}}>
    <BrandAction href="#project-inquiry">Start a project</BrandAction>
    <BrandAction href="#spears" variant="secondary" direction="down-right">Explore services</BrandAction>
    <BrandButton type="button" onClick={() => {}}>Open preview</BrandButton>
    <BrandButton disabled>Unavailable</BrandButton>
  </div>;
}
const meta = { title: "Brand/Action", component: Actions, tags: ["stable"] } satisfies Meta<typeof Actions>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Actions />,play: async ({canvasElement}) => {
 const root=document.documentElement, original=root.dataset.theme;
 const primary=canvasElement.querySelector<HTMLElement>('.rg-brand-action[data-variant="primary"]')!;
 const secondary=canvasElement.querySelector<HTMLElement>('.rg-brand-action[data-variant="secondary"]')!;
 const disc=primary.querySelector<HTMLElement>('.rg-brand-action__disc')!;
 try {
  root.dataset.theme="light";
  expect(getComputedStyle(primary).borderColor).toBe("rgb(16, 45, 44)");
  expect(getComputedStyle(disc).backgroundColor).toBe("rgb(16, 45, 44)");
  expect(getComputedStyle(secondary).color).toBe("rgb(16, 45, 44)");
  root.dataset.theme="dark";
  expect(getComputedStyle(primary).borderColor).toBe("rgb(239, 233, 215)");
  expect(getComputedStyle(primary).color).toBe("rgb(18, 22, 59)");
  expect(getComputedStyle(disc).backgroundColor).toBe("rgb(18, 22, 59)");
  expect(getComputedStyle(secondary).color).toBe("rgb(239, 233, 215)");
 } finally {if(original)root.dataset.theme=original;else delete root.dataset.theme;}
}};
