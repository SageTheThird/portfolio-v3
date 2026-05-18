import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { SubProject } from '@/lib/projects';

export function SubProjectCard({ sub }: { sub: SubProject }) {
  const liveUrl = sub.deployment?.web;
  const hasLink = !!liveUrl || !!sub.repository;
  const href = liveUrl ?? sub.repository ?? undefined;

  const Inner = (
    <div className='card flex h-full flex-col gap-3 rounded-md p-5'>
      <div className='flex items-start justify-between gap-3'>
        <h4 className='mono text-[13px] uppercase tracking-[0.12em] text-[color:var(--color-text)]'>
          {sub.title}
        </h4>
        {hasLink && (
          <ArrowUpRight
            className={cn(
              'h-4 w-4 shrink-0 text-[color:var(--color-text-dim)] transition',
              'group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-accent)]',
            )}
          />
        )}
      </div>
      <p className='text-sm leading-relaxed text-[color:var(--color-text-muted)]'>
        {sub.description}
      </p>
    </div>
  );

  if (!hasLink) return <div className='group'>{Inner}</div>;
  return (
    <Link
      href={href!}
      target={liveUrl ? '_blank' : undefined}
      rel={liveUrl ? 'noopener noreferrer' : undefined}
      className='crosshair group block'
    >
      {Inner}
    </Link>
  );
}
