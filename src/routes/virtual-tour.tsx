import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Compass,
  Laptop,
  MonitorPlay,
  PlayCircle,
  RotateCcw,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/virtual-tour")({
  head: () => ({
    meta: [
      { title: "Virtual Campus Tour — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Tour Cyber Elias Academy from anywhere: studios, labs, café, demo stage and the community floor — with live 360° recordings.",
      },
    ],
  }),
  component: VirtualTourPage,
});

const stops = [
  {
    id: "entrance",
    icon: Camera,
    tone: "bg-primary/10 text-primary",
    title: "Reception & entrance",
    desc: "Where every visit starts — QR check-in, badges and the visitor lounge.",
    duration: "1:20",
  },
  {
    id: "frontend",
    icon: Laptop,
    tone: "bg-learning/10 text-learning",
    title: "Frontend studio",
    desc: "Dual-screen workstations, pair-programming walls and the live cohort in action.",
    duration: "2:05",
  },
  {
    id: "backend",
    icon: MonitorPlay,
    tone: "bg-career/10 text-career",
    title: "Backend & data lab",
    desc: "Servers, deployment demos and the data pipeline practice rig.",
    duration: "1:45",
  },
  {
    id: "design",
    icon: Compass,
    tone: "bg-services/10 text-services",
    title: "Design studio",
    desc: "Crit walls, prototype stations and the usability testing corner.",
    duration: "1:30",
  },
  {
    id: "cafe",
    icon: Video,
    tone: "bg-warning/10 text-warning",
    title: "Café & lounge",
    desc: "The social heart — coffee, foosball and the demo stage wall.",
    duration: "1:10",
  },
  {
    id: "roof",
    icon: RotateCcw,
    tone: "bg-community/10 text-community",
    title: "Roof terrace",
    desc: "Career fairs, open-day stages and the Friday community hub.",
    duration: "1:35",
  },
];

function VirtualTourPage() {
  const [active, setActive] = useState("entrance");
  const stop = stops.find((s) => s.id === active) ?? stops[0];

  return (
    <PageShell>
      <PageHero
        eyebrow="Virtual campus tour"
        title={
          <>
            Walk the campus, <span className="text-gradient">anywhere</span>
          </>
        }
        description="Six 360° stops, recorded live during an evening session. See the labs, the learners and the energy before you book the real thing."
      />

      <section className="container-page pb-20">
        <Reveal>
          <Card className="bg-card shadow-soft overflow-hidden border">
            <div className="relative">
              <div className="bg-gradient-ink text-ink-foreground grid aspect-video place-items-center">
                <div className="text-center">
                  <span className="bg-ink-foreground/10 text-ink-foreground mx-auto grid size-16 place-items-center rounded-full">
                    <PlayCircle className="size-8" />
                  </span>
                  <p className="font-display mt-4 text-sm font-extrabold">{stop.title}</p>
                  <p className="text-ink-foreground/60 mt-1 text-xs">
                    360° walkthrough · {stop.duration} · recorded 18:40 WAT
                  </p>
                </div>
                <span className="bg-error/90 text-error-foreground absolute top-4 left-4 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold">
                  <span className="size-1.5 animate-pulse rounded-full bg-current" /> LIVE
                </span>
                <Badge className="bg-ink-foreground/15 text-ink-foreground absolute right-4 bottom-4 border-0 font-semibold">
                  360°
                </Badge>
              </div>
              <div className="bg-black/60 absolute inset-x-0 bottom-0 flex justify-center gap-3 p-4">
                <Button className="bg-gradient-brand shadow-glow h-9 border-0">
                  <PlayCircle className="mr-1.5 size-4" /> Play {stop.title}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 bg-white/10 text-white border-white/30"
                >
                  <Camera className="mr-1.5 size-4" /> Switch view
                </Button>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-sm leading-relaxed">{stop.desc}</p>
            </CardContent>
          </Card>
        </Reveal>

        <StaggerGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stops.map((s) => (
            <StaggerItem key={s.id}>
              <button
                onClick={() => setActive(s.id)}
                className={cn(
                  "bg-card shadow-soft w-full rounded-2xl border p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-elevated",
                  active === s.id
                    ? "border-primary ring-2 ring-primary/30"
                    : "hover:border-primary/40",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("grid size-10 place-items-center rounded-xl", s.tone)}>
                    <s.icon className="size-4.5" />
                  </span>
                  <Badge variant="secondary" className="font-semibold">
                    {s.duration}
                  </Badge>
                </div>
                <p className="font-display mt-3 text-sm font-extrabold">{s.title}</p>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">{s.desc}</p>
                {active === s.id && (
                  <p className="text-primary mt-3 flex items-center gap-1 text-xs font-bold">
                    <CheckCircle2 className="size-3.5" /> Now viewing
                  </p>
                )}
              </button>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-10">
          <div className="bg-gradient-ink text-ink-foreground flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6">
            <div>
              <p className="font-display text-sm font-extrabold">Prefer a live walkthrough?</p>
              <p className="text-ink-foreground/70 mt-1 text-xs">
                Book a 30-minute guided video tour with a current learner — Wednesdays and
                Saturdays.
              </p>
            </div>
            <Button asChild className="bg-gradient-brand shadow-glow border-0">
              <Link to="/visit">
                Book the real thing <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>

      <CTASection />
    </PageShell>
  );
}
