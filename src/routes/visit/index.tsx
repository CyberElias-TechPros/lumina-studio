import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowRight,
  Bus,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageShell, PageHero, CTASection, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { SiteImage } from "@/components/media/site-image";
import { CONTACT, fullAddress, mapsUrl, whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { submitContact } from "@/lib/api/marketing";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/visit/")({
  head: () =>
    getPageHead({
      title: "Visit the campus — Cyber Elias Academy",
      description:
        "Come and see Cyber Elias Academy at 26 Ebony Road, Rumuigbo, Port Harcourt. Tour the classroom, sit in on a session, meet the instructors. Free, no obligation.",
      path: "/visit",
    }),
  component: VisitPage,
});

const visitTypes = [
  {
    id: "tour",
    label: "Quick tour",
    desc: "See the classroom and lab, meet the team — about 20 minutes",
  },
  {
    id: "class",
    label: "Sit in a live class",
    desc: "Join a real session for an hour and feel how teaching works here",
  },
  {
    id: "chat",
    label: "Guidance chat",
    desc: "Not sure what to study? Talk it through with an instructor",
  },
  {
    id: "parent",
    label: "Parent visit",
    desc: "Bring your child, ask anything, see exactly where they'll learn",
  },
];

function VisitPage() {
  const [type, setType] = useState("tour");
  const [booked, setBooked] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const register = useMutation({
    mutationFn: async (data: { name: string; phone: string; day: string }) => {
      return submitContact({
        name: data.name,
        email: `${data.phone.replace(/\D/g, "")}@visit.cea.ng`,
        message: `Campus visit request (${type}): ${data.name}, ${data.phone}, preferred: ${data.day}`,
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
    const phone = (formData.get("phone") as string)?.trim();
    const day = (formData.get("day") as string)?.trim() || "Any day";
    if (!name || !phone) {
      setRegisterError("Name and phone number are required.");
      return;
    }
    register.mutate({ name, phone, day });
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Visit us"
        title={
          <>
            Come and see the <span className="text-gradient">classroom yourself</span>
          </>
        }
        description="The campus is open and classes are running. Walk in any weekday, or book a visit below and we'll set aside time for you — free, no obligation."
      />

      {/* Photos of the real place */}
      <section className="container-page py-14 md:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal>
            <SiteImage
              src="/images/campus/classroom-main.jpg"
              alt="The CEA classroom with students learning"
              caption="The classroom"
              eager
            />
          </Reveal>
          <Reveal delay={0.06}>
            <SiteImage
              src="/images/campus/entrance.jpg"
              alt="Entrance of Cyber Elias Academy"
              caption="Finding us — look for the entrance"
            />
          </Reveal>
          <Reveal delay={0.12}>
            <SiteImage
              src="/images/campus/instructor-help.jpg"
              alt="Instructor helping a student one-on-one"
              caption="One-on-one help is normal here"
            />
          </Reveal>
        </div>
      </section>

      {/* Address + booking */}
      <section className="container-page pb-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <Reveal>
              <div className="bg-gradient-ink text-ink-foreground shadow-elevated overflow-hidden rounded-2xl border-0 p-7">
                <p className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] uppercase opacity-70">
                  <MapPin className="size-4" /> Our address
                </p>
                <p className="font-display mt-3 text-xl leading-snug font-extrabold">
                  {fullAddress}
                </p>
                <p className="mt-3 flex items-center gap-2 text-sm opacity-75">
                  <Clock className="size-4" /> {CONTACT.hours}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground/10 bg-transparent"
                  >
                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                      Open in Google Maps
                    </a>
                  </Button>
                  <Button asChild className="border-0 bg-[#25D366] hover:bg-[#1fb857]">
                    <a
                      href={whatsappUrl("Hello! I'm coming to visit the campus. Any directions?")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-1.5 size-4" /> Ask for directions
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>

            <StaggerGroup className="grid gap-3">
              {[
                {
                  icon: Bus,
                  title: "Getting here",
                  desc: "We're off Rumuola Road in Rumuigbo — easy to reach by keke, taxi or bus from anywhere in Port Harcourt. Message us on WhatsApp and we'll guide you turn by turn.",
                },
                {
                  icon: Clock,
                  title: "Best time to come",
                  desc: "Weekday afternoons, when classes are in full swing — you'll see real teaching, not an empty room. Saturdays work too; message first so someone is expecting you.",
                },
              ].map((g) => (
                <StaggerItem key={g.title}>
                  <div className="bg-card shadow-soft h-full rounded-xl border p-5">
                    <g.icon className="text-primary size-5" />
                    <p className="mt-2 text-sm font-bold">{g.title}</p>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{g.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <Reveal delay={0.08}>
            <Card className="bg-card shadow-soft h-fit border">
              {booked ? (
                <CardContent className="flex min-h-[380px] flex-col items-center justify-center p-8 text-center">
                  <span className="bg-success/10 text-success grid size-16 place-items-center rounded-full">
                    <CheckCircle2 className="size-8" />
                  </span>
                  <h3 className="font-display mt-6 text-2xl font-extrabold">Visit booked</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
                    Thanks — we'll confirm your visit by phone/WhatsApp shortly. Or skip the wait
                    and message us now:
                  </p>
                  <Button asChild className="mt-6 border-0 bg-[#25D366] hover:bg-[#1fb857]">
                    <a
                      href={whatsappUrl("Hello! I just booked a campus visit.")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-1.5 size-4" /> Confirm on WhatsApp
                    </a>
                  </Button>
                </CardContent>
              ) : (
                <>
                  <CardHeader>
                    <CardTitle className="font-display text-lg font-extrabold">
                      Book your visit
                    </CardTitle>
                    <p className="text-muted-foreground text-sm font-normal">
                      Free · No obligation · We confirm by phone
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      <div>
                        <Label>What would you like to do?</Label>
                        <div className="mt-2 grid gap-2 sm:grid-cols-2">
                          {visitTypes.map((v) => (
                            <button
                              key={v.id}
                              type="button"
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
                            placeholder="0803 000 0000"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="v-day">Preferred day (optional)</Label>
                        <Input
                          id="v-day"
                          name="day"
                          placeholder="e.g. Saturday morning"
                        />
                      </div>

                      {registerError && (
                        <p className="text-error bg-error/10 rounded-lg px-3 py-2 text-sm">
                          {registerError}
                        </p>
                      )}
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-gradient-brand shadow-glow w-full border-0"
                        disabled={register.isPending}
                      >
                        {register.isPending ? (
                          <>
                            <Loader2 className="mr-2 size-4 animate-spin" /> Booking…
                          </>
                        ) : (
                          <>
                            Book my visit <ArrowRight className="ml-2 size-4" />
                          </>
                        )}
                      </Button>
                      <p className="text-muted-foreground text-center text-xs">
                        Prefer to just message?{" "}
                        <a
                          href={whatsappUrl("Hello! I'd like to visit the campus.")}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-semibold hover:underline"
                        >
                          WhatsApp us instead
                        </a>
                      </p>
                    </form>
                  </CardContent>
                </>
              )}
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="container-page pb-20">
        <SectionHeading
          align="center"
          eyebrow="What happens"
          title="Your visit in 3 steps"
          description="No sales pitch. Just an honest look at the school."
        />
        <StaggerGroup className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {[
            { n: "1", t: "Look around", d: "See the classroom, the lab, where students actually sit." },
            { n: "2", t: "Watch a class", d: "Sit in for a bit. See how teaching really happens." },
            { n: "3", t: "Ask anything", d: "Fees, schedules, courses — straight answers, no pressure." },
          ].map((s) => (
            <StaggerItem key={s.n}>
              <div className="bg-card shadow-soft h-full rounded-2xl border p-6 text-center">
                <span className="bg-gradient-brand text-primary-foreground font-display mx-auto grid size-10 place-items-center rounded-xl text-lg font-extrabold">
                  {s.n}
                </span>
                <h3 className="font-display mt-4 text-base font-bold">{s.t}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{s.d}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <CTASection
        title="Can't make it in person?"
        description="Browse the programs online, then message us your questions on WhatsApp — we reply fast."
        primary={{ label: "Browse programs", to: "/programs" }}
        secondary={{ label: "Back to homepage", to: "/" }}
      />
    </PageShell>
  );
}
