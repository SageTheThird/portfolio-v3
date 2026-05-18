import Link from 'next/link';
import { ArrowUpRight, FileDown } from 'lucide-react';
import { CursorBlink } from '@/components/cursor-blink';
import { TypedText } from '@/components/typed-text';
import { RevealHeadline } from '@/components/reveal-headline';
import { FeaturedSpotlight } from '@/components/featured-spotlight';
import { MissionStatus } from '@/components/mission-status';
import { StatBand } from '@/components/stat-band';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SectionHeader } from '@/components/section-header';
import { siteConfig } from '@/lib/site-config';
import {
  getFeaturedProjects,
  type Project,
} from '@/lib/projects';

export default function HomePage() {
  const featured = getFeaturedProjects() as unknown as [Project, Project, Project];

  return (
    <>
      {/* HERO */}
      <section className='mx-auto max-w-[var(--container-wide)] px-6 pt-16 pb-20 md:pt-24 md:pb-28'>
        <div className='grid items-start gap-12 lg:grid-cols-[1.5fr_1fr]'>
          {/* Left: hero copy */}
          <div className='max-w-3xl'>
            <p className='mono text-[12px] text-[color:var(--color-text-dim)]'>
              <span className='text-[color:var(--color-accent)]'>$</span>{' '}
              <TypedText
                text='whoami'
                speedMs={55}
                className='text-[color:var(--color-text)]'
              />
              <CursorBlink />
            </p>

            <div className='mt-8'>
              <RevealHeadline
                startDelayMs={350}
                lines={[
                  { text: 'Builds the kind' },
                  { text: 'of systems' },
                  { text: 'usually staffed by a team.', muted: true },
                ]}
              />
            </div>

            <p className='mt-8 max-w-2xl text-lg leading-relaxed text-[color:var(--color-text-muted)]'>
              Senior software engineer. Six years operating as the only engineer
              on production AI, web3, and distributed backend products — owning
              architecture, code, infrastructure, and operations end-to-end. The
              strategic alternative to staffing up.
            </p>

            <div className='mono mt-8 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-text-dim)]'>
              <span className='inline-flex items-center gap-1.5 rounded-sm border border-[color:var(--color-success)]/40 bg-[color:var(--color-success)]/10 px-2 py-1 text-[color:var(--color-success)]'>
                <span className='inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]' />
                open to work
              </span>
              <span>·</span>
              <span>Dubai, UAE</span>
              <span>·</span>
              <span>any timezone</span>
            </div>

            <div className='mt-8 flex flex-wrap gap-3'>
              <Link
                href='/work'
                className='mono inline-flex items-center gap-2 rounded-sm border border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/10 px-4 py-2 text-sm font-medium text-[color:var(--color-accent)] transition hover:bg-[color:var(--color-accent)]/20'
              >
                <span>view selected work</span>
                <ArrowUpRight className='h-4 w-4' />
              </Link>
              <Link
                href='/contact'
                className='mono inline-flex items-center gap-2 rounded-sm border border-[color:var(--color-border)] px-4 py-2 text-sm text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-border-hi)] hover:text-[color:var(--color-text)]'
              >
                <span>get in touch</span>
              </Link>
              <a
                href={siteConfig.resumeUrl}
                className='mono inline-flex items-center gap-2 rounded-sm border border-[color:var(--color-border)] px-4 py-2 text-sm text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-border-hi)] hover:text-[color:var(--color-text)]'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FileDown className='h-4 w-4' />
                <span>résumé.pdf</span>
              </a>
            </div>
          </div>

          {/* Right: mission status panel */}
          <div className='justify-self-start lg:justify-self-end lg:sticky lg:top-24'>
            <MissionStatus />
          </div>
        </div>
      </section>

      {/* STAT BAND */}
      <StatBand />

      {/* FEATURED WORK */}
      <section className='mx-auto max-w-[var(--container-wide)] px-6 pt-20 pb-24'>
        <ScrollReveal>
          <SectionHeader
            label='Selected Work · 2024 → present'
            subhead='Three engagements. Same engineer. Different planets.'
            className='mb-10'
          />
        </ScrollReveal>

        <FeaturedSpotlight projects={featured} />

        <div className='mt-10 flex justify-end'>
          <Link
            href='/work'
            className='mono group inline-flex items-center gap-2 text-[12px] text-[color:var(--color-text-muted)] transition hover:text-[color:var(--color-text)]'
          >
            <span>see all work</span>
            <ArrowUpRight className='h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-accent)]' />
          </Link>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className='border-t border-[color:var(--color-border)] bg-[color:var(--color-surface)]/30'>
        <div className='mx-auto max-w-[var(--container-wide)] px-6 py-20'>
          <ScrollReveal>
            <div className='grid gap-10 md:grid-cols-[1fr_auto] md:items-end'>
              <div className='max-w-2xl'>
                <SectionHeader
                  label='What I do'
                  subhead='Pragmatic AI in production, distributed backends, web3 that does not feel like crypto.'
                  className='mb-6'
                />
                <p className='leading-relaxed text-[color:var(--color-text-muted)]'>
                  I architect, code, deploy, and operate production systems
                  alone — the way a founding engineer would. Hybrid retrieval
                  pipelines, NestJS service meshes, Cloudflare Workers handling
                  AES-256 decryption at the edge, Unlock Protocol contracts on
                  Polygon wired to credit-card checkout. Different problems;
                  same person shipping them.
                </p>
              </div>
              <Link
                href='/about'
                className='mono inline-flex shrink-0 items-center gap-2 rounded-sm border border-[color:var(--color-border)] px-4 py-2 text-sm text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-border-hi)] hover:text-[color:var(--color-text)]'
              >
                <span>full bio</span>
                <ArrowUpRight className='h-4 w-4' />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
