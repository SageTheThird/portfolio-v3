'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

function resolveSrc(id: string): string {
  if (id.startsWith('http') || id.startsWith('/')) return id;
  return `https://i.imgur.com/${id}`;
}

export function ScreenshotGallery({
  screenshots,
  dimensions = [400, 680],
}: {
  screenshots: string[];
  /** [height, width] in px */
  dimensions?: [number, number];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [h, w] = dimensions;

  function scrollBy(dir: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (w + 16), behavior: 'smooth' });
  }

  if (!screenshots.length) return null;

  return (
    <div className='relative'>
      <div
        ref={scrollRef}
        className='scrollbar-hidden flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2'
      >
        {screenshots.map((id, i) => {
          const src = resolveSrc(id);
          const isVideo = src.endsWith('.mp4');
          return (
            <div
              key={`${id}-${i}`}
              className={cn(
                'group relative shrink-0 snap-start overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)]',
              )}
              style={{ width: w, height: h }}
            >
              {isVideo ? (
                <video
                  src={src}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className='h-full w-full object-cover'
                />
              ) : (
                <Image
                  src={src}
                  alt=''
                  width={w}
                  height={h}
                  className='h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]'
                />
              )}
            </div>
          );
        })}
      </div>

      {screenshots.length > 1 && (
        <div className='absolute -top-12 right-0 flex items-center gap-1.5'>
          <button
            type='button'
            onClick={() => scrollBy(-1)}
            aria-label='previous screenshot'
            className='mono inline-flex h-7 w-7 items-center justify-center rounded-sm border border-[color:var(--color-border)] text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-border-hi)] hover:text-[color:var(--color-text)]'
          >
            <ChevronLeft className='h-4 w-4' />
          </button>
          <button
            type='button'
            onClick={() => scrollBy(1)}
            aria-label='next screenshot'
            className='mono inline-flex h-7 w-7 items-center justify-center rounded-sm border border-[color:var(--color-border)] text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-border-hi)] hover:text-[color:var(--color-text)]'
          >
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>
      )}
    </div>
  );
}
