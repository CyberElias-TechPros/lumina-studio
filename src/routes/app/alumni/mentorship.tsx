import { createFileRoute } from "@/lib/next-compat/route-definition";
import { AppShell } from "@/components/app/app-shell";
import { MentoringProfileEditor } from "@/components/mentoring/profile-editor";
import { MentoringRequests } from "@/components/mentoring/requests";
export const Route = createFileRoute("/app/alumni/mentorship")({
  head: () => ({
    meta: [
      { title: "Mentorship — CEA-OS" },
      { name: "description", content: "Manage your mentoring profile and requests." },
    ],
  }),
  component: AlumniMentorship,
});
function AlumniMentorship() {
  return (
    <AppShell roleKey="alumni" title="Offer mentorship" subtitle="Manage your profile and requests">
      <div className="space-y-5">
        <MentoringProfileEditor />
        <MentoringRequests direction="incoming" />
      </div>
    </AppShell>
  );
}
