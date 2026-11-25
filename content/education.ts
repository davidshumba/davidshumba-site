export type Education = {
  qualification: string
  institution?: string  // optional
  start: string
  end: string
  note?: string         // e.g. expected grade, modules, honours
}

export const educations: Education[] = [
  {
    qualification: 'BSc (Hons) Digital and Technology Solutions',
    institution: 'Cranfield University',
    start: 'Sep 2025',
    end: 'Jan 2028',
    note: 'Level 6 degree apprenticeship, Software Engineering specialism. Combines workplace delivery with academic study.',
  },
]
