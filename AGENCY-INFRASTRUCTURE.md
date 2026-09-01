# Agency Infrastructure — Management Overview

> For: Managers, CTO, Stakeholders  
> Stack: Astro + Sanity + Vercel + Cloudflare + Resend  
> Technical details: see `AGENCY-INFRASTRUCTURE-DEV.md`

---

## What We Use and Why

| Service | Role | Why We Chose It |
|---------|------|-----------------|
| **Vercel** | Hosts all websites | Automatic deploys, global CDN, zero server management |
| **GitHub** | Stores all code | Version control, team collaboration, deployment trigger |
| **Sanity** | Client content management | Clients edit their own content without touching code |
| **Cloudflare** | DNS, CDN, security, SSL | Free DDoS protection, global performance, SSL on every site |
| **Resend** | Contact form emails | Reliable email delivery for form submissions |
| **Better Stack** | Uptime monitoring | Alerts us instantly if any site goes down |

---

## Cost by Scale

| Scale | Monthly Cost | Per-Site Cost | Notes |
|-------|--------------|---------------|-------|
| **0-10 sites** | $20 | $2 | Almost everything on free tiers |
| **10-100 sites** | ~$232 | ~$2.32 | Sanity + monitoring upgrades |
| **100-1000 sites** | ~$550 | ~$0.80 | Switch to self-hosted monitoring |
| **1000+ sites** | ~$700+ | ~$0.50 | Multi-platform, further optimized |

**Costs decrease per site as we scale.** Most tools have generous free tiers that cover us until 10-20 sites.

---

## What Each Service Costs

| Service | Free Until | Then |
|---------|-----------|------|
| Vercel (hosting) | Always $20/mo flat | +$20/user if team grows |
| GitHub (code) | Unlimited repos free | $4/user/mo for advanced features |
| Sanity (CMS) | 2 users, 10GB | $99/mo for team access |
| Cloudflare (DNS/CDN/SSL) | Unlimited sites | $20/domain for advanced security |
| Resend (email/forms) | 3,000 emails/mo | $20/mo for 50,000 emails |
| Better Stack (monitoring) | 10 sites | $24/mo for 100 sites |
| Domain registration | — | ~$10/yr per domain (at cost, no markup) |

---

## Security

Every site is protected by:
- **SSL** — automatic HTTPS on every site, no setup needed
- **DDoS protection** — Cloudflare blocks attacks before they reach the site
- **WAF (Web Application Firewall)** — filters malicious traffic automatically
- **Form spam protection** — bots are blocked from contact forms

No additional security purchases needed at our current scale.

---

## Uptime & Monitoring

- Every site is checked every 3 minutes
- If a site goes down, the team gets an immediate Slack alert
- Every deployment is saved — we can roll back any site to a previous version in one click
- Free tier covers 10 sites; $24/mo covers 100 sites

---

## Backups

**Good news: there is no server to back up.** Our stack is serverless — nothing can "crash."

| What | Where it's stored | How we recover |
|------|-------------------|----------------|
| All code | GitHub | Restore any version via git history |
| Client content | Sanity | 30-day history, restore in one click |
| Client media | Sanity | Managed and backed up by Sanity |
| Live website | Vercel | One-click rollback to any deployment |

At 50+ sites we will add automated weekly exports of content to Cloudflare R2 storage (~$0-2/mo).

---

## Client Hosting Models

When a client asks "can I own my own website?", we offer two options:

### Option A: We Manage (Recommended)
- Client pays us a monthly retainer ($50-150/mo)
- We own all accounts and handle everything
- Client gets peace of mind, we get recurring revenue

### Option B: Full Handoff
- One-time additional fee of $500-1000
- We transfer all accounts to the client
- Client takes over 6 services (Vercel, GitHub, Sanity, Cloudflare, Resend, Better Stack)
- Client is responsible for all maintenance going forward

**Most small business clients choose Option A** — they don't want to manage 6 accounts.

---

## Scaling Plan

| Milestone | Key Change | Cost Impact |
|-----------|-----------|-------------|
| **10 sites** | Everything running smoothly on free tiers | $20/mo |
| **50 sites** | Upgrade Sanity + monitoring, set up backups | ~$150/mo |
| **100 sites** | Self-host monitoring (unlimited, flat cost) | ~$232/mo |
| **500 sites** | Evaluate multi-platform hosting strategy | ~$500/mo |
| **1000+ sites** | Dedicated infrastructure, DevOps hire | ~$700+/mo |

---

## Action Items (Today)

| Priority | Task | Cost | Time |
|----------|------|------|------|
| 1 | Create GitHub Organization | Free | 10 min |
| 2 | Sign up for Cloudflare | Free | 10 min |
| 3 | Sign up for Resend | Free | 10 min |
| 4 | Sign up for Better Stack | Free | 10 min |
| 5 | Create base site template | Free | 2-3 hrs (dev) |

**Total to get started: $20/mo (Vercel) + free everything else**

---

*Last updated: August 2026 · Technical details: AGENCY-INFRASTRUCTURE-DEV.md*
