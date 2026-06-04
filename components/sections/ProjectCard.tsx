import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '@/components/icons/BrandIcons'
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
            <GithubIcon size={12} />
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
