import { useEffect, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { Button } from "@/components/ui/button";
import { SceneArt, type ArtVariant } from "@/components/art/scene-art";
import { cn } from "@/lib/utils";
import {
  Counter,
  CustomCursor,
  EASE,
  Grain,
  LightField,
  LineMaskReveal,
  Magnetic,
  Parallax,
  Reveal,
  Scramble,
  ScrollCue,
  ScrollProgressBar,
} from "@/components/motion";
import { stats } from "@/data/site";

/**
 * The public-site shell. The marketing site is dark by default (Lumina is a
 * dark identity); a visitor who explicitly chose daylight keeps daylight, and
 * the class is removed again when we navigate into the light app workspace.
 */
export function PageShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    let pref: string | null = null;
    try {
      pref = localStorage.getItem("cea-marketing-theme");
    } catch {
      /* storage blocked — fall back to the default */
    }
    const root = document.documentElement;
    if (pref !== "light") root.classList.add("dark");
    return () => {
      // Handing off to a workspace: restore that surface's own preference
      // rather than leaving the public site's dark identity behind.
      let appPref: string | null = null;
      try {
        appPref = localStorage.getItem("cea-theme");
      } catch {
        /* storage blocked — treat as light */
      }
      root.classList.toggle("dark", appPref === "dark");
    };
  }, []);

  return (
    <div className="bg-background text-foreground relative flex min-h-screen flex-col">
      <CustomCursor />
      <Grain />
      <ScrollProgressBar />
      <a
        href="#main-content"
        className="bg-foreground text-background shadow-soft fixed top-3 left-1/2 z-[95] -translate-x-1/2 -translate-y-28 rounded-full px-5 py-2 text-sm font-semibold transition-transform duration-200 focus-visible:translate-y-0 motion-reduce:transition-none"
      >
        Skip to content
      </a>
      <SiteHeader />
      <motion.main
        id="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <SiteFooter />
    </div>
  );
}

/** Mono micro-label — the wayfinding voice of the site. */
export function Eyebrow({
  children,
  className,
  scramble = false,
}: {
  children: ReactNode;
  className?: string;
  scramble?: boolean;
}) {
  const content =
    typeof children === "string" && scramble ? <Scramble text={children} /> : children;
  return (
    <span
      className={cn(
        "font-label text-primary inline-flex items-center gap-2.5 text-[10px]",
        className,
      )}
    >
      <span aria-hidden="true" className="bg-primary inline-block h-px w-6" />
      {content}
    </span>
  );
}

/**
 * The editorial section heading used across the public site.
 * `number` adds the house motif — an oversized index numeral — so sections
 * read like chapters of one story rather than detached page blocks.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  number,
  aside,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  number?: string;
  /** Editorial split header: supporting content set to the right on wide screens. */
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between",
        align === "center" && "lg:flex-col lg:items-center",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
        <Reveal>
          <div className={cn("flex items-center gap-4", align === "center" && "justify-center")}>
            {number && (
              <span
                aria-hidden="true"
                className="font-display text-outline text-[2.75rem] leading-none font-light tabular-nums"
              >
                {number}
              </span>
            )}
            {eyebrow && <Eyebrow scramble>{eyebrow}</Eyebrow>}
          </div>
        </Reveal>
        <h2 className="text-h2 font-display mt-6 font-semibold text-balance">
          {typeof title === "string" ? <LineMaskReveal text={title} /> : title}
        </h2>
        {description && (
          <Reveal delay={0.1}>
            <p
              className={cn(
                "text-muted-foreground mt-5 max-w-2xl text-body-lg text-pretty",
                align === "center" && "mx-auto",
              )}
            >
              {description}
            </p>
          </Reveal>
        )}
      </div>
      {aside && (
        <Reveal delay={0.12} className={cn("shrink-0", align === "center" && "lg:mt-2")}>
          {aside}
        </Reveal>
      )}
    </div>
  );
}

/** Corner registration marks — the crop marks that frame a full-bleed panel. */
export function CornerMarks({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-4", className)}>
      {[
        "left-0 top-0 border-l border-t",
        "right-0 top-0 border-r border-t",
        "left-0 bottom-0 border-l border-b",
        "right-0 bottom-0 border-r border-b",
      ].map((pos) => (
        <span key={pos} className={cn("absolute size-3 border-foreground/25", pos)} />
      ))}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  art,
  artWidth,
  artCaption,
  cue,
  meta,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  art?: ArtVariant;
  artWidth?: string;
  /** Label chip floating on the art panel — names the scene being viewed. */
  artCaption?: string;
  /** Scroll bridge to the content below; off by default on tight heroes. */
  cue?: boolean;
  /** Mono facts strip under the copy (e.g. duration · level · mode). */
  meta?: string[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-foreground/10 pt-28 pb-16 md:pt-36 md:pb-24">
      <LightField density={4} opacity={0.55} />
      <div className="rule-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />

      <div className="container-page relative">
        <div className={cn("grid items-center gap-14", art && "lg:grid-cols-[1.15fr_0.85fr]")}>
          <div>
            <Reveal>
              <Eyebrow scramble>{eyebrow}</Eyebrow>
            </Reveal>
            <h1 className="text-hero font-display mt-7 max-w-5xl font-semibold text-balance">
              {typeof title === "string" ? <LineMaskReveal text={title} /> : title}
            </h1>
            <Reveal delay={0.12}>
              <p className="text-muted-foreground mt-7 max-w-2xl text-body-lg text-pretty">
                {description}
              </p>
            </Reveal>
            {meta && (
              <Reveal delay={0.16}>
                <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
                  {meta.map((m) => (
                    <li
                      key={m}
                      className="font-label text-muted-foreground flex items-center gap-2 text-[10px]"
                    >
                      <span aria-hidden="true" className="bg-primary size-1 rounded-full" />
                      {m}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            {children && <Reveal delay={0.2}>{children}</Reveal>}
          </div>
          {art && (
            <Reveal delay={0.16} className="hidden lg:block">
              <Parallax speed={0.05}>
                <div className="relative">
                  <div
                    className={cn(
                      "border-foreground/12 relative h-80 w-full overflow-hidden rounded-[3px] border md:h-96",
                      artWidth,
                    )}
                  >
                    <SceneArt variant={art} />
                    <CornerMarks />
                    {artCaption && (
                      <div className="bg-background/80 absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3.5 py-1.5 backdrop-blur-md">
                        <span className="bg-gradient-brand inline-block size-1.5 rounded-full" />
                        <span className="font-label text-[9px]">{artCaption}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Parallax>
            </Reveal>
          )}
        </div>
        {cue && (
          <div className="mt-20 flex justify-center">
            <ScrollCue />
          </div>
        )}
      </div>
    </section>
  );
}

export function StatBand() {
  return (
    <section className="relative border-y border-foreground/10">
      <div className="container-page py-14">
        <div className="grid divide-y divide-foreground/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.07}
              className="group relative px-2 py-8 text-center sm:px-6"
            >
              <span
                aria-hidden="true"
                className="bg-gradient-brand absolute top-0 left-1/2 h-px w-0 -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full motion-reduce:transition-none"
              />
              <p
                aria-hidden="true"
                className="font-label text-muted-foreground/60 mb-4 text-[10px] tabular-nums"
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-none font-semibold tabular-nums">
                <Counter
                  to={s.value}
                  suffix={s.suffix}
                  decimals={"decimals" in s ? (s.decimals as number) : 0}
                />
              </p>
              <p className="text-muted-foreground mt-3 text-sm">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection({
  title = "Your next chapter starts with one application",
  description = "Cohorts fill fast. Reserve your seat, book a campus tour, or talk to an admissions officer today.",
  primary = { label: "Apply now", to: "/admissions" },
  secondary = { label: "Talk to us", to: "/contact" },
}: {
  title?: string;
  description?: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  return (
    <section className="relative overflow-hidden border-t border-foreground/10 py-24 md:py-32">
      <LightField density={5} opacity={0.7} />
      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div>
            <Reveal>
              <Eyebrow scramble>Applications open</Eyebrow>
            </Reveal>
            <h2 className="text-h2 font-display mt-7 font-semibold text-balance">
              {typeof title === "string" ? <LineMaskReveal text={title} /> : title}
            </h2>
            <Reveal delay={0.1}>
              <p className="text-muted-foreground mt-6 max-w-xl text-body-lg text-pretty">
                {description}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="flex flex-wrap gap-3 lg:justify-end">
            <Magnetic strength={12}>
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-14 rounded-full border-0 px-8 text-base font-semibold transition-colors duration-300"
              >
                <Link to={primary.to}>
                  {primary.label} <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </Magnetic>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-foreground/20 hover:border-foreground/50 hover:bg-foreground/5 h-14 rounded-full px-8 text-base font-medium transition-colors"
            >
              <Link to={secondary.to}>
                {secondary.label} <ArrowUpRight className="ml-2 size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        {/* The five-engine hairline — the wayfinding motif, miniature. */}
        <div aria-hidden="true" className="mt-20 flex h-px gap-1.5">
          <span className="bg-gradient-learning w-full" />
          <span className="bg-gradient-career w-full" />
          <span className="bg-gradient-services w-full" />
          <span className="bg-gradient-erp w-full" />
          <span className="bg-gradient-community w-full" />
        </div>
      </div>
    </section>
  );
}
