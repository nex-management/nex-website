import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      options: { source: "title", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "Short description", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "details", title: "Details (Services page)", type: "text", rows: 6, description: "A longer paragraph for the Services page. Optional." }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Building", value: "building" },
          { title: "Magnifier", value: "search" },
          { title: "House", value: "house" },
          { title: "Ledger", value: "ledger" },
          { title: "Compass", value: "compass" },
        ],
      },
      initialValue: "building",
    }),
    defineField({ name: "order", title: "Order on the site", type: "number" }),
  ],
  orderings: [{ title: "Site order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "description" } },
});
