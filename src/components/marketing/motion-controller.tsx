"use client";

import { useEffect } from "react";

/**
 * The page-level motion controller.
 *
 * One component runs everything scroll- and pointer-driven, so the site has one
 * animation clock and one set of teardown rules instead of a dozen components
 * each adding their own listeners.
 *
 * ## What it does
 *
 * - **Scroll reveal** — elements marked `data-reveal` fade and rise once, on
 *   entry, then stop being observed. Reveals never replay on scroll-up; a page
 *   that re-animates when you look back at it feels broken rather than alive.
 * - **Magnetic affordances** — `data-magnetic` elements pull toward a fine
 *   pointer within 90px and spring back on leave. Only on fine pointers, because
 *   on touch there is no hover and the effect is invisible dead weight.
 * - **Word reveal** — `data-split` headings are split into masked words and
 *   raised in sequence. Splitting in JS rather than shipping the spans means the
 *   markup stays accessible text (screen readers, search engines and
 *   copy-paste all see the original sentence).
 * - **Scroll progress** — writes a single CSS variable, no layout read per frame.
 *
 * ## What it refuses to do
 *
 * - Runs at all under `prefers-reduced-motion: reduce`. The check is live: if the
 *   visitor changes the setting mid-session, everything reverts.
 * - Hide content before confirming it can animate. `data-motion="ready"` is only
 *   set after the observers are attached, so a script error leaves the page
 *   fully visible.
 * - Animate anything but `transform` and `opacity`, so the compositor does the
 *   work and the main thread stays free for input.
 */
export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    let revealObserver: IntersectionObserver | null = null;
    let cleanups: Array<() => void> = [];

    const teardown = () => {
      revealObserver?.disconnect();
      revealObserver = null;
      for (const fn of cleanups) fn();
      cleanups = [];
      root.removeAttribute("data-motion");
      root.style.removeProperty("--progress");
    };

    const setupSplit = () => {
      // Words only: splitting into characters looks impressive once and then
      // makes the heading unreadable to anyone using a screen reader mid-text.
      for (const heading of document.querySelectorAll<HTMLElement>("[data-split]")) {
        if (heading.dataset.splitDone === "true") continue;
        const text = heading.textContent ?? "";
        if (!text.trim()) continue;

        heading.setAttribute("aria-label", text);
        heading.textContent = "";
        const words = text.split(/(\s+)/);
        let index = 0;
        for (const word of words) {
          if (!word.trim()) {
            heading.appendChild(document.createTextNode(word));
            continue;
          }
          const outer = document.createElement("span");
          outer.className = "cea-split";
          outer.setAttribute("aria-hidden", "true");
          const inner = document.createElement("span");
          inner.textContent = word;
          inner.style.setProperty("--word-delay", `${Math.min(index * 55, 620)}ms`);
          outer.appendChild(inner);
          heading.appendChild(outer);
          index += 1;
        }
        heading.dataset.splitDone = "true";
        heading.dataset.in = "true";
      }
    };

    const setupReveal = () => {
      const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      if (targets.length === 0) return;

      revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            el.dataset.revealed = "true";
            revealObserver?.unobserve(el);
          }
        },
        // Start slightly before the element enters, so the motion has finished
        // by the time it is comfortably in view rather than finishing off-screen.
        { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
      );

      for (const target of targets) {
        // Anything already in the first viewport reveals immediately rather than
        // waiting for a scroll that may never come.
        const rect = target.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          target.dataset.revealed = "true";
        } else {
          revealObserver.observe(target);
        }
      }
    };

    const setupMagnetic = () => {
      if (!finePointer.matches) return;
      const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
      if (nodes.length === 0) return;

      for (const node of nodes) {
        const onMove = (event: PointerEvent) => {
          const rect = node.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = event.clientX - cx;
          const dy = event.clientY - cy;
          const distance = Math.hypot(dx, dy);
          const radius = Math.max(rect.width, rect.height) / 2 + 70;

          if (distance > radius) {
            node.removeAttribute("data-magnetic-active");
            node.style.setProperty("--mx", "0px");
            node.style.setProperty("--my", "0px");
            return;
          }
          // Damped pull: full strength at the centre, zero at the edge, capped
          // so a wide button never travels far enough to break its own hit area.
          const strength = (1 - distance / radius) * 0.28;
          node.setAttribute("data-magnetic-active", "true");
          node.style.setProperty("--mx", `${(dx * strength).toFixed(1)}px`);
          node.style.setProperty("--my", `${(dy * strength).toFixed(1)}px`);
        };

        const onLeave = () => {
          node.removeAttribute("data-magnetic-active");
          node.style.setProperty("--mx", "0px");
          node.style.setProperty("--my", "0px");
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        node.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          window.removeEventListener("pointermove", onMove);
          node.removeEventListener("pointerleave", onLeave);
          node.style.removeProperty("--mx");
          node.style.removeProperty("--my");
        });
      }
    };

    const setupProgress = () => {
      let ticking = false;
      const update = () => {
        ticking = false;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const value = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        doc.style.setProperty("--progress", value.toFixed(4));
      };
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      });
    };

    const setup = () => {
      teardown();
      if (reduced.matches) return;

      setupSplit();
      setupReveal();
      setupMagnetic();
      setupProgress();

      // Only now is it safe for CSS to hide un-revealed elements: the observers
      // exist and will bring them back.
      root.setAttribute("data-motion", "ready");
    };

    setup();
    reduced.addEventListener("change", setup);
    finePointer.addEventListener("change", setup);

    return () => {
      reduced.removeEventListener("change", setup);
      finePointer.removeEventListener("change", setup);
      teardown();
    };
  }, []);

  return <div className="cea-progress" aria-hidden="true" />;
}
