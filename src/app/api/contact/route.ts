import { getSiteSettings } from "@/content";

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
 */

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  topic?: string;
  company?: string; // honeypot
};

const MAX = { name: 120, email: 200, phone: 40, message: 4000, topic: 40 };

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; people never see it.
  if (clean(body.company, 100)) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const phone = clean(body.phone, MAX.phone);
  const message = clean(body.message, MAX.message);
  const topic = clean(body.topic, MAX.topic);

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please fill in your name, a valid email, and a message." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return Response.json({ error: "The contact form isn't active yet." }, { status: 503 });
  }

  const site = await getSiteSettings();
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
