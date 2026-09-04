-- R&C Roofing — first site on the shared form service.
-- from_email uses Resend's test sender until roofinspectionhawaii.com is verified.
-- After DNS is verified, update from_email to: noreply@roofinspectionhawaii.com
-- notify_email is a fallback; production should set Worker env NOTIFY_EMAIL
-- to the Resend account inbox until a sending domain is verified.
INSERT OR REPLACE INTO sites (slug, name, notify_email, from_email, from_name, allowed_origins)
VALUES (
  'rc-roofing',
  'R&C Roofing Contractors',
  'info@safehomeservice.com',
  'R&C Roofing <onboarding@resend.dev>',
  'R&C Roofing Contractors',
  '["http://localhost:4321","https://*.vercel.app","https://roofinspectionhawaii.com","https://www.roofinspectionhawaii.com"]'
);
