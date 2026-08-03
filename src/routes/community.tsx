import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenText,
  CalendarHeart,
  Globe2,
  HandHeart,
  MessageSquareHeart,
  PartyPopper,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from "@/components/motion";
import { events } from "@/data/site";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Forums, study groups, events and the alumni network — the culture layer of the academy that compounds long after graduation.",
      },
    ],
  }),
  component: Community,
});

const spaces = [
  {
    icon: BookOpenText,
    title: "Forums & study groups",
    body: "Course channels, project help, career threads and interest groups — moderated by staff and senior alumni.",
    tags: ["#web-dev", "#security", "#design", "#data"],
  },
  {
    icon: MessageSquareHeart,
    title: "Mentor circles",
    body: "Small cohorts matched with working practitioners. Monthly check-ins, portfolio reviews and honest feedback.",
    tags: ["1:1 sessions", "Portfolio reviews", "Career plans"],
  },
  {
    icon: CalendarHeart,
    title: "Events & meetups",
    body: "Open days, build nights, career fairs and alumni summits — on campus, hybrid or fully online.",
    tags: ["Port Harcourt", "Remote", "Hybrid"],
  },
  {
    icon: HandHeart,
    title: "Give back",
    body: "Alumni mentor students, sponsor scholarships, volunteer at bootcamps and speak at open days.",
    tags: ["Mentoring", "Donations", "Guest talks"],
  },
  {
    icon: PartyPopper,
    title: "Culture & recognition",
    body: "Shout-outs, monthly MVPs, capstone awards and the alumni spotlight — effort gets celebrated.",
    tags: ["#wins", "#spotlight", "#mvp"],
  },
  {
    icon: Globe2,
    title: "Global network",
    body: "Alumni stay connected after graduation — a directory, a mentorship pool and a giving engine that grows with every cohort.",
    tags: ["Every cohort", "Every state", "Every year"],
  },
];

function Community() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Community Engine"
        art="community"
        title={
          <>
            Belonging that <span className="text-gradient">compounds</span>
          </>
        }
        description="The academy is a network, not a transaction. Forums, mentor circles, events and an alumni directory that keeps paying out long after graduation."
      />

      <section className="container-page py-20 md:py-24">
        <SectionHeading eyebrow="Six spaces" title="Where the community lives" />
        <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {spaces.map((s) => (
            <StaggerItem key={s.title}>
              <TiltCard intensity={4} className="h-full">
                <div className="bg-card shadow-soft hover:shadow-elevated flex h-full flex-col rounded-2xl border p-7 transition-shadow">
                  <div className="bg-primary/10 text-primary grid size-11 place-items-center rounded-xl">
                    <s.icon className="size-5" />
                  </div>
                  <h3 className="font-display mt-5 text-lg font-bold">{s.title}</h3>
                  <p className="text-muted-foreground mt-2.5 flex-1 text-sm leading-relaxed">
                    {s.body}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t pt-4">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="bg-muted/70 text-muted-foreground rounded-md px-2 py-1 text-[11px] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="bg-muted/40 border-y py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Upcoming"
            title="Gatherings worth showing up for"
            description="Events are published here as they are confirmed — starting with our open days in Port Harcourt. Want to host or speak at one? Get in touch."
          />
          {events.length > 0 ? (
            <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-3">
              {events.slice(0, 3).map((e) => (
                <StaggerItem key={e.slug}>
                  <Link
                    to="/events"
                    className="group bg-card shadow-soft hover:shadow-elevated flex h-full flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="font-semibold">
                        {e.type}
                      </Badge>
                      <span className="text-muted-foreground text-xs font-semibold">{e.date}</span>
                    </div>
                    <h3 className="font-display group-hover:text-primary mt-4 flex-1 text-lg leading-snug font-bold">
                      {e.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm">{e.location}</p>
                    <span className="text-primary mt-4 inline-flex items-center gap-1 border-t pt-4 text-sm font-bold">
                      View event{" "}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <div className="border-dashed bg-card/50 mt-12 flex flex-col items-center rounded-3xl border p-12 text-center">
              <CalendarHeart className="text-muted-foreground size-8" />
              <h3 className="font-display mt-4 text-lg font-bold">
                First events are being planned
              </h3>
              <p className="text-muted-foreground mt-2 max-w-md text-sm">
                Open days and build nights will land here as we stand up the academy in Port
                Harcourt. Join the community and be first to know.
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link to="/contact">
                  Join the waitlist <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="container-page py-20">
        <Reveal>
          <div className="bg-gradient-ink text-ink-foreground shadow-elevated relative overflow-hidden rounded-3xl px-8 py-14 md:px-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_0%,oklch(0.55_0.15_330/0.3),transparent)]" />
            <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-ink-foreground/60 text-xs font-bold tracking-[0.18em] uppercase">
                  Alumni
                </p>
                <h2 className="font-display mt-2 text-3xl font-extrabold sm:text-4xl">
                  Once an Elias, always an Elias
                </h2>
                <p className="text-ink-foreground/75 mt-3 max-w-xl leading-relaxed">
                  The alumni network is a directory, a mentorship pool and a giving engine. Update
                  your profile, sign up to mentor, or fund the next student's seat.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg" className="bg-gradient-brand shadow-glow border-0">
                  <Link to="/alumni">
                    Join the network <ArrowRight className="ml-1.5 size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground/10 bg-transparent"
                >
                  <Link to="/stories">Read success stories</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <CTASection
        title="Community starts on day one"
        description="Your first forum thread, study group and mentor match happen in your first week — not after graduation."
        primary={{ label: "Start your application", to: "/admissions" }}
        secondary={{ label: "See the events", to: "/events" }}
      />
    </PageShell>
  );
}
