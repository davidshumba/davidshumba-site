import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { profile } from '@/content/profile'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'David Shumba — Data Analyst Degree Apprentice',
    template: '%s | David Shumba',
  },
  description:
    'UK-based Data Analyst Degree Apprentice building dashboards, automation, and AI workflows.',
  keywords: ['David Shumba', 'Data Analyst', 'Degree Apprentice', 'Power BI', 'SQL', 'Python', 'UK'],
  authors: [{ name: 'David Shumba', url: 'https://davidshumba.com' }],
  metadataBase: new URL('https://davidshumba.com'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'David Shumba — Data Analyst Degree Apprentice',
    description:
      'UK-based Data Analyst Degree Apprentice building dashboards, automation, and AI workflows.',
    url: 'https://davidshumba.com',
    siteName: 'David Shumba',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Shumba — Data Analyst Degree Apprentice',
    description:
      'UK-based Data Analyst Degree Apprentice building dashboards, automation, and AI workflows.',
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: 'https://davidshumba.com',
  jobTitle: profile.role,
  sameAs: [
    profile.socials.linkedin,
    profile.socials.github,
    ...(profile.socials.youtube ? [profile.socials.youtube] : []),
  ],
  knowsAbout: [
    'Power BI',
    'SQL',
    'Python',
    'Data Analytics',
    'AI Automation',
    'Data Pipelines',
    'Dashboard Design',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Prevent flash of wrong theme before JS hydrates */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light');})();` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-fg antialiased">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
