'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import {
  getProjectHoverBanner,
  getProjectMeta,
  type Project,
} from '@/lib/projects';
import { StackBadgeList } from './stack-badge';
import { ScrollReveal } from './scroll-reveal';
import { TiltCard } from './tilt-card';

interface FeaturedSpotlightProps {
  projects: [Project, Project, Project];
}

export function FeaturedSpotlight({ projects }: FeaturedSpotlightProps) {
  const [hero, second, third] = projects;
  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
      <ScrollReveal className='lg:col-span-2'>
        <TiltCard intensity={5}>
          <DominantCard project={hero} />
        </TiltCard>
      </ScrollReveal>
      <div className='flex flex-col gap-6'>
        <ScrollReveal delay={0.1}>
          <SmallCard project={second} />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <SmallCard project={third} />
        </ScrollReveal>
      </div>
    </div>
  );
}

function projectTitle(p: Project) {
  return p.title.split('—')[0]?.split(':')[0]?.trim() ?? p.title;
}

function DominantCard({ project }: { project: Project }) {
  const meta = getProjectMeta(project.slug);
  const titleClean = projectTitle(project);
  const hoverBanner = getProjectHoverBanner(project.slug);

  return (
    <Link
      href={`/work/${project.slug}`}
      className='crosshair group block'
      aria-label={`${titleClean} — case study`}
      style={{ transform: 'translateZ(0)' }}
    >
      <motion.article
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className='card relative flex h-full flex-col overflow-hidden rounded-md'
      >
        {/* Banner */}
        <div className='relative aspect-[16/9] w-full overflow-hidden border-b border-[color:var(--color-border)] bg-[color:var(--color-bg)]'>
          {project.banner && (
            <Image
              src={project.banner}
              alt=''
              fill
              sizes='(min-width: 1024px) 880px, 100vw'
              className={cn(
                'object-cover transition duration-700',
                hoverBanner && 'group-hover:opacity-0',
                !hoverBanner && 'group-hover:scale-[1.03]',
              )}
              priority
            />
          )}
          {hoverBanner && (
            <Image
              src={hoverBanner}
              alt=''
              fill
              sizes='(min-width: 1024px) 880px, 100vw'
              className='absolute inset-0 object-cover opacity-0 transition duration-700 group-hover:opacity-100 group-hover:scale-[1.02]'
            />
          )}
          {/* Vignette */}
          <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--color-bg)]/80 via-[color:var(--color-bg)]/10 to-transparent' />
          {/* Top meta strip */}
          <div className='mono pointer-events-none absolute inset-x-5 top-5 flex items-center justify-between text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-text-muted)]'>
            <span className='inline-flex items-center gap-2 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/70 px-2 py-1 backdrop-blur'>
              <span className='inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]' />
              featured
            </span>
            <span className='text-[color:var(--color-text-dim)]'>
              {meta.year} · {meta.role ?? 'solo'} · {meta.status ?? 'shipped'}
            </span>
          </div>
          {/* Bottom title */}
          <div className='pointer-events-none absolute inset-x-0 bottom-0 p-6'>
            <h3 className='text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-[color:var(--color-text)] md:text-5xl'>
              {titleClean}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className='flex flex-1 flex-col gap-4 p-6'>
          <p className='max-w-2xl text-base leading-relaxed text-[color:var(--color-text-muted)] md:text-lg'>
            {project.shortDescription}
          </p>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <StackBadgeList stack={project.stack} max={8} />
            <span className='mono inline-flex items-center gap-1.5 text-[12px] text-[color:var(--color-accent)] transition group-hover:text-[color:var(--color-accent-hi)]'>
              read case study
              <ArrowUpRight className='h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

function SmallCard({ project }: { project: Project }) {
  const meta = getProjectMeta(project.slug);
  const titleClean = projectTitle(project);
  return (
    <Link
      href={`/work/${project.slug}`}
      className='crosshair group block h-full'
      aria-label={`${titleClean} — case study`}
    >
      <motion.article
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className='card relative flex h-full flex-col overflow-hidden rounded-md'
      >
        <div className='relative aspect-[16/10] w-full overflow-hidden border-b border-[color:var(--color-border)] bg-[color:var(--color-bg)]'>
          {project.banner && (
            <Image
              src={project.banner}
              alt=''
              fill
              sizes='(min-width: 1024px) 440px, 100vw'
              className='object-cover transition duration-700 group-hover:scale-[1.04]'
            />
          )}
          <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--color-bg)]/80 via-transparent to-transparent' />
          {meta.year && (
            <div className='mono pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/70 px-1.5 py-0.5 text-[10px] text-[color:var(--color-text-muted)] backdrop-blur'>
              {meta.year}
            </div>
          )}
        </div>

        <div className='flex flex-1 flex-col gap-3 p-5'>
          <div className='flex items-start justify-between gap-2'>
            <h3
              className={cn(
                'text-balance text-xl font-semibold tracking-tight text-[color:var(--color-text)] group-hover:text-[color:var(--color-text)]',
              )}
            >
              {titleClean}
            </h3>
            <ArrowUpRight className='h-4 w-4 shrink-0 text-[color:var(--color-text-dim)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-accent)]' />
          </div>
          <p className='line-clamp-3 text-sm leading-relaxed text-[color:var(--color-text-muted)]'>
            {project.shortDescription}
          </p>
          <StackBadgeList stack={project.stack} max={4} />
        </div>
      </motion.article>
    </Link>
  );
}
