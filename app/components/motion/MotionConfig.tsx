'use client';

import { LazyMotion, domAnimation, MotionConfig as FramerMotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE_PREMIUM, DURATION_BASE } from '../../lib/motionVariants';

interface MotionConfigProps {
  children: ReactNode;
}

/**
 * Wraps the app with:
 * - LazyMotion (domAnimation only — avoids loading unused Framer features)
 * - MotionConfig with global defaults (ease, duration, reducedMotion handling)
 *
 * Place this once at the top of the component tree.
 */
export function MotionConfigProvider({ children }: MotionConfigProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <FramerMotionConfig
        transition={{ ease: EASE_PREMIUM, duration: DURATION_BASE }}
        reducedMotion="user"
      >
        {children}
      </FramerMotionConfig>
    </LazyMotion>
  );
}
