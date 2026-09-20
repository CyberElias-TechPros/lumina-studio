import { createFileRoute } from "@tanstack/react-router";
import { redirectPublic } from "@/lib/legacy-public";

export const Route = createFileRoute("/career-guides/")({
  beforeLoad: () => redirectPublic("/classes"),
  component: () => null,
});
