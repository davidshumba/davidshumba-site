export type SkillCategory = {
  category: string
  items: string[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    items: ['Python', 'SQL', 'PySpark', 'DAX'],
  },
  {
    category: 'Data Engineering',
    items: ['Azure Data Factory', 'Databricks', 'Microsoft Fabric', 'pandas'],
  },
  {
    category: 'Analytics',
    items: ['Power BI', 'Excel'],
  },
  {
    category: 'Engineering Tools',
    items: ['Git / GitHub', 'pytest', 'VS Code', 'Vercel'],
  },
]
