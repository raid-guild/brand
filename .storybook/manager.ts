import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  panelPosition: "bottom",
  theme: create({
    base: "light",
    brandTitle: "RaidGuild Component Workshop",
    brandUrl: "/",
    colorPrimary: "#ee3c78",
    colorSecondary: "#0a292b",
  }),
});
