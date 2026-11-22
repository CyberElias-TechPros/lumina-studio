import { ArrowRight, Blocks, Globe2, Server, Terminal } from "lucide-react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { Button } from "@/components/ui/button";
import { CTASection, PageShell } from "@/components/marketing/shell";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    getPageHead({
      title: "CEA Digital Solutions — Websites, Business Systems & IT Studio",
      description:
        "Digital Presence, IT Infrastructure, Business Systems and Custom Software Development from Cyber Elias Academy's technology studio.",
      path: "/services",
    }),
  component: ServicesPage,
});

const territories = [
  {
    icon: Globe2,
    code: "01 · DIGITAL PRESENCE",
    title: "Websites, portals & digital identity",
    audience: "Businesses, schools, clinics, churches and growing brands.",
    deliverables: [
      "Fast, mobile-first public websites and institutional portals",
      "Clear service pages, search visibility and enquiry intake",
      "Maintainable handover with staff orientation",
    ],
    timeline: "Typical delivery: 2–6 weeks",
  },
  {
    icon: Server,
    code: "02 · IT INFRASTRUCTURE",
    title: "Networks, workstations & reliability",
    audience: "Offices, computer rooms, labs and multi-desk teams in Rivers State.",
    deliverables: [
      "Office/lab workstation procurement advice and OS setup",
      "Local Wi-Fi, structured LAN cabling and router diagnostics",
      "Backup discipline, security hardening and ongoing maintenance",
    ],
    timeline: "Typical delivery: 2–10 days",
  },
  {
    icon: Blocks,
    code: "03 · BUSINESS SYSTEMS",
    title: "Workflows, records, inventory & billing",
    audience: "Operations teams replacing messy spreadsheets and manual hand-offs.",
    deliverables: [
      "Structured customer, stock, billing and attendance workflows",
      "Spreadsheet automation, dashboards and CSV/PDF reporting",
      "Role-aware team tools built around real Nigerian workflows",
    ],
    timeline: "Typical delivery: 2–5 weeks",
  },
  {
    icon: Terminal,
    code: "04 · DEVELOPMENT",
    title: "Web apps, portals & technical integrations",
    audience: "Organisations ready for bespoke software beyond off-the-shelf tools.",
    deliverables: [
      "Product discovery, architecture specification and prototype",
      "Full-stack web applications, payment and messaging integrations",
      "Technical audit and rescue of stalled digital products",
    ],
    timeline: "Scoped after brief review",
  },
] as const;

function ServicesPage() {
  return (
    <PageShell>
      {/* Obsidian Studio Opening */}
      <section className="cea-frontier-grid relative overflow-hidden border-b border-[#2c333c] bg-[#101214] text-[#f4f1e9]">
        <div className="container-page relative grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-24">
          <div>
            <p className="font-mono text-xs font-semibold tracking-[0.18em] text-[#7774ff] uppercase">
              CEA Digital Solutions Studio
            </p>
            <h1 className="font-display mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              Technology should{" "}
              <span className="font-serif font-normal text-[#7774ff] italic">solve something.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#c6cdd6] sm:text-lg">
              We help businesses, schools, and organisations build, improve, and manage the digital
              systems they need — with clear scope, honest timelines, and zero jargon.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/request-project"
                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#d6fe52] px-7 py-3 text-sm font-bold text-[#101214] transition-opacity hover:opacity-90"
              >
                Start a project brief{" "}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-12 items-center rounded-full border border-[#3a424d] px-6 py-3 text-sm font-semibold text-[#f4f1e9] transition-colors hover:border-[#f4f1e9]/50"
              >
                Ask a general question
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-[#2c333c] bg-[#181c20] p-6">
            <p className="font-mono text-xs font-semibold tracking-[0.16em] text-[#d6fe52] uppercase">
              Studio Standard
            </p>
            <p className="font-display mt-3 text-2xl leading-snug text-[#f4f1e9]">
              Clear scope before code. Clear ownership after handover.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#b4bac4]">
              Every brief starts with the business problem, required inputs from your team, and a
              written delivery plan.
            </p>
          </div>
        </div>
      </section>

      {/* Four Distinct Service Territories */}
      <section className="container-page py-14 md:py-20">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-semibold tracking-[0.14em] uppercase">
            Four Service Territories
          </p>
          <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">
            Start with the problem, not a technology checklist.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {territories.map((t) => (
            <article
              key={t.code}
              className="border-border bg-card flex h-full flex-col justify-between rounded-2xl border p-6 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#514ee6] uppercase dark:text-[#b7b5ff]">
                    {t.code}
                  </span>
                  <t.icon className="size-5 text-muted-foreground" aria-hidden="true" />
                </div>
                <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight">
                  {t.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm">{t.audience}</p>
                <ul className="mt-5 space-y-2 border-t border-border pt-4 text-sm leading-relaxed">
                  {t.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#7774ff]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-border mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                <span className="text-muted-foreground font-mono text-xs">{t.timeline}</span>
                <Link
                  to="/request-project"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                >
                  Discuss this territory <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-border bg-muted/40 border-y">
        <div className="container-page grid gap-8 py-14 md:grid-cols-[0.7fr_1.3fr] md:py-18">
          <div>
            <p className="font-mono text-xs font-semibold tracking-[0.14em] uppercase">
              How engagements run
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">
              Small steps, clear decisions.
            </h2>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3">
            {[
              [
                "01",
                "Share the brief",
                "Describe the outcome, budget range and timing. You do not need a technical spec to start.",
              ],
              [
                "02",
                "Review and clarify",
                "Our team reviews scope, practical constraints and what is required from your side.",
              ],
              [
                "03",
                "Agree the build",
                "Move into written deliverables, milestones and transparent pricing before committing.",
              ],
            ].map(([number, title, detail]) => (
              <li key={number} className="border-border bg-card rounded-xl border p-5">
                <span className="font-mono text-xs font-bold tracking-widest text-[#514ee6] dark:text-[#b7b5ff]">
                  {number}
                </span>
                <h3 className="font-display mt-3 font-semibold">{title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="border-border bg-card flex flex-col gap-4 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="font-display text-lg font-semibold">
              Looking for a training or education partnership?
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Explore school, NGO, and institutional training collaborations with CEA.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/partners">
              Explore partnerships <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <CTASection
        title="Have a project in mind?"
        description="Send a short brief. Share the problem now and refine the scope with our team."
        primary={{ label: "Request a project conversation", to: "/request-project" }}
        secondary={{ label: "Contact the academy", to: "/contact" }}
      />
    </PageShell>
  );
}
