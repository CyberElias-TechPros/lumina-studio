import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { WhatsAppFloat } from "./whatsapp-float";
import { Button } from "@/components/ui/button";
import { SceneArt, type ArtVariant } from "@/components/art/scene-art";
import { cn } from "@/lib/utils";
import {
  Aurora,
  Counter,
  EASE,
  LineMaskReveal,
  Parallax,
  Reveal,
  ScrollProgressBar,
  Spotlight,
} from "@/components/motion";
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgressBar />
      <a
        href="#main-content"
        className="bg-background text-foreground shadow-soft fixed top-3 left-1/2 z-[70] -translate-x-1/2 -translate-y-24 rounded-full border px-4 py-2 text-sm font-semibold transition-transform duration-200 focus-visible:translate-y-0 motion-reduce:transition-none"
      >
        Skip to content
      </a>
      <SiteHeader />
      <motion.main
        id="main-content"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex-1 pt-20"
      >
        {children}
      </motion.main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "border-primary/25 bg-primary/8 text-primary inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-bold tracking-[0.16em] uppercase",
        className,
      )}
    >
      <Sparkles className="size-3.5" />
      {children}
    </span>
  );
}

/**
 * The editorial section heading used across the public site.
 * `number` adds the house motif — "01 —" index rule — so sections read
 * like chapters of one story rather than detached page blocks (§43).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  number,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  number?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {number && (
        <p
          aria-hidden="true"
          className={cn(
            "text-muted-foreground mb-4 flex items-center gap-3 text-[11px] font-extrabold tracking-[0.3em] tabular-nums",
            align === "center" && "justify-center",
          )}
        >
          <span className="bg-gradient-brand inline-block h-px w-8" />
          {number}
          <span className="bg-border inline-block h-px w-16" />
        </p>
      )}
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-h2 mt-5 font-extrabold text-balance">{title}</h2>
      {description && (
        <p className="text-muted-foreground mt-4 text-base leading-relaxed text-pretty sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  art,
  artWidth,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  art?: ArtVariant;
  artWidth?: string;
}) {
  return (
    <section className="bg-card/60 noise relative overflow-hidden border-b">
      <Aurora className="opacity-60" />
      <Spotlight />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div className="container-page relative py-20 md:py-28">
        <div className={cn("grid items-center gap-12", art && "lg:grid-cols-[1fr_auto]")}>
          <div>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <h1 className="text-hero mt-6 max-w-4xl font-extrabold text-balance">
              {typeof title === "string" ? <LineMaskReveal text={title} /> : title}
            </h1>
            <Reveal delay={0.12}>
              <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl">
                {description}
              </p>
            </Reveal>
            {children && <Reveal delay={0.18}>{children}</Reveal>}
          </div>
          {art && (
            <Reveal delay={0.16} className="hidden lg:block">
              <Parallax speed={0.055}>
                <div
                  className={cn(
                    "shadow-elevated relative h-72 w-80 overflow-hidden rounded-[2rem] border transition-transform duration-500 hover:rotate-[-0.6deg] hover:scale-[1.015] md:h-80 md:w-96 xl:h-96 xl:w-[24rem]",
                    artWidth,
                  )}
                >
                  <SceneArt variant={art} />
                  <div className="from-card pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b to-transparent opacity-70" />
                </div>
              </Parallax>
            </Reveal>
          )}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
    </section>
  );
}

/**
 * Honest numbers only. Every figure here must be literally true and
 * provable — no vanity stats, no projections (AdSense recovery rule).
 */
const honestStats = [
  { value: 8, suffix: "", label: "Career programs", decimals: 0 },
  { value: 6, suffix: "", label: "Teachers, mentors & interns", decimals: 0 },
  { value: 1, suffix: "", label: "Campus · Port Harcourt", decimals: 0 },
  { value: 1, suffix: "-month", label: "Holiday program · Aug 2026", decimals: 0 },
];

export function StatBand() {
  return (
    <section className="border-y">
      <div className="container-page grid divide-y sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {honestStats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="group relative px-2 py-10 text-center">
            <span
              aria-hidden="true"
              className="bg-gradient-brand absolute top-0 left-1/2 h-[3px] w-14 -translate-x-1/2 origin-left scale-x-0 rounded-full opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-80"
            />
            <p className="font-display text-gradient text-4xl font-extrabold tabular-nums sm:text-5xl">
              <Counter
                to={s.value}
                suffix={s.suffix}
                decimals={"decimals" in s ? (s.decimals as number) : 0}
              />
            </p>
            <p className="text-muted-foreground mt-2 text-sm font-medium">{s.label}</p>
          </Reveal>
        ))}
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
    <section className="container-page py-20 md:py-28">
      <Reveal>
        <div className="bg-gradient-ink text-ink-foreground shadow-elevated noise relative overflow-hidden rounded-3xl px-8 py-16 md:px-16 md:py-20">
          <Aurora className="opacity-70" />
          <Spotlight />
          {/* rim light — a hairline of brand gradient along the top edge */}
          <span
            aria-hidden="true"
            className="bg-gradient-brand absolute inset-x-16 top-0 h-px opacity-70 [mask-image:linear-gradient(90deg,transparent,black_30%,black_70%,transparent)]"
          />
          <div className="relative z-[2] max-w-2xl">
            <h2 className="text-h2 font-extrabold text-balance">{title}</h2>
            <p className="text-ink-foreground/75 mt-5 text-lg leading-relaxed text-pretty">
              {description}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="sheen bg-gradient-brand shadow-glow border-0 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Link to={primary.to}>
                  {primary.label} <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground/10 bg-transparent"
              >
                <Link to={secondary.to}>{secondary.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
