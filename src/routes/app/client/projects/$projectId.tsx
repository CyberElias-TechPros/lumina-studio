import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { AppShell } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/app/client/projects/$projectId")({
  head: () => ({
    meta: [
      { title: "Project Dashboard — CEA-OS" },
      { name: "description", content: "Client project details." },
    ],
  }),
  component: ClientProject,
});

function ClientProject() {
  return (
    <AppShell roleKey="client" title="Project details" subtitle="Client workspace">
      <Card className="border">
        <CardContent className="space-y-4 p-6">
          <p role="status" className="text-sm text-muted-foreground">
            Project details are unavailable here until this page is connected to verified,
            project-specific records. Please contact the project team for an update.
          </p>
          <Button asChild variant="outline">
            <Link to="/portal/client">Return to client portal</Link>
          </Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
