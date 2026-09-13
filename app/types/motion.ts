import type { HTMLMotionProps, MotionValue } from 'framer-motion';
import type { ReactNode, CSSProperties } from 'react';

// ─── Shared ──────────────────────────────────────────────────────────────────

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export interface BaseMotionProps {
  /** Delay before the animation starts (seconds) */
  delay?: number;
  /** Animation duration override (seconds) */
  duration?: number;
  /** Additional className applied to the wrapper */
  className?: string;
  /** Inline style applied to the wrapper */
  style?: CSSProperties;
  children: ReactNode;
}

// ─── Reveal ──────────────────────────────────────────────────────────────────

export interface RevealProps extends BaseMotionProps {
  /** Direction the element enters from */
  direction?: RevealDirection;
  /** How far the element starts from its final position (px) */
  distance?: number;
}

// ─── TextReveal ──────────────────────────────────────────────────────────────

export type TextRevealMode = 'words' | 'lines';

export interface TextRevealProps {
  /** The text string to animate */
  text: string;
  /** Animate word-by-word or line-by-line */
  mode?: TextRevealMode;
  /** Stagger interval between each word/line (seconds) */
  stagger?: number;
  /** Initial delay before first word animates (seconds) */
  delay?: number;
  /** Additional className on the outer wrapper */
  className?: string;
  /** Element tag to render ('h1' | 'h2' | 'h3' | 'p' | 'span') */
  as?: keyof React.JSX.IntrinsicElements;
}

// ─── Stagger ─────────────────────────────────────────────────────────────────

export interface StaggerProps {
  children: ReactNode;
  /** Delay before the first child animates (seconds) */
  delay?: number;
  /** Stagger interval between children (seconds) */
  staggerDelay?: number;
  className?: string;
  style?: CSSProperties;
}

// ─── MagneticButton ──────────────────────────────────────────────────────────

export interface MagneticButtonProps {
  children: ReactNode;
  /** Maximum magnetic offset in pixels */
  strength?: number;
  className?: string;
  style?: CSSProperties;
  /** If true, renders as a div wrapper (not a button element) */
  as?: 'div' | 'span';
}

// ─── ParallaxLayer ───────────────────────────────────────────────────────────

export interface ParallaxLayerProps {
  children: ReactNode;
  /**
   * Speed multiplier. Positive = slower than scroll (moves up).
   * Range: 0.05 (very subtle) to 0.5 (strong). Default 0.15.
   */
  speed?: number;
  className?: string;
  style?: CSSProperties;
}

// ─── AnimatedCounter ─────────────────────────────────────────────────────────

export interface AnimatedCounterProps {
  /** The target numeric value */
  target: number;
  /** Optional suffix appended after the number (e.g. '+', '%', ' yrs') */
  suffix?: string;
  /** Optional prefix prepended before the number (e.g. '₹') */
  prefix?: string;
  /** Decimal places to show (default 0) */
  decimals?: number;
  /** Spring stiffness (default 60) */
  stiffness?: number;
  /** Spring damping (default 25) */
  damping?: number;
  className?: string;
}

// ─── Internal / Utility ──────────────────────────────────────────────────────

/** Tuple used by useMagnetic hook */
export interface MagneticState {
  ref: React.RefObject<HTMLDivElement | null>;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}
