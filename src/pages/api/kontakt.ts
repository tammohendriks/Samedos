export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const vorname    = data.get('vorname')?.toString().trim() ?? '';
  const nachname   = data.get('nachname')?.toString().trim() ?? '';
  const email      = data.get('email')?.toString().trim() ?? '';
  const unternehmen = data.get('unternehmen')?.toString().trim() ?? '';
  const telefon    = data.get('telefon')?.toString().trim() ?? '';
  const betreff    = data.get('betreff')?.toString().trim() ?? '';
  const nachricht  = data.get('nachricht')?.toString().trim() ?? '';
  const honeypot   = data.get('_honeypot')?.toString() ?? '';

  // Spam-Schutz
  if (honeypot) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  if (!vorname || !nachname || !email || !betreff || !nachricht) {
    return new Response(JSON.stringify({ ok: false, error: 'Pflichtfelder fehlen.' }), { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'Samedos Website <website@samedos.de>',
    to: 'info@samedos.de',
    replyTo: email,
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
    return new Response(JSON.stringify({ ok: false, error: 'E-Mail konnte nicht gesendet werden.' }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
