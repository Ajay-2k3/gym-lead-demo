'use client';

import { useRef, useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';
import type { MagneticState } from '../types/motion';

/**
 * Provides a subtle magnetic cursor-following effect.
 *
 * - Disabled automatically for reduced-motion preference.
 * - Disabled on touch/hover-none devices (no cursor).
 * - Uses springs for smooth, natural feel without bounciness.
 *
 * @param strength  Maximum pixel offset from center (default 20).
 */
export function useMagnetic(strength: number = 20): MagneticState & {
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
} {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  // Spring config: stiff enough to feel snappy, low damping for a quick settle
  const springConfig = { stiffness: 150, damping: 18, mass: 0.1 };
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (shouldReduce || !ref.current) return;

      // Detect touch devices — magnetic effect is cursor-only
      if (window.matchMedia('(hover: none)').matches) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalise offset to [-1, 1] relative to element size, then scale by strength
      const offsetX = ((e.clientX - centerX) / (rect.width / 2)) * strength;
      const offsetY = ((e.clientY - centerY) / (rect.height / 2)) * strength;

      rawX.set(offsetX);
      rawY.set(offsetY);
    },
    [rawX, rawY, strength, shouldReduce],
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref, springX, springY, onMouseMove, onMouseLeave };
}
