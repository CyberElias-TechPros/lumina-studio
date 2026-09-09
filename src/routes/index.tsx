import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Building2,
  Check,
  GraduationCap,
  Play,
  Quote,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CTASection,
  Eyebrow,
  PageShell,
  SectionHeading,
  StatBand,
} from "@/components/marketing/shell";
import {
  Aurora,
  EASE,
  Marquee,
  Parallax,
  PulseDot,
  Reveal,
  Spotlight,
  StaggerGroup,
  StaggerItem,
  TiltCard,
} from "@/components/motion";
import { engines, faqs, formatNaira, partnersList, programs } from "@/data/site";
import { ProgramArt } from "@/components/art/program-art";
import { SceneArt } from "@/components/art/scene-art";
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
      title: "Cyber Elias Academy — Learn Tech. Build Work. Get Hired.",
      description:
        "Nigeria's digital skills academy: software, cloud, cybersecurity, data, AI, design and marketing programs with mentorship, portfolios and employer placement.",
      path: "/",
      structuredData: faqSchema,
    });
  },
  component: Home,
});

function Hero() {
  const reduce = useReducedMotion();
  const heroWords = ["Learn tech.", "Build real work.", "Get hired."];
  return (
    <section className="noise relative overflow-hidden">
      <Aurora />
      <Spotlight />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(75%_60%_at_50%_0%,black,transparent)]" />

      <div className="container-page relative grid items-center gap-16 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div className="relative z-[2]">
          <Reveal>
            <Eyebrow>
              <PulseDot className="mr-0.5" />
              Applications opening · Cohort 01
            </Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-hero mt-7 font-extrabold text-balance">
              {heroWords.map((line, i) => (
                <span key={line} className="mb-[-0.12em] block overflow-hidden pb-[0.12em]">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "115%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.85,
                      delay: 0.15 + i * 0.14,
                      ease: EASE,
                    }}
                  >
                    {i === 1 ? (
                      <span className="relative inline-block">
                        <span className="text-gradient">{line}</span>
                        <motion.span
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.95, duration: 0.8, ease: EASE }}
                          className="bg-gradient-brand absolute -bottom-1 left-0 h-[6px] w-full origin-left rounded-full opacity-70"
                        />
                      </span>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-muted-foreground mt-7 max-w-xl text-lg leading-relaxed text-pretty">
              From absolute scratch to advanced practitioner — software development, cloud,
              cybersecurity, data and AI, design and digital marketing. Taught by people who ship,
              backed by an employer network we're building from day one.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gradient-brand shadow-glow h-12 border-0 px-7"
              >
                <Link to="/admissions">
                  Start your application <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6">
                <Link to="/programs">
                  <Play className="mr-1.5 size-4" /> Explore programs
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
              {[
                { icon: GraduationCap, label: "Cohort 01 · Port Harcourt" },
                { icon: BriefcaseBusiness, label: "Placement promise included" },
                { icon: Star, label: "Portfolio-first learning" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="text-muted-foreground flex items-center gap-2 text-sm font-medium"
                >
                  <item.icon className="text-primary size-4" />
                  {item.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Parallax speed={0.06} className="relative">
          <div aria-hidden="true" className="pointer-events-none absolute -inset-8 sm:-inset-16">
            <SceneArt variant="code" className="rounded-[2.5rem]" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 12 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            style={{ transformPerspective: 1200 }}
            className="relative z-10"
          >
            <TiltCard intensity={6}>
              <div className="glass shadow-elevated relative rounded-3xl p-6">
                <div className="bg-gradient-brand absolute -top-px left-8 h-px w-32 opacity-80" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">
                      Student dashboard · preview
                    </p>
                    <p className="font-display mt-1 text-lg font-bold">Full-Stack · Cohort 01</p>
                  </div>
                  <Badge className="bg-success/15 text-success border-0">Product preview</Badge>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    { name: "Frontend with React", pct: 78, tone: "bg-gradient-learning" },
                    { name: "Backend & Databases", pct: 54, tone: "bg-gradient-erp" },
                    { name: "Cloud & DevOps", pct: 31, tone: "bg-gradient-services" },
                  ].map((row, i) => (
                    <div key={row.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-medium">{row.name}</span>
                        <span className="text-muted-foreground tabular-nums">{row.pct}%</span>
                      </div>
                      <div className="bg-muted h-2 overflow-hidden rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${row.pct}%` }}
                          transition={{ delay: 0.8 + i * 0.15, duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${row.tone}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { icon: Users, label: "42 peers" },
                    { icon: Award, label: "6 projects" },
                    { icon: Building2, label: "1 client" },
                  ].map((s) => (
                    <div key={s.label} className="bg-muted/60 rounded-xl p-3 text-center">
                      <s.icon className="text-primary mx-auto size-4" />
                      <p className="mt-1.5 text-xs font-semibold">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <Parallax speed={-0.05} className="absolute -right-2 -bottom-8 z-20 hidden w-56 sm:block">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
              className="animate-float glass shadow-elevated rounded-2xl p-4"
            >
              <p className="text-muted-foreground text-[11px] font-bold tracking-[0.16em] uppercase">
                Job match · preview
              </p>
              <p className="font-display mt-1.5 text-sm font-bold">Frontend Engineer</p>
              <p className="text-muted-foreground text-xs">Employer partner · Lagos</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="bg-muted h-1.5 flex-1 overflow-hidden rounded-full">
                  <div className="bg-gradient-career h-full w-[96%] rounded-full" />
                </div>
                <span className="text-career text-xs font-bold">96%</span>
              </div>
            </motion.div>
          </Parallax>
        </Parallax>
      </div>

      {!reduce && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="pointer-events-none relative z-[2] mb-6 hidden justify-center lg:flex"
        >
          <span className="text-muted-foreground/60 flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase">
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowDown className="size-3.5" />
            </motion.span>
            Scroll
          </span>
        </motion.div>
      )}

      <div className="border-y py-7">
        <p className="text-muted-foreground container-page mb-5 text-center text-[11px] font-bold tracking-[0.2em] uppercase">
          We're building relationships with
        </p>
        <Marquee items={partnersList} />
      </div>
    </section>
  );
}

function EnginesSection() {
  return (
    <section className="container-page py-20 md:py-28">
      <SectionHeading
        number="01"
        eyebrow="The operating system"
        title={
          <>
            Five engines. <span className="text-gradient">One academy.</span>
          </>
        }
        description="Everything from your first lesson to your first client invoice runs on a single connected platform — so nothing about your progress gets lost between systems."
      />

      <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {engines.map((engine) => (
          <StaggerItem key={engine.key}>
            <TiltCard intensity={5} className="h-full">
              <Link
                to="/engines"
                className="group bg-card shadow-soft hover:shadow-elevated relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition-shadow"
              >
                <div
                  className={`${engine.gradient} absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100`}
                />
                <div
                  className={`${engine.gradient} grid size-11 place-items-center rounded-xl opacity-90`}
                >
                  <span className="size-4 rounded-sm bg-white/85" />
                </div>
                <h3 className="font-display mt-5 text-xl font-bold">{engine.name}</h3>
                <p className={`${engine.text} mt-1 text-xs font-bold tracking-[0.14em] uppercase`}>
                  {engine.tagline}
                </p>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                  {engine.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {engine.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm">
                      <Check className={`${engine.text} size-4 shrink-0`} />
                      {b}
                    </li>
                  ))}
                </ul>
                <span className="text-primary mt-6 inline-flex items-center gap-1 text-sm font-semibold">
                  Explore engine
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </TiltCard>
          </StaggerItem>
        ))}

        <StaggerItem>
          <div className="bg-gradient-ink text-ink-foreground relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-7">
            <Aurora className="opacity-60" />
            <div className="relative">
              <h3 className="font-display text-xl font-bold">Built for 32 actors</h3>
              <p className="text-ink-foreground/70 mt-3 text-sm leading-relaxed">
                Students, instructors, mentors, clients, employers, finance, HR and leadership all
                work in the same system with role-aware dashboards.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground/10 relative mt-6 bg-transparent"
            >
              <Link to="/app">
                Preview the dashboards <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}

function ProgramsSection() {
  return (
    <section className="bg-muted/40 border-y py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            number="02"
            eyebrow="Programs"
            title="Pick the track that changes your next five years"
            description="Every program is cohort-based, project-heavy and ends in a capstone reviewed by a working practitioner."
          />
          <Reveal delay={0.1}>
            <Button asChild variant="outline">
              <Link to="/programs">
                All programs <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.slice(0, 6).map((p) => (
            <StaggerItem key={p.slug}>
              <Link
                to="/programs/$slug"
                params={{ slug: p.slug }}
                className="group bg-card shadow-soft hover:shadow-elevated hover:border-primary/30 flex h-full flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 motion-reduce:transition-none"
              >
                <div className="mask-fade-b relative mb-5 h-36 overflow-hidden rounded-2xl border sm:h-40">
                  <ProgramArt slug={p.slug} interactive />
                  <span className="bg-gradient-brand absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="font-semibold">
                    {p.category}
                  </Badge>
                  {p.rating > 0 && (
                    <span className="text-muted-foreground flex items-center gap-1 text-xs font-semibold">
                      <Star className="fill-career text-career size-3.5" /> {p.rating}
                    </span>
                  )}
                </div>
                <h3 className="font-display group-hover:text-primary mt-4 text-lg font-bold transition-colors">
                  {p.title}
                </h3>
                <p className="text-muted-foreground mt-2.5 line-clamp-2 text-sm leading-relaxed">
                  {p.blurb}
                </p>
                <div className="text-muted-foreground mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium">
                  <span>{p.duration}</span>
                  <span>·</span>
                  <span>{p.level}</span>
                  {p.learners > 0 && (
                    <>
                      <span>·</span>
                      <span>{p.learners.toLocaleString()} learners</span>
                    </>
                  )}
                </div>
                <div className="mt-5 flex items-center justify-between border-t pt-4">
                  <span className="font-display font-bold">{formatNaira(p.price)}</span>
                  <ArrowUpRight className="text-primary size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="container-page py-20 md:py-28">
      <SectionHeading
        align="center"
        number="04"
        eyebrow="Outcomes"
        title="Stories we're yet to earn"
        description="The first testimonials will be written by the first cohort — and we'll publish them exactly as they happened."
      />
      <Reveal delay={0.1} className="mx-auto mt-12 max-w-3xl">
        <div className="bg-card shadow-soft relative rounded-3xl border p-8 text-center md:p-10">
          <Quote className="text-primary/15 absolute -top-2 right-6 size-16" />
          <p className="relative text-lg leading-relaxed font-medium text-pretty sm:text-xl">
            “We don't fake outcomes. We build the machine that produces them — then we show the
            receipts.”
          </p>
          <p className="text-muted-foreground relative mt-6 text-sm font-semibold">
            A founding principle, from day one
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-gradient-brand shadow-glow border-0">
              <Link to="/about">
                Read our story <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/stories">
                See the stories page <ArrowUpRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="border-t">
      <div className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          number="05"
          eyebrow="Questions"
          title="Everything you were about to ask"
          description="Still unsure? Our admissions team answers within one working day."
        />
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

function ResourcesSection() {
  const items = [
    {
      label: "Glossary",
      count: "62 terms",
      description: "Technical terms explained with Nigerian context",
      to: "/glossary",
    },
    {
      label: "Career Guides",
      count: "19 roadmaps",
      description: "Salary ranges, 90-day plans and pitfalls for every role",
      to: "/career-guides",
    },
    {
      label: "Resources",
      count: "12 templates",
      description: "Ungated checklists, templates and cheat sheets",
      to: "/resources",
    },
    {
      label: "Library",
      count: "1,958 items",
      description: "Books, courses and tools curated for Nigerian learners",
      to: "/library",
    },
  ];

  return (
    <section className="bg-muted/40 border-y">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <SectionHeading
            number="03"
            eyebrow="Free resources"
            title="Learn beyond the classroom"
            description="Practical resources to support your learning — no sign-up required."
          />
        </Reveal>
        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <StaggerItem key={item.to}>
              <Link
                to={item.to}
                className="group bg-card shadow-soft hover:shadow-elevated hover:border-primary/30 block rounded-2xl border p-6 transition-all hover:-translate-y-1 motion-reduce:transition-none"
              >
                <p className="text-primary text-xs font-bold tracking-widest uppercase">
                  {item.count}
                </p>
                <h3 className="font-display group-hover:text-primary mt-2 text-lg font-bold transition-colors">
                  {item.label}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {item.description}
                </p>
                <span className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                  Explore <ArrowRight className="size-3.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function Home() {
  return (
    <PageShell>
      <Hero />
      <StatBand />
      <EnginesSection />
      <ProgramsSection />
      <ResourcesSection />
      <TestimonialSection />
      <FaqSection />
      <CTASection />
    </PageShell>
  );
}
