import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, Bot, HelpCircle, MessageSquareText, Repeat } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { fetchAssistantDigest, type AssistantDigest } from "@/lib/api/operations";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/assistant-insights")({
  head: () => ({
    meta: [
      { title: "Assistant insights — CEA-OS" },
      {
        name: "description",
        content:
          "What visitors ask the site assistant, and the questions it had to hand to a human.",
      },
    ],
  }),
  component: AssistantInsights,
});

const RANGES = [7, 30, 90] as const;

function AssistantInsights() {
  const [days, setDays] = useState<(typeof RANGES)[number]>(7);
  const query = useQuery({
    queryKey: ["assistant-digest", days],
    queryFn: () => fetchAssistantDigest(days),
  });

  return (
    <AppShell
      roleKey="admin"
      title="Assistant insights"
      subtitle="The questions visitors ask — and the ones the bot could not answer"
      actions={
        <div className="flex gap-1">
          {RANGES.map((range) => (
            <Button
              key={range}
              size="sm"
              variant={days === range ? "default" : "outline"}
              className="font-semibold"
              onClick={() => setDays(range)}
            >
              {range === 7 ? "7 days" : range === 30 ? "30 days" : "90 days"}
            </Button>
          ))}
        </div>
      }
    >
      <QueryState
        query={query}
        isEmpty={(data: AssistantDigest) => data.asked === 0}
        empty={{
          icon: "data",
          title: "No questions yet",
          description:
            "Once visitors start using the assistant on the site, their questions show up here — including the ones it could not answer.",
        }}
      >
        {(data: AssistantDigest) => (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Questions asked", value: data.asked, icon: MessageSquareText },
                { label: "Handed to a human", value: data.fallbacks, icon: HelpCircle },
                { label: "Repeated questions", value: data.topRepeated.length, icon: Repeat },
              ].map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="flex items-center gap-4 p-5">
                    <span className="bg-primary/10 text-primary grid size-10 place-items-center rounded-lg">
                      <stat.icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-display text-2xl font-extrabold">{stat.value}</p>
                      <p className="text-muted-foreground text-xs font-medium">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Repeat className="text-primary size-4" /> Asked more than once
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {data.topRepeated.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      No repeats in this window — every question so far was unique.
                    </p>
                  ) : (
                    data.topRepeated.map((item) => (
                      <div
                        key={item.question}
                        className="flex items-start justify-between gap-3 rounded-lg border px-3 py-2"
                      >
                        <p className="text-sm">{item.question}</p>
                        <Badge variant="secondary" className="shrink-0 text-[11px]">
                          ×{item.count}
                        </Badge>
                      </div>
                    ))
                  )}
                  <p className="text-muted-foreground pt-2 text-[11px]">
                    A question asked three times is a page that needs fixing — or an FAQ entry.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-warning/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <HelpCircle className="text-warning size-4" /> Could not answer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <QueryState
                    query={query}
                    isEmpty={(d: AssistantDigest) => d.unanswered.length === 0}
                    empty={{
                      icon: "check",
                      title: "Nothing fell through",
                      description: "Every question in this window got a real answer.",
                    }}
                  >
                    {(d: AssistantDigest) =>
                      d.unanswered.map((item, i) => (
                        <div key={`${item.createdAt}-${i}`} className="rounded-lg border px-3 py-2">
                          <p className="text-sm">{item.question}</p>
                          <p className="text-muted-foreground mt-1 text-[11px]">
                            {item.page ?? "site"} · {item.createdAt.slice(0, 16).replace("T", " ")}
                          </p>
                        </div>
                      ))
                    }
                  </QueryState>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Bot className="text-primary size-4" /> Recent questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {data.recent.map((item, i) => (
                  <div
                    key={`${item.createdAt}-${i}`}
                    className={cn(
                      "flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2",
                      item.fallback && "border-warning/40 bg-warning/5",
                    )}
                  >
                    <p className="text-sm">{item.question}</p>
                    <span className="text-muted-foreground text-[11px]">
                      {item.page ?? "site"} · {item.createdAt.slice(0, 16).replace("T", " ")}
                      {item.fallback ? " · handed to a human" : ""}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-muted/40">
              <CardContent className="p-5">
                <p className="flex items-center gap-2 text-sm font-bold">
                  <BarChart3 className="size-4" /> How to use this
                </p>
                <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                  Set aside ten minutes a week: read the repeated questions, then either add the
                  answer to the course page or the FAQ. The assistant reads the same facts, so the
                  next visitor gets the answer without you typing it.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </QueryState>
    </AppShell>
  );
}
