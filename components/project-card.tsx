'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { getProjectMeta, type Project } from '@/lib/projects';
import { StackBadgeList } from './stack-badge';
import { MetaStrip } from './meta-strip';

export function ProjectCard({
  project,
  size = 'md',
}: {
  project: Project;
  size?: 'md' | 'lg';
}) {
  const meta = getProjectMeta(project.slug);
  const titleClean = project.title.split('—')[0]?.trim() ?? project.title;

  const metaItems = [
    meta.role ?? 'solo',
    meta.status ?? 'shipped',
    meta.duration ?? '—',
  ];

  return (
    <Link
      href={`/work/${project.slug}`}
      className='crosshair group block'
      aria-label={`${titleClean} — case study`}
    >
      <motion.article
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        className='card relative flex h-full flex-col gap-4 overflow-hidden rounded-md p-5'
      >
        {/* Banner */}
        <div className='relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-bg)]'>
          {project.banner && (
            <Image
              src={project.banner}
              alt=''
              fill
              sizes={
                size === 'lg'
                  ? '(min-width: 1024px) 800px, 100vw'
                  : '(min-width: 1024px) 33vw, 100vw'
              }
              className='object-cover object-center transition duration-500 group-hover:scale-[1.02]'
              priority={size === 'lg'}
            />
          )}
          {/* hover gradient veil */}
          <div className='absolute inset-0 bg-gradient-to-t from-[color:var(--color-bg)]/55 via-transparent to-transparent opacity-90 transition duration-300 group-hover:opacity-60' />
          {/* hover meta strip */}
          <div className='absolute bottom-3 left-3 opacity-0 transition duration-300 group-hover:opacity-100'>
            <MetaStrip items={metaItems} />
          </div>
          {/* year badge */}
          {meta.year && (
            <div className='absolute top-3 right-3'>
              <span className='mono rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/80 px-1.5 py-0.5 text-[10px] text-[color:var(--color-text-muted)] backdrop-blur-sm'>
                {meta.year}
              </span>
            </div>
          )}
        </div>

        {/* Title + arrow */}
        <div className='flex items-start justify-between gap-3'>
          <h3
            className={cn(
              'flex-1 text-balance font-semibold tracking-tight text-[color:var(--color-text)]',
              size === 'lg' ? 'text-2xl' : 'text-lg',
            )}
          >
            {titleClean}
          </h3>
          <ArrowUpRight className='h-5 w-5 shrink-0 text-[color:var(--color-text-dim)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-accent)]' />
        </div>

        {project.shortDescription && (
          <p className='text-sm leading-relaxed text-[color:var(--color-text-muted)]'>
            {project.shortDescription}
          </p>
        )}

        <StackBadgeList stack={project.stack} max={size === 'lg' ? 8 : 5} />
      </motion.article>
    </Link>
  );
}
