import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";
import { CampusImg } from "@/components/marketing/photos";
import { faqs } from "@/data/site";
import { getPageHead } from "@/lib/seo";

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
        "Answers about courses, admissions, fees, certificates and the Port Harcourt centre.",
      path: "/faq",
      structuredData: faqSchema,
    });
  },
  component: FaqPage,
});

const extraFaqs = [
  {
    q: "Are the Notes free to read?",
    a: "Yes. The Notes series is a from-scratch set of computer-skills lessons anyone can read on this site. Enrolment in a taught course is separate; each course page lists the fee.",
  },
  {
    q: "Are the certificates recognised?",
    a: "Certificates are issued by Cyber Elias Academy Ltd and can be checked on our public verification page. They record the course and the work you produced. They are not a government licence or a university degree.",
  },
  {
    q: "Can I study while working?",
    a: "Yes. Sessions are typically two per week. Ask admissions for the current timetable — evening and Saturday slots are used when there is demand.",
  },
  {
    q: "Do I need my own computer?",
    a: "Computer Basics can be practised on academy machines. Most other courses need a laptop, or reliable access to one, because homework is where the skill is built. Each course page lists requirements.",
  },
];

function FaqPage() {
  const all = [...faqs, ...extraFaqs];

  return (
    <PageShell>
      <PageHero
        eyebrow="FAQ"
        title="Questions"
        description="Short answers. If yours is missing, call or email — we reply on working days."
      />

      <section className="container-page pb-16">
        <figure className="border-border mx-auto mb-10 max-w-3xl overflow-hidden rounded-lg border">
          <CampusImg id="lab-4" className="aspect-[16/9]" />
          <figcaption className="text-muted-foreground px-3 py-2 text-xs">
            Classes at 24/26 Ebony Road, Port Harcourt
          </figcaption>
        </figure>
        <Accordion type="single" collapsible className="mx-auto max-w-3xl">
          {all.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mx-auto mt-10 max-w-3xl">
          <Button asChild variant="outline">
            <Link to="/contact">Ask a question</Link>
          </Button>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
