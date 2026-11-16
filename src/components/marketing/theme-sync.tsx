"use client";

import { useEffect } from "react";

/** Dark-first marketing shell. Mirrors the inline THEME_SCRIPT in the root
 * layout: marketing visitors get dark unless they explicitly chose light
 * (stored in `cea-marketing-theme`), and the workspace default is restored
 * (`cea-theme`) on unmount. */
export function ThemeSync() {
  useEffect(() => {
    const read = (key: string) => {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    };
    const root = document.documentElement;
    root.classList.toggle("dark", read("cea-marketing-theme") !== "light");
    return () => {
      root.classList.toggle("dark", read("cea-theme") !== "light");
    };
  }, []);

  return null;
}
