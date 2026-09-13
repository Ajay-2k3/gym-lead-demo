import type { Variants, Transition } from 'framer-motion';

// ─── Easing ──────────────────────────────────────────────────────────────────

/** Premium athletic cubic-bezier — fast enter, smooth settle */
export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

/** Fast exit / faster elements */
export const EASE_OUT_FAST = [0.25, 1, 0.5, 1] as const;

/** Crisp entrance — used for counters and number reveals */
export const EASE_DECEL = [0.0, 0.0, 0.2, 1] as const;

// ─── Duration ────────────────────────────────────────────────────────────────

export const DURATION_FAST = 0.4;
export const DURATION_BASE = 0.65;
export const DURATION_SLOW = 0.9;

// ─── Default Transition ───────────────────────────────────────────────────────

export const transitionBase: Transition = {
  duration: DURATION_BASE,
  ease: EASE_PREMIUM,
};

export const transitionFast: Transition = {
  duration: DURATION_FAST,
  ease: EASE_OUT_FAST,
};

// ─── Shared Variants ─────────────────────────────────────────────────────────

/**
 * Fade + translateY upward reveal.
 * The most common reveal — used for paragraphs, eyebrows, CTAs.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_BASE, ease: EASE_PREMIUM },
  },
};

/** Fade only — no transform. Used for subtle secondary elements. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION_BASE, ease: EASE_PREMIUM },
  },
};

/** Slide in from left */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION_BASE, ease: EASE_PREMIUM },
  },
};

/** Slide in from right */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION_BASE, ease: EASE_PREMIUM },
  },
};

/** Scale + fade — used for stat cards, metric numbers */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION_BASE, ease: EASE_PREMIUM },
  },
};

/** Line/divider expands from 0 on its horizontal axis */
export const lineExpand: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: DURATION_SLOW, ease: EASE_PREMIUM },
  },
};

// ─── Container Variants (stagger parent) ─────────────────────────────────────

/**
 * Applied to the parent that orchestrates children stagger.
 * Children should use a variant with key 'hidden' / 'visible'.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

/** Faster stagger for form fields */
export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
};

/** Slower stagger for section-level groups */
export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0,
    },
  },
};

// ─── Word / Line Reveal Variants ─────────────────────────────────────────────

/**
 * Used inside TextReveal. Each word starts hidden below its clip mask
 * and animates into view. The parent container must have overflow:hidden.
 */
export const wordReveal: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: DURATION_BASE, ease: EASE_PREMIUM },
  },
};

/** Wrapper for a group of words — handles stagger timing */
export const wordRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// ─── Navbar Variants ─────────────────────────────────────────────────────────

/** Staggered entry for navbar items on page load */
export const navItemReveal: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_FAST, ease: EASE_OUT_FAST },
  },
};

export const navContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
};

// ─── Card Hover Variants ─────────────────────────────────────────────────────

/** Program card hover — subtle lift */
export const cardHover = {
  y: -6,
  scale: 1.004,
  transition: transitionFast,
} as const;

export const cardRest = {
  y: 0,
  scale: 1,
  transition: transitionFast,
} as const;

/** Icon rotation on card hover */
export const iconHover = {
  rotate: 15,
  scale: 1.12,
  transition: { duration: 0.3, ease: EASE_OUT_FAST },
} as const;

export const iconRest = {
  rotate: 0,
  scale: 1,
  transition: { duration: 0.3, ease: EASE_OUT_FAST },
} as const;

/** Arrow translation on hover */
export const arrowHover = {
  x: 5,
  transition: { duration: 0.25, ease: EASE_OUT_FAST },
} as const;

export const arrowRest = {
  x: 0,
  transition: { duration: 0.25, ease: EASE_OUT_FAST },
} as const;

// ─── AnimatePresence (success state) ─────────────────────────────────────────

export const successReveal: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: DURATION_BASE, ease: EASE_PREMIUM },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -16,
    transition: { duration: DURATION_FAST, ease: EASE_OUT_FAST },
  },
};
