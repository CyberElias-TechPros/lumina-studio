import { useState } from "react";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Photo component for real academy photography.
 *
 * If the photo file is missing (not yet uploaded to /public/images),
 * it renders a tasteful labelled fallback instead of a broken image —
 * so pages can be wired for real photos before the files land.
 */
export function SiteImage({
  src,
  alt,
  caption,
  className,
  imgClassName,
  eager = false,
  ratio = "aspect-[4/3]",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  ratio?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <figure className={cn("m-0", className)}>
        <div
          className={cn(
            ratio,
            "bg-muted/60 flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-dashed p-6 text-center",
          )}
        >
          <Camera className="text-muted-foreground/60 size-6" />
          <p className="text-muted-foreground max-w-xs text-xs leading-relaxed font-medium">
            {caption ?? alt}
          </p>
        </div>
        {caption && (
          <figcaption className="text-muted-foreground mt-2 text-center text-xs">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className={cn("m-0", className)}>
      <div className={cn(ratio, "overflow-hidden rounded-2xl border")}>
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className={cn("size-full object-cover", imgClassName)}
        />
      </div>
      {caption && (
        <figcaption className="text-muted-foreground mt-2 text-center text-xs">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Portrait with initials fallback — used for team members and
 * authors whose photo hasn't been uploaded yet.
 */
export function Portrait({
  src,
  name,
  className,
}: {
  src?: string | null;
  name: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  if (!src || failed) {
    return (
      <span
        aria-label={name}
        className={cn(
          "bg-primary/10 text-primary font-display grid shrink-0 place-items-center rounded-full font-bold",
          className,
        )}
      >
        {initials}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("shrink-0 rounded-full object-cover", className)}
    />
  );
}
