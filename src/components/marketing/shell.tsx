import type { ReactNode } from "react";
import { Link } from "@/lib/next-compat/router";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { ThemeSync } from "./theme-sync";
import { ChatWidget } from "@/components/assistant/chat-widget";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground relative flex min-h-screen flex-col">
      <ThemeSync />
      <a
        href="#main-content"
        className="bg-primary text-primary-foreground focus-visible:ring-ring fixed top-3 left-1/2 z-[95] -translate-x-1/2 -translate-y-28 rounded-md px-4 py-2 text-sm font-medium transition-transform focus-visible:translate-y-0 focus-visible:ring-2"
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
      <ChatWidget />
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
      className={cn("text-primary text-xs font-semibold tracking-[0.12em] uppercase", className)}
    >
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
            "font-display mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl",
            !eyebrow && "mt-0",
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "text-muted-foreground mt-3 max-w-xl text-base leading-relaxed text-pretty",
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
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-4", className)}>
      {[
        "left-0 top-0 border-l border-t",
        "right-0 top-0 border-r border-t",
        "left-0 bottom-0 border-l border-b",
        "right-0 bottom-0 border-r border-b",
      ].map((pos) => (
        <span key={pos} className={cn("border-border absolute size-2.5", pos)} />
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
    <section className="border-border border-b py-12 md:py-16">
      <div className="container-page">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-display mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed text-pretty sm:text-[17px]">
          {description}
        </p>
        {meta && meta.length > 0 && (
          <ul className="text-muted-foreground mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {meta.map((item) => (
              <li key={item}>{item}</li>
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
    <section className="border-border bg-muted/40 border-t">
      <div className="container-page flex flex-col gap-6 py-14 md:flex-row md:items-end md:justify-between md:py-16">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {title}
          </h2>
          <p className="text-muted-foreground mt-3 text-base leading-relaxed">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            {/^(https?:)?\/\//i.test(primary.to) ? (
              <a href={primary.to} target="_blank" rel="noopener noreferrer">
                {primary.label}
              </a>
            ) : (
              <Link to={primary.to}>{primary.label}</Link>
            )}
          </Button>
          <Button asChild variant="outline">
            {/^(https?:)?\/\//i.test(secondary.to) ? (
              <a href={secondary.to} target="_blank" rel="noopener noreferrer">
                {secondary.label}
              </a>
            ) : (
              <Link to={secondary.to}>{secondary.label}</Link>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
