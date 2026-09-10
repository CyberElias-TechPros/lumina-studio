import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  Clock,
  MapPin,
  MessageCircle,
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
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { SiteImage, Portrait } from "@/components/media/site-image";
import { CONTACT, mapsUrl, whatsappUrl } from "@/lib/contact";
import { blogPosts, faqs, formatNaira, programs } from "@/data/site";
import { ProgramArt } from "@/components/art/program-art";
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
      title: "Practical Tech Training in Port Harcourt — Cyber Elias Academy",
      description:
        "Learn tech by building real things: software, design, data, AI, cybersecurity and marketing. Small classes at 26 Ebony Road, Rumuigbo, Port Harcourt — or online. Chat with us on WhatsApp.",
      path: "/",
      structuredData: faqSchema,
    });
  },
  component: Home,
});

function Hero() {
  return (
    <section className="noise relative overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(75%_60%_at_50%_0%,black,transparent)]" />

      <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <Reveal>
            <Eyebrow>
              <MapPin className="size-3.5" /> Rumuigbo, Port Harcourt · In-person & online
            </Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-hero mt-6 font-extrabold text-balance">
              Learn tech by <span className="text-gradient">building real things.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed text-pretty">
              Cyber Elias Academy is a small, practical tech school in Port Harcourt. No
              hundred-student lecture halls, no tutorial hell — you sit at a computer, a teacher
              sits with you, and you build until you can do it on your own.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-gradient-brand shadow-glow h-12 border-0 px-7">
                <Link to="/programs">
                  See the programs <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="h-12 border-0 bg-[#25D366] px-6 hover:bg-[#1fb857]"
              >
                <a
                  href={whatsappUrl("Hello CEA! I want to learn tech. Where do I start?")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-1.5 size-4" /> WhatsApp us
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <MapPin className="text-primary size-4" /> {CONTACT.address.street},{" "}
                {CONTACT.address.city}
              </a>
              <span className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                <Users className="text-primary size-4" /> Small classes, every student on a machine
              </span>
              <span className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                <Clock className="text-primary size-4" /> {CONTACT.hours}
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <SiteImage
            src="/images/campus/classroom-main.jpg"
            alt="Students learning at computers in the Cyber Elias Academy classroom in Port Harcourt"
            caption="Our classroom in Rumuigbo — August 2026 holiday program"
            ratio="aspect-[4/3]"
            eager
          />
          <div className="glass shadow-elevated absolute -bottom-6 -left-3 flex items-center gap-3 rounded-2xl border p-4 sm:-left-6">
            <Portrait src="/images/team/ellis.jpg" name="Ellis Dennis Graham" className="size-12 text-sm" />
            <div>
              <p className="text-sm font-bold">Ellis Dennis Graham</p>
              <p className="text-muted-foreground text-xs">Founder — he teaches here too</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ClassroomProof() {
  return (
    <section className="container-page py-16 md:py-24">
      <SectionHeading
        eyebrow="Proof, not promises"
        title="This is the actual room"
        description="Every photo on this page was taken in our classroom — including during the 1-month holiday program we ran in August 2026. Come and see it yourself any visiting day."
      />
      <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-3">
        <StaggerItem>
          <SiteImage
            src="/images/campus/students-laptops.jpg"
            alt="Students working on laptops during a CEA class"
            caption="Hands-on class session"
          />
        </StaggerItem>
        <StaggerItem>
          <SiteImage
            src="/images/campus/classroom-tv.jpg"
            alt="Class following a lesson on the wall screen"
            caption="Following the lesson on the wall screen"
          />
        </StaggerItem>
        <StaggerItem>
          <SiteImage
            src="/images/campus/learning-together.jpg"
            alt="Students learning together and helping each other"
            caption="Students helping each other"
          />
        </StaggerItem>
      </StaggerGroup>
      <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link to="/visit">
            <Camera className="mr-1.5 size-4" /> Plan a visit
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/events">
            See what we've run <ArrowRight className="ml-1.5 size-4" />
          </Link>
        </Button>
      </Reveal>
    </section>
  );
}

function ProgramsSection() {
  return (
    <section className="bg-muted/40 border-y py-16 md:py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Programs"
            title="Pick a skill. We'll sit with you until you can do it."
            description="Every program is project-based: you learn a concept, then immediately use it to build something. Evening and weekend options for workers and students."
          />
          <Reveal delay={0.1}>
            <Button asChild variant="outline">
              <Link to="/programs">
                All programs <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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

function HowItWorks() {
  const steps = [
    {
      n: "1",
      title: "Talk to us",
      body: "Message us on WhatsApp or walk into the campus. We help you pick the right starting point — including telling you honestly if you're not ready yet.",
    },
    {
      n: "2",
      title: "Learn by doing",
      body: "Small classes, every student on a computer. Short explanations, long practice. Instructors review your work with you, not just mark it.",
    },
    {
      n: "3",
      title: "Build real projects",
      body: "Websites, designs, apps, campaigns — things you can show. Your portfolio grows every month, not just at graduation.",
    },
    {
      n: "4",
      title: "Get guided to work",
      body: "Freelance gigs, internships, jobs. We review your CV, rehearse you for interviews, and introduce you to people who need your skill.",
    },
  ];
  return (
    <section className="container-page py-16 md:py-24">
      <SectionHeading
        align="center"
        eyebrow="How it works"
        title="Four steps. No mystery."
        description="This is exactly what happens from the day you message us to the day you start earning."
      />
      <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <StaggerItem key={s.n}>
            <div className="bg-card shadow-soft h-full rounded-2xl border p-6">
              <span className="bg-gradient-brand text-primary-foreground font-display grid size-10 place-items-center rounded-xl text-lg font-extrabold">
                {s.n}
              </span>
              <h3 className="font-display mt-4 text-base font-bold">{s.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.body}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <Reveal className="mt-10 text-center">
        <ul className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
          {["No experience needed to start", "Pay in instalments", "Evening & weekend classes"].map(
            (t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="text-primary size-4" /> {t}
              </li>
            ),
          )}
        </ul>
      </Reveal>
    </section>
  );
}

function FounderStrip() {
  return (
    <section className="bg-muted/40 border-y py-16 md:py-20">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[auto_1fr_auto]">
        <Reveal>
          <Portrait
            src="/images/team/ellis.jpg"
            name="Ellis Dennis Graham"
            className="size-28 text-2xl sm:size-36"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="font-display text-xl leading-relaxed font-bold text-balance sm:text-2xl">
            “I started this academy because I kept meeting young people who had certificates but
            couldn't do the work. Here, you don't graduate until you can actually build.”
          </p>
          <p className="text-muted-foreground mt-4 text-sm font-semibold">
            Ellis Dennis Graham — Founder, Cyber Elias Academy
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <Button asChild variant="outline">
            <Link to="/about">
              Our story <ArrowRight className="ml-1.5 size-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function BlogLatest() {
  const latest = blogPosts.slice(0, 3);
  return (
    <section className="container-page py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="From the classroom"
          title="We write about what we teach"
          description="Practical notes from our instructors — no fluff, no copied content."
        />
        <Reveal delay={0.1}>
          <Button asChild variant="outline">
            <Link to="/blog">
              All articles <ArrowRight className="ml-1.5 size-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
      <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3">
        {latest.map((p) => (
          <StaggerItem key={p.slug}>
            <Link
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group bg-card shadow-soft hover:shadow-elevated flex h-full flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1"
            >
              <Badge variant="secondary" className="w-fit font-semibold">
                {p.category}
              </Badge>
              <h3 className="font-display group-hover:text-primary mt-3 flex-1 text-lg leading-snug font-bold transition-colors">
                {p.title}
              </h3>
              <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
                {p.excerpt}
              </p>
              <span className="text-muted-foreground mt-4 flex items-center gap-1 text-xs font-medium">
                {p.author} · {p.date}
              </span>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="border-t">
      <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Questions"
          title="Everything you were about to ask"
          description="Still unsure? Message us on WhatsApp — a real person replies, usually within hours."
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

function Home() {
  return (
    <PageShell>
      <Hero />
      <StatBand />
      <ClassroomProof />
      <ProgramsSection />
      <HowItWorks />
      <FounderStrip />
      <BlogLatest />
      <FaqSection />
      <CTASection
        title="Come and see the classroom before you decide"
        description="Walk in any weekday, sit in on a session, talk to the students. Or start with a WhatsApp message — whichever is easier."
        primary={{ label: "Plan a visit", to: "/visit" }}
        secondary={{ label: "Browse programs", to: "/programs" }}
      />
    </PageShell>
  );
}
