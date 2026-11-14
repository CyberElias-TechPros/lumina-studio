-- One atomic supplier observation snapshot; timestamps order concurrent imports.
CREATE TABLE IF NOT EXISTS afkit_catalog_snapshot (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  observed_at TEXT NOT NULL,
  reported_total INTEGER NOT NULL,
  payload TEXT NOT NULL
);
