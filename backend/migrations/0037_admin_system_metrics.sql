-- 0037_admin_system_metrics.sql — Admin system monitoring: service roster for the monitoring page.

CREATE TABLE adm_monitor_services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Healthy',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_adm_monitor_services_sort ON adm_monitor_services (sort_order);
