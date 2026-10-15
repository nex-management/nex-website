import { defineField, defineType } from "sanity";

/**
 * One document for the whole site: contact details, links, key figures,
 * the homepage opening image, the video, and launch switches.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "contact", title: "Contact & links", default: true },
    { name: "home", title: "Homepage media" },
    { name: "stats", title: "Key figures" },
    { name: "legal", title: "Legal & SEO" },
    { name: "launch", title: "Launch" },
  ],
  fields: [
    defineField({ name: "email", title: "Contact email", type: "string", group: "contact", validation: (r) => r.required().email() }),
    defineField({ name: "phone", title: "Phone number", type: "string", group: "contact", description: "Shown in the contact section and footer. Leave empty to hide." }),
    defineField({ name: "addressLine1", title: "Address line 1", type: "string", group: "contact" }),
    defineField({ name: "addressLine2", title: "Address line 2", type: "string", group: "contact" }),
    defineField({ name: "schedulingUrl", title: "Booking link (Calendly or similar)", type: "url", group: "contact", description: "Used by every 'Schedule a call' button. Leave empty to hide them." }),
    defineField({ name: "linkedinUrl", title: "Company LinkedIn page", type: "url", group: "contact" }),
    defineField({ name: "investorLoginUrl", title: "Investor portal link", type: "url", group: "contact", description: "Leave empty while there is no portal; the menu item shows as 'coming soon'." }),

    defineField({
      name: "heroImage",
      title: "Homepage opening image",
      type: "image",
      group: "home",
      options: { hotspot: true },
      description: "A wide photo of one of the hotels. Shown full-width behind the opening text. Recommended: at least 2400 px wide.",
      fields: [defineField({ name: "alt", title: "Description (for accessibility)", type: "string" })],
    }),
    defineField({ name: "videoUrl", title: "YouTube video link", type: "url", group: "home", description: "The 'Watch our story' video. Paste the normal YouTube link." }),
    defineField({
      name: "videoPoster",
      title: "Video cover image",
      type: "image",
      group: "home",
      options: { hotspot: true },
      description: "Optional. Shown before the video plays. If empty, a dark panel with the play button is shown.",
    }),

    defineField({
      name: "stats",
      title: "Key figures",
      type: "array",
      group: "stats",
      description: "The four big numbers. Keep it to four.",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "Value", type: "string", description: "e.g. $100M+", validation: (r) => r.required() }),
            defineField({ name: "label", title: "Label", type: "string", description: "e.g. Portfolio Under Management", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
      validation: (r) => r.max(4),
    }),
    defineField({ name: "statsAsOf", title: "Figures as of", type: "string", group: "stats", description: "e.g. June 2026. Shown under the numbers." }),
    defineField({ name: "statsFootnote", title: "Footnote under the figures", type: "text", rows: 3, group: "stats" }),

    defineField({ name: "seoTitle", title: "Site title (Google / browser tab)", type: "string", group: "legal" }),
    defineField({ name: "seoDescription", title: "Site description (Google / link previews)", type: "text", rows: 3, group: "legal" }),
    defineField({ name: "legalName", title: "Legal entity name", type: "string", group: "legal" }),
    defineField({ name: "feiNumber", title: "FEI number", type: "string", group: "legal" }),
    defineField({ name: "legalDisclaimer", title: "Legal disclaimer (footer)", type: "text", rows: 3, group: "legal" }),

    defineField({
      name: "showPlaceholders",
      title: "Show placeholders for missing content",
      type: "boolean",
      group: "launch",
      description: "ON while the site is being reviewed: missing items appear as [PLACEHOLDERS]. Switch OFF before launch.",
      initialValue: true,
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
