import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { SANITY_TAG } from "@/content";

/**
 * Sanity webhook target. Point a Sanity webhook (Manage → API → Webhooks) at
 * POST https://<site>/api/revalidate with the HTTP header
 * `x-revalidate-secret: <SANITY_REVALIDATE_SECRET>` and published content
 * shows up on the next page load instead of within the hour.
 *
 * The secret is accepted in the header only (never in the URL, which would
 * end up in access logs).
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ error: "Revalidation is not configured." }, { status: 503 });
  }

  const provided = request.headers.get("x-revalidate-secret") ?? "";
  const a = Buffer.from(provided);
  const b = Buffer.from(secret);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return Response.json({ error: "Invalid secret." }, { status: 401 });
  }

  // expire: 0 – the editor who just published must see the change on the
  // very next request, not a stale copy while it refreshes in the background.
  revalidateTag(SANITY_TAG, { expire: 0 });
  return Response.json({ revalidated: true, now: Date.now() });
}
