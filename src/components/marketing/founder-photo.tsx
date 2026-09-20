import { useState } from "react";
import { NOTES_AUTHOR } from "@/data/blog";
import { cn } from "@/lib/utils";

export function FounderPhoto({
  className,
  alt = "Ellis Dennis Graham, founder of Cyber Elias Academy",
}: {
  className?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={cn(
          "bg-muted text-foreground font-display grid place-items-center rounded-lg text-lg font-semibold",
          className,
        )}
        aria-label={alt}
      >
        EDG
      </div>
    );
  }
  return (
    <img
      src={NOTES_AUTHOR.photo}
      alt={alt}
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
