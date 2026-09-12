import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight, Moon, Sun, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE, LiveClock, Magnetic, SPRING } from "@/components/motion";

const nav = [
  { label: "Programs", to: "/programs", index: "01" },
  { label: "Pricing", to: "/pricing", index: "02" },
  { label: "Engines", to: "/engines", index: "03" },
  { label: "Services", to: "/services", index: "04" },
  { label: "Work", to: "/work", index: "05" },
  { label: "Community", to: "/community", index: "06" },
  { label: "About", to: "/about", index: "07" },
];
const moreLinks = [
  { label: "Pricing", to: "/pricing" }, { label: "Services", to: "/services" }, { label: "Team", to: "/team" }, { label: "Admissions", to: "/admissions" }, { label: "Scholarships", to: "/scholarships" }, { label: "Events", to: "/events" }, { label: "Alumni", to: "/alumni" }, { label: "Partners", to: "/partners" }, { label: "Marketplace", to: "/marketplace" }, { label: "Blog & Insights", to: "/blog" }, { label: "Glossary", to: "/glossary" }, { label: "Career Guides", to: "/career-guides" }, { label: "Resources", to: "/resources" }, { label: "Library", to: "/library" }, { label: "FAQ", to: "/faq" }, { label: "Stories", to: "/stories" }, { label: "Careers", to: "/careers" }, { label: "Contact", to: "/contact" }, { label: "Vizier", to: "/vizier" }, { label: "Privacy", to: "/privacy" }, { label: "Terms", to: "/terms" }, { label: "Accessibility", to: "/accessibility" },
];

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-3", className)} aria-label="Cyber Elias Academy — home">
      <span className="relative grid size-9 place-items-center"><span className="pointer-events-none absolute size-12 rounded-full bg-gradient-brand opacity-0 blur-[14px] transition-opacity duration-500 group-hover:opacity-20" /><svg viewBox="0 0 40 40" className="size-9 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[90deg] motion-reduce:transition-none" aria-hidden="true"><defs><linearGradient id="cea-mark" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="var(--primary-glow)" /><stop offset="100%" stopColor="var(--gold)" /></linearGradient></defs><circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" /><path d="M20 4 L34 20 L20 36 L6 20 Z" fill="none" stroke="url(#cea-mark)" strokeWidth="1.25" strokeLinejoin="round" /><path d="M20 11 L20 29" stroke="url(#cea-mark)" strokeWidth="2.5" strokeLinecap="round" /></svg></span>
      <span className="leading-none"><span className="font-display block text-[15px] font-semibold tracking-[-0.01em]">Cyber Elias</span><span className="font-label text-muted-foreground mt-1 block text-[9px] tracking-[0.18em]">Academy</span></span>
    </Link>
  );
}

export function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  return (
    <button aria-label={dark ? "Switch to daylight theme" : "Switch to night theme"} onClick={() => { const next = !dark; setDark(next); document.documentElement.classList.toggle("dark", next); try { localStorage.setItem("cea-marketing-theme", next ? "dark" : "light"); } catch {} }} className="border-foreground/12 hover:border-foreground/35 hover:bg-foreground/5 relative grid size-9 place-items-center rounded-full border backdrop-blur-md transition-colors">
      <AnimatePresence mode="wait" initial={false}><motion.span key={dark ? "moon" : "sun"} initial={{ opacity: 0, rotate: -60, scale: 0.6 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 60, scale: 0.6 }} transition={{ duration: 0.22 }} className="absolute">{dark ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}</motion.span></AnimatePresence>
    </button>
  );
}

function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);
  return (
    <AnimatePresence>{open && (
      <motion.div className="bg-background fixed inset-0 z-[80] overflow-y-auto" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.8, ease: EASE }} role="dialog" aria-modal="true" aria-label="Site menu">
        <div className="pointer-events-none absolute inset-0 overflow-hidden"><div className="bg-gradient-brand absolute -top-40 -left-32 size-[52rem] rounded-full opacity-[0.22] blur-[140px]" /><div className="absolute -right-40 bottom-0 size-[44rem] rounded-full bg-gradient-learning opacity-[0.16] blur-[150px]" /><div className="absolute left-1/2 top-1/2 size-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-ink opacity-[0.25] blur-[120px]" /><div className="rule-grid absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" /></div>
        <div className="container-page relative flex min-h-screen flex-col py-8 md:py-10"><div className="flex items-start justify-between"><BrandMark /><div className="flex items-center gap-3"><span className="font-label hidden items-center gap-2 text-[10px] text-muted-foreground md:flex"><LiveClock /> <span className="opacity-30">·</span> Port Harcourt</span><button type="button" onClick={onClose} aria-label="Close menu" className="border-foreground/12 hover:border-foreground/40 hover:bg-foreground/5 flex items-center gap-3 rounded-full border bg-background/60 px-4 py-2 text-xs font-medium backdrop-blur-md transition-colors"><span className="font-label text-[9px]">Close</span><X className="size-4" /></button></div></div>
          <div className="mt-16 grid flex-1 gap-16 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20"><nav aria-label="All sections"><ul className="border-foreground/10 border-t">{nav.map((item, i) => { const active = pathname.startsWith(item.to); return (<li key={item.to} className="border-foreground/10 overflow-hidden border-b"><motion.div initial={{ y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.75, delay: 0.12 + i * 0.06, ease: EASE }}><Link to={item.to} onClick={onClose} aria-current={active ? "page" : undefined} className="group relative flex items-baseline gap-6 py-5 md:py-7" data-cursor={item.label}><span aria-hidden="true" className="bg-gradient-brand pointer-events-none absolute inset-0 -z-10 origin-bottom scale-y-0 opacity-[0.09] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 motion-reduce:transition-none" /><span className="font-label text-muted-foreground w-8 shrink-0 text-[10px] tabular-nums">{item.index}</span><span className="font-display text-[clamp(2.2rem,7vw,4.6rem)] leading-[0.95] font-semibold tracking-tight transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 motion-reduce:transition-none">{item.label}</span><ArrowUpRight className="text-primary ml-auto hidden size-6 self-center opacity-0 transition-all duration-500 group-hover:opacity-100 md:block" /></Link></motion.div></li>); })}</ul><div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">{moreLinks.map((link, i) => (<motion.div key={link.to} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 + i * 0.02, duration: 0.4, ease: EASE }}><Link to={link.to} onClick={onClose} className="link-wipe text-muted-foreground hover:text-foreground text-sm transition-colors">{link.label}</Link></motion.div>))}</div></nav>
            <motion.aside initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38, duration: 0.6, ease: EASE }} className="flex flex-col justify-between gap-10"><div className="glass-strong relative overflow-hidden rounded-[16px] p-6"><div className="flex items-center gap-2"><Sparkles className="size-4 text-primary" /><p className="font-label text-[10px] text-muted-foreground">Direct</p></div><div className="mt-5 space-y-3 text-sm"><a href="mailto:hello@cea.ng" className="hover:text-primary flex items-center gap-3 transition-colors"><Mail className="size-4 shrink-0" /> hello@cea.ng</a><a href="tel:+2349058628386" className="hover:text-primary flex items-center gap-3 transition-colors"><Phone className="size-4 shrink-0" /> +234 905 862 8386</a><p className="text-muted-foreground flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0" /> 26 Ebony Road, Port Harcourt, Nigeria</p></div></div><div className="panel relative overflow-hidden rounded-[16px] p-6"><p className="font-label text-muted-foreground text-[10px]">Cohort 01 — Open</p><p className="text-muted-foreground mt-4 max-w-xs text-sm leading-relaxed">Applications are open for the Port Harcourt campus and online tracks. Places are limited to keep mentorship real.</p><Link to="/admissions" onClick={onClose} className="sheen bg-gradient-brand text-primary-foreground mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">Start application <ArrowUpRight className="size-4" /></Link><div className="mt-6 flex h-px gap-1"><span className="bg-gradient-learning w-full" /><span className="bg-gradient-career w-full" /><span className="bg-gradient-services w-full" /></div></div><div className="flex items-center gap-3"><LiveClock className="font-label text-muted-foreground text-[10px]" /><span className="text-muted-foreground font-label text-[9px]">WAT · 04°48′N 07°00′E</span></div></motion.aside></div>
          <div className="mt-16 border-t border-foreground/10 pt-6"><p className="font-display text-outline text-[clamp(2rem,8vw,6rem)] leading-none opacity-20">Cyber Elias Academy</p></div>
        </div>
      </motion.div>)}</AnimatePresence>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => { const y = window.scrollY; setScrolled(y > 16); setHidden(y > 420 && y > lastY.current && !open); lastY.current = y; };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll);
  }, [open]);
  return (
    <>
      <motion.header className={cn("fixed inset-x-0 top-0 z-[60] transition-[transform,background-color,border-color,padding,backdrop-filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]", hidden ? "-translate-y-full" : "translate-y-0")} initial={false}>
        <span aria-hidden="true" className={cn("bg-gradient-brand pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-700", scrolled ? "opacity-70" : "opacity-0")} />
        <div className={cn("border-foreground/10 transition-all duration-700", scrolled ? "border-b bg-background/60 py-3 backdrop-blur-[20px] backdrop-saturate-[180%] supports-[backdrop-filter]:bg-background/60" : "border-b border-transparent py-5")}>
          <div className="container-page flex items-center justify-between gap-6"><BrandMark />
            <nav className="hidden items-center gap-5 xl:flex 2xl:gap-7" aria-label="Primary">{nav.map((item) => { const active = pathname.startsWith(item.to); return (<Link key={item.to} to={item.to} aria-current={active ? "page" : undefined} className={cn("group relative flex items-center gap-2 text-[13px] tracking-[-0.01em] transition-colors 2xl:text-sm", active ? "text-foreground" : "text-muted-foreground hover:text-foreground")}><span className="relative">{item.label}<span className={cn("bg-primary absolute -bottom-1.5 left-0 h-px w-full origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]", active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} /></span></Link>); })}</nav>
            <div className="flex items-center gap-2 md:gap-3"><span className="font-label text-muted-foreground hidden items-center gap-2 text-[10px] 2xl:flex"><span className="relative flex size-1.5"><span className="bg-success absolute inline-flex size-full rounded-full" /><span className="bg-success absolute inline-flex size-full animate-ping rounded-full opacity-60 motion-reduce:animate-none" /></span>Cohort 01 open</span><ThemeToggle /><Link to="/auth/sign-in" className="hover:text-primary text-muted-foreground hidden text-sm transition-colors sm:block 2xl:hidden">Sign in</Link><Magnetic className="hidden sm:block" strength={10}><Link to="/admissions" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"><span className="relative z-10 flex items-center gap-1.5">Apply <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span></Link></Magnetic><button aria-label={open ? "Close menu" : "Menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)} className="border-foreground/12 hover:border-foreground/35 hover:bg-foreground/5 flex items-center gap-3 rounded-full border bg-background/40 py-2.5 pr-3 pl-4 backdrop-blur-md transition-colors"><span className="font-label text-[9px]">Menu</span><span className="relative grid size-4 place-items-center"><motion.span className="bg-foreground absolute block h-px w-4" animate={{ rotate: open ? 45 : 0, y: open ? 0 : -3.5 }} transition={SPRING.snappy} /><motion.span className="bg-foreground absolute block h-px w-4" animate={{ rotate: open ? -45 : 0, y: open ? 0 : 3.5, opacity: 1 }} transition={SPRING.snappy} /></span></button></div>
          </div>
        </div>
      </motion.header>
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
export function MenuButton({ className }: { className?: string }) { return <Menu className={cn("size-4", className)} />; }
