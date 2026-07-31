import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Aurora, Counter, Reveal, ScrollProgressBar, Spotlight } from "@/components/motion";
import { stats } from "@/data/site";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgressBar />
      <SiteHeader />
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 pt-20"
      >
        {children}
      </motion.main>
      <SiteFooter />
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

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-5 text-3xl font-extrabold text-balance sm:text-4xl md:text-[2.75rem] md:leading-[1.08]">
        {title}
      </h2>
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
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b">
      <Aurora className="opacity-70" />
      <Spotlight />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div className="container-page relative py-20 md:py-28">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl md:leading-[1.05]">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed text-pretty">
            {description}
          </p>
        </Reveal>
        {children && <Reveal delay={0.18}>{children}</Reveal>}
      </div>
    </section>
  );
}

export function StatBand() {
  return (
    <section className="border-y">
      <div className="container-page grid divide-y sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="px-2 py-10 text-center">
            <p className="font-display text-gradient text-4xl font-extrabold sm:text-5xl">
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
        <div className="bg-gradient-ink text-ink-foreground shadow-elevated relative overflow-hidden rounded-3xl px-8 py-16 md:px-16 md:py-20">
          <Aurora className="opacity-60" />
          <Spotlight />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-extrabold text-balance sm:text-4xl md:text-5xl md:leading-[1.08]">
              {title}
            </h2>
            <p className="text-ink-foreground/75 mt-5 text-lg leading-relaxed text-pretty">
              {description}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-brand shadow-glow border-0">
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
