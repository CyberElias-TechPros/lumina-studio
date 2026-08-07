import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  Eye,
  Link2,
  ListChecks,
  Pencil,
  PlaySquare,
  Save,
  Sparkles,
  Trash2,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useInsRevisions } from "@/lib/query/instructorExtras";
import type { InsRevision } from "@/lib/api/instructorExtras";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/lessons/edit/$id")({
  head: () => ({
    meta: [
      { title: "Edit Lesson — CEA-OS" },
      {
        name: "description",
        content: "Refine lesson content, materials and publishing state.",
      },
    ],
  }),
  component: LessonEditor,
});

function LessonEditor() {
  const { id } = Route.useParams();
  const revisionsQuery = useInsRevisions();

  return (
    <AppShell
      roleKey="instructor"
      title="Edit lesson"
      subtitle={`LSN-${id} · Middleware & request lifecycle · Backend & APIs`}
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">Draft</Badge>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Last saved 3m ago
          </Badge>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            <Save className="size-3.5" /> Save changes
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Pencil className="text-primary size-4" /> Lesson details
            </CardTitle>
            <Badge variant="secondary" className="font-semibold">
              Lesson 4.3 · 5 revisions
            </Badge>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-bold tracking-wide uppercase">
                Lesson title
              </Label>
              <Input
                id="title"
                defaultValue="Middleware & request lifecycle"
                className="border font-medium"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="course" className="text-xs font-bold tracking-wide uppercase">
                  Course
                </Label>
                <Select defaultValue="backend">
                  <SelectTrigger id="course" className="border font-semibold">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="backend">Backend & APIs</SelectItem>
                    <SelectItem value="frontend">Frontend Foundations</SelectItem>
                    <SelectItem value="design">Product Design</SelectItem>
                    <SelectItem value="devops">DevOps Essentials</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="module" className="text-xs font-bold tracking-wide uppercase">
                  Module
                </Label>
                <Select defaultValue="mod4">
                  <SelectTrigger id="module" className="border font-semibold">
                    <SelectValue placeholder="Select module" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mod3">Module 3 · SQL & data</SelectItem>
                    <SelectItem value="mod4">Module 4 · Authentication</SelectItem>
                    <SelectItem value="mod5">Module 5 · APIs in production</SelectItem>
                    <SelectItem value="mod6">Module 6 · Final project</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2.5">
              <Label className="text-xs font-bold tracking-wide uppercase">Lesson type</Label>
              <RadioGroup defaultValue="video" className="grid gap-2 sm:grid-cols-2">
                {[
                  { v: "video", label: "Video lesson" },
                  { v: "live", label: "Live class" },
                  { v: "reading", label: "Reading" },
                  { v: "lab", label: "Hands-on lab" },
                ].map((t) => (
                  <label
                    key={t.v}
                    className={cn(
                      "flex cursor-pointer items-center gap-2.5 rounded-xl border p-3 text-sm font-semibold",
                      "has-[:checked]:bg-primary/5 has-[:checked]:border-primary",
                    )}
                  >
                    <RadioGroupItem value={t.v} id={`type-${t.v}`} />
                    {t.label}
                  </label>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoUrl" className="text-xs font-bold tracking-wide uppercase">
                Video URL
              </Label>
              <div className="relative">
                <Link2 className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  id="videoUrl"
                  defaultValue="https://vimeo.com/cea/backend-4-3"
                  className="border pl-9 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="materials" className="text-xs font-bold tracking-wide uppercase">
                Materials
              </Label>
              <Textarea
                id="materials"
                defaultValue="Starter repo: cea/backend-4-3-lab

Checklist:
- Build a rate limiter with express-rate-limit
- Rotate refresh tokens in memory store
- Log every middleware step to the class dashboard

Reading: MDN — Express middleware
Homework: extend the lab with a CSRF guard before Friday."
                className="min-h-32 border font-medium"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3.5">
              <div className="flex items-center gap-2.5">
                <span className="bg-success/10 text-success grid size-9 place-items-center rounded-lg">
                  <Video className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-bold">Published to learners</p>
                  <p className="text-muted-foreground text-xs">
                    Live to Cohort 15 since Jul 28 — edits go out instantly
                  </p>
                </div>
              </div>
              <Switch defaultChecked aria-label="Published to learners" />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-5">
              <Button variant="outline" size="sm" className="text-error font-semibold">
                <Trash2 className="size-3.5" /> Discard
              </Button>
              <Button variant="outline" size="sm" className="font-semibold">
                <Eye className="size-3.5" /> Preview
              </Button>
              <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
                <Save className="size-3.5" /> Save changes
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Eye className="text-primary size-4" /> Lesson preview
              </CardTitle>
              <Badge className="bg-warning/10 text-warning border-0 font-semibold">
                Unpublished edits
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-brand shadow-glow relative overflow-hidden rounded-xl p-4 text-white">
                <PlaySquare className="size-5" />
                <p className="font-display mt-2 text-sm font-extrabold">
                  Middleware & request lifecycle
                </p>
                <p className="text-white/70 mt-0.5 text-xs">
                  Module 4 · Authentication · Backend & APIs
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/10 text-primary border-0 font-semibold">
                  <Video className="mr-1 size-3" /> Video lesson
                </Badge>
                <Badge className="bg-warning/10 text-warning border-0 font-semibold">
                  <Clock3 className="mr-1 size-3" /> ~24 min
                </Badge>
                <Badge className="bg-success/10 text-success border-0 font-semibold">
                  <CheckCircle2 className="mr-1 size-3" /> Quiz linked
                </Badge>
              </div>
              <div className="space-y-2.5 border-t pt-4">
                {[
                  { t: "Video asset linked", ok: true },
                  { t: "Captions & transcript ready", ok: true },
                  { t: "Materials attached", ok: true },
                  { t: "Quiz link — REST API Quiz 3", ok: true },
                ].map((i) => (
                  <div key={i.t} className="flex items-center gap-2 text-xs font-semibold">
                    <CheckCircle2 className="text-success size-4 shrink-0" />
                    <span className="text-muted-foreground">{i.t}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full font-semibold">
                <Sparkles className="size-3.5" /> Regenerate quiz from transcript
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <ListChecks className="text-primary size-4" /> Revision history
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <QueryState<InsRevision[]>
                query={revisionsQuery}
                error={{ title: "Failed to load revisions" }}
                empty={{ title: "No revisions yet" }}
                isEmpty={(rows) => rows.length === 0}
              >
                {(revisions) =>
                  revisions.map((r) => (
                    <div
                      key={r.id}
                      className="flex flex-wrap items-center gap-3 rounded-xl border p-3"
                    >
                      <span className="bg-primary/10 text-primary grid size-8 place-items-center rounded-lg text-xs font-extrabold">
                        {r.version}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold">{r.title}</p>
                        <p className="text-muted-foreground text-[11px]">
                          {r.author} · {r.dateLabel}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary font-semibold">
                        Restore
                      </Button>
                    </div>
                  ))
                }
              </QueryState>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
