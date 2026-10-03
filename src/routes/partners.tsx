import {
  ArrowRight,
  Building2,
  GraduationCap,
  Handshake,
  Landmark,
  UsersRound,
} from "lucide-react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/partners")({
  head: () =>
    getPageHead({
      title: "Partner with Cyber Elias Academy",
      description:
        "Apply to collaborate with Cyber Elias Academy on education, employer pathways, technology, community programmes or delivery.",
      path: "/partners",
    }),
  component: PartnersPage,
});

const partnershipPaths = [
  {
    icon: GraduationCap,
    title: "Education and training",
    text: "Share expertise, co-design practical learning or help make digital-skills training more accessible.",
  },
  {
    icon: Building2,
    title: "Employers and industry",
    text: "Create clearer routes from learner projects to workplace exposure, placements and relevant opportunities.",
  },
  {
    icon: Handshake,
    title: "Technology and delivery",
    text: "Bring a useful product, specialist capability or implementation experience to a defined collaboration.",
  },
  {
    icon: UsersRound,
    title: "NGO and community",
    text: "Explore programmes that connect digital confidence, community needs and measurable outcomes.",
  },
  {
    icon: Landmark,
    title: "Public sector",
    text: "Discuss a focused initiative, referral pathway or service delivery partnership with a clear public benefit.",
  },
];

function PartnersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Work with us"
        title="Good partnerships start with a specific shared outcome."
        description="We welcome practical proposals from educators, employers, technology teams, community organisations and delivery partners. Tell us what each side could contribute and who the collaboration is meant to help."
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/partners/apply">
              Apply to partner <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/schools">School programme</Link>
          </Button>
        </div>
      </PageHero>

      <section className="container-page py-14 md:py-20">
        <div className="max-w-2xl">
          <p className="text-primary text-xs font-semibold tracking-[0.12em] uppercase">
            Ways to collaborate
          </p>
          <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            A useful fit is better than a vague logo swap.
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Applications are reviewed by the academy team. We look for a clear purpose, relevant
            capability, a credible point of contact and a realistic way to begin.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {partnershipPaths.map((path) => (
            <Card key={path.title} className="h-full">
              <CardContent className="p-5">
                <span className="bg-primary/10 text-primary grid size-10 place-items-center rounded-xl">
                  <path.icon className="size-5" />
                </span>
                <h3 className="font-display mt-4 text-base font-semibold">{path.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{path.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-border bg-muted/30 border-y">
        <div className="container-page grid gap-4 py-12 sm:grid-cols-3 md:py-16">
          {[
            [
              "1",
              "Apply",
              "Share your organisation, relevant experience, region and the collaboration you have in mind.",
            ],
            [
              "2",
              "Review",
              "Our team screens the proposal and may request a conversation or additional detail.",
            ],
            [
              "3",
              "Admit",
              "Approved partners receive an account for the partner workspace and a clear sign-in path.",
            ],
          ].map(([number, title, detail]) => (
            <div key={number} className="bg-card rounded-xl border p-5">
              <span className="text-primary text-xs font-bold">STEP {number}</span>
              <h3 className="font-display mt-3 font-semibold">{title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Have a concrete idea to explore?"
        description="A short application gives the review team enough context to assess fit and follow up with the right person."
        primary={{ label: "Start a partner application", to: "/partners/apply" }}
        secondary={{ label: "Ask a question", to: "/contact" }}
      />
    </PageShell>
  );
}
