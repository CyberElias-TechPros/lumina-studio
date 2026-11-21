"use client";

import { useEffect, useState } from "react";
import { Link, useRouterState } from "@/lib/next-compat/router";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

/** Primary navigation: what most visitors come for. */
const nav = [
  { label: "Courses", to: "/classes" },
  { label: "Free labs", to: "/tools" },
  { label: "Notes", to: "/blog" },
  { label: "IT Services", to: "/services" },
  { label: "Admissions", to: "/admissions" },
] as const;

/** Secondary links, grouped under "More" on desktop and listed after the primary links on mobile. */
const moreNav = [
  { label: "About CEA", to: "/about" },
  { label: "AI Engineering", to: "/ai-engineering" },
  { label: "Open curriculum", to: "/open-curriculum" },
  { label: "Shop", to: "/shop" },
  { label: "Schools & partners", to: "/schools" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
] as const;

/** Free, time-sensitive opportunity: always visible as its own highlighted link. */
const featured = {
  label: "iDICE Skills-to-Jobs",
  tag: "Free",
  to: "/opportunities/idice-skills-to-jobs",
} as const;

function FeaturedLink({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      to={featured.to}
      onClick={onClick}
      className={cn(
        "border-primary/25 bg-primary/8 text-primary hover:bg-primary/14 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors",
        // display is set by the caller (desktop pill vs. mobile row)
        className,
      )}
    >
      <span className="bg-primary inline-flex size-1.5 rounded-full" aria-hidden="true" />
      <span className="xl:hidden">iDICE</span>
      <span className="hidden xl:inline">{featured.label}</span>
      <span className="bg-primary text-primary-foreground rounded-full px-1.5 py-px text-[11px] font-bold tracking-wider uppercase">
        {featured.tag}
      </span>
    </Link>
  );
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("group flex items-center gap-3", className)}
      aria-label="Cyber Elias Academy — home"
    >
      <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/15 bg-[linear-gradient(145deg,#1d4ed8_0%,#0f2742_100%)] shadow-sm">
        <span className="font-display relative text-xs font-extrabold tracking-wider text-white">
          CEA
        </span>
      </span>
      <span className="leading-tight">
        <span className="font-display block text-[15px] font-bold tracking-tight whitespace-nowrap">
          Cyber Elias Academy
        </span>
        <span className="text-muted-foreground block text-[11px] font-medium tracking-wider uppercase">
          Port Harcourt · NG
        </span>
      </span>
    </Link>
  );
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        try {
          localStorage.setItem("cea-marketing-theme", next ? "dark" : "light");
        } catch {
          /* ignore */
        }
      }}
      className="border-foreground/12 bg-foreground/[0.04] hover:bg-foreground/[0.09] grid size-9 shrink-0 cursor-pointer place-items-center rounded-full border backdrop-blur-sm transition-colors"
    >
      {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  );
}

/** Thin gradient progress hairline pinned to the capsule's bottom edge. */
function ScrollProgress() {
  const [scale, setScale] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScale(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (raf === 0) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <span
      aria-hidden="true"
      className="cea-header-progress pointer-events-none absolute inset-x-4 bottom-0 h-px"
      style={{ transform: `scaleX(${scale})` }}
    />
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-[70] w-full">
      <div className="container-page pt-3 pb-2 sm:pt-4">
        <div className="cea-header-capsule relative flex h-14 items-center justify-between gap-3 rounded-2xl pr-2 pl-3 sm:h-16 sm:gap-6 sm:rounded-full sm:pr-3 sm:pl-4">
          <BrandMark />
          <nav className="hidden items-center gap-6 lg:flex xl:gap-7" aria-label="Primary">
            {nav.map((item) => {
              const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  data-active={active || undefined}
                  className={cn(
                    "cea-nav-link text-[13px] transition-colors xl:text-sm",
                    active
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground data-[state=open]:text-foreground inline-flex cursor-pointer items-center gap-1 text-[13px] transition-colors outline-none xl:text-sm">
                More{" "}
                <ChevronDown className="size-3.5 transition-transform duration-200 data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-48 rounded-xl p-1.5">
                {moreNav.map((item) => (
                  <DropdownMenuItem key={item.to} asChild>
                    <Link to={item.to} className="cursor-pointer rounded-lg">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          <div className="flex items-center gap-2">
            <FeaturedLink className="hidden xl:inline-flex" />
            <ThemeToggle />
            <Link
              to="/auth/sign-in"
              rel="nofollow"
              className="text-muted-foreground hover:text-foreground border-foreground/12 hover:border-foreground/25 hidden h-9 items-center rounded-full border border-transparent px-3.5 text-sm whitespace-nowrap transition-colors sm:inline-flex"
            >
              Portal
            </Link>
            <Link
              to="/apply"
              className="group bg-[linear-gradient(180deg,#3f7dff_0%,#1d5ae0_100%)] hidden h-9 items-center gap-1.5 rounded-full px-4 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgb(47_107_255/0.8),0_1px_0_0_rgb(255_255_255/0.35)_inset] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgb(47_107_255/0.9),0_1px_0_0_rgb(255_255_255/0.4)_inset] sm:inline-flex"
            >
              Apply
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              className="border-foreground/12 bg-foreground/[0.04] hover:bg-foreground/[0.09] relative z-[70] grid size-9 cursor-pointer place-items-center rounded-full border transition-colors lg:hidden"
              aria-label={open ? "Close menu" : "Menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
          <ScrollProgress />
        </div>
      </div>

      {open && (
        <div
          className="cea-menu-panel fixed inset-0 z-[60] flex flex-col pt-20 sm:pt-24 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <nav
            className="container-page flex flex-1 flex-col justify-center gap-1 overflow-y-auto py-6"
            aria-label="Mobile"
          >
            <FeaturedLink
              className="cea-menu-link mb-4 inline-flex w-max justify-start py-2.5"
              onClick={() => setOpen(false)}
            />
            {nav.map((item, i) => {
              const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${80 + i * 60}ms` }}
                  className="cea-menu-link group flex items-baseline justify-between border-b border-white/8 py-3.5 text-white"
                >
                  <span className="font-display text-3xl font-semibold tracking-tight">
                    {item.label}
                  </span>
                  <ArrowUpRight
                    className="size-6 text-[#7fb5ff] opacity-70 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                  {active ? <span className="sr-only">(current page)</span> : null}
                </Link>
              );
            })}
            <div className="mt-6 grid grid-cols-2 gap-2">
              {[...moreNav, { label: "Sign in", to: "/auth/sign-in" } as const].map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${380 + i * 50}ms` }}
                  className="cea-menu-link rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm font-medium text-[#c8d6ef]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              to="/apply"
              onClick={() => setOpen(false)}
              style={{ animationDelay: "620ms" }}
              className="cea-menu-link mt-5 inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(180deg,#3f7dff,#1d5ae0)] text-base font-semibold text-white shadow-[0_14px_40px_-12px_rgb(47_107_255/0.85)]"
            >
              Apply for admission <ArrowRight className="size-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function MenuButton({ className }: { className?: string }) {
  return <Menu className={cn("size-4", className)} />;
}
