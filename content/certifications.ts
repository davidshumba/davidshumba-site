export type Certification = {
  name: string
  issuer: string
  date?: string           // omit if unknown
  credentialUrl?: string  // link to verifiable credential; omit if none
}

// The Certifications section hides itself when this is empty.
export const certifications: Certification[] = [
  {
    name: 'Claude Code 101',
    issuer: 'Anthropic Academy',
  },
  {
    name: 'Claude 101',
    issuer: 'Anthropic Academy',
  },
]
