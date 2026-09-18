import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Briefcase,
  Calendar,
  Camera,
  Clapperboard,
  FileSpreadsheet,
  Globe,
  GraduationCap,
  Headset,
  Keyboard,
  Monitor,
  Network,
  Palette,
  Share2,
  Shield,
  Smartphone,
  Sparkles,
  Video,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  campusPhotos,
  courseIconName,
  coursePhotoSrc,
  type CampusPhotoId,
  type CourseIconName,
} from "@/data/academy/media";

const ICONS: Record<CourseIconName, LucideIcon> = {
  office: FileSpreadsheet,
  keyboard: Keyboard,
  design: Palette,
  web: Monitor,
  code: Monitor,
  chart: BarChart3,
  share: Share2,
  table: FileSpreadsheet,
  wrench: Wrench,
  shield: Shield,
  briefcase: Briefcase,
  video: Video,
  teach: GraduationCap,
  calendar: Calendar,
  spark: Sparkles,
  phone: Smartphone,
  camera: Camera,
  film: Clapperboard,
  globe: Globe,
  network: Network,
  headset: Headset,
};

export function CampusImg({
  id,
  className,
  eager = false,
}: {
  id: CampusPhotoId;
  className?: string;
  eager?: boolean;
}) {
  const photo = campusPhotos[id];
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      className={cn("h-full w-full object-cover", className)}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

export function CourseCover({
  slug,
  className,
}: {
  slug: string;
  title?: string;
  className?: string;
}) {
  const photo = coursePhotoSrc(slug);
  if (photo) {
    return (
      <img
        src={photo}
        alt=""
        className={cn("h-full w-full object-cover", className)}
        loading="lazy"
        decoding="async"
      />
    );
  }
  const Icon = ICONS[courseIconName(slug)];
  return (
    <div
      className={cn("bg-muted flex h-full w-full items-center justify-center", className)}
      aria-hidden="true"
    >
      <Icon className="text-primary size-9" strokeWidth={1.4} />
    </div>
  );
}

export function CourseIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Icon = ICONS[courseIconName(slug)];
  return <Icon className={cn("size-4", className)} strokeWidth={1.6} aria-hidden="true" />;
}
