import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import { StackBadgeList } from '@/components/stack-badge';
import { ScreenshotGallery } from '@/components/screenshot-gallery';
import { SubProjectCard } from '@/components/sub-project-card';
import { PullQuote } from '@/components/pull-quote';
import { ScrollReveal } from '@/components/scroll-reveal';
import {
  getAllProjects,
  getProjectBySlug,
  getProjectMeta,
  getProjectSlugs,
} from '@/lib/projects';

export function generateStaticParams() {
  return getProjectSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title.split('—')[0]?.trim() ?? project.title,
    description: project.shortDescription ?? project.description.slice(0, 160),
    openGraph: {
      images: project.banner ? [project.banner] : undefined,
    },
  };
}

interface StatRow {
  label: string;
  value: string;
  accent?: boolean;
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const meta = getProjectMeta(project.slug);
  const all = getAllProjects();
  const idx = all.findIndex(p => p.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  const cleanTitle =
    project.title.split('—')[0]?.split(':')[0]?.trim() ?? project.title;
  const tagline =
    project.title.split('—')[1]?.trim() ??
    project.shortDescription ??
    project.title.split(':')[1]?.trim();

  const paragraphs = project.description.split(/\n\s*\n/).filter(Boolean);

  const stats: StatRow[] = [
    { label: 'year', value: meta.year ?? '----' },
    { label: 'role', value: meta.role ?? 'solo', accent: meta.role === 'solo' },
    { label: 'duration', value: meta.duration ?? '—' },
    {
      label: 'status',
      value: meta.status ?? 'shipped',
      accent: meta.status === 'shipped',
    },
    { label: 'stack', value: `${project.stack.length} tech` },
    {
      label: 'modules',
      value: project.subProjects.length
        ? `${project.subProjects.length}`
        : '—',
    },
  ];

  const liveUrl = project.deployment?.web ?? project.website;

  return (
    <article className='pb-24'>
      {/* HERO with ambient glow */}
      <header className='relative overflow-hidden'>
        {/* Ambient gradient pulse */}
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 -z-10'
        >
          <div
            className='glow-pulse absolute left-1/2 top-0 h-[700px] w-[1000px] -translate-x-1/2 rounded-full opacity-60 blur-3xl'
            style={{
              background:
                'radial-gradient(closest-side, color-mix(in oklch, var(--color-accent) 25%, transparent), transparent 70%)',
            }}
          />
          <div
            className='absolute right-0 top-32 h-[400px] w-[600px] rounded-full opacity-40 blur-3xl'
            style={{
              background:
                'radial-gradient(closest-side, color-mix(in oklch, var(--color-accent-2) 28%, transparent), transparent 70%)',
            }}
          />
        </div>

        <div className='mx-auto max-w-[var(--container-wide)] px-6 pt-14 pb-12 md:pt-20'>
          <Link
            href='/work'
            className='mono group inline-flex items-center gap-2 text-[11px] text-[color:var(--color-text-dim)] transition hover:text-[color:var(--color-text)]'
          >
            <ArrowLeft className='h-3.5 w-3.5 transition group-hover:-translate-x-0.5' />
            <span>back to work</span>
          </Link>

          <div className='mt-10 grid items-end gap-10 md:grid-cols-[1fr_minmax(220px,260px)]'>
            <ScrollReveal>
              <div>
                <div className='mono flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]'>
                  <span className='h-px w-6 bg-[color:var(--color-border-hi)]' />
                  case study · {meta.year ?? '----'}
                </div>
                <h1 className='mt-4 text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl'>
                  {cleanTitle}
                </h1>
                {tagline && (
                  <p className='mt-5 max-w-2xl text-balance text-xl leading-snug text-[color:var(--color-text-muted)] md:text-2xl'>
                    {tagline}
                  </p>
                )}

                {liveUrl && (
                  <div className='mt-8 flex flex-wrap gap-3'>
                    <a
                      href={liveUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='mono inline-flex items-center gap-2 rounded-sm border border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/10 px-4 py-2 text-sm font-medium text-[color:var(--color-accent)] transition hover:bg-[color:var(--color-accent)]/20'
                    >
                      <ExternalLink className='h-4 w-4' />
                      <span>visit live site</span>
                    </a>
                    {project.repository && (
                      <a
                        href={project.repository}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='mono inline-flex items-center gap-2 rounded-sm border border-[color:var(--color-border)] px-4 py-2 text-sm text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-border-hi)] hover:text-[color:var(--color-text)]'
                      >
                        <Github className='h-4 w-4' />
                        <span>source</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Vertical stat stack */}
            <ScrollReveal delay={0.1}>
              <dl className='mono grid grid-cols-2 gap-y-4 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/60 p-5 backdrop-blur-sm md:grid-cols-1'>
                {stats.map(s => (
                  <div key={s.label}>
                    <dt className='text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-text-dim)]'>
                      {s.label}
                    </dt>
                    <dd
                      className={
                        s.accent
                          ? 'text-[14px] text-[color:var(--color-accent)]'
                          : 'text-[14px] text-[color:var(--color-text)]'
                      }
                    >
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          </div>
        </div>
      </header>

      {/* BANNER */}
      {project.banner && (
        <ScrollReveal>
          <div className='mx-auto max-w-[var(--container-wide)] px-6'>
            <div className='relative aspect-[16/9] w-full overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]'>
              <Image
                src={project.banner}
                alt={cleanTitle}
                fill
                sizes='(min-width: 1024px) 1280px, 100vw'
                className='object-cover'
                priority
              />
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* BODY */}
      <section className='mx-auto max-w-[var(--container-prose)] px-6 pt-20'>
        <ScrollReveal>
          <SectionHeader label='The Brief' className='mb-8' />
        </ScrollReveal>

        <ScrollReveal>
          <div className='space-y-6 text-lg leading-relaxed text-[color:var(--color-text-muted)] md:text-[19px]'>
            {paragraphs.map((p, i) => {
              if (i === 0) {
                return (
                  <p key={i} className='text-[color:var(--color-text)]'>
                    {p}
                  </p>
                );
              }
              if (i === 1 && paragraphs.length > 2) {
                // Treat the second paragraph as the architectural-bet pull quote
                return <PullQuote key={i}>{p}</PullQuote>;
              }
              return <p key={i}>{p}</p>;
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* STACK */}
      <section className='mx-auto max-w-[var(--container-prose)] px-6 pt-20'>
        <ScrollReveal>
          <SectionHeader label='Stack' className='mb-6' />
          <StackBadgeList stack={project.stack} />
        </ScrollReveal>
      </section>

      {/* SCREENSHOTS */}
      {project.screenshots.length > 0 && (
        <section className='mx-auto max-w-[var(--container-wide)] px-6 pt-20'>
          <ScrollReveal>
            <SectionHeader label='Screens' className='mb-6' />
            <ScreenshotGallery
              screenshots={project.screenshots}
              dimensions={project.dimensions ?? [400, 680]}
            />
          </ScrollReveal>
        </section>
      )}

      {/* SUB-MODULES */}
      {project.subProjects.length > 0 && (
        <section className='mx-auto max-w-[var(--container-prose)] px-6 pt-20'>
          <ScrollReveal>
            <SectionHeader
              label='Sub-modules'
              subhead='The pieces that make the whole.'
              className='mb-8'
            />
          </ScrollReveal>
          <div className='grid gap-4 md:grid-cols-2'>
            {project.subProjects.map((sub, i) => (
              <ScrollReveal key={sub.title} delay={i * 0.05}>
                <SubProjectCard sub={sub} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* PREV / NEXT */}
      <nav className='mx-auto mt-24 grid max-w-[var(--container-prose)] grid-cols-2 gap-4 border-t border-[color:var(--color-border)] px-6 pt-8'>
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className='crosshair group flex flex-col gap-1'
          >
            <span className='mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]'>
              ← prev
            </span>
            <span className='text-sm text-[color:var(--color-text-muted)] transition group-hover:text-[color:var(--color-text)]'>
              {prev.title.split('—')[0]?.split(':')[0]?.trim() ?? prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className='crosshair group flex flex-col items-end gap-1 text-right'
          >
            <span className='mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]'>
              next →
            </span>
            <span className='text-sm text-[color:var(--color-text-muted)] transition group-hover:text-[color:var(--color-text)]'>
              {next.title.split('—')[0]?.split(':')[0]?.trim() ?? next.title}
            </span>
          </Link>
        ) : (
          <Link
            href='/work'
            className='crosshair group flex flex-col items-end gap-1 text-right'
          >
            <span className='mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]'>
              ↵ index
            </span>
            <span className='text-sm text-[color:var(--color-text-muted)] transition group-hover:text-[color:var(--color-text)]'>
              all work
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
