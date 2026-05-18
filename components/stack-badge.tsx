import { Stack, StackInfo } from '@/config/stack';
import { cn } from '@/lib/cn';

export function StackBadge({
  stack,
  size = 'sm',
  className,
}: {
  stack: Stack;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const info = StackInfo[stack];
  if (!info) return null;
  return (
    <span
      className={cn(
        'mono inline-flex items-center gap-1.5 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-border-hi)] hover:text-[color:var(--color-text)]',
        size === 'sm' && 'px-2 py-0.5 text-[10.5px]',
        size === 'md' && 'px-2.5 py-1 text-[11.5px]',
        className,
      )}
    >
      <span
        aria-hidden
        className='inline-block h-1.5 w-1.5 rounded-full'
        style={{ background: info.color }}
      />
      <span>{info.value}</span>
    </span>
  );
}

export function StackBadgeList({
  stack,
  max,
  className,
}: {
  stack: Stack[];
  max?: number;
  className?: string;
}) {
  const visible = typeof max === 'number' ? stack.slice(0, max) : stack;
  const rest = typeof max === 'number' ? Math.max(stack.length - max, 0) : 0;
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {visible.map(s => (
        <StackBadge key={String(s)} stack={s} />
      ))}
      {rest > 0 && (
        <span className='mono inline-flex items-center rounded-sm border border-dashed border-[color:var(--color-border)] px-2 py-0.5 text-[10.5px] text-[color:var(--color-text-dim)]'>
          +{rest} more
        </span>
      )}
    </div>
  );
}
