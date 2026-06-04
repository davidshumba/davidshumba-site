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

// TODO: replace placeholder descriptions with real scope and outcomes as you ship.
// Add sourceUrl when repos are public. Add liveUrl when deployed.
export const projects: Project[] = [
  {
    slug: 'nhs-ae-dashboard',
    title: 'NHS A&E Performance Dashboard',
    description:
      'Analysing NHS England A&E waiting-time data to surface operational patterns and performance trends. Built in Power BI with SQL preprocessing and Python for data cleaning.',
    status: 'building',
    date: 'June 2026',
    tags: ['Power BI', 'SQL', 'Python'],
    // sourceUrl: 'https://github.com/davidshumba/nhs-ae-dashboard',  // uncomment when public
    highlight: true,
  },
  {
    slug: 'predictive-maintenance-cmapss',
    title: 'Predictive Maintenance — NASA C-MAPSS',
    description:
      'Remaining-useful-life modelling on the NASA turbofan engine degradation dataset (C-MAPSS). Exploring regression and LSTM approaches to predict engine failure before it occurs.',
    status: 'building',
    date: '2026',
    tags: ['Python', 'pandas', 'scikit-learn'],
    // sourceUrl: 'https://github.com/davidshumba/predictive-maintenance',  // uncomment when public
    highlight: true,
  },
]
