import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ChevronDown } from "lucide-react";
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
  {
    q: "Are the CEA Lab tools on /tools free without an account?",
    a: "Yes. Code Studio, CSS Layout Lab, SQL & DataLab, Spreadsheet Formula Lab, Assess Studio, Typing Test, Word Counter, Password Strength and Colour Contrast all run inside your browser with no sign-up and no tracking of what you type.",
  },
  {
    q: "How do I reach the Port Harcourt centre by public transport?",
    a: "Take any bus, taxi or keke heading to Rumuola Junction on Aba Road, then walk or take a short ride down Rumuola Road into Ebony Road. Number 24 is open Monday to Saturday, 8:00 to 20:00 WAT.",
  },
];

function FaqPage() {
  const all = [...faqs, ...extraFaqs];

  return (
    <PageShell>
      <PageHero
        eyebrow="FAQ"
        title="Questions"
        description="Short answers about courses, fees, visits, certificates and free browser labs. If yours is missing, call or email — we reply on working days."
      />

      <section className="container-page pb-16">
        <figure className="border-border mx-auto mb-10 max-w-3xl overflow-hidden rounded-lg border">
          <CampusImg id="lab-4" className="aspect-[16/9]" />
          <figcaption className="text-muted-foreground px-3 py-2 text-xs">
            Classes at 24 Ebony Road, Port Harcourt
          </figcaption>
        </figure>
        <div className="divide-border border-border mx-auto max-w-3xl divide-y border-y">
          {all.map((f, i) => (
            <details key={f.q} open={i < 3} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-medium">
                <span>{f.q}</span>
                <ChevronDown
                  className="text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link to="/contact">Ask a question</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/classes">Explore all courses</Link>
          </Button>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
