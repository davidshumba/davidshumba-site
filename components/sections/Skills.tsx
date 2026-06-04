import { skills } from '@/content/skills'
import { Section } from '@/components/primitives/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Tag } from '@/components/primitives/Tag'
import { AnimatedReveal } from '@/components/primitives/AnimatedReveal'

export function Skills() {
  if (skills.length === 0) return null

  return (
    <Section id="skills">
      <div className="mx-auto max-w-[880px] px-6">
        <AnimatedReveal>
          <Eyebrow>Skills & Tools</Eyebrow>
        </AnimatedReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {skills.map((group, i) => (
            <AnimatedReveal key={group.category} delay={i * 0.07}>
              <div>
                <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-3">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
