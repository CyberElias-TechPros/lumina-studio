import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/lib/next-compat/router";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Courses & fees", to: "/classes" },
      { label: "Learning Library", to: "/blog" },
      { label: "Practice Lab", to: "/tools" },
      { label: "Student Portal", to: "/auth/sign-in" },
      { label: "AI Engineering", to: "/ai-engineering" },
    ],
  },
  {
    title: "Academy",
    links: [
      { label: "About CEA", to: "/about" },
      { label: "Admissions", to: "/admissions" },
      { label: "Pay fees", to: "/pay" },
      { label: "Payment methods", to: "/payment" },
      { label: "Visit campus", to: "/visit" },
      { label: "FAQs", to: "/faq" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Digital Solutions",
    links: [
      { label: "Services Studio", to: "/services" },
      { label: "Request a solution", to: "/request-project" },
      { label: "Schools & partners", to: "/schools" },
      { label: "Shop & templates", to: "/shop" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Opportunities", to: "/opportunities" },
      { label: "iDICE Skills-to-Jobs", to: "/opportunities/idice-skills-to-jobs" },
      { label: "Open curriculum", to: "/open-curriculum" },
      { label: "Your learning trail", to: "/learning-trail" },
      { label: "Editorial standards", to: "/editorial" },
      { label: "Privacy & terms", to: "/privacy" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[#2c333c] bg-[#101214] text-[#f4f1e9]">
      {/* Architectural closing CTA */}
      <div className="container-page relative border-b border-[#242a31] py-12 md:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em] text-[#d6fe52] uppercase">
              <span className="size-1.5 rounded-full bg-[#d6fe52]" aria-hidden="true" />
              CEA · Learn. Practise. Create.
            </p>
            <h2 className="font-display mt-3 text-3xl leading-[1.03] font-semibold tracking-[-0.035em] text-balance text-[#f4f1e9] sm:text-5xl">
              One room. One keyboard.
              <br />
              <span className="font-serif font-normal text-[#d6fe52] italic">
                Practical capability you can show.
              </span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <Link
              to="/apply"
              className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#d6fe52] px-7 text-sm font-bold text-[#101214] transition-opacity hover:opacity-90"
            >
              Apply for admission
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/visit"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#d6dce4] hover:text-[#d6fe52]"
            >
              Visit 24 Ebony Road first
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main directory grid */}
      <div className="container-page relative grid gap-12 py-12 lg:grid-cols-[1.2fr_2.2fr] lg:py-16">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="relative grid size-9 place-items-center rounded-xl border border-[#2c333c] bg-[#242a31]">
              <span className="absolute top-1 right-1 size-1.5 rounded-full bg-[#d6fe52]" />
              <span className="font-display text-xs font-extrabold text-[#f4f1e9]">CEA</span>
            </span>
            <span className="font-display text-base font-bold tracking-tight text-[#f4f1e9]">
              Cyber Elias Academy
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#b4bac4]">
            A practical digital skills academy developing confidence, capability and creativity
            through technology — in person in Port Harcourt and open online.
          </p>
          <address className="mt-6 space-y-2.5 text-sm text-[#c6cdd6] not-italic">
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#f17c52]" aria-hidden="true" />
              24 Ebony Road, Off Rumuola Road,
              <br />
              Port Harcourt, Rivers State
            </p>
            <a href="tel:+2349058628386" className="flex items-center gap-2.5 hover:text-white">
              <Phone className="size-4 shrink-0 text-[#f17c52]" aria-hidden="true" /> +234 905 862
              8386
            </a>
            <a href="mailto:help@cea.ng" className="flex items-center gap-2.5 hover:text-white">
              <Mail className="size-4 shrink-0 text-[#f17c52]" aria-hidden="true" /> help@cea.ng
            </a>
          </address>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs font-semibold tracking-wider text-[#d6fe52] uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-[#c6cdd6] transition-colors hover:text-[#f4f1e9]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Monumental closing statement */}
      <div className="border-t border-[#242a31] bg-[#161a1f]">
        <div className="container-page py-8">
          <p className="font-display max-w-4xl text-xl leading-tight font-semibold tracking-tight text-[#f4f1e9] sm:text-3xl">
            THE FUTURE IS NOT SOMETHING YOU WAIT FOR.{" "}
            <span className="text-[#d6fe52]">IT IS SOMETHING YOU LEARN TO BUILD.</span>
          </p>
        </div>
      </div>

      {/* Meta bar */}
      <div className="border-t border-[#242a31] bg-[#0b0d0f]">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-[#b4bac4] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cyber Elias Academy Ltd · RC 8413776</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>Mon–Sat, 8:00–20:00 WAT</span>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span>24 Ebony Road, Port Harcourt</span>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <Link to="/accessibility" className="hover:text-white">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
