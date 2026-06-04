# David Shumba Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark, minimal, typography-forward personal portfolio site for David Shumba — deployed at davidshumba.com, data-driven via typed content files, fully static/SSG-ready on Vercel.

**Architecture:** Single-page Next.js 15 App Router site; all content in `content/*.ts` typed files (no CMS, no DB); shared primitive components wrap every section; only `AnimatedReveal` is a Client Component (scroll-triggered Framer Motion); everything else Server Components.

**Tech Stack:** Next.js 15 · TypeScript · Tailwind CSS · Framer Motion · Geist font (via `geist` package) · lucide-react icons · Vercel deployment

---

## File Map

```
app/
  layout.tsx          — root layout: fonts, metadata, JSON-LD, Header/Footer shell
  page.tsx            — assembles all section components in IA order
  globals.css         — CSS vars, base styles, film-grain overlay, focus ring, scrollbar
  opengraph-image.tsx — generated OG image via next/og (1200×630)
  sitemap.ts          — Next.js sitemap export
  robots.ts           — Next.js robots export
components/
  layout/
    Header.tsx        — sticky header, wordmark left, nav + icons right, CSS-only responsive
    Footer.tsx        — wordmark, socials, year, "Built with Next.js"
  primitives/
    Container.tsx     — max-w-[880px] centred container
    Section.tsx       — section wrapper with id + vertical rhythm
    Eyebrow.tsx       — monospace section label (uppercase, tracked)
    Tag.tsx           — monospace tech tag pill
    AnimatedReveal.tsx — 'use client': Framer Motion fade+rise on scroll, respects prefers-reduced-motion
  sections/
    Hero.tsx          — name, tagline, currently-building, stats row
    About.tsx         — prose paragraphs (placeholder copy, clearly marked TODO)
    Work.tsx          — filtered project grid reading from content/projects.ts
    ProjectCard.tsx   — single project card with status badge, tags, links
    Experience.tsx    — timeline for experience + education side-by-side
    Skills.tsx        — grouped skills grid
    Certifications.tsx— certs list (hides self when array empty)
    Contact.tsx       — CTA with LinkedIn + email links
content/
  profile.ts          — Profile type + seeded data
  projects.ts         — Project type + two seeded building projects
  experience.ts       — Experience type + one TODO placeholder entry
  education.ts        — Education type + one TODO placeholder entry
  skills.ts           — SkillCategory type + seeded real categories
  certifications.ts   — Certification type + empty array (section hides)
public/
  llms.txt            — plain factual prose for AI search tools
tailwind.config.ts    — theme extension: colors, fontFamily vars
next.config.ts        — minimal config
README.md             — dev, build, deploy, DNS, content-editing instructions
```

---

## Task 1: Scaffold Next.js + Install Dependencies

**Files:**
- Create: scaffold into current working directory
- Modify: `package.json` (add framer-motion, geist, lucide-react)
- Create: `next.config.ts`

- [ ] **Step 1: Scaffold Next.js 15 project**

Run in the project directory (`C:\Users\david\davidshumba-site\davidshumba-site`):

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

When prompted (if at all):
- Would you like to use Turbopack? → No
- If warned "directory not empty" and asked to proceed → Yes

Expected: scaffold completes, you see `app/`, `components/`, `public/`, `package.json`, `tailwind.config.ts`, `tsconfig.json`.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion geist lucide-react
```

Expected: no peer-dep errors. `package.json` now lists framer-motion, geist, lucide-react.

- [ ] **Step 3: Verify clean build baseline**

```bash
npm run build
```

Expected: build passes, no TypeScript errors. (The default Next.js scaffold always builds clean.)

- [ ] **Step 4: Replace next.config.ts with minimal config**

Create/overwrite `next.config.ts`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {}

export default nextConfig
```

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 15 with Tailwind, Framer Motion, Geist"
```

---

## Task 2: Configure Theme — Tailwind + Global CSS

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Write Tailwind theme extension**

Overwrite `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        fg: '#EDEDED',
        muted: '#888888',
        accent: '#C4A75E',
        border: '#1F1F1F',
        card: '#111111',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Write global CSS with CSS vars, grain overlay, and focus ring**

Overwrite `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #0A0A0A;
  --fg: #EDEDED;
  --muted: #888888;
  --accent: #C4A75E;
  --border: #1F1F1F;
  --card: #111111;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg);
  color: var(--fg);
  font-family: var(--font-geist-sans), system-ui, sans-serif;
}

/* Subtle film-grain overlay — almost imperceptible at opacity 0.028 */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.028;
  pointer-events: none;
  z-index: 9999;
}

/* Keyboard focus ring using accent */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}

/* Thin, minimal scrollbar */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
```

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: configure dark theme tokens and global CSS with grain overlay"
```

---

## Task 3: Create All Content Data Files

**Files:**
- Create: `content/profile.ts`
- Create: `content/projects.ts`
- Create: `content/experience.ts`
- Create: `content/education.ts`
- Create: `content/skills.ts`
- Create: `content/certifications.ts`

- [ ] **Step 1: Create `content/profile.ts`**

```ts
export type Stat = {
  value: string
  label: string
}

export type SocialLinks = {
  linkedin: string
  github: string
  email: string
  youtube?: string
}

export type CurrentlyBuilding = {
  label: string
  href: string
}

export type Profile = {
  name: string
  role: string
  employer?: string    // optional — leave blank to omit employer branding
  location: string
  tagline: string     // TODO: refine this in your own voice
  currentlyBuilding: CurrentlyBuilding
  socials: SocialLinks
  stats: Stat[]       // leave empty until you have real, verifiable numbers
}

export const profile: Profile = {
  name: 'David Shumba',
  role: 'Data Analyst — Degree Apprentice',
  // employer: 'Your Employer',  // uncomment and fill in if you want to show it
  location: 'United Kingdom',
  // TODO: refine tagline in your own voice
  tagline: 'I turn messy data into clear decisions — dashboards, automation, and AI workflows.',
  currentlyBuilding: {
    label: 'NHS A&E Performance Dashboard',
    href: 'https://github.com/davidshumba',  // TODO: update to specific repo URL when public
  },
  socials: {
    linkedin: 'https://linkedin.com/in/davidshumba',
    github: 'https://github.com/davidshumba',
    email: 'davidshumba2005@gmail.com',
    // youtube: 'https://youtube.com/@davidshumba',  // uncomment if/when you have a channel
  },
  // TODO: add real, verifiable stats when you have them — e.g.:
  // stats: [
  //   { value: '3+', label: 'years in data' },
  //   { value: '12', label: 'dashboards shipped' },
  // ],
  stats: [],
}
```

- [ ] **Step 2: Create `content/projects.ts`**

```ts
export type ProjectStatus = 'building' | 'live' | 'archived'

export type Project = {
  slug: string
  title: string
  description: string
  status: ProjectStatus
  date: string
  tags: string[]
  liveUrl?: string    // omit if none
  sourceUrl?: string  // GitHub repo; omit if private or not yet published
  highlight?: boolean // show on homepage Work section
}

// TODO: replace placeholder descriptions with real scope and outcomes as you ship.
// Add sourceUrl when repos are public. Add liveUrl when deployed.
export const projects: Project[] = [
  {
    slug: 'nhs-ae-dashboard',
    title: 'NHS A&E Performance Dashboard',
    description:
      'Analysing NHS England A&E waiting-time data to surface operational patterns and performance trends. Built in Power BI with SQL preprocessing and Python for data cleaning.',
    status: 'building',
    date: 'June 2026',
    tags: ['Power BI', 'SQL', 'Python'],
    // sourceUrl: 'https://github.com/davidshumba/nhs-ae-dashboard',  // uncomment when public
    highlight: true,
  },
  {
    slug: 'predictive-maintenance-cmapss',
    title: 'Predictive Maintenance — NASA C-MAPSS',
    description:
      'Remaining-useful-life modelling on the NASA turbofan engine degradation dataset (C-MAPSS). Exploring regression and LSTM approaches to predict engine failure before it occurs.',
    status: 'building',
    date: '2026',
    tags: ['Python', 'pandas', 'scikit-learn'],
    // sourceUrl: 'https://github.com/davidshumba/predictive-maintenance',  // uncomment when public
    highlight: true,
  },
]
```

- [ ] **Step 3: Create `content/experience.ts`**

```ts
export type Experience = {
  role: string
  org?: string        // optional — omit to keep employer confidential
  start: string
  end: string         // use 'Present' for current role
  description: string
}

// TODO: replace with your real work history
export const experiences: Experience[] = [
  {
    role: 'Data Analyst — Degree Apprentice',
    // org: 'Your Employer',  // uncomment and fill in if you want to name the employer
    start: '2024',
    end: 'Present',
    description:
      'Building and maintaining Power BI dashboards, SQL reporting pipelines, and data automation workflows. Degree Apprenticeship combining on-the-job data practice with formal qualification.',
  },
]
```

- [ ] **Step 4: Create `content/education.ts`**

```ts
export type Education = {
  qualification: string
  institution?: string  // optional
  start: string
  end: string
  note?: string         // e.g. expected grade, modules, honours
}

// TODO: replace with your real education details
export const educations: Education[] = [
  {
    qualification: 'BSc Data Analytics (Degree Apprenticeship)',
    // institution: 'University Name',  // uncomment and fill in
    start: '2024',
    end: 'Present',
    note: 'In progress — combined workplace learning and academic study.',
  },
]
```

- [ ] **Step 5: Create `content/skills.ts`**

```ts
export type SkillCategory = {
  category: string
  items: string[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Data & Analytics',
    items: ['Power BI', 'DAX', 'SQL', 'Excel'],
  },
  {
    category: 'Programming',
    items: ['Python', 'pandas', 'NumPy'],
  },
  {
    category: 'AI & Automation',
    items: ['Prompt engineering', 'Workflow automation', 'scikit-learn'],
  },
  {
    category: 'Tools',
    items: ['Git / GitHub', 'VS Code', 'Vercel', 'Jupyter'],
  },
]
```

- [ ] **Step 6: Create `content/certifications.ts`**

```ts
export type Certification = {
  name: string
  issuer: string
  date: string
  credentialUrl?: string  // link to verifiable credential; omit if none
}

// Empty array — the Certifications section hides itself when this is empty.
// TODO: add entries as you earn certifications. Example:
// {
//   name: 'Microsoft Certified: Power BI Data Analyst Associate',
//   issuer: 'Microsoft',
//   date: 'Jan 2026',
//   credentialUrl: 'https://learn.microsoft.com/...',
// },
export const certifications: Certification[] = []
```

- [ ] **Step 7: Verify TypeScript types compile**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add content/
git commit -m "feat: add typed content data files with seeded placeholder data"
```

---

## Task 4: Create Shared Primitive Components

**Files:**
- Create: `components/primitives/Container.tsx`
- Create: `components/primitives/Section.tsx`
- Create: `components/primitives/Eyebrow.tsx`
- Create: `components/primitives/Tag.tsx`
- Create: `components/primitives/AnimatedReveal.tsx`

- [ ] **Step 1: Create `components/primitives/Container.tsx`**

```tsx
export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-[880px] px-6 ${className ?? ''}`}>
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Create `components/primitives/Section.tsx`**

```tsx
export function Section({
  children,
  id,
  className,
}: {
  children: React.ReactNode
  id?: string
  className?: string
}) {
  return (
    <section id={id} className={`py-24 ${className ?? ''}`}>
      {children}
    </section>
  )
}
```

- [ ] **Step 3: Create `components/primitives/Eyebrow.tsx`**

```tsx
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-widest text-muted uppercase mb-8">
      {children}
    </p>
  )
}
```

- [ ] **Step 4: Create `components/primitives/Tag.tsx`**

```tsx
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] text-muted border border-border px-2 py-0.5 rounded-sm">
      {children}
    </span>
  )
}
```

- [ ] **Step 5: Create `components/primitives/AnimatedReveal.tsx`**

This is the only Client Component in the primitives layer.

```tsx
'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

export function AnimatedReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 6: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add components/primitives/
git commit -m "feat: add shared primitive components (Container, Section, Eyebrow, Tag, AnimatedReveal)"
```

---

## Task 5: Build Header and Footer

**Files:**
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create `components/layout/Header.tsx`**

Server Component — responsive via CSS only (no JS menu drawer needed at this scale).

```tsx
import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
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
              <Linkedin size={16} aria-hidden="true" />
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hover:text-accent transition-colors"
            >
              <Github size={16} aria-hidden="true" />
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
```

- [ ] **Step 2: Create `components/layout/Footer.tsx`**

```tsx
import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
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
            <Linkedin size={15} aria-hidden="true" />
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-accent transition-colors"
          >
            <Github size={15} aria-hidden="true" />
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
```

- [ ] **Step 3: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/layout/
git commit -m "feat: add Header and Footer layout components"
```

---

## Task 6: Build Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create `components/sections/Hero.tsx`**

```tsx
import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/content/profile'
import { AnimatedReveal } from '@/components/primitives/AnimatedReveal'

export function Hero() {
  return (
    <section className="pt-40 pb-24">
      <div className="mx-auto max-w-[880px] px-6">
        <AnimatedReveal>
          <p className="font-mono text-xs tracking-widest text-muted uppercase mb-8">
            {profile.location}
          </p>
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05] tracking-tight text-fg mb-6">
            {profile.name}
          </h1>
          <p className="text-lg text-muted max-w-[560px] leading-relaxed mb-10">
            {profile.tagline}
          </p>
        </AnimatedReveal>

        <AnimatedReveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-14">
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
```

- [ ] **Step 2: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section with name, tagline, currently-building, conditional stats"
```

---

## Task 7: Build About Section

**Files:**
- Create: `components/sections/About.tsx`

- [ ] **Step 1: Create `components/sections/About.tsx`**

```tsx
import { Section } from '@/components/primitives/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { AnimatedReveal } from '@/components/primitives/AnimatedReveal'

// TODO: Replace these paragraphs with your own voice.
// Keep it first-person, factual, and concise. 2–4 paragraphs is ideal.
const paragraphs = [
  "I'm a Data Analyst and Degree Apprentice based in the UK, building the systems that help organisations make better decisions with their data.",
  "My work sits at the intersection of data engineering, analytics, and AI automation. I spend most of my time in Power BI and SQL — building dashboards, pipelines, and automated reporting workflows that remove friction from how data reaches the people who need it.",
  "I care about work that's verifiable: live systems, published code, documented methods. Every project on this site is real, linked to its source, and honestly marked as in-progress or shipped.",
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
```

- [ ] **Step 2: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat: add About section with placeholder prose"
```

---

## Task 8: Build Work Section and ProjectCard

**Files:**
- Create: `components/sections/ProjectCard.tsx`
- Create: `components/sections/Work.tsx`

- [ ] **Step 1: Create `components/sections/ProjectCard.tsx`**

```tsx
import { ArrowUpRight, Github } from 'lucide-react'
import { Tag } from '@/components/primitives/Tag'
import type { Project } from '@/content/projects'

export function ProjectCard({ project }: { project: Project }) {
  const isBuilding = project.status === 'building'

  return (
    <article
      className={`border border-border rounded-sm p-6 flex flex-col gap-5 transition-colors hover:border-muted/40 ${
        isBuilding ? 'opacity-85' : ''
      }`}
    >
      {/* Title row */}
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-1.5">
          <h3 className="text-[0.9375rem] font-medium text-fg leading-snug">
            {project.title}
          </h3>
          {isBuilding && (
            <span className="font-mono text-[9px] tracking-widest border border-accent/50 text-accent px-1.5 py-0.5 rounded-sm uppercase">
              In Progress
            </span>
          )}
        </div>
        <p className="font-mono text-xs text-muted">{project.date}</p>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted flex-1">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-5 pt-3 border-t border-border">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent hover:underline underline-offset-4 inline-flex items-center gap-1"
          >
            Live demo <ArrowUpRight size={11} aria-hidden="true" />
          </a>
        ) : null}
        {project.sourceUrl ? (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-fg transition-colors inline-flex items-center gap-1.5"
          >
            <Github size={12} aria-hidden="true" />
            Source
          </a>
        ) : (
          <span className="font-mono text-xs text-muted/40">
            {isBuilding ? 'Source coming soon' : '—'}
          </span>
        )}
      </div>
    </article>
  )
}
```

- [ ] **Step 2: Create `components/sections/Work.tsx`**

```tsx
import { projects } from '@/content/projects'
import { Section } from '@/components/primitives/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { AnimatedReveal } from '@/components/primitives/AnimatedReveal'

export function Work() {
  // Show highlighted projects on homepage; fall back to all if none flagged
  const highlighted = projects.filter((p) => p.highlight)
  const display = highlighted.length > 0 ? highlighted : projects

  // Section hides itself if there are no projects at all
  if (projects.length === 0) return null

  return (
    <Section id="work">
      <div className="mx-auto max-w-[880px] px-6">
        <AnimatedReveal>
          <Eyebrow>Selected Work</Eyebrow>
        </AnimatedReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {display.map((project, i) => (
            <AnimatedReveal key={project.slug} delay={i * 0.08}>
              <ProjectCard project={project} />
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
```

- [ ] **Step 3: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/sections/ProjectCard.tsx components/sections/Work.tsx
git commit -m "feat: add Work section and ProjectCard with building/live status treatment"
```

---

## Task 9: Build Experience and Education Section

**Files:**
- Create: `components/sections/Experience.tsx`

- [ ] **Step 1: Create `components/sections/Experience.tsx`**

```tsx
import { experiences } from '@/content/experience'
import { educations } from '@/content/education'
import { Section } from '@/components/primitives/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { AnimatedReveal } from '@/components/primitives/AnimatedReveal'

function TimelineItem({
  title,
  subtitle,
  start,
  end,
  description,
}: {
  title: string
  subtitle?: string
  start: string
  end: string
  description: string
}) {
  return (
    <div className="relative pl-5 border-l border-border">
      <div className="absolute -left-px top-0 w-px h-4 bg-accent/60" />
      <div className="mb-1.5 flex flex-col gap-0.5">
        <h3 className="text-sm font-medium text-fg leading-snug">
          {title}
          {subtitle ? (
            <span className="text-muted font-normal"> — {subtitle}</span>
          ) : null}
        </h3>
        <span className="font-mono text-xs text-muted">
          {start} – {end}
        </span>
      </div>
      {description ? (
        <p className="text-sm text-muted leading-relaxed">{description}</p>
      ) : null}
    </div>
  )
}

export function Experience() {
  if (experiences.length === 0 && educations.length === 0) return null

  return (
    <Section id="experience">
      <div className="mx-auto max-w-[880px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {experiences.length > 0 && (
            <div>
              <AnimatedReveal>
                <Eyebrow>Experience</Eyebrow>
              </AnimatedReveal>
              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <AnimatedReveal key={i} delay={i * 0.08}>
                    <TimelineItem
                      title={exp.role}
                      subtitle={exp.org}
                      start={exp.start}
                      end={exp.end}
                      description={exp.description}
                    />
                  </AnimatedReveal>
                ))}
              </div>
            </div>
          )}

          {educations.length > 0 && (
            <div>
              <AnimatedReveal>
                <Eyebrow>Education</Eyebrow>
              </AnimatedReveal>
              <div className="space-y-8">
                {educations.map((edu, i) => (
                  <AnimatedReveal key={i} delay={i * 0.08}>
                    <TimelineItem
                      title={edu.qualification}
                      subtitle={edu.institution}
                      start={edu.start}
                      end={edu.end}
                      description={edu.note ?? ''}
                    />
                  </AnimatedReveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
```

- [ ] **Step 2: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Experience.tsx
git commit -m "feat: add Experience and Education timeline section"
```

---

## Task 10: Build Skills and Certifications Sections

**Files:**
- Create: `components/sections/Skills.tsx`
- Create: `components/sections/Certifications.tsx`

- [ ] **Step 1: Create `components/sections/Skills.tsx`**

```tsx
import { skills } from '@/content/skills'
import { Section } from '@/components/primitives/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Tag } from '@/components/primitives/Tag'
import { AnimatedReveal } from '@/components/primitives/AnimatedReveal'

export function Skills() {
  if (skills.length === 0) return null

  return (
    <Section id="skills">
      <div className="mx-auto max-w-[880px] px-6">
        <AnimatedReveal>
          <Eyebrow>Skills & Tools</Eyebrow>
        </AnimatedReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {skills.map((group, i) => (
            <AnimatedReveal key={group.category} delay={i * 0.07}>
              <div>
                <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-3">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
```

- [ ] **Step 2: Create `components/sections/Certifications.tsx`**

```tsx
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
                    {cert.issuer} · {cert.date}
                  </p>
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
```

- [ ] **Step 3: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Skills.tsx components/sections/Certifications.tsx
git commit -m "feat: add Skills and Certifications sections with graceful empty-state handling"
```

---

## Task 11: Build Contact Section

**Files:**
- Create: `components/sections/Contact.tsx`

- [ ] **Step 1: Create `components/sections/Contact.tsx`**

```tsx
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
```

- [ ] **Step 2: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "feat: add Contact section with LinkedIn and email CTAs"
```

---

## Task 12: Assemble layout.tsx and page.tsx

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Write `app/layout.tsx`**

Overwrite the default layout with Geist fonts, metadata, JSON-LD, and the layout shell:

```tsx
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
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
```

- [ ] **Step 2: Write `app/page.tsx`**

```tsx
import { Hero } from '@/components/sections/Hero'
import { Work } from '@/components/sections/Work'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Skills } from '@/components/sections/Skills'
import { Certifications } from '@/components/sections/Certifications'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Experience />
      <Skills />
      <Certifications />
      <Contact />
    </>
  )
}
```

- [ ] **Step 3: Delete the default Next.js boilerplate**

Delete the default page content that create-next-app generated (if it still exists in `app/page.tsx` — the write above replaces it). Also remove any default CSS classes from `globals.css` that were added by create-next-app (the write in Task 2 already replaced it).

- [ ] **Step 4: Run dev server and do a visual check**

```bash
npm run dev
```

Open http://localhost:3000 in a browser. Verify:
- Header appears at top, fixed, with name wordmark and social icons
- Hero renders name, tagline, "Currently building" line
- Work section shows 2 project cards with "In Progress" badges
- About, Experience, Education, Skills sections render
- Certifications section is NOT visible (empty array → hidden)
- Contact section shows LinkedIn and email buttons
- Footer appears at bottom

- [ ] **Step 5: Verify production build**

```bash
npm run build
```

Expected: build passes, no TypeScript errors, no ESLint errors.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "feat: assemble layout.tsx and page.tsx — full page renders"
```

---

## Task 13: Add OG Image, Sitemap, Robots, and llms.txt

**Files:**
- Create: `app/opengraph-image.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `public/llms.txt`

- [ ] **Step 1: Create `app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'David Shumba — Data Analyst & Builder'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// TODO: Once you have a custom OG design, replace this with a real image
// at public/og.png and reference it from metadata in layout.tsx instead.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 100px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <p
          style={{
            color: '#888888',
            fontSize: 15,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 32,
            margin: '0 0 32px 0',
          }}
        >
          davidshumba.com
        </p>
        <h1
          style={{
            color: '#EDEDED',
            fontSize: 68,
            fontWeight: 600,
            lineHeight: 1.05,
            margin: '0 0 28px 0',
          }}
        >
          David Shumba
        </h1>
        <p
          style={{
            color: '#C4A75E',
            fontSize: 22,
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          Data Analyst & Builder — UK
        </p>
      </div>
    ),
    size,
  )
}
```

- [ ] **Step 2: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://davidshumba.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

- [ ] **Step 3: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://davidshumba.com/sitemap.xml',
  }
}
```

- [ ] **Step 4: Create `public/llms.txt`**

```
# David Shumba

David Shumba is a UK-based Data Analyst and Degree Apprentice.

## What he does

He builds data dashboards, reporting automation, and data pipelines. His primary tool is Power BI; he also works with SQL, Python (pandas), and AI automation tooling.

## Current focus

Data analytics and AI automation. He is currently building:
- NHS A&E Performance Dashboard — analysing NHS England A&E waiting-time data to surface operational patterns and performance trends.
- Predictive Maintenance model using the NASA C-MAPSS turbofan engine degradation dataset.

## Skills

Power BI, DAX, SQL, Excel, Python, pandas, NumPy, scikit-learn, prompt engineering, workflow automation, Git, GitHub, Jupyter, VS Code, Vercel.

## Links

- Website: https://davidshumba.com
- LinkedIn: https://linkedin.com/in/davidshumba
- GitHub: https://github.com/davidshumba

## Contact

davidshumba2005@gmail.com
United Kingdom
```

- [ ] **Step 5: Verify build passes with all routes**

```bash
npm run build
```

Expected: build output shows `/`, `/sitemap.xml`, `/robots.txt`, `/opengraph-image` — all pass. No TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add app/opengraph-image.tsx app/sitemap.ts app/robots.ts public/llms.txt
git commit -m "feat: add OG image, sitemap, robots.txt, and llms.txt"
```

---

## Task 14: Final Build Verification and README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Full build + type-check**

```bash
npx tsc --noEmit && npm run build
```

Expected:
- `npx tsc --noEmit` exits 0 with no output
- `npm run build` exits 0
- Build output shows no errors, no warnings about missing types

If TypeScript errors appear, fix them before proceeding.

- [ ] **Step 2: Run ESLint**

```bash
npm run lint
```

Expected: no errors. If any `@typescript-eslint` warnings appear about unused variables or missing `alt` props, fix them.

- [ ] **Step 3: Check accessibility basics in dev mode**

```bash
npm run dev
```

Open http://localhost:3000 and verify manually:
- Tab through the page: focus ring (amber/gold) visible on all interactive elements
- LinkedIn, GitHub, Email links in header and footer are reachable by keyboard
- Project card links are reachable by keyboard
- Heading hierarchy: h1 (name in Hero) → h2 (Contact "Let's connect.") → h3 (project cards, timeline items)
- Images: there are no images yet, so no alt-text gaps

- [ ] **Step 4: Write `README.md`**

```markdown
# davidshumba.com

Personal career site for David Shumba. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Go to vercel.com/new and import the repo.
3. Vercel auto-detects Next.js — no build configuration needed.
4. In Vercel project settings → Domains, add `davidshumba.com`.

## DNS (Cloudflare)

In Cloudflare DNS for `davidshumba.com`:

- Add an **A record**: name `@`, value `76.76.21.21` (Vercel IP), proxy status → **DNS only** (grey cloud) for accurate Vercel analytics.
- Optionally add a **CNAME**: name `www`, value `cname.vercel-dns.com`, DNS only.
- Set up a redirect (in Vercel or Cloudflare Page Rules) from `www` → apex, or vice-versa.

Full Vercel domain docs: https://vercel.com/docs/projects/domains

## Editing content

All content lives in `content/`. Edit these files to update the site — no JSX changes required.

| File | What it controls |
|------|-----------------|
| `content/profile.ts` | Name, role, tagline, "currently building" link, social URLs, stat row |
| `content/projects.ts` | Project cards in the Work section |
| `content/experience.ts` | Work experience timeline entries |
| `content/education.ts` | Education timeline entries |
| `content/skills.ts` | Grouped skills and tools |
| `content/certifications.ts` | Certifications list (section hides when array is empty) |

### Adding a project

In `content/projects.ts`, add an object to the array:

```ts
{
  slug: 'my-new-project',
  title: 'My New Project',
  description: 'One or two sentences describing what it does and the outcome.',
  status: 'live',          // 'building' | 'live' | 'archived'
  date: 'July 2026',
  tags: ['Power BI', 'SQL'],
  liveUrl: 'https://...',  // optional
  sourceUrl: 'https://github.com/davidshumba/...', // optional
  highlight: true,         // show on homepage
}
```

### Adding a certification

In `content/certifications.ts`, add an object to the `certifications` array:

```ts
{
  name: 'Microsoft Certified: Power BI Data Analyst Associate',
  issuer: 'Microsoft',
  date: 'Jan 2026',
  credentialUrl: 'https://learn.microsoft.com/...',
}
```

## OG image

A generated OG image lives at `app/opengraph-image.tsx`. To replace it with a custom design, place a 1200×630 PNG at `public/og.png` and update `metadata.openGraph.images` in `app/layout.tsx` to reference `/og.png`.
```

- [ ] **Step 5: Final commit**

```bash
git add README.md
git commit -m "docs: add README with dev, build, deploy, DNS, and content-editing instructions"
```

- [ ] **Step 6: Confirm definition of done**

Verify each item:
- [ ] `npm run build` passes with no errors
- [ ] Site looks intentional with only seeded sparse content (2 building project cards)
- [ ] Adding a new project requires editing only `content/projects.ts`
- [ ] LinkedIn and GitHub are reachable from header and footer
- [ ] Project cards show "Source coming soon" honestly (not a dead link)
- [ ] Certifications section is invisible (empty array)
- [ ] Accent colour (#C4A75E) used only for links, active states, "In Progress" badge — never decoratively
- [ ] `/sitemap.xml` and `/robots.txt` accessible in production build
- [ ] `/llms.txt` in `public/` (accessible at `davidshumba.com/llms.txt`)

---

## Self-Review Against Spec

**Spec coverage check:**

| Requirement | Task |
|-------------|------|
| Sticky header, wordmark left, social icons right | Task 5 |
| Hero: name, tagline, currently-building, stats row | Task 6 |
| About: prose paragraphs (placeholder, marked TODO) | Task 7 |
| Work: project grid, building/live treatment, links | Task 8 |
| Experience + Education timeline | Task 9 |
| Skills grouped by category | Task 10 |
| Certifications (hides when empty) | Task 10 |
| Contact: LinkedIn + email CTA | Task 11 |
| Footer: wordmark, socials, year | Task 5 |
| Dark theme (#0A0A0A bg, #EDEDED fg, #C4A75E accent) | Task 2 |
| Geist sans + mono fonts via next/font | Task 12 |
| Film-grain overlay | Task 2 |
| Framer Motion scroll-in, staggered, reduced-motion | Task 4 |
| All content in typed `content/*.ts` files | Task 3 |
| Empty array → section hides (Certifications, stats) | Task 10, 6 |
| Building cards show "IN PROGRESS" badge | Task 8 |
| "Source coming soon" instead of dead link | Task 8 |
| Metadata, OG, Twitter card | Task 12 |
| JSON-LD Person schema | Task 12 |
| sitemap.xml + robots.txt | Task 13 |
| llms.txt | Task 13 |
| Generated OG image 1200×630 | Task 13 |
| No fabricated metrics or testimonials | Enforced by seeded data in Task 3 |
| No CMS, no DB, no analytics SDK | Architecture — not needed |
| README with dev/deploy/DNS notes | Task 14 |
| Responsive mobile-first | All components use Tailwind responsive prefixes |
| Keyboard accessible, visible focus states | globals.css :focus-visible, Task 14 check |
