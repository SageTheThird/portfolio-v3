import { cn } from '@/lib/cn';

export function SectionHeader({
  label,
  subhead,
  align = 'left',
  className,
}: {
  label?: string;
  subhead?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {label && (
        <div className='mono flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]'>
          <span className='h-px w-6 bg-[color:var(--color-border-hi)]' />
          {label}
        </div>
      )}
      {subhead && (
        <h2 className='text-balance text-2xl font-semibold tracking-tight text-[color:var(--color-text)] md:text-3xl'>
          {subhead}
        </h2>
      )}
    </div>
  );
}
