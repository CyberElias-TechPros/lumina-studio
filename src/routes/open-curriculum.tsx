import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  Building2,
  Github,
  Layers3,
  Library,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { PageShell, Eyebrow, PageHero, CTASection } from "@/components/marketing/shell";
import { CurriculumDirectory } from "@/components/open-curriculum/curriculum-directory";
import {
  CURRICULUM_REVIEWED,
  curriculumCourses,
  curriculumDepartments,
  curriculumLevels,
  findCurriculumCourse,
  coursesInDepartment,
  launchPlan,
} from "@/data/open-curriculum";
import { getPageHead } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";

export const Route = createFileRoute("/open-curriculum")({
  head: () =>
    getPageHead({
      title: "The CEA Open Curriculum — 57 Verified Open-Source Courses",
      description:
        "The open textbooks Cyber Elias Academy teaches from: 57 licence-verified GitHub courses across 9 departments and 3 levels, with CEA delivery plans, Nigerian projects, duration, prerequisites and honest licence guidance. MIT, CC, NC and unlicensed worked out, in the open.",
      path: "/open-curriculum",
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "CEA Open Curriculum",
          description:
            "Licence-verified open-source courses organised into nine CEA departments and three learning levels, with in-app delivery notes.",
          url: `${SITE_URL}/open-curriculum`,
        },
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "CEA launch sequence — 12 courses",
          itemListElement: launchPlan.map((item) => ({
            "@type": "ListItem",
            position: item.priority,
            name: findCurriculumCourse(item.courseSlug)?.title ?? item.courseSlug,
            url: `${SITE_URL}/open-curriculum#launch`,
          })),
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: PAGE_FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        },
      ],
    }),
  component: OpenCurriculumPage,
});

const PAGE_FAQS = [
  {
    q: "What does “open curriculum” mean at CEA?",
    a: "CEA teaches the strongest freely licensed material the open-source world has produced — Microsoft's open courses, The Algorithms, freeCodeCamp, The Odin Project and more — but never re-badges it as its own. Every entry on this page names its source, its licence and exactly how CEA may use it: hosted in-app, adapted with attribution, or linked and taught-around. CEA's value is sequencing, mentorship, Nigerian-context projects and honest assessment — not repackaged PDFs.",
  },
  {
    q: "Are CEA certificates the same as the free certificates?",
    a: "Never. CEA certificates are issued by Cyber Elias Academy and certify CEA assessment only. Where a source offers its own free certificate (freeCodeCamp, HubSpot, Google), you may earn both — we say so plainly, and neither implies the other.",
  },
  {
    q: "Can I use these open courses without joining CEA?",
    a: "Yes — every linked curriculum is free to study on its own. CEA's contribution is structure: fixed pace, mentors, lab machines, live projects, assessments and feedback. Most of the 57 entries work best with a cohort; a few (OSSU) are designed for disciplined self-study.",
  },
  {
    q: "How does CEA decide what to teach from?",
    a: "Three filters, in order: licence (permissive licences may be adapted with attribution; NC, unlicensed and proprietary material is linked, never copied), quality (stars, maintenance, provenance), and CEA fit (can our teachers deliver it, and can our students finish it?). Everything here passed all three on 2026-11-16.",
  },
  {
    q: "Will CEA re-host The Odin Project, Full Stack Open or the Zoomcamps?",
    a: "No. Those carry NonCommercial or no-licence terms, and republishing them would be both unlawful and against the spirit of their authors' generosity. CEA runs cohorts around them: you study on the source site, we supply schedule, feedback, labs and demo day. The AI Engineering from Scratch curriculum is the exception — MIT-licensed and hosted in-app with attribution.",
  },
];

const hostedTotal = curriculumCourses.filter((c) => c.canHostInApp).length;
const repoTotal = curriculumCourses.filter((c) => c.repo).length;

function OpenCurriculumPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={`Open curriculum · Licence-verified ${CURRICULUM_REVIEWED}`}
        title={
          <>
            The open textbooks{" "}
            <span className="font-serif text-primary font-normal italic">behind CEA.</span>
          </>
        }
        description="The nine departments of the expanded academy, the fifty-plus open-source courses we teach from, and the licence work we did so you can trust every link. MIT, CC-BY, NonCommercial, unlicensed — worked out in the open, with CEA delivery plans on every entry."
        meta={[
          `${curriculumCourses.length} verified courses`,
          `${curriculumDepartments.length} departments`,
          "3 learning levels",
          `${repoTotal} open repositories`,
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#directory"
            className="group bg-primary text-primary-foreground inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold shadow-[var(--shadow-halo)] transition-all hover:-translate-y-0.5"
          >
            Browse the directory
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
          <a
            href="#launch"
            className="border-foreground/15 text-foreground hover:border-primary/50 hover:text-primary inline-flex h-12 items-center gap-2 rounded-full border px-6 text-sm font-semibold transition-colors"
          >
            See the 12 launch courses
          </a>
        </div>
      </PageHero>

      {/* ── The numbers ───────────────────────────────────────────────── */}
      <section className="border-border border-b" aria-label="Open curriculum at a glance">
        <div className="container-page grid grid-cols-2 divide-x divide-foreground/8 md:grid-cols-4">
          {[
            [`${curriculumCourses.length}`, "courses, every one licence-read"],
            [`${hostedTotal}`, "hosted or adaptable in-app"],
            [`${curriculumDepartments.length}`, "departments, zero to professional"],
            ["12", "launch courses, sequenced"],
          ].map(([value, label]) => (
            <div key={label} className="px-4 py-8 text-center sm:py-10">
              <p className="font-display text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                {value}
              </p>
              <p className="text-muted-foreground mx-auto mt-2 max-w-40 text-[11px] leading-snug sm:text-xs">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Three levels ──────────────────────────────────────────────── */}
      <section className="container-page py-16 md:py-24" aria-labelledby="levels">
        <Eyebrow>
          <Layers3 className="size-3.5" aria-hidden="true" /> How the academy is arranged
        </Eyebrow>
        <h2
          id="levels"
          className="font-display mt-4 max-w-2xl text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl"
        >
          Three levels.{" "}
          <span className="font-serif text-primary font-normal italic">One direction: up.</span>
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {curriculumLevels.map((level) => (
            <div
              key={level.id}
              className="border-foreground/10 bg-card flex flex-col rounded-2xl border p-6"
            >
              <p className="font-mono text-[10px] tracking-[0.24em] text-primary uppercase">
                {level.short}
              </p>
              <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight">
                {level.name.split("— ")[1]}
              </h3>
              <p className="text-muted-foreground mt-1 text-[11px] font-mono uppercase tracking-[0.18em]">
                {level.tagline}
              </p>
              <p className="text-muted-foreground mt-4 flex-1 text-sm leading-relaxed">
                {level.body}
              </p>
              <p className="border-foreground/10 text-muted-foreground mt-5 border-t pt-4 text-[11px] italic">
                {level.tone}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Nine departments ──────────────────────────────────────────── */}
      <section className="border-border border-t py-16 md:py-24" aria-labelledby="departments">
        <div className="container-page">
          <Eyebrow>
            <Building2 className="size-3.5" aria-hidden="true" /> Nine departments
          </Eyebrow>
          <h2
            id="departments"
            className="font-display mt-4 max-w-2xl text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl"
          >
            From first keyboard to production systems.
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {curriculumDepartments.map((department) => {
              const count = coursesInDepartment(department.slug).length;
              const ceaLink = department.ceaCourseSlugs[0];
              return (
                <li
                  key={department.slug}
                  className="border-foreground/10 bg-card flex flex-col rounded-2xl border p-5"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-[10px] tracking-[0.24em] text-muted-foreground/70">
                      DEPT {department.id}
                    </span>
                    <span className="text-muted-foreground font-mono text-[9px] uppercase tracking-[0.18em]">
                      {department.levels}
                    </span>
                  </div>
                  <h3 className="font-display mt-2 text-xl font-semibold tracking-tight">
                    {department.title}
                  </h3>
                  <p className="text-primary mt-0.5 text-[11px] font-mono uppercase tracking-[0.18em]">
                    {department.tagline}
                  </p>
                  <p className="text-muted-foreground mt-3 flex-1 text-[13px] leading-relaxed">
                    {department.description}
                  </p>
                  <div className="border-foreground/10 mt-4 flex items-center justify-between gap-3 border-t pt-3 text-[11px]">
                    <span className="text-muted-foreground tabular-nums">
                      {count} open course{count === 1 ? "" : "s"}
                    </span>
                    {ceaLink ? (
                      <Link
                        to="/classes/$courseSlug"
                        params={{ courseSlug: ceaLink }}
                        className="text-primary inline-flex items-center gap-1 font-semibold hover:underline"
                      >
                        CEA course <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    ) : (
                      <a
                        href="#directory"
                        className="text-primary inline-flex items-center gap-1 font-semibold hover:underline"
                      >
                        See catalogue <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── Launch sequence ───────────────────────────────────────────── */}
      <section
        id="launch"
        className="border-border bg-aurora-soft scroll-mt-24 bg-[#070d1d] py-16 text-[#eef2fb] md:py-24"
        aria-labelledby="launch-title"
      >
        <div className="container-page relative">
          <Eyebrow className="border-white/15 bg-white/5 text-[#a8c8f7]">
            <Rocket className="size-3.5" aria-hidden="true" /> The launch sequence
          </Eyebrow>
          <h2
            id="launch-title"
            className="font-display mt-4 max-w-2xl text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl"
          >
            Twelve courses, in the order that makes sense.
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-[#a9bcd6]">
            Not all fifty-plus at once. This is the order we open them in, chosen by student demand,
            lab readiness and how fast a graduate starts earning. Each keeps the licence it was
            built under — names are sources, not CEA products.
          </p>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2">
            {launchPlan.map((item) => {
              const course = findCurriculumCourse(item.courseSlug);
              if (!course) return null;
              return (
                <li
                  key={item.courseSlug}
                  className="border-white/10 bg-white/[0.04] flex items-start gap-4 rounded-2xl border p-4 backdrop-blur-sm"
                >
                  <span className="font-display w-9 shrink-0 text-2xl font-semibold text-[#5b9dff] tabular-nums">
                    {String(item.priority).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="leading-snug font-semibold text-white">{course.title}</span>
                    </span>
                    <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.18em] text-[#7ea6d8]">
                      {item.weeks} · {course.ceaFormat}
                    </span>
                    <span className="mt-1.5 block text-[12px] leading-relaxed text-[#a9bcd6]">
                      {item.note}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── The directory ─────────────────────────────────────────────── */}
      <section
        id="directory"
        className="container-page scroll-mt-24 py-16 md:py-24"
        aria-labelledby="directory-title"
      >
        <Eyebrow>
          <Library className="size-3.5" aria-hidden="true" /> The directory
        </Eyebrow>
        <h2
          id="directory-title"
          className="font-display mt-4 max-w-2xl text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl"
        >
          Every open course, searchable.
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed">
          Filter by department, level or how we may use it. Green badges may be taught from or
          adapted in-app with attribution; amber and red badges are link-only — CEA teaches around
          them and never re-hosts them. Every badge is a decision we made, not a guess.
        </p>
        <div className="mt-8">
          <CurriculumDirectory
            courses={curriculumCourses}
            departments={curriculumDepartments.map(({ slug, id, title }) => ({
              slug,
              id,
              title,
            }))}
          />
        </div>
      </section>

      {/* ── Licence & AdSense policy ──────────────────────────────────── */}
      <section className="border-border border-t py-16 md:py-24" aria-labelledby="policy">
        <div className="container-page">
          <Eyebrow>
            <ShieldCheck className="size-3.5" aria-hidden="true" /> How we use open material
          </Eyebrow>
          <h2
            id="policy"
            className="font-display mt-4 max-w-2xl text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl"
          >
            Licence-honest, by construction.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="border-foreground/10 bg-card rounded-2xl border p-6">
              <p className="font-mono text-[10px] tracking-[0.24em] text-emerald-600 uppercase dark:text-emerald-400">
                Green — adapt in-app
              </p>
              <h3 className="font-display mt-2 font-semibold tracking-tight">
                Permissive licences
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                MIT, BSD, Apache-2.0, CC0 and CC-BY sources may be adapted into CEA delivery with
                attribution — the same treatment given to the MIT-licensed AI Engineering from
                Scratch curriculum, hosted in full at{" "}
                <Link to="/ai-engineering" className="text-primary font-semibold hover:underline">
                  /ai-engineering
                </Link>
                . Share-alike (CC-BY-SA) is treated as link-only in practice.
              </p>
            </div>
            <div className="border-foreground/10 bg-card rounded-2xl border p-6">
              <p className="font-mono text-[10px] tracking-[0.24em] text-amber-700 uppercase dark:text-amber-400">
                Amber — teach around it
              </p>
              <h3 className="font-display mt-2 font-semibold tracking-tight">
                Copyleft & NC sources
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                GPL code and NonCommercial curricula (The Odin Project, Full Stack Open, the
                Zoomcamps) are linked, never copied. CEA runs cohorts around them — schedule, labs,
                feedback, demo day — and says so plainly on every listing.
              </p>
            </div>
            <div className="border-foreground/10 bg-card rounded-2xl border p-6">
              <p className="font-mono text-[10px] tracking-[0.24em] text-rose-600 uppercase dark:text-rose-400">
                Red — hands off
              </p>
              <h3 className="font-display mt-2 font-semibold tracking-tight">
                Proprietary & unlicensed
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                No licence file means all rights reserved — we link and teach, we never republish.
                roadmap.sh, fastbook's prose and the unlicensed 30-Days repos are reference reading,
                never CEA courseware.
              </p>
            </div>
          </div>
          <div className="border-foreground/10 bg-muted/35 mt-6 rounded-2xl border p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <Github className="text-primary size-5" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold">Verified, and dated</h3>
            </div>
            <p className="text-muted-foreground mt-3 max-w-3xl text-sm leading-relaxed">
              Every repository on this page was checked against the GitHub API on{" "}
              <span className="text-foreground font-semibold">{CURRICULUM_REVIEWED}</span> — licence
              (via each repo's licence file and API metadata), default branch, archived status and
              stars. Licences change; we re-check before any adaptation ships. Two licence rules
              keep this page honest for search and ads:{" "}
              <strong>CEA adds original delivery value or the page doesn't ship</strong> (Nigerian
              projects, sequencing, assessment — never scraped prose), and{" "}
              <strong>every entry names its source and links to it</strong>. Corrections and
              attribution fixes are welcome at{" "}
              <a href="mailto:help@cea.ng" className="text-primary font-semibold hover:underline">
                help@cea.ng
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="border-border border-t py-16 md:py-24" aria-labelledby="faq">
        <div className="container-page grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div>
            <Eyebrow>
              <BookOpenCheck className="size-3.5" aria-hidden="true" /> Straight answers
            </Eyebrow>
            <h2
              id="faq"
              className="font-display mt-4 text-4xl leading-[1.0] font-semibold tracking-[-0.04em] text-balance sm:text-5xl"
            >
              Asked and answered.
            </h2>
          </div>
          <dl className="divide-y divide-foreground/10">
            {PAGE_FAQS.map((faq) => (
              <div key={faq.q} className="py-5">
                <dt className="font-display text-lg font-semibold tracking-tight">{faq.q}</dt>
                <dd className="text-muted-foreground mt-2 text-sm leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTASection
        title="Learn it here. Earn from it anywhere."
        description="Every entry on this page is free to study. CEA's job is the part that isn't free anywhere else: a lab in Port Harcourt, mentors who mark your work, and a certificate that means something locally."
        primary={{ label: "Explore CEA courses", to: "/classes" }}
        secondary={{ label: "Apply for admission", to: "/apply" }}
      />
    </PageShell>
  );
}
