-- 0010_library.sql
-- Digital library: items scraped from public Google Drive folders and
-- imported via scripts/gen-library-seed.ts. Course materials are marked
-- protected (students/staff only); the catalog endpoint serves public items.

CREATE TABLE IF NOT EXISTS library_items (
  id TEXT PRIMARY KEY,
  source_key TEXT NOT NULL DEFAULT 'library',
  folder_path TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL,
  kind TEXT NOT NULL DEFAULT 'file',
  mime_type TEXT NOT NULL DEFAULT '',
  drive_file_id TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '',
  size_bytes INTEGER NOT NULL DEFAULT 0,
  is_protected INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_library_items_source_path
  ON library_items(source_key, folder_path);
CREATE INDEX IF NOT EXISTS idx_library_items_protected
  ON library_items(is_protected);
