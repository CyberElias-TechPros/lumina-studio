import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Courses", to: "/classes" },
  { label: "Shop", to: "/shop" },
  { label: "Notes", to: "/blog" },
  { label: "Admissions", to: "/admissions" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

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
          Cyber Elias Academy
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
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
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
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/auth/sign-in"
            rel="nofollow"
            className="text-muted-foreground hover:text-foreground hidden text-sm sm:block"
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
            className="border-border hover:bg-muted grid size-9 place-items-center rounded-md border md:hidden"
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
          className="border-border bg-background border-t md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
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
            <Link
              to="/faq"
              onClick={() => setOpen(false)}
              className="hover:bg-muted rounded-md px-2 py-2.5 text-sm"
            >
              FAQ
            </Link>
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
