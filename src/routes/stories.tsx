import { createFileRoute } from "@tanstack/react-router";
import { redirectPublic } from "@/lib/legacy-public";

export const Route = createFileRoute("/stories")({
  beforeLoad: () => redirectPublic("/about"),
  component: () => null,
});
