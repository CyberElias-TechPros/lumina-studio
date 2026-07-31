import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Linkedin, Twitter, Instagram, Youtube } from "lucide-react";
import { BrandMark } from "./site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const columns = [
  {
    title: "Learn",
    links: [
      { label: "All programs", to: "/programs" },
      { label: "Engines", to: "/engines" },
      { label: "Pricing", to: "/pricing" },
      { label: "Admissions", to: "/admissions" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Services", to: "/services" },
      { label: "Case studies", to: "/work" },
      { label: "Marketplace", to: "/marketplace" },
      { label: "Partners", to: "/partners" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Events", to: "/events" },
      { label: "Community", to: "/community" },
      { label: "Alumni", to: "/alumni" },
      { label: "Insights", to: "/blog" },
    ],
  },
  {
    title: "Academy",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Sign in", to: "/auth/sign-in" },
      { label: "Dashboards", to: "/app" },
    ],
  },
];

export function SiteFooter() {
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
                <MapPin className="size-4 shrink-0" /> 14 Allen Avenue, Ikeja, Lagos
              </p>
              <p className="text-ink-foreground/70 flex items-center gap-2.5">
                <Phone className="size-4 shrink-0" /> +234 801 234 5678
              </p>
              <p className="text-ink-foreground/70 flex items-center gap-2.5">
                <Mail className="size-4 shrink-0" /> hello@cea.academy
              </p>
            </div>

            <div className="mt-7 flex gap-2">
              {[Linkedin, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
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
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              (e.currentTarget as HTMLFormElement).reset();
            }}
          >
            <Input
              type="email"
              required
              placeholder="you@company.com"
              className="border-ink-foreground/15 bg-ink-foreground/5 text-ink-foreground placeholder:text-ink-foreground/40"
            />
            <Button type="submit" className="bg-gradient-brand shrink-0 border-0">
              Subscribe
            </Button>
          </form>
        </div>

        <div className="border-ink-foreground/15 text-ink-foreground/50 mt-10 flex flex-col gap-3 border-t pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cyber Elias Academy. All rights reserved.</p>
          <p className="flex gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Accessibility</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
