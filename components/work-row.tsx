import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { getProjectMeta, type Project } from '@/lib/projects';

export function WorkRow({ project }: { project: Project }) {
  const meta = getProjectMeta(project.slug);
  const titleClean = project.title.split('—')[0]?.split(':')[0]?.trim() ?? project.title;

  return (
    <Link
      href={`/work/${project.slug}`}
      className='crosshair group flex items-center gap-3 border-b border-[color:var(--color-border)] py-4 transition hover:bg-[color:var(--color-surface)]/40'
    >
      <span className='mono w-16 shrink-0 text-[11px] text-[color:var(--color-text-dim)] tabular-nums'>
        {meta.year ?? '----'}
      </span>
      <span className='mono w-32 shrink-0 truncate text-[12px] text-[color:var(--color-accent)] group-hover:text-[color:var(--color-accent-hi)]'>
        {titleClean.toLowerCase()}
      </span>
      <span className='hidden flex-1 truncate text-[13px] text-[color:var(--color-text-muted)] md:block'>
        {project.shortDescription ?? project.description.split('\n')[0]}
      </span>
      <span className='mono hidden shrink-0 text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-text-dim)] md:inline-block'>
        {meta.role ?? 'solo'}
      </span>
      <ArrowUpRight
        className={cn(
          'h-4 w-4 shrink-0 text-[color:var(--color-text-dim)] transition',
          'group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-accent)]',
        )}
      />
    </Link>
  );
}
