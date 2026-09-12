import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Play,
  Sparkles,
  Quote,
  Layers,
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
  CornerMarks,
  Eyebrow,
  PageShell,
} from "@/components/marketing/shell";
import {
  Arrival,
  BigMarquee,
  DragRail,
  EASE,
  LightField,
  LineMaskReveal,
  LiveClock,
  Magnetic,
  Reveal,
  Scramble,
  ScrollCue,
  TiltCard,
  type ShowcaseStep,
  StickyShowcase,
} from "@/components/motion";
import { faqs, formatNaira, partnersList, programs } from "@/data/site";
import { achievementLevels, flyerCourses, formatFee, teachingLoop } from "@/data/academy";
import { ProgramArt } from "@/components/art/program-art";
import { SceneArt, type ArtVariant } from "@/components/art/scene-art";
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

/* Cinematic Hero — layered, depth, interactive light, kinetic type */
function HeroCinematic({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const orbX = useTransform(sx, [0, 1], [-40, 40]);
  const orbY = useTransform(sy, [0, 1], [-30, 30]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <LightField density={7} opacity={0.85} />
        <div className="absolute inset-0 bg-[radial-gradient(90%_80%_at_50%_0%,color-mix(in_oklab,var(--primary-glow)_18%,transparent),transparent_70%)]" />
        <div className="rule-grid absolute inset-0 opacity-[0.45] [mask-image:radial-gradient(85%_70%_at_50%_20%,black,transparent)]" />
        <div className="vignette absolute inset-0 opacity-80" />
        {!reduce && (
          <>
            <motion.div style={{ x: orbX, y: orbY, scale }} className="absolute left-[18%] top-[18%] size-[42rem] rounded-full bg-gradient-brand opacity-[0.22] blur-[120px]" />
            <motion.div style={{ x: useTransform(sx, [0, 1], [30, -30]), y: useTransform(sy, [0, 1], [20, -20]) }} className="absolute right-[10%] top-[28%] size-[36rem] rounded-full bg-gradient-learning opacity-[0.18] blur-[130px]" />
            <motion.div style={{ x: useTransform(sx, [0, 1], [-20, 20]), y: orbY }} className="absolute left-1/2 bottom-[-10%] size-[50rem] -translate-x-1/2 rounded-full bg-gradient-ink opacity-[0.35] blur-[110px]" />
          </>
        )}
        <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay" style={{ backgroundImage: "var(--grain-image)", backgroundSize: "180px 180px" }} />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-foreground/10 xl:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-foreground/10 xl:block" />
      <div aria-hidden="true" className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 xl:block">
        <span className="font-label block -rotate-90 text-[9px] tracking-[0.2em] text-foreground/55">CEA · LUMINA — EST. 2024 — PORT HARCOURT</span>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 xl:block">
        <span className="font-label block rotate-90 text-[9px] tracking-[0.2em] text-foreground/55">04°48′N 07°00′E — COHORT 01 OPEN</span>
      </div>

      <motion.div style={reduce ? undefined : { opacity }} className="container-page relative z-10 flex flex-1 flex-col pt-28 md:pt-32">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground/10 pb-5">
          <div className="flex items-center gap-4">
            <span className="font-label flex items-center gap-2.5 text-[10px] text-foreground/75">
              <span className="relative flex size-1.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60 motion-reduce:animate-none" /><span className="relative inline-flex size-1.5 rounded-full bg-success" /></span>
              Applications open · Cohort 01
            </span>
            <span className="hidden h-3 w-px bg-foreground/15 sm:block" />
            <span className="font-label hidden items-center gap-2 text-[10px] text-foreground/70 sm:flex"><LiveClock /> <span className="opacity-30">·</span> Port Harcourt, NG</span>
          </div>
          <div className="font-label flex items-center gap-6 text-[10px] text-foreground/70">
            <span className="hidden md:inline-flex items-center gap-2"><span className="size-1 rounded-full bg-primary" /> Placement promise included</span>
            <span className="hidden md:inline-flex items-center gap-2"><span className="size-1 rounded-full bg-primary" /> Portfolio-first curriculum</span>
            <span>SCROLL ↓</span>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-center py-10 md:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 select-none md:block">
            <p className="font-display text-[clamp(8rem,18vw,22rem)] leading-[0.8] tracking-[-0.06em] text-outline-subtle opacity-[0.22]">LUMINA</p>
          </div>

          <motion.div initial="hidden" animate={ready ? "show" : "hidden"} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }} className="relative">
            <motion.div variants={{ hidden: { opacity: 0, y: 20, filter: "blur(8px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } } }} className="mb-8 flex items-center gap-3">
              <span className="h-px w-12 bg-gradient-brand" />
              <span className="font-label text-[10px] tracking-[0.18em] text-primary"><Scramble text="Cyber Elias Academy — Practical Digital Skills" /></span>
            </motion.div>

            <h1 className="font-display font-semibold leading-[0.85] tracking-[-0.05em]">
              <motion.span variants={{ hidden: { opacity: 0, y: "110%" }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } } }} className="block overflow-hidden"><span className="block text-[clamp(3.2rem,1rem+9vw,9.5rem)]">Learn <span className="font-serif-accent font-normal text-gradient">tech.</span></span></motion.span>
              <motion.span variants={{ hidden: { opacity: 0, y: "110%" }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay: 0.12 } } }} className="block overflow-hidden"><span className="block text-[clamp(3.2rem,1rem+9vw,9.5rem)]">Build <span className="text-outline-strong">real work.</span></span></motion.span>
              <motion.span variants={{ hidden: { opacity: 0, y: "110%" }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay: 0.24 } } }} className="block overflow-hidden"><span className="block text-[clamp(3.2rem,1rem+9vw,9.5rem)]">Get hired.</span></motion.span>
            </h1>

            <div className="mt-12 grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
              <motion.div variants={{ hidden: { opacity: 0, y: 24, filter: "blur(8px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE, delay: 0.4 } } }}>
                <p className="max-w-[44rem] text-pretty text-[clamp(1.05rem,0.95rem+0.6vw,1.35rem)] leading-[1.6] text-foreground/80">A practical digital skills academy in Port Harcourt. Thirteen short courses — Microsoft Office, computer basics, graphic design, web design and development, digital marketing, data entry, computer repairs, cybersecurity and more — taught two sessions a week, each ending in something you can show. Longer career programmes run alongside them.</p>
                <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                  {["Two practical sessions a week", "Certificate on what you build", "Port Harcourt campus + online"].map((t) => (
                    <li key={t} className="font-label flex items-center gap-2.5 text-[10px] text-foreground/75"><Check className="size-3.5 text-primary" /> {t}</li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 24, filter: "blur(8px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE, delay: 0.52 } } }} className="flex flex-wrap items-center gap-3 md:justify-end">
                <Magnetic strength={16}>
                  <Button asChild size="lg" className="group relative h-[56px] overflow-hidden rounded-full bg-foreground px-8 text-[15px] font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground">
                    <Link to="/admissions"><span className="relative z-10 flex items-center gap-2">Start application <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></span><span className="absolute inset-0 -z-0 bg-gradient-brand opacity-0 transition-opacity duration-500 group-hover:opacity-100" /></Link>
                  </Button>
                </Magnetic>
                <Button asChild size="lg" variant="outline" className="h-[56px] rounded-full border-foreground/20 px-7 text-[15px] font-medium backdrop-blur-md transition-colors hover:border-foreground/40 hover:bg-foreground/5"><Link to="/classes">Explore classes</Link></Button>
                <div className="hidden w-full justify-end pt-2 md:flex"><span className="font-label text-[10px] text-foreground/60">Avg. response: 4h · No spam · Real humans</span></div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div style={reduce ? undefined : { y: y1 }} className="pointer-events-none absolute right-[-2%] top-[12%] hidden w-[22rem] lg:block">
            <div className="glass-strong relative overflow-hidden rounded-[12px] p-[1px]"><div className="relative rounded-[11px] bg-card/70 p-4 backdrop-blur-xl"><div className="flex items-center justify-between"><span className="font-label text-[9px] text-foreground/65">LIVE COHORT</span><span className="flex items-center gap-1.5 font-label text-[9px] text-success"><span className="size-1 animate-pulse rounded-full bg-success" /> 24 active</span></div><div className="mt-4 flex gap-3"><div className="size-10 overflow-hidden rounded-full border border-foreground/10"><SceneArt variant="code" className="size-full" /></div><div className="flex-1"><p className="font-display text-sm font-semibold leading-tight">Full-Stack · Week 14</p><p className="mt-1 text-[11px] leading-relaxed text-foreground/70">Capstone presentations today — logistics dashboards</p></div></div><div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-foreground/15 to-transparent" /><div className="mt-3 flex items-center justify-between text-[10px]"><span className="font-label text-foreground/65">Completion</span><span className="font-mono">87%</span></div></div></div>
          </motion.div>

          <motion.div style={reduce ? undefined : { y: y2 }} className="pointer-events-none absolute left-[-1%] bottom-[18%] hidden w-[20rem] lg:block">
            <div className="panel relative overflow-hidden rounded-[12px] p-4"><div className="flex items-center gap-2"><div className="grid size-7 place-items-center rounded-full bg-gradient-career text-[11px] font-bold text-white">01</div><span className="font-label text-[9px] text-foreground/65">PLACEMENT TRACK</span></div><p className="font-display mt-3 text-[15px] font-semibold leading-tight">3 offers this week — Frontend, Cloud, Security</p><div className="mt-3 flex -space-x-2">{[0, 1, 2].map((i) => (<div key={i} className="size-7 rounded-full border-2 border-background bg-foreground/10" style={{ background: `hsl(${i * 40 + 20} 70% 60%)` }} />))}<div className="grid size-7 place-items-center rounded-full border-2 border-background bg-foreground text-[10px] font-bold text-background">+12</div></div></div>
          </motion.div>
        </div>

        <div className="relative mt-auto flex flex-wrap items-end justify-between gap-6 border-t border-foreground/10 pt-6">
          <div className="flex items-center gap-8">
            <div className="hidden items-center gap-3 md:flex"><span className="font-label text-[10px] text-foreground/65">EST.</span><span className="font-display text-lg font-semibold">2024</span></div>
            <div className="h-6 w-px bg-foreground/10 hidden md:block" />
            <div className="flex items-center gap-6">{[{ k: "Practical courses", v: "13" }, { k: "Class sessions", v: "90" }, { k: "Sessions / week", v: "2" }].map((s) => (<div key={s.k} className="flex items-baseline gap-2"><span className="font-display text-xl font-semibold">{s.v}</span><span className="font-label text-[9px] text-foreground/65">{s.k}</span></div>))}</div>
          </div>
          <div className="flex items-center gap-6"><div className="hidden md:block"><ScrollCue label="Explore" /></div><div className="flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1.5 backdrop-blur-md"><Play className="size-3 fill-foreground" /><span className="font-label text-[9px]">Showreel — 00:42</span></div></div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-glow/60 to-transparent" />
    </section>
  );
}

function ManifestoStrip() {
  return (
    <section className="relative border-y border-foreground/10 bg-foreground/[0.02] py-3">
      <BigMarquee items={["Don't just complete a course", "Complete something you can show", "Learn · Practice · Create · Correct · Repeat · Demonstrate", "Know · Do · Create", "Two sessions a week", "Taught by practitioners"]} duration={60} glyph="—" itemClassName="text-outline-strong text-[clamp(1.6rem,3vw,3.2rem)] opacity-90" glyphClassName="text-primary" />
    </section>
  );
}

const COURSE_ACCENT: Record<string, string> = {
  "Office & Data": "var(--learning)",
  "Creative & Media": "var(--services)",
  "Web & Code": "var(--career)",
  "Hardware & Security": "var(--erp)",
  "Business & Teaching": "var(--community)",
};
const COURSE_ART: Record<string, ArtVariant> = {
  "Office & Data": "data",
  "Creative & Media": "design",
  "Web & Code": "code",
  "Hardware & Security": "code",
  "Business & Teaching": "market",
};

function CoursePanel({ courseSlug }: { courseSlug: string }) {
  const course = flyerCourses.find((c) => c.slug === courseSlug);
  if (!course) return null;
  const accent = COURSE_ACCENT[course.category] ?? "var(--primary)";
  return (
    <div className="relative flex h-full flex-col justify-between p-7">
      <SceneArt variant={COURSE_ART[course.category] ?? "code"} className="absolute inset-0 opacity-50" />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: `linear-gradient(180deg, color-mix(in oklab, ${accent} 26%, transparent), var(--background) 82%)` }} />
      <div className="relative flex items-center justify-between gap-3">
        <span className="font-label text-[10px]" style={{ color: accent }}>{course.category}</span>
        <span className="font-display text-sm font-semibold" style={{ color: accent }}>{formatFee(course.fee)}</span>
      </div>
      <div className="relative mt-auto">
        <p className="font-display text-3xl leading-none font-semibold">{course.title}</p>
        <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-foreground/80">{course.hook}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {[`${course.weeks} weeks`, `${course.sessions.length} sessions`, course.level].map((b) => (
            <li key={b} className="rounded-full border border-foreground/15 bg-card/85 px-3 py-1.5 text-[11px] text-foreground/85 backdrop-blur-md">{b}</li>
          ))}
        </ul>
        <p className="font-label mt-6 text-[10px] text-foreground/65">You leave with: {course.deliverable.title}</p>
      </div>
      <CornerMarks className="inset-5 opacity-60" />
    </div>
  );
}

function CurriculumCinematic() {
  const featured = ["microsoft-office", "graphic-design", "web-development", "computer-repairs", "digital-marketing"];
  const steps: ShowcaseStep[] = featured
    .map((slug) => flyerCourses.find((c) => c.slug === slug))
    .filter((c): c is (typeof flyerCourses)[number] => Boolean(c))
    .map((course, i) => ({
      index: String(i + 1).padStart(2, "0"),
      kicker: `${course.weeks} weeks · ${formatFee(course.fee)}`,
      title: course.title,
      body: course.goal[0],
      points: course.outcomes.slice(0, 3),
      accent: COURSE_ACCENT[course.category] ?? "var(--primary)",
      media: <CoursePanel courseSlug={course.slug} />,
    }));
  return (
    <section className="relative border-t border-foreground/10 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0"><div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_10%,color-mix(in_oklab,var(--learning)_10%,transparent),transparent)]" /></div>
      <div className="container-page relative">
        <StickyShowcase steps={steps} heading={<div className="max-w-3xl"><div className="flex items-center gap-4"><span className="font-display text-outline text-[2.75rem] leading-none font-light tabular-nums">01</span><Eyebrow scramble>The curriculum</Eyebrow></div><h2 className="text-h2 font-display mt-6 font-semibold leading-[0.95] tracking-tight text-balance">Thirteen practical courses.<br /><span className="font-serif-accent text-gradient font-normal">Every session published.</span></h2><p className="text-foreground/80 mt-6 max-w-xl text-body-lg text-pretty">Short, outcome-based classes taught two sessions a week. Each one ends in something you can show — a document, a design, a published website, a serviced machine. The complete class notes for every session are free to read before you enrol.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="outline" className="rounded-full border-foreground/20 px-6 backdrop-blur-md transition-colors hover:border-foreground/40 hover:bg-foreground/5"><Link to="/classes">Browse all classes <ArrowUpRight className="ml-2 size-4" /></Link></Button><span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-4 py-2 font-label text-[10px] text-foreground/70 backdrop-blur-md"><Sparkles className="size-3" /> 90 sessions · full notes online</span></div></div>} />
      </div>
    </section>
  );
}


function ProgramsCinematic() {
  return (
    <section className="relative border-y border-foreground/10 bg-foreground/[0.015] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden"><div className="absolute -right-1/3 top-0 size-[60rem] rounded-full bg-gradient-brand opacity-[0.06] blur-[120px]" /></div>
      <div className="container-page relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl"><Reveal><div className="flex items-center gap-4"><span className="font-display text-outline text-[2.75rem] leading-none font-light tabular-nums">02</span><Eyebrow scramble>Programs</Eyebrow></div></Reveal><h2 className="text-h2 font-display mt-6 font-semibold leading-[0.95] tracking-tight text-balance"><LineMaskReveal text="Pick the track that changes your next five years" /></h2><Reveal delay={0.12}><p className="text-foreground/80 mt-5 max-w-xl text-body-lg text-pretty">Cohort-based, portfolio-driven, employer-verified. Every module ends in something deployed — a real artefact a client could use.</p></Reveal></div>
          <Reveal delay={0.14} className="flex items-center gap-3"><span className="font-label hidden text-[10px] text-foreground/65 md:inline">Drag to explore — 8 tracks</span><Button asChild variant="outline" className="rounded-full border-foreground/20 px-6 backdrop-blur-md transition-colors hover:border-foreground/40 hover:bg-foreground/5"><Link to="/programs">All programs <ArrowRight className="ml-2 size-4" /></Link></Button></Reveal>
        </div>

        <DragRail className="mt-16" ariaLabel="Featured programs">
          {programs.slice(0, 8).map((p, i) => (
            <TiltCard key={p.slug} intensity={10} className="w-[86vw] shrink-0 snap-start sm:w-[44vw] lg:w-[32vw] xl:w-[26vw]">
              <Link to="/programs/$slug" params={{ slug: p.slug }} data-cursor="View" className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-foreground/15 bg-card/85 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:shadow-[0_24px_60px_-28px_color-mix(in_oklab,var(--primary-glow)_40%,transparent)]">
                <div className="relative h-52 overflow-hidden"><ProgramArt slug={p.slug} interactive /><div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" /><span className="font-display absolute left-5 top-4 text-5xl leading-none font-light tabular-nums text-white/45">{String(i + 1).padStart(2, "0")}</span><div className="absolute left-4 top-4 flex items-center gap-2"><Badge variant="outline" className="rounded-full border-white/30 bg-black/55 px-3 py-1 font-label text-[9px] font-normal text-white backdrop-blur-md">{p.category}</Badge></div><div className="absolute bottom-3 left-4 right-4 flex items-center justify-between"><span className="inline-flex items-center gap-1.5 rounded-full bg-background/85 px-2.5 py-1 font-label text-[9px] text-foreground/90 backdrop-blur-md"><span className="size-1 rounded-full bg-success" /> {p.level}</span><span className="font-label rounded-full bg-background/85 px-2.5 py-1 text-[9px] text-foreground/90 backdrop-blur-md">{p.duration}</span></div></div>
                <div className="flex flex-1 flex-col p-6"><h3 className="font-display text-[1.35rem] font-semibold leading-tight tracking-tight transition-colors group-hover:text-primary">{p.title}</h3><p className="text-foreground/75 mt-3 line-clamp-3 text-[13.5px] leading-relaxed">{p.blurb}</p><div className="mt-auto flex items-center justify-between border-t border-foreground/10 pt-5"><span className="font-display text-[17px] font-semibold">{formatNaira(p.price)}</span><span className="flex items-center gap-1.5 text-[13px] font-semibold text-primary">View<ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span></div></div>
                <span className="bg-gradient-brand pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </Link>
            </TiltCard>
          ))}
        </DragRail>
      </div>
    </section>
  );
}

function PrincipleCinematic() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-36">
      <LightField density={3} opacity={0.35} pointer={false} />
      <div className="container-page relative">
        <div className="grid gap-14 lg:grid-cols-[0.38fr_0.62fr]">
          <Reveal><div className="lg:sticky lg:top-32"><Eyebrow scramble>The principle</Eyebrow><div className="mt-10 hidden lg:block"><motion.div style={{ y, rotate }} className="relative"><div className="panel relative overflow-hidden rounded-[16px] p-8"><Quote className="size-8 text-primary/40" /><p className="font-serif-accent mt-6 text-[1.35rem] leading-[1.3] text-foreground">"The artifact is the evidence. Everything else is storytelling."</p><p className="font-label mt-4 text-[10px] text-foreground/65">— CEA Faculty</p><div className="mt-6 h-px w-full bg-gradient-to-r from-primary/40 to-transparent" /><div className="mt-4 flex items-center gap-2 font-label text-[9px] text-foreground/65"><span className="size-1.5 rounded-full bg-success" /> Live from Port Harcourt</div></div></motion.div></div></div></Reveal>
          <div><Reveal delay={0.08}><p className="font-display text-[clamp(1.9rem,1.1rem+3.2vw,3.8rem)] font-medium leading-[1.06] tracking-[-0.03em] text-balance">We don't fake outcomes. We build the machine that produces them — <span className="font-serif-accent text-gradient font-normal">then we show the receipts.</span></p></Reveal><div className="mt-16 grid gap-px border-t border-foreground/10 sm:grid-cols-3">{[{ n: "01", t: "Cohorts, not courses", d: "Small groups, fixed start dates, mentors who know your name and your blockers." }, { n: "02", t: "Shipped, not watched", d: "Every module ends in something deployed — a real artefact a client could use." }, { n: "03", t: "Hired, not hopeful", d: "Portfolio review, mock interviews and warm introductions to employers in our network." }].map((item, i) => (<Reveal key={item.n} delay={0.14 + i * 0.07} className="group border-foreground/10 pt-8 pr-6 sm:border-l sm:pl-6 sm:first:border-l-0 sm:first:pl-0"><span className="font-label text-[10px] text-primary">{item.n}</span><h3 className="font-display mt-4 text-xl font-semibold leading-tight tracking-tight">{item.t}</h3><p className="text-foreground/75 mt-3 text-sm leading-relaxed">{item.d}</p><div className="mt-6 h-px w-0 bg-gradient-brand transition-all duration-700 group-hover:w-full" /></Reveal>))}</div><Reveal delay={0.3} className="mt-20 grid grid-cols-3 gap-6 border-t border-foreground/10 pt-10">{[{ v: "87%", l: "Avg. completion" }, { v: "6", l: "Deployed projects" }, { v: "1:8", l: "Mentor ratio" }].map((m) => (<div key={m.l}><p className="font-display text-4xl font-semibold tracking-tight">{m.v}</p><p className="font-label mt-2 text-[10px] text-foreground/65">{m.l}</p></div>))}</Reveal></div>
        </div>
      </div>
    </section>
  );
}

function HowAClassRuns() {
  return (
    <section className="relative overflow-hidden border-y border-foreground/10 bg-foreground/[0.015] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0"><div className="absolute left-1/2 top-1/2 size-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-ink opacity-[0.18] blur-[120px]" /><div className="rule-grid absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(60%_50%_at_50%_50%,black,transparent)]" /></div>
      <div className="container-page relative">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <Reveal><div className="flex items-center gap-4"><span className="font-display text-outline text-[2.75rem] font-light leading-none tabular-nums">03</span><Eyebrow scramble>Inside a class</Eyebrow></div></Reveal>
            <Reveal delay={0.08}><h2 className="text-h2 font-display mt-6 font-semibold leading-[0.92] tracking-tight text-balance">Two sessions a week. <span className="font-serif-accent text-gradient font-normal">One loop.</span></h2></Reveal>
            <Reveal delay={0.12}><p className="text-foreground/80 mt-6 max-w-md text-body-lg text-pretty">Every session in every course follows the same rhythm. You are never left watching someone else work — you are at the machine from the first hour, and you leave with something you made.</p></Reveal>
            <Reveal delay={0.16}><ol className="mt-10 flex flex-wrap gap-2">{teachingLoop.map((step) => (<li key={step} className="rounded-full border border-foreground/15 bg-card/85 px-4 py-2 text-sm text-foreground/85 backdrop-blur-md">{step}</li>))}</ol></Reveal>
            <Reveal delay={0.2}><Button asChild variant="outline" className="mt-10 rounded-full border-foreground/20 px-6 backdrop-blur-md transition-colors hover:border-foreground/40 hover:bg-foreground/5"><Link to="/classes">Read a full class lecture <ArrowUpRight className="ml-2 size-4" /></Link></Button></Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {achievementLevels.map((level, i) => (
              <Reveal key={level.name} delay={i * 0.08} className={level.level === 3 ? "md:col-span-2" : undefined}>
                <div className="glass-strong relative h-full overflow-hidden rounded-[18px] p-7">
                  <div className="flex items-center justify-between"><span className="font-label text-[10px] text-foreground/65">LEVEL {level.level}</span><span className="font-display text-outline text-3xl leading-none font-light tabular-nums">{level.level}</span></div>
                  <p className="font-display mt-4 text-2xl leading-none font-semibold">{level.name}</p>
                  <p className="text-foreground/75 mt-3 text-sm leading-relaxed">{level.description}</p>
                  <CornerMarks className="inset-4 opacity-50" />
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.28} className="md:col-span-2">
              <div className="panel relative overflow-hidden rounded-[18px] p-7">
                <span className="font-label text-[10px] text-foreground/65">THE PROMISE</span>
                <p className="font-serif-accent mt-4 text-[1.3rem] leading-[1.35] text-foreground">"Don't just complete a course. Complete something you can show."</p>
                <p className="text-foreground/70 mt-4 text-sm leading-relaxed">The certificate is awarded for the deliverable — the document, the flyer, the published website, the serviced machine — not for sitting in the room.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}


const RESOURCES: { label: string; count: string; description: string; to: string; art: ArtVariant }[] = [
  { label: "Glossary", count: "62 terms", description: "Technical terms explained with Nigerian context, linked through every page.", to: "/glossary", art: "code" },
  { label: "Career Guides", count: "19 roadmaps", description: "Salary ranges, 90-day plans and the pitfalls nobody warns you about.", to: "/career-guides", art: "market" },
  { label: "Resources", count: "12 templates", description: "Ungated checklists, templates and cheat sheets. No sign-up wall.", to: "/resources", art: "design" },
  { label: "Library", count: "1,958 items", description: "Books, courses and tools curated for Nigerian learners and budgets.", to: "/library", art: "data" },
];

function ResourcesIndex() {
  const [active, setActive] = useState<number | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();
  useEffect(() => { if (reduce) return; const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY }); window.addEventListener("mousemove", onMove, { passive: true }); return () => window.removeEventListener("mousemove", onMove); }, [reduce]);
  return (
    <section className="relative border-y border-foreground/10 py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8"><div className="max-w-2xl"><Reveal><div className="flex items-center gap-4"><span className="font-display text-outline text-[2.75rem] font-light leading-none tabular-nums">04</span><Eyebrow scramble>Free resources</Eyebrow></div></Reveal><h2 className="text-h2 font-display mt-6 font-semibold tracking-tight text-balance"><LineMaskReveal text="Learn beyond the classroom" /></h2></div><Reveal delay={0.1}><p className="max-w-sm text-sm leading-relaxed text-foreground/75">Everything here is free and ungated — because the fastest way to judge an academy is to use what it makes.</p></Reveal></div>
        <ul className="relative mt-16 border-t border-foreground/10">{RESOURCES.map((item, i) => (<Reveal key={item.to} delay={i * 0.06}><li className="border-b border-foreground/10" onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}><Link to={item.to} className="group relative grid items-center gap-4 py-7 md:grid-cols-[auto_1.1fr_1.6fr_auto] md:gap-8"><span className="pointer-events-none absolute inset-0 -z-10 origin-bottom scale-y-0 bg-gradient-to-r from-primary/5 via-primary/5 to-transparent opacity-0 transition-all duration-500 group-hover:scale-y-100 group-hover:opacity-100" /><span className="font-label w-10 text-[10px] tabular-nums text-foreground/60">{String(i + 1).padStart(2, "0")}</span><span className="font-display flex items-baseline gap-4 text-3xl font-semibold leading-none tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 md:text-[2.6rem]">{item.label}<span className="font-label text-[10px] font-normal text-primary">{item.count}</span></span><span className="text-sm leading-relaxed text-foreground/75">{item.description}</span><span className="flex items-center gap-4 md:justify-end"><span className="hidden size-16 shrink-0 overflow-hidden rounded-full border border-foreground/10 lg:block"><SceneArt variant={item.art} className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" /></span><ArrowUpRight className="size-5 text-primary transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" /></span></Link></li></Reveal>))}</ul>
        <AnimatePresence>{active !== null && !reduce && (<motion.div initial={{ opacity: 0, scale: 0.92, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 10 }} transition={{ duration: 0.35, ease: EASE }} className="pointer-events-none fixed z-30 hidden h-[22rem] w-[32rem] overflow-hidden rounded-[16px] border border-foreground/20 bg-card/90 shadow-elevated backdrop-blur-xl lg:block" style={{ left: mouse.x + 24, top: mouse.y - 160 }}><SceneArt variant={RESOURCES[active].art} className="absolute inset-0" /><div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" /><div className="absolute bottom-0 left-0 right-0 p-6"><p className="font-display text-2xl font-semibold">{RESOURCES[active].label}</p><p className="mt-2 text-sm leading-relaxed text-foreground/75">{RESOURCES[active].description}</p></div><CornerMarks className="inset-4" /></motion.div>)}</AnimatePresence>
      </div>
    </section>
  );
}

function PartnersBand() {
  return (
    <section className="relative overflow-hidden border-b border-foreground/10 py-8">
      <div className="container-page"><p className="font-label mb-6 text-center text-[10px] text-foreground/65"><Scramble text="We're building relationships with" /></p></div>
      <BigMarquee items={partnersList} duration={44} glyph="·" itemClassName="text-xl md:text-2xl" glyphClassName="text-lg" />
    </section>
  );
}

function FaqCinematic() {
  return (
    <section className="border-b border-foreground/10">
      <div className="container-page grid gap-14 py-20 md:py-28 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:self-start"><Reveal><div className="flex items-center gap-4"><span className="font-display text-outline text-[2.75rem] font-light leading-none tabular-nums">05</span><Eyebrow scramble>Questions</Eyebrow></div></Reveal><h2 className="text-h2 font-display mt-6 font-semibold tracking-tight text-balance"><LineMaskReveal text="Everything you were about to ask" /></h2><Reveal delay={0.1}><p className="text-body-lg mt-6 max-w-sm text-pretty text-foreground/75">Still unsure? Our admissions team answers within one working day.</p><Button asChild variant="outline" className="mt-8 rounded-full border-foreground/20 px-6 backdrop-blur-md transition-colors hover:border-foreground/40 hover:bg-foreground/5"><Link to="/contact">Talk to admissions <ArrowRight className="ml-2 size-4" /></Link></Button></Reveal></div>
        <Reveal delay={0.1}><Accordion type="single" collapsible className="w-full">{faqs.map((f, i) => (<AccordionItem key={f.q} value={`item-${i}`} className="border-foreground/10"><AccordionTrigger className="font-display text-left text-lg font-semibold tracking-tight hover:text-primary">{f.q}</AccordionTrigger><AccordionContent className="text-body-lg leading-relaxed text-foreground/80">{f.a}</AccordionContent></AccordionItem>))}</Accordion></Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-foreground/10 py-24 md:py-32">
      <LightField density={6} opacity={0.75} />
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_0%,color-mix(in_oklab,var(--primary-glow)_14%,transparent),transparent)]" />
      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end"><div><Reveal><Eyebrow scramble>Applications open</Eyebrow></Reveal><h2 className="text-h2 font-display mt-7 max-w-[18ch] font-semibold leading-[0.92] tracking-tight text-balance">Your next chapter starts with <span className="font-serif-accent text-gradient font-normal">one application</span></h2><Reveal delay={0.1}><p className="text-body-lg mt-6 max-w-xl text-pretty text-foreground/80">Cohorts fill fast. Reserve your seat, book a campus tour, or talk to an admissions officer today. No spam, real humans, 4-hour average response.</p></Reveal></div><Reveal delay={0.16} className="flex flex-wrap gap-3 lg:justify-end"><Magnetic strength={14}><Button asChild size="lg" className="group relative h-14 overflow-hidden rounded-full bg-foreground px-8 text-base font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground"><Link to="/admissions"><span className="relative z-10 flex items-center gap-2">Apply now <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></span><span className="absolute inset-0 bg-gradient-brand opacity-0 transition-opacity duration-500 group-hover:opacity-100" /></Link></Button></Magnetic><Button asChild size="lg" variant="outline" className="h-14 rounded-full border-foreground/20 px-8 text-base font-medium backdrop-blur-md transition-colors hover:border-foreground/40 hover:bg-foreground/5"><Link to="/contact">Talk to us <ArrowUpRight className="ml-2 size-4" /></Link></Button></Reveal></div>
        <div aria-hidden="true" className="mt-20 flex h-px gap-1.5"><span className="w-full bg-gradient-learning" /><span className="w-full bg-gradient-career" /><span className="w-full bg-gradient-services" /><span className="w-full bg-gradient-erp" /><span className="w-full bg-gradient-community" /></div>
      </div>
    </section>
  );
}

function Home() {
  const [ready, setReady] = useState(false);
  return (
    <PageShell>
      <Arrival onDone={useCallback(() => setReady(true), [])} />
      <HeroCinematic ready={ready} />
      <ManifestoStrip />
      <CurriculumCinematic />
      <section className="relative border-y border-foreground/10"><div className="container-page py-10"><div className="grid grid-cols-2 gap-px bg-foreground/10 md:grid-cols-4">{[{ v: "13", k: "Practical courses", d: "Office skills to cybersecurity" }, { v: "90", k: "Class sessions", d: "Every one published in full" }, { v: "2", k: "Sessions a week", d: "1.5–2 hours of supervised practice" }, { v: "1", k: "Real deliverable", d: "What your certificate is awarded for" }].map((s, i) => (<Reveal key={s.k} delay={i * 0.06} className="group bg-background p-6 md:p-8"><span className="font-label text-[10px] text-foreground/50 tabular-nums">{String(i + 1).padStart(2, "0")}</span><p className="font-display mt-4 text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-none tracking-tight">{s.v}</p><p className="mt-3 font-display text-sm font-semibold">{s.k}</p><p className="mt-1 text-xs leading-relaxed text-foreground/70">{s.d}</p><span className="bg-gradient-brand mt-6 block h-px w-0 transition-all duration-700 group-hover:w-full" /></Reveal>))}</div></div></section>
      <ProgramsCinematic />
      <PrincipleCinematic />
      <HowAClassRuns />
      <ResourcesIndex />
      <PartnersBand />
      <FaqCinematic />
      <FinalCTA />
      <div aria-hidden="true" className="flex justify-center py-10"><div className="flex items-center gap-3 font-label text-[9px] text-foreground/50"><span className="h-px w-8 bg-foreground/20" /> CEA · LUMINA · END OF PAGE <span className="h-px w-8 bg-foreground/20" /></div></div>
    </PageShell>
  );
}
