"use client";

/**
 * Sanity Studio configuration – the editing panel served at /studio.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { RocketIcon } from "@sanity/icons/Rocket";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { StarterContentTool } from "./sanity/StarterContentTool";

const singletonTypes = new Set(["siteSettings"]);
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "nex-management",
  title: "Nex Management",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Singletons can't be created or deleted from the "new document" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType) ? input.filter(({ action }) => action && singletonActions.has(action)) : input,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Website")
          .items([
            S.listItem()
              .title("Site settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            S.documentTypeListItem("hotel").title("Hotels"),
            S.documentTypeListItem("teamMember").title("Team"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
            S.documentTypeListItem("service").title("Services"),
          ]),
    }),
  ],
  // One-click import of the content the site launched with (safe to re-run).
  tools: (prev) => [...prev, { name: "starter-content", title: "Starter content", icon: RocketIcon, component: StarterContentTool }],
  // Keep the panel simple for a small editing team: no content releases or scheduling UI.
  releases: { enabled: false },
  scheduledDrafts: { enabled: false },
  // Keep the version pinned so the Studio and the site read the same API.
  apiVersion,
});
