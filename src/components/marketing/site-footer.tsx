import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone, Linkedin, Twitter, Instagram, Youtube, Facebook } from "lucide-react";
import { BrandMark } from "./site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitContact } from "@/lib/api/marketing";
import { BigMarquee, LiveClock, Reveal, SPRING } from "@/components/motion";

const columns = [
  { title: "Learn", links: [{ label: "All programs", to: "/programs" }, { label: "Engines", to: "/engines" }, { label: "Pricing", to: "/pricing" }, { label: "Admissions", to: "/admissions" }, { label: "Scholarships", to: "/scholarships" }] },
  { title: "Resources", links: [{ label: "Glossary", to: "/glossary" }, { label: "Career Guides", to: "/career-guides" }, { label: "Templates & Checklists", to: "/resources" }, { label: "Public Library", to: "/library" }, { label: "Blog & Insights", to: "/blog" }] },
  { title: "Work", links: [{ label: "Services", to: "/services" }, { label: "Case studies", to: "/work" }, { label: "Marketplace", to: "/marketplace" }, { label: "Partners", to: "/partners" }, { label: "Contact", to: "/contact" }] },
  { title: "Community", links: [{ label: "Events", to: "/events" }, { label: "Community", to: "/community" }, { label: "Alumni", to: "/alumni" }, { label: "Stories", to: "/stories" }, { label: "FAQ", to: "/faq" }] },
  { title: "Company", links: [{ label: "About", to: "/about" }, { label: "Team", to: "/team" }, { label: "Privacy Policy", to: "/privacy" }, { label: "Terms of Service", to: "/terms" }, { label: "Accessibility", to: "/accessibility" }] },
];
const socials = [
  { Icon: Facebook, href: "https://www.facebook.com/cybereliasacademy/", label: "Facebook" },
  { Icon: Twitter, href: "https://x.com/cybeliasacademy", label: "Twitter/X" },
  { Icon: Instagram, href: "https://www.instagram.com/cyberelias.tk/", label: "Instagram" },
  { Icon: Youtube, href: "https://www.youtube.com/@CyberEliasAcademy", label: "YouTube" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/cyber-elias-academy", label: "LinkedIn" },
];

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const onScroll = () => setVisible(window.scrollY > 900); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  return (<AnimatePresence>{visible && (<motion.button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })} initial={{ opacity: 0, y: 12, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.9 }} transition={SPRING.soft} className="border-foreground/15 hover:border-foreground/40 hover:bg-foreground/5 fixed right-5 bottom-5 z-40 grid size-11 place-items-center rounded-full border bg-background/60 backdrop-blur-xl transition-colors"><ArrowUp className="size-4" /></motion.button>)}</AnimatePresence>);
}
function EngineStrip() { return (<div aria-hidden="true" className="h-px w-full overflow-hidden"><div className="h-full w-full" style={{ backgroundImage: "linear-gradient(90deg, var(--learning) 0%, var(--career) 26%, var(--services) 50%, var(--erp) 74%, var(--community) 100%)", opacity: 0.85 }} /></div>); }

export function SiteFooter() {
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const submitNewsletter = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = event.currentTarget; const email = new FormData(form).get("email"); if (typeof email !== "string") return; setSubmitting(true); setNewsletterError(null);
    try { await submitContact({ name: "Newsletter subscriber", email, message: "Monthly briefing subscription", kind: "newsletter" }); setSubscribed(true); form.reset(); } catch { setNewsletterError("We couldn't subscribe you right now. Please try again."); } finally { setSubmitting(false); }
  };
  return (
    <footer className="relative overflow-hidden border-t border-foreground/10"><EngineStrip /><div className="pointer-events-none absolute inset-0 overflow-hidden"><div className="bg-gradient-brand absolute -bottom-64 left-1/2 size-[56rem] -translate-x-1/2 rounded-full opacity-[0.12] blur-[160px]" /><div className="absolute -right-32 top-20 size-[32rem] rounded-full bg-gradient-learning opacity-[0.08] blur-[120px]" /><div className="rule-grid absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(70%_50%_at_50%_100%,black,transparent)]" /></div><BackToTop />
      <div className="relative overflow-hidden pt-16 pb-10"><BigMarquee items={["Cyber Elias Academy", "Learn tech", "Build real work", "Get hired"]} duration={52} itemClassName="text-outline opacity-60" glyph="✦" glyphClassName="text-primary opacity-80" /></div>
      <div className="container-page relative border-t border-foreground/10 py-16"><div className="grid gap-14 lg:grid-cols-[1.25fr_2fr]"><div><BrandMark /><p className="text-muted-foreground mt-6 max-w-sm text-sm leading-relaxed">One platform. Multiple engines. Every actor connected. Cyber Elias Academy trains Nigeria's next generation of technologists — then puts them to work.</p><div className="mt-8 space-y-3 text-sm"><p className="text-muted-foreground flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0" /> 26 Ebony Road, Off Rumuola Road, Port Harcourt, Rivers State</p><a href="tel:+2349058628386" className="hover:text-primary flex items-center gap-3 transition-colors"><Phone className="size-4 shrink-0" /> +234 905 862 8386</a><a href="mailto:hello@cea.ng" className="hover:text-primary flex items-center gap-3 transition-colors"><Mail className="size-4 shrink-0" /> hello@cea.ng</a></div><div className="mt-8 flex gap-2">{socials.map(({ Icon, href, label }) => (<a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="border-foreground/12 hover:border-foreground/40 hover:bg-foreground/5 grid size-9 place-items-center rounded-full border bg-background/40 backdrop-blur-md transition-colors"><Icon className="size-4" /></a>))}</div><div className="mt-10 flex items-center gap-3"><span className="font-label text-[10px] text-muted-foreground">Cohort 01</span><span className="h-px w-8 bg-foreground/15" /><span className="font-label flex items-center gap-1.5 text-[10px] text-success"><span className="size-1 rounded-full bg-success" /> Open for applications</span></div></div><div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{columns.map((col) => (<div key={col.title}><h4 className="font-label text-muted-foreground text-[10px] tracking-[0.18em]">{col.title}</h4><ul className="mt-5 space-y-2.5">{col.links.map((l) => (<li key={l.label}><Link to={l.to} className="link-wipe text-foreground/75 hover:text-foreground inline-block text-sm transition-colors">{l.label}</Link></li>))}</ul></div>))}</div></div>
        <Reveal className="mt-20 grid gap-8 border-t border-foreground/10 pt-12 lg:grid-cols-[1fr_1fr] lg:items-end"><div><p className="font-display text-h3 font-semibold tracking-tight text-balance">Get the monthly briefing</p><p className="text-muted-foreground mt-3 max-w-md text-sm leading-relaxed">Curriculum updates, hiring trends and open cohorts. One email a month, no noise. Unsubscribe anytime.</p></div>{subscribed ? (<p className="text-success border-success/30 bg-success/10 rounded-[12px] border px-4 py-3 text-sm font-semibold backdrop-blur-md" aria-live="polite">You're on the list. Watch your inbox for the next briefing.</p>) : (<form className="flex flex-col gap-3 sm:flex-row" onSubmit={submitNewsletter}><Input name="email" type="email" required placeholder="you@company.com" disabled={submitting} aria-label="Email address" className="bg-foreground/5 border-foreground/12 focus-visible:border-primary/60 h-11 rounded-full px-5 backdrop-blur-md" /><Button type="submit" disabled={submitting} className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-11 shrink-0 rounded-full px-6 border-0 transition-colors">{submitting ? "Joining…" : "Subscribe"}<ArrowUpRight className="ml-1.5 size-4" /></Button></form>)}</Reveal>{newsletterError && (<p className="text-error mt-3 text-xs" role="alert">{newsletterError}</p>)}
        <div className="text-muted-foreground mt-16 flex flex-col items-start justify-between gap-4 border-t border-foreground/10 pt-8 text-xs md:flex-row md:items-center"><p className="font-label text-[10px] tracking-wide">© {new Date().getFullYear()} Cyber Elias Academy Ltd. RC 8413776. All rights reserved.</p><p className="font-label flex items-center gap-3 text-[10px]"><LiveClock /><span className="text-foreground/20">|</span><span>Port Harcourt, NG · 04°48′N 07°00′E</span></p></div>
        <div aria-hidden="true" className="mt-12 flex h-px gap-1.5 opacity-60"><span className="bg-gradient-learning w-full" /><span className="bg-gradient-career w-full" /><span className="bg-gradient-services w-full" /><span className="bg-gradient-erp w-full" /><span className="bg-gradient-community w-full" /></div>
      </div>
    </footer>
  );
}
