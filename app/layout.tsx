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
    default: 'David Shumba',
    template: '%s | David Shumba',
  },
  description:
    'David Shumba, Data Apprentice at Mercedes-Benz Financial Services and Software Engineering degree apprentice at Cranfield, building data pipelines, automation and analytics.',
  keywords: ['David Shumba', 'Data Apprentice', 'Degree Apprentice', 'Data Engineering', 'Software Engineering', 'Python', 'SQL', 'Azure', 'Databricks', 'Power BI', 'UK'],
  authors: [{ name: 'David Shumba', url: 'https://davidshumba.com' }],
  metadataBase: new URL('https://davidshumba.com'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'David Shumba',
    description:
      'Engineering the systems that turn data into useful intelligence. Data Apprentice at Mercedes-Benz Financial Services.',
    url: 'https://davidshumba.com',
    siteName: 'David Shumba',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Shumba',
    description:
      'Engineering the systems that turn data into useful intelligence. Data Apprentice at Mercedes-Benz Financial Services.',
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
  ...(profile.employer ? { worksFor: { '@type': 'Organization', name: profile.employer } } : {}),
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Cranfield University' },
  knowsAbout: [
    'Python',
    'SQL',
    'Data Engineering',
    'Data Pipelines',
    'Azure Data Factory',
    'Databricks',
    'Power BI',
    'Software Testing',
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
