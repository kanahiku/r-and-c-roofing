# Agency Infrastructure — Developer Reference

> For: Developers  
> Management overview: `AGENCY-INFRASTRUCTURE.md`  
> Stack: Astro (static) + Sanity + Vercel Pro + Cloudflare DNS + Resend

If a step below requires a Vercel function, a Sanity dataset-per-client, or Cloudflare Pages, it is wrong.

---

## Table of Contents

1. [Architecture](#1-architecture)
2. [Repository layout](#2-repository-layout)
3. [Registry](#3-registry)
4. [Provisioner](#4-provisioner)
5. [Client template rules](#5-client-template-rules)
6. [Hosting — Vercel](#6-hosting--vercel)
7. [GitHub](#7-github)
8. [CMS — Sanity](#8-cms--sanity)
9. [DNS — Cloudflare](#9-dns--cloudflare)
10. [Forms](#10-forms)
11. [Caching and headers](#11-caching-and-headers)
12. [Monitoring and jobs](#12-monitoring-and-jobs)
13. [Environment variables](#13-environment-variables)
14. [New site](#14-new-site)
15. [Security](#15-security)
16. [Client handoff](#16-client-handoff)
17. [Scaling milestones](#17-scaling-milestones)
18. [Quick commands](#18-quick-commands)

---

## 1. Architecture

```
Sanity project (per site)  →  content + images (Sanity CDN)
GitHub repo (per site)     →  Astro template + shared packages
provisioner                →  creates both, wires env, DNS, monitor
Vercel                     →  npm run build → static files → CDN
Browser                    →  HTML/CSS/JS from Vercel, images from Sanity
Form                       →  POST PUBLIC_FORM_ENDPOINT (not Vercel)
                           →  DB first (always), then Resend if under daily cap
                           →  Visitor always sees success if the lead was saved
```

`npm run build` must emit a folder of files. No SSR, no server islands, no on-demand rendering.

---

## 2. Repository layout

The factory lives in its own GitHub org. A single client AstroWind repo is a **site**, not the factory.

```
massic/
├── registry/
│   └── sites.yaml
├── provisioner/                 # create | teardown | redeploy | eject
├── packages/
│   ├── site-ui/                 # shared Astro components (private npm)
│   └── sanity-schema/           # page, SEO, nav, footer, blog schemas
├── templates/client-site/       # starter cloned per client
├── services/forms/              # Plan A — separate host
└── jobs/
    ├── backup/                  # nightly Sanity export → R2
    └── staleness/               # /build.json vs Sanity → Slack digest
```

GitHub Organisation: one private repo per client, cloned from `templates/client-site`. Fixes go into `packages/*` and roll out with `provisioner redeploy`.

Handoff: `provisioner eject` vendors the private packages into the client repo, then transfer that repo + that Sanity project.

---

## 3. Registry

Every script reads `sites.yaml` only. Dashboards are not the source of truth.

```yaml
# registry/sites.yaml
- slug: acme-roofing
  domain: acmeroofing.com
  repo: massic/acme-roofing
  sanityProjectId: abc123
  sanityDataset: production
  vercelProjectId: prj_...
  cloudflareZoneId: ...
  resendDomain: acmeroofing.com
  betterStackMonitorId: ...
  formEndpoint: https://forms.massic.com
  launched: 2026-09-15
  card: vercel-primary
```

Alerts must use `slug` / client name from this file, not the GitHub repo slug.

---

## 4. Provisioner

Build this before the 10th site. If a human still clicks Vercel to add a site, this phase is not done.

```bash
provisioner create --slug acme-roofing --domain acmeroofing.com
provisioner teardown --slug acme-roofing
provisioner redeploy --slug acme-roofing
provisioner redeploy --all
provisioner eject --slug acme-roofing
```

`create` must, in order:

1. `gh repo create` from `templates/client-site` (private)
2. Sanity: create **project** in the agency org (not a dataset on a shared project); set `production` dataset; invite agency Admins only
3. Vercel: import repo; **build machine Standard** (never Turbo); env vars; add domain
4. Cloudflare: zone; **DNS-only** CNAME `@` and `www` → Vercel (`cname.vercel-dns.com` or whatever Vercel shows). Do **not** orange-cloud (proxy) as default
5. Namecheap: nameservers → Cloudflare (if we manage the domain)
6. Resend: add domain + output DNS records for the zone
7. Better Stack: HTTP monitor
8. Append `sites.yaml`

Sanity API: **max 5 new projects per hour per organisation**. Batch provisioners must throttle, or raise the cap with Sanity first.

---

## 5. Client template rules

### astro.config

- `output: 'static'`
- `site` from `SITE_URL`
- `@astrojs/sitemap`
- **No** Vercel-only APIs. Prefer no adapter; static upload is enough. If an adapter is required for the pipeline, it must not expose Image/KV/middleware APIs in app code.

### Forbidden in the template

- `src/pages/api/**` on the client site
- `vercel/blob`, `vercel/kv`, `@vercel/analytics`, Vercel Image Optimization
- Sanity `useCdn: false` in production
- Storing form submissions in Sanity
- Registering domains on Vercel

### Required

- `SANITY_PROJECT_ID`, `SANITY_DATASET=production`
- `PUBLIC_FORM_ENDPOINT` — only form coupling
- Images: Sanity image URLs / `@sanity/image-url`, never a host-side optimizer
- `dist/build.json` after each build: `{ "builtAt": "<ISO>", "commit": "<sha>" }` served at `/build.json`
- Cache-Control: hashed assets immutable; HTML `max-age=0, must-revalidate`
- SEO: meta fields on every page document, canonical, sitemap, robots, JSON-LD, redirects collection in Sanity
- Studio: in-repo schema from `packages/sanity-schema`; `sanity deploy` per project (Studio URL per client)

### Sanity client (production)

```ts
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
  perspective: 'published',
});
```

Webhook: Sanity `on publish` → trigger **that** Vercel project's deploy only.

---

## 6. Hosting — Vercel

**Dashboard:** https://vercel.com/dashboard

- Create a **Team** account (not personal — personal accounts cannot be transferred).
- One Team, Pro. Hobby is not allowed for client work.
- Connect GitHub Organisation: Settings → Git → Install GitHub App.
- One Vercel project per site (maps 1:1 with GitHub repo + Sanity project).
- Production = `main`. Previews = PRs.
- Rollback: Deployments → find previous → ··· → Promote to Production.
- **Standard** build machines in the provisioner (Turbo is ~7.5× and became default on new Pro projects).
- Images and heavy assets: Sanity CDN so Vercel transfer stays inside the included 1TB.

Portability: once a quarter, take one live `slug` and deploy `dist/` (or the same build command) to another provider using the provisioner. That is the host-exit test. If we have never done it, we do not have an exit door.

**Do not use Cloudflare Pages.** Cap is 100 projects per account and build quota is shared.

### Pricing

| Tier | Cost | Notes |
|------|------|-------|
| Hobby | Free | Not for client work |
| Pro | $20/seat/mo | Unlimited projects; $20 usage credit per seat |
| Viewer seats | Free | Read-only dashboard access |

---

## 7. GitHub

**Dashboard:** https://github.com/organizations/new

1. Create Organisation on `tools@` → Free
2. Invite team members; base permission: Members → Read
3. One private repo per client from `templates/client-site`

```bash
gh repo create massic/clientname-website \
  --template massic/client-site \
  --private \
  --clone
```

### Branch strategy

- `main` → production (auto-deploys)
- Feature branches → PR previews

### Pricing

| Tier | Cost | When to upgrade |
|------|------|-----------------|
| Free | $0 | Start here. Unlimited private repos. |
| Team | $4/user/mo | Code owners, required reviews |

---

## 8. CMS — Sanity

**Dashboard:** https://sanity.io/manage

### Tenancy

| Layer | What |
|-------|------|
| Organisation | Agency. Billing, our staff. One org. |
| Project | **One website.** Isolated content, members, quotas. |
| Dataset | `production` (optional `staging` later, still **inside** that project). |

**Never** one project with a dataset per client. Datasets cannot be transferred out of a project.

```bash
# Per client (prefer the provisioner)
# Creates a new project in the agency org — not a dataset on a shared project
sanity projects list
sanity dataset create production
```

Invite clients: **project members only**, never Organisation Administrator / Billing. Default: do not invite. If invited on Free: **Administrator** on that project (Free has no Editor role). They cannot see other projects.

Agency people: Administrator on every project. Individual Sanity logins — no shared password.

Sanity API: **max 5 new projects per hour per organisation**. Ask Sanity to raise this before batch-provisioning.

Editor role requires Growth at $15/seat **per project**. Do not use it as the default.

### Schema

Shared package (`packages/sanity-schema`). Singletons: `homePage`, inner pages, `siteNavigation`, `siteFooter`. Collection: `post`. SEO object on every page. Studio structure: Global (nav/footer) → Pages → Blog. No “new document” for singletons.

### Export (manual backup)

```bash
sanity dataset export production backup-$(date +%Y-%m-%d).tar.gz \
  --project-id $SANITY_PROJECT_ID
```

### Free plan notes

- Administrator and Viewer roles only (no Editor).
- Datasets are publicly queryable, including unpublished drafts. Acceptable for marketing copy. **Form submissions must never be stored in Sanity.**
- Draft history is ~3 days. Nightly R2 export is required from day one.

### Pricing

| Plan | Per | Cost |
|------|-----|------|
| Free | Project | $0 — default for every client project |
| Growth | Seat, per project | ~$15/seat/mo — only if a client needs Editor role |

---

## 9. DNS — Cloudflare

**Dashboard:** https://dash.cloudflare.com

DNS only. One account, one zone per client. Not Pages. Not proxied CDN as default.

Per domain:

```
Type    Name    Content                    Proxy
CNAME   @       cname.vercel-dns.com       DNS only
CNAME   www     cname.vercel-dns.com       DNS only
TXT     …       Resend / Google / etc      DNS only
```

Use the exact CNAME Vercel shows. SSL/TLS on Vercel. Do not set Cloudflare SSL as the primary path in the default setup.

Registrar: **Namecheap**. Nameservers → Cloudflare. Domains never registered at Vercel.

---

## 10. Forms

Client site: HTML form + Turnstile widget → `POST PUBLIC_FORM_ENDPOINT`.

**Never** `src/pages/api/contact.ts` on the client site. Never a Vercel function. Never store leads in Sanity.

**Plan A (default):** `services/forms` on its own host (not the client Vercel team).

**Plan B:** Formspree. Same `PUBLIC_FORM_ENDPOINT`. Switch = env + rebuild fleet.

Visible phone number on every contact page as fallback.

Resend: verify **each client domain**. Do not send all sites from one agency domain.

Turnstile: site key in the page (`PUBLIC_TURNSTILE_SITE_KEY`), secret only on the form service.

### Lead first, email second (copy this for every new site)

The visitor submitted an inquiry. They are not waiting on Resend. Capture the lead, then try to notify the company.

Worker order:

1. Honeypot `website` filled → return `{ ok: true }`, **do not** write D1 (bot)
2. Validate + Turnstile
3. **Always INSERT into D1 `leads`**
4. If this site is under its daily Resend cap → send notify email, set `email_sent_at`
5. If the cap is hit, Resend fails, or the API key is missing → skip Resend, leave `email_sent_at` empty
6. Return `{ ok: true }` whenever the row was saved

UI (`Form.astro`):

- `{ ok: true }` → show **Message sent** / “We received your inquiry…”, hide the fields, **do not re-enable Send**
- Never show “email failed”. The visitor is not the notify recipient.
- Errors only if validation/Turnstile fails or the Worker could not save the lead (500)

Follow up from D1 (`email_sent_at IS NULL` = saved, not emailed). Optional later: Slack/digest of un-emailed leads. Do not ask the visitor to try again.

### Resend daily cap

Shared Resend account. One spam flood on one site must not burn the pool.

| Setting | Value |
|---------|-------|
| Cap | **20 notify emails per site per UTC day** |
| Env | Worker `RESEND_DAILY_LIMIT` (default `20` in `wrangler.toml`) |
| What is counted | Rows with `email_sent_at` set today for that `site_slug` |
| Over cap | Lead still saved. Resend skipped. UI still success. |

Do not put this limit on the Astro site. Do not put `RESEND_API_KEY` on Vercel.

### Resend domain DNS

```
Type    Name                    Content
TXT     resend._domainkey       (DKIM from Resend dashboard)
TXT     @                       v=spf1 include:_spf.resend.com ~all
```

### Pricing

| Tier | Emails/mo | Cost |
|------|-----------|------|
| Free | 3,000 | $0 — until ~150 sites at our volume |
| Pro | 50,000 | $20/mo |

---

## 11. Caching and headers

Set once in the template (and in the provisioner for any second host):

| Path | Cache-Control |
|------|----------------|
| `/_astro/*` | `public, max-age=31536000, immutable` |
| HTML | `public, max-age=0, must-revalidate` |

Plus:

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

If using `vercel.json` for this, keep an equivalent in the provisioner for a second host. Do not rely on Vercel-only header APIs.

---

## 12. Monitoring and jobs

### Better Stack (0–100 sites)

**Dashboard:** https://uptime.betterstack.com

- Type: HTTP(s)
- Interval: 3 min
- Slack: `#website-alerts`
- Message must include the registry client name

Self-host Uptime Kuma (or extend the staleness job) when monitor price hurts (~100 sites).

### Build failures

Vercel + GitHub → Slack. Message includes registry client name, not only the repo slug.

### Staleness

Uptime cannot see a failed rebuild (old HTML keeps serving). Each build writes `/build.json`. Nightly job, for each site: fetch `https://domain/build.json`, compare `builtAt` to last Sanity mutation. One Slack digest, not 300 pings.

### Backups

Free Sanity history is ~3 days. Nightly from day one:

```bash
sanity dataset export production backup-$SLUG-$(date +%F).tar.gz --project-id $SANITY_PROJECT_ID
# upload to R2 prefix sanity/$SLUG/
```

Retention: last 4 weekly + last 12 monthly. R2: first 10GB free.

Code: GitHub. Host: Vercel one-click rollback. There is no server to back up.

---

## 13. Environment variables

### Client site

```bash
SANITY_PROJECT_ID=
SANITY_DATASET=production
SITE_URL=https://clientsite.com
SITE_NAME=
PUBLIC_FORM_ENDPOINT=https://forms.example.com/submit
PUBLIC_TURNSTILE_SITE_KEY=
PUBLIC_SITE_SLUG=
```

Optional: `SANITY_API_TOKEN` only for preview/draft builds. Never `useCdn: false` on production static builds.

### Form service (not on the client site)

```bash
TURNSTILE_SECRET=
RESEND_API_KEY=
NOTIFY_EMAIL=
RESEND_FROM=
RESEND_DAILY_LIMIT=20
DATABASE_URL=
```

`RESEND_DAILY_LIMIT` is a Worker var (safe to commit). Secrets stay in `.dev.vars` / `wrangler secret put`.

Commit `.env.example` in the template. Never commit `.env`.

---

## 14. New site

Humans do not follow a 20-step click list.

```bash
provisioner create --slug clientname --domain clientname.com
# fill content in that project's Studio
```

QA after create:

- [ ] Green padlock
- [ ] `https://clientsite.com/sitemap-index.xml` loads
- [ ] `https://clientsite.com/robots.txt` loads
- [ ] `https://clientsite.com/build.json` loads
- [ ] Images load from Sanity CDN
- [ ] Lighthouse > 90
- [ ] Mobile check

### Forms (every new site)

Copy the contact form from the last live site. Do not invent a new submit path.

1. Seed D1 `sites` with a new `slug`, `notify_email`, `from_email`, `allowed_origins`
2. Site env: `PUBLIC_FORM_ENDPOINT`, `PUBLIC_TURNSTILE_SITE_KEY`, `PUBLIC_SITE_SLUG` (same as D1 slug)
3. Worker already has the shared `RESEND_DAILY_LIMIT=20` — do not raise it per client without a reason
4. UI must show **Message sent** and lock the form after `{ ok: true }`. Do not expose Resend success/failure.
5. Honeypot field name stays `website`. Bots get fake success and no D1 row. Real traffic over the email cap still gets a D1 row.
6. Test: submit once → row in `leads` + email (if under cap). Confirm over-cap rows stay with `email_sent_at` null and the page still says Message sent.

- [ ] Contact form writes to D1 and shows **Message sent** (even if Resend is skipped)
- [ ] Notify email arrives when under the 20/site/day cap; over-cap rows have empty `email_sent_at`
- [ ] Honeypot `website` does **not** create a D1 row
- [ ] Phone number visible on the contact page as fallback

---

## 15. Security

No PHP, no plugins, no login on the public site. Surface is identity.

- Hardware 2FA on tools@, Vercel, Sanity, GitHub, Cloudflare, 1Password
- `tools+vercel@`, `tools+sanity@` aliases so a leak is traceable
- Breakglass admin not on the same mailbox
- Vault per client in 1Password
- No shared Sanity/Vercel passwords among devs — one seat per person
- Form leads never in Sanity (Free datasets are publicly queryable)

---

## 16. Client handoff

Default: we manage. Handoff is rare and paid.

`provisioner eject --slug clientname` vendors shared packages into the client repo, then:

| Service | Transfer |
|---------|----------|
| GitHub | Repo → Settings → Transfer Ownership |
| Vercel | Client imports the transferred GitHub repo |
| Sanity | Transfer **that project** to the client's organisation |
| Cloudflare | Client adds domain; we provide DNS records |
| Resend | Client creates account, verifies domain, new API key |
| Better Stack | Client adds URL as monitor |

Give them `HANDOFF.md` from the ejected repo (accounts, Studio URL, env var names, who to call).

---

## 17. Scaling milestones

| Sites | Engineering work |
|-------|------------------|
| 1 | Factory works end-to-end |
| 10 | SEO schema, forms A, backup, staleness |
| 50 | Registry UI; throttle Sanity creates |
| 100 | Self-host uptime |
| 500+ | Vercel seat/usage review; Sanity support/rate limits |
| 1000 | Same tools. Second host only if Vercel fair use or cost forces it — via provisioner, not a template rewrite. Not Cloudflare Pages. |

---

## 18. Quick commands

```bash
# Factory
provisioner create --slug acme --domain acme.com
provisioner redeploy --slug acme
provisioner eject --slug acme

# Sanity (inside that project)
sanity dataset export production backup.tar.gz --project-id $SANITY_PROJECT_ID
sanity deploy   # Studio for this project

# Site
npm run build
npm run check
# confirm dist/build.json exists
```

---

## Support

| Service | Docs |
|---------|------|
| Astro | https://docs.astro.build |
| Vercel | https://vercel.com/docs |
| Sanity | https://www.sanity.io/docs |
| Cloudflare DNS | https://developers.cloudflare.com/dns |
| Resend | https://resend.com/docs |
| Better Stack | https://betterstack.com/docs |

---

*Last updated: August 2026 · Overview: `AGENCY-INFRASTRUCTURE.md`*
