'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Triggers once when the element enters the viewport.
 * Uses a -10% top margin so the animation starts just before the element
 * is fully visible, giving a more natural editorial feel.
 *
 * @param margin  Optional override for the root margin string.
 */
export function useInViewOnce(margin: string = '-8% 0px'): {
  ref: React.RefObject<HTMLDivElement | null>;
  isInView: boolean;
} {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: margin as any });

  return { ref, isInView };
}
