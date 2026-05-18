'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/cn';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max degrees of tilt on each axis. Default 6. */
  intensity?: number;
  /** When true, shows a soft cursor-follower light spot. Default true. */
  showSpot?: boolean;
}

export function TiltCard({
  children,
  className,
  intensity = 6,
  showSpot = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotX = useSpring(useMotionValue(0), { stiffness: 240, damping: 22 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 240, damping: 22 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mx}% ${my}%, color-mix(in oklch, var(--color-accent) 14%, transparent), transparent 60%)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1
    rotY.set((px - 0.5) * intensity * 2);
    rotX.set(-(py - 0.5) * intensity * 2);
    mx.set(px * 100);
    my.set(py * 100);
  }

  function onLeave() {
    rotX.set(0);
    rotY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: rotX,
        rotateY: rotY,
        perspective: 1200,
      }}
      className={cn('relative', className)}
    >
      {children}
      {showSpot && (
        <motion.div
          aria-hidden
          className='pointer-events-none absolute inset-0 rounded-md mix-blend-screen'
          style={{ background: spotlight, willChange: 'background' }}
        />
      )}
    </motion.div>
  );
}
