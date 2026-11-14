import { createFileRoute } from "@/lib/next-compat/route-definition";
import { AppShell } from "@/components/app/app-shell";
import { MentoringDirectory } from "@/components/mentoring/directory";
export const Route = createFileRoute("/app/mentorship")({
  head: () => ({
    meta: [
      { title: "Mentorship — CEA-OS" },
      { name: "description", content: "Browse reviewed mentorship profiles." },
    ],
  }),
  component: StudentMentorship,
});
function StudentMentorship() {
  return (
    <AppShell roleKey="student" title="Mentorship" subtitle="Reviewed mentorship directory">
      <MentoringDirectory />
    </AppShell>
  );
}
