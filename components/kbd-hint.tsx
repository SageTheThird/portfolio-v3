import { cn } from '@/lib/cn';

export function KbdHint({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        'mono inline-flex h-5 min-w-5 items-center justify-center rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface-elev)] px-1.5 text-[10px] text-[color:var(--color-text-muted)]',
        className,
      )}
    >
      {children}
    </kbd>
  );
}
