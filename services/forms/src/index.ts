export interface Env {
  DB: D1Database;
  /** Legacy fallback for sites not yet migrated to a dedicated binding. */
  TURNSTILE_SECRET: string;
  RESEND_API_KEY: string;
  /** Extra origins as JSON array or comma-separated list. */
  ALLOWED_ORIGINS?: string;
  /** Notify emails per site per UTC day. Extra leads still save. Default 20. */
  RESEND_DAILY_LIMIT?: string;
}

interface SiteRow {
  slug: string;
  name: string;
  notify_email: string;
  from_email: string;
  from_name: string;
  allowed_origins: string;
  pdf_daily_limit: number | null;
}

interface Submission {
  site: string;
  name: string;
  email: string;
  phone: string;
  street: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  message: string;
  website: string;
  turnstileToken: string;
}

interface PdfSummary {
  site: string;
  email: string;
  pdf: string;
  filename: string;
  website: string;
  turnstileToken: string;
}

interface ResendEmail {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  attachments?: { filename: string; content: string }[];
}

interface QueuedLead extends Submission {
  leadId: string;
  siteName: string;
  notifyEmail: string;
  fromEmail: string;
  attempts: number;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZIP_RE = /^\d{5}(?:-\d{4})?$/;
const MAX = {
  name: 120,
  email: 254,
  phone: 40,
  street: 120,
  address2: 80,
  city: 80,
  state: 2,
  zip: 10,
  message: 5000,
};
const US_STATE_CODES = new Set([
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
]);
const DEFAULT_RESEND_DAILY_LIMIT = 20;
const MAX_PDF_B64 = 3_500_000;
const PDF_KIND = 'checkup-pdf';
const DEFAULT_PDF_FILENAME = 'website-summary.pdf';

/** Always allowed so local + Vercel preview/prod work before a custom domain exists. */
const DEFAULT_ORIGIN_PATTERNS = [
  'http://localhost:*',
  'http://127.0.0.1:*',
  'https://*.vercel.app',
  'https://roofinspectionhawaii.com',
  'https://www.roofinspectionhawaii.com',
];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') || '';
    const url = new URL(request.url);

    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/health')) {
      return health(env);
    }

    if (request.method === 'OPTIONS') {
      if (!isHttpOrigin(origin)) {
        return json({ ok: false, error: 'Origin not allowed' }, 403);
      }
      return cors(origin, new Response(null, { status: 204 }));
    }

    const patterns = defaultPatterns(env);

    if (request.method !== 'POST') {
      return withCors(origin, patterns, json({ ok: false, error: 'Method not allowed' }, 405));
    }

    if (url.pathname === '/email-summary') {
      return handleEmailSummary(request, env, origin, patterns);
    }

    if (url.pathname !== '/submit' && url.pathname !== '/') {
      return withCors(origin, patterns, json({ ok: false, error: 'Not found' }, 404));
    }

    try {
      const body = await readBody(request);

      if ((body.website || '').trim().length > 0) {
        return withCors(origin, patterns, json({ ok: true }));
      }

      const parsed = validate(body);
      if ('error' in parsed) {
        return earlyCors(origin, json({ ok: false, error: parsed.error }, 400));
      }

      const site = await env.DB.prepare('SELECT * FROM sites WHERE slug = ?').bind(parsed.site).first<SiteRow>();

      if (!site) {
        return earlyCors(origin, json({ ok: false, error: 'Unknown site' }, 400));
      }

      const allowed = [...patterns, ...parseOrigins(site.allowed_origins)];
      if (origin && !originAllowed(origin, allowed)) {
        return json({ ok: false, error: 'Origin not allowed' }, 403);
      }

      const turnstileSecret = turnstileSecretForSite(env, site.slug);
      if (!turnstileSecret) {
        console.error(`Turnstile is not configured for ${site.slug}`);
        return withCors(origin, allowed, json({ ok: false, error: 'Spam check is not configured' }, 500));
      }

      const turnstileOk = await verifyTurnstile(parsed.turnstileToken, turnstileSecret, request, site.slug, origin);
      if (!turnstileOk) {
        return withCors(origin, allowed, json({ ok: false, error: 'Spam check failed' }, 400));
      }

      const id = crypto.randomUUID();
      const createdAt = new Date().toISOString();

      await env.DB.batch([
        env.DB.prepare(
          `INSERT INTO leads (
             id, site_slug, name, email, phone,
             street, address_line2, city, state, zip,
             message, created_at
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          id,
          site.slug,
          parsed.name,
          parsed.email,
          parsed.phone || null,
          parsed.street,
          parsed.address2 || null,
          parsed.city,
          parsed.state,
          parsed.zip,
          parsed.message,
          createdAt
        ),
        env.DB.prepare(
          `INSERT INTO contact_outbox (lead_id, site_slug, attempts, next_attempt_at, created_at)
           VALUES (?, ?, 0, ?, ?)`
        ).bind(id, site.slug, createdAt, createdAt),
      ]);

      await deliverLeadEmail(env, site, parsed, id, 0);

      // Lead is in D1. Never tell the visitor whether Resend ran.
      return withCors(origin, allowed, json({ ok: true }));
    } catch (err) {
      console.error('submit failed', err);
      return earlyCors(origin, json({ ok: false, error: 'Unable to submit right now' }, 500));
    }
  },

  async scheduled(_controller: ScheduledController, env: Env): Promise<void> {
    await drainContactOutbox(env);
  },
};

async function health(env: Env): Promise<Response> {
  try {
    const row = await env.DB.prepare('SELECT COUNT(*) AS queued FROM contact_outbox').first<{
      queued: number | string;
    }>();
    return json({
      ok: true,
      service: 'massic-forms',
      contactEmailQueue: Number(row?.queued ?? 0),
    });
  } catch (error) {
    console.error('health check failed', error);
    return json({ ok: false, service: 'massic-forms', error: 'Database unavailable' }, 503);
  }
}

async function handleEmailSummary(request: Request, env: Env, origin: string, patterns: string[]): Promise<Response> {
  try {
    const body = await readBody(request);
    if ((body.website || '').trim().length > 0) {
      return withCors(origin, patterns, json({ ok: true }));
    }

    const parsed = validatePdfSummary(body);
    if ('error' in parsed) {
      return earlyCors(origin, json({ ok: false, error: parsed.error }, 400));
    }

    const site = await env.DB.prepare('SELECT * FROM sites WHERE slug = ?').bind(parsed.site).first<SiteRow>();
    if (!site) {
      return earlyCors(origin, json({ ok: false, error: 'Unknown site' }, 400));
    }

    const allowed = [...patterns, ...parseOrigins(site.allowed_origins)];
    if (!origin || !originAllowed(origin, allowed)) {
      return json({ ok: false, error: 'Origin not allowed' }, 403);
    }

    const turnstileSecret = turnstileSecretForSite(env, site.slug);
    if (!turnstileSecret) {
      console.error(`Turnstile is not configured for ${site.slug}`);
      return withCors(origin, allowed, json({ ok: false, error: 'Spam check is not configured' }, 500));
    }

    const turnstileOk = await verifyTurnstile(parsed.turnstileToken, turnstileSecret, request, site.slug, origin);
    if (!turnstileOk) {
      return withCors(origin, allowed, json({ ok: false, error: 'Spam check failed' }, 400));
    }

    const dailyLimit =
      site.pdf_daily_limit === 0
        ? Infinity
        : site.pdf_daily_limit != null
          ? site.pdf_daily_limit
          : parseDailyLimit(env.RESEND_DAILY_LIMIT);

    if (Number.isFinite(dailyLimit)) {
      const sentToday = await outboundSentToday(env.DB, site.slug, PDF_KIND, utcDayStartIso());
      if (sentToday >= dailyLimit) {
        return withCors(
          origin,
          allowed,
          json({ ok: false, error: 'Daily email limit reached. Download or print instead.' }, 429)
        );
      }
    }

    const sendId = crypto.randomUUID();
    const sent = await sendResend(
      resendKeyForSite(env, site.slug),
      {
        from: site.from_email,
        to: parsed.email,
        replyTo: isPlaceholderEmail(site.notify_email) ? undefined : site.notify_email,
        subject: `Your ${site.name} check-up summary`,
        html: pdfEmailHtml(site.name),
        text: pdfEmailText(site.name),
        attachments: [{ filename: parsed.filename, content: parsed.pdf }],
      },
      `checkup-pdf/${site.slug}/${sendId}`
    );

    if (!sent.ok) {
      return withCors(origin, allowed, json({ ok: false, error: sent.error }, 502));
    }

    await recordOutboundSend(env.DB, sendId, site.slug, PDF_KIND);
    return withCors(origin, allowed, json({ ok: true }));
  } catch (error) {
    console.error('email-summary failed', error);
    return earlyCors(origin, json({ ok: false, error: 'Unable to send right now' }, 500));
  }
}

async function deliverLeadEmail(
  env: Env,
  site: SiteRow,
  lead: Submission,
  leadId: string,
  attempts: number
): Promise<boolean> {
  const dailyLimit = parseDailyLimit(env.RESEND_DAILY_LIMIT);
  const sentToday = await emailsSentToday(env.DB, site.slug, utcDayStartIso());
  if (sentToday >= dailyLimit) {
    await rescheduleOutbox(env.DB, leadId, attempts, 'Daily email limit reached', nextUtcDayIso());
    return false;
  }

  const sent = await sendResend(
    resendKeyForSite(env, site.slug),
    {
      from: site.from_email,
      to: site.notify_email,
      replyTo: lead.email,
      subject: `New website inquiry — ${lead.name}`,
      html: emailHtml(site.name, lead),
      text: emailText(site.name, lead),
    },
    `contact-form/${leadId}`
  );

  if (!sent.ok) {
    await rescheduleOutbox(env.DB, leadId, attempts, sent.error, retryAtIso(attempts));
    return false;
  }

  const sentAt = new Date().toISOString();
  await env.DB.batch([
    env.DB.prepare('UPDATE leads SET email_sent_at = ? WHERE id = ?').bind(sentAt, leadId),
    env.DB.prepare('DELETE FROM contact_outbox WHERE lead_id = ?').bind(leadId),
  ]);
  return true;
}

async function drainContactOutbox(env: Env): Promise<void> {
  const now = new Date().toISOString();
  const rows = await env.DB.prepare(
    `SELECT
       o.lead_id AS leadId, o.attempts,
       l.site_slug AS site, l.name, l.email, COALESCE(l.phone, '') AS phone,
       COALESCE(l.street, '') AS street, COALESCE(l.address_line2, '') AS address2,
       COALESCE(l.city, '') AS city, COALESCE(l.state, '') AS state, COALESCE(l.zip, '') AS zip,
       l.message, '' AS website, '' AS turnstileToken,
       s.name AS siteName, s.notify_email AS notifyEmail, s.from_email AS fromEmail
     FROM contact_outbox o
     JOIN leads l ON l.id = o.lead_id
     JOIN sites s ON s.slug = o.site_slug
     WHERE o.next_attempt_at <= ?
     ORDER BY o.created_at ASC
     LIMIT 25`
  )
    .bind(now)
    .all<QueuedLead>();

  for (const row of rows.results) {
    const site: SiteRow = {
      slug: row.site,
      name: row.siteName,
      notify_email: row.notifyEmail,
      from_email: row.fromEmail,
      from_name: row.siteName,
      allowed_origins: '[]',
      pdf_daily_limit: null,
    };
    await deliverLeadEmail(env, site, row, row.leadId, row.attempts);
  }
}

async function rescheduleOutbox(
  db: D1Database,
  leadId: string,
  attempts: number,
  error: string,
  nextAttemptAt: string
): Promise<void> {
  await db
    .prepare(
      `UPDATE contact_outbox
       SET attempts = ?, last_error = ?, next_attempt_at = ?
       WHERE lead_id = ?`
    )
    .bind(attempts + 1, error.slice(0, 1000), nextAttemptAt, leadId)
    .run();
}

function retryAtIso(attempts: number): string {
  const minutes = Math.min(360, 5 * 2 ** Math.min(attempts, 6));
  return new Date(Date.now() + minutes * 60_000).toISOString();
}

function nextUtcDayIso(): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + 1);
  date.setUTCHours(0, 5, 0, 0);
  return date.toISOString();
}

function defaultPatterns(env: Env): string[] {
  return [...DEFAULT_ORIGIN_PATTERNS, ...parseEnvOrigins(env.ALLOWED_ORIGINS)];
}

function isHttpOrigin(origin: string): boolean {
  try {
    const protocol = new URL(origin).protocol;
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}

function earlyCors(origin: string, response: Response): Response {
  return isHttpOrigin(origin) ? cors(origin, response) : response;
}

function withCors(origin: string, patterns: string[], response: Response): Response {
  if (origin && originAllowed(origin, patterns)) {
    return cors(origin, response);
  }
  return response;
}

function cors(origin: string, response: Response): Response {
  const headers = new Headers(response.headers);
  if (origin) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Vary', 'Origin');
  }
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Accept');
  headers.set('Access-Control-Max-Age', '86400');
  return new Response(response.body, { status: response.status, headers });
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function originMatches(origin: string, pattern: string): boolean {
  if (!origin || !pattern) return false;
  if (origin === pattern) return true;
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^/]*');
  return new RegExp(`^${escaped}$`, 'i').test(origin);
}

function originAllowed(origin: string, patterns: string[]): boolean {
  return patterns.some((pattern) => originMatches(origin, pattern));
}

function parseEnvOrigins(raw?: string): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return parsed.filter((item): item is string => typeof item === 'string');
  } catch {
    /* comma-separated */
  }
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

async function readBody(request: Request): Promise<Record<string, string>> {
  const contentType = request.headers.get('Content-Type') || '';
  if (contentType.includes('application/json')) {
    const data = (await request.json()) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v == null ? '' : String(v)]));
  }

  const form = await request.formData();
  const out: Record<string, string> = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === 'string') out[key] = value;
  }
  return out;
}

function phoneDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

function isValidPhone(phone: string): boolean {
  const digits = phoneDigits(phone);
  if (digits.length === 11 && digits.startsWith('1')) return true;
  return digits.length >= 10 && digits.length <= 15;
}

function formatAddress(lead: Pick<Submission, 'street' | 'address2' | 'city' | 'state' | 'zip'>): string {
  const cityLine = [lead.city, lead.state].filter(Boolean).join(', ');
  const locality = [cityLine, lead.zip].filter(Boolean).join(' ');
  return [lead.street, lead.address2, locality].filter(Boolean).join('\n');
}

function validate(body: Record<string, string>): Submission | { error: string } {
  const site = (body.site || '').trim();
  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const phone = (body.phone || '').trim();
  const street = (body.street || '').trim();
  const address2 = (body.address2 || body.address_line2 || '').trim();
  const city = (body.city || '').trim();
  const state = (body.state || '').trim().toUpperCase();
  const zip = (body.zip || '').trim();
  const message = (body.message || '').trim();
  const website = (body.website || '').trim();
  const turnstileToken = (body['cf-turnstile-response'] || body.turnstileToken || '').trim();

  if (!site) return { error: 'Missing site' };
  if (name.length < 1 || name.length > MAX.name) return { error: 'Enter your name' };
  if (!EMAIL_RE.test(email) || email.length > MAX.email) return { error: 'Enter a valid email' };
  if (!isValidPhone(phone) || phone.length > MAX.phone) return { error: 'Enter a valid phone number' };
  if (street.length < 1 || street.length > MAX.street) return { error: 'Enter a street address' };
  if (address2.length > MAX.address2) return { error: 'Enter a valid apt/suite' };
  if (city.length < 1 || city.length > MAX.city) return { error: 'Enter a city' };
  if (!US_STATE_CODES.has(state)) return { error: 'Select a state' };
  if (!ZIP_RE.test(zip) || zip.length > MAX.zip) return { error: 'Enter a valid ZIP code' };
  if (message.length < 1 || message.length > MAX.message) return { error: 'Enter a message' };
  if (!turnstileToken) return { error: 'Spam check is required' };

  return { site, name, email, phone, street, address2, city, state, zip, message, website, turnstileToken };
}

function validatePdfSummary(body: Record<string, string>): PdfSummary | { error: string } {
  const site = (body.site || '').trim();
  const email = (body.email || '').trim();
  const website = (body.website || '').trim();
  const turnstileToken = (body['cf-turnstile-response'] || body.turnstileToken || '').trim();
  const pdf = normalizePdfBase64(body.pdf || '');
  const filename = sanitizeFilename(body.filename || '');

  if (!site) return { error: 'Missing site' };
  if (!EMAIL_RE.test(email) || email.length > MAX.email) return { error: 'Enter a valid email' };
  if (!pdf) return { error: 'Missing PDF' };
  if (pdf.length > MAX_PDF_B64) return { error: 'PDF is too large' };
  if (!turnstileToken) return { error: 'Spam check is required' };

  return { site, email, pdf, filename, website, turnstileToken };
}

function normalizePdfBase64(raw: string): string {
  const trimmed = raw.trim().replace(/\s/g, '');
  const comma = trimmed.indexOf(',');
  if (trimmed.startsWith('data:') && comma !== -1) return trimmed.slice(comma + 1);
  return trimmed;
}

function sanitizeFilename(raw: string): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9._-]/g, '').slice(0, 80);
  return cleaned.toLowerCase().endsWith('.pdf') ? cleaned : DEFAULT_PDF_FILENAME;
}

function parseOrigins(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function turnstileSecretBinding(siteSlug: string): string {
  return `TURNSTILE_SECRET_${siteSlug.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`;
}

function turnstileSecretForSite(env: Env, siteSlug: string): string {
  const binding = turnstileSecretBinding(siteSlug);
  const value = (env as unknown as Record<string, unknown>)[binding];
  if (typeof value === 'string' && value) return value;

  if (env.TURNSTILE_SECRET) {
    console.warn(`Turnstile: ${siteSlug} is using legacy TURNSTILE_SECRET; migrate it to ${binding}`);
    return env.TURNSTILE_SECRET;
  }

  return '';
}

function resendKeyForSite(env: Env, siteSlug: string): string {
  const binding = `RESEND_API_KEY_${siteSlug.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`;
  const value = (env as unknown as Record<string, unknown>)[binding];
  if (typeof value === 'string' && value) return value;
  return env.RESEND_API_KEY || '';
}

async function verifyTurnstile(
  token: string,
  secret: string,
  request: Request,
  expectedAction: string,
  requestOrigin: string
): Promise<boolean> {
  let expectedHostname = '';
  try {
    expectedHostname = new URL(requestOrigin).hostname;
  } catch {
    console.error('Turnstile rejected: request Origin is missing or invalid');
    return false;
  }

  const ip = request.headers.get('CF-Connecting-IP') || '';
  const body = new URLSearchParams({
    secret,
    response: token,
    idempotency_key: crypto.randomUUID(),
  });
  if (ip) body.set('remoteip', ip);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  if (!res.ok) {
    console.error('Turnstile siteverify HTTP error', res.status);
    return false;
  }
  const data = (await res.json()) as {
    success?: boolean;
    hostname?: string;
    action?: string;
    'error-codes'?: string[];
  };
  if (data.success !== true) {
    console.error('Turnstile rejected', JSON.stringify(data['error-codes'] ?? []), 'hostname:', data.hostname ?? '—');
    return false;
  }

  if (data.action !== expectedAction) {
    console.error('Turnstile rejected: action mismatch', data.action ?? '—', 'expected:', expectedAction);
    return false;
  }

  if (data.hostname !== expectedHostname) {
    console.error('Turnstile rejected: hostname mismatch', data.hostname ?? '—', 'expected:', expectedHostname);
    return false;
  }

  return true;
}

function parseDailyLimit(raw?: string): number {
  const n = Number.parseInt(raw ?? '', 10);
  if (!Number.isFinite(n) || n < 0) return DEFAULT_RESEND_DAILY_LIMIT;
  return n;
}

function utcDayStartIso(): string {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString();
}

async function emailsSentToday(db: D1Database, siteSlug: string, sinceIso: string): Promise<number> {
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS n FROM leads
       WHERE site_slug = ?
         AND email_sent_at IS NOT NULL
         AND email_sent_at >= ?`
    )
    .bind(siteSlug, sinceIso)
    .first<{ n: number | string }>();
  return Number(row?.n ?? 0);
}

async function outboundSentToday(db: D1Database, siteSlug: string, kind: string, sinceIso: string): Promise<number> {
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS n FROM outbound_sends
       WHERE site_slug = ?
         AND kind = ?
         AND created_at >= ?`
    )
    .bind(siteSlug, kind, sinceIso)
    .first<{ n: number | string }>();
  return Number(row?.n ?? 0);
}

async function recordOutboundSend(db: D1Database, id: string, siteSlug: string, kind: string): Promise<void> {
  await db
    .prepare('INSERT INTO outbound_sends (id, site_slug, kind, created_at) VALUES (?, ?, ?, ?)')
    .bind(id, siteSlug, kind, new Date().toISOString())
    .run();
}

function hasRealResendKey(apiKey?: string): boolean {
  if (!apiKey) return false;
  return apiKey.startsWith('re_') && apiKey.length > 20 && !/x{4,}/i.test(apiKey);
}

function isPlaceholderEmail(value: string): boolean {
  return /@example\.com$/i.test(value.trim());
}

async function sendResend(
  apiKey: string | undefined,
  email: ResendEmail,
  idempotencyKey?: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!hasRealResendKey(apiKey)) {
    console.warn('Resend skipped: set a real RESEND_API_KEY on the Worker');
    return { ok: false, error: 'Email service is not configured' };
  }

  const payload: Record<string, unknown> = {
    from: email.from,
    to: [email.to],
    subject: email.subject,
    html: email.html,
    text: email.text,
  };
  if (email.replyTo && !isPlaceholderEmail(email.replyTo)) payload.reply_to = email.replyTo;
  if (email.attachments?.length) payload.attachments = email.attachments;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
  if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errText = await res.text();
    console.error('Resend failed', res.status, errText);
    return { ok: false, error: resendUserError(res.status, errText) };
  }
  return { ok: true };
}

function resendUserError(status: number, errText: string): string {
  let message = '';
  try {
    const parsed = JSON.parse(errText) as { message?: string };
    if (typeof parsed.message === 'string') message = parsed.message;
  } catch {
    /* ignore malformed provider response */
  }
  if (status === 403 || /testing emails|verify a domain|onboarding@resend\.dev/i.test(message)) {
    return 'Email delivery is not configured for this sender';
  }
  return 'Unable to send email right now';
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function emailHtml(siteName: string, lead: Submission): string {
  const address = formatAddress(lead);
  return `
    <p>New inquiry from <strong>${escapeHtml(siteName)}</strong></p>
    <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(lead.phone || '—')}</p>
    <p><strong>Address:</strong><br />${escapeHtml(address).replace(/\n/g, '<br />')}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(lead.message).replace(/\n/g, '<br />')}</p>
  `;
}

function emailText(siteName: string, lead: Submission): string {
  return [
    `New inquiry from ${siteName}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || '—'}`,
    `Address:`,
    formatAddress(lead),
    '',
    lead.message,
  ].join('\n');
}

function pdfEmailHtml(siteName: string): string {
  return `
    <p>Your ${escapeHtml(siteName)} check-up summary is attached as a PDF.</p>
    <p>We do not keep a copy of the file or of the answers in it. Download or print remains the option that never leaves your device.</p>
  `;
}

function pdfEmailText(siteName: string): string {
  return [
    `Your ${siteName} check-up summary is attached as a PDF.`,
    '',
    'We do not keep a copy of the file or of the answers in it.',
    'Download or print remains the option that never leaves your device.',
  ].join('\n');
}
