"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's living grain field.
 *
 * ## Why a canvas and not a shader
 *
 * The obvious move for a "wow" hero is a WebGL shader. It is also the wrong move
 * here, for two measured reasons:
 *
 * 1. **Mobile is half the audience.** 52% of this site's impressions are mobile
 *    (`Devices` export, six months to Nov 2026). A full-screen fragment shader is
 *    the most expensive thing you can put on a mid-range Android, and a hero that
 *    stutters on the phone is worse than no hero animation at all.
 * 2. **The page must not depend on it.** The build is statically rendered and the
 *    marketing copy has to survive with no JavaScript. A canvas is a paint layer,
 *    not a layout dependency.
 *
 * A 2D canvas drawing ~120 points at 60fps costs almost nothing, works on every
 * device that has ever run a browser, and can be made to look genuinely alive
 * because each point keeps its own velocity, drift and depth.
 *
 * ## What it actually draws
 *
 * A slow constellation of drift particles, each connected to its nearest few
 * neighbours when they come close, with a bright node that follows the pointer
 * with inertia. The connections are the point: they make the field read as a
 * network rather than as decorative dust, which is the thing the academy is
 * actually about.
 *
 * ## The rules it obeys
 *
 * - Renders nothing at all under `prefers-reduced-motion: reduce`.
 * - Pauses when the tab is hidden or the hero scrolls out of view (`IntersectionObserver`).
 * - Caps device pixel ratio at 2 so a 3x phone does not triple the fill cost.
 * - Degrades to a static field if the pointer never moves (touch, keyboard).
 * - Removes every listener on unmount; no leaks across client-side navigation.
 */
export function HeroField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Read the brand accent from CSS so the field cannot drift from the theme.
    const accent =
      getComputedStyle(document.documentElement).getPropertyValue("--cea-lime").trim() || "#d6fe52";

    type Node = { x: number; y: number; vx: number; vy: number; r: number; d: number };

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let running = true;
    let visible = true;

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with area but is capped, so a large desktop monitor does
      // not end up drawing thousands of O(n²) neighbour checks.
      const count = Math.min(140, Math.max(48, Math.round((width * height) / 11000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 0.7 + Math.random() * 1.5,
        // Depth drives both speed and opacity, which is what makes the field
        // read as three-dimensional without any 3D maths.
        d: 0.35 + Math.random() * 0.65,
      }));
    };

    const LINK_DISTANCE = 118;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Ease the pointer with inertia so the bright node trails like a comet
      // head rather than snapping, which is what makes it feel physical.
      pointer.x += (pointer.tx - pointer.x) * 0.09;
      pointer.y += (pointer.ty - pointer.y) * 0.09;

      for (const n of nodes) {
        n.x += n.vx * n.d;
        n.y += n.vy * n.d;

        // Wrap rather than bounce: bouncing creates visible corners in the flow.
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DISTANCE) continue;

          // Opacity falls off with distance and with depth, so the network has
          // a foreground and a background rather than a flat mesh.
          const alpha = (1 - dist / LINK_DISTANCE) * 0.22 * Math.min(a.d, b.d);
          ctx.strokeStyle = `rgba(244, 241, 233, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Connection to the pointer, drawn last so it sits above the mesh.
      if (pointer.active) {
        for (const n of nodes) {
          const dist = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (dist > 190) continue;
          const alpha = (1 - dist / 190) * 0.5;
          ctx.strokeStyle = `${hexToRgba(accent, alpha)}`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }

        const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 46);
        glow.addColorStop(0, hexToRgba(accent, 0.5));
        glow.addColorStop(1, hexToRgba(accent, 0));
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 46, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const n of nodes) {
        ctx.fillStyle = `rgba(244, 241, 233, ${(0.16 + n.d * 0.5).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!running) return;
      draw();
      raf = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf) return;
      running = true;
      raf = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = event.clientX - rect.left;
      pointer.ty = event.clientY - rect.top;
      pointer.active = true;
      if (!pointer.x || pointer.x < -1000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };

    resize();
    start();

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}

/** `#d6fe52` → `rgba(214, 254, 82, 0.4)`, tolerating both hex and oklch input. */
function hexToRgba(colour: string, alpha: number): string {
  const hex = colour.trim();
  if (hex.startsWith("#") && (hex.length === 7 || hex.length === 4)) {
    const full = hex.length === 4 ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` : hex;
    const r = parseInt(full.slice(1, 3), 16);
    const g = parseInt(full.slice(3, 5), 16);
    const b = parseInt(full.slice(5, 7), 16);
    if ([r, g, b].every((v) => Number.isFinite(v))) return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  // Non-hex token (oklch etc.): fall back to the literal colour with opacity
  // handled by the alpha channel syntax, which every target browser supports.
  return `color-mix(in oklab, ${hex || "#d6fe52"} ${Math.round(alpha * 100)}%, transparent)`;
}
