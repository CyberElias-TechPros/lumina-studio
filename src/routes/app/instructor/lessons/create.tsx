"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useInstructorCourses, useCreateInstructorLesson } from "@/lib/query/instructor";
import { useGenerateContent } from "@/lib/query/ai";
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
  const [courseId, setCourseId] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"video" | "live" | "reading" | "lab">("video");
  const [videoUrl, setVideoUrl] = useState("");
  const [materials, setMaterials] = useState("");
  const [published, setPublished] = useState(true);
  const create = useCreateInstructorLesson(courseId);
  const generate = useGenerateContent();
  const selectedCourse = courses.find((course) => course.id === courseId);
  const selectedModule = selectedCourse?.modules.find((module) => module.id === moduleId);
  const typeLabel = lessonTypes.find((lessonType) => lessonType.v === type)?.label ?? "Lesson";
  const firstCourseId = courses[0]?.id;

  useEffect(() => {
    if (!courseId && firstCourseId) setCourseId(firstCourseId);
  }, [courseId, firstCourseId]);

  useEffect(() => {
    if (selectedCourse && !selectedCourse.modules.some((module) => module.id === moduleId)) {
      setModuleId(selectedCourse.modules[0]?.id ?? "");
    }
  }, [moduleId, selectedCourse]);

  const generateQuiz = () => {
    const topic = title.trim();
    if (!topic || generate.isPending) return;
    generate.mutate(
      { kind: "quiz", topic, audience: selectedCourse?.cohort ?? "your learners" },
      {
        onSuccess: (result) => {
          const questions =
            (result.content as { questions?: { prompt: string; options: string[] }[] }).questions ??
            [];
          if (questions.length === 0) {
            toast.info("Quiz draft generated", {
              description: "Review the AI output before publishing.",
            });
            return;
          }
          const draft = questions
            .map(
              (question, index) =>
                `${index + 1}. ${question.prompt}\n${question.options.map((option) => `- ${option}`).join("\n")}`,
            )
            .join("\n\n");
          setMaterials(
            (current) => `${current.trim()}${current.trim() ? "\n\n" : ""}Quiz draft\n${draft}`,
          );
          toast.success("Quiz draft added to materials", {
            description: "Review the generated questions before publishing.",
          });
        },
      },
    );
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const intent = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const shouldPublish = intent?.value === "publish" || (intent?.value !== "draft" && published);
    const trimmedTitle = title.trim();
    if (!courseId || !moduleId || !trimmedTitle || create.isPending) return;
    create.mutate(
      {
        moduleId,
        title: trimmedTitle,
        type,
        videoUrl: videoUrl.trim() || undefined,
        materials: materials.trim() || undefined,
        published: shouldPublish,
      },
      {
        onSuccess: (_, input) => {
          setTitle("");
          setVideoUrl("");
          setMaterials("");
          toast.success(input.published ? "Lesson published" : "Lesson saved as draft", {
            description: "The course outline has been updated.",
          });
        },
      },
    );
  };

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
          <form onSubmit={submit}>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs font-bold tracking-wide uppercase">
                  Lesson title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Middleware & request lifecycle"
                  className="border font-medium"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="course" className="text-xs font-bold tracking-wide uppercase">
                    Course
                  </Label>
                  <Select value={courseId} onValueChange={setCourseId}>
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
                  <Select value={moduleId} onValueChange={setModuleId}>
                    <SelectTrigger id="module" className="border font-semibold">
                      <SelectValue placeholder="Select module" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCourse?.modules.map((module) => (
                        <SelectItem key={module.id} value={module.id}>
                          {module.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2.5">
                <Label className="text-xs font-bold tracking-wide uppercase">Lesson type</Label>
                <RadioGroup
                  value={type}
                  onValueChange={(value) => setType(value as "video" | "live" | "reading" | "lab")}
                  className="grid gap-2 sm:grid-cols-2"
                >
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
                    type="url"
                    placeholder="https://vimeo.com/cea/backend-4-3"
                    className="border pl-9 font-medium"
                    value={videoUrl}
                    onChange={(event) => setVideoUrl(event.target.value)}
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
                  value={materials}
                  onChange={(event) => setMaterials(event.target.value)}
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
                <Switch
                  checked={published}
                  onCheckedChange={setPublished}
                  aria-label="Publish immediately"
                />
              </div>

              {create.isError && (
                <p className="text-error text-xs font-semibold" role="alert">
                  {create.error instanceof Error
                    ? create.error.message
                    : "We couldn't save this lesson. Try again."}
                </p>
              )}
              <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-5">
                <Button
                  type="submit"
                  name="intent"
                  value="draft"
                  variant="outline"
                  size="sm"
                  className="font-semibold"
                  disabled={create.isPending || !courseId || !moduleId || !title.trim()}
                >
                  <Save className="size-3.5" /> Save draft
                </Button>
                <Button
                  type="submit"
                  name="intent"
                  value="publish"
                  size="sm"
                  className="bg-gradient-brand shadow-glow border-0 font-semibold"
                  disabled={create.isPending || !courseId || !moduleId || !title.trim()}
                >
                  <Plus className="size-3.5" /> {create.isPending ? "Saving…" : "Publish lesson"}
                </Button>
              </div>
            </CardContent>
          </form>
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
                  {title.trim() || "Your lesson title"}
                </p>
                <p className="text-white/70 mt-0.5 text-xs">
                  {selectedModule?.title ?? "Select a module"} ·{" "}
                  {selectedCourse?.title ?? "Select a course"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/10 text-primary border-0 font-semibold">
                  <Video className="mr-1 size-3" /> {typeLabel}
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
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full font-semibold"
                onClick={generateQuiz}
                disabled={generate.isPending || !title.trim()}
              >
                <Sparkles className="size-3.5" />
                {generate.isPending ? "Generating quiz…" : "Generate quiz from lesson"}
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
