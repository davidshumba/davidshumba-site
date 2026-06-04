import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/content/profile'
import { Section } from '@/components/primitives/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { AnimatedReveal } from '@/components/primitives/AnimatedReveal'

export function Contact() {
  return (
    <Section id="contact">
      <div className="mx-auto max-w-[880px] px-6">
        <AnimatedReveal>
          <Eyebrow>Get in Touch</Eyebrow>
          <h2 className="text-3xl font-semibold text-fg mb-4 tracking-tight">
            Let's connect.
          </h2>
          <p className="text-muted max-w-[440px] leading-relaxed mb-10">
            Open to interesting conversations about data, AI, and what you're
            building. Reach out on LinkedIn or email directly.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-accent text-accent font-mono text-xs px-5 py-3 hover:bg-accent hover:text-bg transition-colors"
            >
              LinkedIn <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <a
              href={`mailto:${profile.socials.email}`}
              className="inline-flex items-center gap-2 border border-border text-muted font-mono text-xs px-5 py-3 hover:border-fg hover:text-fg transition-colors"
            >
              {profile.socials.email}
            </a>
          </div>
          <p className="font-mono text-xs text-muted mt-10">{profile.location}</p>
        </AnimatedReveal>
      </div>
    </Section>
  )
}
