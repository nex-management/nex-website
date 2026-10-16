"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "./ContactForm";

/**
 * The contact page form with the "What is this about?" choice preselected
 * from a ?topic= link (e.g. /contact?topic=invest). Reading the address in
 * the browser keeps the page itself fully static.
 */
export function ContactFormWithTopic({
  fallbackEmail,
  topics,
}: {
  fallbackEmail: string;
  topics: { value: string; label: string }[];
}) {
  const requested = useSearchParams().get("topic");
  const defaultTopic = topics.some((t) => t.value === requested) ? requested! : undefined;
  return <ContactForm fallbackEmail={fallbackEmail} topics={topics} defaultTopic={defaultTopic} />;
}
