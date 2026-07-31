import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, PhoneCall } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell, PageHero, CTASection, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { faqs } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Answers about programs, admissions, tuition, scholarships, schedules and outcomes at Cyber Elias Academy.",
      },
    ],
  }),
  component: FaqPage,
});

const extraFaqs = [
  {
    q: "Are your certificates recognised?",
    a: "Our certificates are endorsed by our employer network and map to the OSKM (Occupational Skills & Knowledge Map) framework. They carry a verification code employers can check — the same way we verify every credential on the CEA-OS platform.",
  },
  {
    q: "Can I study while working?",
    a: "Yes. Live classes run in the evenings (18:00–21:00 WAT) and Saturdays, and every session is recorded. Most cohorts have working professionals; the average learner commits 12–15 hours a week.",
  },
  {
    q: "What happens if I miss the placement deadline?",
    a: "The Placement Promise continues until you're placed, with no time limit. If you've completed your capstone and follow our placement process, we work with you until you land the role.",
  },
  {
    q: "Do you accept international students?",
    a: "Yes — 12% of our learners are remote from 9 countries. Tuition is paid in naira equivalent, and assessments, mentorship and placement support all work fully remote.",
  },
];

function FaqPage() {
  const all = [...faqs, ...extraFaqs];

  return (
    <PageShell>
      <PageHero
        eyebrow="Frequently asked questions"
        title={
          <>
            Everything you're <span className="text-gradient">wondering</span>
          </>
        }
        description="Straight answers, no jargon. Can't find yours? Talk to admissions — real humans, one working day."
      />

      <section className="container-page pb-20">
        <div className="mx-auto max-w-3xl">
          <StaggerGroup className="space-y-3">
            {all.map((f, i) => (
              <StaggerItem key={f.q}>
                <Accordion
                  type="single"
                  collapsible
                  className="bg-card shadow-soft rounded-2xl border px-6"
                >
                  <AccordionItem value={`item-${i}`} className="border-0">
                    <AccordionTrigger className="text-left text-sm font-bold sm:text-base">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-muted/40 border-y">
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="Quick answers"
            title="Still curious? Ask us directly"
            description="WhatsApp or a call — whichever feels human to you."
          />
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            <Reveal>
              <Card className="bg-card shadow-soft hover:shadow-elevated border transition-all hover:-translate-y-0.5">
                <CardContent className="p-6">
                  <span className="bg-primary/10 text-primary grid size-11 place-items-center rounded-xl">
                    <PhoneCall className="size-5" />
                  </span>
                  <h3 className="font-display mt-4 text-base font-extrabold">Admissions hotline</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    +234 801 234 5678 · Mon–Sat, 9am–6pm
                  </p>
                  <Button asChild variant="outline" size="sm" className="mt-4">
                    <Link to="/contact">Call us</Link>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={0.1}>
              <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
                <CardContent className="p-6">
                  <span className="bg-ink-foreground/10 text-ink-foreground grid size-11 place-items-center rounded-xl">
                    <MessageCircle className="size-5" />
                  </span>
                  <h3 className="font-display mt-4 text-base font-extrabold">WhatsApp community</h3>
                  <p className="text-ink-foreground/70 mt-1 text-sm">
                    Join 4,000+ people asking questions daily.
                  </p>
                  <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                    <Link to="/community">
                      Join WhatsApp <ArrowRight className="ml-1 size-3.5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
