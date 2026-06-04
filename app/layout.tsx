import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { profile } from '@/content/profile'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'David Shumba — Data Analyst & Builder',
    template: '%s | David Shumba',
  },
  description:
    'UK-based Data Analyst building dashboards, automation, and AI workflows.',
  keywords: ['David Shumba', 'Data Analyst', 'Power BI', 'SQL', 'Python', 'UK'],
  authors: [{ name: 'David Shumba', url: 'https://davidshumba.com' }],
  metadataBase: new URL('https://davidshumba.com'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'David Shumba — Data Analyst & Builder',
    description:
      'UK-based Data Analyst building dashboards, automation, and AI workflows.',
    url: 'https://davidshumba.com',
    siteName: 'David Shumba',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Shumba — Data Analyst & Builder',
    description:
      'UK-based Data Analyst building dashboards, automation, and AI workflows.',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-fg antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
