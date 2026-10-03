import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { CampusImg } from "@/components/marketing/photos";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/admissions")({
  head: () =>
    getPageHead({
      title: "Admissions",
      description:
        "How to enrol at Cyber Elias Academy: choose a short course, apply online or in person, and we confirm dates, fees and what to bring.",
      path: "/admissions",
    }),
  component: Admissions,
});

const steps = [
  {
    n: "1",
    title: "Choose a course",
    body: "Read the syllabus, fee and deliverable. Beginner courses do not require prior technical experience.",
  },
  {
    n: "2",
    title: "Apply",
    body: "The form takes a few minutes: your name, contact details, and the course you want. There is no application fee.",
  },
  {
    n: "3",
    title: "We reply",
    body: "We confirm whether a seat is available, the next start date, the fee, and whether you need your own laptop.",
  },
  {
    n: "4",
    title: "Start class",
    body: "Pay as agreed, join the first session, and use the learner login for notes, attendance and your work.",
  },
];

function Admissions() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Admissions"
        title="How to enrol"
        description="A short course application, not an entrance exam. We place beginners on beginner courses. If a course is a poor fit, we will say so."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/apply">Apply</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/classes">View courses</Link>
          </Button>
        </div>
      </PageHero>

      <section className="container-page py-10 md:py-12">
        <figure className="border-border mx-auto max-w-3xl overflow-hidden rounded-lg border">
          <CampusImg id="lab-3" className="aspect-[16/9]" />
          <figcaption className="text-muted-foreground px-3 py-2 text-xs">
            Enrolment is a short form, then you start in the classroom
          </figcaption>
        </figure>
      </section>

      <section className="container-page py-16 md:py-20">
        <SectionHeading eyebrow="The process" title="Four steps" />
        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {steps.map((s) => (
            <li key={s.n} className="border-border rounded-lg border p-6">
              <p className="text-muted-foreground text-xs tabular-nums">Step {s.n}</p>
              <h3 className="font-display mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-border bg-muted/40 border-y">
        <div className="container-page grid gap-8 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Fees and payment</h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              Each course page lists the fee in naira. Monthly instalments can be arranged for the
              duration of the course. We will not invent a scholarship or income-share scheme on
              this page; ask when you apply if you need a payment plan.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Already applied?</h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              Use your application reference to check status, or email help@cea.ng.
            </p>
            <Button asChild variant="outline" className="mt-5">
              <Link to="/apply/status">Track an application</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        title="Start an application"
        description="Pick a course and send your details. We reply with dates and the fee."
        primary={{ label: "Apply", to: "/apply" }}
        secondary={{ label: "Talk to us", to: "/contact" }}
      />
    </PageShell>
  );
}
