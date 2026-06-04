import Link from 'next/link'
import { Code, Briefcase, Mail } from 'lucide-react'
import { profile } from '@/content/profile'

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
]

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[880px] items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm font-medium text-fg hover:text-accent transition-colors"
        >
          {profile.name}
        </Link>

        <nav className="flex items-center gap-6" aria-label="Main navigation">
          {/* Nav links hidden on mobile — icon links always visible */}
          <div className="hidden sm:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-xs text-muted hover:text-fg transition-colors tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 text-muted">
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="hover:text-accent transition-colors"
            >
              <Briefcase size={16} aria-hidden="true" />
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hover:text-accent transition-colors"
            >
              <Code size={16} aria-hidden="true" />
            </a>
            <a
              href={`mailto:${profile.socials.email}`}
              aria-label="Send email"
              className="hover:text-accent transition-colors"
            >
              <Mail size={16} aria-hidden="true" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
