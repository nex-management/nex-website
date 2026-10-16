/**
 * Where the site lives, and whether this build may be indexed.
 *
 * The canonical address is https://nex-mgmt.com (override with
 * NEXT_PUBLIC_SITE_URL). Netlify sets CONTEXT ("production",
 * "deploy-preview", "branch-deploy") and URL (the site's main address) at
 * build time; previews, branch deploys and the temporary *.netlify.app
 * address are kept out of search engines so they never compete with the
 * real domain.
 */
const DEFAULT_SITE_URL = "https://nex-mgmt.com";

function trimSlash(url: string) {
  return url.replace(/\/+$/, "");
}

export const siteUrl = trimSlash(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL);

const context = process.env.CONTEXT;
const hostUrl = process.env.URL;

/** True only for a production build served from the canonical domain (or a local build). */
export const indexable = (!context || context === "production") && (!hostUrl || trimSlash(hostUrl) === siteUrl);

/** Absolute URL for a site path, e.g. absoluteUrl("/portfolio") → "https://nex-mgmt.com/portfolio". */
export function absoluteUrl(path: string) {
  return new URL(path, `${siteUrl}/`).toString();
}
