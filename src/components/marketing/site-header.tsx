import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight, Moon, Sun, ShieldCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Magnetic, SPRING } from "@/components/motion";

const nav = [
  { label: "Programs", to: "/programs" },
  { label: "Admissions", to: "/admissions" },
  { label: "Pricing", to: "/pricing" },
  { label: "Visit us", to: "/visit" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Team", to: "/team" },
  {
    label: "More",
    to: "/faq",
    subLinks: [
      { label: "Career Guides", to: "/career-guides" },
      { label: "Resources & Templates", to: "/resources" },
      { label: "Glossary", to: "/glossary" },
      { label: "Library", to: "/library" },
      { label: "Events", to: "/events" },
      { label: "Services for Business", to: "/services" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Accessibility", to: "/accessibility" },
    ],
  },
];

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)}>
      <span className="bg-gradient-brand shadow-glow relative grid size-9 place-items-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:rotate-0 motion-reduce:group-hover:scale-100">
        <ShieldCheck className="text-primary-foreground size-5" />
        <span className="bg-gradient-brand absolute inset-0 rounded-xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70 motion-reduce:transition-none" />
      </span>
      <span className="leading-none">
        <span className="font-display block text-[15px] font-extrabold tracking-tight">
          Cyber Elias
        </span>
        <span className="text-muted-foreground block text-[10px] font-semibold tracking-[0.22em] uppercase">
          Academy
        </span>
      </span>
    </Link>
  );
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("cea-theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("cea-theme", next ? "dark" : "light");
      }}
      className="hover:bg-accent relative grid size-9 place-items-center rounded-lg border transition-colors motion-reduce:transition-none"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.22 }}
          className="absolute"
        >
          {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function MoreMenu() {
  const item = nav[nav.length - 1] as (typeof nav)[number] & {
    subLinks: { label: string; to: string }[];
  };
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeSub = item.subLinks.some((s) => pathname.startsWith(s.to));

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close on navigation.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div
      ref={wrapRef}
      className="group relative"
      onMouseEnter={() => {
        clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        closeTimer.current = setTimeout(() => setOpen(false), 140);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors motion-reduce:transition-none",
          open || activeSub ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        )}
      >
        {open && (
          <motion.span
            layoutId="nav-pill"
            className="bg-accent absolute inset-0 rounded-lg"
            transition={SPRING.soft}
          />
        )}
        <span className="relative">More</span>
        <ChevronDown
          className={cn(
            "relative size-3.5 opacity-60 transition-transform duration-200 motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="More sections"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={SPRING.snappy}
            className="bg-popover text-popover-foreground shadow-elevated absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 rounded-xl border p-2"
          >
            <div className="max-h-[min(60vh,26rem)] overflow-y-auto">
              {item.subLinks.map((sub, i) => (
                <motion.div
                  key={sub.to}
                  role="none"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 + i * 0.018, duration: 0.25 }}
                >
                  <Link
                    to={sub.to}
                    role="menuitem"
                    className="hover:bg-accent focus-visible:bg-accent relative block rounded-lg px-3 py-2 text-sm font-medium transition-colors motion-reduce:transition-none after:absolute after:inset-y-2 after:left-0 after:w-[3px] after:scale-y-0 after:rounded-full after:bg-gradient-to-b after:from-primary after:to-primary-glow after:transition-transform hover:after:scale-y-100"
                  >
                    {sub.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 motion-reduce:transition-none",
        scrolled
          ? "glass shadow-soft border-b py-2 backdrop-saturate-150"
          : "border-b border-transparent py-4",
      )}
    >
      {/* hairline brand glow along the top — reads as depth, not decoration */}
      <span
        aria-hidden="true"
        className={cn(
          "bg-gradient-brand pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-300 motion-reduce:transition-none",
          scrolled ? "opacity-60" : "opacity-0",
        )}
      />
      <div className="container-page flex items-center justify-between gap-4">
        <BrandMark />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.slice(0, -1).map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors motion-reduce:transition-none",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="bg-accent absolute inset-0 rounded-lg"
                    transition={SPRING.soft}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
          <MoreMenu />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/auth/sign-in">Sign in</Link>
          </Button>
          <Magnetic className="hidden sm:block">
            <Button
              asChild
              size="sm"
              className="sheen bg-gradient-brand shadow-glow border-0 transition-transform duration-200 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none"
            >
              <Link to="/admissions">
                Apply now <ArrowUpRight className="ml-1 size-4" />
              </Link>
            </Button>
          </Magnetic>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="hover:bg-accent grid size-9 place-items-center rounded-lg border transition-colors lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="glass overflow-hidden border-t lg:hidden"
          >
            <div className="container-page grid gap-1 py-4">
              {nav.flatMap((item, i) => {
                const items = [
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={item.to}
                      aria-current={pathname.startsWith(item.to) ? "page" : undefined}
                      className="hover:bg-accent block rounded-lg px-3 py-2.5 text-sm font-medium"
                    >
                      {item.label}
                    </Link>
                  </motion.div>,
                ];
                if ("subLinks" in item && item.subLinks) {
                  item.subLinks.forEach((sub, j) => {
                    items.push(
                      <motion.div
                        key={sub.to}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (i + j + 1) * 0.04 }}
                      >
                        <Link
                          to={sub.to}
                          className="text-muted-foreground hover:bg-accent block rounded-lg px-6 py-1.5 text-sm transition-colors motion-reduce:transition-none"
                        >
                          {sub.label}
                        </Link>
                      </motion.div>,
                    );
                  });
                }
                return items;
              })}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button asChild variant="outline">
                  <Link to="/auth/sign-in">Sign in</Link>
                </Button>
                <Button asChild className="bg-gradient-brand border-0">
                  <Link to="/admissions">Apply now</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
