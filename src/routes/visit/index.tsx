import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowRight,
  Bus,
  CalendarDays,
  CheckCircle2,
  Coffee,
  Loader2,
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
import { submitContact } from "@/lib/api/marketing";

export const Route = createFileRoute("/visit/")({
  head: () => ({
    meta: [
      { title: "Visit Us — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Register for campus tours and open days at Cyber Elias Academy, Port Harcourt — or take a virtual tour from anywhere. See the academy before you commit.",
      },
    ],
  }),
  component: VisitPage,
});

const visitTypes = [
  {
    id: "tour",
    label: "Campus tour",
    desc: "First through the doors when the Port Harcourt campus opens",
  },
  {
    id: "class",
    label: "Sit in a live class",
    desc: "Experience a real evening session with a cohort",
  },
  {
    id: "open",
    label: "Open day",
    desc: "The full Saturday experience — demos, mentors, scholarships",
  },
  { id: "virtual", label: "Virtual tour", desc: "A 30-minute guided walkthrough over video call" },
];

const gettingHere = [
  {
    icon: Plane,
    title: "From the airport",
    desc: "Port Harcourt International Airport is about 40 minutes from the city. Pickup arranged when visits go live.",
  },
  {
    icon: Bus,
    title: "By road",
    desc: "Well connected via the East–West Road and PH–Aba Expressway. Pickup on request.",
  },
  {
    icon: TrainFront,
    title: "Local transit",
    desc: "Keke, taxis and City Buses serve every neighbourhood. We'll send precise directions.",
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
  const [registerError, setRegisterError] = useState("");
  const register = useMutation({
    mutationFn: async (data: { name: string; email: string; phone: string; city: string }) => {
      return submitContact({
        name: data.name,
        email: data.email,
        message: `Visit interest (${type}): ${data.name}, ${data.phone}, ${data.city}`,
      });
    },
    onSuccess: () => setBooked(true),
    onError: (err) => {
      setRegisterError(err instanceof Error ? err.message : "Could not register interest.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegisterError("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const city = (formData.get("city") as string)?.trim();
    if (!name || !email || !phone) {
      setRegisterError("Name, email and phone are required.");
      return;
    }
    register.mutate({ name, email, phone, city });
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Visit Cyber Elias Academy"
        art="tour"
        title={
          <>
            Be there when the <span className="text-gradient">doors open</span>
          </>
        }
        description="The academy is taking shape in Port Harcourt. Register today and you'll be first in line for campus tours, open days and virtual walkthroughs."
      />

      {booked ? (
        <section className="container-page py-16">
          <Reveal className="mx-auto max-w-xl text-center">
            <span className="bg-success/10 text-success mx-auto grid size-16 place-items-center rounded-full">
              <CheckCircle2 className="size-8" />
            </span>
            <h2 className="font-display mt-6 text-2xl font-extrabold">Interest registered</h2>
            <p className="text-muted-foreground mt-3">
              We'll email you the moment visit dates and directions are confirmed — no obligation,
              no spam.
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
                    Port Harcourt Campus
                  </Badge>
                  <h3 className="font-display mt-3 text-xl font-extrabold">Cyber Elias Academy</h3>
                  <p className="text-ink-foreground/70 mt-1 text-sm">
                    Rivers State, Nigeria — address confirmed at opening
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { label: "Opening", value: "With cohort one" },
                      { label: "Open days", value: "Announced soon" },
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
                  Register your interest
                </CardTitle>
                <p className="text-muted-foreground text-sm font-normal">
                  Free · No obligation · You'll be first to know
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
                    <Input id="v-name" name="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="v-phone">Phone / WhatsApp</Label>
                    <Input
                      id="v-phone"
                      name="phone"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="v-email">Email address</Label>
                    <Input
                      id="v-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="v-city">Your city</Label>
                    <Input id="v-city" name="city" placeholder="e.g. Port Harcourt, Aba, Lagos" />
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

                <form onSubmit={handleSubmit}>
                  <div className="rounded-xl border border-dashed p-4">
                    <p className="flex items-center gap-2 text-sm font-bold">
                      <CalendarDays className="text-primary size-4" /> Coming from far?
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Add your city in the form and we'll include pickup and accommodation tips in
                      the opening announcements.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={register.isPending}
                    className="bg-gradient-brand shadow-glow w-full border-0"
                  >
                    {register.isPending && <Loader2 className="mr-1.5 size-4 animate-spin" />}
                    Register interest <ArrowRight className="ml-1.5 size-4" />
                  </Button>
                  {registerError && (
                    <p className="bg-error/10 text-error rounded-lg px-3 py-2 text-xs font-semibold">
                      {registerError}
                    </p>
                  )}
                  <p className="text-muted-foreground text-center text-xs">
                    Prefer virtual? Book a{" "}
                    <Link to="/contact" className="text-primary font-semibold">
                      video call
                    </Link>{" "}
                    instead.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <section className="bg-muted/40 border-y">
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="Open day"
            title="Open days are being planned"
            description="Workshop demos, mentor panels, a scholarship desk and a full campus walkthrough — announced here and by email the moment dates are set."
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
