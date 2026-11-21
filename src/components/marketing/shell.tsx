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
        "border-border bg-muted/65 text-foreground/80 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase",
        className,
      )}
    >
      <span className="bg-primary size-1.5 rounded-full" aria-hidden="true" />
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
    <section className="border-border bg-muted/25 relative border-b">
      <div className="container-page relative py-14 md:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-display mt-5 max-w-4xl text-[clamp(2.25rem,1.4rem+3.8vw,4rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance">
          {title}
        </h1>
        <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed text-pretty">
          {description}
        </p>
        {meta && meta.length > 0 && (
          <ul className="text-muted-foreground mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium tracking-wider uppercase">
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
    <section className="border-t border-[#2c333c] bg-[#161a1f] text-[#f4f1e9]">
      <div className="container-page relative py-16 text-center md:py-20">
        <p className="font-mono text-xs font-semibold tracking-[0.18em] text-[#d6fe52] uppercase">
          Next step
        </p>
        <h2 className="font-display mx-auto mt-4 max-w-3xl text-3xl leading-[1.04] font-semibold tracking-[-0.035em] text-balance text-[#f4f1e9] sm:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#c6cdd6] sm:text-lg">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          {/^(https?:)?\/\//i.test(primary.to) ? (
            <a
              href={primary.to}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#d6fe52] px-7 text-sm font-bold text-[#101214] transition-opacity hover:opacity-90"
            >
              {primary.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          ) : (
            <Link
              to={primary.to}
              className="group inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#d6fe52] px-7 text-sm font-bold text-[#101214] transition-opacity hover:opacity-90"
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
              className="group inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#3a424d] px-7 text-sm font-semibold text-[#f4f1e9] transition-colors hover:border-[#f4f1e9]/50 hover:bg-white/5"
            >
              {secondary.label}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <Link
              to={secondary.to}
              className="group inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#3a424d] px-7 text-sm font-semibold text-[#f4f1e9] transition-colors hover:border-[#f4f1e9]/50 hover:bg-white/5"
            >
              {secondary.label}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </div>
        <p className="mt-8 font-mono text-xs font-medium tracking-[0.14em] text-[#9ea7b4] uppercase">
          Admissions open · Two sessions a week · 24 Ebony Road, Port Harcourt
        </p>
      </div>
    </section>
  );
}
