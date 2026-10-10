import { ArrowRight, CalendarClock, MapPin } from "lucide-react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/opportunities")({
  head: () =>
    getPageHead({
      title: "Opportunities for young people in the South-South — Cyber Elias Academy",
      description:
        "Free programmes and opportunities we share with young people in the South-South, with the official link and what to do before you apply.",
      path: "/opportunities",
    }),
  component: OpportunitiesPage,
});

const opportunities = [
  {
    slug: "idice-skills-to-jobs",
    title: "iDICE Skills-to-Jobs Programme (South-South)",
    summary:
      "Free training in creative and digital skills, with links to jobs, for Nigerians aged 15–35 in Akwa Ibom, Bayelsa, Cross River, Delta, Edo and Rivers State.",
    status: "Applications open",
    where: "Akwa Ibom · Bayelsa · Cross River · Delta · Edo · Rivers",
    deadline: "No closing date stated. Apply early.",
    cost: "Free to apply",
  },
];

function OpportunitiesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Opportunities"
        title="Free opportunities we are sharing with young people"
        description="We share programmes that can help young people build skills and find work. Each one links to its official application page. Read it before you apply."
      />

      <section className="container-page py-14 md:py-16">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Open now</h2>
        <ul className="mt-8 grid gap-6">
          {opportunities.map((o) => (
            <li
              key={o.slug}
              className="border-border bg-card hover:border-primary/40 flex flex-col gap-5 rounded-lg border p-6 transition-colors md:p-8"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold">
                  {o.status}
                </span>
                <span className="text-muted-foreground text-xs">{o.cost}</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                  {o.title}
                </h3>
                <p className="text-muted-foreground mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">
                  {o.summary}
                </p>
              </div>
              <div className="text-muted-foreground flex flex-col gap-2 text-sm sm:flex-row sm:gap-6">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0" /> {o.where}
                </p>
                <p className="flex items-start gap-2">
                  <CalendarClock className="mt-0.5 size-4 shrink-0" /> {o.deadline}
                </p>
              </div>
              <div>
                <Button asChild>
                  <Link to={`/opportunities/${o.slug}`}>
                    Read how to apply <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground mt-8 max-w-3xl text-sm leading-relaxed">
          Cyber Elias Academy shares these opportunities so more young people hear about them. We do
          not collect applications on anyone’s behalf, and we do not charge to apply. Applying is
          free: never pay anyone to apply or to be selected.
        </p>
      </section>

      <CTASection
        title="Want to build skills in the meantime?"
        description="Our short, practical courses in Port Harcourt cover Microsoft Office, computer basics, graphic design, web design, data entry and more."
        primary={{ label: "View courses", to: "/classes" }}
        secondary={{ label: "Apply to the academy", to: "/apply" }}
      />
    </PageShell>
  );
}
