import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  CalendarCheck,
  Check,
  GraduationCap,
  HandCoins,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from "@/components/motion";
import { faqs, formatNaira, pricingTiers } from "@/data/site";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing & Tuition — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Tuition for every budget: instalment plans, income-share agreements and scholarships. Find out what a program at Cyber Elias Academy costs.",
      },
    ],
  }),
  component: Pricing,
});

const paymentOptions = [
  {
    icon: Banknote,
    title: "Monthly instalments",
    body: "Split tuition across the duration of the program — interest-free, no hidden fees.",
  },
  {
    icon: HandCoins,
    title: "Income-share (ISA)",
    body: "Selected tracks: pay nothing upfront, contribute a share once you're earning above a threshold.",
  },
  {
    icon: CalendarCheck,
    title: "Deferred start",
    body: "Reserve your seat with 20% and pay the balance before the capstone begins.",
  },
  {
    icon: ShieldCheck,
    title: "Money-back guarantee",
    body: "Leave within the first two weeks of any program and get a full refund — no questions.",
  },
];

function Pricing() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Pricing"
        art="market"
        title={
          <>
            Tuition that <span className="text-gradient">works with your budget</span>
          </>
        }
        description="Every program is priced in naira, split into instalments, and covered by scholarships and income-share agreements for eligible learners."
      />

      <section className="container-page py-16 md:py-20">
        <StaggerGroup className="grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <StaggerItem key={tier.name} className={tier.highlighted ? "lg:-mt-4" : ""}>
              <TiltCard intensity={4} className="h-full">
                <div
                  className={`relative flex h-full flex-col rounded-3xl border p-8 ${
                    tier.highlighted
                      ? "bg-gradient-ink text-ink-foreground shadow-elevated"
                      : "bg-card shadow-soft"
                  }`}
                >
                  {tier.highlighted && (
                    <span className="bg-gradient-brand text-primary-foreground absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold shadow">
                      <Sparkles className="size-3.5" /> Most popular
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl font-bold">{tier.name}</h3>
                    <BadgeCheck
                      className={
                        tier.highlighted ? "size-4 text-ink-foreground/70" : "text-primary size-4"
                      }
                    />
                  </div>
                  <p
                    className={`mt-1 text-sm font-medium ${tier.highlighted ? "text-ink-foreground/70" : "text-muted-foreground"}`}
                  >
                    {tier.blurb}
                  </p>
                  <p className="font-display mt-6 text-4xl font-extrabold">
                    {tier.price > 0 ? formatNaira(tier.price) : "Custom"}
                    <span
                      className={`text-base font-semibold ${tier.highlighted ? "text-ink-foreground/60" : "text-muted-foreground"}`}
                    >
                      {" "}
                      / {tier.period}
                    </span>
                  </p>
                  <ul className="mt-7 flex-1 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className={`mt-0.5 size-4 shrink-0 ${tier.highlighted ? "text-ink-foreground/80" : "text-success"}`}
                        />
                        <span className={tier.highlighted ? "" : "text-muted-foreground"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    size="lg"
                    className={`mt-8 w-full ${tier.highlighted ? "bg-gradient-brand shadow-glow border-0" : ""}`}
                    variant={tier.highlighted ? "default" : "outline"}
                  >
                    <Link to="/apply">
                      {tier.price > 0 ? "Apply now" : "Request a quote"}{" "}
                      <ArrowRight className="ml-1.5 size-4" />
                    </Link>
                  </Button>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="bg-muted/40 border-y py-20 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Payment options"
            title="Four ways to pay, zero surprises"
            description="Money should never be the reason a good engineer doesn't exist. Pick the structure that fits your reality."
          />
          <div className="space-y-4">
            {paymentOptions.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.06}>
                <div className="bg-card shadow-soft flex items-start gap-4 rounded-2xl border p-6">
                  <span className="bg-primary/10 text-primary grid size-11 shrink-0 place-items-center rounded-xl">
                    <o.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold">{o.title}</h3>
                    <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{o.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Scholarships"
            title="Funded seats, every cohort"
            description="We reserve funded seats every cohort — for women in tech, government-backed programs, NGO partners and exceptional candidates."
          />
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base font-semibold">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link to="/scholarships">
              <GraduationCap className="mr-1.5 size-4" /> Check scholarship eligibility
            </Link>
          </Button>
        </Reveal>
      </section>

      <CTASection
        title="Ready to price your future?"
        description="Use the scholarship estimator or talk to admissions about which payment structure fits best."
        primary={{ label: "Apply now", to: "/apply" }}
        secondary={{ label: "Talk to admissions", to: "/contact" }}
      />
    </PageShell>
  );
}
