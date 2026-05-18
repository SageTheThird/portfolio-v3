import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import { ScrollReveal } from '@/components/scroll-reveal';
import { StackBadgeList } from '@/components/stack-badge';
import {
  getAllProjects,
  getAllSideProjects,
  getProjectMeta,
  type Project,
  type SideProject,
} from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected work and case studies — AI knowledge engines, Web2.5 platforms, decentralized unlockables.',
};

function titleOf(p: Project): string {
  return p.title.split('—')[0]?.split(':')[0]?.trim() ?? p.title;
}

function WorkLogEntry({ project, index }: { project: Project; index: number }) {
  const meta = getProjectMeta(project.slug);
  const sha = `${(index * 31 + 17).toString(16).padStart(2, '0')}f${(index + 1).toString(16).padStart(2, '0')}a`;
  return (
    <Link
      href={`/work/${project.slug}`}
      className='crosshair group block border-b border-[color:var(--color-border)] py-8 transition hover:bg-[color:var(--color-surface)]/40'
    >
      <div className='grid items-start gap-6 md:grid-cols-[8rem_1fr_auto] lg:grid-cols-[8rem_1fr_22rem]'>
        {/* git log SHA + year */}
        <div className='mono space-y-1.5'>
          <div className='text-[12px] text-[color:var(--color-accent)]'>
            {sha}
          </div>
          <div className='text-[11px] text-[color:var(--color-text-dim)] tabular-nums'>
            {meta.year ?? '----'}
          </div>
          <div className='text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-text-dim)]'>
            {meta.duration ?? '—'}
          </div>
        </div>

        {/* commit message body */}
        <div className='space-y-3'>
          <div className='flex items-baseline gap-3'>
            <h3 className='text-balance text-2xl font-semibold tracking-tight text-[color:var(--color-text)] transition group-hover:text-[color:var(--color-text)] md:text-3xl'>
              {titleOf(project)}
            </h3>
            <ArrowUpRight className='h-5 w-5 shrink-0 translate-y-0.5 text-[color:var(--color-text-dim)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-accent)]' />
          </div>
          <p className='max-w-2xl text-sm leading-relaxed text-[color:var(--color-text-muted)] md:text-base'>
            {project.shortDescription ??
              project.description.split('\n')[0]}
          </p>
          <div className='mono flex flex-wrap items-center gap-2 text-[10.5px] uppercase tracking-[0.16em] text-[color:var(--color-text-dim)]'>
            <span className='inline-flex items-center gap-1.5 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-2 py-0.5'>
              [{meta.role ?? 'solo'}]
            </span>
            <span className='inline-flex items-center gap-1.5 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-2 py-0.5'>
              [{meta.status ?? 'shipped'}]
            </span>
            <span className='inline-flex items-center gap-1.5 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-2 py-0.5'>
              [{project.stack.length} tech]
            </span>
            {project.subProjects.length > 0 && (
              <span className='inline-flex items-center gap-1.5 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-2 py-0.5'>
                [{project.subProjects.length} modules]
              </span>
            )}
          </div>
          <StackBadgeList stack={project.stack} max={6} className='pt-1' />
        </div>

        {/* preview banner */}
        <div className='hidden md:block'>
          {project.banner && (
            <div className='relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)]'>
              <Image
                src={project.banner}
                alt=''
                fill
                sizes='(min-width: 1024px) 22rem, 50vw'
                className='object-cover transition duration-500 group-hover:scale-[1.04]'
              />
              <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--color-bg)]/60 via-transparent to-transparent' />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

function SideRow({ p, index }: { p: SideProject; index: number }) {
  const url = p.repository ?? p.website;
  const Tag = url ? 'a' : 'div';
  const sha = `s${(index * 19 + 7).toString(16).padStart(2, '0')}${index.toString(16)}`;
  return (
    <Tag
      {...(url
        ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      className='crosshair group flex items-start gap-4 border-b border-[color:var(--color-border)] py-5 transition hover:bg-[color:var(--color-surface)]/40'
    >
      <div className='mono w-20 shrink-0 text-[11px] text-[color:var(--color-accent)]'>
        {sha}
      </div>
      <div className='flex-1 space-y-1'>
        <div className='flex items-baseline gap-2'>
          <h4 className='font-medium text-[color:var(--color-text)] group-hover:text-[color:var(--color-text)]'>
            {p.title.split('-')[0]?.trim() ?? p.title}
          </h4>
          <ArrowUpRight className='h-3.5 w-3.5 shrink-0 text-[color:var(--color-text-dim)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-accent)]' />
        </div>
        <p className='line-clamp-2 text-sm text-[color:var(--color-text-muted)]'>
          {p.shortDescription}
        </p>
      </div>
    </Tag>
  );
}

export default function WorkPage() {
  const all = getAllProjects();
  const sides = getAllSideProjects();

  return (
    <div className='mx-auto max-w-[var(--container-wide)] px-6 pt-16 pb-24 md:pt-24'>
      <ScrollReveal>
        <SectionHeader
          label='$ git log --reverse --all-projects'
          subhead='Every shipped surface, every solo engagement.'
          className='mb-12'
        />
      </ScrollReveal>

      {/* Mono terminal preface */}
      <div className='mono mb-10 max-w-3xl space-y-1 text-[12px] text-[color:var(--color-text-dim)]'>
        <div>
          <span className='text-[color:var(--color-accent)]'>$</span>{' '}
          <span className='text-[color:var(--color-text)]'>git log --reverse --since="2019"</span>
        </div>
        <div className='text-[11px]'>
          showing {all.length} engagement{all.length !== 1 ? 's' : ''} ·{' '}
          {sides.length} side project{sides.length !== 1 ? 's' : ''} · chronological
        </div>
      </div>

      <div className='border-t border-[color:var(--color-border)]'>
        {all.map((p, i) => (
          <ScrollReveal key={p.slug} delay={i * 0.04}>
            <WorkLogEntry project={p} index={i} />
          </ScrollReveal>
        ))}
      </div>

      {sides.length > 0 && (
        <section className='mt-20'>
          <ScrollReveal>
            <SectionHeader
              label='$ ls ~/side/'
              subhead='Personal experiments and tools.'
              className='mb-8'
            />
          </ScrollReveal>
          <div className='border-t border-[color:var(--color-border)]'>
            {sides.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 0.04}>
                <SideRow p={p} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* End-of-log marker */}
      <div className='mono mt-16 flex items-center gap-2 text-[11px] text-[color:var(--color-text-dim)]'>
        <span className='text-[color:var(--color-accent)]'>$</span>
        <span>(END)</span>
        <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--color-accent)]' />
      </div>
    </div>
  );
}
