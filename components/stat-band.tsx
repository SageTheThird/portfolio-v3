'use client';

import { Counter } from './counter';
import { ScrollReveal } from './scroll-reveal';
import { cn } from '@/lib/cn';

type Stat =
  | { kind: 'plain'; value: string; label: string }
  | {
      kind: 'count';
      to: number;
      prefix?: string;
      suffix?: string;
      label: string;
      formatFn?: (n: number) => string;
    };

const stats: Stat[] = [
  { kind: 'count', to: 6, suffix: '+', label: 'years shipping production' },
  { kind: 'count', to: 1, label: 'engineer on every project' },
  {
    kind: 'count',
    to: 330,
    suffix: 'K',
    label: 'lines on the active AI engine',
  },
  { kind: 'count', to: 11, label: 'weeks · pureland zero to live' },
  { kind: 'count', to: 3, label: 'payment rails unified · pureland' },
  { kind: 'count', to: 300, suffix: '+', label: 'edge locations · decryption' },
];

export function StatBand() {
  return (
    <section className='border-y border-[color:var(--color-border)] bg-[color:var(--color-surface)]/40'>
      <div className='mx-auto max-w-[var(--container-wide)] px-6 py-12'>
        <ScrollReveal>
          <div className='mono mb-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]'>
            <span className='h-px w-6 bg-[color:var(--color-border-hi)]' />
            By the numbers
          </div>
        </ScrollReveal>

        <div className='grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-6'>
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className='space-y-1.5'>
                <div
                  className={cn(
                    'text-3xl font-semibold tracking-tight text-[color:var(--color-text)] md:text-4xl',
                  )}
                >
                  {s.kind === 'count' ? (
                    <Counter
                      to={s.to}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      formatFn={s.formatFn}
                    />
                  ) : (
                    s.value
                  )}
                </div>
                <div className='mono text-[10.5px] uppercase tracking-[0.16em] text-[color:var(--color-text-dim)]'>
                  {s.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
