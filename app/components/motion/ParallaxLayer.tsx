'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform, useSpring } from 'framer-motion';
import type { ParallaxLayerProps } from '../../types/motion';

/**
 * Scroll-linked parallax layer.
 *
 * As the page scrolls, this element moves at a different rate than surrounding
 * content, creating a sense of depth.
 *
 * - Uses `useScroll` scoped to the element's container for precision.
 * - `speed` controls how much the element moves relative to scroll:
 *     - 0.1 = very subtle (recommended for decorative text/graphics)
 *     - 0.3 = moderate (for background layers)
 *     - 0.5 = strong (use sparingly)
 * - Springs smooth the transform to avoid jagginess.
 * - Only active on desktop (>900px) — mobile skips parallax for performance.
 */
export function ParallaxLayer({
  children,
  speed = 0.15,
  className,
  style,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Map scroll progress [0→1] to a Y translate range
  // Positive speed = element moves upward slower than scroll (recedes)
  const yRaw = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`]);

  // Apply a light spring for smooth playback
  const y = useSpring(yRaw, { stiffness: 60, damping: 20, mass: 0.5 });

  return (
    <m.div
      ref={ref}
      style={{ y, ...style }}
      className={className}
    >
      {children}
    </m.div>
  );
}
