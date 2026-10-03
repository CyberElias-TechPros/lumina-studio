import { createFileRoute } from "@/lib/next-compat/route-definition";
import { redirectPublic } from "@/lib/legacy-public";

export const Route = createFileRoute("/virtual-tour")({
  beforeLoad: () => redirectPublic("/visit"),
  component: () => null,
});
