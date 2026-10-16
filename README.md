# Nex Management – website

New website for Nex Management (nex-mgmt.com): a South Florida hotel ownership and management company.

Built with [Next.js](https://nextjs.org) (App Router, TypeScript, Tailwind CSS v4) and [Sanity](https://www.sanity.io) for content editing. Until a Sanity project is connected, all site content comes from the files in `src/content/`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Node.js 22.12 or newer (see `.node-version`).

`npm run check` runs what the CI workflow runs on every pull request: lint, type-check and a production build.

## Project layout

| Path | What it holds |
| --- | --- |
| `src/app/` | Routes: `/`, `/about`, `/services`, `/portfolio` (+ a page per hotel), `/team`, `/partner`, `/contact`, `/privacy`, `/studio` (Sanity), `/api/contact`, `/api/revalidate`, plus the 404 and error pages, icons, Open Graph image, robots and sitemap |
| `src/components/layout/` | Header (desktop nav + no-JavaScript mobile menu) and footer |
| `src/components/home/` | Homepage sections, in page order (several are reused by inner pages) |
| `src/components/ui/` | Buttons, headings, icons, page blocks, pictures, small shared pieces |
| `src/components/seo/` | Structured data (schema.org JSON-LD) |
| `src/content/` | Site content and the content access layer (`index.ts`) with the types in `types.ts` |
| `src/lib/` | Site address / indexing rules (`site-url.ts`) and per-page metadata (`seo.ts`) |
| `src/sanity/` | Sanity client, image URL helper and GROQ queries |
| `sanity/` | Sanity Studio schema (`schemaTypes/`), the Starter content tool and environment |
| `src/app/fonts/` | Self-hosted Cormorant Garamond and Manrope (SIL Open Font License) |
| `public/images/` | Logo, homepage opening image, hotel photos and team photos |
| `.github/workflows/` | CI: lint, type-check and build on pull requests to `main` and pushes to `main`/`dev` |

## Content

Components read content only through `src/content/index.ts`. When Sanity is connected, the editable content – site settings, hotels, team, testimonials, services, financial figures – comes from Sanity; otherwise from the local files:

- Company details and links: `src/content/site.ts`
- Homepage texts, stats, services, track record, financial strength, testimonials: `src/content/home.ts`
- Hotels: `src/content/hotels.ts`
- Team members and their perspectives: `src/content/team.ts`
- Inner-page copy (About, Services, Portfolio, Partner, Contact): `src/content/pages.ts`

Optional details (phone number, booking link, LinkedIn, investor portal, hotel rooms/years, testimonial names) are simply not shown until they have a value.

### Images

Local photos are pre-sized files served as they are (no image optimizer): hotels at 600/900/1200 px, the homepage opening image at 1200/1776 px, each as JPEG and WebP. They are cached by browsers for a year, so when a photo is replaced it must get a **new file name**. Photos uploaded in Sanity are resized by Sanity's image CDN and need no preparation.

### Connecting Sanity

1. Create a Sanity project (free plan is enough) and note its **Project ID**; keep the default dataset name `production`.
2. Set these environment variables on the host (and in a local `.env.local` for development):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` (optional, defaults to `production`)
3. In Sanity's project settings → API → CORS origins, add the site's URL(s) (e.g. `https://nex-mgmt.com`, `https://nex-management.netlify.app`, `http://localhost:3000`) with *Allow credentials* so the Studio can sign in.
4. Open `/studio` on the site, sign in, and use the **Starter content** tab once: it copies the content the site launched with (site settings with the opening image, hotels with photos, team with photos, testimonials, services, financial figures) into Sanity so editing starts from a filled-in panel. It only adds what is missing, so it is safe to run again.
5. Edit under **Structure**.

**Source of truth.** The local content files are used only until the *Site settings* document exists in Sanity (the Starter content tool creates it). From then on Sanity decides: a hotel that is hidden or deleted in the Studio disappears from the site, an unapproved testimonial is not shown, and an emptied list hides its section. Don't change a hotel's web address (slug) once the site is live – it is the page's URL.

Sanity reads are cached and prerendered: published changes appear on the site within about an hour on their own. For instant updates, set `SANITY_REVALIDATE_SECRET` on the host (e.g. `openssl rand -hex 32`) and add a Sanity webhook (project settings → API → Webhooks) that sends `POST https://<site>/api/revalidate` with the HTTP header `x-revalidate-secret: <the same secret>`. The secret is accepted in that header only.

## Contact form

`POST /api/contact` sends inquiries by email through [Resend](https://resend.com) when these environment variables are set on the host:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` (comma-separated for several recipients)
- `CONTACT_FROM_EMAIL` (optional; a verified sender on the site's domain – verify `nex-mgmt.com` in Resend first)

Until they are set, the form tells the visitor to email directly instead, so no inquiry is lost silently.

Spam is kept out without any third-party widget: a hidden honeypot field, a time trap (submissions faster than three seconds are dropped), a same-site check, a fixed list of topics, and length limits. Bots receive the same "ok" answer as people. Resend's free plan allows 100 emails a day; if spam ever becomes a problem, a Netlify rate-limit rule on `/api/contact` is the next step.

## Search engines and sharing

- The canonical address is `https://nex-mgmt.com` (override with `NEXT_PUBLIC_SITE_URL`). Every page sets its canonical URL, Open Graph data and structured data (organization, website, hotel pages, team members).
- Deploy previews, branch deploys and the temporary `*.netlify.app` address are marked *noindex* and their `robots.txt` disallows everything, so they never compete with the real domain. Once the custom domain is attached to the production site on Netlify, the production build becomes indexable on its own (Netlify's `URL` variable then equals the canonical address).
- The sharing image is `src/app/opengraph-image.jpg` (1200 × 630).

## Security headers

`next.config.ts` sets a Content Security Policy, `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy` for every page, with a looser rule for `/studio`. When a new third-party resource is added (another video host, analytics, a booking widget), its domain must be added to the policy. Add `Strict-Transport-Security` once the custom domain is live and all subdomains are known.

## Deploy

Hosted on Netlify (team *Nex Management*), building from the `main` branch; pull requests get a free deploy preview. Any Node.js host that runs Next.js works: build with `npm run build`, start with `npm start`.

Environment variables on the host, all optional until the matching service is set up: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_REVALIDATE_SECRET`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`. A deploy is needed after changing any of them.
