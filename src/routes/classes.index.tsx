import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, Clock, GraduationCap, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import {
  achievementLevels,
  courseCategories,
  formatFee,
  resolvedFlyerCourses,
  resolvedRotatingCourses,
  teachingLoop,
  type ResolvedCourse,
} from "@/data/academy";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/classes/")({
  head: () => {
    const itemList = resolvedFlyerCourses.map((course, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: course.title,
      url: `https://cea.ng/classes/${course.slug}`,
    }));
    return getPageHead({
      title: "Practical Digital Skills Classes — Courses, Fees & Full Curriculum",
      description:
        "Cyber Elias Academy's practical digital skills classes: Microsoft Office, computer basics, graphic design, web design, digital marketing, data entry, computer repairs, web development, cybersecurity and more. Two sessions a week, every course published session by session.",
      path: "/classes",
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Cyber Elias Academy practical digital skills courses",
          itemListElement: itemList,
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: HUB_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    });
  },
  component: Classes,
});

const HUB_FAQS = [
  {
    q: "How are the classes delivered?",
    a: "Two practical sessions per week for every course, each running 1.5 to 2 hours depending on the timetable you join. Each session follows the same loop — Learn, Practice, Create, Correct, Repeat, Demonstrate — with instructor demonstration, guided practice, individual practice, a weekly assignment and a practical project. Nothing is delivered as a lecture you simply sit through.",
  },
  {
    q: "Are the full class notes published online?",
    a: "Yes. Every session of every course is published on this site as a complete class lecture: learning objectives, the taught theory, the instructor demonstration script, guided practice, common mistakes, expert notes, vocabulary, homework, the assessment rubric and session questions. You can read the entire curriculum before you enrol, and enrolled students use the same pages as their class notes.",
  },
  {
    q: "What do I actually leave with?",
    a: "An artefact you can show. Not a certificate on its own — a document, a spreadsheet, a presentation, a flyer, a published website, a cleaned dataset, a serviced machine, a marketing campaign, a security report, a portfolio or a delivered lesson. The promise of every course here is: don't just complete a course, complete something you can show.",
  },
  {
    q: "Do the short durations mean I become a professional in three weeks?",
    a: "No, and we will not pretend otherwise. These are introductory practical courses. Web Development in six weeks builds your first functional websites and gives you a genuine foundation for further learning — it does not make you a professional developer. What it does give you is real capability you can demonstrate immediately and a base to build on.",
  },
  {
    q: "Do I need my own computer?",
    a: "For Typing & Computer Basics, no — practice happens on academy machines. For every other course you need a laptop or reliable access to one, because the homework is where the ability is actually built. Every course page lists its specific requirements before you pay anything.",
  },
  {
    q: "Which course should I start with?",
    a: "If you have never used a computer, start with Typing & Computer Basics. If you can use a computer but need office skills, start with Microsoft Office. From there, choose by what you want to be able to do: Graphic Design or Content Creation for visual work, Web Design then Web Development for building websites, Digital Marketing or Social Media Management for growing a business, Computer Repairs or IT Support for hardware, Cybersecurity for protection, and Business & Freelancing to earn from any of them.",
  },
];

function CourseCard({ course, index }: { course: ResolvedCourse; index: number }) {
  return (
    <Reveal delay={Math.min(index, 6) * 0.05}>
      <Link
        to="/classes/$courseSlug"
        params={{ courseSlug: course.slug }}
        className="group border-foreground/12 hover:border-primary/35 bg-card/70 flex h-full flex-col rounded-[14px] border p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="font-label text-foreground/45 text-[10px] tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Badge variant="outline" className="border-foreground/15 font-normal">
              {course.level}
            </Badge>
            <span className="text-primary font-display text-sm font-semibold">
              {formatFee(course.fee)}
            </span>
          </div>
        </div>

        <h3 className="font-display mt-4 text-xl leading-tight font-semibold tracking-tight transition-colors group-hover:text-primary">
          {course.title}
        </h3>
        <p className="text-foreground/70 mt-3 text-sm leading-relaxed">{course.hook}</p>

        <div className="text-foreground/60 mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" /> {course.weeks} weeks
          </span>
          <span className="flex items-center gap-1.5">
            <GraduationCap className="size-3.5" /> {course.sessions.length} sessions
          </span>
          <span className="flex items-center gap-1.5">
            <Wallet className="size-3.5" /> {course.sessionsPerWeek}/week
          </span>
        </div>

        <div className="border-foreground/10 mt-5 flex items-center justify-between border-t pt-4">
          <span className="text-foreground/60 text-[11px]">
            {course.publishedCount > 0
              ? `${course.publishedCount} of ${course.sessions.length} class notes published`
              : `${course.sessions.length} sessions · full outline`}
          </span>
          <span className="text-primary flex items-center gap-1 text-xs font-semibold">
            View
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function CourseGroup({
  title,
  description,
  courses,
}: {
  title: string;
  description: string;
  courses: ResolvedCourse[];
}) {
  const categories = courseCategories.filter((cat) => courses.some((c) => c.category === cat));
  return (
    <section className="border-foreground/10 border-b">
      <div className="container-page py-16 md:py-20">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {title}
          </h2>
          <p className="text-foreground/75 mt-4 text-body-lg text-pretty">{description}</p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mt-12">
            <div className="border-foreground/10 flex items-center gap-4 border-b pb-3">
              <span className="font-label text-primary text-[10px] tracking-[0.16em] uppercase">
                {category}
              </span>
              <span className="bg-foreground/10 h-px flex-1" />
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter((c) => c.category === category)
                .map((course, i) => (
                  <CourseCard key={course.slug} course={course} index={i} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowWeTeach() {
  return (
    <section className="border-foreground/10 bg-foreground/[0.02] border-b">
      <div className="container-page py-20 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <span className="font-label text-primary inline-flex items-center gap-2.5 text-[10px] tracking-[0.16em]">
                <span aria-hidden="true" className="bg-gradient-brand inline-block h-px w-6" />
                How every class runs
              </span>
            </Reveal>
            <h2 className="font-display mt-6 text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl">
              Learn, practise, create, correct, repeat, demonstrate.
            </h2>
            <Reveal delay={0.1}>
              <p className="text-foreground/80 mt-6 text-body-lg text-pretty">
                Every session in every course follows the same loop. The instructor demonstrates,
                the class practises together, you then do it alone, your work is corrected, you
                repeat until it is right, and you finish by demonstrating it. That loop is why our
                students leave able to do the thing rather than describe it.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <ol className="mt-8 flex flex-wrap gap-2">
                {teachingLoop.map((step) => (
                  <li
                    key={step}
                    className="border-foreground/15 bg-card/70 rounded-full border px-4 py-2 text-sm"
                  >
                    {step}
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="text-foreground/75 mt-8 space-y-3 text-sm">
                {[
                  "Theory kept to the minimum necessary",
                  "Instructor demonstration before you touch the keyboard",
                  "Guided practice, then individual practice",
                  "A weekly assignment and a practical project",
                  "A final assessment and a certificate of completion",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="text-primary mt-0.5 size-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="space-y-4">
            {achievementLevels.map((level, i) => (
              <Reveal key={level.name} delay={i * 0.08}>
                <div className="border-foreground/12 bg-card/60 rounded-[14px] border p-6 backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-outline text-4xl leading-none font-light tabular-nums">
                      {level.level}
                    </span>
                    <div>
                      <p className="font-label text-primary text-[10px] tracking-[0.16em] uppercase">
                        Level {level.level}
                      </p>
                      <h3 className="font-display text-2xl font-semibold tracking-tight">
                        {level.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-foreground/75 mt-4 text-sm leading-relaxed">
                    {level.description}
                  </p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.28}>
              <p className="font-display border-foreground/10 border-l-2 pl-5 text-lg leading-relaxed italic">
                The third level is what separates this academy from a place where people sit through
                computer classes and collect certificates.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeliverablesTable() {
  return (
    <section className="border-foreground/10 border-b">
      <div className="container-page py-20 md:py-24">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Don't just complete a course. Complete something you can show.
          </h2>
          <p className="text-foreground/75 mt-5 text-body-lg text-pretty">
            Every course has a named deliverable, and the certificate is awarded for the deliverable
            — not for attendance. Here is what you walk out with.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-foreground/15 border-b">
                <th
                  scope="col"
                  className="font-label text-foreground/60 py-3 pr-6 text-[10px] tracking-[0.16em] uppercase"
                >
                  Course
                </th>
                <th
                  scope="col"
                  className="font-label text-foreground/60 py-3 pr-6 text-[10px] tracking-[0.16em] uppercase"
                >
                  What you leave with
                </th>
                <th
                  scope="col"
                  className="font-label text-foreground/60 py-3 text-right text-[10px] tracking-[0.16em] uppercase"
                >
                  Fee
                </th>
              </tr>
            </thead>
            <tbody>
              {resolvedFlyerCourses.map((course) => (
                <tr key={course.slug} className="border-foreground/10 border-b last:border-0">
                  <th scope="row" className="py-4 pr-6 align-top">
                    <Link
                      to="/classes/$courseSlug"
                      params={{ courseSlug: course.slug }}
                      className="font-display hover:text-primary text-base font-semibold transition-colors"
                    >
                      {course.title}
                    </Link>
                    <span className="text-foreground/55 mt-1 block text-[11px] font-normal">
                      {course.weeks} weeks · {course.sessions.length} sessions
                    </span>
                  </th>
                  <td className="text-foreground/75 py-4 pr-6 align-top">
                    <span className="text-foreground font-medium">{course.deliverable.title}</span>
                    <span className="mt-1 block text-[13px] leading-relaxed">
                      {course.deliverable.detail}
                    </span>
                  </td>
                  <td className="text-primary py-4 text-right align-top font-semibold whitespace-nowrap">
                    {formatFee(course.fee)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function HubFaqs() {
  return (
    <section className="border-foreground/10 border-b">
      <div className="container-page grid gap-14 py-20 lg:grid-cols-[0.8fr_1.2fr] md:py-24">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Before you enrol
          </h2>
          <p className="text-foreground/75 mt-5 text-body-lg text-pretty">
            Straight answers about delivery, fees, equipment and what the short durations really
            mean.
          </p>
          <Button
            asChild
            variant="outline"
            className="border-foreground/20 mt-8 rounded-full px-6 backdrop-blur-md"
          >
            <Link to="/contact">
              Ask admissions <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
        <div className="divide-foreground/10 divide-y">
          {HUB_FAQS.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="font-display flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span className="text-primary mt-1 shrink-0 transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-foreground/75 mt-4 text-[15px] leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Classes() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Practical digital skills curriculum"
        title="Thirteen courses. Every session published in full."
        description="Short, practical, outcome-based classes taught at the Port Harcourt campus and online. Two sessions a week, real deliverables, and the complete class notes for every session published here so you can read the whole curriculum before you pay a naira."
        art="code"
        artCaption="2 sessions per week · 1.5–2 hours each"
        meta={[
          `${resolvedFlyerCourses.length} core courses`,
          `${resolvedFlyerCourses.reduce((sum, c) => sum + c.sessions.length, 0)} sessions`,
          `${resolvedRotatingCourses.length} rotating short courses`,
          "Certificate on deliverable, not attendance",
        ]}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button
            asChild
            size="lg"
            className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-13 rounded-full px-7"
          >
            <Link to="/admissions">
              Enrol now <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-foreground/20 h-13 rounded-full px-7 backdrop-blur-md"
          >
            <Link to="/pricing">See fees &amp; payment plans</Link>
          </Button>
        </div>
      </PageHero>

      <CourseGroup
        title="The core courses"
        description="The thirteen practical courses on the academy flyer, each taught over two sessions a week and each ending in something you can show. Click any course to see its full week-by-week outline and read every class lecture."
        courses={resolvedFlyerCourses}
      />

      <HowWeTeach />
      <DeliverablesTable />

      <CourseGroup
        title="Rotating short courses"
        description="We do not advertise 'and more' as a mystery. These are the short courses that rotate through the timetable as demand and instructor availability allow — ask admissions which ones run next."
        courses={resolvedRotatingCourses}
      />

      <HubFaqs />
      <CTASection
        title="Pick a course and start this term"
        description="Classes run on a fixed timetable with limited seats so every learner gets supervised practice time. Reserve your place or ask us which course fits where you are starting from."
      />
    </PageShell>
  );
}
