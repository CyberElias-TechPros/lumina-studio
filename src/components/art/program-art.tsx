import { SceneArt } from "./scene-art";
import { programVariant } from "./program-variant";
import { cn } from "@/lib/utils";

export function ProgramArt({
  slug,
  className,
  interactive = false,
}: {
  slug: string;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <SceneArt
      variant={programVariant(slug)}
      className={cn(
        "transition-transform duration-500",
        interactive && "group-hover:scale-[1.06]",
        className,
      )}
    />
  );
}
