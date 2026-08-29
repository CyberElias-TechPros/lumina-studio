import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Linkedin, Twitter, Instagram, Youtube, Facebook } from "lucide-react";
import { BrandMark } from "./site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitContact } from "@/lib/api/marketing";

const columns = [
  {
    title: "Learn",
    links: [
      { label: "All programs", to: "/programs" },
      { label: "Engines", to: "/engines" },
      { label: "Pricing", to: "/pricing" },
      { label: "Admissions", to: "/admissions" },
      { label: "Scholarships", to: "/scholarships" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Glossary", to: "/glossary" },
      { label: "Career Guides", to: "/career-guides" },
      { label: "Templates & Checklists", to: "/resources" },
      { label: "Public Library", to: "/library" },
      { label: "Blog & Insights", to: "/blog" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Services", to: "/services" },
      { label: "Case studies", to: "/work" },
      { label: "Marketplace", to: "/marketplace" },
      { label: "Partners", to: "/partners" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Events", to: "/events" },
      { label: "Community", to: "/community" },
      { label: "Alumni", to: "/alumni" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Accessibility", to: "/accessibility" },
      { label: "Sign in", to: "/auth/sign-in" },
    ],
  },
];

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
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div className="bg-gradient-brand pointer-events-none absolute -top-40 left-1/4 size-[36rem] rounded-full opacity-25 blur-[130px]" />

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
                        className="text-ink-foreground/65 hover:text-ink-foreground text-sm transition-colors"
                      >
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
        </div>
      </div>
    </footer>
  );
}
