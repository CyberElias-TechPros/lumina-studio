import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarCheck,
  Clock3,
  GraduationCap,
  HeartHandshake,
  Radio,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/alumni/mentorship")({
  head: () => ({
    meta: [
      { title: "Mentorship Sign-Up — CEA-OS" },
      {
        name: "description",
        content: "Offer your experience to current learners as an alumni mentor.",
      },
    ],
  }),
  component: AlumniMentorship,
});

const commitments = [
  {
    mentee: "Ada Okafor",
    track: "Backend specialisation",
    cadence: "Fortnightly 1:1",
    next: "Aug 21 · 16:00",
    status: "Active",
    tone: "bg-success/10 text-success",
  },
  {
    mentee: "Tobi Adeyemi",
    track: "DevOps",
    cadence: "Weekly group session",
    next: "Aug 22 · 11:00",
    status: "Active",
    tone: "bg-success/10 text-success",
  },
  {
    mentee: "Zainab Yusuf",
    track: "Product design",
    cadence: "Async messaging",
    next: "Ongoing",
    status: "Active",
    tone: "bg-primary/10 text-primary",
  },
];

function AlumniMentorship() {
  return (
    <AppShell
      roleKey="alumni"
      title="Mentorship sign-up"
      subtitle="Give back to Cohort 15 · matching opens Sep 1"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Available Wednesdays
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/alumni">
              <ArrowLeft className="size-4" /> Alumni portal
            </Link>
          </Button>
        </>
      }
    >
      <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
        <CardContent className="flex flex-wrap items-center gap-5 p-6">
          <span className="bg-ink-foreground/10 grid size-12 place-items-center rounded-2xl">
            <HeartHandshake className="size-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-extrabold">Give back as a mentor</p>
            <p className="text-ink-foreground/70 mt-1 max-w-xl text-sm">
              Cohort 12 alumni are mentoring 24 learners this term. Your experience at Flutterwave
              could be exactly what a stressed-out learner needs before demo day.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className="bg-white/15 text-white border-0 font-semibold">
                24 mentees matched this term
              </Badge>
              <Badge className="bg-white/15 text-white border-0 font-semibold">
                91% completion among mentored learners
              </Badge>
            </div>
          </div>
          <div className="grid gap-2">
            <Badge className="bg-warning/10 text-warning border-0 font-semibold">
              <Star className="mr-1 size-3" /> 4.9 rating
            </Badge>
            <Badge className="bg-success/10 text-success border-0 font-semibold">
              <BadgeCheck className="mr-1 size-3" /> 3 mentees hired
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Radio className="text-primary size-4" /> Your availability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="skills" className="text-xs font-bold tracking-wide uppercase">
                What can you mentor on?
              </Label>
              <Select defaultValue="backend">
                <SelectTrigger id="skills" className="border font-semibold">
                  <SelectValue placeholder="Select focus area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="backend">Backend & APIs</SelectItem>
                  <SelectItem value="system">System design</SelectItem>
                  <SelectItem value="interview">Interview prep</SelectItem>
                  <SelectItem value="career">Career switching</SelectItem>
                  <SelectItem value="frontend">Frontend & product</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hours" className="text-xs font-bold tracking-wide uppercase">
                  Weekly hours
                </Label>
                <Select defaultValue="3">
                  <SelectTrigger id="hours" className="border font-semibold">
                    <SelectValue placeholder="Select hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">Up to 2 hours</SelectItem>
                    <SelectItem value="3">Up to 3 hours</SelectItem>
                    <SelectItem value="5">Up to 5 hours</SelectItem>
                    <SelectItem value="10">Up to 10 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold tracking-wide uppercase">
                  Preferred format
                </Label>
                <RadioGroup defaultValue="video" className="flex flex-wrap gap-2">
                  {[
                    { v: "video", label: "1:1 video" },
                    { v: "group", label: "Group session" },
                    { v: "async", label: "Async chat" },
                    { v: "onsite", label: "Campus hours" },
                  ].map((f) => (
                    <label
                      key={f.v}
                      className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold",
                        "has-[:checked]:bg-primary/5 has-[:checked]:border-primary",
                      )}
                    >
                      <RadioGroupItem value={f.v} id={`fmt-${f.v}`} className="size-3.5" />
                      {f.label}
                    </label>
                  ))}
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-xs font-bold tracking-wide uppercase">
                Short mentor bio
              </Label>
              <Textarea
                id="bio"
                defaultValue="Backend engineer at Flutterwave. I help learners reason about APIs, auth and production readiness — and I'm brutal about clean commit messages."
                className="min-h-28 border font-medium"
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-5">
              <Button variant="outline" size="sm" className="font-semibold">
                Save draft
              </Button>
              <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
                <HeartHandshake className="size-3.5" /> Publish availability
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Users className="text-primary size-4" /> Active commitments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {commitments.map((c) => (
                <div key={c.mentee} className="rounded-xl border p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold">{c.mentee}</p>
                    <Badge className={cn("border-0 font-semibold", c.tone)}>{c.status}</Badge>
                  </div>
                  <p className="text-muted-foreground mt-0.5 text-xs">{c.track}</p>
                  <div className="text-muted-foreground mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock3 className="size-3" /> {c.cadence}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarCheck className="size-3" /> Next: {c.next}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardContent className="p-6">
              <Sparkles className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Mentor perks</p>
              <ul className="text-muted-foreground mt-2 space-y-1.5 text-sm">
                <li>Priority access to CEA hiring partners</li>
                <li>CEA mentor badge on your alumni profile</li>
                <li>Annual mentor summit in Lagos (Oct)</li>
              </ul>
              <Badge className="bg-learning/10 text-learning mt-4 border-0 font-semibold">
                <GraduationCap className="mr-1 size-3" /> Term ends Dec 18
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
