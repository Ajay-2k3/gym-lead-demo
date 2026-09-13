'use client';

import { m } from 'framer-motion';
import { useMagnetic } from '../../hooks/useMagnetic';
import type { MagneticButtonProps } from '../../types/motion';

/**
 * Wraps any CTA element with a subtle magnetic cursor-following effect.
 *
 * The inner content follows the cursor within the element bounds,
 * creating a premium, alive feel for primary action buttons.
 *
 * - Max offset is controlled by `strength` prop (default 20px)
 * - Automatically disabled for touch/no-hover devices
 * - Automatically disabled for prefers-reduced-motion
 * - Uses springs — no snapping or bouncing
 *
 * Usage:
 *   <MagneticButton>
 *     <a className="button" href="...">Book a Trial</a>
 *   </MagneticButton>
 */
export function MagneticButton({
  children,
  strength = 20,
  className,
  style,
  as: Tag = 'div',
}: MagneticButtonProps) {
  const { ref, springX, springY, onMouseMove, onMouseLeave } = useMagnetic(strength);

  return (
    // Outer container — tracks mouse events, stays stationary
    <Tag
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ display: 'inline-block', ...style }}
    >
      {/* Inner content — follows the spring values */}
      <m.div
        ref={ref}
        style={{
          x: springX,
          y: springY,
          display: 'inline-flex',
        }}
      >
        {children}
      </m.div>
    </Tag>
  );
}
