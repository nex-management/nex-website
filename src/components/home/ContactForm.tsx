"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string };

const labelClass = "text-xs font-bold uppercase tracking-[0.12em] text-body";
const inputClass =
  "h-12 rounded-[2px] border border-line-3 bg-white px-3.5 text-[15px] text-ink placeholder:text-muted-3";

export function ContactForm({
  fallbackEmail,
  topics,
  defaultTopic,
}: {
  fallbackEmail: string;
  /** Optional "What is this about?" choices; omitted on the homepage form. */
  topics?: { value: string; label: string }[];
  defaultTopic?: string;
}) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus({ state: "sent" });
        form.reset();
        return;
      }
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      setStatus({
        state: "error",
        message: body?.error ?? "We couldn't send your message right now.",
      });
    } catch {
      setStatus({ state: "error", message: "We couldn't send your message right now." });
    }
  }

  if (status.state === "sent") {
    return (
      <div
        role="status"
        className="flex min-w-0 flex-[1_1_28.75rem] flex-col justify-center gap-4 border border-line bg-cream px-10 py-11"
      >
        <p className="font-display text-[28px] font-semibold text-ink">Thank you — we&rsquo;ve received your message.</p>
        <p className="text-[15px] leading-relaxed text-muted">We&rsquo;ll get back to you promptly.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex min-w-0 flex-[1_1_28.75rem] flex-col gap-5 border border-line bg-cream px-10 py-11"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(12.5rem,1fr))] gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className={labelClass}>
            Full name
          </label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder="Jane Smith" className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-phone" className={labelClass}>
            Phone number
          </label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="(305) 000-0000" className={inputClass} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className={labelClass}>
          Email address
        </label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" className={inputClass} />
      </div>
      {topics && topics.length > 0 ? (
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-topic" className={labelClass}>
            What is this about?
          </label>
          <select id="contact-topic" name="topic" defaultValue={defaultTopic ?? ""} className={`${inputClass} appearance-none`}>
            <option value="">Select…</option>
            {topics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about your property or investment goals"
          className="min-h-[140px] resize-y rounded-[2px] border border-line-3 bg-white px-3.5 py-3 text-[15px] text-ink placeholder:text-muted-3"
        />
      </div>
      {/* Honeypot: hidden from people, filled by bots */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="gold" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending…" : "Contact Us"}
        </Button>
        {status.state === "error" ? (
          <p role="alert" className="text-sm text-body">
            {status.message} Please email{" "}
            <a href={`mailto:${fallbackEmail}`} className="font-semibold text-ink">
              {fallbackEmail}
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
