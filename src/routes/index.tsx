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
  Cpu,
  BarChart3,
  Palette,
  Network,
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
import { engines, faqs, formatNaira, partnersList, programs } from "@/data/site";
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
              <span className="font-label text-[10px] tracking-[0.18em] text-primary"><Scramble text="Cyber Elias Academy — Digital Operating System" /></span>
            </motion.div>

            <h1 className="font-display font-semibold leading-[0.85] tracking-[-0.05em]">
              <motion.span variants={{ hidden: { opacity: 0, y: "110%" }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } } }} className="block overflow-hidden"><span className="block text-[clamp(3.2rem,1rem+9vw,9.5rem)]">Learn <span className="font-serif-accent font-normal text-gradient">tech.</span></span></motion.span>
              <motion.span variants={{ hidden: { opacity: 0, y: "110%" }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay: 0.12 } } }} className="block overflow-hidden"><span className="block text-[clamp(3.2rem,1rem+9vw,9.5rem)]">Build <span className="text-outline-strong">real work.</span></span></motion.span>
              <motion.span variants={{ hidden: { opacity: 0, y: "110%" }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay: 0.24 } } }} className="block overflow-hidden"><span className="block text-[clamp(3.2rem,1rem+9vw,9.5rem)]">Get hired.</span></motion.span>
            </h1>

            <div className="mt-12 grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
              <motion.div variants={{ hidden: { opacity: 0, y: 24, filter: "blur(8px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE, delay: 0.4 } } }}>
                <p className="max-w-[44rem] text-pretty text-[clamp(1.05rem,0.95rem+0.6vw,1.35rem)] leading-[1.6] text-foreground/80">From absolute scratch to advanced practitioner — software, cloud, cybersecurity, data and AI, design and growth. Taught by people who ship, backed by an employer network we're building from day one.</p>
                <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                  {["Cohort 01 · Port Harcourt", "Hybrid & online tracks", "Portfolio review included"].map((t) => (
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
                <Button asChild size="lg" variant="outline" className="h-[56px] rounded-full border-foreground/20 px-7 text-[15px] font-medium backdrop-blur-md transition-colors hover:border-foreground/40 hover:bg-foreground/5"><Link to="/programs">Explore programs</Link></Button>
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
            <div className="flex items-center gap-6">{[{ k: "Domains", v: "9" }, { k: "Engines", v: "5" }, { k: "Workspaces", v: "30+" }].map((s) => (<div key={s.k} className="flex items-baseline gap-2"><span className="font-display text-xl font-semibold">{s.v}</span><span className="font-label text-[9px] text-foreground/65">{s.k}</span></div>))}</div>
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
      <BigMarquee items={["We don't fake outcomes", "We build the machine that produces them", "Then we show the receipts", "Portfolio-first", "Cohort-driven", "Employer-verified"]} duration={60} glyph="—" itemClassName="text-outline-strong text-[clamp(1.6rem,3vw,3.2rem)] opacity-90" glyphClassName="text-primary" />
    </section>
  );
}

const ENGINE_ICON: Record<string, ReactNode> = {
  learning: <Cpu className="size-4" />,
  career: <BarChart3 className="size-4" />,
  services: <Palette className="size-4" />,
  erp: <Layers className="size-4" />,
  community: <Network className="size-4" />,
};
const ENGINE_ART: Record<string, ArtVariant> = { learning: "code", career: "market", services: "design", erp: "data", community: "community" };
const ENGINE_ACCENT: Record<string, string> = { learning: "var(--learning)", career: "var(--career)", services: "var(--services)", erp: "var(--erp)", community: "var(--community)" };

function EnginePanel({ engineKey }: { engineKey: string }) {
  const engine = engines.find((e) => e.key === engineKey);
  if (!engine) return null;
  const accent = ENGINE_ACCENT[engineKey] ?? "var(--primary)";
  return (
    <div className="relative flex h-full flex-col justify-between p-7">
      <SceneArt variant={ENGINE_ART[engineKey] ?? "code"} className="absolute inset-0 opacity-50" />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: `linear-gradient(180deg, color-mix(in oklab, ${accent} 26%, transparent), var(--background) 82%)` }} />
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_20%,color-mix(in_oklab,var(--primary-glow)_20%,transparent),transparent)]" />
      <div className="relative flex items-center gap-3"><span className="grid size-8 place-items-center rounded-full border border-foreground/10 bg-background/60 backdrop-blur-md" style={{ color: accent }}>{ENGINE_ICON[engineKey]}</span><span className="font-label text-[10px]" style={{ color: accent }}>{engine.tagline}</span></div>
      <div className="relative mt-auto"><p className="font-display text-3xl font-semibold leading-none">{engine.name}</p><p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-foreground/80">{engine.description}</p><ul className="mt-6 flex flex-wrap gap-2">{engine.bullets.map((b) => (<li key={b} className="rounded-full border border-foreground/15 bg-card/85 px-3 py-1.5 text-[11px] text-foreground/85 backdrop-blur-md">{b}</li>))}</ul></div>
      <CornerMarks className="inset-5 opacity-60" />
    </div>
  );
}

function EnginesCinematic() {
  const steps: ShowcaseStep[] = engines.map((engine, i) => ({ index: String(i + 1).padStart(2, "0"), kicker: engine.tagline, title: engine.name.replace(" Engine", ""), body: engine.description, points: engine.bullets, accent: ENGINE_ACCENT[engine.key], media: <EnginePanel engineKey={engine.key} /> }));
  return (
    <section className="relative border-t border-foreground/10 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0"><div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_10%,color-mix(in_oklab,var(--learning)_10%,transparent),transparent)]" /></div>
      <div className="container-page relative">
        <StickyShowcase steps={steps} heading={<div className="max-w-3xl"><div className="flex items-center gap-4"><span className="font-display text-outline text-[2.75rem] leading-none font-light tabular-nums">01</span><Eyebrow scramble>The operating system</Eyebrow></div><h2 className="text-h2 font-display mt-6 font-semibold leading-[0.95] tracking-tight text-balance">Five engines.<br /><span className="font-serif-accent text-gradient font-normal">One academy.</span></h2><p className="text-foreground/80 mt-6 max-w-xl text-body-lg text-pretty">Everything from your first lesson to your first client invoice runs on one connected platform — so nothing about your progress gets lost between systems.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="outline" className="rounded-full border-foreground/20 px-6 backdrop-blur-md transition-colors hover:border-foreground/40 hover:bg-foreground/5"><Link to="/engines">Explore the engines <ArrowUpRight className="ml-2 size-4" /></Link></Button><span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-4 py-2 font-label text-[10px] text-foreground/70 backdrop-blur-md"><Sparkles className="size-3" /> CEA-OS · Live in production</span></div></div>} />
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
          <div><Reveal delay={0.08}><p className="font-display text-[clamp(1.9rem,1.1rem+3.2vw,3.8rem)] font-medium leading-[1.06] tracking-[-0.03em] text-balance">We don't fake outcomes. We build the machine that produces them — <span className="font-serif-accent text-gradient font-normal">then we show the receipts.</span></p></Reveal><div className="mt-16 grid gap-px border-t border-foreground/10 sm:grid-cols-3">{[{ n: "01", t: "Cohorts, not courses", d: "Small groups, fixed start dates, mentors who know your name and your blockers." }, { n: "02", t: "Shipped, not watched", d: "Every module ends in something deployed — a real artefact a client could use." }, { n: "03", t: "Hired, not hopeful", d: "Portfolio review, mock interviews and warm introductions through the Career Engine." }].map((item, i) => (<Reveal key={item.n} delay={0.14 + i * 0.07} className="group border-foreground/10 pt-8 pr-6 sm:border-l sm:pl-6 sm:first:border-l-0 sm:first:pl-0"><span className="font-label text-[10px] text-primary">{item.n}</span><h3 className="font-display mt-4 text-xl font-semibold leading-tight tracking-tight">{item.t}</h3><p className="text-foreground/75 mt-3 text-sm leading-relaxed">{item.d}</p><div className="mt-6 h-px w-0 bg-gradient-brand transition-all duration-700 group-hover:w-full" /></Reveal>))}</div><Reveal delay={0.3} className="mt-20 grid grid-cols-3 gap-6 border-t border-foreground/10 pt-10">{[{ v: "87%", l: "Avg. completion" }, { v: "6", l: "Deployed projects" }, { v: "1:8", l: "Mentor ratio" }].map((m) => (<div key={m.l}><p className="font-display text-4xl font-semibold tracking-tight">{m.v}</p><p className="font-label mt-2 text-[10px] text-foreground/65">{m.l}</p></div>))}</Reveal></div>
        </div>
      </div>
    </section>
  );
}

function CraftSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [2, -2]);
  return (
    <section ref={ref} className="relative overflow-hidden border-y border-foreground/10 bg-foreground/[0.015] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0"><div className="absolute left-1/2 top-1/2 size-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-ink opacity-[0.18] blur-[120px]" /><div className="rule-grid absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(60%_50%_at_50%_50%,black,transparent)]" /></div>
      <div className="container-page relative">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-32"><Reveal><div className="flex items-center gap-4"><span className="font-display text-outline text-[2.75rem] font-light leading-none tabular-nums">03</span><Eyebrow scramble>Craft & system</Eyebrow></div></Reveal><Reveal delay={0.08}><h2 className="text-h2 font-display mt-6 font-semibold leading-[0.92] tracking-tight text-balance">Every pixel is a <span className="font-serif-accent text-gradient font-normal">decision</span></h2></Reveal><Reveal delay={0.12}><p className="text-foreground/80 mt-6 max-w-md text-body-lg text-pretty">Award-winning sites are not built from components. They are authored — with light, depth, and micro-interactions that reward attention.</p></Reveal><div className="mt-10 grid gap-6">{[{ icon: <Layers className="size-4" />, title: "Depth & lighting", desc: "Layered orbs, glass morphism, vignette and grain — atmosphere from light, never from shadows." }, { icon: <Sparkles className="size-4" />, title: "Fluid motion", desc: "One easing curve (expo-out), spring physics for interaction, scroll-linked parallax with lerp." }, { icon: <Layers className="size-4" />, title: "Tactile details", desc: "Magnetic buttons, tilt with glare, custom cursor states, sheen on hover — all 60fps." }].map((item, i) => (<Reveal key={item.title} delay={0.16 + i * 0.06} className="group flex gap-4"><span className="grid size-9 shrink-0 place-items-center rounded-full border border-foreground/10 bg-background/60 backdrop-blur-md transition-colors group-hover:border-primary/30">{item.icon}</span><div><p className="font-display text-[15px] font-semibold tracking-tight">{item.title}</p><p className="text-foreground/75 mt-1 text-sm leading-relaxed">{item.desc}</p></div></Reveal>))}</div></div>
          <div className="relative"><motion.div style={{ y }} className="relative"><div className="grid gap-6 md:grid-cols-2"><TiltCard intensity={12} className="md:col-span-2"><div className="glass-strong lens relative overflow-hidden rounded-[20px] p-7"><div className="flex items-center justify-between"><span className="font-label text-[10px] text-foreground/65">DESIGN TOKENS</span><span className="font-label flex items-center gap-1.5 text-[9px] text-primary"><span className="size-1 rounded-full bg-primary" /> OKLCH · Variable fonts</span></div><div className="mt-8 grid grid-cols-3 gap-4">{[{ name: "Bricolage", role: "Display", sample: "Aa" }, { name: "Instrument", role: "Serif accent", sample: "Aa" }, { name: "Geist Mono", role: "Wayfinding", sample: "Aa" }].map((f) => (<div key={f.name} className="rounded-[12px] border border-foreground/10 bg-foreground/[0.03] p-4 backdrop-blur-md"><p className="font-display text-3xl">{f.sample}</p><p className="mt-2 font-label text-[9px] text-foreground/65">{f.role}</p><p className="mt-1 text-xs font-medium">{f.name}</p></div>))}</div><div className="mt-6 flex h-px gap-1.5"><span className="w-full bg-gradient-brand" /><span className="w-full bg-gradient-learning" /><span className="w-full bg-gradient-career" /></div><CornerMarks className="inset-5 opacity-40" /></div></TiltCard><motion.div style={{ rotate }} className="relative"><div className="panel relative overflow-hidden rounded-[16px] p-6"><p className="font-label text-[10px] text-foreground/65">MOTION</p><p className="font-display mt-4 text-xl font-semibold leading-tight">EASE [0.22, 1, 0.36, 1]</p><div className="mt-6 space-y-3"><div className="flex items-center justify-between text-xs"><span className="text-foreground/65">Duration</span><span className="font-mono">160 / 320 / 640ms</span></div><div className="h-1 w-full overflow-hidden rounded-full bg-foreground/10"><motion.div className="h-full bg-gradient-brand" initial={{ width: "0%" }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE, delay: 0.3 }} /></div><p className="text-[11px] leading-relaxed text-foreground/70">One timing language across CSS, JS and view transitions. No linear.</p></div></div></motion.div><div className="relative"><div className="glass-strong relative overflow-hidden rounded-[16px] p-6"><p className="font-label text-[10px] text-foreground/65">INTERACTION</p><div className="mt-6 flex flex-wrap gap-2"><span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-[11px] backdrop-blur-md"><span className="size-1 rounded-full bg-success" /> Magnetic · 14px</span><span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-[11px] backdrop-blur-md">Tilt · Glare</span><span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-[11px] backdrop-blur-md">Drag rail</span><span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-[11px] backdrop-blur-md">Custom cursor</span></div><div className="mt-6 grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => (<div key={i} className="aspect-square rounded-[10px] border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent" />))}</div></div></div></div></motion.div></div>
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
      <EnginesCinematic />
      <section className="relative border-y border-foreground/10"><div className="container-page py-10"><div className="grid grid-cols-2 gap-px bg-foreground/10 md:grid-cols-4">{[{ v: "9", k: "Training domains", d: "From software to growth" }, { v: "5", k: "Ecosystem pillars", d: "One identity, one OS" }, { v: "30+", k: "CEA-OS workspaces", d: "Every role connected" }, { v: "87%", k: "Avg. completion", d: "Cohort accountability" }].map((s, i) => (<Reveal key={s.k} delay={i * 0.06} className="group bg-background p-6 md:p-8"><span className="font-label text-[10px] text-foreground/50 tabular-nums">{String(i + 1).padStart(2, "0")}</span><p className="font-display mt-4 text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-none tracking-tight">{s.v}</p><p className="mt-3 font-display text-sm font-semibold">{s.k}</p><p className="mt-1 text-xs leading-relaxed text-foreground/70">{s.d}</p><span className="bg-gradient-brand mt-6 block h-px w-0 transition-all duration-700 group-hover:w-full" /></Reveal>))}</div></div></section>
      <ProgramsCinematic />
      <PrincipleCinematic />
      <CraftSection />
      <ResourcesIndex />
      <PartnersBand />
      <FaqCinematic />
      <FinalCTA />
      <div aria-hidden="true" className="flex justify-center py-10"><div className="flex items-center gap-3 font-label text-[9px] text-foreground/50"><span className="h-px w-8 bg-foreground/20" /> CEA · LUMINA · END OF PAGE <span className="h-px w-8 bg-foreground/20" /></div></div>
    </PageShell>
  );
}
