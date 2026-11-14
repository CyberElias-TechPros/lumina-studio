"use client";

import { useEffect } from "react";

/** Smooth wheel scrolling is an enhancement, only for motion-safe desktop pointers.
 * Native scrolling, touch, keyboard, dialogs and reduced motion remain native. */
export function ScrollExperience() {
  useEffect(() => {
    const preference = window.matchMedia(
      "(prefers-reduced-motion: no-preference) and (pointer: fine)",
    );
    let instance: import("lenis").default | undefined;
    let generation = 0;
    const sync = async () => {
      const current = ++generation;
      instance?.destroy();
      instance = undefined;
      if (!preference.matches) return;
      const module = await import("lenis").catch(() => null);
      if (!module || current !== generation || !preference.matches) return;
      const Lenis = module.default;
      instance = new Lenis({
        autoRaf: true,
        lerp: 0.13,
        smoothWheel: true,
        syncTouch: false,
        prevent: (node) =>
          node.matches("[role=dialog], [data-lenis-prevent], [data-radix-scroll-area-viewport]"),
        virtualScroll: () => document.body.style.overflow !== "hidden",
      });
    };
    void sync();
    preference.addEventListener("change", sync);
    return () => {
      generation++;
      preference.removeEventListener("change", sync);
      instance?.destroy();
    };
  }, []);
  return null;
}
