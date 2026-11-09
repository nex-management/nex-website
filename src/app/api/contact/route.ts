import { contactPage } from "@/content/pages";
import { site } from "@/content/site";

/**
 * Contact form endpoint.
 *
 * Sends the message by email through Resend (https://resend.com) when these
 * environment variables are set on the host:
 *   RESEND_API_KEY   – API key from the Resend dashboard
 *   CONTACT_TO_EMAIL – where inquiries should go (comma-separated for several)
 *   CONTACT_FROM_EMAIL – optional, a verified sender on the site's domain
 *                        (defaults to "Nex Management <no-reply@nex-mgmt.com>")
 *
 * Until they are set, the endpoint answers 503 and the form shows the
 * fallback email address, so no inquiry is silently lost.
 *
 * Spam protection, without any third-party widget:
 *   - honeypot field ("company") that people never see,
 *   - a time trap: the form records when it was opened and submissions
 *     faster than a few seconds are dropped,
 *   - the request must come from this site (Origin header),
 *   - the topic must be one of the site's own choices,
 *   - line breaks are stripped from everything that lands in the subject.
 * Bots get the same "ok" answer as people, so they learn nothing.
 */

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  topic?: string;
  company?: string; // honeypot
  startedAt?: string; // time trap (ms since epoch, set by the form when it opens)
};

const MAX = { name: 120, email: 200, phone: 40, message: 4000 };
const MAX_BODY_BYTES = 16 * 1024;
const MIN_FILL_MS = 3000;

/** Trims, caps the length and removes line breaks (they would let a sender forge extra mail headers). */
function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return host !== null && new URL(origin).host === host;
  } catch {
    return false;
  }
}

const silentOk = () => Response.json({ ok: true });

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? "0");
  if (length > MAX_BODY_BYTES) {
    return Response.json({ error: "The message is too long." }, { status: 413 });
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Requests that don't come from the site's own pages are dropped quietly.
  if (!sameOrigin(request)) return silentOk();

  // Bots fill the hidden field; people never see it.
  if (clean(body.company, 100)) return silentOk();

  // People need a moment to type; scripts submit instantly.
  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) return silentOk();

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const phone = clean(body.phone, MAX.phone);
  const message = typeof body.message === "string" ? body.message.trim().slice(0, MAX.message) : "";
  const topic = contactPage.topics.find((t) => t.value === body.topic)?.label ?? "";

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please fill in your name, a valid email, and a message." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return Response.json({ error: "The contact form isn't active yet." }, { status: 503 });
  }

  const from = process.env.CONTACT_FROM_EMAIL ?? `${site.brandName} <no-reply@nex-mgmt.com>`;
  const subject = `Website inquiry from ${name}${topic ? ` – ${topic}` : ""}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    topic ? `Topic: ${topic}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");
  const html = `<p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}${
    phone ? `<br><strong>Phone:</strong> ${escapeHtml(phone)}` : ""
  }${topic ? `<br><strong>Topic:</strong> ${escapeHtml(topic)}` : ""}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "We couldn't send your message right now." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
