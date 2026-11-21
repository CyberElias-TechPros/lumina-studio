import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import { PageShell, PageHero, CTASection, Eyebrow } from "@/components/marketing/shell";
import { AssessStudio } from "@/components/tools/assess-studio";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/assess")({
  head: () =>
    getPageHead({
      title: "CEA Assess — Free Skill Diagnostic & Practice Quizzes",
      description:
        "Check your readiness across Computer Basics, Web Development, SQL & Data Analytics, Microsoft Office and AI Literacy in Study Mode or Timed Exam Mode.",
      path: "/tools/assess",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "CEA Assess Studio",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      },
    }),
  component: AssessPage,
});

function AssessPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free lab · Assessment"
        title={
          <>
            Know your gaps{" "}
            <span className="font-serif text-primary font-normal italic">before class starts.</span>
          </>
        }
        description="Use Study Mode for guided hints and instant explanations, or switch to Timed Exam Mode to test yourself under pressure across five Cyber Elias Academy tracks."
        meta={["5 skill tracks", "Study & Exam modes", "Instant topic review"]}
      >
        <Link
          to="/tools"
          className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
        >
          <ArrowLeft className="size-4" /> All tools
        </Link>
      </PageHero>

      <section className="container-page py-12 md:py-16" aria-label="CEA Assess diagnostic studio">
        <AssessStudio />

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="border-foreground/10 bg-card rounded-2xl border p-6">
            <Eyebrow>
              <CheckCircle2 className="size-3.5" aria-hidden="true" /> Choosing your starting level
            </Eyebrow>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">
              How to interpret your diagnostic score
            </h2>
            <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-relaxed">
              <p>
                <strong className="text-foreground">Below 50% on Computer Basics:</strong> start
                with our hands-on{" "}
                <Link
                  to="/practice/computer-basics"
                  className="text-primary font-semibold hover:underline"
                >
                  Computer Basics Lab
                </Link>{" "}
                and typing drills before jumping into code or spreadsheets.
              </p>
              <p>
                <strong className="text-foreground">50%–75% on Web, SQL or Office:</strong> you
                recognise the terms, now use{" "}
                <Link
                  to="/tools/code-studio"
                  className="text-primary font-semibold hover:underline"
                >
                  Code Studio
                </Link>{" "}
                or{" "}
                <Link
                  to="/tools/sql-datalab"
                  className="text-primary font-semibold hover:underline"
                >
                  DataLab
                </Link>{" "}
                to build speed by solving actual challenges without peeking.
              </p>
            </div>
          </div>

          <div className="border-foreground/10 bg-card rounded-2xl border p-6">
            <Eyebrow>
              <Clock className="size-3.5" aria-hidden="true" /> Study Mode vs Exam Mode
            </Eyebrow>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">
              Why timed recall beats passive rereading
            </h2>
            <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-relaxed">
              <p>
                Reading notes feels comfortable, which makes it easy to overestimate what you can
                recall under a deadline. First run through a track in Study Mode so every wrong
                answer reveals why, then retake it in Timed Exam Mode a day later without hints.
              </p>
              <p>
                All scoring happens locally in your browser — nothing is uploaded, and you can
                retake any track as often as you need before enrolling at 24 Ebony Road.
              </p>
              <p>
                <strong className="text-foreground">Next step after scoring 80%+:</strong> pair your
                diagnostic with a hands-on build in{" "}
                <Link
                  to="/tools/code-studio"
                  className="text-primary font-semibold hover:underline"
                >
                  Code Studio
                </Link>
                ,{" "}
                <Link
                  to="/tools/excel-formula-lab"
                  className="text-primary font-semibold hover:underline"
                >
                  Spreadsheet Lab
                </Link>{" "}
                or the{" "}
                <Link to="/classes" className="text-primary font-semibold hover:underline">
                  full course syllabus
                </Link>{" "}
                so theory turns into completed portfolio deliverables.
              </p>
              <p>
                <strong className="text-foreground">Honest assessment boundary:</strong> browser
                self-checks help you place yourself accurately and spot weak areas before cohort day
                one; official CEA certificates are awarded only after instructor-reviewed projects
                and supervised practical exams.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to turn practice into a verified portfolio?"
        description="Join a small-group cohort in Port Harcourt with live instructors, weekly practicals and graded projects."
        primary={{ label: "Browse all courses", to: "/classes" }}
        secondary={{ label: "Apply for admission", to: "/apply" }}
      />
    </PageShell>
  );
}
