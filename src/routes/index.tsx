import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Code2,
  GraduationCap,
  MapPin,
  Store,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, Eyebrow } from "@/components/marketing/shell";
import { CampusImg, CourseCover } from "@/components/marketing/photos";
import { FounderPhoto } from "@/components/marketing/founder-photo";
import { CourseFinder } from "@/components/marketing/course-finder";
import { FourThingsDiagram } from "@/components/marketing/four-things-diagram";
import { FeeReceipt } from "@/components/marketing/fee-receipt";
import { HeroMotion } from "@/components/marketing/hero-motion";
import { courseFamilyTheme } from "@/lib/course-families";
import { cn } from "@/lib/utils";
import { faqs } from "@/data/site";
import { blogPosts } from "@/data/blog";
import { flyerCourses, formatFee, teachingLoop } from "@/data/academy";
import { readingTimeLabel } from "@/lib/blog-reading-time";
import { getPageHead } from "@/lib/seo";

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
        "Short computer and digital-skills courses in Port Harcourt from ₦20,000: Microsoft Office, computer basics, graphic design, web design, data entry, and 10 free browser labs.",
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

const quickPaths = [
  {
    icon: GraduationCap,
    label: "Courses & fees",
    detail: "13 practical courses from ₦20,000",
    to: "/classes",
  },
  {
    icon: Terminal,
    label: "Free browser labs",
    detail: "10 tools: Code, SQL, Excel & Typing",
    to: "/tools",
  },
  {
    icon: BookOpen,
    label: "210 self-study notes",
    detail: "Plain-English guides across 21 chapters",
    to: "/blog",
  },
  {
    icon: MapPin,
    label: "Visit the centre",
    detail: "24 Ebony Road, Mon–Sat 8:00–20:00",
    to: "/visit",
  },
] as const;

function Home() {
  const courses = featured
    .map((slug) => flyerCourses.find((c) => c.slug === slug))
    .filter((c): c is (typeof flyerCourses)[number] => Boolean(c));

  return (
    <PageShell>
      {/* ── Announcement: iDICE ─────────────────────────────────────────── */}
      <section
        aria-label="Announcement"
        className="border-b border-white/10 bg-[#0b172a] text-white"
      >
        <div className="container-page flex flex-col gap-2.5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm leading-snug text-[#d7e4f8]">
            <span className="rounded-full border border-[#8ec4ff]/35 bg-[#245ce0]/35 px-2.5 py-0.5 text-xs font-semibold tracking-wider text-[#cfe2ff] uppercase">
              Free · iDICE
            </span>
            <span>
              <strong className="font-semibold text-white">Skills-to-Jobs training</strong> for
              young people in the South-South — applications are open.
            </span>
          </p>
          <Link
            to="/opportunities/idice-skills-to-jobs"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-[#93c0ff] transition-colors hover:text-white"
          >
            How to apply
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ── Daylight Editorial Hero ─────────────────────────────────────── */}
      <section
        id="cea-home-hero"
        className="border-border bg-background relative overflow-hidden border-b"
      >
        <HeroMotion />
        <div className="container-page relative grid items-center gap-10 pt-10 pb-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:pt-14 lg:pb-16">
          <div className="relative z-10">
            <div
              data-hero-copy
              className="border-border bg-muted/60 inline-flex items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-3"
            >
              <span className="size-2 rounded-full bg-emerald-600" aria-hidden="true" />
              <span className="text-foreground/85 text-xs font-semibold tracking-wider uppercase">
                Admissions open · 24 Ebony Road, Port Harcourt
              </span>
            </div>

            <h1
              data-hero-copy
              className="font-display text-foreground mt-6 max-w-3xl text-[clamp(2.5rem,5.2vw,4.35rem)] leading-[1.01] font-semibold tracking-[-0.04em] text-balance"
            >
              Practical digital skills,{" "}
              <span className="font-serif text-primary font-normal italic">taught in person</span>{" "}
              in Port Harcourt.
            </h1>

            <p
              data-hero-copy
              className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed text-pretty sm:text-lg"
            >
              Learn Microsoft Office, typing, graphic design, web development, data entry, and
              computer repairs in small groups — two sessions a week with a teacher in the room, or
              practise free anytime with our 210 notes and 10 browser labs.
            </p>

            <div data-hero-copy className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                to="/classes"
                className="group bg-primary text-primary-foreground inline-flex min-h-[48px] items-center gap-2.5 rounded-full px-7 text-sm font-semibold shadow-sm transition-colors hover:opacity-95"
              >
                Explore courses &amp; fees
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/tools"
                className="border-border bg-card text-foreground hover:border-primary/40 inline-flex min-h-[48px] items-center gap-2 rounded-full border px-6 text-sm font-semibold transition-colors"
              >
                Try 10 free labs
                <ArrowUpRight className="size-4 opacity-75" />
              </Link>
            </div>

            <dl
              data-hero-copy
              className="border-border mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-6 sm:grid-cols-4"
            >
              {[
                ["From ₦20,000", "Published fees"],
                ["2–4 weeks", "2 sessions / week"],
                ["210 notes", "Free self-study"],
                ["10 labs", "Practise in browser"],
              ].map(([top, bottom]) => (
                <div key={top}>
                  <dt className="font-display text-foreground text-lg font-semibold tabular-nums">
                    {top}
                  </dt>
                  <dd className="text-muted-foreground mt-0.5 text-xs">{bottom}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure data-hero-art className="mx-auto w-full max-w-[580px]">
            <div className="border-border bg-muted overflow-hidden rounded-2xl border shadow-sm">
              <CampusImg id="lab-1" eager className="aspect-[4/3] w-full object-cover" />
            </div>
            <figcaption className="text-muted-foreground mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span>Classroom session at 24 Ebony Road, Off Rumuola Road, Port Harcourt</span>
              <span className="font-mono font-medium">Mon–Sat · 8:00–20:00 WAT</span>
            </figcaption>
          </figure>
        </div>

        {/* Visitor quick paths */}
        <div className="border-border bg-muted/30 border-t">
          <div className="container-page grid gap-3 py-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickPaths.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="border-border bg-card hover:border-primary/40 group flex min-h-[56px] items-center gap-3.5 rounded-xl border px-4 py-3 transition-colors"
              >
                <span className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-lg">
                  <item.icon className="size-4.5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-foreground group-hover:text-primary block text-sm font-semibold transition-colors">
                    {item.label}
                  </span>
                  <span className="text-muted-foreground block truncate text-xs">
                    {item.detail}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Academy + Four Things Signature Blueprint ───────────────── */}
      <section className="border-border border-b" aria-labelledby="academy-intro">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 md:py-20">
          <div>
            <Eyebrow>The Academy</Eyebrow>
            <h2
              id="academy-intro"
              className="font-display mt-5 max-w-2xl text-3xl leading-[1.06] font-semibold tracking-[-0.035em] text-balance sm:text-5xl"
            >
              A real classroom for a{" "}
              <span className="font-serif text-primary font-normal italic">digital world.</span>
            </h2>
            <p className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed text-pretty sm:text-lg">
              Cyber Elias Academy is a neighbourhood training centre where beginners and working
              adults build useful skills through supervised practice — starting from naming the four
              parts of a computer on day one. We also build practical websites and digital systems
              for local organisations.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
              <Link
                to="/about"
                className="group text-primary inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
              >
                Get to know CEA
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/services"
                className="group text-primary inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
              >
                Explore IT services
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
          <FourThingsDiagram />
        </div>
      </section>

      <CourseFinder id="home-course-finder" />

      {/* ── Courses preview + Sample Printed Fee Receipt ────────────────── */}
      <section className="container-page py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>Courses &amp; fees</Eyebrow>
            <h2 className="font-display mt-4 text-3xl leading-[1.06] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
              Find the skill you want to build.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
              Every course prints a transparent receipt before you pay: fee, duration, what you
              bring, and the finished work you leave with.
            </p>
          </div>
          <Link
            to="/classes"
            className="group border-border bg-card hover:border-primary/40 hover:text-primary inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors"
          >
            View all courses
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const family = courseFamilyTheme(course.category, course.slug);
            return (
              <li key={course.slug}>
                <Link
                  to="/classes/$courseSlug"
                  params={{ courseSlug: course.slug }}
                  className={cn(
                    "border-border bg-card hover:border-primary/40 group flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
                    family.accentBar,
                  )}
                >
                  <div className="bg-muted relative aspect-[16/10] overflow-hidden">
                    <div className="size-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
                      <CourseCover slug={course.slug} />
                    </div>
                    <span
                      className={cn(
                        "absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm",
                        family.pill,
                      )}
                    >
                      <span
                        className={cn("size-1.5 rounded-full", family.dot)}
                        aria-hidden="true"
                      />
                      {course.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display group-hover:text-primary text-lg leading-snug font-semibold tracking-tight transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                      {course.deliverable.title}
                    </p>
                    <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
                      {course.requirements.join(" · ")}
                    </p>
                    <div className="border-border mt-4 flex items-baseline justify-between gap-3 border-t pt-4">
                      <p className="text-foreground font-mono text-base font-semibold tracking-tight tabular-nums">
                        {formatFee(course.fee)}
                      </p>
                      <p className="text-muted-foreground text-xs whitespace-nowrap tabular-nums">
                        {course.weeks} weeks · {course.level}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Signature Fee Receipt Showcase */}
        {courses[0] && (
          <div className="border-border bg-muted/25 mt-12 grid items-center gap-8 rounded-3xl border p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-primary font-mono text-xs font-semibold tracking-wider uppercase">
                Transparent pricing promise
              </p>
              <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Every course carries one honest fee receipt.
              </h3>
              <p className="text-muted-foreground mt-3 max-w-lg text-sm leading-relaxed sm:text-base">
                No hidden registration add-ons, no surprises mid-course. Every syllabus page lets
                you inspect the exact fee, sessions per week, required equipment, and print a 1-page
                A4 sheet to keep or share at home.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/classes/$courseSlug"
                  params={{ courseSlug: courses[0].slug }}
                  className="bg-primary text-primary-foreground inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 text-sm font-semibold transition-opacity hover:opacity-95"
                >
                  Inspect {courses[0].title}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/classes"
                  className="border-border bg-background hover:border-primary/40 inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors"
                >
                  Compare all {flyerCourses.length} fees
                </Link>
              </div>
            </div>
            <FeeReceipt
              title={courses[0].title}
              slug={courses[0].slug}
              category={courses[0].category}
              fee={courses[0].fee}
              weeks={courses[0].weeks}
              sessionsCount={courses[0].sessions.length}
              sessionsPerWeek={courses[0].sessionsPerWeek}
              level={courses[0].level}
              requirements={courses[0].requirements}
              deliverable={courses[0].deliverable.title}
              availability="Mon–Sat · Small cohorts"
              showPrintButton={false}
            />
          </div>
        )}
      </section>

      {/* ── Learning in action (navy ink contrast band) ─────────────────── */}
      <section className="border-y border-white/10 bg-[#0b172a] text-[#f6f7fb]">
        <div className="container-page grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20">
          <figure className="overflow-hidden rounded-2xl border border-white/15 bg-[#0f203a]">
            <CampusImg id="lab-3" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="border-t border-white/10 px-4 py-3 text-xs font-medium text-[#b8cbe6]">
              A class in session at 24 Ebony Road, Port Harcourt
            </figcaption>
          </figure>
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-[#93c0ff] uppercase">
              How classes work
            </p>
            <h2 className="font-display mt-3 text-3xl leading-[1.06] font-semibold tracking-[-0.035em] text-balance text-white sm:text-5xl">
              Learning happens{" "}
              <span className="font-serif font-normal text-[#93c0ff] italic">by doing.</span>
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-[#cddcf2]">
              Guided practice, individual work, and a finished project turn theory into a skill you
              can demonstrate at an interview or for a client.
            </p>
            <ol className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {teachingLoop.map((step, i) => (
                <li key={step} className="rounded-xl border border-white/15 bg-white/[0.05] p-4">
                  <span className="font-mono text-xs font-semibold text-[#93c0ff] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1.5 text-sm leading-snug font-medium text-white">{step}</p>
                </li>
              ))}
            </ol>
            <Link
              to="/visit"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline"
            >
              See the training centre
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Beyond the classroom ────────────────────────────────────────── */}
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div>
            <Eyebrow>Beyond the classroom</Eyebrow>
          </div>
          <div>
            <h2 className="font-display max-w-2xl text-3xl leading-[1.06] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
              Learning is only the beginning.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
              Explore our courses, visit the Port Harcourt classroom, or ask us about a website or
              software project for your organisation.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: GraduationCap,
                  title: "Academy",
                  text: "Practical courses and free learning.",
                  to: "/classes",
                },
                {
                  icon: Code2,
                  title: "IT services",
                  text: "Websites, software and digital solutions.",
                  to: "/services",
                },
                {
                  icon: MapPin,
                  title: "Visit CEA",
                  text: "See the classroom in Port Harcourt.",
                  to: "/visit",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  to={item.to}
                  className="border-border bg-card hover:border-primary/40 group flex min-h-40 flex-col justify-between rounded-2xl border p-5 transition-colors"
                >
                  <span className="flex items-start justify-between">
                    <span className="bg-primary/10 text-primary grid size-11 place-items-center rounded-xl">
                      <item.icon className="size-5" aria-hidden="true" />
                    </span>
                    <ArrowUpRight
                      className="text-muted-foreground group-hover:text-primary size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                  <span>
                    <strong className="block text-base font-semibold">{item.title}</strong>
                    <span className="text-muted-foreground mt-1.5 block text-sm leading-relaxed">
                      {item.text}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── The founder ─────────────────────────────────────────────────── */}
      <section className="border-border bg-muted/25 border-t">
        <div className="container-page flex flex-col gap-7 py-12 sm:flex-row sm:items-center md:py-16">
          <FounderPhoto className="size-28 rounded-2xl md:size-36" />
          <div className="max-w-2xl">
            <p className="text-primary text-xs font-semibold tracking-wider uppercase">
              Founder &amp; Lead Educator
            </p>
            <h2 className="font-display mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Ellis Dennis Graham
            </h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              He runs the centre at 24 Ebony Road and teaches the courses. The 210 free notes on
              this site are written in his class voice — so what you read online is how the room
              actually teaches.
            </p>
          </div>
        </div>
      </section>

      {/* ── Who it's for ────────────────────────────────────────────────── */}
      <section className="border-border container-page border-t py-14 md:py-20">
        <Eyebrow>Who it is for</Eyebrow>
        <h2 className="font-display mt-4 max-w-3xl text-3xl leading-[1.06] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
          Built for learners across{" "}
          <span className="font-serif text-primary font-normal italic">Rivers State.</span>
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              title: "School leavers and NYSC",
              body: "Office skills, typing, and a first website or design portfolio you can show employers.",
            },
            {
              icon: Briefcase,
              title: "Office, church and NGO staff",
              body: "Documents, spreadsheets, email, and the practical software your desk already requires.",
            },
            {
              icon: Store,
              title: "Small-business owners",
              body: "Invoices, flyers, a clean web presence, and basic computer care without guesswork.",
            },
          ].map((item) => (
            <li key={item.title} className="border-border bg-card rounded-2xl border p-6">
              <span className="bg-primary/10 text-primary grid size-11 place-items-center rounded-xl">
                <item.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-display mt-5 text-lg leading-snug font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Notes from the classroom ────────────────────────────────────── */}
      <section className="border-border bg-muted/20 border-t py-14 md:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>Free learning</Eyebrow>
              <h2 className="font-display mt-4 text-3xl leading-[1.06] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
                Notes: computer skills from scratch.
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed sm:text-base">
                Free, self-paced lessons that turn everyday computer tasks into practice: files,
                email, office documents, spreadsheets, phones, and safer browsing.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <Link to="/blog" className="text-primary hover:underline">
                Browse all {blogPosts.length} notes
              </Link>
              <Link to="/tools" className="text-primary hover:underline">
                Try the 10 browser labs
              </Link>
              <Link to="/learning-trail" className="text-primary hover:underline">
                Your learning trail
              </Link>
            </div>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...blogPosts]
              .sort((a, b) => a.order - b.order)
              .slice(0, 6)
              .map((post) => (
                <li key={post.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="border-border bg-card hover:border-primary/40 group flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="bg-muted relative aspect-[16/9] overflow-hidden">
                      <img
                        src={post.cover}
                        alt={post.coverAlt}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                      <span className="bg-background/95 text-foreground border-border absolute bottom-3 left-3 rounded-md border px-2.5 py-1 text-xs font-semibold shadow-sm">
                        Lesson {String(post.order).padStart(2, "0")} · {readingTimeLabel(post.body)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display group-hover:text-primary text-base leading-snug font-semibold tracking-tight transition-colors">
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
        </div>
      </section>

      {/* ── Visit the centre ────────────────────────────────────────────── */}
      <section className="container-page py-14 md:py-20">
        <div className="border-border bg-card grid overflow-hidden rounded-3xl border lg:grid-cols-2">
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <Eyebrow>Visit the campus</Eyebrow>
            <h2 className="font-display mt-4 text-3xl leading-[1.06] font-semibold tracking-[-0.035em] text-balance sm:text-4xl">
              24 Ebony Road, Port Harcourt.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md leading-relaxed">
              Classes run at the centre on Ebony Road, off Rumuola Road. Some courses can also be
              followed online. Call or drop in during opening hours if you want to see the classroom
              before you enrol.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="outline" size="lg" className="min-h-[44px] rounded-full">
                <Link to="/visit">Plan a visit</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="min-h-[44px] rounded-full">
                <Link to="/contact">Contact us</Link>
              </Button>
            </div>
            <dl className="text-muted-foreground mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <dt className="text-foreground text-xs font-semibold tracking-wider uppercase">
                  Address
                </dt>
                <dd className="mt-1 leading-snug">
                  24 Ebony Road, Off Rumuola Road, Port Harcourt
                </dd>
              </div>
              <div>
                <dt className="text-foreground text-xs font-semibold tracking-wider uppercase">
                  Hours
                </dt>
                <dd className="mt-1 leading-snug">Mon–Sat, 8:00–20:00 WAT</dd>
              </div>
              <div>
                <dt className="text-foreground text-xs font-semibold tracking-wider uppercase">
                  Phone
                </dt>
                <dd className="mt-1 leading-snug">+234 905 862 8386</dd>
              </div>
              <div>
                <dt className="text-foreground text-xs font-semibold tracking-wider uppercase">
                  Email
                </dt>
                <dd className="mt-1 leading-snug">help@cea.ng</dd>
              </div>
            </dl>
          </div>
          <figure className="bg-muted relative min-h-64">
            <CampusImg id="lab-2" className="absolute inset-0 size-full object-cover" />
            <figcaption className="bg-background/90 text-foreground border-border absolute bottom-4 left-4 rounded-md border px-3 py-1.5 text-xs font-medium shadow-sm">
              Practice desks at 24 Ebony Road
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Questions (SSR-rendered details) ────────────────────────────── */}
      <section className="border-border border-t py-14 md:py-20">
        <div className="container-page grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="font-display mt-4 text-3xl leading-[1.06] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
              Asked every <span className="font-serif text-primary font-normal italic">week.</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-sm leading-relaxed">
              Fees, schedules, requirements, and what happens on day one. If yours is missing, call
              the centre — a person answers.
            </p>
            <Link
              to="/faq"
              className="group text-primary mt-6 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
            >
              View all questions
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="border-border divide-border divide-y border-y">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold">
                  <span>{f.q}</span>
                  <span
                    className="text-muted-foreground text-lg font-normal transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="text-muted-foreground mt-3 pr-6 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
