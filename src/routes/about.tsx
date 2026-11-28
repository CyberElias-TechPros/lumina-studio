import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection, Eyebrow, PageShell } from "@/components/marketing/shell";
import { EzoicMidContentAd, EzoicUnderTitleAd } from "@/components/ezoic/ezoic-ads";
import { CampusImg } from "@/components/marketing/photos";
import { flyerCourses, rotatingCourses, teachingLoop } from "@/data/academy";
import { FounderPhoto } from "@/components/marketing/founder-photo";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    getPageHead({
      title: "About Cyber Elias Academy — Our Story, Method & Port Harcourt Centre",
      description:
        "Digital skills should be learnable. Read the story behind Cyber Elias Academy (RC 8413776) at 24 Ebony Road, Port Harcourt — our method, our team, and what we teach.",
      path: "/about",
    }),
  component: About,
});

function About() {
  return (
    <PageShell>
      {/* Chapter 01 — The Belief */}
      <section className="border-border border-b">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:py-24">
          <div>
            <Eyebrow>01 — The belief</Eyebrow>
            <h1 className="font-display mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Digital skills should be{" "}
              <span className="font-serif font-normal text-[#d4572c] italic">learnable.</span>
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
              People should have a real place to start — a welcoming room with working computers,
              plain explanations, and honest fees. Cyber Elias Academy Ltd (RC 8413776) exists at 24
              Ebony Road, Port Harcourt to make practical digital fluency reachable.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                to="/classes"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#101214] px-6 text-sm font-semibold text-[#f4f1e9]"
              >
                Explore courses <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/visit"
                className="border-border inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold"
              >
                Visit 24 Ebony Road
              </Link>
            </div>
          </div>
          <figure className="border-border bg-card overflow-hidden rounded-xl border">
            <CampusImg id="lab-1" eager className="aspect-[16/10]" />
            <figcaption className="text-muted-foreground px-4 py-3 text-xs">
              The classroom at 24 Ebony Road, Off Rumuola Road, Port Harcourt
            </figcaption>
          </figure>
        </div>
      </section>

      <EzoicUnderTitleAd />

      {/* Chapters 02 & 03 — The Problem & The Mission */}
      <section className="border-b border-[#2c333c] bg-[#101214] py-16 text-[#f4f1e9] md:py-20">
        <div className="container-page grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="rounded-xl border border-[#242a31] bg-[#181c20] p-7">
            <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#f17c52] uppercase">
              02 — The problem
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Technology keeps expanding, while too many people are locked out at day one.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#c6cdd6] sm:text-base">
              Most computer centres hand out passive notes or charge vague fees. Most online videos
              assume fast laptops, fast data, and prior jargon. Beginners end up watching rather
              than doing.
            </p>
          </div>
          <div className="rounded-xl border border-[#d6fe52]/35 bg-[#181c20] p-7">
            <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#d6fe52] uppercase">
              03 — The mission
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Help people build useful, demonstrable digital capability.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#c6cdd6] sm:text-base">
              {flyerCourses.length} core short courses with published Naira fees,{" "}
              {rotatingCourses.length} rotating specialist tracks, 210 free self-study Notes, and 10
              browser practice labs — every course built around a finished work you can show.
            </p>
          </div>
        </div>
      </section>

      <EzoicMidContentAd />

      {/* Chapter 04 — The Method */}
      <section className="border-border border-b py-16 md:py-20">
        <div className="container-page">
          <Eyebrow>04 — The method</Eyebrow>
          <h2 className="font-display mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Learn. Practise. Create. Correct. Repeat. Demonstrate.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed">
            Small groups, two sessions a week, 1.5 to 2 hours each. Learners sit at real keyboards.
            Instructors demonstrate, then you practise. We do not sell a 9-month career track we
            have not run, and we do not quote placement rates we have not recorded.
          </p>
          <ol className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {teachingLoop.map((step, i) => (
              <li key={step} className="border-border bg-card rounded-xl border p-4">
                <span className="font-mono text-xs font-bold text-[#d4572c]">0{i + 1}</span>
                <p className="font-display mt-2 text-base font-semibold">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Chapter 05 — The People */}
      <section className="border-border bg-muted/35 border-b py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <FounderPhoto className="size-32 shrink-0 rounded-xl md:size-40" />
            <div>
              <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#d4572c] uppercase">
                05 — The people
              </p>
              <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Who runs CEA
              </h2>
              <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                Ellis Dennis Graham, an IT and network technician, founded the academy and leads the
                teaching. He is joined by Peter Jonathan-Hart (frontend and web development) and
                Rapheal Allison (graphic and product design). Their full backgrounds are on the{" "}
                <Link to="/team" className="font-semibold underline">
                  team page
                </Link>
                .
              </p>
            </div>
          </div>

          <figure className="border-border bg-card overflow-hidden rounded-xl border">
            <CampusImg id="lab-2" className="aspect-[4/3]" />
            <figcaption className="text-muted-foreground border-t border-border px-4 py-2.5 text-xs">
              24 Ebony Road, Off Rumuola Road · +234 905 862 8386 · help@cea.ng
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Chapter 06 — The Future */}
      <section className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-20">
        <div>
          <Eyebrow>06 — The future</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight">
            Where we are building next
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            The academy is building a connected ecosystem of practical classes, open-access Notes,
            interactive browser labs, and a Digital Solutions studio. We document what we can
            honestly deliver today — never fabricated claims — and publish updates as cohorts grow.
          </p>
          <Button asChild variant="outline" className="mt-6 rounded-full">
            <Link to="/visit">Plan a campus visit</Link>
          </Button>
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight">
            Published core subjects
          </h3>
          <dl className="mt-4 space-y-3 text-sm">
            {[...new Set(flyerCourses.map((c) => c.category))].map((cat) => (
              <div key={cat}>
                <dt className="font-semibold">{cat}</dt>
                <dd className="text-muted-foreground mt-1">
                  {flyerCourses
                    .filter((c) => c.category === cat)
                    .map((c, i, arr) => (
                      <span key={c.slug}>
                        <Link
                          to="/classes/$courseSlug"
                          params={{ courseSlug: c.slug }}
                          className="underline-offset-2 hover:underline"
                        >
                          {c.title}
                        </Link>
                        {i < arr.length - 1 ? ", " : ""}
                      </span>
                    ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTASection
        title="See the courses"
        description="Fees, weeks and deliverables are on each course page."
        primary={{ label: "View courses", to: "/classes" }}
        secondary={{ label: "Apply", to: "/apply" }}
      />
    </PageShell>
  );
}
