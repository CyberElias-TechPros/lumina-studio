import type { ReactNode } from "react";
import { Link } from "@/lib/next-compat/router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { ThemeSync } from "./theme-sync";
import { ScrollExperience } from "./scroll-experience";
import { ChatWidget } from "@/components/assistant/chat-widget";
import { cn } from "@/lib/utils";

export function PageShell({
  children,
  hideAssistant = false,
}: {
  children: ReactNode;
  hideAssistant?: boolean;
}) {
  return (
    <div className="marketing-shell bg-background text-foreground relative flex min-h-screen flex-col overflow-x-clip">
      <ThemeSync />
      <ScrollExperience />
      <a
        href="#main-content"
        className="bg-primary text-primary-foreground focus-visible:ring-ring fixed top-3 left-1/2 z-[95] -translate-x-1/2 -translate-y-28 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform focus-visible:translate-y-0 focus-visible:ring-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      {/* Public assistant: answers fee/schedule/enrolment questions on every
          marketing page and hands over to WhatsApp when it doesn't know. */}
      {!hideAssistant && <ChatWidget />}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  scramble?: boolean;
}) {
  return (
    <span
      className={cn(
        "border-foreground/12 bg-foreground/[0.045] text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[9px] font-semibold tracking-[0.24em] uppercase backdrop-blur-sm sm:text-[10px]",
        className,
      )}
    >
      <span className="bg-primary-glow size-1 rounded-full shadow-[0_0_8px_2px_color-mix(in_oklab,var(--primary-glow)_70%,transparent)]" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  aside,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  number?: string;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
        align === "center" && "lg:flex-col lg:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2
          className={cn(
            "font-display mt-4 text-3xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-5xl",
            !eyebrow && "mt-0",
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "text-muted-foreground mt-4 max-w-xl text-base leading-relaxed text-pretty sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}

export function CornerMarks({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-5", className)}>
      {[
        "left-0 top-0 border-l border-t",
        "right-0 top-0 border-r border-t",
        "left-0 bottom-0 border-l border-b",
        "right-0 bottom-0 border-r border-b",
      ].map((pos) => (
        <span key={pos} className={cn("border-primary/45 absolute size-3", pos)} />
      ))}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  meta,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  art?: string;
  artWidth?: string;
  artCaption?: string;
  cue?: boolean;
  meta?: string[];
}) {
  return (
    <section className="cea-hero-v2">
      {/* architectural backdrop: fading grid + top glare */}
      <div aria-hidden="true" className="grid-fade pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px">
        <span className="hairline block h-px w-full" />
      </div>
      <CornerMarks className="opacity-70" />
      <div className="container-page relative py-16 md:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-display mt-6 max-w-4xl text-[clamp(2.6rem,1.6rem+4.4vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance">
          {title}
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed text-pretty">
          {description}
        </p>
        {meta && meta.length > 0 && (
          <ul className="text-muted-foreground mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-[0.18em] uppercase">
            {meta.map((item, i) => (
              <li key={item} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden="true" className="bg-primary/50 size-1 rounded-full" />}
                {item}
              </li>
            ))}
          </ul>
        )}
        {children}
      </div>
    </section>
  );
}

export function StatBand() {
  return null;
}

export function CTASection({
  title = "Ready to enrol?",
  description = "Tell us which course you want. We will reply with dates, the fee, and what to bring.",
  primary = { label: "Apply", to: "/apply" },
  secondary = { label: "Contact us", to: "/contact" },
}: {
  title?: string;
  description?: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  return (
    <section className="cea-cta-finale">
      <span
        aria-hidden="true"
        className="cea-cta-orbit top-1/2 left-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 sm:size-[52rem]"
      />
      <span
        aria-hidden="true"
        className="cea-cta-orbit top-1/2 left-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 border-white/10 sm:size-[34rem]"
      />
      <div aria-hidden="true" className="hairline-cool absolute inset-x-0 top-0 h-px" />
      <div className="container-page relative py-16 text-center md:py-24">
        <p className="font-mono text-[10px] tracking-[0.3em] text-[#7fb5ff] uppercase">Next step</p>
        <h2 className="font-display mx-auto mt-5 max-w-4xl text-4xl leading-[0.97] font-semibold tracking-[-0.045em] text-balance text-white sm:text-6xl lg:text-7xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#b9c8e2] sm:text-lg">
          {description}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          {/^(https?:)?\/\//i.test(primary.to) ? (
            <a
              href={primary.to}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-[linear-gradient(180deg,#3f7dff,#1d5ae0)] px-8 text-base font-semibold text-white shadow-[0_18px_50px_-14px_rgb(47_107_255/0.9),0_1px_0_0_rgb(255_255_255/0.35)_inset] transition-all hover:-translate-y-0.5"
            >
              {primary.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          ) : (
            <Link
              to={primary.to}
              className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-[linear-gradient(180deg,#3f7dff,#1d5ae0)] px-8 text-base font-semibold text-white shadow-[0_18px_50px_-14px_rgb(47_107_255/0.9),0_1px_0_0_rgb(255_255_255/0.35)_inset] transition-all hover:-translate-y-0.5"
            >
              {primary.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
          {/^(https?:)?\/\//i.test(secondary.to) ? (
            <a
              href={secondary.to}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-13 items-center gap-2 rounded-full border border-white/25 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/5"
            >
              {secondary.label}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <Link
              to={secondary.to}
              className="group inline-flex h-13 items-center gap-2 rounded-full border border-white/25 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/5"
            >
              {secondary.label}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </div>
        <p className="mt-10 font-mono text-[9px] tracking-[0.3em] text-[#61759a] uppercase">
          Admissions open · Two sessions a week · Port Harcourt
        </p>
      </div>
    </section>
  );
}
