import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection, PageShell } from "@/components/marketing/shell";
import { CampusImg, CourseCover } from "@/components/marketing/photos";
import { FounderPhoto } from "@/components/marketing/founder-photo";
import { faqs } from "@/data/site";
import { blogPosts } from "@/data/blog";
import { flyerCourses, formatFee, teachingLoop } from "@/data/academy";
import { getPageHead } from "@/lib/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    return getPageHead({
      title: "Cyber Elias Academy — Practical digital skills training in Port Harcourt",
      description:
        "Short computer and digital-skills courses in Port Harcourt: Microsoft Office, computer basics, graphic design, web design, data entry and more. Two sessions a week.",
      path: "/",
      structuredData: faqSchema,
    });
  },
  component: Home,
});

const featured = [
  "microsoft-office",
  "computer-basics-typing",
  "graphic-design",
  "web-design",
  "data-entry",
  "computer-repairs",
];

function Home() {
  const courses = featured
    .map((slug) => flyerCourses.find((c) => c.slug === slug))
    .filter((c): c is (typeof flyerCourses)[number] => Boolean(c));

  return (
    <PageShell>
      <section className="border-border border-b">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.12em] uppercase">
              Port Harcourt · Digital skills training
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-[2.75rem] md:leading-tight">
              Practical computer and digital-skills training
            </h1>
            <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed text-pretty sm:text-[17px]">
              Cyber Elias Academy is a training centre on Ebony Road. We teach short, hands-on
              courses — Office, computer basics, design, web, data entry, repairs — two sessions a
              week. You leave with a piece of work, not just a certificate of attendance.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/classes">
                  View courses <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/apply">Apply</Link>
              </Button>
            </div>
            <p className="text-muted-foreground mt-6 text-sm">
              13 short courses · two sessions a week · 26 Ebony Road, Port Harcourt
            </p>
          </div>
          <figure className="border-border overflow-hidden rounded-lg border">
            <CampusImg id="lab-1" eager className="aspect-[4/3]" />
            <figcaption className="text-muted-foreground px-3 py-2 text-xs">
              Classroom, 26 Ebony Road
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Courses
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
              Fees, duration and what you produce are listed on each course page. These are the
              courses we teach now.
            </p>
          </div>
          <Link to="/classes" className="text-primary text-sm font-medium hover:underline">
            All courses
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <li key={course.slug}>
              <Link
                to="/classes/$courseSlug"
                params={{ courseSlug: course.slug }}
                className="border-border bg-card hover:border-primary/40 flex h-full flex-col overflow-hidden rounded-lg border transition-colors"
              >
                <div className="bg-muted aspect-[16/10] overflow-hidden">
                  <CourseCover slug={course.slug} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-muted-foreground text-xs">{course.category}</p>
                  <h3 className="font-display mt-2 text-lg font-semibold tracking-tight">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                    {course.deliverable.title}
                  </p>
                  <p className="mt-4 text-sm">
                    <span className="font-medium">{formatFee(course.fee)}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      · {course.weeks} weeks · {course.level}
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-border bg-muted/40 border-y">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-20">
          <figure className="border-border overflow-hidden rounded-lg border">
            <CampusImg id="lab-3" className="aspect-[4/3]" />
            <figcaption className="text-muted-foreground bg-card px-3 py-2 text-xs">
              Two sessions a week, at a machine
            </figcaption>
          </figure>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              How a class runs
            </h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              Two sessions a week, 1.5 to 2 hours each. You work at a machine from the first hour.
              The certificate is awarded for the named deliverable — a document, a design, a
              website, a serviced machine — not for sitting in the room.
            </p>
            <ol className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {teachingLoop.map((step, i) => (
                <li key={step} className="border-border bg-card rounded-lg border p-4">
                  <span className="text-muted-foreground text-xs tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 text-sm font-medium">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-8 py-16 md:grid-cols-[8rem_1fr] md:items-center md:py-20">
        <FounderPhoto className="size-28 rounded-lg md:size-32" />
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Ellis Dennis Graham
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-base leading-relaxed">
            Founder. He runs the centre at 26 Ebony Road and teaches the courses. The notes on this
            site are his class voice, written down.
          </p>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Who it is for</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "School leavers and NYSC",
              body: "Office skills, typing, and a first website or design you can show.",
            },
            {
              title: "Office, church and NGO staff",
              body: "Documents, spreadsheets, email and the tools the job already asks for.",
            },
            {
              title: "Small-business owners",
              body: "Invoices, flyers, a simple web presence, and basic computer care.",
            },
          ].map((item) => (
            <li key={item.title} className="border-border rounded-lg border p-5">
              <h3 className="font-display text-base font-semibold">{item.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Notes: computer skills from scratch
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
              Free class notes anyone can read — sitting down at a computer, files, email, Word,
              spreadsheets, the phone, and staying safe online. {blogPosts.length} lessons, written
              as if someone is sitting beside you.
            </p>
          </div>
          <Link to="/blog" className="text-primary text-sm font-medium hover:underline">
            All notes
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...blogPosts]
            .sort((a, b) => a.order - b.order)
            .slice(0, 6)
            .map((post) => (
              <li key={post.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="border-border bg-card hover:border-primary/40 flex h-full flex-col overflow-hidden rounded-lg border transition-colors"
                >
                  <img
                    src={post.cover}
                    alt={post.coverAlt}
                    className="aspect-[16/9] w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-muted-foreground text-xs">Lesson {post.order}</p>
                    <h3 className="font-display mt-2 text-base font-semibold tracking-tight">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 line-clamp-3 flex-1 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </section>

      <section className="border-border bg-muted/40 border-y">
        <div className="container-page grid gap-8 py-16 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              26 Ebony Road, Port Harcourt
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl text-base leading-relaxed">
              Classes run at the centre on Ebony Road, off Rumuola Road. Some courses can also be
              followed online. Call or visit during opening hours if you want to see the room
              before you enrol.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link to="/visit">Plan a visit</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Contact</Link>
              </Button>
            </div>
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              Cyber Elias Academy
              <br />
              26 Ebony Road, Off Rumuola Road
              <br />
              Port Harcourt, Rivers State
              <br />
              +234 905 862 8386 · hello@cea.ng
              <br />
              Mon–Sat, 8:00–20:00 WAT
            </p>
          </div>
          <figure className="border-border overflow-hidden rounded-lg border">
            <CampusImg id="lab-2" className="aspect-[4/3]" />
            <figcaption className="text-muted-foreground bg-card px-3 py-2 text-xs">
              Practice desks at the centre
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Questions
        </h2>
        <Accordion type="single" collapsible className="mt-6 max-w-3xl">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-6">
          <Link to="/faq" className="text-primary text-sm font-medium hover:underline">
            More questions
          </Link>
        </p>
      </section>

      <CTASection />
    </PageShell>
  );
}
