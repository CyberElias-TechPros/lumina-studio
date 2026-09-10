import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUp,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
} from "lucide-react";
import { WHATSAPP_DEFAULT } from "@/lib/contact";
import { BrandMark } from "./site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitContact } from "@/lib/api/marketing";
import { SPRING } from "@/components/motion";

const columns = [
  {
    title: "Learn",
    links: [
      { label: "All programs", to: "/programs" },
      { label: "Admissions", to: "/admissions" },
      { label: "Pricing", to: "/pricing" },
      { label: "Visit the campus", to: "/visit" },
      { label: "Apply", to: "/apply" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Career Guides", to: "/career-guides" },
      { label: "Templates & Checklists", to: "/resources" },
      { label: "Glossary", to: "/glossary" },
      { label: "Library", to: "/library" },
    ],
  },
  {
    title: "Academy",
    links: [
      { label: "About", to: "/about" },
      { label: "Team", to: "/team" },
      { label: "Visit the campus", to: "/visit" },
      { label: "Events", to: "/events" },
      { label: "Services for business", to: "/services" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "FAQ", to: "/faq" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Accessibility", to: "/accessibility" },
    ],
  },
];

/** Floating return-to-top control — appears once the page has scrolled. */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
            })
          }
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={SPRING.soft}
          className="glass shadow-elevated text-foreground hover:text-primary fixed right-5 bottom-5 z-40 grid size-11 place-items-center rounded-full border hover:-translate-y-0.5 motion-reduce:transition-none"
        >
          <ArrowUp className="size-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/** Engine wayfinding strip — the five-engine motif closes every page. */
function EngineStrip() {
  return (
    <div
      aria-hidden="true"
      className="h-[3px] w-full"
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--learning) 0%, var(--career) 26%, var(--services) 50%, var(--erp) 74%, var(--community) 100%)",
      }}
    />
  );
}

export function SiteFooter() {
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  const submitNewsletter = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email");
    if (typeof email !== "string") return;
    setSubmitting(true);
    setNewsletterError(null);
    try {
      await submitContact({
        name: "Newsletter subscriber",
        email,
        message: "Monthly briefing subscription",
        kind: "newsletter",
      });
      setSubscribed(true);
      form.reset();
    } catch {
      setNewsletterError("We couldn't subscribe you right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-ink text-ink-foreground relative overflow-hidden">
      <EngineStrip />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div className="bg-gradient-brand pointer-events-none absolute -top-40 left-1/4 size-[36rem] rounded-full opacity-25 blur-[130px]" />
      <BackToTop />

      <div className="container-page relative py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <BrandMark />
            <p className="text-ink-foreground/70 mt-5 max-w-sm text-sm leading-relaxed">
              One platform. Multiple engines. Every actor connected. Cyber Elias Academy trains
              Nigeria's next generation of technologists and puts them to work.
            </p>

            <div className="mt-7 space-y-2.5 text-sm">
              <p className="text-ink-foreground/70 flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0" /> 26 Ebony Road, Off Rumuola Road, Port
                Harcourt, Rivers State, Nigeria
              </p>
              <p className="text-ink-foreground/70 flex items-center gap-2.5">
                <Phone className="size-4 shrink-0" /> +234 905 862 8386
              </p>
              <p className="text-ink-foreground/70 flex items-center gap-2.5">
                <Mail className="size-4 shrink-0" /> hello@cea.ng
              </p>
            </div>

            <div className="mt-7 flex gap-2">
              {[
                {
                  Icon: Facebook,
                  href: "https://www.facebook.com/cybereliasacademy/",
                  label: "Facebook",
                },
                { Icon: Twitter, href: "https://x.com/cybeliasacademy", label: "Twitter/X" },
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com/cyberelias.tk/",
                  label: "Instagram",
                },
                {
                  Icon: Youtube,
                  href: "https://www.youtube.com/@CyberEliasAcademy",
                  label: "YouTube",
                },
                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/company/cyber-elias-academy",
                  label: "LinkedIn",
                },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="border-ink-foreground/15 hover:bg-ink-foreground/10 grid size-9 place-items-center rounded-lg border transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-ink-foreground text-xs font-bold tracking-[0.18em] uppercase">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-ink-foreground/65 hover:text-ink-foreground group/link inline-flex items-center gap-1.5 text-sm transition-colors motion-reduce:transition-none"
                      >
                        <span className="bg-ink-foreground/0 group-hover/link:bg-ink-foreground inline-block size-1 rounded-full transition-colors duration-300 motion-reduce:transition-none" />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-ink-foreground/15 mt-16 grid gap-6 border-t pt-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-display text-lg font-bold">Get the monthly briefing</p>
            <p className="text-ink-foreground/65 text-sm">
              Curriculum updates, hiring trends and open cohorts. No noise.
            </p>
          </div>
          {subscribed ? (
            <p
              className="text-success rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm font-semibold"
              aria-live="polite"
            >
              You're on the list. Watch your inbox for the next briefing.
            </p>
          ) : (
            <form className="flex gap-2" onSubmit={submitNewsletter}>
              <Input
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                disabled={submitting}
                className="border-ink-foreground/15 bg-ink-foreground/5 text-ink-foreground placeholder:text-ink-foreground/40"
              />
              <Button
                type="submit"
                disabled={submitting}
                className="bg-gradient-brand shrink-0 border-0"
              >
                {submitting ? "Joining…" : "Subscribe"}
              </Button>
            </form>
          )}
          {newsletterError && (
            <p className="text-error mt-2 text-xs" role="alert">
              {newsletterError}
            </p>
          )}
        </div>

        <div className="border-ink-foreground/15 text-ink-foreground/50 mt-10 border-t pt-8 text-xs text-center">
          <p>
            © {new Date().getFullYear()} Cyber Elias Academy Ltd. RC 8413776. All rights reserved.
          </p>
          <p className="mt-3">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("cea:open-cookie-settings"))}
              className="hover:text-ink-foreground underline underline-offset-2 transition-colors"
            >
              Cookie settings
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
}
