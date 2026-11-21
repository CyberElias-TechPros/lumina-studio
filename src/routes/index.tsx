import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Code2,
  Database,
  GraduationCap,
  Keyboard,
  Layers,
  MapPin,
  Store,
  Table,
  Terminal,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, Eyebrow } from "@/components/marketing/shell";
import { CampusImg, CourseCover } from "@/components/marketing/photos";
import { FounderPhoto } from "@/components/marketing/founder-photo";
import { CourseFinder } from "@/components/marketing/course-finder";
import { FourThingsDiagram } from "@/components/marketing/four-things-diagram";
import { FeeReceipt } from "@/components/marketing/fee-receipt";
import { HeroSkillCore, SkillUniverseExplorer } from "@/components/marketing/skill-universe";
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
      title: "Cyber Elias Academy — A Digital Learning Universe in Port Harcourt",
      description:
        "Learn, practise and create with Cyber Elias Academy: practical short courses from ₦20,000, 10 interactive browser labs, 210 free Notes lessons, and Digital Solutions in Port Harcourt.",
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

const LAB_SHOWCASE = [
  {
    icon: Terminal,
    name: "Code Studio",
    detail: "Write live HTML, CSS and JavaScript directly in your browser.",
    to: "/tools/code-studio",
    tag: "BUILD",
  },
  {
    icon: Database,
    name: "SQL & CSV DataLab",
    detail: "Run SQL queries against Nigerian business tables with zero setup.",
    to: "/tools/sql-datalab",
    tag: "ANALYZE",
  },
  {
    icon: Table,
    name: "Spreadsheet Lab",
    detail: "Drill SUMIF, VLOOKUP, IF and everyday office formulas live.",
    to: "/tools/excel-formula-lab",
    tag: "COMPUTE",
  },
  {
    icon: Keyboard,
    name: "Typing Lab",
    detail: "Measure speed, accuracy and build calm keyboard confidence.",
    to: "/tools/typing-test",
    tag: "FOUNDATION",
  },
] as const;

const STUDIO_TERRITORIES = [
  {
    icon: Code2,
    title: "Digital Presence",
    detail: "Websites, online visibility, business profiles and digital identity.",
  },
  {
    icon: Wrench,
    title: "IT Infrastructure",
    detail: "Networks, connectivity, workstations, setup and maintenance.",
  },
  {
    icon: Layers,
    title: "Business Systems",
    detail: "Digital workflows, records, inventory, automation and operations.",
  },
  {
    icon: Terminal,
    title: "Development",
    detail: "Web applications, portals, integrations and custom digital solutions.",
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
        className="border-b border-[#242a31] bg-[#101214] text-[#f4f1e9]"
      >
        <div className="container-page flex flex-col gap-2.5 py-2.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm leading-snug text-[#d6dce4]">
            <span className="rounded-full bg-[#f17c52] px-2.5 py-0.5 font-mono text-xs font-bold tracking-wider text-[#101214] uppercase">
              Free · iDICE
            </span>
            <span>
              <strong className="font-semibold text-[#f4f1e9]">Skills-to-Jobs training</strong> for
              young people in the South-South — applications are open.
            </span>
          </p>
          <Link
            to="/opportunities/idice-skills-to-jobs"
            className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-xs font-semibold whitespace-nowrap text-[#d6fe52] hover:underline"
          >
            How to apply
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ── 01 — THE OPENING (Obsidian Digital Frontier) ────────────────── */}
      <section
        id="cea-home-hero"
        className="cea-frontier-grid relative overflow-hidden border-b border-[#2c333c] bg-[#101214] text-[#f4f1e9]"
      >
        <HeroMotion />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-[#7774ff]/15 blur-3xl"
        />
        <div className="container-page relative grid items-center gap-10 pt-10 pb-14 lg:grid-cols-[1.06fr_0.94fr] lg:gap-12 lg:pt-14 lg:pb-20">
          <div className="relative z-10">
            <div
              data-hero-copy
              className="inline-flex flex-wrap items-center gap-3 font-mono text-xs font-semibold tracking-[0.14em] uppercase"
            >
              <span className="rounded-full border border-[#2c333c] bg-[#181c20] px-3 py-1 text-[#f4f1e9]">
                Cyber Elias Academy · Port Harcourt
              </span>
              <span className="text-[#d6fe52]">Learn / Practise / Create</span>
            </div>

            <h1
              data-hero-copy
              className="font-display mt-6 max-w-2xl text-[clamp(2.65rem,5.5vw,4.75rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance text-[#f4f1e9]"
            >
              Your next skill{" "}
              <span className="font-serif font-normal text-[#d6fe52] italic">
                changes everything.
              </span>
            </h1>

            <p
              data-hero-copy
              className="mt-5 max-w-xl text-base leading-relaxed text-[#c6cdd6] sm:text-lg"
            >
              Start with what you know. Discover what you can do. Build practical digital skills
              with real projects, transparent Naira fees, and a classroom at 24 Ebony Road.
            </p>

            <div data-hero-copy className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#home-course-finder"
                className="group inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#d6fe52] px-7 text-sm font-bold text-[#101214] transition-opacity hover:opacity-90"
              >
                Explore your learning path
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link
                to="/classes"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#3a424d] bg-[#181c20] px-6 text-sm font-semibold text-[#f4f1e9] transition-colors hover:border-[#f4f1e9]/50"
              >
                Browse courses &amp; fees
              </Link>
              <Link
                to="/tools"
                className="inline-flex min-h-[44px] items-center gap-1.5 px-2 font-mono text-xs font-semibold text-[#d6fe52] hover:underline"
              >
                Try Practice Lab →
              </Link>
            </div>

            <dl
              data-hero-copy
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#242a31] pt-6 sm:grid-cols-4"
            >
              {[
                ["From ₦20,000", "Published fees"],
                ["2–4 weeks", "2 sessions / week"],
                ["210 notes", "Knowledge library"],
                ["10 labs", "Practise in browser"],
              ].map(([top, bottom]) => (
                <div key={top}>
                  <dt className="font-display text-lg font-semibold text-[#f4f1e9] tabular-nums">
                    {top}
                  </dt>
                  <dd className="mt-0.5 text-xs text-[#9ea7b4]">{bottom}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-hero-art>
            <HeroSkillCore />
          </div>
        </div>
      </section>

      {/* ── 02 — THE DISCOVERY ENGINE (Warm Paper) ──────────────────────── */}
      <section className="border-border border-b">
        <div className="container-page pt-12 pb-4">
          <Eyebrow>Discovery Engine</Eyebrow>
          <h2 className="font-display mt-4 max-w-3xl text-3xl leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
            You don&rsquo;t need to know where to start.
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-base leading-relaxed">
            Pick what you want to be able to do and we will match you to the right starting point —
            courses, free notes, or browser practice.
          </p>
        </div>
        <CourseFinder id="home-course-finder" />
      </section>

      {/* ── 03 — THE SKILL UNIVERSE (Obsidian Interactive Explorer) ─────── */}
      <section className="border-b border-[#2c333c] bg-[#101214] py-14 text-[#f4f1e9] md:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold tracking-[0.16em] text-[#7774ff] uppercase">
              The Skill Universe
            </p>
            <h2 className="font-display mt-3 text-3xl leading-[1.04] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
              There is more than one way into{" "}
              <span className="font-serif font-normal text-[#d6fe52] italic">technology.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#c6cdd6]">
              Explore all seven CEA skill territories. Each opens straight into real tools, finished
              projects, beginner courses, free lessons, and interactive browser labs.
            </p>
          </div>

          <div className="mt-10">
            <SkillUniverseExplorer />
          </div>
        </div>
      </section>

      {/* ── 04 — THE COURSE COLLECTION (Warm Paper + Printed Fee Receipt) ─ */}
      <section className="container-page py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>The Course Collection</Eyebrow>
            <h2 className="font-display mt-4 text-3xl leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
              Learn skills that do something.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
              Every course lists its fee, duration, requirements, and the real finished piece you
              leave with before you apply.
            </p>
          </div>
          <Link
            to="/classes"
            className="group border-border bg-card hover:border-foreground inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors"
          >
            Discover &amp; compare all courses
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
                    "border-border bg-card hover:border-foreground/45 group flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
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
                      {family.label}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg leading-snug font-semibold tracking-tight">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                      {course.deliverable.title}
                    </p>
                    <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
                      {course.requirements.join(" · ")}
                    </p>
                    <div className="border-border mt-4 flex items-baseline justify-between gap-3 border-t pt-4">
                      <p className="text-foreground font-mono text-base font-bold tracking-tight tabular-nums">
                        {formatFee(course.fee)}
                      </p>
                      <p className="text-muted-foreground font-mono text-xs whitespace-nowrap tabular-nums">
                        {course.weeks} weeks · {course.level}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Signature Printed Fee Receipt showcase */}
        {courses[0] && (
          <div className="border-border bg-muted/45 mt-12 grid items-center gap-8 rounded-3xl border p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="font-mono text-xs font-semibold tracking-wider uppercase">
                Transparent pricing promise
              </p>
              <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Every course carries one honest fee receipt.
              </h3>
              <p className="text-muted-foreground mt-3 max-w-lg text-sm leading-relaxed sm:text-base">
                No hidden registration add-ons, no surprises mid-course. Every syllabus page lets
                you inspect the exact Naira fee, sessions per week, required device, and print a
                1-page A4 sheet to keep or share at home.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/classes/$courseSlug"
                  params={{ courseSlug: courses[0].slug }}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#101214] px-6 text-sm font-semibold text-[#f4f1e9] transition-opacity hover:opacity-90"
                >
                  Inspect {courses[0].title}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/classes"
                  className="border-border bg-background hover:border-foreground inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors"
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

      {/* ── 05 — THE PRACTICE LAB (Graphite Workbench) ──────────────────── */}
      <section className="border-y border-[#2c333c] bg-[#242a31] py-14 text-[#f4f1e9] md:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold tracking-[0.16em] text-[#d6fe52] uppercase">
                CEA Lab · Free Browser Environments
              </p>
              <h2 className="font-display mt-3 text-3xl leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
                Don&rsquo;t just learn it.{" "}
                <span className="font-serif font-normal text-[#d6fe52] italic">Try it.</span>
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-[#d6dce4]">
                Practise coding, SQL queries, spreadsheet formulas, and keyboard typing right inside
                your browser — zero sign-up, zero ads, 100% free.
              </p>
            </div>
            <Link
              to="/tools"
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#d6fe52] px-6 text-sm font-bold text-[#101214] transition-opacity hover:opacity-90"
            >
              Open all 10 labs
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LAB_SHOWCASE.map((lab) => (
              <li key={lab.to}>
                <Link
                  to={lab.to}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-[#3a424d] bg-[#101214] p-5 transition-colors hover:border-[#d6fe52]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="grid size-10 place-items-center rounded-xl bg-[#242a31] text-[#d6fe52]">
                        <lab.icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#9ea7b4]">
                        {lab.tag}
                      </span>
                    </div>
                    <h3 className="font-display mt-4 text-lg font-semibold text-[#f4f1e9] group-hover:text-[#d6fe52]">
                      {lab.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#b4bac4]">{lab.detail}</p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#d6fe52]">
                    Launch lab <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid items-center gap-8 rounded-3xl border border-[#3a424d] bg-[#101214] p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="font-mono text-xs font-semibold tracking-wider text-[#f17c52] uppercase">
                Absolute Beginners
              </p>
              <h3 className="font-display mt-2 text-2xl font-semibold text-[#f4f1e9] sm:text-3xl">
                Never touched a computer? Start with the four parts.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#c6cdd6]">
                Inspect the interactive blueprint, then try our safe browser sandbox for pointing,
                clicking, typing, and naming files.
              </p>
              <Link
                to="/practice/computer-basics"
                className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#3a424d] bg-[#242a31] px-5 text-xs font-semibold text-[#f4f1e9] hover:border-[#f17c52]"
              >
                Open Computer Basics Lab <ArrowRight className="size-3.5 text-[#f17c52]" />
              </Link>
            </div>
            <div className="text-foreground">
              <FourThingsDiagram showPracticeLink={false} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 — THE HUMAN SIDE & METHODOLOGY (Warm Paper + Signal Orange) */}
      <section className="border-border border-b py-14 md:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <figure className="border-border overflow-hidden rounded-2xl border bg-card">
              <CampusImg id="lab-1" eager className="aspect-[4/3] w-full object-cover" />
              <figcaption className="border-border flex flex-wrap items-center justify-between gap-2 border-t px-4 py-3 text-xs text-muted-foreground">
                <span>Classroom session at 24 Ebony Road, Port Harcourt</span>
                <span className="font-mono font-semibold text-[#d4572c]">Signal · Human room</span>
              </figcaption>
            </figure>

            <div>
              <Eyebrow>The Human Side</Eyebrow>
              <h2 className="font-display mt-4 text-3xl leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
                Technology is learned{" "}
                <span className="font-serif font-normal text-[#d4572c] italic">by people.</span>
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Every session follows six deliberate steps — guided practice, real work, immediate
                correction — with a teacher in the room so you leave able to demonstrate what you
                built.
              </p>
              <ol className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {teachingLoop.map((step, i) => (
                  <li key={step} className="border-border bg-card rounded-xl border p-4">
                    <span className="font-mono text-xs font-bold text-[#d4572c] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-1.5 text-sm leading-snug font-semibold">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Founder + Who it is for */}
          <div className="border-border mt-14 grid gap-8 border-t pt-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <FounderPhoto className="size-28 shrink-0 rounded-2xl md:size-36" />
              <div>
                <p className="font-mono text-xs font-semibold tracking-wider text-[#d4572c] uppercase">
                  Founder &amp; Lead Educator
                </p>
                <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Ellis Dennis Graham
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-base">
                  Runs the centre at 24 Ebony Road and teaches the courses. The 210 free Notes on
                  this site are written in his classroom voice.
                </p>
                <Link
                  to="/about"
                  className="text-foreground mt-3 inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                >
                  Read the CEA story <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>

            <ul className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: GraduationCap,
                  title: "School leavers & NYSC",
                  body: "Office fluency, typing, and your first portfolio project.",
                },
                {
                  icon: Briefcase,
                  title: "Office & NGO staff",
                  body: "Documents, spreadsheets, and everyday workplace tools.",
                },
                {
                  icon: Store,
                  title: "Business owners",
                  body: "Invoices, flyers, clean web presence, and PC care.",
                },
              ].map((item) => (
                <li key={item.title} className="border-border bg-card rounded-2xl border p-4">
                  <item.icon className="size-5 text-[#d4572c]" aria-hidden="true" />
                  <h4 className="font-display mt-3 text-sm font-semibold">{item.title}</h4>
                  <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 07 — THE FREE LEARNING LIBRARY (Warm Paper) ─────────────────── */}
      <section className="container-page py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>CEA Knowledge Library</Eyebrow>
            <h2 className="font-display mt-4 text-3xl leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
              Knowledge should not have a gate.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
              {blogPosts.length} free self-paced lessons across 21 chapters: files, email, office
              work, phones, spreadsheets, and safer browsing.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <Link to="/blog" className="hover:underline">
              Open Knowledge Library →
            </Link>
            <Link to="/learning-trail" className="text-muted-foreground hover:text-foreground">
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
                  className="border-border bg-card hover:border-foreground/45 group flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="bg-muted relative aspect-[16/9] overflow-hidden">
                    <img
                      src={post.cover}
                      alt={post.coverAlt}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    <span className="border-border bg-background/95 text-foreground absolute bottom-3 left-3 rounded-md border px-2.5 py-1 font-mono text-xs font-semibold shadow-sm">
                      Lesson {String(post.order).padStart(2, "0")} · {readingTimeLabel(post.body)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-base leading-snug font-semibold tracking-tight">
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

      {/* ── 08 — THE DIGITAL SOLUTIONS STUDIO (Obsidian) ────────────────── */}
      <section className="border-y border-[#2c333c] bg-[#101214] py-14 text-[#f4f1e9] md:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="font-mono text-xs font-semibold tracking-[0.16em] text-[#7774ff] uppercase">
                CEA Digital Solutions Studio
              </p>
              <h2 className="font-display mt-3 text-3xl leading-[1.04] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
                Bring your ideas.{" "}
                <span className="font-serif font-normal text-[#7774ff] italic">
                  We build the technology.
                </span>
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-[#c6cdd6]">
                Websites, internal tools, networks, and practical digital systems built by CEA for
                businesses, schools, and local organisations.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/services"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#7774ff] px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Explore Digital Solutions <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/request-project"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#3a424d] px-5 text-sm font-semibold text-[#f4f1e9] hover:border-[#f4f1e9]/50"
                >
                  Request a brief
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {STUDIO_TERRITORIES.map((item) => (
                <Link
                  key={item.title}
                  to="/services"
                  className="rounded-2xl border border-[#2c333c] bg-[#181c20] p-5 transition-colors hover:border-[#7774ff]"
                >
                  <item.icon className="size-5 text-[#7774ff]" aria-hidden="true" />
                  <h3 className="font-display mt-4 text-lg font-semibold text-[#f4f1e9]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#b4bac4]">{item.detail}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Visit the campus + SSR Questions ────────────────────────────── */}
      <section className="container-page py-14 md:py-20">
        <div className="border-border bg-card grid overflow-hidden rounded-3xl border lg:grid-cols-2">
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <Eyebrow>Visit the centre</Eyebrow>
            <h2 className="font-display mt-4 text-3xl leading-[1.06] font-semibold tracking-[-0.035em] text-balance sm:text-4xl">
              24 Ebony Road, Port Harcourt.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md leading-relaxed">
              Off Rumuola Road, Port Harcourt. Drop in during opening hours to see the classroom,
              ask about upcoming dates, or get help choosing a course.
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
            <figcaption className="border-border bg-background/95 text-foreground absolute bottom-4 left-4 rounded-md border px-3 py-1.5 text-xs font-medium shadow-sm">
              Practice desks at 24 Ebony Road
            </figcaption>
          </figure>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="font-display mt-4 text-3xl leading-[1.06] font-semibold tracking-[-0.035em] text-balance sm:text-4xl">
              Asked every week.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-sm leading-relaxed">
              Fees, schedules, requirements, and what happens on day one.
            </p>
            <Link
              to="/faq"
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
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

      {/* ── 09 — THE FINAL CONVERSION (Graphite Trio) ───────────────────── */}
      <section className="border-t border-[#2c333c] bg-[#242a31] py-14 text-[#f4f1e9] md:py-16">
        <div className="container-page">
          <p className="font-mono text-xs font-semibold tracking-[0.16em] text-[#d6fe52] uppercase">
            Begin Today
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Your journey can begin today.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "Learn",
                body: "Find a course, inspect its fee receipt, and begin your training.",
                cta: "Explore courses",
                to: "/classes",
                accent: "border-[#d6fe52]/40 hover:border-[#d6fe52]",
                tagColor: "text-[#d6fe52]",
              },
              {
                icon: BookOpen,
                title: "Explore",
                body: "Start with 210 free Notes lessons and 10 browser practice labs.",
                cta: "Open Knowledge Library",
                to: "/blog",
                accent: "border-[#f17c52]/40 hover:border-[#f17c52]",
                tagColor: "text-[#f17c52]",
              },
              {
                icon: MapPin,
                title: "Build",
                body: "Tell our Digital Solutions studio about a website or system you need.",
                cta: "Start a project brief",
                to: "/request-project",
                accent: "border-[#7774ff]/40 hover:border-[#7774ff]",
                tagColor: "text-[#b7b5ff]",
              },
            ].map((opt) => (
              <Link
                key={opt.title}
                to={opt.to}
                className={cn(
                  "flex flex-col justify-between rounded-2xl border bg-[#101214] p-6 transition-colors",
                  opt.accent,
                )}
              >
                <div>
                  <opt.icon className={cn("size-6", opt.tagColor)} aria-hidden="true" />
                  <h3 className="font-display mt-4 text-2xl font-semibold text-[#f4f1e9]">
                    {opt.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#c6cdd6]">{opt.body}</p>
                </div>
                <span
                  className={cn(
                    "mt-6 inline-flex items-center gap-1.5 text-sm font-semibold",
                    opt.tagColor,
                  )}
                >
                  {opt.cta} <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
