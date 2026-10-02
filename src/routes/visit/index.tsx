import { useTurnstile } from "@/components/turnstile";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
import { CampusImg } from "@/components/marketing/photos";
import { campusGallery } from "@/data/academy";
import { cn } from "@/lib/utils";
import { submitContact } from "@/lib/api/marketing";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/visit/")({
  head: () =>
    getPageHead({
      title: "Visit — Cyber Elias Academy",
      description:
        "Visit Cyber Elias Academy at 24/26 Ebony Road, Port Harcourt. See the classroom, sit in on a session if one is running, or book a video call.",
      path: "/visit",
    }),
  component: VisitPage,
});

const visitTypes = [
  {
    id: "look",
    label: "See the classroom",
    desc: "A short look around the centre during opening hours.",
  },
  {
    id: "class",
    label: "Sit in on a session",
    desc: "Join the back of a class if one is running that day.",
  },
  {
    id: "virtual",
    label: "Video call",
    desc: "A 20–30 minute call if you cannot come in person.",
  },
];

function VisitPage() {
  const [type, setType] = useState("look");
  const [booked, setBooked] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const turnstile = useTurnstile();
  const register = useMutation({
    mutationFn: async (data: { name: string; email: string; phone: string; city: string }) => {
      return submitContact({
        turnstileToken: turnstile.token,
        name: data.name,
        email: data.email,
        message: `Visit interest (${type}): ${data.name}, ${data.phone}, ${data.city}`,
      });
    },
    onSuccess: () => setBooked(true),
    onError: (err) => {
      setRegisterError(err instanceof Error ? err.message : "Could not send your details.");
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
        eyebrow="Visit"
        title="See the centre before you enrol"
        description="24/26 Ebony Road, off Rumuola Road, Port Harcourt. Opening hours Monday to Saturday, 8:00–20:00. Call ahead if you want to sit in on a class."
      />

      <section className="container-page grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-4 md:py-12">
        {campusGallery.map((shot) => (
          <figure key={shot.id} className="border-border overflow-hidden rounded-lg border">
            <CampusImg id={shot.id} className="aspect-[4/3]" eager={shot.id === "lab-1"} />
            <figcaption className="text-muted-foreground px-3 py-2 text-xs">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </section>

      {booked ? (
        <section className="container-page py-16">
          <div className="mx-auto max-w-xl text-center">
            <span className="bg-success/10 text-success mx-auto grid size-12 place-items-center rounded-full">
              <CheckCircle2 className="size-6" />
            </span>
            <h2 className="font-display mt-6 text-2xl font-semibold">We have your details</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              We will reply with a time to visit, or confirm a video call.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/classes">
                View courses <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </section>
      ) : (
        <section className="container-page pb-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">How to find us</h2>
              <p className="text-muted-foreground mt-3 flex items-start gap-2 text-sm leading-relaxed">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                24/26 Ebony Road, Off Rumuola Road, Port Harcourt. Keke, taxi or bus to Rumuola,
                then a short walk. +234 905 862 8386.
              </p>
              <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
                <li>Monday–Saturday, 8:00–20:00 WAT</li>
                <li>
                  No appointment needed to look at the room; call if you want to sit in a class
                </li>
                <li>Some courses can also be followed online</li>
              </ul>
            </div>

            <div className="border-border rounded-lg border p-6 sm:p-8">
              <h2 className="font-display text-lg font-semibold">Tell us you are coming</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Optional — useful if you want a class sit-in or a video call.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <Label>What would you like?</Label>
                  <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    {visitTypes.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setType(v.id)}
                        className={cn(
                          "rounded-lg border p-3 text-left text-sm",
                          type === v.id ? "border-primary bg-primary/5" : "hover:border-primary/40",
                        )}
                      >
                        <p className="font-medium">{v.label}</p>
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
                      placeholder="+234 905 862 8386"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="v-email">Email</Label>
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
                    <Input id="v-city" name="city" placeholder="e.g. Port Harcourt" />
                  </div>
                </div>
                <turnstile.Widget />
                <Button
                  type="submit"
                  disabled={register.isPending || !turnstile.ready}
                  className="w-full"
                >
                  {register.isPending && <Loader2 className="size-4 animate-spin" />}
                  Send
                </Button>
                {registerError && <p className="text-error text-sm">{registerError}</p>}
              </form>
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Or apply from here"
        description="If you already know the course, send the application. We reply with dates and the fee."
      />
    </PageShell>
  );
}
