'use client';

import { m } from 'framer-motion';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { EASE_PREMIUM, DURATION_BASE } from '../../lib/motionVariants';
import type { TextRevealProps } from '../../types/motion';

/**
 * Splits text into words (or lines) and animates each into view
 * using a clip-path mask technique (translateY inside overflow:hidden).
 *
 * This creates the premium "sliding up from behind a mask" editorial effect
 * used in high-end agency sites.
 *
 * Usage:
 *   <TextReveal text="Stronger body." as="h1" mode="words" />
 *
 * For multi-line headings, pass each line separately with delay offsets,
 * or wrap in a fragment and use mode="lines".
 */
export function TextReveal({
  text,
  mode = 'words',
  stagger = 0.08,
  delay = 0,
  className,
  as: Tag = 'span',
}: TextRevealProps) {
  const { ref, isInView } = useInViewOnce();

  // Split text into tokens based on mode
  const tokens = mode === 'words'
    ? text.split(' ').filter(Boolean)
    : text.split('\n').filter(Boolean);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { y: '110%' },
    visible: {
      y: '0%',
      transition: {
        duration: DURATION_BASE,
        ease: EASE_PREMIUM,
      },
    },
  };

  return (
    // @ts-expect-error — dynamic tag is valid JSX but TS needs assertion
    <Tag
      ref={ref}
      className={className}
      aria-label={text}
    >
      <m.span
        style={{ display: 'inline' }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        aria-hidden="true"
      >
        {tokens.map((token, i) => (
          /* Each token is wrapped in an overflow:hidden mask */
          <span
            key={i}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              // Preserve inter-word spacing
              marginRight: mode === 'words' ? '0.22em' : undefined,
              verticalAlign: 'bottom',
            }}
          >
            <m.span
              style={{ display: 'inline-block' }}
              variants={itemVariants}
            >
              {token}
            </m.span>
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
