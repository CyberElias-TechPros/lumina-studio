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
import { SceneArt } from "@/components/art/scene-art";
import { cn } from "@/lib/utils";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/virtual-tour")({
  head: () =>
    getPageHead({
      title: "Virtual Campus Tour",
      description:
        "Tour Cyber Elias Academy from anywhere: studios, labs, café, demo stage and the community floor — with live 360° recordings.",
      path: "/virtual-tour",
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
        description="When the Port Harcourt campus opens, this page becomes a six-stop 360° walkthrough — the labs, the learners and the energy. Until then, here's what the tour will cover."
      />

      <section className="container-page pb-20">
        <Reveal>
          <Card className="bg-card shadow-soft overflow-hidden border">
            <div className="relative">
              <div className="relative grid aspect-video place-items-center overflow-hidden">
                <div className="absolute inset-0">
                  <SceneArt variant="tour" labelled={false} />
                </div>
                <div className="relative text-center">
                  <span className="bg-white/10 text-white mx-auto grid size-16 place-items-center rounded-full">
                    <PlayCircle className="size-8" />
                  </span>
                  <p className="font-display mt-4 text-sm font-extrabold text-white">
                    {stop.title}
                  </p>
                  <p className="text-white/60 mt-1 text-xs">
                    Recording coming with the campus · {stop.duration} planned
                  </p>
                </div>
                <Badge className="bg-white/15 text-white absolute right-4 bottom-4 border-0 font-semibold">
                  Coming soon
                </Badge>
              </div>
              <div className="bg-black/60 absolute inset-x-0 bottom-0 flex justify-center gap-3 p-4">
                <Button asChild className="bg-gradient-brand shadow-glow h-9 border-0">
                  <Link to="/visit">
                    <PlayCircle className="mr-1.5 size-4" /> Register for the tour
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-9 bg-white/10 text-white border-white/30"
                >
                  <Link to="/visit/info">
                    <Camera className="mr-1.5 size-4" /> Campus plan
                  </Link>
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
                Book a guided video tour with a mentor once visits go live — or take the in-person
                campus tour in Port Harcourt.
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
