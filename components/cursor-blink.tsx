import { cn } from '@/lib/cn';

export function CursorBlink({ className }: { className?: string }) {
  return (
    <span
      aria-hidden='true'
      className={cn('cursor-blink', className)}
    />
  );
}
