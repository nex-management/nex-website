"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string };

const labelClass = "text-xs font-bold uppercase tracking-[0.12em] text-body";
const optionalClass = "font-semibold normal-case tracking-normal text-muted-2";
const inputClass =
  "h-12 rounded-[2px] border border-muted-3 bg-white px-3.5 text-[15px] text-ink placeholder:text-muted-2";

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
  // When the form appeared on screen – sent along so the server can drop
  // submissions that arrive faster than any person could type (bots).
  const openedAt = useRef(0);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status.state === "error") errorRef.current?.focus();
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.state === "sending") return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt: String(openedAt.current) }),
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
        tabIndex={-1}
        ref={(el) => el?.focus()}
        className="flex min-w-0 flex-[1_1_28.75rem] flex-col justify-center gap-4 border border-line bg-cream px-6 py-8 outline-none sm:px-10 sm:py-11"
      >
        <p className="font-display text-[28px] font-semibold text-ink">Thank you — we&rsquo;ve received your message.</p>
        <p className="text-[15px] leading-relaxed text-muted">We&rsquo;ll get back to you promptly.</p>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form
      onSubmit={onSubmit}
      aria-busy={sending || undefined}
      className="relative flex min-w-0 flex-[1_1_28.75rem] flex-col gap-5 border border-line bg-cream px-6 py-8 sm:px-10 sm:py-11"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(12.5rem,100%),1fr))] gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className={labelClass}>
            Full name
          </label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder="Jane Smith" className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-phone" className={labelClass}>
            Phone number <span className={optionalClass}>(optional)</span>
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
            What is this about? <span className={optionalClass}>(optional)</span>
          </label>
          <div className="relative">
            <select
              id="contact-topic"
              name="topic"
              defaultValue={defaultTopic ?? ""}
              className={`${inputClass} w-full cursor-pointer appearance-none pr-11`}
            >
              <option value="">Select…</option>
              {topics.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 7.5 5 5 5-5" />
            </svg>
          </div>
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
          className="min-h-[140px] resize-y rounded-[2px] border border-muted-3 bg-white px-3.5 py-3 text-[15px] text-ink placeholder:text-muted-2"
        />
      </div>
      {/* Honeypot: hidden from people, filled by bots */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" variant="gold" className="self-start" aria-disabled={sending || undefined}>
          {sending ? "Sending…" : "Contact Us"}
        </Button>
        {status.state === "error" ? (
          <p
            role="alert"
            tabIndex={-1}
            ref={errorRef}
            className="border-l-2 border-gold-text py-1 pl-4 text-sm leading-relaxed text-ink outline-none"
          >
            <strong>Not sent.</strong> {status.message} Please email{" "}
            <a href={`mailto:${fallbackEmail}`} className="font-semibold underline decoration-gold underline-offset-4">
              {fallbackEmail}
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
