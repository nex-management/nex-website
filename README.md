# Nex Management – website

New website for Nex Management (nex-mgmt.com): a South Florida hotel ownership and management company.

Built with [Next.js](https://nextjs.org) (App Router, TypeScript, Tailwind CSS v4). Content editing through Sanity is planned; until it is connected, all site content lives in `src/content/`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project layout

| Path | What it holds |
| --- | --- |
| `src/app/` | Routes: `/` (home), `/team`, `/privacy`, `/api/contact`, plus icons, OG image, robots and sitemap |
| `src/components/layout/` | Header (desktop nav + no-JavaScript mobile menu) and footer |
| `src/components/home/` | Homepage sections, in page order |
| `src/components/ui/` | Buttons, headings, icons, small shared pieces |
| `src/content/` | **All site content** (texts, hotels, team, stats, settings) with the types in `types.ts` |
| `src/app/fonts/` | Self-hosted Cormorant Garamond and Manrope (SIL Open Font License) |
| `public/images/` | Logo and team photos |

## Editing content (until Sanity is connected)

- Company details, links and launch flags: `src/content/site.ts`
- Homepage texts, stats, services, track record, testimonials: `src/content/home.ts`
- Hotels: `src/content/hotels.ts`
- Team members and their perspectives: `src/content/team.ts`

`site.showPlaceholders` controls whether missing content (phone number, hotel photos, booking link, testimonial names…) is shown as bracketed placeholders. Set it to `false` for launch.

## Contact form

`POST /api/contact` sends inquiries by email through [Resend](https://resend.com) when these environment variables are set on the host:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` (comma-separated for several recipients)
- `CONTACT_FROM_EMAIL` (optional; a verified sender on the site's domain)

Until they are set, the form tells the visitor to email directly instead, so no inquiry is lost silently.

## Deploy

Any Node.js host that runs Next.js (Vercel, Netlify). Build with `npm run build`, start with `npm start`.
