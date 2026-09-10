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
import { CONTACT, whatsappUrl } from "@/lib/contact";
import { getPageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/faq")({
  head: () => {
    const allFaqs = [...faqs, ...extraFaqs];
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: allFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    return getPageHead({
      title: "FAQ — Cyber Elias Academy",
      description:
        "Answers about programs, admissions, tuition, schedules and career support at Cyber Elias Academy.",
      path: "/faq",
      structuredData: faqSchema,
    });
  },
  component: FaqPage,
});

const extraFaqs = [
  {
    q: "Are your certificates recognised?",
    a: "Every certificate carries a verification code any employer can check on our public verification page. It lists your program, capstone project and assessed competencies — not just attendance. We are a registered Nigerian company (RC 8413776), not a university or polytechnic, and we make no NBTE accreditation claim.",
  },
  {
    q: "Can I study while working?",
    a: "Yes. Live classes run in the evenings (18:00–21:00 WAT) and Saturdays, and every session is recorded. Most learners commit 12–15 hours a week.",
  },
  {
    q: "What career support do I get after graduating?",
    a: "Career support with no expiry date: portfolio reviews, mock interviews, and introductions to employers and freelance contacts as opportunities come in. If you've completed your capstone and follow our process, we work with you until you land something. We don't guarantee jobs — no honest school can — but we don't disappear after graduation either.",
  },
  {
    q: "Do you accept international students?",
    a: "Yes. Tuition is paid in naira equivalent, and assessments, mentorship and placement support are designed to work fully remotely.",
  },
];

function FaqPage() {
  const all = [...faqs, ...extraFaqs];

  return (
    <PageShell>
      <PageHero
        eyebrow="Frequently asked questions"
        art="data"
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
                    {CONTACT.phoneDisplay} · {CONTACT.hours}
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
                  <h3 className="font-display mt-4 text-base font-extrabold">WhatsApp us directly</h3>
                  <p className="text-ink-foreground/70 mt-1 text-sm">
                    Questions about fees, schedules or courses — a real person replies, usually
                    within hours.
                  </p>
                  <Button asChild size="sm" className="mt-4 border-0 bg-[#25D366] hover:bg-[#1fb857]">
                    <a
                      href={whatsappUrl("Hello CEA! I have a question.")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat on WhatsApp <ArrowRight className="ml-1 size-3.5" />
                    </a>
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
