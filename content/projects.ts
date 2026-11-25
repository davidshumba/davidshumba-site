export type ProjectStatus = 'building' | 'live' | 'archived'

export type Project = {
  slug: string
  title: string
  description: string
  status: ProjectStatus
  date: string
  tags: string[]
  liveUrl?: string    // omit if none
  sourceUrl?: string  // GitHub repo; omit if private or not yet published
  highlight?: boolean // show on homepage Work section
}

// Every project here is real and honestly marked as in progress or shipped.
// Add sourceUrl when a repo is public and liveUrl when something is deployed.
export const projects: Project[] = [
  {
    slug: 'nhs-ae-pipeline',
    title: 'NHS A&E Performance Pipeline',
    description:
      "A tested data pipeline for NHS England's monthly A&E data, asking how performance against the 4-hour standard varies across trusts and over time. Python ingestion and validation, DuckDB storage, SQL analysis, with pytest and GitHub Actions.",
    status: 'building',
    date: 'Nov 2026',
    tags: ['Python', 'pandas', 'DuckDB', 'SQL', 'pytest', 'GitHub Actions'],
    sourceUrl: 'https://github.com/davidshumba/nhs-ae-pipeline',
    highlight: true,
  },
  {
    slug: 'davidshumba-com',
    title: 'davidshumba.com',
    description:
      'This site. A content-driven portfolio where every section is generated from typed content files, so updating it means editing data, not layout. Light and dark themes, built and deployed on Vercel.',
    status: 'live',
    date: '2026',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://davidshumba.com',
    // sourceUrl: 'https://github.com/davidshumba/davidshumba-site',  // uncomment once the repo is public
    highlight: true,
  },
  {
    // Parked until the engineering foundations are in place; hidden from the homepage.
    slug: 'predictive-maintenance-cmapss',
    title: 'Predictive Maintenance: NASA C-MAPSS',
    description:
      'Remaining-useful-life modelling on the NASA turbofan engine degradation dataset (C-MAPSS), predicting engine failure before it occurs.',
    status: 'building',
    date: '2027',
    tags: ['Python', 'pandas', 'scikit-learn'],
    highlight: false,
  },
]
