import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  Globe,
  Link2,
  ListChecks,
  PlaySquare,
  Plus,
  Save,
  Sparkles,
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
import { useInstructorCourses } from "@/lib/query/instructor";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/lessons/create")({
  head: () => ({
    meta: [
      { title: "Create Lesson — CEA-OS" },
      {
        name: "description",
        content: "Compose a new lesson with media, materials and publishing controls.",
      },
    ],
  }),
  component: LessonCreator,
});

const lessonTypes = [
  { v: "video", label: "Video lesson" },
  { v: "live", label: "Live class" },
  { v: "reading", label: "Reading" },
  { v: "lab", label: "Hands-on lab" },
];

function LessonCreator() {
  const coursesQuery = useInstructorCourses();
  const courses = coursesQuery.data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <AppShell
      roleKey="instructor"
      title="Create lesson"
      subtitle="Course builder · Backend & APIs · Module 4"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Draft autosaved
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/instructor">Cancel</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <BookOpen className="text-primary size-4" /> Lesson details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-bold tracking-wide uppercase">
                Lesson title
              </Label>
              <Input
                id="title"
                placeholder="e.g. Middleware & request lifecycle"
                className="border font-medium"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="course" className="text-xs font-bold tracking-wide uppercase">
                  Course
                </Label>
                <Select defaultValue={courses[0]?.id}>
                  <SelectTrigger id="course" className="border font-semibold">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.title}
                      </SelectItem>
                    ))}
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
                {lessonTypes.map((t) => (
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
                  placeholder="https://vimeo.com/cea/backend-4-3"
                  className="border pl-9 font-medium"
                />
              </div>
              <p className="text-muted-foreground text-xs">
                Vimeo or YouTube links only. Captions auto-pull from the source.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="materials" className="text-xs font-bold tracking-wide uppercase">
                Materials
              </Label>
              <Textarea
                id="materials"
                placeholder="Starter repo, checklist, reading list, homework brief…"
                className="min-h-32 border font-medium"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3.5">
              <div className="flex items-center gap-2.5">
                <span className="bg-success/10 text-success grid size-9 place-items-center rounded-lg">
                  <Globe className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-bold">Publish immediately</p>
                  <p className="text-muted-foreground text-xs">
                    Visible to learners as soon as it's saved
                  </p>
                </div>
              </div>
              <Switch defaultChecked aria-label="Publish immediately" />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-5">
              <Button variant="outline" size="sm" className="font-semibold">
                <Save className="size-3.5" /> Save draft
              </Button>
              <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
                <Plus className="size-3.5" /> Publish lesson
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
              <Badge variant="secondary" className="font-semibold">
                Draft
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
                <Badge className="bg-learning/10 text-learning border-0 font-semibold">
                  Lesson 4.3
                </Badge>
              </div>
              <div className="space-y-2.5 border-t pt-4">
                {[
                  "Video asset linked",
                  "Captions & transcript ready",
                  "Materials attached",
                  "Quiz link pending",
                ].map((i, idx) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold">
                    {idx === 3 ? (
                      <span className="bg-warning/10 text-warning grid size-5 place-items-center rounded-full">
                        <FileText className="size-3" />
                      </span>
                    ) : (
                      <CheckCircle2 className="text-success size-4 shrink-0" />
                    )}
                    <span className={idx === 3 ? "text-warning" : "text-muted-foreground"}>
                      {i}
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full font-semibold">
                <Sparkles className="size-3.5" /> Generate quiz from transcript
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <ListChecks className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Publishing checklist</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Lessons with a linked quiz retain 18% more learners. Add the checkpoint before
                publishing to Cohort 15.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
