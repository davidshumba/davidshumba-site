export type Education = {
  qualification: string
  institution?: string  // optional
  start: string
  end: string
  note?: string         // e.g. expected grade, modules, honours
}

// TODO: replace with your real education details
export const educations: Education[] = [
  {
    qualification: 'BSc Data Analytics (Degree Apprenticeship)',
    // institution: 'University Name',  // uncomment and fill in
    start: '2024',
    end: 'Present',
    note: 'In progress — combined workplace learning and academic study.',
  },
]
