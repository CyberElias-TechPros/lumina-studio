import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  HandCoins,
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell, PageHero, CTASection, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem, Counter } from "@/components/motion";
import { formatNaira } from "@/data/site";
import { cn } from "@/lib/utils";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/scholarships")({
  head: () =>
    getPageHead({
      title: "Scholarships & Funding",
      description:
        "Merit, need-based and women-in-tech scholarships covering up to 100% of tuition. Plus instalments, deferred payment and employer sponsorship.",
      path: "/scholarships",
      noIndex: true,
    }),
  component: ScholarshipsPage,
});

const funds = [
  {
    icon: Award,
    tone: "text-primary bg-primary/10",
    name: "Merit Scholarship",
    cover: "Up to 100% of tuition",
    who: "Assessment top scorers",
    desc: "Awarded to the strongest applicants in each cohort based on the background assessment, portfolio and interview. No separate application — every applicant is auto-considered.",
    count: "3 per cohort",
    note: "Auto-considered",
  },
  {
    icon: HandCoins,
    tone: "text-warning bg-warning/10",
    name: "Need-Based Grant",
    cover: "Up to 60% of tuition",
    who: "Applicants with genuine financial need",
    desc: "For applicants who can do the work but not the maths. We look at income, dependants and existing commitments, not grades or connections.",
    count: "5 per cohort",
    note: "Financial review",
  },
  {
    icon: Sparkles,
    tone: "text-career bg-career/10",
    name: "Women in Technology",
    cover: "40% of tuition",
    who: "Women joining tech tracks",
    desc: "Every woman admitted to a Learning Engine program receives an automatic 40% tuition reduction. Because representation is not charity — it's a strategy.",
    count: "All eligible",
    note: "Automatic",
  },
  {
    icon: Users,
    tone: "text-community bg-community/10",
    name: "Community Scholar",
    cover: "Up to 50% of tuition",
    who: "Educators, civil servants, first-gen grads",
    desc: "For public school teachers, civil servants and first-generation university graduates who commit to giving back 20 mentorship hours to the next cohort.",
    count: "10 per cohort",
    note: "Mentorship pledge",
  },
];

const fundingOptions = [
  {
    title: "Structured instalments",
    desc: "Split tuition into monthly payments across the program — no interest, no hidden fees. Set up directly with our finance team.",
  },
  {
    title: "Employer sponsorship",
    desc: "We'll draft a sponsorship letter your company can sign. Many HR teams fund learning when the business case is clear.",
  },
  {
    title: "Pay after placement",
    desc: "Defer tuition until you're earning. Backed by our Placement Promise and available on selected programs.",
  },
  {
    title: "Payment plans per term",
    desc: "Three-term plans align payments with your school terms, so tuition never competes with rent month.",
  },
];

function ScholarshipsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Scholarships & funding"
        art="graduate"
        title={
          <>
            Money should never be the <span className="text-gradient">reason you don't start</span>
          </>
        }
        description="Scholarships, instalments and deferred payment — money should never be the reason you don't start. Fund sizes are published as the first cohort commits."
      />

      <section className="container-page py-16 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "₦0", label: "Upfront for eligible scholars", icon: HandCoins },
            { value: "3", label: "Payment plans per term", icon: Award },
            { value: "0%", label: "Interest on instalments", icon: BadgeCheck },
            { value: "100%", label: "Of aid criteria published", icon: ShieldCheck },
          ].map((s) => (
            <Card key={s.label} className="bg-card shadow-soft border">
              <CardContent className="p-5">
                <s.icon className="text-primary size-5" />
                <p className="font-display mt-3 text-2xl font-extrabold">{s.value}</p>
                <p className="text-muted-foreground mt-1 text-xs font-semibold">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted/40 border-y">
        <div className="container-page py-16 md:py-20">
          <SectionHeading
            eyebrow="Funding programmes"
            title="Four ways to fund your seat"
            description="Every programme is independently assessed. Apply to as many as you qualify for — they stack."
          />
          <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2">
            {funds.map((f) => (
              <StaggerItem key={f.name}>
                <Card className="group bg-card shadow-soft hover:shadow-elevated relative h-full overflow-hidden border transition-all hover:-translate-y-1">
                  <CardContent className="p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <span className={cn("grid size-11 place-items-center rounded-xl", f.tone)}>
                        <f.icon className="size-5" />
                      </span>
                      <Badge variant="secondary" className="font-semibold">
                        {f.note}
                      </Badge>
                    </div>
                    <h3 className="font-display mt-5 text-lg font-extrabold">{f.name}</h3>
                    <p className="text-gradient font-display mt-1 text-sm font-extrabold">
                      {f.cover}
                    </p>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{f.desc}</p>
                    <div className="text-muted-foreground mt-5 flex items-center gap-2 border-t pt-4 text-xs font-semibold">
                      <Users className="size-3.5" /> {f.who} · {f.count}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="How to apply"
          title="Scholarships in three steps"
          description="Apply within your main application — nothing extra to file unless we tell you."
        />
        <StaggerGroup className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Submit your application",
              d: "Tick the scholarships you want on the financing step. Merit and Women in Tech are automatic.",
            },
            {
              n: "02",
              t: "Share your story",
              d: "Need-based applicants answer two short questions. No documents required upfront.",
            },
            {
              n: "03",
              t: "Decision with your offer",
              d: "Scholarship awards come with your offer letter — before you pay a naira.",
            },
          ].map((s) => (
            <StaggerItem key={s.n}>
              <Card className="bg-card shadow-soft h-full border">
                <CardContent className="p-6">
                  <span className="text-gradient font-display text-3xl font-extrabold">{s.n}</span>
                  <h3 className="font-display mt-4 text-base font-extrabold">{s.t}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.d}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {fundingOptions.map((o) => (
            <Reveal key={o.title}>
              <div className="flex items-start gap-3">
                <Heart className="text-primary mt-1 size-4 shrink-0" />
                <div>
                  <h3 className="font-display text-sm font-extrabold">{o.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{o.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Start your application today"
        description="The scholarship window closes with applications — two weeks before each cohort."
        primary={{ label: "Apply with scholarship", to: "/apply" }}
      />
    </PageShell>
  );
}
