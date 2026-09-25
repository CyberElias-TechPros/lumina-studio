import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useInstructorCourses, usePublishAssignment } from "@/lib/query/instructor";
import { ApiError } from "@/lib/errors";

/** Convert a `datetime-local` value, interpreted as Lagos time (UTC+1, no DST), to ISO UTC. */
export function watLocalToIso(local: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(local);
  if (!m) return null;
  const [, y, mo, d, h, mi] = m.map(Number);
  return new Date(Date.UTC(y, mo - 1, d, h - 1, mi)).toISOString();
}

export function PublishAssignmentDialog() {
  const [open, setOpen] = useState(false);
  const courses = useInstructorCourses();
  const courseList = courses.data?.pages.flatMap((p) => p.items) ?? [];
  const publish = usePublishAssignment();
  const [form, setForm] = useState({
    courseSlug: "",
    title: "",
    description: "",
    due: "",
    max: "100",
    weight: "0",
    notify: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.courseSlug) next.courseSlug = "Choose a course.";
    if (form.title.trim().length < 3) next.title = "Title must be at least 3 characters.";
    const dueAt = watLocalToIso(form.due);
    if (!dueAt) next.dueAt = "Pick a due date and time.";
    else if (dueAt <= new Date().toISOString()) next.dueAt = "The due date must be in the future.";
    setErrors(next);
    if (Object.keys(next).length || !dueAt) return;
    try {
      const res = await publish.mutateAsync({
        courseSlug: form.courseSlug,
        title: form.title.trim(),
        description: form.description.trim(),
        dueAt,
        max: Number(form.max) || 100,
        weight: Number(form.weight) || 0,
        notify: form.notify,
      });
      toast.success(
        res.recipients === 0
          ? "Published — no students are enrolled in this course yet."
          : `Published to ${res.recipients} student${res.recipients === 1 ? "" : "s"} · due ${res.due} WAT`,
      );
      setOpen(false);
      setForm((f) => ({ ...f, title: "", description: "", due: "" }));
    } catch (err) {
      if (err instanceof ApiError && Object.keys(err.fieldErrors).length) {
        setErrors(
          Object.fromEntries(
            Object.entries(err.fieldErrors).map(([k, v]) => [
              k,
              Array.isArray(v) ? (v[0] ?? "") : String(v),
            ]),
          ),
        );
      } else {
        toast.error(err instanceof Error ? err.message : "Could not publish the assignment.");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="font-semibold">
          <Plus className="mr-1.5 size-3.5" /> Publish assignment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={onSubmit} noValidate>
          <DialogHeader>
            <DialogTitle>Publish assignment</DialogTitle>
            <DialogDescription>
              Every student enrolled in the course gets it, with reminders 24 hours and 1 hour
              before the deadline.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="pa-course">Course</Label>
              <select
                id="pa-course"
                className="border-input bg-background h-9 rounded-md border px-3 text-sm"
                value={form.courseSlug}
                onChange={(e) => set("courseSlug", e.target.value)}
                aria-invalid={Boolean(errors.courseSlug)}
              >
                <option value="">
                  {courses.isLoading ? "Loading courses…" : "Choose a course"}
                </option>
                {courseList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                    {c.cohort ? ` · ${c.cohort}` : ""}
                  </option>
                ))}
              </select>
              {errors.courseSlug && <p className="text-error text-xs">{errors.courseSlug}</p>}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="pa-title">Title</Label>
              <Input
                id="pa-title"
                value={form.title}
                maxLength={200}
                onChange={(e) => set("title", e.target.value)}
                aria-invalid={Boolean(errors.title)}
              />
              {errors.title && <p className="text-error text-xs">{errors.title}</p>}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="pa-desc">Brief (optional)</Label>
              <Textarea
                id="pa-desc"
                rows={4}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="grid gap-1.5 sm:col-span-3">
                <Label htmlFor="pa-due">Due (Lagos time, WAT)</Label>
                <Input
                  id="pa-due"
                  type="datetime-local"
                  value={form.due}
                  onChange={(e) => set("due", e.target.value)}
                  aria-invalid={Boolean(errors.dueAt)}
                />
                {errors.dueAt && <p className="text-error text-xs">{errors.dueAt}</p>}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="pa-max">Max score</Label>
                <Input
                  id="pa-max"
                  type="number"
                  min={1}
                  max={1000}
                  value={form.max}
                  onChange={(e) => set("max", e.target.value)}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="pa-weight">Weight %</Label>
                <Input
                  id="pa-weight"
                  type="number"
                  min={0}
                  max={100}
                  value={form.weight}
                  onChange={(e) => set("weight", e.target.value)}
                />
              </div>
              <label className="flex items-end gap-2 pb-2 text-sm font-medium">
                <Switch checked={form.notify} onCheckedChange={(v) => set("notify", v)} />
                Notify now
              </label>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={publish.isPending}>
              {publish.isPending ? "Publishing…" : "Publish"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
