/**
 * Public campus and course pictures.
 *
 * Campus files live in /public/images/campus/. Drop the real Ebony Road
 * classroom JPEGs over lab-1.jpg … lab-4.jpg — same names, no code change.
 * Course stills live in /public/images/courses/. Courses without a photo
 * use a distinct icon on the page (see CourseCover).
 */

export const campusPhotos = {
  "lab-1": {
    src: "/images/campus/lab-1.jpg",
    alt: "Computer classroom at Cyber Elias Academy, 26 Ebony Road, Port Harcourt: learners at desktop computers, whiteboard and wall screen.",
    caption: "The classroom",
  },
  "lab-2": {
    src: "/images/campus/lab-2.jpg",
    alt: "Practice desks, red chairs and a seating corner in the Ebony Road computer classroom.",
    caption: "Practice desks",
  },
  "lab-3": {
    src: "/images/campus/lab-3.jpg",
    alt: "Learners working at desktop computers during a class at Cyber Elias Academy.",
    caption: "A class in session",
  },
  "lab-4": {
    src: "/images/campus/lab-4.jpg",
    alt: "Whiteboard with computer-basics notes, wall screen, laptops and desktop PCs in the academy classroom.",
    caption: "Board and machines",
  },
} as const;

export type CampusPhotoId = keyof typeof campusPhotos;

export const campusGallery: { id: CampusPhotoId; caption: string }[] = [
  { id: "lab-1", caption: campusPhotos["lab-1"].caption },
  { id: "lab-2", caption: campusPhotos["lab-2"].caption },
  { id: "lab-3", caption: campusPhotos["lab-3"].caption },
  { id: "lab-4", caption: campusPhotos["lab-4"].caption },
];

/** Distinct photo for a course, if we have one. */
const COURSE_PHOTOS: Record<string, string> = {
  "microsoft-office": "/images/courses/microsoft-office.jpg",
  "computer-basics-typing": "/images/courses/computer-basics.jpg",
  "graphic-design": "/images/courses/graphic-design.jpg",
  "web-design": "/images/courses/web-development.jpg",
  "web-development": "/images/courses/web-development.jpg",
  "data-entry": "/images/courses/data-entry.jpg",
  "computer-repairs": "/images/courses/computer-repairs.jpg",
  "digital-marketing": "/images/courses/digital-marketing.jpg",
  "social-media-management": "/images/courses/social-media.jpg",
  cybersecurity: "/images/courses/cybersecurity.jpg",
  "business-freelancing": "/images/courses/business-freelancing.jpg",
  "content-creation": "/images/courses/content-creation.jpg",
  "online-teaching": "/images/courses/online-teaching.jpg",
  photography: "/images/courses/photography.jpg",
  "video-editing": "/images/courses/video-editing.jpg",
  wordpress: "/images/courses/wordpress.jpg",
  "data-analytics": "/images/courses/data-analytics.jpg",
  "digital-productivity": "/images/courses/microsoft-office.jpg",
  "ai-productivity": "/images/courses/data-analytics.jpg",
  "mobile-app-development": "/images/courses/web-development.jpg",
  "computer-networking": "/images/courses/computer-repairs.jpg",
  "it-support": "/images/courses/computer-repairs.jpg",
};

export function coursePhotoSrc(slug: string): string | undefined {
  return COURSE_PHOTOS[slug];
}

export type CourseIconName =
  | "office"
  | "keyboard"
  | "design"
  | "web"
  | "code"
  | "chart"
  | "share"
  | "table"
  | "wrench"
  | "shield"
  | "briefcase"
  | "video"
  | "teach"
  | "calendar"
  | "spark"
  | "phone"
  | "camera"
  | "film"
  | "globe"
  | "network"
  | "headset";

const COURSE_ICONS: Record<string, CourseIconName> = {
  "microsoft-office": "office",
  "computer-basics-typing": "keyboard",
  "graphic-design": "design",
  "web-design": "web",
  "web-development": "code",
  "digital-marketing": "chart",
  "social-media-management": "share",
  "data-entry": "table",
  "computer-repairs": "wrench",
  cybersecurity: "shield",
  "business-freelancing": "briefcase",
  "content-creation": "video",
  "online-teaching": "teach",
  "digital-productivity": "calendar",
  "ai-productivity": "spark",
  "mobile-app-development": "phone",
  photography: "camera",
  "video-editing": "film",
  wordpress: "globe",
  "data-analytics": "chart",
  "computer-networking": "network",
  "it-support": "headset",
};

export function courseIconName(slug: string): CourseIconName {
  return COURSE_ICONS[slug] ?? "office";
}
