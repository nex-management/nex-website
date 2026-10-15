import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { SANITY_TAG } from "@/content";

/**
 * Sanity webhook target. Point a Sanity webhook (Manage → API → Webhooks) at
 * POST https://<site>/api/revalidate with the header
 * `x-revalidate-secret: <SANITY_REVALIDATE_SECRET>` and published content
 * shows up on the site right away instead of within the hour.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ error: "Revalidation is not configured." }, { status: 503 });
  }

  const provided = request.headers.get("x-revalidate-secret") ?? request.nextUrl.searchParams.get("secret") ?? "";
  const a = Buffer.from(provided);
  const b = Buffer.from(secret);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return Response.json({ error: "Invalid secret." }, { status: 401 });
  }

  revalidateTag(SANITY_TAG, "max");
  return Response.json({ revalidated: true, now: Date.now() });
}
