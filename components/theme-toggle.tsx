'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { cn } from '@/lib/cn';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type='button'
      onClick={toggle}
      aria-label={`switch to ${next} mode`}
      title={`switch to ${next} mode`}
      className={cn(
        'mono inline-flex items-center gap-1.5 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-2 py-1 text-[11px] text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-border-hi)] hover:text-[color:var(--color-text)]',
        className,
      )}
    >
      {theme === 'dark' ? (
        <Sun className='h-3.5 w-3.5' />
      ) : (
        <Moon className='h-3.5 w-3.5' />
      )}
    </button>
  );
}
