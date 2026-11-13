import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { Button } from "@/components/ui/button";
import { CTASection, PageShell } from "@/components/marketing/shell";
import { CampusImg } from "@/components/marketing/photos";
import { TUITION_POLICY } from "@/data/academy/tuition-policy";
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
    title: "Accept your offer and begin",
    body: "Once the timetable, equipment and place are confirmed, review the offer and pay as agreed before your class begins.",
  },
];

function Admissions() {
  return (
    <PageShell>
      <section className="border-border border-b">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-24">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
              Admissions / Your next step
            </p>
            <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              How to enrol.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
              A short course application, not an entrance exam. Choose a course that fits your
              starting point and we will help you understand what comes next.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/apply">Start an application</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/classes">Compare courses</Link>
              </Button>
            </div>
          </div>
          <div className="border-border border-t pt-5 lg:border-t-0 lg:border-l lg:pl-8">
            <p className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
              Before you start
            </p>
            <p className="font-display mt-3 text-xl font-semibold">Applying is free.</p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              An application is not a reserved place. Do not pay until you have reviewed and
              accepted a confirmed course offer.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
              The process / 01—04
            </p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              A clear path from interest to class.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md leading-relaxed">
              We confirm availability and practical arrangements with you. Unscheduled courses
              collect interest only.
            </p>
            <figure className="border-border mt-8 overflow-hidden rounded-lg border">
              <CampusImg id="lab-3" className="aspect-[16/10]" />
              <figcaption className="text-muted-foreground px-3 py-2 text-xs">
                A class in session at the centre
              </figcaption>
            </figure>
          </div>
          <ol className="border-border border-t">
            {steps.map((s) => (
              <li
                key={s.n}
                className="border-border grid grid-cols-[3rem_1fr] gap-4 border-b py-6 sm:grid-cols-[4rem_1fr]"
              >
                <span className="text-primary font-display text-2xl tabular-nums">0{s.n}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-base">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-border bg-muted/40 border-y">
        <div className="container-page grid gap-8 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Fees and payment</h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              Each course page lists the fee in naira. {TUITION_POLICY.payment}{" "}
              {TUITION_POLICY.availability}
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
