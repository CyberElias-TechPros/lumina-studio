/**
 * Public campus and course pictures. Classroom stills are photographs
 * taken at 24/26 Ebony Road (grey room, wooden tables, red/orange chairs).
 * Course stills live in /public/images/courses/.
 */

export const campusPhotos = {
  "lab-1": {
    src: "/images/campus/lab-1.jpg",
    alt: "Class in session at Cyber Elias Academy, 24/26 Ebony Road: wooden tables, orange chairs, wall screen and whiteboard.",
    caption: "The classroom",
  },
  "lab-2": {
    src: "/images/campus/lab-2.jpg",
    alt: "Learners at laptops and desktops in the Ebony Road classroom, standing fan in the foreground.",
    caption: "Practice desks",
  },
  "lab-3": {
    src: "/images/campus/lab-3.jpg",
    alt: "Learners at computers during a class at 24/26 Ebony Road, Port Harcourt.",
    caption: "A class in session",
  },
  "lab-4": {
    src: "/images/campus/lab-4.jpg",
    alt: "Whiteboard, wall screen and desktop computers along the side of the academy classroom.",
    caption: "Board and machines",
  },
  "lab-5": {
    src: "/images/campus/lab-5.jpg",
    alt: "Learners in red and white at desktop computers facing the wall screen and whiteboard at 24/26 Ebony Road.",
    caption: "Lesson on the big screen",
  },
  "lab-6": {
    src: "/images/campus/lab-6.jpg",
    alt: "A smiling learner at an HP laptop among desktop rows in the Cyber Elias Academy classroom.",
    caption: "Hands-on practice",
  },
  "lab-7": {
    src: "/images/campus/lab-7.jpg",
    alt: "Learners working on laptops along wooden tables, with a sofa corner and standing fan in the classroom.",
    caption: "Full house",
  },
} as const;

export type CampusPhotoId = keyof typeof campusPhotos;

export const campusGallery: { id: CampusPhotoId; caption: string }[] = [
  { id: "lab-1", caption: campusPhotos["lab-1"].caption },
  { id: "lab-2", caption: campusPhotos["lab-2"].caption },
  { id: "lab-3", caption: campusPhotos["lab-3"].caption },
  { id: "lab-4", caption: campusPhotos["lab-4"].caption },
  { id: "lab-5", caption: campusPhotos["lab-5"].caption },
  { id: "lab-6", caption: campusPhotos["lab-6"].caption },
  { id: "lab-7", caption: campusPhotos["lab-7"].caption },
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
