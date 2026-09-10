import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CTASection,
  PageHero,
  PageShell,
  SectionHeading,
} from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { SiteImage, Portrait } from "@/components/media/site-image";
import { CONTACT, mapsUrl, whatsappUrl } from "@/lib/contact";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    getPageHead({
      title: "About — a practical tech school in Port Harcourt",
      description:
        "Cyber Elias Academy teaches tech the hands-on way: small classes, real projects, teachers who build. Founded by Ellis Dennis Graham in Port Harcourt, Rivers State.",
      path: "/about",
    }),
  component: About,
});

const timeline = [
  {
    when: "2025",
    title: "The academy opens",
    body: "Cyber Elias Academy starts in Port Harcourt with one belief: certificates don't get people hired — demonstrated skill does.",
  },
  {
    when: "Aug 2026",
    title: "First holiday program",
    body: "We run a full 1-month holiday tech program. Students fill the classroom daily, every one of them on a computer, learning by doing.",
  },
  {
    when: "Now",
    title: "Cohorts & community",
    body: "Career programs in software, design, data, AI, cybersecurity and marketing — plus holiday programs, workshops and training for organisations.",
  },
];

const principles = [
  {
    title: "Build, don't memorise",
    body: "Every concept ends in something you made. If you can't show it, you haven't learned it yet — and that's fine, we keep working until you can.",
  },
  {
    title: "Small classes",
    body: "One room, one instructor, every student on a machine. The teacher knows your name, your project, and exactly where you're stuck.",
  },
  {
    title: "Honest guidance",
    body: "We'll tell you which course fits your goal — and tell you plainly if you're not ready, or if a different path serves you better.",
  },
];

function About() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About us"
        title={
          <>
            A small school with <span className="text-gradient">one obsession:</span> can you
            actually do it?
          </>
        }
        description="Cyber Elias Academy is a practical technology school at 26 Ebony Road, Rumuigbo, Port Harcourt. We teach software, design, data, AI, cybersecurity and digital marketing — the hands-on way, in small classes, with teachers who build for a living."
      />

      {/* Founder story */}
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <Portrait
              src="/images/team/ellis.jpg"
              name="Ellis Dennis Graham"
              className="mx-auto size-56 text-4xl sm:size-72 lg:mx-0"
            />
            <div className="mt-5 text-center lg:text-left">
              <p className="font-display text-lg font-bold">Ellis Dennis Graham</p>
              <p className="text-primary text-sm font-semibold">Founder, Cyber Elias Academy</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Why this school exists"
              title="Too many certificates. Not enough capability."
              description=""
            />
            <div className="mt-6 space-y-5">
              <Reveal>
                <p className="leading-relaxed">
                  I'm Ellis. Before starting this academy, I spent years doing real technology
                  work — hardware, networking, web development, IT support, digital marketing.
                  Across all of it I kept seeing the same gap:
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <blockquote className="border-primary/25 bg-primary/5 rounded-2xl border-l-4 p-5 text-base font-semibold">
                  Knowing technology is not the same as knowing how to apply it.
                </blockquote>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-muted-foreground leading-relaxed">
                  People finish courses and still can't solve a real business problem. They know
                  syntax but have never shipped anything. Employers need people who can implement —
                  and can't find them. I started Cyber Elias Academy to close that gap, one small
                  class at a time, starting here in Port Harcourt.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link to="/team">
                      Meet the team <ArrowRight className="ml-1.5 size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href={whatsappUrl("Hello Ellis! I'd like to ask about the academy.")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-1.5 size-4" /> Talk to me directly
                    </a>
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Proof: holiday program */}
      <section className="bg-muted/40 border-y py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we've done"
            title="August 2026: our first holiday program"
            description="A full month of daily hands-on classes. Don't take our word for it — these are the photos."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal>
              <SiteImage
                src="/images/events/holiday-program-2026.jpg"
                alt="Students in class during the August 2026 holiday program"
                caption="Holiday program, August 2026 — every student on a machine"
              />
            </Reveal>
            <Reveal delay={0.08}>
              <SiteImage
                src="/images/campus/lab-desktops.jpg"
                alt="Students working at desktop computers in the CEA lab"
                caption="Practice time in the lab"
              />
            </Reveal>
          </div>
          <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3">
            {timeline.map((t) => (
              <StaggerItem key={t.when}>
                <div className="bg-card shadow-soft h-full rounded-2xl border p-6">
                  <Badge variant="secondary" className="font-bold">
                    {t.when}
                  </Badge>
                  <h3 className="font-display mt-4 text-base font-bold">{t.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{t.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Principles */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          align="center"
          eyebrow="How we teach"
          title="Three rules we actually follow"
        />
        <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {principles.map((p, i) => (
            <StaggerItem key={p.title}>
              <div className="bg-card shadow-soft h-full rounded-2xl border p-7">
                <span className="font-display text-gradient text-4xl font-extrabold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-4 text-lg font-bold">{p.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{p.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Location */}
      <section className="container-page pb-16 md:pb-20">
        <Reveal>
          <div className="bg-gradient-ink text-ink-foreground shadow-elevated relative overflow-hidden rounded-3xl px-8 py-12 md:px-12">
            <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold tracking-[0.16em] uppercase opacity-70">
                  <MapPin className="size-4" /> Find us
                </p>
                <p className="font-display mt-4 text-2xl font-extrabold text-balance sm:text-3xl">
                  {CONTACT.address.street}, {CONTACT.address.city}
                </p>
                <p className="mt-3 opacity-75">
                  {CONTACT.hours} · {CONTACT.phoneDisplay} · {CONTACT.email}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground/10 bg-transparent"
                >
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                    Open in Maps
                  </a>
                </Button>
                <Button asChild className="bg-gradient-brand border-0">
                  <Link to="/visit">
                    Plan a visit <ArrowRight className="ml-1.5 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <CTASection
        title="Come and see a class before you decide"
        description="The best way to judge a school is to sit in it. Walk in any weekday — or message us and we'll set a time."
        primary={{ label: "Plan a visit", to: "/visit" }}
        secondary={{ label: "Browse programs", to: "/programs" }}
      />
    </PageShell>
  );
}
