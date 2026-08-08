-- Seed: Admin monitoring services.
INSERT OR IGNORE INTO adm_monitor_services (id, name, detail, status, sort_order) VALUES (1, 'web', 'cea.ng - edge delivery', 'Healthy', 1);
INSERT OR IGNORE INTO adm_monitor_services (id, name, detail, status, sort_order) VALUES (2, 'api', 'cea-api worker ?? 42 suites', 'Healthy', 2);
INSERT OR IGNORE INTO adm_monitor_services (id, name, detail, status, sort_order) VALUES (3, 'db', 'Cloudflare D1 ?? production', 'Healthy', 3);
INSERT OR IGNORE INTO adm_monitor_services (id, name, detail, status, sort_order) VALUES (4, 'email', 'Resend ?? transactional', 'Healthy', 4);
INSERT OR IGNORE INTO adm_monitor_services (id, name, detail, status, sort_order) VALUES (5, 'payments', 'Paystack ?? checkout + webhook', 'Healthy', 5);
INSERT OR IGNORE INTO adm_monitor_services (id, name, detail, status, sort_order) VALUES (6, 'storage', 'Cloudflare R2 ?? uploads', 'Healthy', 6);

