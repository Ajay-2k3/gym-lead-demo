'use client';

import { m } from 'framer-motion';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { EASE_PREMIUM, DURATION_BASE } from '../../lib/motionVariants';
import type { RevealProps } from '../../types/motion';

/**
 * Scroll-triggered reveal wrapper.
 *
 * Wraps children in a motion.div that fades + translates into view
 * once when the element enters the viewport.
 *
 * Framer's `reducedMotion="user"` setting on MotionConfig ensures
 * the animation is skipped automatically if the user prefers reduced motion.
 */
export function Reveal({
  children,
  direction = 'up',
  distance = 40,
  delay = 0,
  duration = DURATION_BASE,
  className,
  style,
}: RevealProps) {
  const { ref, isInView } = useInViewOnce();

  // Build the initial hidden state based on direction
  const hiddenState = (() => {
    switch (direction) {
      case 'left':  return { opacity: 0, x: -distance };
      case 'right': return { opacity: 0, x: distance };
      case 'down':  return { opacity: 0, y: -distance };
      case 'none':  return { opacity: 0 };
      case 'up':
      default:      return { opacity: 0, y: distance };
    }
  })();

  const visibleState = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration,
      ease: EASE_PREMIUM,
      delay,
    },
  };

  return (
    <m.div
      ref={ref}
      initial={hiddenState}
      animate={isInView ? visibleState : hiddenState}
      className={className}
      style={style}
    >
      {children}
    </m.div>
  );
}
