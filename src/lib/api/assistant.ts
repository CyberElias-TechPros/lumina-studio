import { apiFetch } from "@/lib/api/client";

/** Public site assistant — see backend/src/routes/assistant.ts */

export interface AssistantTurn {
  role: "user" | "assistant";
  content: string;
}

export interface AssistantIntro {
  enabled: boolean;
  greeting: string;
  suggestions: readonly string[];
  whatsapp: string;
  helpEmail: string;
}

export interface AssistantReply {
  answer: string;
  /** True when the model was unavailable — the UI shows a "preview" note. */
  mock: boolean;
  disabled?: boolean;
  budgetExhausted?: boolean;
}

export function fetchAssistantIntro(): Promise<AssistantIntro> {
  return apiFetch<AssistantIntro>("/v1/assistant/intro");
}

export function askAssistant(messages: AssistantTurn[]): Promise<AssistantReply> {
  return apiFetch<AssistantReply>("/v1/assistant/chat", {
    method: "POST",
    body: { messages },
  });
}

/** Pre-filled WhatsApp deep link, carrying the visitor's last question. */
export function whatsappHref(question: string, whatsapp: string): string {
  const text = question.trim()
    ? `Hi, I was asking on cea.ng: "${question.trim().slice(0, 200)}"`
    : "Hi, I have a question about your courses.";
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
}
