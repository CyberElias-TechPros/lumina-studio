import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Image, Library, MessagesSquare, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/partner/resources")({
  head: () => ({
    meta: [
      { title: "Resources — CEA-OS" },
      { name: "description", content: "Co-branded materials, logos and templates." },
    ],
  }),
  component: PartnerResources,
});

const resources = [
  {
    r: "Co-branded logo kit",
    t: "PNG · SVG · 12 assets",
    icon: Palette,
    tone: "bg-primary/10 text-primary",
  },
  {
    r: "Program flyer templates",
    t: "Figma · 4 sizes",
    icon: Image,
    tone: "bg-learning/10 text-learning",
  },
  {
    r: "Partner brand guidelines",
    t: "PDF · v2.1",
    icon: Library,
    tone: "bg-success/10 text-success",
  },
  {
    r: "Email banner set",
    t: "PNG · 6 variants",
    icon: MessagesSquare,
    tone: "bg-warning/10 text-warning",
  },
];

function PartnerResources() {
  return (
    <AppShell
      roleKey="student"
      title="Resources"
      subtitle="Co-branded materials · updated Aug 1"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">24 assets</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/partner/hub">
              <ArrowLeft className="size-4" /> Partner hub
            </Link>
          </Button>
        </>
      }
    >
      <Card className="bg-card shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Library className="text-primary size-4" /> Brand & content kit
          </CardTitle>
          <Button variant="outline" size="sm" className="font-semibold">
            <Download className="size-3.5" /> Download all
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {resources.map((r) => (
            <div key={r.r} className="group flex flex-col rounded-xl border p-4">
              <span className={cn("grid size-9 place-items-center rounded-lg", r.tone)}>
                <r.icon className="size-4" />
              </span>
              <p className="mt-3 text-sm font-bold">{r.r}</p>
              <p className="text-muted-foreground mt-0.5 text-xs">{r.t}</p>
              <Button variant="ghost" size="sm" className="mt-3 justify-start px-0 font-semibold">
                <Download className="size-3.5" /> Download
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
