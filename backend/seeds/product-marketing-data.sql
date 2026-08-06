-- 0022 seeds — Product marketing dashboard, mirroring the static app pages.

INSERT INTO pm_hub (id, metric, value_label, delta, sort_order) VALUES ('pm-hb-01', 'Launches in flight', '3', '1 live now', 1);
INSERT INTO pm_hub (id, metric, value_label, delta, sort_order) VALUES ('pm-hb-02', 'Positioning docs', '7', '2 in review', 2);
INSERT INTO pm_hub (id, metric, value_label, delta, sort_order) VALUES ('pm-hb-03', 'Competitors tracked', '9', '2 new this qtr', 3);
INSERT INTO pm_hub (id, metric, value_label, delta, sort_order) VALUES ('pm-hb-04', 'Win rate', '68%', '+5 pts QoQ', 4);

INSERT INTO pm_phases (id, launch, phase, pct, status, sort_order) VALUES ('pm-ph-01', 'Parent app · Beta', 'Phase 1 · Discovery', 100, 'Complete', 1);
INSERT INTO pm_phases (id, launch, phase, pct, status, sort_order) VALUES ('pm-ph-02', 'Parent app · Beta', 'Phase 2 · Build & validate', 64, 'In progress', 2);
INSERT INTO pm_phases (id, launch, phase, pct, status, sort_order) VALUES ('pm-ph-03', 'Employer talent pass', 'Phase 3 · Launch', 12, 'Upcoming', 3);

INSERT INTO pm_tasks (id, title, owner, status, sort_order) VALUES ('pm-ts-01', 'Beta waitlist page live', 'Chiamaka Eze', 'Done', 1);
INSERT INTO pm_tasks (id, title, owner, status, sort_order) VALUES ('pm-ts-02', 'Pricing FAQ for beta cohort', 'Tunde Bakare', 'In review', 2);
INSERT INTO pm_tasks (id, title, owner, status, sort_order) VALUES ('pm-ts-03', 'Store listing screenshots', 'Ada Obi', 'Doing', 3);
INSERT INTO pm_tasks (id, title, owner, status, sort_order) VALUES ('pm-ts-04', 'Launch blog + social kit', 'Ngozi Adeyemi', 'Todo', 4);

INSERT INTO pm_gates (id, phase, gate, owner, due_label, status, sort_order) VALUES ('pm-gt-01', 'Discovery', 'Market sizing sign-off', 'Emeka Okafor', 'Jun 12', 'Done', 1);
INSERT INTO pm_gates (id, phase, gate, owner, due_label, status, sort_order) VALUES ('pm-gt-02', 'Build', 'Beta waitlist ≥ 500', 'Ada Obi', 'Jul 25', 'On track', 2);
INSERT INTO pm_gates (id, phase, gate, owner, due_label, status, sort_order) VALUES ('pm-gt-03', 'Build', 'Onboarding walkthrough QA', 'Tunde Bakare', 'Aug 02', 'At risk', 3);
INSERT INTO pm_gates (id, phase, gate, owner, due_label, status, sort_order) VALUES ('pm-gt-04', 'Launch', 'Release approval', 'Chiamaka Eze', 'Aug 14', 'Planned', 4);

INSERT INTO pm_statements (id, product, statement, audience, pain, benefit, sort_order) VALUES ('pm-st-01', 'CEA-OS core LMS', 'For ambitious Nigerians who want global careers, CEA-OS is the academy that pairs live Lagos classes with a portfolio employers trust.', 'Working adults 18-35 · Lagos, Abuja', 'Degrees don''t convert to jobs', 'Hire-ready in 9 months', 1);
INSERT INTO pm_statements (id, product, statement, audience, pain, benefit, sort_order) VALUES ('pm-st-02', 'Employer talent pass', 'For HR teams hiring in Nigeria, the talent pass is a verified pipeline of job-ready graduates with recorded skills evidence.', 'HR leaders · 50+ employers', 'Entry-level hires are risky', '88% of pass hires stay 6mo', 2);
INSERT INTO pm_statements (id, product, statement, audience, pain, benefit, sort_order) VALUES ('pm-st-03', 'Parent app', 'For parents funding education, the parent app turns fees into progress reports with weekly learner insights.', 'Parents · 35-55 · diaspora', 'Fees paid, outcomes unclear', 'Weekly skill milestones', 3);

INSERT INTO pm_messagehouse (id, label, value, sort_order) VALUES ('pm-mh-01', 'Primary message', 'From Lagos classroom to global job', 1);
INSERT INTO pm_messagehouse (id, label, value, sort_order) VALUES ('pm-mh-02', 'Proof point', '92% placement within 6 months', 2);
INSERT INTO pm_messagehouse (id, label, value, sort_order) VALUES ('pm-mh-03', 'Tone of voice', 'Ambitious, concrete, proud', 3);
INSERT INTO pm_messagehouse (id, label, value, sort_order) VALUES ('pm-mh-04', 'Avoid', 'Get-rich-quick framing', 4);

INSERT INTO pm_competitors (id, name, focus, strength, weakness, notes, sort_order) VALUES ('pm-cp-01', 'Skilledge NG', 'Coding bootcamps', 'Strong Lagos brand', 'No employer pass', 'Won 2 of 3 deals Q3', 1);
INSERT INTO pm_competitors (id, name, focus, strength, weakness, notes, sort_order) VALUES ('pm-cp-02', 'Aptbridge', 'Corporate training', 'Enterprise sales team', 'Dated LMS UX', 'Won 1 of 2 this month', 2);
INSERT INTO pm_competitors (id, name, focus, strength, weakness, notes, sort_order) VALUES ('pm-cp-03', 'GlobalPath', 'UK placement focus', 'Strong diaspora links', 'Weak portfolio tooling', 'Active on parent app deal', 3);

INSERT INTO pm_features (id, capability, cea, skilledge, aptbridge, sort_order) VALUES ('pm-fv-01', 'Live Lagos classes', 1, 1, 0, 1);
INSERT INTO pm_features (id, capability, cea, skilledge, aptbridge, sort_order) VALUES ('pm-fv-02', 'Employer talent pass', 1, 0, 1, 2);
INSERT INTO pm_features (id, capability, cea, skilledge, aptbridge, sort_order) VALUES ('pm-fv-03', 'Portfolio builder', 1, 1, 0, 3);
INSERT INTO pm_features (id, capability, cea, skilledge, aptbridge, sort_order) VALUES ('pm-fv-04', 'Diaspora financing', 1, 0, 0, 4);
INSERT INTO pm_features (id, capability, cea, skilledge, aptbridge, sort_order) VALUES ('pm-fv-05', 'Data & AI track', 1, 1, 0, 5);

INSERT INTO pm_launches (id, name, date_label, phase, owner, status, sort_order) VALUES ('pm-ln-01', 'Parent app beta', 'Aug 14, 2026', 'Phase 2 · Build', 'Ada Obi', 'On track', 1);
INSERT INTO pm_launches (id, name, date_label, phase, owner, status, sort_order) VALUES ('pm-ln-02', 'Employer talent pass 2.0', 'Sep 04, 2026', 'Phase 1 · Discovery', 'Tunde Bakare', 'Discovery', 2);
INSERT INTO pm_launches (id, name, date_label, phase, owner, status, sort_order) VALUES ('pm-ln-03', 'Data & AI track', 'Oct 09, 2026', 'Phase 1 · Discovery', 'Chiamaka Eze', 'Planned', 3);
INSERT INTO pm_launches (id, name, date_label, phase, owner, status, sort_order) VALUES ('pm-ln-04', 'Alumni marketplace', 'Nov 20, 2026', 'Ideation', 'Ngozi Adeyemi', 'Draft', 4);

INSERT INTO pm_readiness (id, label, pct, status, sort_order) VALUES ('pm-rd-01', 'Messaging & positioning', 100, 'Done', 1);
INSERT INTO pm_readiness (id, label, pct, status, sort_order) VALUES ('pm-rd-02', 'Beta onboarding flow', 78, 'Building', 2);
INSERT INTO pm_readiness (id, label, pct, status, sort_order) VALUES ('pm-rd-03', 'Support & FAQ', 42, 'In review', 3);
INSERT INTO pm_readiness (id, label, pct, status, sort_order) VALUES ('pm-rd-04', 'Store listing assets', 15, 'Queued', 4);

INSERT INTO pm_studies (id, title, detail, sample, method, status, sort_order) VALUES ('pm-sd-01', 'Employer hiring signals · Lagos', 'What 40 HR leaders screen for', 'n=40 interviews', 'Interviews', 'Published', 1);
INSERT INTO pm_studies (id, title, detail, sample, method, status, sort_order) VALUES ('pm-sd-02', 'Parent willingness to pay', 'Fee elasticity for parent app', 'n=320 survey', 'Survey', 'In field', 2);
INSERT INTO pm_studies (id, title, detail, sample, method, status, sort_order) VALUES ('pm-sd-03', 'Diaspora funding behaviour', 'UK diaspora monthly education spend', 'n=180 survey', 'Survey + diary', 'In review', 3);
INSERT INTO pm_studies (id, title, detail, sample, method, status, sort_order) VALUES ('pm-sd-04', 'Bootcamp comparison 2026', 'Pricing & promise across 9 players', 'desk research', 'Secondary', 'Draft', 4);

INSERT INTO pm_findings (id, title, tag, sort_order) VALUES ('pm-fn-01', '88% of parents want weekly progress proof', 'Critical · parent app', 1);
INSERT INTO pm_findings (id, title, tag, sort_order) VALUES ('pm-fn-02', 'HR screens for portfolio, not certificates', 'Critical · positioning', 2);
INSERT INTO pm_findings (id, title, tag, sort_order) VALUES ('pm-fn-03', 'Diaspora parents pay ₦180k-₦250k per term', 'Pricing input', 3);
INSERT INTO pm_findings (id, title, tag, sort_order) VALUES ('pm-fn-04', 'Referrals drive 18% of signups', 'Growth input', 4);

INSERT INTO pm_matrix (id, product, audience, message, proof, status, sort_order) VALUES ('pm-mx-01', 'Core LMS', 'Working adults', 'Build skills that Lagos employers actually pay for.', '92% placement in 6 months', 'Approved', 1);
INSERT INTO pm_matrix (id, product, audience, message, proof, status, sort_order) VALUES ('pm-mx-02', 'Core LMS', 'Parents', 'Every naira of fees becomes a visible skill milestone.', '4.8 rating from 2,100 parents', 'In review', 2);
INSERT INTO pm_matrix (id, product, audience, message, proof, status, sort_order) VALUES ('pm-mx-03', 'Talent pass', 'HR leaders', 'Hire graduates whose skills were verified on the job.', '88% stay past 6 months', 'Approved', 3);
INSERT INTO pm_matrix (id, product, audience, message, proof, status, sort_order) VALUES ('pm-mx-04', 'Talent pass', 'Students', 'A job pass that comes with the portfolio to back it.', '34 hires via pass in 2026', 'Draft', 4);

INSERT INTO pm_briefs (id, title, objective, audience, channels, metric, status, sort_order) VALUES ('pm-br-01', 'Parent app beta launch', '1,000 waitlist signups in 3 weeks', 'Diaspora parents 35-55', 'Meta + LinkedIn + Email', 'Waitlist CVR ≥ 12%', 'Approved', 1);
INSERT INTO pm_briefs (id, title, objective, audience, channels, metric, status, sort_order) VALUES ('pm-br-02', 'Talent pass employer outreach', '20 new employer signups this quarter', 'HR leaders · Lagos tech', 'LinkedIn + Events', 'Demo requests ≥ 40', 'In review', 2);
INSERT INTO pm_briefs (id, title, objective, audience, channels, metric, status, sort_order) VALUES ('pm-br-03', 'Data & AI track teaser', 'Pre-launch awareness for Oct track', 'Working adults 22-35', 'TikTok + YouTube + SMS', 'CTR ≥ 3.5%', 'Draft', 3);
INSERT INTO pm_briefs (id, title, objective, audience, channels, metric, status, sort_order) VALUES ('pm-br-04', 'Open day · Lekki campus', '350 attendees, 120 applications', 'Prospects · Lagos', 'Instagram + Radio', 'Apply rate ≥ 30%', 'Approved', 4);

INSERT INTO pm_months (id, month, roi, win_rate, pipeline, pct, sort_order) VALUES ('pm-mo-01', 'Feb', '3.8x', '61%', '₦48m', 62, 1);
INSERT INTO pm_months (id, month, roi, win_rate, pipeline, pct, sort_order) VALUES ('pm-mo-02', 'Mar', '4.1x', '63%', '₦52m', 68, 2);
INSERT INTO pm_months (id, month, roi, win_rate, pipeline, pct, sort_order) VALUES ('pm-mo-03', 'Apr', '3.9x', '66%', '₦57m', 71, 3);
INSERT INTO pm_months (id, month, roi, win_rate, pipeline, pct, sort_order) VALUES ('pm-mo-04', 'May', '4.4x', '65%', '₦61m', 76, 4);
INSERT INTO pm_months (id, month, roi, win_rate, pipeline, pct, sort_order) VALUES ('pm-mo-05', 'Jun', '4.7x', '68%', '₦66m', 82, 5);
INSERT INTO pm_months (id, month, roi, win_rate, pipeline, pct, sort_order) VALUES ('pm-mo-06', 'Jul', '4.2x', '68%', '₦71m', 86, 6);