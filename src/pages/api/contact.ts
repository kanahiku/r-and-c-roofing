export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { contactHelpOptions } from '~/data/pages/contact';
import { sanityWriteClient } from '~/lib/sanity/writeClient';

const TOPIC_LABELS = Object.fromEntries(contactHelpOptions.map((option) => [option.value, option.label]));

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json();
    const website = asString(payload.website);

    if (website) {
      return json({ success: true });
    }

    const name = asString(payload.name);
    const email = asString(payload.email);
    const phone = asString(payload.phone);
    const zip = asString(payload.zip);
    const topic = asString(payload.topic);
    const message = asString(payload.message);
    const topicLabel = TOPIC_LABELS[topic] || topic || 'Not provided';

    if (!name || !email || !phone || !zip || !topic) {
      return json({ error: 'Missing required fields' }, 400);
    }

    if (!isEmail(email)) {
      return json({ error: 'Enter a valid email address' }, 400);
    }

    const submittedAt = new Date().toISOString();
    const siteName = import.meta.env.SITE_NAME || 'R&C Roofing Contractors';
    const notifyEmail = import.meta.env.NOTIFY_EMAIL || 'info@safehomeservice.com';
    const from = import.meta.env.RESEND_FROM || `${siteName} <beth.t@example.com>`;
    const apiKey = import.meta.env.RESEND_API_KEY;

    if (!apiKey) {
      return json({ error: 'Email service is not configured' }, 500);
    }

    try {
      await sanityWriteClient.create({
        _type: 'lead',
        name,
        email,
        phone,
        zip,
        topic,
        topicLabel,
        message,
        source: 'contact-form',
        status: 'new',
        submittedAt,
      });
    } catch (error) {
      console.error('Lead capture failed:', error);
    }

    const resend = new Resend(apiKey);
    const rows = [
      ['Name', name],
      ['Email', email],
      ['Phone', phone],
      ['ZIP Code', zip],
      ['Topic', topicLabel],
      ['Message', message || 'Not provided'],
    ];

    const { error: notifyError } = await resend.emails.send({
      from,
      to: notifyEmail,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        ${rows
          .map(
            ([label, value]) =>
              `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value).replace(/\n/g, '<br>')}</p>`
          )
          .join('')}
        <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
      `,
    });

    if (notifyError) {
      console.error('Resend notify error:', notifyError);
      return json({ error: 'Failed to send' }, 500);
    }

    const { error: confirmError } = await resend.emails.send({
      from,
      to: email,
      subject: `We received your message`,
      html: `
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thanks for reaching out to ${escapeHtml(siteName)}. We'll be in touch using the contact information you provided.</p>
        <p><strong>What you asked about:</strong> ${escapeHtml(topicLabel)}</p>
        <p>${escapeHtml(siteName)}<br>(808) 888-2524</p>
      `,
    });

    if (confirmError) {
      console.error('Resend confirmation error:', confirmError);
    }

    return json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return json({ error: 'Failed to send' }, 500);
  }
};
