import { createFileRoute } from "@tanstack/react-router";
import { redirectPublic } from "@/lib/legacy-public";

export const Route = createFileRoute("/alumni")({
  beforeLoad: () => redirectPublic("/about"),
  component: () => null,
});
