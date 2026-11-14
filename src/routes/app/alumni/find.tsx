import { createFileRoute } from "@/lib/next-compat/route-definition";
import { AppShell } from "@/components/app/app-shell";
import { MentoringDirectory } from "@/components/mentoring/directory";
export const Route = createFileRoute("/app/alumni/find")({
  head: () => ({
    meta: [
      { title: "Find a Mentor — CEA-OS" },
      { name: "description", content: "Browse reviewed mentorship profiles." },
    ],
  }),
  component: AlumniFindMentor,
});
function AlumniFindMentor() {
  return (
    <AppShell roleKey="alumni" title="Find a mentor" subtitle="Reviewed mentorship directory">
      <MentoringDirectory />
    </AppShell>
  );
}
