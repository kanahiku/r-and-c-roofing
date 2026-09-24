CREATE TABLE IF NOT EXISTS sites (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  notify_email TEXT NOT NULL,
  from_email TEXT NOT NULL,
  from_name TEXT NOT NULL,
  allowed_origins TEXT NOT NULL,
  pdf_daily_limit INTEGER DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  site_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  street TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL,
  email_sent_at TEXT,
  FOREIGN KEY (site_slug) REFERENCES sites(slug)
);

CREATE INDEX IF NOT EXISTS leads_site_created ON leads (site_slug, created_at DESC);
CREATE INDEX IF NOT EXISTS leads_site_email_sent ON leads (site_slug, email_sent_at);
CREATE INDEX IF NOT EXISTS leads_site_zip ON leads (site_slug, zip);
CREATE INDEX IF NOT EXISTS leads_site_state ON leads (site_slug, state);

CREATE TABLE IF NOT EXISTS outbound_sends (
  id TEXT PRIMARY KEY,
  site_slug TEXT NOT NULL,
  kind TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (site_slug) REFERENCES sites(slug)
);

CREATE INDEX IF NOT EXISTS outbound_sends_site_kind_created
  ON outbound_sends (site_slug, kind, created_at);

-- Durable contact-email queue. The lead remains safe in D1 while Resend is
-- unavailable, and the Worker's cron retries with the same idempotency key.
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
