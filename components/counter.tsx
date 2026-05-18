'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  to: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  formatFn?: (n: number) => string;
  className?: string;
}

export function Counter({
  to,
  durationMs = 1200,
  prefix = '',
  suffix = '',
  formatFn,
  className,
}: CounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setValue(to);
      return;
    }

    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / durationMs);
              // easeOutCubic
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.round(to * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatFn ? formatFn(value) : value.toLocaleString()}
      {suffix}
    </span>
  );
}
