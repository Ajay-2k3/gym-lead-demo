'use client';

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Returns true if the user has requested reduced motion
 * (via `prefers-reduced-motion: reduce` media query).
 *
 * Use this to bypass all animation logic for accessibility.
 */
export function useReducedMotion(): boolean {
  const shouldReduce = useFramerReducedMotion();
  return shouldReduce ?? false;
}
