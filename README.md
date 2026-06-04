# davidshumba.com

Personal career site for David Shumba. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Go to vercel.com/new and import the repo.
3. Vercel auto-detects Next.js — no build configuration needed.
4. In Vercel project settings → Domains, add `davidshumba.com`.

## DNS (Cloudflare)

In Cloudflare DNS for `davidshumba.com`:

- Add an **A record**: name `@`, value `76.76.21.21` (Vercel IP), proxy status → **DNS only** (grey cloud) for accurate Vercel analytics.
- Optionally add a **CNAME**: name `www`, value `cname.vercel-dns.com`, DNS only.
- Set up a redirect (in Vercel or Cloudflare Page Rules) from `www` → apex, or vice-versa.

Full Vercel domain docs: https://vercel.com/docs/projects/domains

## Editing content

All content lives in `content/`. Edit these files to update the site — no JSX changes required.

| File | What it controls |
|------|-----------------|
| `content/profile.ts` | Name, role, tagline, "currently building" link, social URLs, stat row |
| `content/projects.ts` | Project cards in the Work section |
| `content/experience.ts` | Work experience timeline entries |
| `content/education.ts` | Education timeline entries |
| `content/skills.ts` | Grouped skills and tools |
| `content/certifications.ts` | Certifications list (section hides when array is empty) |

### Adding a project

In `content/projects.ts`, add an object to the `projects` array:

```ts
{
  slug: 'my-new-project',
  title: 'My New Project',
  description: 'One or two sentences describing what it does and the outcome.',
  status: 'live',
  date: 'July 2026',
  tags: ['Power BI', 'SQL'],
  liveUrl: 'https://...',       // optional
  sourceUrl: 'https://github.com/davidshumba/...', // optional
  highlight: true,
}
```

### Adding a certification

In `content/certifications.ts`, add an object to the `certifications` array:

```ts
{
  name: 'Microsoft Certified: Power BI Data Analyst Associate',
  issuer: 'Microsoft',
  date: 'Jan 2026',
  credentialUrl: 'https://learn.microsoft.com/...',
}
```

## OG image

A generated OG image lives at `app/opengraph-image.tsx`. To replace it with a custom design, place a 1200×630 PNG at `public/og.png` and update `metadata.openGraph.images` in `app/layout.tsx` to reference `/og.png`.
