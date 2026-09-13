'use client';

import { m } from 'framer-motion';
import { AnimatedCounter } from '../motion/AnimatedCounter';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { EASE_PREMIUM, DURATION_BASE } from '../../lib/motionVariants';

/**
 * Proof band (stats strip) with:
 * - Animated number counters triggered on viewport entry
 * - Divider lines expand horizontally as section enters
 * - All counters run exactly once
 */
export function StatsSection() {
  const { ref, isInView } = useInViewOnce();

  const stats = [
    { target: 180, suffix: '+', label: 'active members', decimals: 0 },
    { target: 4.9, suffix: '',  label: 'average rating',  decimals: 1 },
    { target: 12,  suffix: '+', label: 'expert coaches',  decimals: 0 },
    { target: 6,   suffix: '',  label: 'yrs transforming lives', decimals: 0 },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION_BASE, ease: EASE_PREMIUM },
    },
  };

  return (
    <m.section
      ref={ref}
      className="proof-band"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {stats.map((stat, i) => (
        <m.div key={i} variants={itemVariants}>
          <strong>
            <AnimatedCounter
              target={stat.target}
              suffix={stat.suffix}
              decimals={stat.decimals}
              stiffness={55}
              damping={22}
            />
          </strong>
          <span>{stat.label}</span>
        </m.div>
      ))}
    </m.section>
  );
}
