import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "name", title: "Name", type: "string", description: "Full name, as it should appear. Leave empty until confirmed." }),
    defineField({ name: "role", title: "Role", type: "string", description: "e.g. Property Owner", validation: (r) => r.required() }),
    defineField({ name: "company", title: "Hotel / company", type: "string" }),
    defineField({ name: "approved", title: "Approved for publication", type: "boolean", initialValue: false, description: "Only approved testimonials are shown on the site." }),
    defineField({ name: "order", title: "Order on the site", type: "number" }),
  ],
  orderings: [{ title: "Site order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "quote", approved: "approved" },
    prepare: ({ title, subtitle, approved }) => ({
      title: `${approved ? "" : "[not approved] "}${title ?? "Unnamed"}`,
      subtitle,
    }),
  },
});
