import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  Code2,
  GraduationCap,
  MapPin,
  Sparkles,
  Store,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, Eyebrow } from "@/components/marketing/shell";
import { CampusImg, CourseCover } from "@/components/marketing/photos";
import { FounderPhoto } from "@/components/marketing/founder-photo";
import { CourseFinder } from "@/components/marketing/course-finder";
import { HeroMotion } from "@/components/marketing/hero-motion";
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

const marqueeItems = [
  "Microsoft Office",
  "Graphic Design",
  "Web Development",
  "Computer Repairs",
  "Data Entry",
  "Computer Basics",
  "Digital Marketing",
  "Cyber Safety",
];

function Home() {
  const courses = featured
    .map((slug) => flyerCourses.find((c) => c.slug === slug))
    .filter((c): c is (typeof flyerCourses)[number] => Boolean(c));

  return (
    <PageShell>
      {/* ── Announcement: iDICE ─────────────────────────────────────────── */}
      <section
        aria-label="Announcement"
        className="relative overflow-hidden border-b border-white/8 bg-[#070d1d] text-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_120%_at_0%_50%,rgb(47_107_255/0.22),transparent_60%)]"
        />
        <div className="container-page relative flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] leading-snug text-[#c9d6ee]">
            <span className="rounded-full border border-[#7fb5ff]/30 bg-[#2f6bff]/20 px-2.5 py-0.5 font-mono text-[9px] font-semibold tracking-[0.2em] text-[#8ec4ff] uppercase">
              Free · iDICE
            </span>
            <span>
              <strong className="font-semibold text-white">Skills-to-Jobs training</strong> for
              young people in the South-South — applications are open.
            </span>
          </p>
          <Link
            to="/opportunities/idice-skills-to-jobs"
            className="group inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold whitespace-nowrap text-[#8ec4ff] transition-colors hover:text-white"
          >
            How to apply
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section id="cea-home-hero" className="bg-aurora relative overflow-hidden text-white">
        <div aria-hidden="true" className="grid-fade pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-24 right-[8%] size-72 rounded-full bg-[#2f6bff]/25 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 left-[4%] size-72 rounded-full bg-[#8b5cf6]/20 blur-[120px]"
        />
        <HeroMotion />
        <div className="container-page relative grid items-center gap-12 pt-10 pb-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10 lg:pt-14 lg:pb-20">
          <div className="relative z-10">
            <div
              data-hero-copy
              className="inline-flex items-center gap-2.5 rounded-full border border-[#7fb5ff]/25 bg-[#0d1830]/70 py-2 pr-4 pl-3 backdrop-blur-md"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34d399] opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-[#34d399]" />
              </span>
              <span className="font-mono text-[9px] font-semibold tracking-[0.22em] text-[#a8c8f7] uppercase sm:text-[10px]">
                Admissions open · Port Harcourt
              </span>
            </div>
            <h1
              data-hero-copy
              className="font-display mt-6 max-w-3xl text-[clamp(3.4rem,7.1vw,6.35rem)] leading-[0.94] font-semibold tracking-[-0.055em] text-balance"
            >
              The future is built by those who{" "}
              <span className="font-serif text-gradient-cool font-normal italic tracking-[-0.03em]">
                learn to create it.
              </span>
            </h1>
            <p
              data-hero-copy
              className="mt-7 max-w-lg text-lg leading-relaxed text-[#b9c8e2] text-pretty"
            >
              Learn digital skills by doing real work. From your first computer lesson to a project
              you can show — practise with purpose, in a small group, with a teacher in the room.
            </p>
            <div data-hero-copy className="mt-9 flex flex-wrap items-center gap-3.5">
              <Link
                to="/classes"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-[#f2f6ff] pr-2 pl-7 text-[15px] font-semibold text-[#0a1120] shadow-[0_18px_50px_-12px_rgb(168_200_255/0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_26px_64px_-14px_rgb(168_200_255/0.6)]"
              >
                Explore courses
                <span className="grid size-10 place-items-center rounded-full bg-[#0a1120] text-white transition-transform duration-300 group-hover:rotate-[-35deg]">
                  <ArrowRight className="size-4.5" />
                </span>
              </Link>
              <Link
                to="/about"
                className="inline-flex h-14 items-center gap-2 rounded-full border border-white/20 px-7 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:border-white/45 hover:bg-white/5"
              >
                Discover CEA
                <ArrowUpRight className="size-4 opacity-70" />
              </Link>
            </div>
            <div
              data-hero-copy
              className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-white/10 pt-6"
            >
              {[
                ["Two sessions", "A week, on site"],
                ["Small groups", "Teacher in the room"],
                ["Real projects", "You can show"],
              ].map(([top, bottom]) => (
                <div key={top}>
                  <p className="font-mono text-[9px] tracking-[0.22em] text-[#7d94b5] uppercase">
                    {top}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#dfe7f7]">{bottom}</p>
                </div>
              ))}
            </div>
          </div>
          <figure data-hero-art className="relative mx-auto w-full max-w-[620px]">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgb(47_107_255/0.35),transparent_70%)] blur-2xl"
            />
            <div className="edge-light relative aspect-[4/4.4] overflow-hidden rounded-[1.75rem] border border-white/14 sm:aspect-[4/3.1] lg:aspect-[4/4.6]">
              <CampusImg id="lab-1" eager className="size-full object-cover" />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#050b1c]/85 via-[#050b1c]/10 to-transparent"
              />
              <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.24em] text-[#8ec4ff] uppercase">
                    The CEA classroom
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    24 Ebony Road, Port Harcourt
                  </p>
                </div>
                <span className="font-mono text-[9px] tracking-[0.24em] text-[#7d94b5] uppercase">
                  Fig. 01
                </span>
              </div>
            </div>
            {/* Floating capability chips */}
            <div className="animate-float border-white/14 bg-[#0a1326]/78 absolute top-6 -left-2 hidden items-center gap-2.5 rounded-2xl border px-4 py-3 shadow-[0_18px_50px_-20px_rgb(47_107_255/0.55)] backdrop-blur-xl sm:flex sm:-left-6">
              <span className="grid size-9 place-items-center rounded-xl bg-[#2f6bff]/25 text-[#8ec4ff]">
                <Sparkles className="size-4.5" />
              </span>
              <span>
                <span className="block text-[13px] leading-tight font-semibold text-white">
                  Project-based
                </span>
                <span className="block text-[10px] tracking-wide text-[#8ba3c7]">
                  Learn by building
                </span>
              </span>
            </div>
            <div
              className="animate-float border-white/14 bg-[#0a1326]/78 absolute -right-2 bottom-24 hidden items-center gap-2.5 rounded-2xl border px-4 py-3 shadow-[0_18px_50px_-20px_rgb(139_92_246/0.5)] backdrop-blur-xl sm:flex sm:-right-6"
              style={{ animationDelay: "-4.5s" }}
            >
              <span className="grid size-9 place-items-center rounded-xl bg-[#8b5cf6]/25 text-[#c4b0ff]">
                <CalendarDays className="size-4.5" />
              </span>
              <span>
                <span className="block text-[13px] leading-tight font-semibold text-white">
                  Mon–Sat
                </span>
                <span className="block text-[10px] tracking-wide text-[#8ba3c7]">
                  8:00 – 20:00 WAT
                </span>
              </span>
            </div>
          </figure>
        </div>
        {/* Marquee */}
        <div
          className="mask-fade-x relative overflow-hidden border-t border-white/8 py-4 whitespace-nowrap"
          aria-label="Courses taught at the academy"
        >
          <div className="animate-marquee flex w-max items-center gap-8">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={`${item}-${i}`}
                aria-hidden={i >= marqueeItems.length}
                className="flex items-center gap-8 font-mono text-[11px] font-semibold tracking-[0.28em] text-[#6d84ac] uppercase"
              >
                {item}
                <span className="text-[#2f6bff]">◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 01 The Academy ──────────────────────────────────────────────── */}
      <section className="border-border border-b" aria-labelledby="academy-intro">
        <div className="container-page grid gap-8 py-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:py-24">
          <div>
            <Eyebrow>01 — The Academy</Eyebrow>
            <p className="text-muted-foreground mt-6 hidden max-w-[16rem] font-mono text-[10px] leading-relaxed tracking-[0.18em] uppercase md:block">
              Est. Port Harcourt
              <br />
              Practical digital training
            </p>
          </div>
          <div>
            <h2
              id="academy-intro"
              className="font-display max-w-3xl text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-6xl"
            >
              A practical education for a{" "}
              <span className="font-serif text-primary font-normal italic">digital world.</span>
            </h2>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed text-pretty">
              Cyber Elias Academy is a digital-skills training centre where beginners and
              experienced learners build useful skills through practice. We also help organisations
              explore practical technology solutions.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <Link
                to="/about"
                className="group text-primary inline-flex items-center gap-1.5 text-sm font-semibold"
              >
                Get to know CEA
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/services"
                className="group text-primary inline-flex items-center gap-1.5 text-sm font-semibold"
              >
                Explore IT services
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CourseFinder id="home-course-finder" />

      {/* ── Courses preview ─────────────────────────────────────────────── */}
      <section className="container-page py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>02 — The catalogue</Eyebrow>
            <h2 className="font-display mt-4 text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
              Find the skill you want to build.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
              Start with a goal. Compare the fee, duration and the work you will practise before you
              apply.
            </p>
          </div>
          <Link
            to="/classes"
            className="group border-foreground/15 hover:border-primary/50 hover:text-primary inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all"
          >
            All courses
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <li key={course.slug}>
              <Link
                to="/classes/$courseSlug"
                params={{ courseSlug: course.slug }}
                className="card-lift border-foreground/10 bg-card group flex h-full flex-col overflow-hidden rounded-2xl border"
              >
                <div className="bg-muted relative aspect-[16/10] overflow-hidden">
                  <div className="size-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
                    <CourseCover slug={course.slug} />
                  </div>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/45 px-3 py-1 font-mono text-[8px] font-semibold tracking-[0.22em] text-white/90 uppercase backdrop-blur-md">
                    {course.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg leading-snug font-semibold tracking-tight">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                    {course.deliverable.title}
                  </p>
                  <p className="text-muted-foreground mt-3 text-[11px] leading-relaxed">
                    {course.requirements.join(" · ")}
                  </p>
                  <div className="border-foreground/10 mt-4 flex items-baseline justify-between gap-3 border-t pt-4">
                    <p className="text-base font-semibold tracking-tight">
                      {formatFee(course.fee)}
                    </p>
                    <p className="text-muted-foreground text-[11px] whitespace-nowrap">
                      {course.weeks} weeks · {course.level}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 03 Learning in action (dark band) ───────────────────────────── */}
      <section className="bg-aurora-soft relative overflow-hidden bg-[#070d1d] text-[#f6f5f0]">
        <div
          aria-hidden="true"
          className="grid-fade pointer-events-none absolute inset-0 opacity-70"
        />
        <div className="container-page relative grid gap-12 py-16 md:grid-cols-2 md:items-center md:py-24">
          <figure className="edge-light overflow-hidden rounded-2xl border border-white/12">
            <CampusImg id="lab-3" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="border-t border-white/10 bg-black/35 px-4 py-3 font-mono text-[9px] tracking-[0.22em] text-[#8ba3c7] uppercase backdrop-blur-md">
              A class in session at the centre
            </figcaption>
          </figure>
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#7fb5ff] uppercase">
              02 — Learning in action
            </p>
            <h2 className="font-display mt-4 text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
              Learning happens{" "}
              <span className="font-serif text-gradient-cool font-normal italic">by doing.</span>
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-[#b9c8e2]">
              Guided practice, individual work and a practical project turn an idea into something
              useful. Our teaching loop gives every learner a way to keep moving forward.
            </p>
            <ol className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {teachingLoop.map((step, i) => (
                <li
                  key={step}
                  className="border-white/10 bg-white/[0.04] hover:border-[#5b9dff]/40 rounded-xl border p-4 backdrop-blur-sm transition-colors"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#5b9dff] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-[13px] leading-snug font-medium text-[#e7ecf9]">{step}</p>
                </li>
              ))}
            </ol>
            <Link
              to="/visit"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white"
            >
              See the training centre
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 04 Beyond the classroom ─────────────────────────────────────── */}
      <section className="container-page py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div>
            <Eyebrow>03 — Beyond the classroom</Eyebrow>
          </div>
          <div>
            <h2 className="font-display max-w-2xl text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
              Learning is only the beginning.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
              Explore the academy, visit the training centre or tell us about a digital project your
              organisation needs.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
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
                  text: "See our learning environment in Port Harcourt.",
                  to: "/visit",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  to={item.to}
                  className="card-lift border-foreground/10 bg-card group flex min-h-44 flex-col justify-between rounded-2xl border p-5"
                >
                  <span className="flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="size-5" />
                    </span>
                    <ArrowUpRight
                      className="text-muted-foreground size-5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  <span>
                    <strong className="block text-base font-semibold">{item.title}</strong>
                    <span className="text-muted-foreground mt-1.5 block text-[13px] leading-relaxed">
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
      <section className="border-border border-t">
        <div className="container-page flex flex-col gap-8 py-14 sm:flex-row sm:items-center md:py-18">
          <FounderPhoto className="size-28 rounded-2xl md:size-36" />
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">
              The founder
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              Ellis Dennis Graham
            </h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              He runs the centre at 24 Ebony Road and teaches the courses. The notes on this site
              are his class voice, written down — so what you read is how the room actually sounds.
            </p>
          </div>
        </div>
      </section>

      {/* ── Who it's for ────────────────────────────────────────────────── */}
      <section className="container-page py-16 md:py-24">
        <Eyebrow>04 — Who it is for</Eyebrow>
        <h2 className="font-display mt-4 max-w-3xl text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
          Built for the people of{" "}
          <span className="font-serif text-primary font-normal italic">Rivers State.</span>
        </h2>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              index: "01",
              title: "School leavers and NYSC",
              body: "Office skills, typing, and a first website or design you can show.",
            },
            {
              icon: Briefcase,
              index: "02",
              title: "Office, church and NGO staff",
              body: "Documents, spreadsheets, email and the tools the job already asks for.",
            },
            {
              icon: Store,
              index: "03",
              title: "Small-business owners",
              body: "Invoices, flyers, a simple web presence, and basic computer care.",
            },
          ].map((item) => (
            <li
              key={item.title}
              className="card-lift border-foreground/10 bg-card group rounded-2xl border p-6"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="size-5" />
                </span>
                <span className="text-muted-foreground/60 font-mono text-xs tracking-[0.2em]">
                  /{item.index}
                </span>
              </div>
              <h3 className="font-display mt-5 text-lg leading-snug font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Notes from the classroom ────────────────────────────────────── */}
      <section className="border-border border-t py-16 md:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>05 — Free learning</Eyebrow>
              <h2 className="font-display mt-4 text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
                Notes: computer skills from scratch.
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed">
                Free, self-paced lessons that turn everyday computer tasks into practice: files,
                email, office documents, spreadsheets, phones and safer browsing. Explore all{" "}
                {blogPosts.length} lessons in order, or search for the task you need today.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <Link to="/blog" className="text-primary hover:underline">
                All notes
              </Link>
              <Link to="/practice/computer-basics" className="text-primary hover:underline">
                Computer Basics Lab
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
                    className="card-lift border-foreground/10 bg-card group flex h-full flex-col overflow-hidden rounded-2xl border"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={post.cover}
                        alt={post.coverAlt}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                      />
                      <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/45 px-3 py-1 font-mono text-[8px] font-semibold tracking-[0.22em] text-white/90 uppercase backdrop-blur-md">
                        Lesson {String(post.order).padStart(2, "0")}
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
        </div>
      </section>

      {/* ── Visit the centre ────────────────────────────────────────────── */}
      <section className="container-page pb-16 md:pb-24">
        <div className="border-foreground/10 bg-card grid overflow-hidden rounded-3xl border lg:grid-cols-2">
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <Eyebrow>06 — Visit</Eyebrow>
            <h2 className="font-display mt-4 text-3xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-4xl">
              24 Ebony Road, Port Harcourt.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md leading-relaxed">
              Classes run at the centre on Ebony Road, off Rumuola Road. Some courses can also be
              followed online. Call or visit during opening hours if you want to see the room before
              you enrol.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/visit">Plan a visit</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="rounded-full">
                <Link to="/contact">Contact us</Link>
              </Button>
            </div>
            <dl className="text-muted-foreground mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <dt className="font-mono text-[9px] tracking-[0.22em] uppercase">Address</dt>
                <dd className="mt-1 leading-snug">
                  24 Ebony Road, Off Rumuola Road, Port Harcourt
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] tracking-[0.22em] uppercase">Hours</dt>
                <dd className="mt-1 leading-snug">Mon–Sat, 8:00–20:00 WAT</dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] tracking-[0.22em] uppercase">Phone</dt>
                <dd className="mt-1 leading-snug">+234 905 862 8386</dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] tracking-[0.22em] uppercase">Email</dt>
                <dd className="mt-1 leading-snug">help@cea.ng</dd>
              </div>
            </dl>
          </div>
          <figure className="relative min-h-64">
            <CampusImg id="lab-2" className="absolute inset-0 size-full object-cover" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-card/70 via-transparent to-transparent"
            />
            <figcaption className="text-muted-foreground absolute bottom-4 left-5 font-mono text-[9px] tracking-[0.22em] uppercase">
              Practice desks at the centre
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Questions ───────────────────────────────────────────────────── */}
      <section className="border-border border-t py-16 md:py-24">
        <div className="container-page grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div>
            <Eyebrow>07 — Questions</Eyebrow>
            <h2 className="font-display mt-4 text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
              Asked every <span className="font-serif text-primary font-normal italic">week.</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-sm leading-relaxed">
              Fees, schedules, requirements and what happens on the first day. If yours is missing,
              call the centre — a person answers.
            </p>
            <Link
              to="/faq"
              className="group text-primary mt-6 inline-flex items-center gap-1.5 text-sm font-semibold"
            >
              All questions
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <Accordion type="single" collapsible className="border-foreground/10 border-t">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Finale ──────────────────────────────────────────────────────── */}
      <section className="cea-cta-finale">
        <span
          aria-hidden="true"
          className="cea-cta-orbit top-1/2 left-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2"
        />
        <span
          aria-hidden="true"
          className="cea-cta-orbit top-1/2 left-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 border-white/10"
        />
        <div aria-hidden="true" className="hairline-cool absolute inset-x-0 top-0 h-px" />
        <div className="container-page relative py-20 text-center md:py-28">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#7fb5ff] uppercase">
            Your next chapter
          </p>
          <h2 className="font-display mx-auto mt-6 max-w-4xl text-5xl leading-[0.95] font-semibold tracking-[-0.05em] text-balance text-white sm:text-7xl">
            The digital world is{" "}
            <span className="font-serif text-gradient-cool font-normal italic">hiring.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-[#b9c8e2]">
            Explore courses, find your starting point and apply when you are ready. One room, one
            keyboard, a new trajectory.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              to="/classes"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-[#f2f6ff] pr-2 pl-7 text-[15px] font-semibold text-[#0a1120] shadow-[0_18px_50px_-12px_rgb(168_200_255/0.45)] transition-all hover:-translate-y-0.5"
            >
              Explore courses
              <span className="grid size-10 place-items-center rounded-full bg-[#0a1120] text-white transition-transform duration-300 group-hover:rotate-[-35deg]">
                <ArrowRight className="size-4.5" />
              </span>
            </Link>
            <Link
              to="/admissions"
              className="inline-flex h-14 items-center rounded-full border border-white/25 px-8 text-[15px] font-semibold text-white transition-all hover:border-white/50 hover:bg-white/5"
            >
              How to enrol
            </Link>
          </div>
          <p className="mt-10 flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.3em] text-[#61759a] uppercase">
            <Users className="size-3.5" /> Small groups · Two sessions a week · Port Harcourt
          </p>
        </div>
      </section>
    </PageShell>
  );
}
