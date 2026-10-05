import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";
import { CampusImg } from "@/components/marketing/photos";
import { flyerCourses, rotatingCourses } from "@/data/academy";
import { FounderPhoto } from "@/components/marketing/founder-photo";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    getPageHead({
      title: "About — Cyber Elias Academy",
      description:
        "Cyber Elias Academy is a digital-skills training centre in Port Harcourt, Rivers State. Short, practical computer courses in small groups.",
      path: "/about",
    }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title="A digital-skills training centre in Port Harcourt"
        description="Cyber Elias Academy Ltd teaches practical computer and workplace-digital skills in short courses. We are a registered Nigerian company (RC 8413776), based at 24/26 Ebony Road."
      />

      <section className="container-page grid gap-4 py-10 sm:grid-cols-2 md:py-12">
        <figure className="border-border overflow-hidden rounded-lg border">
          <CampusImg id="lab-1" className="aspect-[16/10]" />
          <figcaption className="text-muted-foreground px-3 py-2 text-xs">
            The classroom at 24/26 Ebony Road
          </figcaption>
        </figure>
        <figure className="border-border overflow-hidden rounded-lg border">
          <CampusImg id="lab-4" className="aspect-[16/10]" />
          <figcaption className="text-muted-foreground px-3 py-2 text-xs">
            Whiteboard, wall screen and practice machines
          </figcaption>
        </figure>
      </section>

      <section className="container-page grid gap-8 py-8 md:grid-cols-[10rem_1fr] md:items-center md:py-10">
        <FounderPhoto className="size-32 rounded-lg md:size-40" />
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Who runs it</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-base leading-relaxed">
            Ellis Dennis Graham, an IT and network technician, founded the academy and leads the
            teaching. He is joined by Peter Jonathan-Hart (frontend and web development) and Rapheal
            Allison (graphic and product design). Their backgrounds are on the{" "}
            <Link to="/team" className="text-primary underline">
              team page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">What we teach</h2>
          <p className="text-muted-foreground mt-3 text-base leading-relaxed">
            {flyerCourses.length} core short courses are listed on the Academy flyer. Each has a
            published syllabus, a fee in naira, and a named piece of work for assessment.
          </p>
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
                          className="hover:text-primary underline-offset-2 hover:underline"
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
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            {rotatingCourses.length} additional specialist short courses are listed separately as
            rotating options. Ask admissions whether a specific one is currently available.
          </p>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            We also take on IT support and network installation, ICT assessments, websites and web
            apps, branding and design work, and staff training for businesses and schools.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">How we teach</h2>
          <p className="text-muted-foreground mt-3 text-base leading-relaxed">
            Small groups, two sessions a week, 1.5 to 2 hours each. Learners work at a computer.
            Instructors demonstrate, then you practise. We do not sell a 9-month career track we
            have not run, and we do not quote placement rates we have not recorded.
          </p>
        </div>
      </section>

      <section className="border-border bg-muted/40 border-y">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Where we are</h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              The centre is at 24/26 Ebony Road, off Rumuola Road, Port Harcourt. You can visit
              during opening hours, or apply online and we will confirm the next start date for the
              course you want.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/visit">Plan a visit</Link>
            </Button>
          </div>
          <figure className="border-border overflow-hidden rounded-lg border">
            <CampusImg id="lab-2" className="aspect-[4/3]" />
            <figcaption className="text-muted-foreground bg-card px-3 py-2 text-xs">
              24/26 Ebony Road, Off Rumuola Road · +234 905 862 8386 · help@cea.ng
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <h2 className="font-display max-w-2xl text-2xl font-semibold tracking-tight">
          Where we are as an organisation
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed">
          The academy is at an early stage. We have run introductory computer training and we are
          building the centre, the timetable and the courses in the open. We do not claim a
          multi-year institutional record, an employer placement scheme, or a national training
          network. If we add a longer programme later, it will appear here when we can actually
          deliver it.
        </p>
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
