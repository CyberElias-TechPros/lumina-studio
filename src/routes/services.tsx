import { ArrowRight, Blocks, Bot, Globe2, Smartphone, Wrench } from "lucide-react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTASection, PageShell } from "@/components/marketing/shell";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    getPageHead({
      title: "Digital product and technology services — Cyber Elias Academy",
      description:
        "Discuss a website, mobile app, internal business tool, workflow automation or other digital project with Cyber Elias Academy.",
      path: "/services",
    }),
  component: ServicesPage,
});

const services = [
  {
    icon: Globe2,
    title: "Websites and web apps",
    detail:
      "Public websites, portals and browser-based products shaped around your audience and day-to-day work.",
  },
  {
    icon: Smartphone,
    title: "Mobile app projects",
    detail:
      "Plan a mobile experience for customers, staff or learners, including the features and integrations it needs.",
  },
  {
    icon: Blocks,
    title: "Internal tools and software",
    detail:
      "Replace fragmented spreadsheets and manual hand-offs with a focused workflow your team can actually use.",
  },
  {
    icon: Bot,
    title: "Automation and integrations",
    detail:
      "Explore practical ways to reduce repetitive work and connect the tools your organisation already relies on.",
  },
  {
    icon: Wrench,
    title: "Technical discovery and improvement",
    detail:
      "Get help clarifying a brief, assessing an existing digital product or deciding what to build first.",
  },
];

function ServicesPage() {
  return (
    <PageShell>
      <section className="bg-[#101923] text-[#f6f5f0]">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-24">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-[#96dce8] uppercase">
              CEA / Digital projects
            </p>
            <h1 className="font-display mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              A clearer path from idea to useful software.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#d3dbe4] sm:text-lg">
              Tell us what your organisation needs to do. We will review the goals, constraints and
              budget before recommending a sensible next step.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/request-project"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#f6f5f0] px-5 py-3 text-sm font-semibold text-[#101923] hover:bg-white"
              >
                Start a project brief <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-11 items-center rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Ask a general question
              </Link>
            </div>
          </div>
          <div className="border-t border-white/25 pt-5 lg:border-t-0 lg:border-l lg:pl-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-[#96dce8] uppercase">
              From idea to implementation
            </p>
            <p className="font-display mt-4 text-2xl leading-snug">
              Thoughtful technology, built around the work that matters.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="max-w-2xl">
          <p className="text-primary text-xs font-semibold tracking-[0.12em] uppercase">
            What you can discuss
          </p>
          <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Start with the problem, not a technology checklist.
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            The intake form helps us understand the kind of work, who it is for, the investment
            range and the timing you have in mind. You do not need a polished specification to get
            started.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="h-full">
              <CardContent className="p-5">
                <span className="bg-primary/10 text-primary grid size-10 place-items-center rounded-xl">
                  <service.icon className="size-5" />
                </span>
                <h3 className="font-display mt-4 text-base font-semibold">{service.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {service.detail}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-border bg-muted/30 border-y">
        <div className="container-page grid gap-8 py-14 md:grid-cols-[0.7fr_1.3fr] md:py-18">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.12em] uppercase">
              How it works
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
                "Describe the outcome, budget range and timing. A reference keeps the conversation easy to find.",
              ],
              [
                "02",
                "Review and clarify",
                "The team reviews the request and follows up to clarify scope, priorities and practical constraints.",
              ],
              [
                "03",
                "Agree the next step",
                "If there is a fit, move into discovery and a written scope before committing to delivery.",
              ],
            ].map(([number, title, detail]) => (
              <li key={number} className="bg-card rounded-xl border p-5">
                <span className="text-primary text-xs font-bold tracking-widest">{number}</span>
                <h3 className="font-display mt-3 font-semibold">{title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="bg-primary/5 flex flex-col gap-4 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="font-display text-lg font-semibold">
              Looking for a delivery or education partner?
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Use the dedicated partner application so the right team can review your proposal.
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
        description="Send a short brief. You can share the essentials now and refine the detail with the team later."
        primary={{ label: "Request a project conversation", to: "/request-project" }}
        secondary={{ label: "Contact the academy", to: "/contact" }}
      />
    </PageShell>
  );
}
