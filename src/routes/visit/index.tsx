import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Bus,
  CalendarDays,
  CheckCircle2,
  Coffee,
  MapPin,
  Plane,
  TrainFront,
  Wifi,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageShell, PageHero, CTASection, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/visit/")({
  head: () => ({
    meta: [
      { title: "Visit Us — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Book a campus tour, sit in a live class or attend an open day at Cyber Elias Academy, Ikeja. See the learning environment before you commit.",
      },
    ],
  }),
  component: VisitPage,
});

const visitTypes = [
  { id: "tour", label: "Campus tour", desc: "45 minutes across labs, studios and common areas" },
  {
    id: "class",
    label: "Sit in a live class",
    desc: "Experience a real evening session with a cohort",
  },
  {
    id: "open",
    label: "Open day",
    desc: "The full Saturday experience — demos, alumni, scholarships",
  },
  { id: "virtual", label: "Virtual tour", desc: "A 30-minute guided walkthrough over video call" },
];

const gettingHere = [
  {
    icon: TrainFront,
    title: "By rail",
    desc: "Ikeja bus/train station is 10 minutes away. We'll send a pickup to the stop.",
  },
  {
    icon: Bus,
    title: "By bus",
    desc: "Danfo and BRT stops on Mobolaji Bank-Anthony Way, 5-minute walk.",
  },
  {
    icon: Plane,
    title: "From the airport",
    desc: "MMIA is 25 minutes. Arrange a pickup when you book your visit.",
  },
  {
    icon: Coffee,
    title: "Come hungry",
    desc: "Free coffee, water and lunch vouchers for every visitor.",
  },
];

function VisitPage() {
  const [type, setType] = useState("tour");
  const [booked, setBooked] = useState(false);

  return (
    <PageShell>
      <PageHero
        eyebrow="Visit Cyber Elias Academy"
        title={
          <>
            See the campus before you <span className="text-gradient">commit</span>
          </>
        }
        description="Tour the labs, sit in a live class, meet learners and mentors. Most visitors tell us it's the visit, not the brochure, that decides them."
      />

      {booked ? (
        <section className="container-page py-16">
          <Reveal className="mx-auto max-w-xl text-center">
            <span className="bg-success/10 text-success mx-auto grid size-16 place-items-center rounded-full">
              <CheckCircle2 className="size-8" />
            </span>
            <h2 className="font-display mt-6 text-2xl font-extrabold">Visit confirmed</h2>
            <p className="text-muted-foreground mt-3">
              Our front desk team will email you directions and a contact number for the day. We're
              looking forward to seeing you.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/programs">
                Browse programs while you wait <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </Reveal>
        </section>
      ) : (
        <section className="container-page pb-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-6">
              <div className="bg-card shadow-soft overflow-hidden rounded-2xl border">
                <div className="bg-gradient-ink text-ink-foreground p-6">
                  <Badge className="bg-ink-foreground/15 text-ink-foreground border-0">
                    Ikeja Campus
                  </Badge>
                  <h3 className="font-display mt-3 text-xl font-extrabold">Cyber Elias Academy</h3>
                  <p className="text-ink-foreground/70 mt-1 text-sm">
                    12 Adebayo Street, Ikeja GRA, Lagos
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { label: "Classes daily", value: "18:00–21:00" },
                      { label: "Open days", value: "Sat 10:00" },
                      { label: "Visits", value: "Mon–Sat" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl bg-ink-foreground/10 p-3">
                        <p className="text-ink-foreground/60 text-[10px] font-bold tracking-wide uppercase">
                          {s.label}
                        </p>
                        <p className="font-display mt-1 text-xs font-extrabold">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x">
                  {[
                    { icon: Wifi, label: "Fibre + hotspots" },
                    { icon: Coffee, label: "Café & lounge" },
                  ].map((a) => (
                    <div key={a.label} className="flex items-center gap-2.5 p-4">
                      <a.icon className="text-primary size-4" />
                      <span className="text-xs font-bold">{a.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <StaggerGroup className="grid gap-3 sm:grid-cols-2">
                {gettingHere.map((g) => (
                  <StaggerItem key={g.title}>
                    <div className="bg-card shadow-soft h-full rounded-xl border p-4">
                      <g.icon className="text-primary size-4" />
                      <p className="mt-2 text-sm font-bold">{g.title}</p>
                      <p className="text-muted-foreground mt-1 text-xs leading-relaxed">{g.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            <Card className="bg-card shadow-soft h-fit border">
              <CardHeader>
                <CardTitle className="font-display text-lg font-extrabold">
                  Book your visit
                </CardTitle>
                <p className="text-muted-foreground text-sm font-normal">
                  Free · No obligation · 15 minutes for questions
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label>What would you like to do?</Label>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {visitTypes.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setType(v.id)}
                        className={cn(
                          "rounded-xl border p-3.5 text-left transition-colors",
                          type === v.id
                            ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                            : "bg-background hover:border-primary/40",
                        )}
                      >
                        <p className="text-sm font-bold">{v.label}</p>
                        <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                          {v.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="v-name">Full name</Label>
                    <Input id="v-name" placeholder="Your name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="v-phone">Phone / WhatsApp</Label>
                    <Input id="v-phone" type="tel" placeholder="+234 800 000 0000" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="v-date">Preferred date</Label>
                    <Input id="v-date" type="date" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="v-time">Preferred time</Label>
                    <Select>
                      <SelectTrigger id="v-time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {["10:00", "11:00", "14:00", "16:00", "18:00"].map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-xl border border-dashed p-4">
                  <p className="flex items-center gap-2 text-sm font-bold">
                    <CalendarDays className="text-primary size-4" /> Coming from far?
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Add your city in the notes and we'll arrange pickup and a hostel recommendation
                    for the night.
                  </p>
                </div>

                <Button
                  onClick={() => setBooked(true)}
                  className="bg-gradient-brand shadow-glow w-full border-0"
                >
                  Confirm my visit <ArrowRight className="ml-1.5 size-4" />
                </Button>
                <p className="text-muted-foreground text-center text-xs">
                  Prefer virtual? Book a{" "}
                  <Link to="/contact" className="text-primary font-semibold">
                    video call
                  </Link>{" "}
                  instead.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <section className="bg-muted/40 border-y">
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="Open day"
            title="Next open day: Saturday, August 22"
            description="Workshop demos, alumni panels, scholarship desk and a full campus walkthrough. Free and open to everyone."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-gradient-brand shadow-glow border-0">
              <Link to="/events">
                See all events <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Ask a question</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
