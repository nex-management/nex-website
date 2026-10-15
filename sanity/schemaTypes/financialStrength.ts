import { defineField, defineType } from "sanity";

/**
 * One document for the "Portfolio financial strength" section of the
 * homepage: the headline figures and the two comparison charts.
 */
export const financialStrength = defineType({
  name: "financialStrength",
  title: "Financial strength",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", initialValue: "Portfolio financial strength" }),
    defineField({
      name: "intro",
      title: "Source and period",
      type: "text",
      rows: 2,
      description: "Shown under the heading, e.g. 'Trailing twelve months through June 2026, from property-level P&Ls…'. Update the date when the figures change.",
    }),
    defineField({
      name: "metrics",
      title: "Headline figures",
      type: "array",
      description: "The big numbers in the cards. Keep it to four.",
      of: [
        {
          type: "object",
          name: "metric",
          fields: [
            defineField({ name: "value", title: "Value", type: "string", description: "e.g. 2.48x or $6.87M", validation: (r) => r.required() }),
            defineField({ name: "label", title: "Label", type: "string", description: "e.g. Blended DSCR", validation: (r) => r.required() }),
            defineField({ name: "note", title: "Small note", type: "string", description: "e.g. Banks typically require 1.20x–1.25x" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "charts",
      title: "Comparison charts",
      type: "array",
      description: "Each chart compares two or three bars on one axis.",
      of: [
        {
          type: "object",
          name: "chart",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "caption", title: "One-line explanation", type: "string" }),
            defineField({
              name: "format",
              title: "Unit",
              type: "string",
              options: {
                list: [
                  { title: "Multiple (1.25x)", value: "multiple" },
                  { title: "Millions of dollars ($6.87M)", value: "currency" },
                  { title: "Percent (36.5%)", value: "percent" },
                ],
                layout: "radio",
              },
              initialValue: "multiple",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "max",
              title: "Top of the axis",
              type: "number",
              description: "In the chart's unit: 3 for '3x', 8 for '$8M', 100 for '100%'.",
              validation: (r) => r.required().positive(),
            }),
            defineField({
              name: "bars",
              title: "Bars",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "bar",
                  fields: [
                    defineField({ name: "label", title: "Label", type: "string", description: "e.g. Bank minimum", validation: (r) => r.required() }),
                    defineField({ name: "value", title: "Value (number)", type: "number", description: "e.g. 1.25 or 6.87", validation: (r) => r.required() }),
                    defineField({ name: "display", title: "Value as shown", type: "string", description: "e.g. 1.25x or $6.87M", validation: (r) => r.required() }),
                    defineField({ name: "emphasis", title: "Highlight in gold", type: "boolean", initialValue: false, description: "ON for Nex's own figure; the comparison bar stays grey." }),
                  ],
                  preview: { select: { title: "display", subtitle: "label" } },
                },
              ],
              validation: (r) => r.min(2).max(3),
            }),
          ],
          preview: { select: { title: "title", subtitle: "caption" } },
        },
      ],
      validation: (r) => r.max(2),
    }),
    defineField({ name: "hidden", title: "Hide this section", type: "boolean", initialValue: false }),
  ],
  preview: { prepare: () => ({ title: "Financial strength" }) },
});
