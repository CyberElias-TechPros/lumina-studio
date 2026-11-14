import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/marketing/shell";
import { CampusImg, CourseCover } from "@/components/marketing/photos";
import { FounderPhoto } from "@/components/marketing/founder-photo";
import { CourseFinder } from "@/components/marketing/course-finder";
import { HeroMotion } from "@/components/marketing/hero-motion";
import { ShinyText } from "@/components/react-bits/shiny-text";
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
      <section aria-label="Announcement" className="bg-primary text-primary-foreground">
        <div className="container-page flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed sm:text-[15px]">
            <span className="mr-2 inline-block rounded bg-white/20 px-2 py-0.5 text-xs font-semibold tracking-wide uppercase">
              Free · Opportunity
            </span>
            <strong className="font-semibold">
              iDICE Skills-to-Jobs training for young people in the South-South: applications are
              open.
            </strong>
          </p>
          <Link
            to="/opportunities/idice-skills-to-jobs"
            className="bg-background text-foreground hover:bg-background/90 inline-flex shrink-0 items-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-medium whitespace-nowrap"
          >
            How to apply <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section id="cea-home-hero" className="cea-home-hero relative overflow-hidden text-[#f6f5f0]">
        <HeroMotion />
        <div className="cea-hero-grid container-page relative grid items-center gap-10 pt-16 pb-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:pt-20 lg:pb-16">
          <div className="relative z-10">
            <div data-hero-copy className="cea-hero-kicker">
              <span className="cea-live-dot" /> PORT HARCOURT · PRACTICAL DIGITAL SKILLS
            </div>
            <h1
              data-hero-copy
              className="font-display mt-7 max-w-3xl text-[clamp(3.25rem,6.2vw,6.6rem)] leading-[0.98] font-semibold tracking-[-0.06em]"
            >
              The future is built by those who{" "}
              <span className="font-serif font-normal italic tracking-[-0.04em] text-[#a9caff]">
                learn to create it.
              </span>
            </h1>
            <p
              data-hero-copy
              className="mt-7 max-w-lg text-base leading-relaxed text-[#c5d0df] sm:text-lg"
            >
              Learn digital skills by doing real work. From your first computer lesson to a project
              you can show, we help you practise with purpose.
            </p>
            <div data-hero-copy className="mt-9 flex flex-wrap gap-3">
              <Link to="/classes" className="cea-hero-button cea-hero-button-primary">
                Explore courses <ArrowRight className="size-4" />
              </Link>
              <Link to="/about" className="cea-hero-button cea-hero-button-secondary">
                Discover CEA <ArrowRight className="size-4" />
              </Link>
            </div>
            <div
              data-hero-copy
              className="cea-hero-bottom mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/15 pt-6"
            >
              <div>
                <span className="block font-mono text-[10px] tracking-[0.18em] text-[#8da0ba] uppercase">
                  Your starting point
                </span>
                <span className="mt-1 block text-sm font-medium">Learn at your pace</span>
              </div>
              <div>
                <span className="block font-mono text-[10px] tracking-[0.18em] text-[#8da0ba] uppercase">
                  Find us
                </span>
                <span className="mt-1 block text-sm font-medium">24 Ebony Road, Port Harcourt</span>
              </div>
            </div>
          </div>
          <figure data-hero-art className="cea-hero-art relative mx-auto w-full max-w-[620px]">
            <div className="cea-hero-art-frame">
              <CampusImg id="lab-1" eager />
            </div>
            <figcaption className="mt-4 flex flex-wrap justify-between gap-3 text-xs tracking-wide text-[#c4d0da]">
              <span>The CEA classroom · Port Harcourt</span>
              <span>01 / LEARN BY DOING</span>
            </figcaption>
          </figure>
        </div>
        <div className="cea-hero-marquee" aria-label="Learn, practise, create">
          <div className="container-page flex flex-wrap items-center justify-between gap-3 py-4">
            <ShinyText text="LEARN / PRACTISE / CREATE" />
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#91a4bd] uppercase">
              Real skills. Your next chapter.
            </span>
          </div>
        </div>
      </section>

      <section className="border-border border-b" aria-labelledby="academy-intro">
        <div className="container-page grid gap-5 py-16 md:grid-cols-[1fr_3fr] md:gap-12 md:py-24">
          <p className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
            01 / The Academy
          </p>
          <div>
            <h2
              id="academy-intro"
              className="font-display max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              A practical education for a digital world.
            </h2>
            <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
              Cyber Elias Academy is a digital-skills training centre where beginners and
              experienced learners build useful skills through practice. We also help organisations
              explore practical technology solutions.
            </p>
            <div className="mt-6 flex flex-wrap gap-6 text-sm font-semibold">
              <Link to="/about" className="text-primary hover:underline">
                Get to know CEA ↗
              </Link>
              <Link to="/services" className="text-primary hover:underline">
                Explore IT services ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CourseFinder id="home-course-finder" />

      <section className="container-page py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Find the skill you want to build.
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
              Start with a goal. Compare the fee, duration and the work you will practise before you
              apply.
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
                className="cea-course-card border-border bg-card flex h-full flex-col overflow-hidden rounded-2xl border"
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
                  <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
                    Requirements: {course.requirements.join(" · ")}
                  </p>
                  <p className="mt-4 border-t border-border pt-4 text-sm">
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

      <section className="bg-[#101923] text-[#f6f5f0]">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
          <figure className="overflow-hidden border border-white/20">
            <CampusImg id="lab-3" className="aspect-[4/3]" />
            <figcaption className="px-3 py-3 text-xs text-[#c4d0da]">
              A class in session at the centre
            </figcaption>
          </figure>
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-[#96dce8] uppercase">
              02 / Learning in action
            </p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Learning happens by doing.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#d3dbe4]">
              Guided practice, individual work and a practical project turn an idea into something
              useful. Our teaching loop gives every learner a way to keep moving forward.
            </p>
            <ol className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-white/20 bg-white/20 sm:grid-cols-3">
              {teachingLoop.map((step, i) => (
                <li key={step} className="bg-[#101923] p-4">
                  <span className="text-xs text-[#96dce8] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-sm font-medium">{step}</p>
                </li>
              ))}
            </ol>
            <Link
              to="/visit"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline underline-offset-4"
            >
              See the training centre <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <p className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
            03 / Beyond the classroom
          </p>
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Learning is only the beginning.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
              Explore the academy, visit the training centre or tell us about a digital project your
              organisation needs.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { title: "Academy", text: "Practical courses and free learning.", to: "/classes" },
                {
                  title: "IT services",
                  text: "Websites, software and digital solutions.",
                  to: "/services",
                },
                {
                  title: "Visit CEA",
                  text: "See our learning environment in Port Harcourt.",
                  to: "/visit",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  to={item.to}
                  className="group border-border hover:border-primary flex min-h-40 flex-col justify-between rounded-lg border p-5 transition-colors"
                >
                  <span className="text-primary text-xl" aria-hidden="true">
                    ↗
                  </span>
                  <span>
                    <strong className="block text-base">{item.title}</strong>
                    <span className="text-muted-foreground mt-2 block text-sm leading-relaxed">
                      {item.text}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
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
            Founder. He runs the centre at 24 Ebony Road and teaches the courses. The notes on this
            site are his class voice, written down.
          </p>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Who it is for
        </h2>
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
              Free, self-paced lessons that turn everyday computer tasks into practice: files,
              email, office documents, spreadsheets, phones and safer browsing. Explore all{" "}
              {blogPosts.length} lessons in order, or search for the task you need today.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/blog" className="text-primary text-sm font-medium hover:underline">
              All notes
            </Link>
            <Link
              to="/practice/computer-basics"
              className="text-primary text-sm font-medium hover:underline"
            >
              Try the Computer Basics Lab
            </Link>
            <Link to="/learning-trail" className="text-primary text-sm font-medium hover:underline">
              Your learning trail
            </Link>
            <Link
              to="/editorial"
              className="text-muted-foreground text-sm font-medium hover:text-foreground"
            >
              How we maintain them
            </Link>
          </div>
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
              24 Ebony Road, Port Harcourt
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl text-base leading-relaxed">
              Classes run at the centre on Ebony Road, off Rumuola Road. Some courses can also be
              followed online. Call or visit during opening hours if you want to see the room before
              you enrol.
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
              24 Ebony Road, Off Rumuola Road
              <br />
              Port Harcourt, Rivers State
              <br />
              +234 905 862 8386 · help@cea.ng
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

      <section className="bg-[#101923] text-[#f6f5f0]">
        <div className="container-page py-16 md:py-24">
          <p className="text-xs font-semibold tracking-[0.16em] text-[#96dce8] uppercase">
            Your next chapter
          </p>
          <h2 className="font-display mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Your journey into the digital world starts here.
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-[#d3dbe4]">
            Explore courses, find your starting point and apply when you are ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/classes"
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#f6f5f0] px-5 py-3 text-sm font-semibold text-[#101923] hover:bg-white"
            >
              Explore courses <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/admissions"
              className="inline-flex min-h-11 items-center rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              How to enrol
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
