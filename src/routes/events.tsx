import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { SiteImage } from "@/components/media/site-image";
import { CONTACT, whatsappUrl } from "@/lib/contact";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/events")({
  head: () =>
    getPageHead({
      title: "Events",
      description:
        "Holiday programs, open days and workshops at Cyber Elias Academy in Port Harcourt. See what we've run and get notified about the next one.",
      path: "/events",
    }),
  component: Events,
});

function Events() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Events"
        title={
          <>
            Real gatherings, <span className="text-gradient">not webinars about webinars</span>
          </>
        }
        description="When we run something, we run it in person at the campus in Port Harcourt — and we publish photos afterwards so you can see what actually happened."
      />

      {/* Past event: the holiday program */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="August 2026 · Done"
          title="1-month holiday tech program"
          description="Our first holiday program brought students into the classroom for a full month of hands-on computer training. Here is the room it happened in."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <SiteImage
              src="/images/events/holiday-program-2026.jpg"
              alt="Students learning during the CEA August 2026 holiday program"
              caption="August 2026 holiday program — class in session"
              eager
            />
          </Reveal>
          <Reveal delay={0.08}>
            <SiteImage
              src="/images/campus/classroom-main.jpg"
              alt="Wide view of the CEA classroom with students at computers"
              caption="The classroom at 26 Ebony Road, Rumuigbo"
            />
          </Reveal>
        </div>

        <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Users, title: "Small by design", body: "One room, one instructor, every student on a machine. Nobody watched over someone else's shoulder." },
            { icon: Clock, title: "A full month", body: "Daily hands-on sessions through August 2026 — fundamentals first, then real practice." },
            { icon: MapPin, title: "On campus", body: `${CONTACT.address.street}, ${CONTACT.address.city}. Parents could walk in any day and see the class.` },
          ].map((c) => (
            <StaggerItem key={c.title}>
              <div className="bg-card shadow-soft h-full rounded-2xl border p-6">
                <span className="bg-primary/10 text-primary grid size-11 place-items-center rounded-xl">
                  <c.icon className="size-5" />
                </span>
                <h3 className="font-display mt-4 text-base font-bold">{c.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{c.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* What's next */}
      <section className="bg-muted/40 border-y py-16 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Badge variant="secondary" className="font-semibold">
                <CalendarDays className="mr-1.5 size-3.5" /> Next up
              </Badge>
              <h2 className="font-display mt-5 text-2xl font-extrabold text-balance sm:text-3xl">
                Open day & next holiday program dates drop on WhatsApp first
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                We announce every event — open days, holiday programs, workshops — to our WhatsApp
                line before anywhere else. Message us once and you'll hear about the next one the
                day it's fixed. No spam, no mailing-list noise.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="border-0 bg-[#25D366] hover:bg-[#1fb857]">
                  <a
                    href={whatsappUrl("Hello CEA! Please notify me about your next event / holiday program.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-1.5 size-4" /> Notify me on WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/visit">
                    Visit the campus <ArrowRight className="ml-1.5 size-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="bg-card mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-2xl border p-5 text-left">
              <CheckCircle2 className="text-primary mt-0.5 size-5 shrink-0" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                <span className="text-foreground font-semibold">Our rule for this page:</span> an
                event only appears here if it has a fixed date — and past events only stay listed
                if we can show you photos. No filler calendar.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Want to run a training or workshop with us?"
        description="Schools, churches and organisations in Rivers State: talk to us about holiday programs, staff training and community workshops."
        primary={{ label: "Start your application", to: "/apply" }}
        secondary={{ label: "Visit the campus", to: "/visit" }}
      />
    </PageShell>
  );
}
