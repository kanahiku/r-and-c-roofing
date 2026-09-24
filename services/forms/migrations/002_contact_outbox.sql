CREATE TABLE IF NOT EXISTS contact_outbox (
  lead_id TEXT PRIMARY KEY,
  site_slug TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  next_attempt_at TEXT NOT NULL,
  last_error TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES leads(id),
  FOREIGN KEY (site_slug) REFERENCES sites(slug)
);

CREATE INDEX IF NOT EXISTS contact_outbox_next_attempt
  ON contact_outbox (next_attempt_at, created_at);
