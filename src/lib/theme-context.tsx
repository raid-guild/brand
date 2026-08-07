"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  BRAND_REIGN_STORAGE_KEY,
  DEFAULT_BRAND_REIGN,
  getBrandReign,
  isBrandReignId,
  type BrandReign,
  type BrandReignId,
} from "@/lib/brand-reigns";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  brandReign: BrandReign;
  setBrandReign: (reign: BrandReignId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [brandReignId, setBrandReignId] =
    useState<BrandReignId>(DEFAULT_BRAND_REIGN);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const savedReign = localStorage.getItem(BRAND_REIGN_STORAGE_KEY);
    if (isBrandReignId(savedReign)) {
      setBrandReignId(savedReign);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.brandReign = brandReignId;
    localStorage.setItem(BRAND_REIGN_STORAGE_KEY, brandReignId);
  }, [brandReignId]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setBrandReign = (reign: BrandReignId) => {
    if (isBrandReignId(reign)) {
      setBrandReignId(reign);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        brandReign: getBrandReign(brandReignId),
        setBrandReign,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
