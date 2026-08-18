import type { Preview } from "@storybook/nextjs-vite";
import { ThemeProvider } from "../src/lib/theme-context";
import { maziusDisplay, ebGaramond, ubuntuMono } from "../src/lib/fonts";
import "../src/app/globals.css";

const fontClasses = `${maziusDisplay.variable} ${ebGaramond.variable} ${ubuntuMono.variable}`;

const preview: Preview = {
  globalTypes: {
    brandReign: {
      description: "Brand steward reign",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "louchi", title: "Louchi" },
          { value: "suede", title: "Suede" },
          { value: "tw", title: "TW" },
          { value: "ven", title: "Ven" },
        ],
        dynamicTitle: true,
      },
    },
    appearance: {
      description: "Semantic surface appearance",
      toolbar: {
        icon: "contrast",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    brandReign: "louchi",
    appearance: "light",
  },
  decorators: [
    (Story, context) => {
      const brandReign = String(context.globals.brandReign ?? "louchi");
      const appearance = context.globals.appearance === "dark" ? "dark" : "light";

      if (typeof document !== "undefined") {
        const root = document.documentElement;
        root.dataset.brandReign = brandReign;
        root.classList.remove("light", "dark");
        root.classList.add(appearance);
        document.body.classList.add(...fontClasses.split(" "));
        localStorage.setItem("raidguild-brand-reign", brandReign);
        localStorage.setItem("theme", appearance);
      }

      return (
        <ThemeProvider key={`${brandReign}-${appearance}`}>
          <div className={`${fontClasses} min-h-screen bg-background p-8 text-foreground`}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    a11y: {
      test: "error",
    },
    backgrounds: {
      disable: true,
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullscreen",
    options: {
      storySort: {
        order: [
          "Foundations",
          "Primitives",
          "Navigation",
          "Overlays",
          "Data Display",
          "Forms",
          "Compositions",
          "Brand",
          "Experimental",
        ],
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;
