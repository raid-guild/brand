import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
  // Storybook owns the public copy; disable Vite's duplicate copy to avoid
  // concurrent mkdir races in the large website asset tree.
  viteFinal: async (viteConfig) => ({ ...viteConfig, publicDir: false }),
};

export default config;
