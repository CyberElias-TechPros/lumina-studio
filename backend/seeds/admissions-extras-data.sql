-- Seed: Admissions extras.
INSERT OR IGNORE INTO adm_doc_hub (id, metric, value_label, delta, sort_order) VALUES ('adh-dh-01', 'Verified', '1,206', 'of 1,322 docs', 1);
INSERT OR IGNORE INTO adm_doc_hub (id, metric, value_label, delta, sort_order) VALUES ('adh-dh-02', 'Pending', '116', '9 applicants', 2);
INSERT OR IGNORE INTO adm_doc_hub (id, metric, value_label, delta, sort_order) VALUES ('adh-dh-03', 'Rejected', '14', 're-upload sent', 3);
INSERT OR IGNORE INTO adm_doc_hub (id, metric, value_label, delta, sort_order) VALUES ('adh-dh-04', 'Avg. verify', '1.8 days', 'target < 2', 4);
INSERT OR IGNORE INTO adm_doc_checks (id, name, detail, status, sort_order) VALUES ('adh-dc-01', 'National ID verification', '92% complete · 9 pending', 'On track', 1);
INSERT OR IGNORE INTO adm_doc_checks (id, name, detail, status, sort_order) VALUES ('adh-dc-02', 'Certificate checks', '88% complete · 14 pending', 'On track', 2);
INSERT OR IGNORE INTO adm_doc_checks (id, name, detail, status, sort_order) VALUES ('adh-dc-03', 'Photo & consent forms', '96% complete · 5 pending', 'On track', 3);
INSERT OR IGNORE INTO adm_comm_hub (id, metric, value_label, delta, sort_order) VALUES ('adh-ch-01', 'Sent (30d)', '412', '10 templates', 1);
INSERT OR IGNORE INTO adm_comm_hub (id, metric, value_label, delta, sort_order) VALUES ('adh-ch-02', 'Open rate', '71%', 'vs 45% bench', 2);
INSERT OR IGNORE INTO adm_comm_hub (id, metric, value_label, delta, sort_order) VALUES ('adh-ch-03', 'Offers out', '24', '11 accepted', 3);
INSERT OR IGNORE INTO adm_comm_hub (id, metric, value_label, delta, sort_order) VALUES ('adh-ch-04', 'Templates', '10', '3 drafts', 4);
INSERT OR IGNORE INTO adm_comm_templates (id, title, usage, status, sort_order) VALUES ('adh-ct-01', 'Offer letter — full-time', 'Sent 24x this month', 'Published', 1);
INSERT OR IGNORE INTO adm_comm_templates (id, title, usage, status, sort_order) VALUES ('adh-ct-02', 'Assessment invitation', 'Sent 89x this month', 'Published', 2);
INSERT OR IGNORE INTO adm_comm_templates (id, title, usage, status, sort_order) VALUES ('adh-ct-03', 'Interview confirmation', 'Sent 64x this month', 'Published', 3);