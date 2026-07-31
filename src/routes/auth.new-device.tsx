import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Laptop, MapPin, ShieldAlert, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/auth/new-device")({
  head: () => ({
    meta: [
      { title: "New device sign-in — CEA-OS | Cyber Elias Academy" },
      {
        name: "description",
        content: "A new device just signed in to your CEA-OS account. Verify it was you.",
      },
    ],
  }),
  component: NewDevicePage,
});

const devices = [
  {
    icon: Smartphone,
    name: "iPhone 15 · Safari",
    where: "Ikeja, Lagos · +234 801 **** 3456",
    when: "Just now",
    status: "This device",
    tone: "bg-success/10 text-success",
  },
  {
    icon: Laptop,
    name: "Windows 11 · Chrome",
    where: "Surulere, Lagos · 197.210.x.x",
    when: "Yesterday, 21:14",
    status: "Trusted",
    tone: "bg-muted-foreground/10 text-muted-foreground",
  },
  {
    icon: Laptop,
    name: "MacBook Pro · Firefox",
    where: "London, UK · 86.17.x.x",
    when: "Jun 4, 08:02",
    status: "Revoked",
    tone: "bg-error/10 text-error",
  },
];

function NewDevicePage() {
  return (
    <div className="bg-muted/40 relative grid min-h-screen place-items-center overflow-hidden px-4 py-16">
      <div className="bg-gradient-erp absolute -top-32 -left-32 size-96 rounded-full opacity-10 blur-3xl" />
      <div className="bg-gradient-community absolute -right-32 -bottom-32 size-96 rounded-full opacity-10 blur-3xl" />

      <div className="relative w-full max-w-lg">
        <Reveal>
          <Card className="bg-card shadow-elevated border">
            <CardContent className="p-6 sm:p-8">
              <span className="bg-error/10 text-error mx-auto grid size-14 place-items-center rounded-full">
                <ShieldAlert className="size-7" />
              </span>
              <h1 className="font-display mt-4 text-center text-xl font-extrabold">
                New device sign-in
              </h1>
              <p className="text-muted-foreground mt-2 text-center text-sm">
                Your account was just used to sign in from a device we don't recognise. If that was
                you, approve it. If it wasn't, lock your account now.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-xl border p-4">
                  <span className="bg-muted text-muted-foreground grid size-10 shrink-0 place-items-center rounded-lg">
                    <Smartphone className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">iPhone 15 · Safari</p>
                    <p className="text-muted-foreground flex items-center gap-1 text-xs">
                      <MapPin className="size-3" /> Ikeja, Lagos · just now
                    </p>
                  </div>
                  <span className="bg-warning/10 text-warning shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold">
                    New
                  </span>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-gradient-brand shadow-glow flex-1 border-0">
                    Yes, it was me <CheckCircle2 className="ml-1.5 size-4" />
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link to="/auth/mfa">
                      Secure my account <ArrowRight className="ml-1.5 size-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                  Your other devices
                </p>
                <div className="mt-3 space-y-2">
                  {devices.map((d) => (
                    <div key={d.name} className="flex items-center gap-3 rounded-xl border p-3.5">
                      <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                        <d.icon className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{d.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {d.where} · {d.when}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${d.tone}`}
                      >
                        {d.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-muted-foreground mt-6 text-center text-xs">
            We'll always alert you when a new device signs in — that's the CEA-OS promise.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
