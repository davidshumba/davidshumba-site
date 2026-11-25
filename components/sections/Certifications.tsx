import { certifications } from '@/content/certifications'
import { Section } from '@/components/primitives/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedReveal } from '@/components/primitives/AnimatedReveal'

export function Certifications() {
  // Section hides itself completely when empty — never shows a broken grid
  if (certifications.length === 0) return null

  return (
    <Section id="certifications">
      <div className="mx-auto max-w-[880px] px-6">
        <AnimatedReveal>
          <Eyebrow>Certifications & Courses</Eyebrow>
        </AnimatedReveal>
        <div>
          {certifications.map((cert, i) => (
            <AnimatedReveal key={i} delay={i * 0.06}>
              <div className="flex items-center justify-between border-b border-border py-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-fg">{cert.name}</p>
                  <p className="font-mono text-xs text-muted mt-0.5">
                    {cert.date ? `${cert.issuer} · ${cert.date}` : cert.issuer}
                  </p>
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View credential for ${cert.name}`}
                    className="font-mono text-xs text-accent hover:underline underline-offset-4 inline-flex items-center gap-1 shrink-0"
                  >
                    View <ArrowUpRight size={11} aria-hidden="true" />
                  </a>
                )}
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
