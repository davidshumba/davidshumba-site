import { Section } from '@/components/primitives/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { AnimatedReveal } from '@/components/primitives/AnimatedReveal'

// TODO: Replace these paragraphs with your own voice.
// Keep it first-person, factual, and concise. 2–4 paragraphs is ideal.
const paragraphs = [
  "I am a Data Analyst Degree Apprentice, and aspiring Data Scientist, based in the UK, building the systems that help businesses obtain robust insight from, and make better decisions with their data.",
  "My work sits at the intersection of data engineering, analytics, and AI automation. I spend most of my time in Power BI and SQL — building dashboards, pipelines, and automated reporting workflows that remove friction from how data reaches the people who need it.",
  "I care about work that's verifiable: live systems, published code, documented methods. Every project on this site is real, linked to its source, and honestly marked as in-progress or shipped.",
]

export function About() {
  return (
    <Section id="about">
      <div className="mx-auto max-w-[880px] px-6">
        <AnimatedReveal>
          <Eyebrow>About</Eyebrow>
        </AnimatedReveal>
        <div className="max-w-[640px] space-y-5">
          {paragraphs.map((p, i) => (
            <AnimatedReveal key={i} delay={i * 0.07}>
              <p className="text-[1.0625rem] leading-[1.8] text-muted">{p}</p>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
