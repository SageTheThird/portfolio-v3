'use client';

import { useEffect, useReducer } from 'react';
import { cn } from '@/lib/cn';

interface TypedTextProps {
  text: string;
  speedMs?: number;
  startDelayMs?: number;
  className?: string;
  onDone?: () => void;
}

export function TypedText({
  text,
  speedMs = 32,
  startDelayMs = 0,
  className,
  onDone,
}: TypedTextProps) {
  const [count, tick] = useReducer((n: number) => n + 1, 0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      // Render full text immediately
      for (let i = 0; i < text.length; i++) tick();
      onDone?.();
      return;
    }

    const start = window.setTimeout(() => {
      const id = window.setInterval(() => {
        tick();
      }, speedMs);

      return () => window.clearInterval(id);
    }, startDelayMs);

    return () => window.clearTimeout(start);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    if (count >= text.length) onDone?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, text.length]);

  return (
    <span className={cn(className)} aria-label={text}>
      {text.slice(0, Math.min(count, text.length))}
    </span>
  );
}
