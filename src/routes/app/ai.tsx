import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Bot,
  FileText,
  Lightbulb,
  Loader2,
  Send,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useAiRecommendations, useAskAssistant, useGenerateContent } from "@/lib/query/ai";
import type { AiRecommendation, GenerateInput } from "@/lib/api/ai";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ai")({
  head: () => ({
    meta: [
      { title: "AI Assistant — CEA-OS | Cyber Elias Academy" },
      { name: "description", content: "Ask the tutor, get recommendations and generate content." },
    ],
  }),
  component: AiPage,
});

const typeBadge: Record<AiRecommendation["type"], { label: string; className: string }> = {
  course: { label: "Course", className: "bg-primary/10 text-primary" },
  lesson: { label: "Lesson", className: "bg-primary/10 text-primary" },
  career: { label: "Career", className: "bg-success/10 text-success" },
  book: { label: "Reading", className: "bg-warning/10 text-warning" },
  practice: { label: "Practice", className: "bg-muted text-muted-foreground" },
};

function AiPage() {
  const recommendationsQuery = useAiRecommendations();

  return (
    <AppShell
      roleKey="student"
      title="AI Assistant"
      subtitle="Tutor, recommendations and content generation — powered by CEA-OS"
    >
      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <AskPanel />
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Lightbulb className="text-primary size-4" /> For you
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QueryState
              query={recommendationsQuery}
              isEmpty={(data) => (Array.isArray(data) ? data.length === 0 : false)}
              loading={
                <p className="text-muted-foreground py-10 text-center text-xs font-semibold">
                  Finding recommendations…
                </p>
              }
              empty={{
                title: "No recommendations yet",
                description: "Keep learning — insights appear as you progress.",
                icon: <Lightbulb className="size-8" />,
              }}
            >
              {() => (
                <div className="space-y-3">
                  {(recommendationsQuery.data ?? []).map((rec) => (
                    <a
                      key={rec.id}
                      href={rec.href ?? "#"}
                      className="bg-muted/40 group block rounded-xl border p-4 transition-colors hover:border-primary/30"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-display text-sm font-bold">{rec.title}</p>
                        <Badge
                          className={cn("border-0 font-semibold", typeBadge[rec.type].className)}
                        >
                          {typeBadge[rec.type].label}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-1.5 text-xs font-medium">
                        {rec.reason}
                      </p>
                      {rec.href && (
                        <p className="text-primary mt-2 flex items-center gap-1 text-[11px] font-bold">
                          Open{" "}
                          <ArrowRight className="group-hover:translate-x-0.5 size-3 transition-transform" />
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </QueryState>
          </CardContent>
        </Card>
      </div>

      <GeneratePanel />
    </AppShell>
  );
}

function AskPanel() {
  const [question, setQuestion] = useState("");
  const ask = useAskAssistant();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = question.trim();
    if (trimmed.length === 0 || ask.isPending) return;
    ask.mutate({ question: trimmed });
  };

  return (
    <Card className="bg-card shadow-soft border">
      <CardHeader>
        <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
          <Bot className="text-primary size-4" /> Ask the tutor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex gap-2" onSubmit={submit}>
          <Input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="e.g. How does a B-tree index speed up my queries?"
            className="text-xs"
          />
          <Button className="shrink-0" disabled={ask.isPending}>
            {ask.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </form>

        {ask.isError && (
          <p className="text-destructive mt-3 text-xs font-semibold">
            Something went wrong — try again.
          </p>
        )}

        {ask.data && (
          <div className="bg-muted/40 mt-4 rounded-xl border p-4">
            <p className="text-xs font-medium leading-relaxed">{ask.data.answer}</p>
            {ask.data.sources && ask.data.sources.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {ask.data.sources.map((source, index) => (
                  <Badge key={index} variant="secondary" className="text-[10px] font-semibold">
                    {source.href ? (
                      <a href={source.href} className="hover:underline">
                        {source.title}
                      </a>
                    ) : (
                      source.title
                    )}
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-muted-foreground mt-3 text-[10px] font-semibold">{ask.data.model}</p>
          </div>
        )}

        {!ask.data && !ask.isPending && !ask.isError && (
          <div className="text-muted-foreground mt-4 grid grid-cols-3 gap-2">
            {["Explain JOINs simply", "Plan my week to catch up", "Quiz me on indexes"].map(
              (suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setQuestion(suggestion);
                    ask.mutate({ question: suggestion });
                  }}
                  className="bg-muted/40 hover:border-primary/40 rounded-lg border p-2.5 text-left text-[11px] font-semibold transition-colors hover:bg-muted/60"
                >
                  {suggestion}
                </button>
              ),
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function GeneratePanel() {
  const [kind, setKind] = useState<GenerateInput["kind"]>("lesson");
  const [topic, setTopic] = useState("");
  const generate = useGenerateContent();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = topic.trim();
    if (trimmed.length === 0 || generate.isPending) return;
    generate.mutate({ kind, topic: trimmed, audience: "Cohort 15" });
  };

  return (
    <Card className="bg-card shadow-soft mt-5 border">
      <CardHeader>
        <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
          <Wand2 className="text-primary size-4" /> Generate content
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="flex flex-wrap items-center gap-2">
          <div className="bg-muted flex rounded-lg p-1">
            {(["lesson", "outline", "quiz"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setKind(option)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-bold capitalize transition-colors",
                  kind === option
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {option}
              </button>
            ))}
          </div>
          <Input
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="Topic, e.g. SQL window functions"
            className="min-w-56 flex-1 text-xs"
          />
          <Button className="shrink-0" disabled={generate.isPending}>
            {generate.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
          </Button>
        </form>

        {generate.data && (
          <div className="bg-muted/40 mt-4 space-y-4 rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-bold capitalize">
                {generate.data.kind} · {generate.data.topic}
              </p>
              <Badge variant="secondary" className="text-[10px] font-semibold">
                {generate.data.model}
              </Badge>
            </div>

            {generate.data.kind === "quiz" ? (
              <QuizContent content={generate.data.content} />
            ) : (
              <ContentSections content={generate.data.content} />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function QuizContent({ content }: { content: unknown }) {
  const quiz = content as {
    questions?: { prompt: string; options: string[]; answerIndex: number; explanation: string }[];
  };
  const questions = quiz.questions ?? [];
  if (questions.length === 0) return null;
  return (
    <div className="space-y-3">
      {questions.map((question, index) => (
        <div key={index} className="bg-card rounded-lg border p-3">
          <p className="text-xs font-bold">
            {index + 1}. {question.prompt}
          </p>
          <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {question.options.map((option, optionIndex) => (
              <p
                key={optionIndex}
                className={cn(
                  "rounded-md border px-2.5 py-1.5 text-[11px] font-semibold",
                  optionIndex === question.answerIndex
                    ? "border-success/50 bg-success/10 text-success"
                    : "bg-muted/50 text-muted-foreground",
                )}
              >
                {option}
              </p>
            ))}
          </div>
          <p className="text-muted-foreground mt-2 text-[11px] font-medium">
            {question.explanation}
          </p>
        </div>
      ))}
    </div>
  );
}

function ContentSections({ content }: { content: unknown }) {
  const doc = content as {
    intro?: string;
    sections?: { heading: string; body: string }[];
  };
  const sections = doc.sections ?? [];
  if (sections.length === 0) return null;
  return (
    <div className="space-y-3">
      {doc.intro && <p className="text-xs font-medium leading-relaxed">{doc.intro}</p>}
      {sections.map((section, index) => (
        <div key={index} className="bg-card rounded-lg border p-3">
          <p className="flex items-center gap-1.5 text-xs font-bold">
            <FileText className="text-primary size-3.5" /> {section.heading}
          </p>
          <p className="text-muted-foreground mt-1 text-[11px] font-medium leading-relaxed">
            {section.body}
          </p>
        </div>
      ))}
      <p className="text-muted-foreground flex items-center gap-1 text-[10px] font-semibold">
        <BookOpen className="size-3" /> Draft — review before publishing
      </p>
    </div>
  );
}
