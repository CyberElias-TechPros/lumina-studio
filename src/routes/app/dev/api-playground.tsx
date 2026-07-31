import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Braces, Code2, Play, Save, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dev/api-playground")({
  head: () => ({
    meta: [
      { title: "API Playground — CEA-OS" },
      { name: "description", content: "Test endpoints against the OpenAPI spec." },
    ],
  }),
  component: DevApiPlayground,
});

const endpoints = [
  { e: "GET /api/v1/students", d: "List students", tone: "bg-primary/10 text-primary" },
  { e: "POST /api/v1/applications", d: "Create application", tone: "bg-learning/10 text-learning" },
  { e: "GET /api/v1/finance/invoices", d: "List invoices", tone: "bg-success/10 text-success" },
];

function DevApiPlayground() {
  return (
    <AppShell
      roleKey="instructor"
      title="API playground"
      subtitle="OpenAPI 3.1 · 84 endpoints · sandbox token active"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">200 OK</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/dev">
              <ArrowLeft className="size-4" /> Dev hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Braces className="text-primary size-4" /> Endpoints
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {endpoints.map((e) => (
              <div key={e.e} className="flex items-center justify-between rounded-xl border p-3">
                <div>
                  <p className="font-mono text-xs font-bold">{e.e}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{e.d}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", e.tone)}>Try it</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Code2 className="text-primary size-4" /> Request
            </CardTitle>
            <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
              <Play className="size-3.5" /> Send
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-muted rounded-xl p-3">
              <p className="font-mono text-xs">
                GET /api/v1/students?cohort=16
                <br />
                Authorization: Bearer sandbox_•••••••
              </p>
            </div>
            <textarea
              className="bg-muted placeholder:text-muted-foreground min-h-28 w-full resize-none rounded-xl border-0 p-3 font-mono text-xs outline-none"
              defaultValue={'{\n  "status": 200,\n  "data": [ ... 64 students ]\n}'}
            />
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" className="font-semibold">
                <Save className="size-3.5" /> Save request
              </Button>
              <Button variant="outline" size="sm" className="font-semibold">
                <Send className="size-3.5" /> Export cURL
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
