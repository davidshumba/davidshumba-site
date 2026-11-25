import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/content/profile'
import { AnimatedReveal } from '@/components/primitives/AnimatedReveal'

export function Hero() {
  return (
    <section className="pt-36 pb-12">
      <div className="mx-auto max-w-[880px] px-6">
        <AnimatedReveal>
          <p className="font-mono text-xs tracking-widest text-muted uppercase mb-5 sm:mb-8">
            {profile.employer ? `${profile.role} · ${profile.employer}` : profile.role}
          </p>
          <h1 className="text-[clamp(2rem,9vw,5rem)] font-semibold leading-[1.05] tracking-tight text-fg mb-6">
            {profile.name}
          </h1>
          <p className="text-lg text-muted max-w-[560px] leading-relaxed mb-10">
            {profile.tagline}
          </p>
        </AnimatedReveal>

        <AnimatedReveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-10 sm:mb-14">
            <span className="font-mono text-xs text-muted">Currently building</span>
            <a
              href={profile.currentlyBuilding.href}
              className="font-mono text-xs text-accent hover:underline underline-offset-4 inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.currentlyBuilding.label}
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </div>
        </AnimatedReveal>

        {profile.stats.length > 0 && (
          <AnimatedReveal delay={0.15}>
            <div
              className="flex flex-wrap gap-x-10 gap-y-6 border-t border-border pt-8"
              aria-label="Key stats"
            >
              {profile.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-semibold text-fg">{stat.value}</p>
                  <p className="font-mono text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedReveal>
        )}
      </div>
    </section>
  )
}
