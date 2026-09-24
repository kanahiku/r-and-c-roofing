-- Split US address fields on leads (nullable so existing rows stay valid).
ALTER TABLE leads ADD COLUMN street TEXT;
ALTER TABLE leads ADD COLUMN address_line2 TEXT;
ALTER TABLE leads ADD COLUMN city TEXT;
ALTER TABLE leads ADD COLUMN state TEXT;
ALTER TABLE leads ADD COLUMN zip TEXT;

CREATE INDEX IF NOT EXISTS leads_site_zip ON leads (site_slug, zip);
CREATE INDEX IF NOT EXISTS leads_site_state ON leads (site_slug, state);
