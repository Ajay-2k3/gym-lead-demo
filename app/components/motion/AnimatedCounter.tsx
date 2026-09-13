'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, m } from 'framer-motion';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { AnimatedCounterProps } from '../../types/motion';

/**
 * Animates a number from 0 to `target` when it enters the viewport.
 * Uses a spring for a natural deceleration — like a physical counter winding up.
 *
 * - Triggers exactly once (useInViewOnce)
 * - Skips animation if prefers-reduced-motion — shows final value instantly
 * - Supports decimal places (for values like 4.9)
 * - Supports prefix/suffix (₹, +, %, yrs)
 */
export function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  decimals = 0,
  stiffness = 60,
  damping = 25,
  className,
}: AnimatedCounterProps) {
  const { ref: inViewRef, isInView } = useInViewOnce();
  const shouldReduce = useReducedMotion();

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness, damping });

  // DOM ref to write the animated value directly — avoids React re-renders on every frame
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isInView) return;
    // Kick off the spring toward target
    motionValue.set(target);
  }, [isInView, motionValue, target]);

  useEffect(() => {
    // Subscribe to spring changes and write to DOM directly (no re-render)
    const unsubscribe = spring.on('change', (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent =
          prefix + latest.toFixed(decimals) + suffix;
      }
    });
    return unsubscribe;
  }, [spring, prefix, suffix, decimals]);

  // Reduced-motion: show final value immediately
  const staticDisplay = `${prefix}${target.toFixed(decimals)}${suffix}`;

  return (
    <div ref={inViewRef} style={{ display: 'inline' }}>
      {shouldReduce ? (
        <span className={className}>{staticDisplay}</span>
      ) : (
        <span ref={displayRef} className={className}>
          {/* Initial value before spring runs */}
          {`${prefix}0${suffix}`}
        </span>
      )}
    </div>
  );
}
