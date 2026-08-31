# Host — Per-project launch playbook

Follow this file for **every** client site. Strategy and tenancy rules live in `AGENCY-INFRASTRUCTURE.md` and `AGENCY-INFRASTRUCTURE-DEV.md`. This file is the click-list.

**Rules that never change**

- Site is **static** on Vercel. No `src/pages/api`, no Vercel functions, no SSR.
- Leads go to the **shared Cloudflare Worker + D1** (`services/forms`), then Resend.
- Leads **never** go in Sanity.
- Cloudflare on the **client domain** is **DNS only** (grey cloud). Do not proxy. Do not use Cloudflare Pages for client sites.
- Domains are registered at **Namecheap**, never at Vercel. You still **add** the hostname on the Vercel project so SSL works.

Copy the fill-in block per site and keep it in 1Password / the registry.

```
slug:            rc-roofing
client:          R&C Roofing Contractors
github:          kanahiku/r-and-c-roofing
vercel_project:  r-and-c-roofing
vercel_url:      https://r-and-c-roofing.vercel.app
custom_domain:   randcroofing.com          # blank until purchased
form_slug:       rc-roofing
form_worker:     https://massic-forms.kanahiku.workers.dev
notify_email:
resend_from:     R&C Roofing <onboarding@resend.dev>
```

---

## Phase 0 — Accounts (once per agency, not per site)

Do these before the first Worker deploy.

| Check | What |
|---|---|
| Cloudflare | Agency account. **Verify the login email** (Workers return error 10034 until this is done). Wrangler and the Cloudflare MCP must be this same account. |
| Wrangler | `cd services/forms && npx wrangler login` then `npx wrangler whoami` |
| workers.dev | Register a subdomain once (example: `kanahiku`). Worker URLs become `https://<worker>.<subdomain>.workers.dev`. |
| D1 | One shared DB for all sites: `npx wrangler d1 create massic-forms` (or Cloudflare MCP `d1_database_create`). Paste `database_id` into `services/forms/wrangler.toml`. |
| Vercel | Agency team. GitHub connected. One project per site. |
| Resend | Agency (or per-client) account. Until a domain is verified, you may only send **from** `onboarding@resend.dev` **to** the Resend signup email. |
| Turnstile | Agency Cloudflare account → Turnstile. Dummy keys are fine for local / first Vercel URL. Real widget before you care about spam. |

Shared form service commands (from `services/forms/`):

```bash
npx wrangler d1 execute massic-forms --remote --file=./schema.sql
npx wrangler d1 execute massic-forms --remote --file=./seed.sql   # first site only; later sites: INSERT a row
npx wrangler secret put TURNSTILE_SECRET
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put NOTIFY_EMAIL          # Resend-account inbox until domain is verified
npx wrangler deploy
curl https://massic-forms.<subdomain>.workers.dev/health
```

Worker env (safe to commit in `wrangler.toml` `[vars]`):

- `RESEND_FROM` — start as `Client Name <onboarding@resend.dev>`

Secrets (never in git, never on Vercel):

- `RESEND_API_KEY`, `TURNSTILE_SECRET`, `NOTIFY_EMAIL`

---

## Phase 1 — Launch without a custom domain

Use this when the site is live on `https://<project>.vercel.app` only.

### 1. Seed the site on D1

`sites.slug` must match `PUBLIC_SITE_SLUG`.

```sql
INSERT OR REPLACE INTO sites
  (slug, name, notify_email, from_email, from_name, allowed_origins)
VALUES (
  'client-slug',
  'Client Legal Name',
  'fallback@client.com',
  'Client Name <onboarding@resend.dev>',
  'Client Legal Name',
  '["http://localhost:4321","https://*.vercel.app"]'
);
```

The Worker also allows `https://*.vercel.app` and localhost by default. Preview URLs work without extra rows.

### 2. Vercel env vars (Production + Preview)

Set on the **site** project, then redeploy. These are public (baked into HTML).

| Variable | Value |
|---|---|
| `PUBLIC_FORM_ENDPOINT` | `https://massic-forms.<subdomain>.workers.dev/submit` |
| `PUBLIC_TURNSTILE_SITE_KEY` | Dummy `1x00000000000000000000AA` or the real site key |
| `PUBLIC_SITE_SLUG` | same as D1 `slug` |
| `SITE_URL` | `https://<project>.vercel.app` until the custom domain is live |

Never put `RESEND_API_KEY` or `TURNSTILE_SECRET` on Vercel.

Local `.env` keeps `PUBLIC_FORM_ENDPOINT=http://localhost:8787/submit` and `npm run forms:dev`.

### 3. Resend (no domain)

- From: `onboarding@resend.dev` (already on the Worker).
- To: **only** the email used to sign up for Resend → set Worker `NOTIFY_EMAIL` to that address.
- Leads still save in D1 if Resend is skipped or fails.

### 4. Turnstile on `*.vercel.app`

- Dummy keys always pass and show a “testing only” banner.
- For a real widget: hostname = the production `*.vercel.app` host (and later the custom domain). Site key → Vercel `PUBLIC_TURNSTILE_SITE_KEY`. Secret → Worker `TURNSTILE_SECRET`. Redeploy both.

### 5. Confirm

- `GET` Worker `/health` → `{ "ok": true, "service": "massic-forms" }`
- Submit `/contact` on the Vercel URL
- `SELECT * FROM leads ORDER BY created_at DESC LIMIT 5` on remote D1
- Notification email arrives if `RESEND_API_KEY` + `NOTIFY_EMAIL` are real

---

## Phase 2 — Connect a custom domain

Do this **in addition to** Phase 1. Do not skip the Worker; the form still posts to the shared form host.

Worked example: `randcroofing.com` → existing Vercel project `r-and-c-roofing`.

### A. Registrar (Namecheap)

1. Domain stays at Namecheap.
2. Set nameservers to the two Cloudflare nameservers for that zone (from Cloudflare **Onboard a domain**).
3. Wait until the zone is **Active**.

### B. Cloudflare DNS (client zone)

Grey cloud. DNS only.

```
Type    Name    Content                 Proxy
CNAME   @       cname.vercel-dns.com    DNS only
CNAME   www     cname.vercel-dns.com    DNS only
```

Use the exact target Vercel shows if it differs. Do not orange-cloud. Do not put the site on Cloudflare Pages.

Add Resend / Google TXT records on this same zone (see D).

### C. Vercel domain

1. Project → Settings → Domains → add `www.example.com` and `example.com`.
2. Follow Vercel’s redirect (usually apex → `www` or the reverse). Pick one canonical host.
3. Wait until SSL is **Valid**.
4. Set `SITE_URL` to the canonical URL (`https://www.example.com`).
5. Update `src/config.yaml` `site.site` to the same URL.
6. Redeploy.

Do not buy the domain on Vercel. Adding the hostname is required for certificates.

### D. Resend (send from the client domain)

Until this is done, keep using `onboarding@resend.dev` and the Resend-account inbox.

1. Resend → Domains → add `example.com`.
2. Copy the DNS records into the Cloudflare zone (DNS only):

```
Type    Name                    Content
TXT     resend._domainkey       (value from Resend)
TXT     @                       v=spf1 include:_spf.resend.com ~all
```

(Use Resend’s current records if they differ; MX for inbound is not required just to send.)

3. Wait until the domain is **Verified**.
4. Worker:

```bash
npx wrangler secret put NOTIFY_EMAIL
# company inbox, e.g. info@example.com

# wrangler.toml [vars] or dashboard vars:
# RESEND_FROM = "Client Name <noreply@example.com>"
npx wrangler deploy
```

5. D1: update `from_email` / `notify_email` for that `slug` to match.

Do **not** send every client from one agency domain.

### E. Turnstile hostname

Edit the widget → add `example.com` and `www.example.com`. Keep `*.vercel.app` if previews still use the form.

### F. Form origin allowlist

Add both canonical hosts (and `www` if used):

```sql
UPDATE sites
SET allowed_origins = '["http://localhost:4321","https://*.vercel.app","https://example.com","https://www.example.com"]'
WHERE slug = 'client-slug';
```

If the Worker’s `DEFAULT_ORIGIN_PATTERNS` does not already include this domain, either add it there (shared Worker) or set Worker env `ALLOWED_ORIGINS` to a JSON array / comma list, then redeploy.

### G. Site config and SEO

- `SITE_URL` / `config.yaml` canonical URL
- Rebuild so sitemap, Open Graph, and canonical tags use the custom domain
- Google Search Console: add the canonical property, submit sitemap
- Optional: 301 any leftover `vercel.app` publicity to the custom domain (Vercel domain settings)

### H. Confirm on the custom domain

- HTTPS padlock on apex and www
- `/contact` submits from `https://www.example.com` (or apex)
- Lead row in D1
- Resend shows from `noreply@example.com` to the company inbox
- Reply-To is the visitor’s email

---

## Later (optional, not required to launch)

| Item | When |
|---|---|
| `forms.massic.com` on the Worker | When you want one stable form URL instead of `*.workers.dev` |
| Real Turnstile (not dummy keys) | Before paid ads / any spam |
| Better Stack HTTP monitor | After the custom domain is serving |
| `www` vs apex | Decide once; keep `SITE_URL` and D1 origins in sync |

---

## Per-site checklist (print / copy)

**Phase 1 — Vercel URL**

- [ ] Cloudflare login email verified (Workers 10034 otherwise)
- [ ] Shared D1 exists; `sites` row for this `slug`
- [ ] Worker deployed; `/health` ok
- [ ] `TURNSTILE_SECRET` + `RESEND_API_KEY` + `NOTIFY_EMAIL` on the Worker
- [ ] Vercel: `PUBLIC_FORM_ENDPOINT`, `PUBLIC_TURNSTILE_SITE_KEY`, `PUBLIC_SITE_SLUG`
- [ ] Test submit on `*.vercel.app`; lead in D1

**Phase 2 — Custom domain**

- [ ] Namecheap nameservers → Cloudflare
- [ ] Zone active; CNAME `@` + `www` → Vercel, **DNS only**
- [ ] Domain added on Vercel; SSL valid; one canonical host
- [ ] `SITE_URL` + `config.yaml` updated; site rebuilt
- [ ] Resend domain verified; SPF/DKIM on the zone
- [ ] `RESEND_FROM` + `NOTIFY_EMAIL` switched off `onboarding@resend.dev`
- [ ] Turnstile hostname includes the custom domain
- [ ] D1 `allowed_origins` includes `https://example.com` and `https://www.example.com`
- [ ] Test submit on the custom domain; email from `noreply@example.com`

---

## This repo (R&C Roofing) — current status

| Item | Status |
|---|---|
| Vercel | `https://r-and-c-roofing.vercel.app` (project `r-and-c-roofing`, team Kanahiku) |
| D1 | `massic-forms` (`376bc987-bf24-4f8c-88e0-64ce2daacf61`), slug `rc-roofing` seeded |
| workers.dev | Subdomain `kanahiku` registered. Intended URL: `https://massic-forms.kanahiku.workers.dev` |
| Worker | Live: `https://massic-forms.kanahiku.workers.dev`. Dummy Turnstile secret set. Resend sending key on Worker. `NOTIFY_EMAIL=tools@kanahiku.com` (test mode). |
| Custom domain | Not connected. When `randcroofing.com` is ready, run Phase 2 |
| Resend | No custom domain. From `onboarding@resend.dev` → `tools@kanahiku.com` until `randcroofing.com` is verified. |
