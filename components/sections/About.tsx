import { Section } from '@/components/primitives/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { AnimatedReveal } from '@/components/primitives/AnimatedReveal'

const paragraphs = [
  "I'm a Data Apprentice at Mercedes-Benz Financial Services and a BSc Digital & Technology Solutions student at Cranfield University, specialising in Software Engineering. I build the systems that turn data into something people can actually use.",
  "Day-to-day I work across data engineering, financial reconciliation and analytics: cloud data pipelines in Azure, reconciliation automation in Python and SQL, and Power BI reporting for Finance and Audit. The work people actually open before meetings. Not the demo, but the daily driver.",
  "Outside work I'm building the engineering foundations properly (testing, APIs, CI/CD), one shipped project at a time. I'm most drawn to problems in healthcare and automotive.",
  "I care about work that's verifiable: live systems, published code, documented methods. Every project on this site is real, linked to its source, and honestly marked as in progress or shipped.",
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
