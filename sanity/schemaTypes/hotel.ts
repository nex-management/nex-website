import { defineField, defineType } from "sanity";

export const hotel = defineType({
  name: "hotel",
  title: "Hotel",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Hotel name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      description: "The last part of the hotel's page address, e.g. la-quinta-plantation. Click Generate.",
      options: { source: (doc) => `${doc.name ?? ""} ${doc.city ?? ""}`, maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      title: "Hotel type",
      type: "string",
      options: { list: ["Airport", "Suburban", "Urban", "Boutique"], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "address", title: "Street address", type: "string", description: "e.g. 8101 Peters Rd, Plantation, FL 33328", validation: (r) => r.required() }),
    defineField({ name: "city", title: "City", type: "string", validation: (r) => r.required() }),
    defineField({ name: "brand", title: "Brand / franchise", type: "string", description: "e.g. Wyndham Hotels & Resorts. Leave empty for independent hotels." }),
    defineField({ name: "rooms", title: "Number of rooms", type: "number", validation: (r) => r.integer().positive() }),
    defineField({ name: "managedSince", title: "Managed since (year)", type: "number", validation: (r) => r.integer().min(1990).max(2100) }),
    defineField({
      name: "ownership",
      title: "Relationship",
      type: "string",
      options: { list: ["Owned", "Managed"], layout: "radio" },
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
      description: "Three short points, e.g. Revenue Optimization.",
      validation: (r) => r.max(4),
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 5, description: "A short paragraph for the hotel's own page." }),
    defineField({
      name: "image",
      title: "Main photo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Description (for accessibility)", type: "string" })],
    }),
    defineField({
      name: "gallery",
      title: "More photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Description", type: "string" })] }],
    }),
    defineField({ name: "order", title: "Order on the site", type: "number", description: "Lower numbers appear first." }),
    defineField({ name: "hidden", title: "Hide from the site", type: "boolean", initialValue: false }),
  ],
  orderings: [{ title: "Site order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "city", media: "image" },
  },
});
