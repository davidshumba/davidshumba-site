export type Experience = {
  role: string
  org?: string        // optional — omit to keep employer confidential
  start: string
  end: string         // use 'Present' for current role
  description: string
}

// TODO: replace with your real work history
export const experiences: Experience[] = [
  {
    role: 'Data Analyst — Degree Apprentice',
    // org: 'Your Employer',  // uncomment and fill in if you want to name the employer
    start: '2024',
    end: 'Present',
    description:
      'Building and maintaining Power BI dashboards, SQL reporting pipelines, and data automation workflows. Degree Apprenticeship combining on-the-job data practice with formal qualification.',
  },
]
