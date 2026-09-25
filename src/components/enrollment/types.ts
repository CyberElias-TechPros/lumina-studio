export interface EnrollmentDraft {
  // step 1 — program
  programSlug: string;
  programKind: "short" | "long" | null;
  // step 2 — schedule
  scheduleDays: "standard" | "mwf" | "tss";
  timeSlot: "morning" | "afternoon" | "evening" | "any";
  mode: "onsite" | "online" | "hybrid";
  preferredStart: string;
  // step 3 — payment
  paymentPlan: "full" | "50-50" | "deposit-monthly" | "full-10-off";
  paymentMethod: "paystack" | "bank-transfer";
  // step 4 — details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  birthYear: string;
  gender: "" | "female" | "male" | "other" | "prefer-not";
  educationLevel: string;
  experienceLevel: string;
  goal: string;
  employer: string;
  hasLaptop: boolean;
  referredBy: string;
  // step 5 — consent + anti-abuse
  consentPrivacy: boolean;
  consentTerms: boolean;
  consentWhatsApp: boolean;
}

export const INITIAL_DRAFT: EnrollmentDraft = {
  programSlug: "",
  programKind: null,
  scheduleDays: "standard",
  timeSlot: "any",
  mode: "onsite",
  preferredStart: "",
  paymentPlan: "full",
  paymentMethod: "paystack",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  birthYear: "",
  gender: "",
  educationLevel: "",
  experienceLevel: "",
  goal: "",
  employer: "",
  hasLaptop: true,
  referredBy: "",
  consentPrivacy: false,
  consentTerms: false,
  consentWhatsApp: false,
};

export const EDUCATION_LEVELS = [
  "Below SSCE",
  "SSCE / O'Level",
  "ND / HND",
  "Bachelor's degree",
  "Master's degree",
  "Other",
];

export const EXPERIENCE_LEVELS = [
  "No experience",
  "Some experience (less than 1 year)",
  "1–3 years",
  "3+ years",
];

export const CITIES = [
  "Port Harcourt",
  "Warri",
  "Lagos",
  "Abuja",
  "Ibadan",
  "Kano",
  "Other (Nigeria)",
  "Outside Nigeria",
];

export const REFERRAL_SOURCES = [
  "Friend or family",
  "Social media",
  "Search (Google)",
  "WhatsApp",
  "Academy website/blog",
  "Walk-in / visit",
  "Other",
];
