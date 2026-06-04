import { projects } from '@/content/projects'
import { Section } from '@/components/primitives/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { AnimatedReveal } from '@/components/primitives/AnimatedReveal'

export function Work() {
  // Show highlighted projects on homepage; fall back to all if none flagged
  const highlighted = projects.filter((p) => p.highlight)
  const display = highlighted.length > 0 ? highlighted : projects

  // Section hides itself if there are no projects at all
  if (projects.length === 0) return null

  return (
    <Section id="work">
      <div className="mx-auto max-w-[880px] px-6">
        <AnimatedReveal>
          <Eyebrow>Selected Work</Eyebrow>
        </AnimatedReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {display.map((project, i) => (
            <AnimatedReveal key={project.slug} delay={i * 0.08}>
              <ProjectCard project={project} />
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
