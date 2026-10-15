/**
 * Sanity connection settings, read from environment variables.
 *
 * Set these on the host (Netlify → Environment variables) and locally in
 * `.env.local`:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID  – from sanity.io → project → Settings
 *   NEXT_PUBLIC_SANITY_DATASET     – usually "production"
 *
 * While NEXT_PUBLIC_SANITY_PROJECT_ID is not set, the site renders from the
 * local content files in src/content and the Studio page explains how to
 * connect.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-10-01";

export const sanityConfigured = projectId.length > 0;
