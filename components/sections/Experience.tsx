import { experiences } from '@/content/experience'
import { educations } from '@/content/education'
import { Section } from '@/components/primitives/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { AnimatedReveal } from '@/components/primitives/AnimatedReveal'

function TimelineItem({
  title,
  subtitle,
  start,
  end,
  description,
}: {
  title: string
  subtitle?: string
  start: string
  end: string
  description: string
}) {
  return (
    <div className="relative pl-5 border-l border-border">
      <div className="absolute -left-px top-0 w-px h-4 bg-accent/60" />
      <div className="mb-1.5 flex flex-col gap-0.5">
        <h3 className="text-sm font-medium text-fg leading-snug">
          {title}
          {subtitle ? (
            <span className="text-muted font-normal"> — {subtitle}</span>
          ) : null}
        </h3>
        <span className="font-mono text-xs text-muted">
          {start} – {end}
        </span>
      </div>
      {description ? (
        <p className="text-sm text-muted leading-relaxed">{description}</p>
      ) : null}
    </div>
  )
}

export function Experience() {
  if (experiences.length === 0 && educations.length === 0) return null

  return (
    <Section id="experience">
      <div className="mx-auto max-w-[880px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {experiences.length > 0 && (
            <div>
              <AnimatedReveal>
                <Eyebrow>Experience</Eyebrow>
              </AnimatedReveal>
              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <AnimatedReveal key={i} delay={i * 0.08}>
                    <TimelineItem
                      title={exp.role}
                      subtitle={exp.org}
                      start={exp.start}
                      end={exp.end}
                      description={exp.description}
                    />
                  </AnimatedReveal>
                ))}
              </div>
            </div>
          )}

          {educations.length > 0 && (
            <div>
              <AnimatedReveal>
                <Eyebrow>Education</Eyebrow>
              </AnimatedReveal>
              <div className="space-y-8">
                {educations.map((edu, i) => (
                  <AnimatedReveal key={i} delay={i * 0.08}>
                    <TimelineItem
                      title={edu.qualification}
                      subtitle={edu.institution}
                      start={edu.start}
                      end={edu.end}
                      description={edu.note ?? ''}
                    />
                  </AnimatedReveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
