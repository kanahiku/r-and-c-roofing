# Agency Infrastructure — Management Overview

> For: Managers, CTO, Stakeholders  
> Stack: Astro (static) + Sanity + Vercel + Cloudflare DNS + Resend + GitHub  
> Technical details: see `AGENCY-INFRASTRUCTURE-DEV.md`  
> Decision record: Massic stack review, August 2026

---

## What we are building

Marketing websites only. No app backend. Every page (Home, inner pages, blog) is edited in Sanity and built to static HTML. We own every account; the client pays a retainer. Clients are not invited to Studio unless they insist.

**Optimised for:** scale to 1,000+ sites, isolation (one site cannot take down another), and **no one-way doors** (we can change host without rebuilding sites).

---

## Final stack

| Service | Role | Why |
|---------|------|-----|
| **Vercel Pro** (one team) | Hosts static files | Unlimited projects, previews, rollback. Commercial work needs Pro. Portable if we never use Vercel-only features. |
| **GitHub Organisation** | Code | One org, one private repo per client. Shared UI/schema as a private package. |
| **Sanity** | CMS | One agency **organisation**, **one project per website**. Content, users, and quotas isolated. |
| **Cloudflare** | DNS only | One account, one zone per client. Not Pages, not proxied CDN. |
| **Namecheap** | Domain registrar | Domains never registered at the host. |
| **Forms** | Separate service (Plan A) | Leads stored before email. Never a Vercel function. Formspree (Plan B) only as a short interim. |
| **Cloudflare Turnstile** | Form spam | Free, verified at the form endpoint. |
| **Resend** | Notification email | Send from each client's verified domain. |
| **Better Stack** | Uptime | Different vendor from the host. Self-host past ~100 monitors. |
| **1Password** | Secrets | Vault per client. No shared logins. |
| **Registry + scripts** | Fleet (replaces GridPane) | Every site created by script. Disaster recovery = point scripts at another host. |

**Dropped (WordPress-era):** Wordfence, W3 Total Cache, Divi, WP Mail SMTP, Yoast, GridPane, server backups.

---

## Non-negotiable rules (keep the exit door open)

1. Every site is **pure static**. `npm run build` produces HTML/CSS/JS. No SSR, no server islands.
2. **No Vercel-only features** in the client template (no Vercel Image, KV, Blob, Postgres, Analytics, middleware, domains at Vercel).
3. **Nothing dynamic on the host.** Forms run on a separate service.
4. **Images from Sanity's CDN**, not Vercel.
5. Vercel build machines: **Standard**, never Turbo (scripted at provision time).

Breaking these is what would force a mid-journey rewrite.

---

## Sanity tenancy (do not reopen)

```
Agency Sanity Organisation     ← one bill, our team
  ├── Project: client-a        ← client-a.com only
  ├── Project: client-b
  └── …
```

- **Never** one project with a dataset per client. Datasets cannot be transferred out.
- Agency people: Administrator on every project (individual logins, no shared password).
- Client: **not invited by default**. If they must edit: Administrator **on their project only**, never Organisation admin. That keeps the Free plan ($0) and isolates blast radius.
- Editor role = Growth ($15/seat **per project**). Do not use it as the default; at 500 sites it would be thousands per month.

There is no max project count. There is a **5 new projects per hour** cap — ask Sanity to raise it before we batch-provision.

---

## Cost by scale

Assumes: ~20-page brochure sites, ~1,500 visits/mo, images on Sanity CDN, ~8 builds/site/mo, Standard machines, clients not on Growth, 3–5 Vercel seats. Domains billed through to clients.

| Sites | Total / mo | Per site | Notes |
|-------|------------|----------|--------|
| **10** | ~$110 | ~$11 | Flat tools; factory cost, not per-site |
| **50** | ~$140 | ~$2.80 | Better Stack paid |
| **100** | ~$212 | ~$2.12 | |
| **500** | ~$298 | ~$0.60 | Self-hosted uptime; some Vercel overage |
| **1,000** | ~$505 | ~$0.51 | Still this stack. Talk to Vercel/Sanity for fleet support, do not change CMS |

**Marginal cost of one more site: ~$0.35–$0.60/mo plus domain.**

WordPress/GridPane is cheaper below ~25 sites, then hits a cliff. We expect to pass that in the first months.

**Cliffs to avoid:** Sanity Growth as default; Vercel Turbo machines; 1Password 11th seat; Better Stack monitors past 100 without self-hosting; card limits too tight (a declined Vercel card takes every site down).

---

## Security

No PHP, no plugins, no login on the public site. Surface is **identity**.

- 2FA everywhere, least-privilege, no shared logins
- SSL via Vercel (automatic)
- DDoS/WAF: not required on the host for static files; Cloudflare stays DNS-only unless we later choose to proxy (not default)
- Form spam: Turnstile
- Form leads: **never stored in Sanity** (Free datasets are publicly queryable)

---

## Uptime, builds, and backups

- Better Stack: HTTP check per site. Slack on down.
- Vercel + GitHub: build failures → Slack, named from the **registry**, not the repo slug.
- **Staleness job:** uptime cannot see a failed rebuild. Each build writes `/build.json`. Nightly job compares to Sanity activity → one Slack digest.
- Code: GitHub. Content: Sanity history (Free ~3 days) **plus nightly export to R2**. Host: Vercel rollback.
- Quarterly: redeploy one live site to a **different** host from scripts only. If we have never done it, we do not have an exit door.

---

## Client model

**We manage (default).** Client pays retainer. We own GitHub, Vercel, Sanity, Cloudflare, Resend, monitoring. They get the website and optional Studio on *their* project only.

**Handoff (rare, paid).** Eject the shared package into their repo, transfer that GitHub repo, that Sanity **project**, DNS records. Not six mystery accounts without a script.

---

## Scaling — add capacity, do not change tools

| Milestone | Change |
|-----------|--------|
| **Site 1** | Registry + provisioner exist. No dashboard clicking. |
| **10** | Template + SEO layer + forms + backups + staleness live. |
| **50** | Inventory UI on the registry. Backups proven. |
| **100** | Self-host uptime. Resend may go paid (~150 sites on volume). |
| **500–1,000** | Extra Vercel seats; Sanity rate-limit/support conversation. Still Astro + Sanity + Vercel. **Not** Cloudflare Pages (100-project cap). |

---

## Action items to start (this week)

| Priority | Task | Owner |
|----------|------|--------|
| 1 | GitHub Organisation on tools@, 2FA, 1Password vaults | |
| 2 | Sanity Organisation (agency). Do not create client datasets in one project. | |
| 3 | Vercel Team Pro, 3 seats, GitHub connected | |
| 4 | Cloudflare (DNS), Namecheap, Resend, Better Stack, Slack webhook | |
| 5 | Virtual card per vendor with 3× headroom | |
| 6 | Email Sanity: raise 5-projects/hour cap | |
| 7 | **Build registry + `provisioner create/teardown/redeploy`** | Engineering |
| 8 | **Build client template:** static Astro, shared schema/UI, SEO, `build.json`, form URL env | Engineering |
| 9 | Form Plan A service (or Formspree with same env var until A ships) | Engineering |
| 10 | Nightly Sanity → R2 backup + staleness job | Engineering |

Do not start the 10th client site until 7–8 work without opening Vercel by hand.

**First commercial site** is created only by `provisioner create`. Existing site repos (e.g. a single AstroWind project) are **clients**, not the factory.

---

## Open decisions

| Item | Recommendation |
|------|----------------|
| Forms Plan A vs B | Plan A. Plan B only to unblock launch (`PUBLIC_FORM_ENDPOINT`). |
| Client as Sanity Admin | Yes, **if** invited, and only on their project. Default is no invite. |
| Backup retention | Decide in weeks (Free history is ~3 days). |
| Better Stack / Vercel rates | Re-check vendor pages at purchase; they move. |

---

## Credit card limits

One virtual card per platform, so a single card failure cannot take down every service. Limits should carry ~3× expected spend and be reviewed quarterly. A declined Vercel payment suspends the account and takes every site offline.

| Card | 10 sites | 100 sites | 500 sites | 1,000 sites |
|------|----------|-----------|-----------|-------------|
| Vercel | $200 | $250 | $500 | $1,000 |
| Sanity | $50 | $100 | $250 | $500 |
| Better Stack | $50 | $250 | $150 | $150 |
| Resend | $50 | $50 | $100 | $150 |
| Namecheap | $200 | $500 | $1,500 | $3,000 |
| Forms infrastructure | $100 | $150 | $200 | $300 |
| 1Password | $100 | $100 | $100 | $150 |
| Cloudflare | $50 | $50 | $50 | $50 |

---

*Last updated: August 2026 · Technical: `AGENCY-INFRASTRUCTURE-DEV.md`*
