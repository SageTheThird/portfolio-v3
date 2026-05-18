import { cn } from '@/lib/cn';

export function MetaStrip({
  items,
  className,
  variant = 'default',
}: {
  items: string[];
  className?: string;
  variant?: 'default' | 'accent';
}) {
  return (
    <div
      className={cn(
        'mono flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.14em]',
        className,
      )}
    >
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className={cn(
            'inline-flex items-center rounded-sm border px-1.5 py-0.5',
            variant === 'accent'
              ? 'border-[color:var(--color-accent)]/40 bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)]'
              : 'border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-muted)]',
          )}
        >
          [{item}]
        </span>
      ))}
    </div>
  );
}
