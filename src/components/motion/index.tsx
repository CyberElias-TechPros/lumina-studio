"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * CEA-OS motion system
 *
 * One coherent language across Micro → Component → Section → Page:
 *  - EASE is the shared signature curve (expo-out feel, never linear)
 *  - SPRING powers anything interactive (pointer, press, layout)
 *  - MotionProvider sets reducedMotion="user" globally, so every
 *    transform-based animation here degrades to opacity-only when the
 *    visitor prefers reduced motion (§49 of the design manifesto).
 *  - Pointer-driven effects (tilt, spotlight, magnetic, parallax) are
 *    opt-out on touch devices for performance and usability.
 * ------------------------------------------------------------------ */

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const SPRING = {
  soft: { type: "spring", stiffness: 210, damping: 26, mass: 0.9 },
  snappy: { type: "spring", stiffness: 340, damping: 30 },
  tilt: { stiffness: 180, damping: 18 },
} as const;

/** True only on fine-pointer (mouse) devices — checked post-hydration. */
function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
  }, []);
  return fine;
}

/** Wrap the app once at the root so all motion shares timing + a11y rules. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: EASE }}>
      {children}
    </MotionConfig>
  );
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE },
  },
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Line-mask typographic reveal — words rise from behind a clip mask.
 * The cinematic entrance for display headlines (§36, §46). Falls back
 * to a plain fade for non-string content, and reduced-motion users get
 * the text immediately with a soft opacity fade.
 */
export function LineMaskReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ").filter(Boolean);
  return (
    <span className={cn("inline", className)} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="mb-[-0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

/** Scroll-linked vertical drift with spring smoothing. Motion-safe. */
export function Parallax({
  children,
  className,
  speed = 0.12,
}: {
  children: ReactNode;
  className?: string;
  /** Positive sinks slower than scroll (background feel); negative pops. */
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const enabled = !reduce && fine;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const y = useSpring(raw, { stiffness: 130, damping: 22, mass: 0.6 });

  return (
    <motion.div
      ref={ref}
      style={enabled ? { y, willChange: "transform" } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Counter({
  to,
  duration = 1.6,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(to * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export function TiltCard({
  children,
  className,
  intensity = 8,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const enabled = !reduce && fine;
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const [hovered, setHovered] = useState(false);
  const rx = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), SPRING.tilt);
  const ry = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), SPRING.tilt);
  const glareX = useSpring(useTransform(mx, [0, 1], [0, 100]), SPRING.tilt);
  const glareY = useSpring(useTransform(my, [0, 1], [0, 100]), SPRING.tilt);
  const glareBg = useMotionTemplate`radial-gradient(340px circle at ${glareX}% ${glareY}%, color-mix(in oklab, var(--primary-glow) 16%, transparent), transparent 68%)`;

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width);
        my.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={cn("relative will-change-transform", className)}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ background: glareBg, opacity: hovered ? 1 : 0 }}
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        />
      )}
    </motion.div>
  );
}

export function Magnetic({
  children,
  className,
  strength = 14,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const x = useSpring(useMotionValue(0), { stiffness: 240, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 240, damping: 18 });

  if (reduce || !fine) {
    return <div className={cn("inline-block", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={cn("inline-block", className)}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set(((e.clientX - rect.left) / rect.width - 0.5) * strength * 2);
        y.set(((e.clientY - rect.top) / rect.height - 0.5) * strength * 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Cursor-tracked light wash for a section's parent element.
 * Motion-value driven (no React re-renders per mousemove); renders a
 * gentle static wash instead of tracking for reduced-motion users, and
 * nothing at all on touch devices.
 */
export function Spotlight({
  className,
  intensity = 22,
}: {
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const track = fine && !reduce;
  const px = useMotionValue(50);
  const py = useMotionValue(28);
  const sx = useSpring(px, { stiffness: 90, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 90, damping: 20, mass: 0.6 });
  const bg = useMotionTemplate`radial-gradient(560px circle at ${sx}% ${sy}%, color-mix(in oklab, var(--primary-glow) ${intensity}%, transparent), transparent 65%)`;

  useEffect(() => {
    if (!track) return;
    const el = ref.current?.parentElement;
    if (!el) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        px.set(((e.clientX - r.left) / r.width) * 100);
        py.set(((e.clientY - r.top) / r.height) * 100);
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("mousemove", onMove);
    };
  }, [track, px, py]);

  if (!fine) {
    // Static ambient wash keeps the depth without pointer cost.
    return (
      <div
        className={cn("pointer-events-none absolute inset-0", className)}
        style={{
          background: `radial-gradient(720px circle at 50% 18%, color-mix(in oklab, var(--primary-glow) ${Math.max(
            10,
            Math.round(intensity * 0.55),
          )}%, transparent), transparent 70%)`,
        }}
      />
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ background: bg }}
    />
  );
}

export function Aurora({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="animate-aurora absolute -top-1/3 left-[-10%] h-[45rem] w-[45rem] rounded-full bg-gradient-brand opacity-30 blur-[110px]" />
      <div className="animate-float absolute top-1/4 right-[-8%] h-[34rem] w-[34rem] rounded-full bg-gradient-services opacity-25 blur-[120px]" />
      <div className="animate-aurora absolute bottom-[-20%] left-1/3 h-[32rem] w-[32rem] rounded-full bg-gradient-learning opacity-20 blur-[120px]" />
    </div>
  );
}

/**
 * Seamless text ribbon. Pauses on hover, fades at both edges, and
 * stands still (fully readable, no motion) for reduced-motion users.
 */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn("mask-fade-x group relative flex overflow-hidden", className)}>
      <div className="animate-marquee flex min-w-full shrink-0 items-center gap-14 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-muted-foreground/70 shrink-0 text-lg font-semibold tracking-tight whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-gradient-brand fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
    />
  );
}

/** Tiny living status dot (used on admission-window chips, live rooms). */
export function PulseDot({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={cn("relative inline-flex size-2", className)} aria-hidden="true">
      <span className="bg-success absolute inset-0 inline-flex rounded-full opacity-75" />
      {!reduce && (
        <motion.span
          className="bg-success absolute inset-0 rounded-full"
          animate={{ scale: [1, 2.1, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </span>
  );
}

/**
 * Scroll cue — the bridge between a hero and the story below it. A hairline
 * track with a drifting dot; the whole cue fades out once the visitor starts
 * scrolling (feedback: "there is more, and you're moving into it"). Static
 * and fully visible under reduced motion.
 */
export function ScrollCue({ label = "Scroll", className }: { label?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [gone, setGone] = useState(false);
  const opacity = useTransform(scrollY, [0, 120], [1, 0]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setGone(v > 140));
    return unsub;
  }, [scrollY]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={reduce ? undefined : { opacity }}
      className={cn(
        "pointer-events-none flex flex-col items-center gap-2 transition-opacity duration-500",
        gone && "opacity-0",
        className,
      )}
    >
      <span className="text-muted-foreground text-[10px] font-bold tracking-[0.28em] uppercase">
        {label}
      </span>
      <span className="bg-border relative h-10 w-px overflow-hidden">
        {!reduce && (
          <motion.span
            className="bg-gradient-brand absolute inset-x-0 top-0 h-4 rounded-full"
            animate={{ y: [-16, 40] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
              repeatDelay: 0.35,
            }}
          />
        )}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * LUMINA signature layer
 *
 * The pieces that make the public site feel authored rather than
 * assembled: liquid light, a bespoke pointer, decoding labels, pinned
 * storytelling and a drag rail. Every one of them degrades to a calm,
 * readable static state under reduced motion or on touch devices.
 * ------------------------------------------------------------------ */

/** Palette of the light field, in sRGB (canvas cannot read oklch tokens). */
const LIGHT_PALETTE = [
  "226, 74, 55", // ember
  "124, 16, 52", // burgundy
  "240, 190, 110", // gold
  "122, 84, 200", // violet
  "58, 168, 150", // teal
];

/**
 * Liquid light — a canvas of slow-moving radial lights, additively blended
 * and heavily blurred. It is the atmospheric signature of the site: cheap
 * (rendered at a quarter resolution, paused off-screen), never interactive,
 * and it leans toward the pointer so the page feels aware of you.
 */
export function LightField({
  className,
  density = 5,
  pointer = true,
  opacity = 0.85,
}: {
  className?: string;
  density?: number;
  pointer?: boolean;
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const RENDER_SCALE = 0.22; // blurred anyway — a quarter res is plenty
    let width = 1;
    let height = 1;
    let raf = 0;
    let visible = true;
    let started = false;

    const pointerLight = { x: 0.5, y: 0.42, tx: 0.5, ty: 0.42 };

    const orbs = Array.from({ length: density }, (_, i) => {
      const t = i / Math.max(1, density - 1);
      return {
        x: 0.12 + t * 0.76,
        y: 0.22 + (i % 3) * 0.24,
        r: 0.34 + (i % 3) * 0.13,
        ax: 0.05 + (i % 4) * 0.022,
        ay: 0.04 + ((i + 1) % 3) * 0.026,
        sx: 0.00007 + (i % 3) * 0.000035,
        sy: 0.00006 + ((i + 2) % 4) * 0.00003,
        phase: i * 1.7,
        color: LIGHT_PALETTE[i % LIGHT_PALETTE.length],
        alpha: 0.5 - t * 0.16,
      };
    });

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width * RENDER_SCALE));
      height = Math.max(1, Math.round(rect.height * RENDER_SCALE));
      canvas.width = width;
      canvas.height = height;
    };

    const paint = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (const orb of orbs) {
        const cx = (orb.x + Math.sin(now * orb.sx + orb.phase) * orb.ax) * width;
        const cy = (orb.y + Math.cos(now * orb.sy + orb.phase * 1.3) * orb.ay) * height;
        const radius = orb.r * Math.max(width, height);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${orb.color}, ${orb.alpha})`);
        grad.addColorStop(0.45, `rgba(${orb.color}, ${orb.alpha * 0.28})`);
        grad.addColorStop(1, `rgba(${orb.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // The pointer light — the page acknowledging you.
      pointerLight.x += (pointerLight.tx - pointerLight.x) * 0.06;
      pointerLight.y += (pointerLight.ty - pointerLight.y) * 0.06;
      const px = pointerLight.x * width;
      const py = pointerLight.y * height;
      const pr = 0.42 * Math.max(width, height);
      const pGrad = ctx.createRadialGradient(px, py, 0, px, py, pr);
      pGrad.addColorStop(0, "rgba(255, 214, 170, 0.34)");
      pGrad.addColorStop(0.5, "rgba(226, 74, 55, 0.14)");
      pGrad.addColorStop(1, "rgba(226, 74, 55, 0)");
      ctx.fillStyle = pGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (now: number) => {
      if (visible) paint(now);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (started) return;
      started = true;
      resize();
      paint(performance.now());
      if (!reduce) raf = requestAnimationFrame(loop);
    };

    resize();
    start();

    const onResize = () => {
      resize();
      paint(performance.now());
    };

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    observer.observe(host);
    window.addEventListener("resize", onResize);

    let moveHandler: ((e: MouseEvent) => void) | undefined;
    if (pointer && !reduce) {
      moveHandler = (e: MouseEvent) => {
        const rect = host.getBoundingClientRect();
        pointerLight.tx = (e.clientX - rect.left) / Math.max(1, rect.width);
        pointerLight.ty = (e.clientY - rect.top) / Math.max(1, rect.height);
      };
      window.addEventListener("mousemove", moveHandler, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      if (moveHandler) window.removeEventListener("mousemove", moveHandler);
    };
  }, [density, pointer, reduce]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <canvas
        ref={canvasRef}
        className="size-full scale-[1.08] blur-[64px] saturate-[155%]"
        style={{ opacity }}
      />
      <div className="vignette absolute inset-0" />
    </div>
  );
}

/**
 * The bespoke pointer: a solid core that tracks exactly, and a lagging ring
 * that stretches toward whatever it is over. Elements opt into a label with
 * `data-cursor="Drag"` etc. Hidden entirely on touch and under reduced
 * motion — those visitors keep the native cursor.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-off");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as Element | null)?.closest?.(
        "a,button,[role=button],[data-cursor],input,textarea,select,[tabindex]",
      );
      if (!target) {
        setActive(false);
        setLabel(null);
        return;
      }
      setActive(true);
      const custom = target.getAttribute("data-cursor");
      setLabel(custom);
    };
    const onLeave = () => {
      setActive(false);
      setLabel(null);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("cursor-off");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div
        className="bg-foreground absolute top-0 left-0 size-[7px] rounded-full mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: active ? 0.4 : 1 }}
        transition={{ duration: 0.25, ease: EASE }}
      />
      <motion.div
        className="border-foreground absolute top-0 left-0 flex items-center justify-center rounded-full border mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 74 : active ? 54 : 34,
          height: label ? 74 : active ? 54 : 34,
          opacity: 0.85,
        }}
        transition={{ duration: 0.32, ease: EASE }}
      >
        {label && (
          <span className="font-label text-foreground text-[9px] leading-none">{label}</span>
        )}
      </motion.div>
    </div>
  );
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>*#";

/**
 * Decode-on-reveal micro-type. Used for eyebrows and index labels so the
 * wayfinding copy arrives like a signal locking on. Reduced motion → the
 * final string, immediately.
 */
export function Scramble({
  text,
  className,
  delay = 0,
  speed = 34,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView || reduce) {
      setOut(text);
      return;
    }
    let frame = 0;
    let iteration = 0;
    const timer = window.setTimeout(() => {
      const id = window.setInterval(() => {
        setOut(
          text
            .split("")
            .map((ch, i) => {
              if (ch === " ") return " ";
              if (i < iteration) return ch;
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            })
            .join(""),
        );
        iteration += 1 / 2;
        if (iteration >= text.length) window.clearInterval(id);
      }, speed);
      frame = id;
    }, delay * 1000);
    return () => {
      window.clearTimeout(timer);
      window.clearInterval(frame);
    };
  }, [inView, text, reduce, delay, speed]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}

/**
 * The editorial reveal: each line rises from behind a mask while the whole
 * block drifts up. Splits on explicit lines so headlines can be composed
 * with intent rather than by wherever the browser wraps them.
 */
export function SplitReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.11,
  start = true,
  as: Tag = "span",
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** Hold the reveal until the caller says go (used behind the arrival curtain). */
  start?: boolean;
  as?: "span" | "h1" | "h2" | "p" | "div";
}) {
  return (
    <Tag className={cn("block", className)}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={cn("mb-[-0.16em] block overflow-hidden pb-[0.16em]", lineClassName)}
        >
          <motion.span
            className="block"
            initial={{ y: "112%", opacity: 0 }}
            animate={start ? { y: 0, opacity: 1 } : { y: "112%", opacity: 0 }}
            transition={{ duration: 0.95, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Live clock chip — a small proof that the page is awake. */
export function LiveClock({
  timeZone = "Africa/Lagos",
  className,
}: {
  timeZone?: string;
  className?: string;
}) {
  const [time, setTime] = useState<string>("--:--:--");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone,
        }).format(new Date()),
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);
  return <span className={cn("tabular-nums", className)}>{time}</span>;
}

export type ShowcaseStep = {
  index: string;
  title: string;
  kicker?: string;
  body: string;
  points?: string[];
  accent?: string;
  media?: ReactNode;
};

/**
 * Pinned storytelling — the section that earns the scroll. The visual column
 * stays fixed while the chapter list moves past it; the active chapter drives
 * the visual, the accent light and the progress rail.
 */
export function StickyShowcase({
  steps,
  className,
  heading,
}: {
  steps: ShowcaseStep[];
  className?: string;
  heading?: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (steps.length === 0) return;
    return scrollYProgress.on("change", (v) => {
      const next = Math.min(steps.length - 1, Math.max(0, Math.round(v * (steps.length - 1))));
      setActive((prev) => (prev === next ? prev : next));
    });
  }, [scrollYProgress, steps.length]);

  return (
    <div ref={containerRef} className={className}>
      {/* Heading sits above the pinned pair so the sticky column never has to
          hold more than the viewport can show. */}
      {heading && <div className="max-w-3xl pb-16 md:pb-24">{heading}</div>}
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div className="relative hidden lg:sticky lg:top-0 lg:block lg:h-screen lg:self-start">
          <div className="flex h-full flex-col justify-center py-10">
            <div className="panel relative aspect-[4/3.2] max-h-[52vh] overflow-hidden rounded-[2px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0"
                >
                  {steps[active]?.media}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(70% 60% at 30% 20%, ${steps[active]?.accent ?? "var(--primary)"}33, transparent 70%)`,
                    }}
                  />
                </motion.div>
              </AnimatePresence>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
                style={{ backgroundImage: "var(--grain-image)", backgroundSize: "180px 180px" }}
              />
            </div>

            {/* Chapter rail */}
            <div className="mt-8 flex items-center gap-3">
              {steps.map((step, i) => (
                <span
                  key={step.index}
                  className="relative h-px flex-1 overflow-hidden bg-foreground/12"
                >
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-foreground/70"
                    initial={false}
                    animate={{ width: i <= active ? "100%" : "0%" }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                </span>
              ))}
              <span className="font-label text-muted-foreground ml-2 text-[10px] tabular-nums">
                {String(active + 1).padStart(2, "0")}/{String(steps.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:py-[12vh]">
          {steps.map((step, i) => (
            <motion.article
              key={step.index}
              initial={{ opacity: 0.35 }}
              animate={{ opacity: active === i ? 1 : 0.35 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex min-h-[58vh] flex-col justify-center gap-5 border-t border-foreground/10 py-10 first:border-t-0 lg:min-h-[70vh]"
            >
              <div className="flex items-baseline gap-5">
                <span
                  className="font-display text-[3.5rem] leading-none font-extralight tabular-nums lg:text-[4.5rem]"
                  style={{ color: step.accent ?? "var(--primary)" }}
                >
                  {step.index}
                </span>
                {step.kicker && (
                  <span className="font-label text-muted-foreground text-[10px]">
                    {step.kicker}
                  </span>
                )}
              </div>
              <h3 className="text-h3 font-display font-bold text-balance">{step.title}</h3>
              <p className="text-muted-foreground max-w-xl text-body-lg text-pretty">{step.body}</p>
              {step.points && (
                <ul className="mt-2 grid gap-2.5">
                  {step.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] size-1 shrink-0 rounded-full"
                        style={{ background: step.accent ?? "var(--primary)" }}
                      />
                      <span className="text-foreground/85">{p}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Drag rail — a horizontal, snap-scrolling gallery you can grab. Pointer
 * drag, momentum-free but forgiving, with a live progress hairline and
 * arrow keys. Falls back to native scroll (and visible scrollbars hidden).
 */
export function DragRail({
  children,
  className,
  ariaLabel = "Gallery",
}: {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      progress.set(max > 0 ? el.scrollLeft / max : 0);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progress]);

  const nudge = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <div className={className}>
      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        data-cursor="Drag"
        tabIndex={0}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") return;
          const el = ref.current;
          if (!el) return;
          drag.current = {
            down: true,
            startX: e.clientX,
            startScroll: el.scrollLeft,
            moved: 0,
          };
          el.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const el = ref.current;
          if (!el || !drag.current.down) return;
          const dx = e.clientX - drag.current.startX;
          drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
          el.scrollLeft = drag.current.startScroll - dx;
        }}
        onPointerUp={() => {
          drag.current.down = false;
        }}
        onClickCapture={(e) => {
          if (drag.current.moved > 8) {
            e.preventDefault();
            e.stopPropagation();
          }
          drag.current.moved = 0;
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") nudge(1);
          if (e.key === "ArrowLeft") nudge(-1);
        }}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <div className="mt-6 flex items-center gap-5">
        <div className="bg-foreground/10 relative h-px flex-1 overflow-hidden">
          <motion.span
            className="bg-foreground absolute inset-y-0 left-0 w-1/4 origin-left"
            style={{ scaleX: progress }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => nudge(-1)}
            className="border-foreground/15 hover:border-foreground/45 hover:bg-foreground/5 grid size-9 place-items-center rounded-full border transition-colors"
          >
            <span aria-hidden="true" className="text-sm">
              ←
            </span>
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => nudge(1)}
            className="border-foreground/15 hover:border-foreground/45 hover:bg-foreground/5 grid size-9 place-items-center rounded-full border transition-colors"
          >
            <span aria-hidden="true" className="text-sm">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/** Page grain — one fixed texture above the whole document. */
export function Grain() {
  return <div aria-hidden="true" className="grain-fixed" />;
}

/**
 * Arrival curtain — cinematic, award-winning intro.
 * Runs once per session: wordmark locks in while a counter climbs with blur,
 * brand wash blooms, then curtain lifts with expo ease.
 * Never traps visitor (hard cap), never plays under reduced motion.
 */
export function Arrival({
  wordmark = "CYBER ELIAS",
  onDone,
}: {
  wordmark?: string;
  onDone?: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setDone(true);
      onDone?.();
      return;
    }
    if (typeof window !== "undefined" && window.sessionStorage.getItem("cea.arrived") === "1") {
      setDone(true);
      onDone?.();
      return;
    }
    const start = performance.now();
    const DURATION = 1450;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        window.sessionStorage.setItem("cea.arrived", "1");
        onDone?.();
        window.setTimeout(() => setDone(true), 520);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, onDone]);

  if (done) return null;

  return (
    <motion.div
      aria-hidden="true"
      data-arrival=""
      className="bg-background fixed inset-0 z-[120] flex flex-col justify-between overflow-hidden"
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-gradient-brand absolute -top-40 -left-32 size-[52rem] rounded-full opacity-[0.22] blur-[130px]" />
        <div className="absolute -right-40 bottom-0 size-[44rem] rounded-full bg-gradient-learning opacity-[0.16] blur-[140px]" />
        <div className="rule-grid absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" />
        <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay" style={{ backgroundImage: "var(--grain-image)", backgroundSize: "180px 180px" }} />
      </div>

      <div className="relative flex flex-1 flex-col justify-between px-6 py-6 md:px-12 md:py-10">
        <div className="flex items-center justify-between font-label text-[10px] text-muted-foreground">
          <span className="flex items-center gap-2"><span className="size-1 rounded-full bg-primary" /> CEA · LUMINA — PORT HARCOURT · NG</span>
          <span className="hidden md:flex items-center gap-3"><span>EST. 2024</span><span className="opacity-30">·</span><span>COHORT 01</span></span>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.p initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.1 }} className="font-label text-[10px] tracking-[0.2em] text-muted-foreground">Cyber Elias Academy — Digital Operating System</motion.p>
          </div>
          <div className="mt-6 flex items-end justify-between gap-6">
            <div className="overflow-hidden">
              <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.2 }} className="font-display block select-none text-[clamp(2.6rem,9.5vw,12rem)] font-semibold leading-[0.82] tracking-[-0.05em]"><span className="text-outline opacity-80">{wordmark.split(" ")[0]}</span> <span className="font-serif-accent font-normal text-gradient">{wordmark.split(" ").slice(1).join(" ") || "ACADEMY"}</span></motion.span>
            </div>
            <div className="text-right">
              <motion.span initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.8, ease: EASE, delay: 0.4 }} className="font-display block text-5xl font-extralight tabular-nums leading-none md:text-7xl">{String(progress).padStart(3, "0")}</motion.span>
              <span className="font-label mt-2 block text-[9px] text-muted-foreground">LOADING EXPERIENCE</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between font-label text-[9px] text-muted-foreground/60"><span>SCROLL · DRAG · EXPLORE</span><span>04°48′N 07°00′E</span></div>
          <div className="bg-foreground/10 relative h-px w-full overflow-hidden rounded-full"><motion.span className="bg-gradient-brand absolute inset-y-0 left-0" initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ ease: "linear", duration: 0.08 }} /><motion.span className="absolute inset-y-0 bg-white/40 blur-[2px]" style={{ left: `${progress}%`, width: "40px", x: "-50%" }} animate={{ opacity: progress > 5 ? 0.6 : 0 }} /></div>
        </div>
      </div>
    </motion.div>
  );
}

/** Marquee variant with oversized editorial type and a separator glyph. */
export function BigMarquee({
  items,
  className,
  reverse = false,
  duration = 38,
  glyph = "✦",
  itemClassName,
  glyphClassName,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
  duration?: number;
  glyph?: string;
  itemClassName?: string;
  glyphClassName?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("mask-fade-x group relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center gap-10 whitespace-nowrap group-hover:[animation-play-state:paused] motion-reduce:animate-none",
          reverse ? "animate-marquee-rev" : "animate-marquee",
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            <span
              className={cn(
                "font-display text-[clamp(2.5rem,7vw,7rem)] leading-none font-semibold tracking-tight",
                itemClassName,
              )}
            >
              {item}
            </span>
            <span
              aria-hidden="true"
              className={cn("text-primary text-[clamp(1rem,2vw,2rem)]", glyphClassName)}
            >
              {glyph}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
