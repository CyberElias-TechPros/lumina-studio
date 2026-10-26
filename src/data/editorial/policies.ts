/**
 * Standing notices that attach to whole subject areas rather than single pages.
 *
 * The security notice exists for two reasons that happen to coincide: it is the
 * right thing to teach, and AdSense restricts instructional material that could
 * be read as a guide to unauthorised access. A visible, per-page boundary is the
 * honest way to hold both.
 */

export type StandingNotice = {
  id: string;
  title: string;
  body: string;
  points: string[];
};

const SECURITY_NOTICE: StandingNotice = {
  id: "ethical-use",
  title: "Authorised, defensive use only",
  body: "These lessons teach a person to protect their own accounts, devices and networks — or systems they have been given written permission to test. Nothing on this page authorises access to anyone else's device, account or data.",
  points: [
    "Only test your own equipment, or systems where the owner has agreed in writing.",
    "If you find a weakness in someone else's system, stop and report it to them; do not explore it.",
    "Never use these skills to access, copy, disrupt or damage another person's data.",
    "In Nigeria, unauthorised access to a computer system or data is a criminal offence under the Cybercrimes Act 2015.",
  ],
};

/** Courses whose material sits inside the security notice. */
const SECURITY_COURSE_MATCHERS = [/cyber/i, /security/i, /ethical.?hacking/i, /penetration/i];
const SECURITY_CATEGORIES = [/security/i];

export function standingNoticeFor(input: {
  courseSlug?: string | null;
  category?: string | null;
}): StandingNotice | null {
  const slug = input.courseSlug ?? "";
  const category = input.category ?? "";
  const isSecurity =
    SECURITY_COURSE_MATCHERS.some((re) => re.test(slug)) ||
    SECURITY_CATEGORIES.some((re) => re.test(category));
  return isSecurity ? SECURITY_NOTICE : null;
}

export { SECURITY_NOTICE };
