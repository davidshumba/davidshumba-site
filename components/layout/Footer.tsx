import Link from 'next/link'
import { Code, Briefcase, Mail } from 'lucide-react'
import { profile } from '@/content/profile'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto flex max-w-[880px] flex-col sm:flex-row items-center justify-between gap-4 px-6 py-10">
        <Link
          href="/"
          className="font-mono text-sm text-muted hover:text-fg transition-colors"
        >
          {profile.name}
        </Link>

        <div className="flex items-center gap-4 text-muted">
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-accent transition-colors"
          >
            <Briefcase size={15} aria-hidden="true" />
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-accent transition-colors"
          >
            <Code size={15} aria-hidden="true" />
          </a>
          <a
            href={`mailto:${profile.socials.email}`}
            aria-label="Email"
            className="hover:text-accent transition-colors"
          >
            <Mail size={15} aria-hidden="true" />
          </a>
        </div>

        <p className="font-mono text-xs text-muted">
          © {year} · Built with Next.js
        </p>
      </div>
    </footer>
  )
}
