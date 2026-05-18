'use client';

import { motion } from 'framer-motion';
import { Fragment } from 'react';
import { cn } from '@/lib/cn';

interface RevealHeadlineProps {
  /** Lines of the headline; each line is rendered with its own word-by-word reveal. */
  lines: { text: string; muted?: boolean }[];
  className?: string;
  startDelayMs?: number;
}

const wordVariants = {
  hidden: { opacity: 0, y: '0.3em', filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export function RevealHeadline({
  lines,
  className,
  startDelayMs = 60,
}: RevealHeadlineProps) {
  let wordIndex = 0;

  return (
    <h1
      className={cn(
        'text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-[color:var(--color-text)] md:text-6xl lg:text-7xl',
        className,
      )}
    >
      {lines.map((line, lineIdx) => {
        const words = line.text.split(' ');
        return (
          <Fragment key={lineIdx}>
            {lineIdx > 0 && (
              <br className={lineIdx === 1 ? 'hidden md:block' : undefined} />
            )}
            {words.map((word, w) => {
              const i = wordIndex++;
              return (
                <Fragment key={`${lineIdx}-${w}`}>
                  <motion.span
                    initial='hidden'
                    animate='show'
                    variants={wordVariants}
                    transition={{
                      delay: startDelayMs / 1000 + i * 0.07,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={cn(
                      'inline-block',
                      line.muted && 'text-[color:var(--color-text-muted)]',
                    )}
                    style={{ willChange: 'transform, opacity, filter' }}
                  >
                    {word}
                  </motion.span>
                  {w < words.length - 1 && <span> </span>}
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </h1>
  );
}
