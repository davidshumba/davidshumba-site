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
  tagline: string
  currentlyBuilding: CurrentlyBuilding
  socials: SocialLinks
  stats: Stat[]       // leave empty until you have real, verifiable numbers
}

export const profile: Profile = {
  name: 'David Shumba',
  role: 'Data Apprentice',
  employer: 'Mercedes-Benz Financial Services',
  location: 'United Kingdom',
  tagline:
    'Engineering the systems that turn data into useful intelligence: data pipelines, automation and analytics, built and tested properly.',
  currentlyBuilding: {
    label: 'NHS A&E Performance Pipeline',
    href: 'https://github.com/davidshumba/nhs-ae-pipeline',
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
