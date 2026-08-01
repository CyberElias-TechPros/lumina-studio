/* ---------------- Marketing ---------------- */

export const marketingKpis = [
  { page: "hub", label: "Leads (MTD)", value: "412", delta: "+11% MoM" },
  { page: "hub", label: "CAC", value: "₦96k", delta: "target ₦90k" },
  { page: "hub", label: "ROAS", value: "4.2x", delta: "target 5x" },
  { page: "hub", label: "Spend (MTD)", value: "₦1.4m", delta: "on budget" },
  { page: "campaigns", label: "Budget used", value: "71%", delta: "of ₦2.0m" },
  { page: "analytics", label: "CAC", value: "₦96k", delta: "target ₦90k" },
  { page: "analytics", label: "ROAS", value: "4.2x", delta: "target 5x" },
  { page: "analytics", label: "CPL", value: "₦3.4k", delta: "−8% MoM" },
  { page: "analytics", label: "Attributed", value: "64", delta: "enrollments" },
  { page: "content", label: "Next week", value: "5", delta: "planned" },
  { page: "email", label: "Subscribers", value: "12k", delta: "+8% this month" },
  { page: "email", label: "Open rate", value: "71%", delta: "vs 45% bench" },
  { page: "email", label: "Click rate", value: "6.2%", delta: "vs 2.5% bench" },
  { page: "landing", label: "Avg. conversion", value: "4.4%", delta: "target 5%" },
  { page: "landing", label: "Templates", value: "8", delta: "in builder" },
  { page: "leads", label: "Total", value: "412", delta: "+11% MoM" },
  { page: "leads", label: "Hot (90+)", value: "96", delta: "routed to admissions" },
  { page: "leads", label: "Warm (70–89)", value: "148", delta: "nurture sequence" },
  { page: "leads", label: "Cool (<70)", value: "168", delta: "newsletter only" },
  { page: "reports", label: "Leads", value: "412", delta: "+11% MoM" },
  { page: "reports", label: "Spend", value: "₦1.4m", delta: "71% of budget" },
  { page: "reports", label: "ROAS", value: "4.2x", delta: "target 5x" },
  { page: "reports", label: "Reports (30d)", value: "3", delta: "all delivered" },
  { page: "seo", label: "Keywords", value: "48", delta: "12 in top 3" },
  { page: "seo", label: "Avg. position", value: "7.2", delta: "+0.8 this month" },
  { page: "seo", label: "Organic traffic", value: "+18%", delta: "vs last month" },
  { page: "seo", label: "Page 1 rankings", value: "21", delta: "44% of tracked" },
  { page: "social", label: "Followers", value: "32k", delta: "+4% MoM" },
  { page: "social", label: "Engagement", value: "6.8%", delta: "+1.4 pts" },
  { page: "social", label: "Posts (30d)", value: "24", delta: "6 per channel" },
  { page: "social", label: "Shares", value: "1.2k", delta: "top: alumni story" },
];

export const campaigns = [
  {
    name: "Q3 digital ads",
    channel: "Meta + Google",
    spend: 420000,
    leads: 96,
    roas: 4.2,
    status: "Live",
  },
  {
    name: "Referral program",
    channel: "In-app + email",
    spend: 180000,
    leads: 64,
    roas: 6.8,
    status: "Live",
  },
  {
    name: "Open-house events",
    channel: "Offline + social",
    spend: 250000,
    leads: 52,
    roas: 5.4,
    status: "Live",
  },
  {
    name: "Newsletter nurture",
    channel: "Email",
    spend: 120000,
    leads: 44,
    roas: 3.1,
    status: "Live",
  },
  {
    name: "LinkedIn webinar ads",
    channel: "LinkedIn",
    spend: 98000,
    leads: 38,
    roas: 3.8,
    status: "Live",
  },
  {
    name: "Google search ads",
    channel: "Google",
    spend: 152000,
    leads: 56,
    roas: 4.0,
    status: "Live",
  },
  {
    name: "Campus ambassador",
    channel: "In-app",
    spend: 60000,
    leads: 28,
    roas: 2.9,
    status: "Live",
  },
  {
    name: "Alumni referral",
    channel: "Email",
    spend: 120000,
    leads: 34,
    roas: 3.4,
    status: "Live",
  },
];

export const emailCampaigns = [
  { title: "Deadline reminder — Fall", recipients: 2400, openRate: 68, status: "Sent" },
  { title: "Scholarship update", recipients: 1900, openRate: 72, status: "Sent" },
  { title: "Cohort 16 welcome", recipients: 0, openRate: 0, status: "Draft" },
  { title: "Open house invitation", recipients: 1500, openRate: 66, status: "Sent" },
  { title: "Employer partnership announcement", recipients: 1200, openRate: 71, status: "Sent" },
  { title: "Monthly newsletter — July", recipients: 2400, openRate: 74, status: "Sent" },
  { title: "Early-bird offer — Winter", recipients: 1800, openRate: 69, status: "Sent" },
  { title: "Alumni success story", recipients: 900, openRate: 77, status: "Sent" },
  { title: "New program launch — Data & AI", recipients: 1600, openRate: 65, status: "Sent" },
  { title: "Fall intake reminder 2", recipients: 2100, openRate: 70, status: "Sent" },
  { title: "Application deadline — extended", recipients: 0, openRate: 0, status: "Draft" },
];

export const socialPosts = [
  {
    title: "Alumni story — Ngozi",
    channel: "Instagram",
    date: "Aug 4 · 10:00",
    status: "Scheduled",
  },
  { title: "Open house recap", channel: "LinkedIn", date: "Jul 31 · published", status: "Live" },
  { title: "Career tips carousel", channel: "X", date: "Aug 6 · draft", status: "Draft" },
  {
    title: "Cohort 15 announcement",
    channel: "Instagram",
    date: "Aug 8 · 09:00",
    status: "Scheduled",
  },
  {
    title: "Student testimonial — Tunde",
    channel: "LinkedIn",
    date: "Jul 29 · published",
    status: "Live",
  },
  { title: "Internships at CEA", channel: "Facebook", date: "Aug 9 · draft", status: "Draft" },
];

export const landingPages = [
  { title: "Apply now — Fall intake", conversion: 4.8, status: "A/B testing" },
  { title: "Scholarship info", conversion: 6.1, status: "Live" },
  { title: "Employer partnerships", conversion: 3.2, status: "Draft" },
  { title: "Cybersecurity bootcamp", conversion: 4.9, status: "Live" },
  { title: "Data science track", conversion: 4.1, status: "Live" },
  { title: "Cloud & DevOps cohort", conversion: 5.2, status: "Live" },
  { title: "UI/UX design program", conversion: 3.9, status: "Live" },
  { title: "Full-Stack flexible", conversion: 4.5, status: "Live" },
  { title: "Fall intake — variant B", conversion: 5.0, status: "A/B testing" },
  { title: "Winter intake waitlist", conversion: 4.4, status: "A/B testing" },
];

export const seoKeywords = [
  { keyword: "cyber security training lagos", position: 3, delta: "+2 this week" },
  { keyword: "coding bootcamp nigeria", position: 5, delta: "+1 this week" },
  { keyword: "data science course lagos", position: 11, delta: "−2 this week" },
  { keyword: "cyber security bootcamp nigeria", position: 8, delta: "+3 this week" },
  { keyword: "learn to code lagos", position: 2, delta: "+1 this week" },
  { keyword: "cloud engineering course", position: 15, delta: "−3 this week" },
];

export const contentCalendar = [
  {
    title: "Blog: alumni success — Ngozi",
    channel: "Blog",
    date: "Aug 4",
    status: "In production",
  },
  {
    title: "Instagram carousel — open house",
    channel: "Social",
    date: "Aug 6",
    status: "Scheduled",
  },
  { title: "Email: application deadline", channel: "Email", date: "Aug 7", status: "Approved" },
  { title: "LinkedIn — employer partnership", channel: "Social", date: "Aug 11", status: "Draft" },
  { title: "Facebook ad — Fall intake", channel: "Social", date: "Aug 2", status: "Published" },
  { title: "Blog: student spotlight — Chidi", channel: "Blog", date: "Aug 1", status: "Published" },
  { title: "Newsletter: July digest", channel: "Email", date: "Jul 31", status: "Published" },
  {
    title: "YouTube short — lab walkthrough",
    channel: "Video",
    date: "Jul 30",
    status: "Published",
  },
  { title: "Instagram reel — campus tour", channel: "Social", date: "Jul 29", status: "Published" },
  { title: "X thread — career tips", channel: "X", date: "Jul 28", status: "Published" },
  { title: "Blog: hiring partners", channel: "Blog", date: "Jul 27", status: "Published" },
  { title: "Instagram story — open day", channel: "Social", date: "Jul 26", status: "Published" },
  {
    title: "LinkedIn carousel — alum outcomes",
    channel: "Social",
    date: "Aug 13",
    status: "In production",
  },
  { title: "Blog: open house recap", channel: "Blog", date: "Aug 15", status: "In production" },
];

export const leads = [
  { name: "Tola Bakare", score: 92, detail: "Referred · contacted" },
  { name: "Musa Danjuma", score: 78, detail: "Web form · follow up" },
  { name: "Ngozi Eze", score: 55, detail: "Event lead" },
  { name: "Chidi Okafor", score: 95, detail: "Web form · contacted" },
  { name: "Halima Sani", score: 72, detail: "Paid social · nurture" },
  { name: "Femi Adewale", score: 41, detail: "Newsletter signup" },
];

export const marketingReports = [
  { title: "Monthly marketing report — July", published: "Aug 1" },
  { title: "Campaign ROAS deep-dive", published: "Jul 29" },
  { title: "Channel attribution review", published: "Jul 22" },
  { title: "Lead scoring audit", published: "Jul 18" },
];

export const funnelStages = [
  { stage: "Impressions", value: 182000, pct: 100 },
  { stage: "Clicks", value: 9100, pct: 5 },
  { stage: "Leads", value: 412, pct: 0.23 },
  { stage: "Applications", value: 118, pct: 0.06 },
];
