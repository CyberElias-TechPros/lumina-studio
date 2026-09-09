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
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]",
        className,
      )}
    >
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
