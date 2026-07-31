import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  GraduationCap,
  Heart,
  Megaphone,
  Quote,
  Rss,
  Send,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/alumni/stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — CEA-OS" },
      {
        name: "description",
        content: "Where CEA alumni work now and how they got there.",
      },
    ],
  }),
  component: AlumniStories,
});

const stories = [
  {
    name: "Tunde Bakare",
    cohort: "Cohort 12",
    company: "Paystack",
    role: "Platform Engineer",
    excerpt:
      "Three months after demo day I had a Paystack offer. The mock interviews my mentor ran were harder than the real thing.",
    initials: "TB",
    tone: "bg-gradient-learning",
  },
  {
    name: "Chiamaka Eze",
    cohort: "Cohort 10",
    company: "Flutterwave",
    role: "Product Designer",
    excerpt:
      "The portfolio sprint review caught everything I'd have missed. My design case study still opens doors two years later.",
    initials: "CE",
    tone: "bg-gradient-erp",
  },
  {
    name: "Ibrahim Sule",
    cohort: "Cohort 11",
    company: "Andela",
    role: "DevOps Engineer",
    excerpt:
      "Cohort 11's CI/CD module was brutal — and it's exactly why I aced Andela's take-home in one weekend.",
    initials: "IS",
    tone: "bg-gradient-services",
  },
  {
    name: "Funke Adeyemi",
    cohort: "Cohort 9",
    company: "Interswitch",
    role: "Backend Engineer",
    excerpt:
      "I went from working at a cyber café in Surulere to shipping payment rails. CEA's lab nights were everything.",
    initials: "FA",
    tone: "bg-gradient-career",
  },
  {
    name: "Ngozi Umeh",
    cohort: "Cohort 12",
    company: "Kuda",
    role: "Data Analyst",
    excerpt:
      "The SQL mid-term humbled me. I retook it, passed, and now I query Kuda's core ledger every single day.",
    initials: "NU",
    tone: "bg-gradient-learning",
  },
  {
    name: "Samuel Adebayo",
    cohort: "Cohort 8",
    company: "Terragon",
    role: "Data Engineer",
    excerpt:
      "My capstone on streaming ingestion is still in production at Terragon. Yes, the exact one from class.",
    initials: "SA",
    tone: "bg-gradient-erp",
  },
];

function AlumniStories() {
  return (
    <AppShell
      roleKey="alumni"
      title="Success stories"
      subtitle="2,400+ alumni working across Lagos and beyond"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            34 stories this year
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/alumni/hub">
              <Megaphone className="size-3.5" /> Alumni hub
            </Link>
          </Button>
        </>
      }
    >
      <Card className="bg-gradient-brand shadow-glow relative overflow-hidden border-0 text-white">
        <CardContent className="flex flex-wrap items-center gap-6 p-6 sm:p-8">
          <span className="bg-white/15 grid size-14 shrink-0 place-items-center rounded-2xl">
            <Quote className="size-6" />
          </span>
          <div className="min-w-0 flex-1">
            <Badge className="bg-white/15 text-white border-0 font-semibold">
              Featured story · Sep 2026
            </Badge>
            <p className="font-display mt-3 max-w-2xl text-lg leading-snug font-extrabold">
              "The mock interviews were harder than the real thing — by the time Paystack called,
              I'd already survived the scariest room in Lagos."
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold">
              Tunde Bakare <span className="text-white/60">·</span>
              <span className="text-white/70">Cohort 12 → Paystack · Platform Engineer</span>
            </p>
          </div>
          <div className="grid gap-2">
            <Badge className="bg-white/15 text-white border-0 font-semibold">
              <Star className="mr-1 size-3" /> Hired in 3 months
            </Badge>
            <Badge className="bg-white/15 text-white border-0 font-semibold">₦9.5m package</Badge>
            <Badge className="bg-white/15 text-white border-0 font-semibold">
              Mentoring 2 learners
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stories.map((s) => (
          <Card key={s.name} className="bg-card shadow-soft border">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-xl text-xs font-extrabold text-white",
                    s.tone,
                  )}
                >
                  {s.initials}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold">{s.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {s.cohort} · {s.role}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mt-3 flex items-center gap-1.5 text-xs font-semibold">
                <BriefcaseBusiness className="size-3.5" /> {s.company}
              </p>
              <p className="mt-2 text-sm leading-relaxed">{s.excerpt}</p>
              <div className="mt-4 flex items-center gap-3 border-t pt-3">
                <Badge className="bg-success/10 text-success border-0 font-semibold">
                  <BadgeCheck className="mr-1 size-3" /> Verified
                </Badge>
                <Button variant="ghost" size="sm" className="text-primary ml-auto font-semibold">
                  <Heart className="size-3.5" /> Thank
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Send className="text-primary size-4" /> Share your journey
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              placeholder="What changed for you after CEA? Where are you working now? Write it here — the careers team will review and publish with your permission."
              className="min-h-32 border font-medium"
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-muted-foreground text-xs font-semibold">
                Published stories reach 40k+ learners, employers and partners.
              </p>
              <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
                <Sparkles className="size-3.5" /> Submit story
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Award className="text-primary size-4" /> Story milestones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { t: "Stories published", v: "214", icon: Rss },
              { t: "Companies represented", v: "86", icon: BriefcaseBusiness },
              { t: "Readers this quarter", v: "38k", icon: Users },
              { t: "Graduates hired via stories", v: "47", icon: GraduationCap },
            ].map((m) => (
              <div key={m.t} className="flex items-center justify-between rounded-xl border p-3">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <m.icon className="text-muted-foreground size-4" /> {m.t}
                </span>
                <span className="font-display text-lg font-extrabold">{m.v}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
