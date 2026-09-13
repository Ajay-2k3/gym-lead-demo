'use client';

import { m } from 'framer-motion';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { fadeUp } from '../../lib/motionVariants';
import { EASE_PREMIUM, DURATION_BASE } from '../../lib/motionVariants';
import type { StaggerProps } from '../../types/motion';

/**
 * Wraps direct children with a stagger orchestrator.
 * Each child is wrapped in a motion.div that fades + translates upward
 * with a staggered delay relative to its siblings.
 *
 * Triggers once when the container enters the viewport.
 *
 * Usage:
 *   <Stagger staggerDelay={0.1}>
 *     <Card /> <Card /> <Card />
 *   </Stagger>
 */
export function Stagger({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className,
  style,
}: StaggerProps) {
  const { ref, isInView } = useInViewOnce();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  // Child variant — each item fades + slides up
  const childVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATION_BASE,
        ease: EASE_PREMIUM,
      },
    },
  };

  return (
    <m.div
      ref={ref}
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <m.div key={i} variants={childVariants}>
              {child}
            </m.div>
          ))
        : <m.div variants={childVariants}>{children}</m.div>
      }
    </m.div>
  );
}
