export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const SAMEDOS_ADDRESS = 'Timmersloher Straße 82, 28215 Bremen-Findorff';
const PHONE_PRACTICE  = '0421 354366';
const PHONE_MOBILE    = '+49 1575 0376234';

function buildAutoReplyDE(firstName: string): string {
  return `Hallo ${firstName},

vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 1–2 Werktagen bei Ihnen zurück.

Da wir oft direkt bei unseren Kunden vor Ort sind, kann es vereinzelt zu kurzen Verzögerungen kommen. Bei dringenden Anliegen erreichen Sie uns mobil unter ${PHONE_MOBILE}.

Wir freuen uns darauf, mit Ihnen ins Gespräch zu kommen.

Mit freundlichen Grüßen
Dr. Jörg Janssen & das Samedos-Team

———
Samedos Arbeitsmedizin
${SAMEDOS_ADDRESS}
Telefon: ${PHONE_PRACTICE}
Mobil:   ${PHONE_MOBILE}
E-Mail:  info@samedos.de
Web:     www.samedos.de`;
}

function buildAutoReplyEN(firstName: string): string {
  return `Hello ${firstName},

thank you for your message. We have received your request and will get back to you within 1–2 business days.

Since we are often on site with our clients, brief delays may occur. For urgent matters you can reach us on mobile at ${PHONE_MOBILE}.

We look forward to speaking with you.

Kind regards
Dr. Jörg Janssen & the Samedos team

———
Samedos Occupational Medicine
${SAMEDOS_ADDRESS}
Phone:  ${PHONE_PRACTICE}
Mobile: ${PHONE_MOBILE}
Email:  info@samedos.de
Web:    www.samedos.de`;
}

export const POST: APIRoute = async ({ request }) => {
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

  // Spam-Schutz: honeypot field must stay empty
  if (honeypot) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  if (!vorname || !nachname || !email || !betreff || !nachricht) {
    return new Response(JSON.stringify({ ok: false, error: 'Pflichtfelder fehlen.' }), { status: 400 });
  }

  const fullName  = `${vorname} ${nachname}`;
  const firstName = vorname;
  const dateStr   = new Date().toLocaleDateString(lang === 'en' ? 'en-GB' : 'de-DE');

  // ── 1. Notification an Jörg ────────────────────────────────────────
  // Plain text only; reply-to set to requester so "Reply" goes directly
  // to them; subject includes the name for personal feel.
  const notificationText = `Neue Kontaktanfrage über samedos.de

Name:        ${fullName}
E-Mail:      ${email}
Telefon:     ${telefon || '—'}
Unternehmen: ${unternehmen || '—'}
Betreff:     ${betreff}
Sprache:     ${lang === 'en' ? 'Englisch' : 'Deutsch'}

Nachricht:
${nachricht}

———
Antworten Sie direkt auf diese Mail — sie geht automatisch an ${email}.
Gesendet via samedos.de/kontakt am ${dateStr}`;

  try {
    const { error: notifyError } = await resend.emails.send({
      from: 'Samedos Website <website@samedos.de>',
      to: 'info@samedos.de',
      // replyTo: email,   // TEMP: testing if replyTo causes Outlook routing issue
      subject: `Neue Anfrage von ${fullName} – Samedos`,
      text: notificationText,
    });

    if (notifyError) {
      console.error('[Resend notification error]', notifyError);
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder rufen Sie uns unter 0421 354366 an.',
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

  // ── 2. Auto-Reply an den Anfragenden ───────────────────────────────
  // Best-effort: if it fails the user still got their request through.
  try {
    const isEN = lang === 'en';
    await resend.emails.send({
      from: isEN
        ? 'Samedos Occupational Medicine <website@samedos.de>'
        : 'Samedos Arbeitsmedizin <website@samedos.de>',
      to: email,
      replyTo: 'info@samedos.de',
      subject: isEN
        ? 'Thank you for your enquiry – Samedos'
        : 'Vielen Dank für Ihre Anfrage – Samedos',
      text: isEN ? buildAutoReplyEN(firstName) : buildAutoReplyDE(firstName),
    });
  } catch (replyError) {
    console.error('[Resend auto-reply failed]', replyError);
    // Intentionally ignored — primary notification already succeeded.
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
