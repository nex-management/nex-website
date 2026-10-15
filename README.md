# Nex Management – website

New website for Nex Management (nex-mgmt.com): a South Florida hotel ownership and management company.

Built with [Next.js](https://nextjs.org) (App Router, TypeScript, Tailwind CSS v4) and [Sanity](https://www.sanity.io) for content editing. Until a Sanity project is connected, all site content comes from the files in `src/content/`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project layout

| Path | What it holds |
| --- | --- |
| `src/app/` | Routes: `/`, `/about`, `/services`, `/portfolio` (+ a page per hotel), `/team`, `/partner`, `/contact`, `/privacy`, `/studio` (Sanity), `/api/contact`, `/api/revalidate`, plus icons, OG image, robots and sitemap |
| `src/components/layout/` | Header (desktop nav + no-JavaScript mobile menu) and footer |
| `src/components/home/` | Homepage sections, in page order (several are reused by inner pages) |
| `src/components/ui/` | Buttons, headings, icons, page blocks, small shared pieces |
| `src/content/` | Site content and the content access layer (`index.ts`) with the types in `types.ts` |
| `src/sanity/` | Sanity client, image URL helper and GROQ queries |
| `sanity/` | Sanity Studio schema (`schemaTypes/`) and environment |
| `src/app/fonts/` | Self-hosted Cormorant Garamond and Manrope (SIL Open Font License) |
| `public/images/` | Logo and team photos |

## Content

Components read content only through `src/content/index.ts`. When Sanity is connected, the editable content – site settings, hotels, team, testimonials, services – comes from Sanity; otherwise from the local files:

- Company details, links and launch flags: `src/content/site.ts`
- Homepage texts, stats, services, track record, testimonials: `src/content/home.ts`
- Hotels: `src/content/hotels.ts`
- Team members and their perspectives: `src/content/team.ts`
- Inner-page copy (About, Services, Portfolio, Partner, Contact): `src/content/pages.ts`

`showPlaceholders` (local: `site.ts`; Sanity: Site settings → Launch) controls whether missing content (phone number, hotel photos, booking link, testimonial names…) is shown as bracketed placeholders. Turn it off for launch.

### Connecting Sanity

1. Create a Sanity project (free plan is enough) and note its **Project ID**; keep the default dataset name `production`.
2. Set these environment variables on the host (and in a local `.env.local` for development):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` (optional, defaults to `production`)
3. In Sanity's project settings → API → CORS origins, add the site's URL(s) (e.g. `https://nex-mgmt.com`, `https://nex-management.netlify.app`, `http://localhost:3000`) with *Allow credentials* so the Studio can sign in.
4. Open `/studio` on the site, sign in, and use the **Starter content** tab once: it copies the content the site launched with (site settings, hotels, team with photos, testimonials, services) into Sanity so editing starts from a filled-in panel. It only adds what is missing, so it is safe to run again.
5. Edit under **Structure**. Any document type that is still empty keeps using the local files, so the site can also be migrated one section at a time.

Sanity reads are cached and prerendered: published changes appear on the site within about an hour on their own. For instant updates, set `SANITY_REVALIDATE_SECRET` on the host and add a Sanity webhook (project settings → API → Webhooks) that sends `POST https://<site>/api/revalidate` with the HTTP header `x-revalidate-secret: <the same secret>`.

## Contact form

`POST /api/contact` sends inquiries by email through [Resend](https://resend.com) when these environment variables are set on the host:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` (comma-separated for several recipients)
- `CONTACT_FROM_EMAIL` (optional; a verified sender on the site's domain)

Until they are set, the form tells the visitor to email directly instead, so no inquiry is lost silently.

## Deploy

Hosted on Netlify (team *Nex Management*), building from the `main` branch; pull requests get a free deploy preview. Any Node.js host that runs Next.js works: build with `npm run build`, start with `npm start`.
