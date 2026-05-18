'use client';

import { useEffect, useState } from 'react';
import { CursorBlink } from './cursor-blink';

interface Line {
  kind: 'log' | 'ok' | 'warn' | 'dim';
  label: string;
  value: string;
}

const baseLines: Line[] = [
  { kind: 'dim', label: 'host', value: 'sajid.dev' },
  { kind: 'dim', label: 'tz  ', value: 'GST · any' },
  { kind: 'dim', label: 'exp ', value: '6+ years · solo' },
  { kind: 'ok', label: 'avail', value: 'open to work' },
];

const rotatingFocus = [
  'tenure · cycle 2',
  'purelands.biz · live',
  'admin audit · v1 api',
  'edge decryption · 300+ pops',
  'hybrid retrieval · BM25 + RRF',
];

function formatNow() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`;
}

export function MissionStatus() {
  const [now, setNow] = useState<string>('');
  const [focusIdx, setFocusIdx] = useState(0);

  useEffect(() => {
    setNow(formatNow());
    const id = window.setInterval(() => setNow(formatNow()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(
      () => setFocusIdx(i => (i + 1) % rotatingFocus.length),
      3200,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <aside
      className='mono w-full max-w-sm shrink-0 overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/60 backdrop-blur-sm'
      aria-label='mission status'
    >
      {/* Window header */}
      <div className='flex items-center justify-between border-b border-[color:var(--color-border)] bg-[color:var(--color-surface-elev)]/80 px-3 py-2'>
        <div className='flex items-center gap-1.5'>
          <span className='inline-block h-2 w-2 rounded-full bg-[color:var(--color-danger)]/80' />
          <span className='inline-block h-2 w-2 rounded-full bg-[color:var(--color-warn)]/80' />
          <span className='inline-block h-2 w-2 rounded-full bg-[color:var(--color-success)]/80' />
        </div>
        <div className='text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-text-dim)]'>
          mission · status
        </div>
        <div className='text-[10px] text-[color:var(--color-text-dim)]'>
          {now}
        </div>
      </div>

      {/* Body */}
      <div className='space-y-1.5 px-4 py-4 text-[12px] leading-relaxed text-[color:var(--color-text-muted)]'>
        {baseLines.map(line => (
          <div key={line.label} className='flex items-center gap-3'>
            <span className='w-12 shrink-0 text-[color:var(--color-text-dim)]'>
              {line.label}
            </span>
            <span className='text-[color:var(--color-text-dim)]'>:</span>
            {line.kind === 'ok' && (
              <span className='inline-flex items-center gap-1.5 text-[color:var(--color-success)]'>
                <span className='inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)] shadow-[0_0_8px_var(--color-success)]' />
                {line.value}
              </span>
            )}
            {line.kind === 'dim' && (
              <span className='text-[color:var(--color-text)]'>{line.value}</span>
            )}
            {line.kind === 'warn' && (
              <span className='text-[color:var(--color-warn)]'>{line.value}</span>
            )}
            {line.kind === 'log' && (
              <span className='text-[color:var(--color-accent)]'>{line.value}</span>
            )}
          </div>
        ))}

        {/* Rotating focus */}
        <div className='mt-3 border-t border-dashed border-[color:var(--color-border)] pt-3'>
          <div className='flex items-center gap-3'>
            <span className='w-12 shrink-0 text-[color:var(--color-text-dim)]'>
              focus
            </span>
            <span className='text-[color:var(--color-text-dim)]'>:</span>
            <span
              key={focusIdx}
              className='inline-flex items-center gap-1.5 text-[color:var(--color-accent)] motion-safe:animate-[fadein_300ms_ease-out]'
            >
              <span className='inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]' />
              {rotatingFocus[focusIdx]}
            </span>
          </div>
        </div>

        {/* Prompt line */}
        <div className='mt-4 flex items-center gap-2 text-[color:var(--color-text-muted)]'>
          <span className='text-[color:var(--color-accent)]'>$</span>
          <span className='text-[color:var(--color-text)]'>say hi</span>
          <CursorBlink />
        </div>
      </div>
    </aside>
  );
}
