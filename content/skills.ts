export type SkillCategory = {
  category: string
  items: string[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Data & Analytics',
    items: ['Power BI', 'DAX', 'SQL', 'Excel'],
  },
  {
    category: 'Programming',
    items: ['Python', 'pandas', 'NumPy'],
  },
  {
    category: 'AI & Automation',
    items: ['Prompt engineering', 'Workflow automation', 'scikit-learn'],
  },
  {
    category: 'Tools',
    items: ['Git / GitHub', 'VS Code', 'Vercel', 'Jupyter'],
  },
]
