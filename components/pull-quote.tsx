import { cn } from '@/lib/cn';

export function PullQuote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <blockquote
      className={cn(
        'relative my-10 max-w-3xl border-l-2 border-[color:var(--color-accent)] pl-6 text-balance text-xl font-medium leading-snug tracking-tight text-[color:var(--color-text)] md:text-2xl',
        className,
      )}
    >
      {children}
    </blockquote>
  );
}
