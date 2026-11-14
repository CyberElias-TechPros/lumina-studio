"use client";

import { useEffect } from "react";

/** Progressive enhancement: the hero stays visible without JavaScript. */
export function HeroMotion({ scope = "#cea-home-hero" }: { scope?: string }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let context: { revert: () => void } | undefined;
    let alive = true;
    let generation = 0;
    const setup = async () => {
      const current = ++generation;
      context?.revert();
      context = undefined;
      if (!media.matches) return;
      const module = await import("gsap").catch(() => null);
      if (!module || !alive || current !== generation || !media.matches) return;
      const { gsap } = module;
      context = gsap.context(() => {
        gsap.from("[data-hero-copy]", {
          y: 22,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
          clearProps: "transform",
        });
        gsap.from("[data-hero-art]", {
          y: 24,
          scale: 0.97,
          duration: 1.2,
          ease: "power3.out",
          clearProps: "transform",
        });
      }, scope);
    };
    void setup();
    media.addEventListener("change", setup);
    return () => {
      alive = false;
      generation++;
      media.removeEventListener("change", setup);
      context?.revert();
    };
  }, [scope]);
  return null;
}
