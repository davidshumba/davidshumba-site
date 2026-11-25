export type Experience = {
  role: string
  org?: string        // optional — omit to keep employer confidential
  start: string
  end: string         // use 'Present' for current role
  description: string
}

export const experiences: Experience[] = [
  {
    role: 'Data Apprentice',
    org: 'Mercedes-Benz Financial Services',
    start: 'Sep 2025',
    end: 'Present',
    description:
      'Data engineering, financial reconciliation and analytics for Finance and Audit. Building Azure Data Factory pipelines that automate monthly finance data delivery, automating reconciliations with Python and SQL, developing Power BI monitoring dashboards, and moving reporting processes from on-premises systems to Azure.',
  },
  {
    role: 'Data Analyst Degree Apprentice',
    org: 'apetito UK',
    start: 'Oct 2024',
    end: 'Sep 2025',
    description:
      'Marketing analytics and campaign performance reporting. Used Azure Data Factory to process campaign data for quarterly customer communications reaching 100,000+ customers, and improved the accuracy of data preparation and validation workflows.',
  },
]
