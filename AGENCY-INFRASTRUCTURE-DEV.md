# Agency Infrastructure — Developer Reference

> For: Developers  
> Stack: Astro v7 + Sanity + Vercel + Cloudflare + Resend  
> Management overview: see `AGENCY-INFRASTRUCTURE.md`

---

## Table of Contents

1. [Repository Structure](#1-repository-structure)
2. [Hosting — Vercel](#2-hosting--vercel)
3. [Code — GitHub](#3-code--github)
4. [CMS — Sanity](#4-cms--sanity)
5. [DNS / CDN / SSL — Cloudflare](#5-dns--cdn--ssl--cloudflare)
6. [Domain Registration](#6-domain-registration)
7. [Form Submission + Email — Resend](#7-form-submission--email--resend)
8. [Caching](#8-caching)
9. [Security](#9-security)
10. [Monitoring — Better Stack / Uptime Kuma](#10-monitoring--better-stack--uptime-kuma)
11. [Backups](#11-backups)
12. [Client Handoff](#12-client-handoff)
13. [New Site Checklist](#13-new-site-checklist)
14. [Environment Variables](#14-environment-variables)
15. [Quick Start Commands](#15-quick-start-commands)
16. [Scaling Milestones](#16-scaling-milestones)

---

## 1. Repository Structure

### GitHub Organization Layout

```
your-agency/
├── astro-sanity-template     ← clone this for every new client site
├── client-a-website
├── client-b-website
└── agency-internal-tools     ← scripts, dashboards, internal docs
```

### Base Template Repo Must Include

```
astro-sanity-template/
├── src/
│   ├── lib/sanity.client.ts   ← Sanity client config
│   ├── pages/
│   │   └── api/
│   │       └── contact.ts     ← Resend form handler
│   └── components/
│       └── ContactForm.astro  ← Form UI
├── public/
│   └── robots.txt
├── vercel.json                ← caching headers
├── astro.config.ts            ← sitemap integration
├── .env.example               ← all required env vars
└── HANDOFF.md                 ← client handoff template
```

---

## 2. Hosting — Vercel

**Dashboard:** https://vercel.com/dashboard  
**Docs:** https://vercel.com/docs

### Initial Setup

1. Create **Team** account (not personal — personal accounts can't be transferred)
2. Connect GitHub Organization: Settings → Git → Install GitHub App
3. Per site: Import Project → select repo → configure

### Per-Site Deployment Config

```typescript
// astro.config.ts
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: import.meta.env.SITE_URL,
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
});
```

### Environment Variables in Vercel

- Project → Settings → Environment Variables
- Set scope to **Production** (and Preview if needed)
- Redeploy after adding/changing vars

### Rollback a Deployment

Vercel Dashboard → Project → Deployments → find previous → ··· → Promote to Production

### Pricing

| Tier | Cost | Projects |
|------|------|----------|
| Hobby | Free | 3 |
| Pro | $20/mo | Unlimited |
| Team | $20/user/mo | Unlimited |

---

## 3. Code — GitHub

**Dashboard:** https://github.com/organizations/YOUR_ORG

### Create Organization

1. https://github.com/organizations/new → choose Free
2. Invite team members with appropriate roles
3. Set base permissions: Members → Read

### Create New Site from Template

```bash
# Using GitHub CLI
gh repo create your-org/clientname-website \
  --template your-org/astro-sanity-template \
  --private \
  --clone

cd clientname-website
npm install
```

### Branch Strategy

- `main` → production (auto-deploys to live site)
- `dev` → staging (Vercel preview deployment)
- Feature branches → PR previews

### Pricing

| Tier | Cost | When to upgrade |
|------|------|-----------------|
| Free | $0 | Start here |
| Team | $4/user/mo | Need code owners, required reviews, advanced permissions |

---

## 4. CMS — Sanity

**Dashboard:** https://sanity.io/manage  
**Docs:** https://www.sanity.io/docs

### Strategy: One Project, Multiple Datasets

One Sanity project for the entire agency. Each client = one dataset.

```bash
# Initial setup (one time)
npm create sanity@latest  # create the agency project

# Per client
sanity dataset create clientname --visibility public
sanity dataset list  # verify
```

### Sanity Client (Production)

```typescript
// src/lib/sanity.client.ts
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,          // Always true in production
  perspective: 'published',
});

// For preview/draft mode only
export const previewClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'previewDrafts',
  token: import.meta.env.SANITY_API_TOKEN,
});
```

### Adding a Client User to Sanity Studio

```bash
sanity users invite client@email.com --role viewer
# or
sanity users invite client@email.com --role editor
```

### Export Dataset (Manual Backup)

```bash
sanity dataset export production backup-$(date +%Y-%m-%d).tar.gz \
  --project-id YOUR_PROJECT_ID
```

### Pricing

| Tier | Users | Assets | API Requests | Cost |
|------|-------|--------|--------------|------|
| Free | 2 | 10GB | 500K/mo | $0 |
| Growth | 20 | 100GB | 2M/mo | $99/mo |
| Enterprise | Unlimited | Unlimited | Unlimited | Custom |

---

## 5. DNS / CDN / SSL — Cloudflare

**Dashboard:** https://dash.cloudflare.com  
**Docs:** https://developers.cloudflare.com

### Per-Domain Setup

1. Add domain to Cloudflare → get nameservers
2. Update nameservers at registrar (propagation: 1-24 hours)
3. Add DNS records:

```
Type    Name    Content                   TTL      Proxy
CNAME   @       cname.vercel-dns.com      Auto     Proxied ✅
CNAME   www     cname.vercel-dns.com      Auto     Proxied ✅
TXT     @       [Google/Resend/etc verifications]  DNS only
```

4. SSL/TLS → set to **Full (strict)**
5. Enable **Always Use HTTPS**
6. Enable **Bot Fight Mode** (Security → Bots)

### Vercel Domain Configuration

In Vercel: Project → Settings → Domains → Add domain

Vercel will show you the exact CNAME to use. Always choose **Proxied** in Cloudflare.

### Cloudflare Tiers

| Feature | Free | Pro ($20/domain) |
|---------|------|-----------------|
| CDN | ✅ | ✅ |
| DDoS | ✅ | ✅ |
| SSL | ✅ | ✅ |
| Basic WAF | ✅ | ✅ |
| Advanced WAF rules | ❌ | ✅ |
| Image resizing | ❌ | ✅ |

Free tier is sufficient for 0-200 sites.

---

## 6. Domain Registration

**Dashboard:** https://dash.cloudflare.com → Domain Registration

At-cost pricing (Cloudflare passes ICANN costs directly, no margin).

| TLD | Price/yr |
|-----|----------|
| .com | $9.77 |
| .net | $10.70 |
| .org | $10.11 |
| .io | $33.98 |
| .co | $11.87 |
| .dev | $12.00 |

### Transfer Existing Domain to Cloudflare

1. Unlock domain at current registrar
2. Get EPP/authorization code
3. Cloudflare → Domain Registration → Transfer → enter domain + code
4. Approve transfer email
5. Wait 5-7 days

---

## 7. Form Submission + Email — Resend

**Dashboard:** https://resend.com  
**Docs:** https://resend.com/docs  
**SDK:** `npm install resend`

### Architecture

```
ContactForm.astro (UI)
    │ fetch POST
    ▼
src/pages/api/contact.ts (API route)
    │ honeypot check + validation
    ▼
Resend API
    │
    ├── Email to client (notification)
    └── Email to user (confirmation)
```

### Resend Domain Setup

1. resend.com → Domains → Add Domain → enter your sending domain
2. Add DNS records to Cloudflare:

```
Type    Name                    Content
TXT     resend._domainkey       (DKIM key from Resend dashboard)
TXT     @                       v=spf1 include:_spf.resend.com ~all
```

3. Wait for verification (usually < 5 minutes)
4. Create API key: resend.com → API Keys → Create

### API Route Implementation

```typescript
// src/pages/api/contact.ts
import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone, message, website } = body;

    // Honeypot — bots fill this, humans don't
    if (website) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // Validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Notify business
    await resend.emails.send({
      from: `${import.meta.env.SITE_NAME} <noreply@youragency.com>`,
      to: import.meta.env.NOTIFY_EMAIL,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    // Confirm to user
    await resend.emails.send({
      from: `${import.meta.env.SITE_NAME} <noreply@youragency.com>`,
      to: email,
      subject: `We received your message`,
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out. We'll be in touch within 24 hours.</p>
        <p>${import.meta.env.SITE_NAME}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send' }),
      { status: 500 }
    );
  }
};
```

### Contact Form Component

```astro
---
// src/components/ContactForm.astro
---
<form id="contact-form" class="space-y-6">
  <div>
    <label for="name" class="block text-sm font-medium">Name *</label>
    <input type="text" id="name" name="name" required
      class="mt-1 block w-full rounded-md border px-4 py-3 focus:border-accent" />
  </div>

  <div>
    <label for="email" class="block text-sm font-medium">Email *</label>
    <input type="email" id="email" name="email" required
      class="mt-1 block w-full rounded-md border px-4 py-3 focus:border-accent" />
  </div>

  <div>
    <label for="phone" class="block text-sm font-medium">Phone</label>
    <input type="tel" id="phone" name="phone"
      class="mt-1 block w-full rounded-md border px-4 py-3 focus:border-accent" />
  </div>

  <div>
    <label for="message" class="block text-sm font-medium">Message *</label>
    <textarea id="message" name="message" rows="4" required
      class="mt-1 block w-full rounded-md border px-4 py-3 focus:border-accent"></textarea>
  </div>

  <!-- Honeypot: hidden from users, bots fill it -->
  <input type="text" name="website" class="hidden" tabindex="-1" autocomplete="off" />

  <button type="submit"
    class="w-full bg-accent text-black font-semibold py-3 px-6 rounded-md hover:bg-accent/90 transition-colors">
    Send Message
  </button>

  <p id="form-status" class="text-center hidden"></p>
</form>

<script>
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const status = document.getElementById('form-status')!;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    if (data.website) return; // Honeypot triggered

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        status.textContent = "Thanks! We'll be in touch soon.";
        status.className = 'text-center text-green-600 font-medium';
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      status.textContent = 'Something went wrong. Please try again.';
      status.className = 'text-center text-red-600 font-medium';
    }

    status.classList.remove('hidden');
  });
</script>
```

### Upgrading Spam Protection: Cloudflare Turnstile

For high-traffic forms, add Turnstile (free CAPTCHA from Cloudflare):

**Step 1:** Cloudflare Dashboard → Turnstile → Add Site → get site key + secret key

**Step 2:** Add to form

```html
<div class="cf-turnstile" data-sitekey={import.meta.env.TURNSTILE_SITE_KEY}></div>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
```

**Step 3:** Verify in API route (before sending email)

```typescript
const token = body['cf-turnstile-response'];
const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    secret: import.meta.env.TURNSTILE_SECRET_KEY,
    response: token,
  }),
});
const result = await verify.json();
if (!result.success) {
  return new Response(JSON.stringify({ error: 'Bot check failed' }), { status: 400 });
}
```

### Pricing

| Tier | Emails/mo | Cost |
|------|-----------|------|
| Free | 3,000 | $0 |
| Pro | 50,000 | $20/mo |
| Pro+ | 100,000 | $45/mo |

One Resend account for the whole agency. One API key shared across all sites.

---

## 8. Caching

### Browser + Edge Caching (vercel.json)

Add this to the root of every site:

```json
{
  "headers": [
    {
      "source": "/_astro/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*).html",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, s-maxage=86400, stale-while-revalidate=604800" }
      ]
    }
  ]
}
```

| Rule | What it does |
|------|-------------|
| `/_astro/*` immutable | Hashed assets cached forever in browser |
| HTML must-revalidate | Pages always fetched fresh |
| s-maxage=86400 | Edge/CDN caches everything for 24h |
| stale-while-revalidate=604800 | Serve stale for 7 days while fetching new |

### Sanity CDN

Always `useCdn: true` in production. Sanity's global CDN caches GROQ query results. Never use `useCdn: false` except in preview/draft mode.

### ISR (Optional for Dynamic Sites)

If using `output: 'hybrid'`, configure ISR in `astro.config.ts`:

```typescript
adapter: vercel({
  isr: {
    expiration: 60 * 60, // revalidate every hour
    bypassToken: import.meta.env.ISR_BYPASS_TOKEN,
  },
}),
```

---

## 9. Security

### Cloudflare (Set Once Per Domain)

| Setting | Location | Value |
|---------|----------|-------|
| SSL/TLS mode | SSL/TLS → Overview | Full (strict) |
| Always HTTPS | SSL/TLS → Edge Certs | On |
| Bot Fight Mode | Security → Bots | On |
| Browser Integrity Check | Security → Settings | On |
| Min TLS version | SSL/TLS → Edge Certs | TLS 1.2 |

### Security Headers (via vercel.json)

Add to the `headers` array in `vercel.json`:

```json
{
  "source": "/(.*)",
  "headers": [
    { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
    { "key": "X-Content-Type-Options", "value": "nosniff" },
    { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
    { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
  ]
}
```

---

## 10. Monitoring — Better Stack / Uptime Kuma

### Better Stack (0-100 sites)

**Dashboard:** https://uptime.betterstack.com

1. Create account and team workspace
2. Per site: New Monitor → HTTP → enter URL → save
3. Notifications: Integrations → add Slack webhook
4. Slack channel: `#website-alerts`

**Monitor settings:**
- Type: HTTP(s)
- Check interval: 3 min (free) / 30 sec (paid)
- Timeout: 30 seconds
- Regions: select 2+ for accuracy

**API — add monitor programmatically:**

```bash
curl -X POST "https://uptime.betterstack.com/api/v2/monitors" \
  -H "Authorization: Bearer $BETTERSTACK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://clientsite.com",
    "monitor_type": "status",
    "name": "Client Name",
    "check_frequency": 180
  }'
```

| Tier | Monitors | Cost |
|------|----------|------|
| Free | 10 | $0 |
| Team | 100 | $24/mo |
| Business | 500 | $85/mo |

### Uptime Kuma (100+ sites — self-hosted)

Deploy on a $5-10/mo VPS (Hetzner or DigitalOcean):

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh

# Run Uptime Kuma
docker run -d \
  -p 3001:3001 \
  -v uptime-kuma:/app/data \
  --restart always \
  --name uptime-kuma \
  louislam/uptime-kuma

# Access at http://YOUR_VPS_IP:3001
```

Unlimited monitors, unlimited sites, flat VPS cost.

---

## 11. Backups

### Skip Until 50+ Sites

At 0-50 sites everything is already protected:

| Data | Where | Recovery |
|------|-------|----------|
| Code | GitHub | `git checkout <commit>` |
| Content | Sanity (30-day history) | Restore from Sanity dashboard |
| Media | Sanity | Managed by Sanity |
| Deployments | Vercel | Promote previous deployment |

There is no server — Vercel is serverless. Nothing to back up at the infrastructure level.

### 50+ Sites: Automated Sanity → Cloudflare R2

**Cloudflare R2:** First 10GB free, $0.015/GB after, **free egress** (unlike S3).

**Step 1:** Set up R2

1. Cloudflare Dashboard → R2 → Create Bucket: `agency-backups`
2. Manage R2 API Tokens → Create Token (Object Read & Write)
3. Save: Account ID, Access Key ID, Secret Access Key

**Step 2:** Add GitHub Secrets to your repo

```
SANITY_PROJECT_ID
SANITY_AUTH_TOKEN
R2_ACCOUNT_ID
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
```

**Step 3:** Create `.github/workflows/backup.yml`

```yaml
name: Weekly Backup → Cloudflare R2

on:
  schedule:
    - cron: '0 2 * * 0'   # Every Sunday 2am UTC
  workflow_dispatch:        # Manual trigger

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install Sanity CLI
        run: npm install -g @sanity/cli

      - name: Export Sanity dataset
        run: |
          FILENAME="sanity-backup-$(date +%Y-%m-%d).tar.gz"
          echo "FILENAME=$FILENAME" >> $GITHUB_ENV
          sanity dataset export production $FILENAME \
            --project-id ${{ secrets.SANITY_PROJECT_ID }}
        env:
          SANITY_AUTH_TOKEN: ${{ secrets.SANITY_AUTH_TOKEN }}

      - name: Upload to Cloudflare R2
        uses: ryand56/r2-upload-action@latest
        with:
          r2-account-id: ${{ secrets.R2_ACCOUNT_ID }}
          r2-access-key-id: ${{ secrets.R2_ACCESS_KEY_ID }}
          r2-secret-access-key: ${{ secrets.R2_SECRET_ACCESS_KEY }}
          r2-bucket: agency-backups
          source-dir: ./
          destination-dir: sanity/
          multipart-size: 100
          max-retries: 3
```

**Retention:** Keep last 4 weekly + last 12 monthly. Cost: ~$0-2/mo.

---

## 12. Client Handoff

### Model A: Agency Manages (Recurring Revenue)

Agency owns all accounts. Client pays monthly retainer. Preferred model.

### Model B: Full Transfer to Client

Client creates these 6 accounts, you transfer ownership:

| Service | Transfer Method |
|---------|----------------|
| GitHub | Repo → Settings → Transfer Ownership |
| Vercel | Client imports the transferred GitHub repo |
| Sanity | Manage → Members → Transfer project ownership |
| Cloudflare | Client adds domain, you provide DNS records |
| Resend | Client creates account, adds domain, get new API key |
| Better Stack | Client creates account, adds URL as monitor |

### Handoff Document to Give Client

Create a `HANDOFF.md` in the repo:

```markdown
# Website Handoff — [Client Name]

## Your Accounts
- GitHub: [username]
- Vercel: [username] — hosts your website
- Sanity: [username] — where you edit content
- Cloudflare: [username] — manages your domain
- Resend: [username] — sends form notification emails
- Better Stack: [username] — alerts if site goes down

## How to Edit Content
1. Go to https://your-studio.sanity.io
2. Log in with your Sanity account
3. Edit and publish

## How the Site Updates
Automatically. Any code change merged to `main` deploys in ~2 minutes.

## Environment Variables (store securely)
SANITY_PROJECT_ID = xxxxxxxx
SANITY_DATASET    = your-dataset
RESEND_API_KEY    = re_xxxx
NOTIFY_EMAIL      = your@email.com
SITE_NAME         = Your Business Name
SITE_URL          = https://yoursite.com

## Support
For code changes: hire a developer
For content: use Sanity Studio
For domain/DNS issues: Cloudflare support (cloudflare.com/support)
For hosting issues: Vercel support (vercel.com/support)
```

---

## 13. New Site Checklist

### Code

- [ ] `gh repo create your-org/clientname-website --template your-org/astro-sanity-template --private`
- [ ] Update `package.json` name
- [ ] Update `astro.config.ts` site URL (use `SITE_URL` env var)

### Sanity

- [ ] `sanity dataset create clientname`
- [ ] Import initial content schema/data if needed

### Vercel

- [ ] Import project from GitHub
- [ ] Set all environment variables (see Section 14)
- [ ] Add custom domain
- [ ] Verify build passes

### Cloudflare

- [ ] Add domain to Cloudflare
- [ ] Update nameservers at registrar
- [ ] Add CNAME records (@ and www → Vercel)
- [ ] Enable proxy (orange cloud)
- [ ] SSL → Full (strict)
- [ ] Always Use HTTPS → On

### Resend

- [ ] Add DNS records for domain verification (TXT records)
- [ ] Verify domain in Resend dashboard
- [ ] Test contact form end-to-end

### Monitoring

- [ ] Add to Better Stack / Uptime Kuma
- [ ] Verify Slack alert fires on test

### Final

- [ ] Green padlock in browser
- [ ] `https://clientsite.com/sitemap-index.xml` loads
- [ ] `https://clientsite.com/robots.txt` loads
- [ ] Contact form delivers email
- [ ] Lighthouse score > 90 (run in Chrome DevTools)
- [ ] Mobile responsive check

---

## 14. Environment Variables

### Required (Every Site)

```bash
# Sanity
SANITY_PROJECT_ID=xxxxxxxx          # from sanity.io/manage
SANITY_DATASET=clientname           # created with sanity dataset create

# Resend — same API key for all agency sites
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Site-specific
NOTIFY_EMAIL=info@clientsite.com    # receives form submissions
SITE_NAME=Client Business Name      # used in email subjects
SITE_URL=https://clientsite.com     # used for sitemap canonical
```

### Optional

```bash
# Cloudflare Turnstile (form spam protection)
TURNSTILE_SITE_KEY=0x4xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TURNSTILE_SECRET_KEY=0x4xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ISR bypass token (if using hybrid output)
ISR_BYPASS_TOKEN=your-secret-token

# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### .env.example (commit this to the template repo)

```bash
# Copy to .env and fill in values
SANITY_PROJECT_ID=
SANITY_DATASET=
RESEND_API_KEY=
NOTIFY_EMAIL=
SITE_NAME=
SITE_URL=

# Optional
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

---

## 15. Quick Start Commands

```bash
# ── New site ──────────────────────────────────────────────────
gh repo create your-org/clientname-website \
  --template your-org/astro-sanity-template \
  --private --clone

cd clientname-website
cp .env.example .env
# fill in .env values

npm install
npm run dev

# ── Sanity ────────────────────────────────────────────────────
sanity dataset create clientname
sanity dataset list
sanity dataset export production backup.tar.gz

# ── Vercel ────────────────────────────────────────────────────
vercel --prod              # manual deploy
vercel env pull            # pull env vars locally
vercel rollback            # roll back last deployment

# ── Better Stack monitor ──────────────────────────────────────
curl -X POST "https://uptime.betterstack.com/api/v2/monitors" \
  -H "Authorization: Bearer $BETTERSTACK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://clientsite.com","monitor_type":"status","name":"Client Name","check_frequency":180}'

# ── Build check ───────────────────────────────────────────────
npm run build
npm run check   # astro check + ESLint + Prettier
npm run preview # preview production build
```

---

## 16. Scaling Milestones

### At 10 Sites
- Template repo tested and stable
- All sites monitored (Better Stack free tier covers 10)
- New site workflow documented and repeatable

### At 50 Sites
- Upgrade Sanity to Growth ($99/mo)
- Upgrade Better Stack to Team ($24/mo) for 100 monitors
- Set up automated Sanity backups to Cloudflare R2
- Consider a simple internal Notion/Airtable for site inventory

### At 100 Sites
- Switch to **Uptime Kuma** (self-hosted, unlimited, ~$10/mo VPS)
- Evaluate Cloudflare Pages for lower-cost hosting on budget sites
- Build or buy an internal dashboard to manage all sites
- Automate new site provisioning with a single CLI script

### At 500 Sites
- Multi-platform hosting: Vercel (premium clients), Cloudflare Pages (standard), Coolify (budget)
- Evaluate self-hosted CMS (Strapi or Directus) instead of Sanity for cost savings
- Consider a dedicated DevOps hire
- Enterprise Cloudflare for advanced WAF + analytics

### At 1000+ Sites
- Custom monitoring stack: Prometheus + Grafana + Loki
- Enterprise agreements with Vercel, Cloudflare, GitHub
- Dedicated infrastructure team
- Multi-region redundancy strategy

---

## Support & Documentation

| Service | Docs | Community |
|---------|------|-----------|
| Astro | docs.astro.build | discord.gg/astro |
| Vercel | vercel.com/docs | github.com/vercel/vercel |
| Sanity | sanity.io/docs | slack.sanity.io |
| Cloudflare | developers.cloudflare.com | community.cloudflare.com |
| Resend | resend.com/docs | resend.com/discord |
| Better Stack | betterstack.com/docs | — |
| Uptime Kuma | github.com/louislam/uptime-kuma | — |

---

*Last updated: August 2026 · Management overview: AGENCY-INFRASTRUCTURE.md*
