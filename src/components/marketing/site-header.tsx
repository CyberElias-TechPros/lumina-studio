import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight, Moon, Sun, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion";

const nav = [
  { label: "Programs", to: "/programs" },
  { label: "Pricing", to: "/pricing" },
  { label: "Engines", to: "/engines" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Community", to: "/community" },
  { label: "About", to: "/about" },
  { label: "Team", to: "/team" },
  {
    label: "More",
    to: "/blog",
    subLinks: [
      { label: "Blog & Insights", to: "/blog" },
      { label: "Glossary", to: "/glossary" },
      { label: "Career Guides", to: "/career-guides" },
      { label: "Resources", to: "/resources" },
      { label: "Library", to: "/library" },
      { label: "FAQ", to: "/faq" },
      { label: "Events", to: "/events" },
      { label: "Scholarships", to: "/scholarships" },
      { label: "Contact", to: "/contact" },
      { label: "Vizier", to: "/vizier" },
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Accessibility", to: "/accessibility" },
    ],
  },
];

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)}>
      <span className="bg-gradient-brand shadow-glow relative grid size-9 place-items-center rounded-xl">
        <ShieldCheck className="text-primary-foreground size-5" />
        <span className="bg-gradient-brand absolute inset-0 rounded-xl opacity-0 blur-md transition-opacity group-hover:opacity-70" />
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
      className="hover:bg-accent relative grid size-9 place-items-center rounded-lg border transition-colors"
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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b py-2 shadow-soft" : "border-b border-transparent py-4",
      )}
    >
      <div className="container-page flex items-center justify-between gap-4">
        <BrandMark />

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = pathname.startsWith(item.to);
            const hasSub = "subLinks" in item && item.subLinks;
            return (
              <div key={item.to} className="group relative">
                <Link
                  to={item.to}
                  className={cn(
                    "relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && !hasSub && (
                    <motion.span
                      layoutId="nav-pill"
                      className="bg-accent absolute inset-0 rounded-lg"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                  {hasSub && (
                    <svg
                      className="relative size-3.5 opacity-60"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {hasSub && (
                  <div className="pointer-events-none absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-2 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                    <div className="bg-popover text-popover-foreground shadow-elevated mt-1 rounded-xl border p-2">
                      {item.subLinks!.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className="hover:bg-accent block rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/auth/sign-in">Sign in</Link>
          </Button>
          <Magnetic className="hidden sm:block">
            <Button asChild size="sm" className="bg-gradient-brand shadow-glow border-0">
              <Link to="/admissions">
                Apply now <ArrowUpRight className="ml-1 size-4" />
              </Link>
            </Button>
          </Magnetic>
          <button
            aria-label="Menu"
            className="hover:bg-accent grid size-9 place-items-center rounded-lg border lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
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
                          className="text-muted-foreground hover:bg-accent block rounded-lg px-6 py-1.5 text-sm transition-colors"
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
