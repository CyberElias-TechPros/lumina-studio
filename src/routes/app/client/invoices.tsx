import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { AppShell } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/app/client/invoices")({
  head: () => ({
    meta: [
      { title: "Invoices & Payments — CEA-OS" },
      { name: "description", content: "Client invoices and payments." },
    ],
  }),
  component: ClientInvoices,
});

function ClientInvoices() {
  return (
    <AppShell roleKey="client" title="Invoices & payments" subtitle="Client workspace">
      <Card className="border">
        <CardContent className="space-y-4 p-6">
          <p role="status" className="text-sm text-muted-foreground">
            Online invoices and payment are unavailable here until client-specific invoices and
            payment amounts can be verified. Please contact the project team for payment details.
          </p>
          <Button asChild variant="outline">
            <Link to="/portal/client">Return to client portal</Link>
          </Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
