export type Certification = {
  name: string
  issuer: string
  date: string
  credentialUrl?: string  // link to verifiable credential; omit if none
}

// Empty array — the Certifications section hides itself when this is empty.
// TODO: add entries as you earn certifications. Example:
// {
//   name: 'Microsoft Certified: Power BI Data Analyst Associate',
//   issuer: 'Microsoft',
//   date: 'Jan 2026',
//   credentialUrl: 'https://learn.microsoft.com/...',
// },
export const certifications: Certification[] = []
