import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      options: { source: "name", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "Role / title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "group",
      title: "Group on the Team page",
      type: "string",
      options: {
        list: [
          { title: "Leadership", value: "leadership" },
          { title: "Operations & Finance", value: "operations" },
        ],
        layout: "radio",
      },
      initialValue: "operations",
      validation: (r) => r.required(),
    }),
    defineField({ name: "bio", title: "Short bio", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description: "Portrait, ideally 4:5 (e.g. 800 × 1000 px).",
      validation: (r) => r.required(),
    }),
    defineField({ name: "email", title: "Email (shown on the site)", type: "string", validation: (r) => r.email() }),
    defineField({ name: "linkedinUrl", title: "LinkedIn profile", type: "url" }),
    defineField({
      name: "perspective",
      title: "Perspective (long quote)",
      type: "text",
      rows: 8,
      description: "Shown in the 'In their words' section of the Team page. Leave empty for members without one.",
    }),
    defineField({ name: "order", title: "Order on the site", type: "number", description: "Lower numbers appear first." }),
    defineField({ name: "hidden", title: "Hide from the site", type: "boolean", initialValue: false }),
  ],
  orderings: [{ title: "Site order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "title", media: "photo" } },
});
