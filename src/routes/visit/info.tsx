import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Accessibility,
  Building2,
  Coffee,
  Compass,
  LayoutGrid,
  Library,
  Map,
  MapPin,
  Monitor,
  Ticket,
  Utensils,
  Wifi,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/visit/info")({
  head: () => ({
    meta: [
      { title: "Campus Info & Map — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Campus map, facilities and directions for Cyber Elias Academy, Ikeja GRA, Lagos. Everything you need to find your way around.",
      },
    ],
  }),
  component: VisitInfoPage,
});

const floors = [
  {
    name: "Ground floor",
    tone: "bg-primary/10 text-primary",
    rooms: [
      "Reception & visitor lounge",
      "Café and lounge",
      "Event hall (120 seats)",
      "Security desk",
    ],
  },
  {
    name: "First floor",
    tone: "bg-learning/10 text-learning",
    rooms: ["Frontend studio", "Backend lab", "Data & AI lab", "Mentorship rooms"],
  },
  {
    name: "Second floor",
    tone: "bg-career/10 text-career",
    rooms: ["Design studio", "Media & content studio", "Interview rooms", "Employer lounge"],
  },
  {
    name: "Roof terrace",
    tone: "bg-community/10 text-community",
    rooms: ["Community hub", "Demo stage", "Career fair space", "Quiet zone"],
  },
];

const facilities = [
  { icon: Wifi, title: "Fibre internet", desc: "1Gbps symmetrical, plus hotspots in every room." },
  { icon: Monitor, title: "Workstations", desc: "Every learner has a seat with dual screens." },
  { icon: Coffee, title: "Café", desc: "Coffee, pastries and power outlets, open all day." },
  {
    icon: Library,
    title: "Resource library",
    desc: "Textbooks, printed modules and a quiet room.",
  },
  { icon: Utensils, title: "Lunch vouchers", desc: "Every visitor gets a voucher for the lounge." },
  {
    icon: Accessibility,
    title: "Accessible",
    desc: "Lifts, ramps and accessible toilets on all floors.",
  },
];

function VisitInfoPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Campus map & info"
        title={
          <>
            Find your way around <span className="text-gradient">Ikeja GRA</span>
          </>
        }
        description="Four floors, two studios, one café. Here's the lay of the land before you arrive — or while you're in the building."
      />

      <section className="container-page pb-20">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="secondary" className="font-semibold">
            <MapPin className="mr-1.5 size-3.5" /> 12 Adebayo Street, Ikeja GRA, Lagos
          </Badge>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/visit">Book a visit</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/visit/brochure">Digital brochure</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/visit/feedback">Leave feedback</Link>
            </Button>
          </div>
        </div>

        <div className="bg-card shadow-soft mt-6 grid gap-6 rounded-2xl border p-6 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <Map className="text-primary size-5" />
              <h2 className="font-display text-lg font-extrabold">Site map</h2>
            </div>
            <div className="bg-muted/50 relative mt-4 grid aspect-[4/3] place-items-center overflow-hidden rounded-xl border">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:28px_28px]" />
              <div className="relative space-y-3 text-center">
                <span className="bg-gradient-brand shadow-glow mx-auto grid size-12 place-items-center rounded-xl text-white">
                  <Building2 className="size-6" />
                </span>
                <p className="font-display text-sm font-extrabold">CEA Ikeja Campus</p>
                <p className="text-muted-foreground text-xs">
                  Mobile Banjo bus stop · 5-min walk · Look for the orange sign
                </p>
              </div>
              <span className="bg-primary/10 text-primary absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold">
                BRT & danfo stop → 180m
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {floors.map((f) => (
              <div key={f.name} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">{f.name}</p>
                  <span className={cn("grid size-7 place-items-center rounded-lg", f.tone)}>
                    <LayoutGrid className="size-3.5" />
                  </span>
                </div>
                <ul className="text-muted-foreground mt-2 space-y-1 text-xs">
                  {f.rooms.map((r) => (
                    <li key={r} className="flex items-center gap-1.5">
                      <span className="bg-primary size-1 rounded-full" /> {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-2">
            <Compass className="text-primary size-5" />
            <h2 className="font-display text-lg font-extrabold">Facilities & amenities</h2>
          </div>
          <StaggerGroup className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => (
              <StaggerItem key={f.title}>
                <Card className="bg-card shadow-soft h-full border">
                  <CardContent className="p-5">
                    <span className="bg-primary/10 text-primary grid size-10 place-items-center rounded-xl">
                      <f.icon className="size-4.5" />
                    </span>
                    <h3 className="font-display mt-3 text-sm font-extrabold">{f.title}</h3>
                    <p className="text-muted-foreground mt-1 text-xs leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <Reveal className="mt-10">
          <div className="bg-gradient-ink text-ink-foreground flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <span className="bg-ink-foreground/10 text-ink-foreground grid size-10 place-items-center rounded-xl">
                <Ticket className="size-5" />
              </span>
              <div>
                <p className="font-display text-sm font-extrabold">Walk-ins welcome</p>
                <p className="text-ink-foreground/70 text-xs">
                  No appointment needed for the café and ground floor, Mon–Sat, 9am–6pm.
                </p>
              </div>
            </div>
            <Button asChild className="bg-gradient-brand shadow-glow border-0">
              <Link to="/visit">
                Book a guided tour <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>

      <CTASection />
    </PageShell>
  );
}
