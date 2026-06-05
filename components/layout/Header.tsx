import Link from 'next/link'
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
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

        <nav className="flex items-center gap-4 sm:gap-6" aria-label="Main navigation">
          <div className="flex items-center gap-4 sm:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-xs text-muted hover:text-fg transition-colors tracking-wide py-1"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-3 text-muted">
            <ThemeToggle />
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="hover:text-accent transition-colors p-1.5 -m-1.5"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hover:text-accent transition-colors p-1.5 -m-1.5"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={`mailto:${profile.socials.email}`}
              aria-label="Send email"
              className="hover:text-accent transition-colors p-1.5 -m-1.5 hidden sm:block"
            >
              <Mail size={16} aria-hidden="true" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
