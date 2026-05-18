'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/site-config';
import { CursorBlink } from './cursor-blink';
import { KbdHint } from './kbd-hint';

const heartbeatLines = [
  'shipping tenure · cycle 2',
  'purelands.biz · live',
  'building solo · since 2019',
  'editor open · dark mode',
  'building, listening, replying',
];

function isoNow(): string {
  const d = new Date();
  return d.toISOString().slice(0, 19).replace('T', ' ') + ' UTC';
}

export function FooterStatus() {
  const [now, setNow] = useState<string>(isoNow());
  const [activity, setActivity] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = window.setInterval(() => setNow(isoNow()), 1000);
    const rot = window.setInterval(
      () => setActivity(i => (i + 1) % heartbeatLines.length),
      3600,
    );
    return () => {
      window.clearInterval(tick);
      window.clearInterval(rot);
    };
  }, []);

  return (
    <footer className='mono border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)]'>
      <div className='mx-auto flex max-w-[var(--container-wide)] flex-wrap items-center justify-between gap-3 px-6 py-4 text-[11px] text-[color:var(--color-text-dim)]'>
        <div className='flex flex-wrap items-center gap-3'>
          <span className='flex items-center gap-1.5'>
            <span className='relative inline-flex h-1.5 w-1.5'>
              <span className='absolute inset-0 inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-success)] opacity-70' />
              <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)] shadow-[0_0_8px_var(--color-success)]' />
            </span>
            <span>online</span>
          </span>
          <span className='text-[color:var(--color-border-hi)]'>·</span>
          <span>{siteConfig.location.toLowerCase()}</span>
          <span className='text-[color:var(--color-border-hi)]'>·</span>
          <span key={activity} className='text-[color:var(--color-accent)] motion-safe:animate-[fadein_300ms_ease-out]'>
            {heartbeatLines[activity]}
          </span>
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          {mounted && <span className='tabular-nums'>{now}</span>}
          <span className='text-[color:var(--color-border-hi)]'>·</span>
          <span>press</span>
          <KbdHint>⌘K</KbdHint>
          <span>to navigate</span>
          <CursorBlink />
        </div>
      </div>
    </footer>
  );
}
