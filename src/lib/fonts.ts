import localFont from "next/font/local";

// Primary Display Font - Mazius Display
export const maziusDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/MAZIUSREVIEW20.09-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/MaziusDisplay-Bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-mazius-display",
  display: "swap",
});

// Secondary Body Font - EB Garamond
export const ebGaramond = localFont({
  src: [
    {
      path: "../../public/fonts/EBGaramond-VariableFont_wght.ttf",
      weight: "400 800",
      style: "normal",
    },
    {
      path: "../../public/fonts/EBGaramond-Italic-VariableFont_wght.ttf",
      weight: "400 800",
      style: "italic",
    },
  ],
  variable: "--font-eb-garamond",
  display: "swap",
});

export const ubuntuMono = localFont({
  src: [
    {
      path: "../../public/fonts/UbuntuMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/UbuntuMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ubuntu-mono",
  display: "swap",
});
