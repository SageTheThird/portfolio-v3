'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  y?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  delay = 0,
  y = 16,
  once = true,
  className,
  ...rest
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
