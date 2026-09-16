-- R&C Roofing — first site on the shared form service.
-- from_email must match a verified Resend domain. Recipient is NOTIFY_EMAIL
-- (Worker secret) with this row as fallback.
INSERT OR REPLACE INTO sites (slug, name, notify_email, from_email, from_name, allowed_origins)
VALUES (
  'rc-roofing',
  'R&C Roofing Contractors',
  'info@safehomeservice.com',
  'R&C Roofing <hello@roofinspectionhawaii.com>',
  'R&C Roofing Contractors',
  '["http://localhost:4321","https://*.vercel.app","https://roofinspectionhawaii.com","https://www.roofinspectionhawaii.com"]'
);
