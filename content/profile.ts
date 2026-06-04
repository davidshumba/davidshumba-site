export type Stat = {
  value: string
  label: string
}

export type SocialLinks = {
  linkedin: string
  github: string
  email: string
  youtube?: string
}

export type CurrentlyBuilding = {
  label: string
  href: string
}

export type Profile = {
  name: string
  role: string
  employer?: string    // optional — leave blank to omit employer branding
  location: string
  tagline: string     // TODO: refine this in your own voice
  currentlyBuilding: CurrentlyBuilding
  socials: SocialLinks
  stats: Stat[]       // leave empty until you have real, verifiable numbers
}

export const profile: Profile = {
  name: 'David Shumba',
  role: 'Data Analyst — Degree Apprentice',
  // employer: 'Your Employer',  // uncomment and fill in if you want to show it
  location: 'United Kingdom',
  // TODO: refine tagline in your own voice
  tagline: 'I turn messy data into clear decisions — dashboards, automation, and AI workflows.',
  currentlyBuilding: {
    label: 'NHS A&E Performance Dashboard',
    href: 'https://github.com/davidshumba',  // TODO: update to specific repo URL when public
  },
  socials: {
    linkedin: 'https://linkedin.com/in/davidshumba',
    github: 'https://github.com/davidshumba',
    email: 'davidshumba2005@gmail.com',
    // youtube: 'https://youtube.com/@davidshumba',  // uncomment if/when you have a channel
  },
  // TODO: add real, verifiable stats when you have them — e.g.:
  // stats: [
  //   { value: '3+', label: 'years in data' },
  //   { value: '12', label: 'dashboards shipped' },
  // ],
  stats: [],
}
