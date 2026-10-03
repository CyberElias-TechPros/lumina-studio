"use client";

import { useEffect } from "react";

export function ThemeSync() {
  useEffect(() => {
    let pref: string | null = null;
    try {
      pref = localStorage.getItem("cea-marketing-theme");
    } catch {
      /* ignore */
    }
    const root = document.documentElement;
    if (pref === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    return () => {
      let appPref: string | null = null;
      try {
        appPref = localStorage.getItem("cea-theme");
      } catch {
        /* ignore */
      }
      root.classList.toggle("dark", appPref === "dark");
    };
  }, []);

  return null;
}
