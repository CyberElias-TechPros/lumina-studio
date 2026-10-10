"use client";

import { useEffect, useState } from "react";
import { Link, useRouterState } from "@/lib/next-compat/router";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
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
  { label: "Shop", to: "/shop" },
  { label: "Notes", to: "/blog" },
  { label: "Admissions", to: "/admissions" },
  { label: "About", to: "/about" },
] as const;

/** Secondary links, grouped under "More" on desktop and listed after the primary links on mobile. */
const moreNav = [
  { label: "Services", to: "/services" },
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
        "border-primary/40 bg-primary/5 text-primary hover:bg-primary/10 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
        // display is set by the caller (desktop pill vs. mobile row)
        className,
      )}
    >
      <span className="bg-primary size-1.5 rounded-full" aria-hidden="true" />
      <span className="xl:hidden">iDICE</span>
      <span className="hidden xl:inline">{featured.label}</span>
      <span className="bg-primary text-primary-foreground rounded px-1.5 py-px text-[10px] font-semibold tracking-wide uppercase">
        {featured.tag}
      </span>
    </Link>
  );
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="Cyber Elias Academy — home"
    >
      <span className="bg-primary text-primary-foreground grid size-8 place-items-center rounded-md text-[11px] font-semibold tracking-tight">
        CEA
      </span>
      <span className="leading-tight">
        <span className="font-display block text-[15px] font-semibold tracking-tight">
          <span className="whitespace-nowrap">Cyber Elias Academy</span>
        </span>
        <span className="text-muted-foreground block text-[11px]">Port Harcourt</span>
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
      className="border-border hover:bg-muted grid size-9 place-items-center rounded-md border"
    >
      {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
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
    <header
      className={cn(
        "bg-background/95 sticky top-0 z-[60] border-b backdrop-blur-md",
        scrolled ? "border-border" : "border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <BrandMark />
        <nav className="hidden items-center gap-4 lg:flex xl:gap-5" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm transition-colors",
                  active
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground data-[state=open]:text-foreground inline-flex items-center gap-1 text-sm transition-colors outline-none">
              More <ChevronDown className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-48">
              {moreNav.map((item) => (
                <DropdownMenuItem key={item.to} asChild>
                  <Link to={item.to} className="cursor-pointer">
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="flex items-center gap-2">
          <FeaturedLink className="hidden lg:inline-flex" />
          <ThemeToggle />
          <Link
            to="/auth/sign-in"
            rel="nofollow"
            className="text-muted-foreground hover:text-foreground hidden text-sm whitespace-nowrap sm:block"
          >
            Sign in
          </Link>
          <Link
            to="/apply"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hidden rounded-md px-3.5 py-2 text-sm font-medium sm:inline-flex"
          >
            Apply
          </Link>
          <button
            type="button"
            className="border-border hover:bg-muted grid size-9 place-items-center rounded-md border lg:hidden"
            aria-label={open ? "Close menu" : "Menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div
          className="border-border bg-background border-t lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
            <FeaturedLink
              className="mb-2 flex justify-center py-2.5"
              onClick={() => setOpen(false)}
            />
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="hover:bg-muted rounded-md px-2 py-2.5 text-sm"
              >
                {item.label}
              </Link>
            ))}
            <p className="text-muted-foreground px-2 pt-4 pb-1 text-xs font-semibold tracking-wide uppercase">
              More
            </p>
            {moreNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="hover:bg-muted rounded-md px-2 py-2.5 text-sm"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/auth/sign-in"
              rel="nofollow"
              onClick={() => setOpen(false)}
              className="hover:bg-muted rounded-md px-2 py-2.5 text-sm"
            >
              Sign in
            </Link>
            <Link
              to="/apply"
              onClick={() => setOpen(false)}
              className="bg-primary text-primary-foreground mt-2 rounded-md px-3 py-2.5 text-center text-sm font-medium"
            >
              Apply
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
