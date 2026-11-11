import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

const workshopPath = "/story/brand-workshop--default";

if (typeof window !== "undefined") {
  const url = new URL(window.location.href);

  if (!url.searchParams.has("path")) {
    url.searchParams.set("path", workshopPath);
    window.location.replace(url.toString());
  }
}

addons.setConfig({
  panelPosition: "bottom",
  theme: create({
    base: "light",
    brandTitle: "RaidGuild Component Workshop",
    brandUrl: `/?path=${workshopPath}`,
    colorPrimary: "#ee3c78",
    colorSecondary: "#0a292b",
  }),
});
