export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// ── Simple in-memory rate limit ─────────────────────────────────────
// 3 submissions per 10 minutes per IP. Map lives on the warm function
// instance; cold starts reset the counters. For a small practice
// website that's adequate — no external KV store needed.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX       = 3;
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_MAX) return true;
  entry.count += 1;
  return false;
}

// ── Auto-reply bodies ───────────────────────────────────────────────
const ADDRESS      = 'Timmersloher Straße 82, 28215 Bremen-Findorff';
const PHONE        = '0421 354366';
const MOBILE       = '+49 1575 0376234';

function autoReplyDE(firstName: string): string {
  return `Hallo ${firstName},

vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 1–2 Werktagen bei Ihnen zurück.

Da wir oft direkt bei unseren Kunden vor Ort sind, kann es vereinzelt zu kurzen Verzögerungen kommen. Bei dringenden Anliegen erreichen Sie uns mobil unter ${MOBILE}.

Wir freuen uns darauf, mit Ihnen ins Gespräch zu kommen.

Mit freundlichen Grüßen
Dr. Jörg Janssen & das Samedos-Team

———
Samedos Arbeitsmedizin
${ADDRESS}
Telefon: ${PHONE}
Mobil:   ${MOBILE}
E-Mail:  info@samedos.de
Web:     www.samedos.de`;
}

function autoReplyEN(firstName: string): string {
  return `Hello ${firstName},

thank you for your message. We have received your request and will get back to you within 1–2 business days.

Since we are often on site with our clients, brief delays may occur. For urgent matters you can reach us on mobile at ${MOBILE}.

We look forward to speaking with you.

Kind regards
Dr. Jörg Janssen & the Samedos team

———
Samedos Occupational Medicine
${ADDRESS}
Phone:  ${PHONE}
Mobile: ${MOBILE}
Email:  info@samedos.de
Web:    www.samedos.de`;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Rate limit per IP
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    clientAddress ??
    'unknown';

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es in ein paar Minuten erneut.',
      }),
      { status: 429, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const data = await request.formData();

  const vorname     = data.get('vorname')?.toString().trim() ?? '';
  const nachname    = data.get('nachname')?.toString().trim() ?? '';
  const email       = data.get('email')?.toString().trim() ?? '';
  const unternehmen = data.get('unternehmen')?.toString().trim() ?? '';
  const telefon     = data.get('telefon')?.toString().trim() ?? '';
  const betreff     = data.get('betreff')?.toString().trim() ?? '';
  const nachricht   = data.get('nachricht')?.toString().trim() ?? '';
  const honeypot    = data.get('_honeypot')?.toString() ?? '';
  const lang        = data.get('_lang')?.toString() === 'en' ? 'en' : 'de';

  // Honeypot: silently succeed if a bot filled the trap field
  if (honeypot) {
    console.log('[kontakt] honeypot triggered, ignoring submission');
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  if (!vorname || !nachname || !email || !betreff || !nachricht) {
    return new Response(JSON.stringify({ ok: false, error: 'Pflichtfelder fehlen.' }), { status: 400 });
  }

  // ── 1. Notification an Jörg ──────────────────────────────────────
  // ZWINGEND unverändert lassen:
  //   - from: 'Samedos Website <website@samedos.de>'
  //   - to:   'info@samedos.de'
  //   - KEIN replyTo (war M365-Spoofing-Trigger)
  //   - HTML-Body, bestehendes Subject-Format
  try {
    const { error } = await resend.emails.send({
      from: 'Samedos Website <website@samedos.de>',
      to: 'info@samedos.de',
      subject: `[Kontaktformular] ${betreff} — ${vorname} ${nachname}`,
      html: `
        <h2 style="margin:0 0 16px">Neue Kontaktanfrage</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:15px">
          <tr><td style="padding:8px 12px;background:#f6f8fb;font-weight:600;width:160px">Name</td><td style="padding:8px 12px">${vorname} ${nachname}</td></tr>
          <tr><td style="padding:8px 12px;background:#f6f8fb;font-weight:600">E-Mail</td><td style="padding:8px 12px"><a href="mailto:${email}">${email}</a></td></tr>
          ${telefon ? `<tr><td style="padding:8px 12px;background:#f6f8fb;font-weight:600">Telefon</td><td style="padding:8px 12px">${telefon}</td></tr>` : ''}
          ${unternehmen ? `<tr><td style="padding:8px 12px;background:#f6f8fb;font-weight:600">Unternehmen</td><td style="padding:8px 12px">${unternehmen}</td></tr>` : ''}
          <tr><td style="padding:8px 12px;background:#f6f8fb;font-weight:600">Betreff</td><td style="padding:8px 12px">${betreff}</td></tr>
          <tr><td style="padding:8px 12px;background:#f6f8fb;font-weight:600;vertical-align:top">Nachricht</td><td style="padding:8px 12px;white-space:pre-wrap">${nachricht}</td></tr>
        </table>
      `,
    });

    if (error) {
      console.error('[Resend notification error]', error);
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder rufen Sie uns unter 0421 354366 an.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }
  } catch (err) {
    console.error('[Resend notification exception]', err);
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder rufen Sie uns unter 0421 354366 an.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // ── 2. Auto-Reply an Anfragenden ────────────────────────────────
  // Best-effort: an externe Adresse, daher M365-unkritisch.
  // Bewusst KEIN replyTo (würde sonst dasselbe Spoofing-Muster
  // erzeugen wie das, was die Notification gekillt hat).
  try {
    const isEN = lang === 'en';
    await resend.emails.send({
      from: isEN
        ? 'Samedos Occupational Medicine <website@samedos.de>'
        : 'Samedos Arbeitsmedizin <website@samedos.de>',
      to: email,
      subject: isEN
        ? 'Thank you for your enquiry – Samedos'
        : 'Vielen Dank für Ihre Anfrage – Samedos',
      text: isEN ? autoReplyEN(vorname) : autoReplyDE(vorname),
    });
  } catch (replyErr) {
    console.error('[Auto-Reply failed (non-fatal)]', replyErr);
    // Notification an Jörg lief schon durch — Auto-Reply ist Nice-to-have.
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
